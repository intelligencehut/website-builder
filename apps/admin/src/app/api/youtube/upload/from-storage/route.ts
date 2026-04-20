import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import {
  getValidAccessToken,
  initResumableUpload,
  fetchVideoDetails,
} from '@/lib/youtube/client';

export const runtime = 'nodejs';
// Up to 5 min for the server-side pipe from Storage to YouTube.
export const maxDuration = 300;

/**
 * Step 2 of the upload flow. The browser has already uploaded the file to
 * Supabase Storage at the path stored when we minted the signed URL (step 1
 * in /api/youtube/upload/init). We now:
 *   1. Download the file from Storage (signed URL, streamed).
 *   2. Initiate a YouTube resumable upload session for the same bytes.
 *   3. PUT the file bytes to YouTube (server-to-server, no body-size cap).
 *   4. Update the videos row with the youtube_video_id.
 *   5. Delete the staging file from Storage.
 *
 * Vercel caps INCOMING request body at 4.5 MB but outbound fetches are
 * uncapped — so the heavy bytes flow Storage→Server→YouTube without
 * hitting the platform limit. Only the function duration matters here.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { videoId } = body as { videoId?: string };
  if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  const { data: video, error: loadErr } = await db
    .from('videos')
    .select('id, site_id, title, description, size_bytes, privacy_status, original_filename')
    .eq('id', videoId)
    .single();
  if (loadErr || !video) return NextResponse.json({ error: 'video not found' }, { status: 404 });

  const role = await getUserRoleForSite(video.site_id, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const accessToken = await getValidAccessToken(video.site_id);
  if (!accessToken) {
    return NextResponse.json({ error: 'youtube_not_connected' }, { status: 412 });
  }

  const storageUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const storageKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!storageUrl || !storageKey) {
    return NextResponse.json({ error: 'storage not configured' }, { status: 500 });
  }
  const storage = createSupabaseClient(storageUrl, storageKey, {
    auth: { persistSession: false },
  });

  const ext = video.original_filename?.includes('.')
    ? `.${video.original_filename.split('.').pop()}`
    : '';
  const storagePath = `video-staging/${video.site_id}/${video.id}${ext}`;

  // 1. Download stream from Storage — use createSignedUrl so we can stream
  //    without loading the entire blob into memory.
  const { data: signedDl, error: signDlErr } = await storage.storage
    .from('media')
    .createSignedUrl(storagePath, 600);
  if (signDlErr || !signedDl?.signedUrl) {
    await markFailed(db, videoId, `storage download URL failed: ${signDlErr?.message ?? 'unknown'}`);
    return NextResponse.json({ error: 'storage download failed' }, { status: 500 });
  }

  const dlRes = await fetch(signedDl.signedUrl);
  if (!dlRes.ok || !dlRes.body) {
    await markFailed(db, videoId, `download fetch ${dlRes.status}`);
    return NextResponse.json({ error: 'download fetch failed' }, { status: 502 });
  }

  const contentLength = Number(dlRes.headers.get('content-length')) || video.size_bytes || 0;
  const contentType = dlRes.headers.get('content-type') || 'video/*';

  // 2. Init YouTube resumable upload.
  let session;
  try {
    session = await initResumableUpload({
      accessToken,
      title: video.title,
      description: video.description ?? '',
      privacyStatus: (video.privacy_status ?? 'unlisted') as 'private' | 'unlisted' | 'public',
      fileSize: contentLength,
      mimeType: contentType,
    });
  } catch (e) {
    await markFailed(db, videoId, `youtube init: ${(e as Error).message}`);
    return NextResponse.json({ error: 'youtube init failed' }, { status: 502 });
  }

  // 3. Stream bytes Storage → YouTube.
  let ytRes: Response;
  try {
    ytRes = await fetch(session.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(contentLength),
      },
      body: dlRes.body as unknown as BodyInit,
      // @ts-expect-error — Node fetch: stream body without buffering
      duplex: 'half',
    });
  } catch (e) {
    await markFailed(db, videoId, `youtube put: ${(e as Error).message}`);
    return NextResponse.json({ error: 'youtube put failed' }, { status: 502 });
  }

  if (!ytRes.ok) {
    const text = await ytRes.text().catch(() => '');
    await markFailed(db, videoId, `youtube put ${ytRes.status}: ${text.slice(0, 500)}`);
    return NextResponse.json({ error: 'youtube rejected upload', status: ytRes.status }, { status: 502 });
  }

  const ytPayload = await ytRes.json().catch(() => null);
  const youtubeVideoId = ytPayload?.id as string | undefined;
  if (!youtubeVideoId) {
    await markFailed(db, videoId, 'youtube response missing id');
    return NextResponse.json({ error: 'youtube response missing id' }, { status: 502 });
  }

  // 4. Enrich with thumbnail + duration, then mark ready.
  const details = await fetchVideoDetails(accessToken, youtubeVideoId).catch(() => null);
  const { data: tok } = await db
    .from('youtube_tokens')
    .select('channel_id')
    .eq('site_id', video.site_id)
    .single();

  await db
    .from('videos')
    .update({
      youtube_video_id: youtubeVideoId,
      youtube_channel_id: tok?.channel_id ?? null,
      thumbnail_url: details?.thumbnailUrl ?? null,
      duration_seconds: details?.durationSeconds ?? null,
      status: 'ready',
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', videoId);

  // 5. Delete the staging file (best-effort).
  await storage.storage.from('media').remove([storagePath]).catch(() => {});

  return NextResponse.json({
    ok: true,
    videoId,
    youtubeVideoId,
    thumbnailUrl: details?.thumbnailUrl ?? null,
  });
}

async function markFailed(
  db: ReturnType<typeof createAdminClient>,
  videoId: string,
  errorMessage: string
) {
  if (!db) return;
  await db
    .from('videos')
    .update({
      status: 'failed',
      error_message: errorMessage,
      updated_at: new Date().toISOString(),
    })
    .eq('id', videoId);
}
