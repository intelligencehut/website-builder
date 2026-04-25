import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken, initResumableUpload } from '@/lib/youtube/client';

/**
 * Step 1 of the upload flow: insert a `videos` row (status=uploading) and
 * mint a YouTube resumable upload session URL. The browser PUTs bytes
 * directly to that URL — no Vercel request body, no Supabase Storage
 * staging — so the only effective size limit is YouTube's (256 GB).
 *
 * The session URL pins its Access-Control-Allow-Origin to whatever Origin
 * came in on this init request, so we forward the browser's Origin header
 * to Google. Without that, the browser PUT fails CORS preflight.
 *
 * Step 2 happens in `/api/youtube/upload/complete` — the browser tells us
 * the YouTube video id once the PUT succeeds, and we enrich the row with
 * thumbnail/duration and flip status to `ready`.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { siteId, title, description, fileSize, mimeType, privacyStatus, originalFilename } = body as {
    siteId?: string;
    title?: string;
    description?: string;
    fileSize?: number;
    mimeType?: string;
    privacyStatus?: 'private' | 'unlisted' | 'public';
    originalFilename?: string;
  };

  if (!siteId || !title || !fileSize || !mimeType) {
    return NextResponse.json({ error: 'siteId, title, fileSize, mimeType required' }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const role = await getUserRoleForSite(siteId, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  // Verify YouTube is connected before we let them start a multi-GB upload.
  // Wrap in try/catch because getValidAccessToken throws on refresh-token
  // failure (revoked / expired / test-app 7-day expiry).
  let accessToken: string | null;
  try {
    accessToken = await getValidAccessToken(siteId);
  } catch {
    return NextResponse.json(
      {
        error: 'youtube_refresh_failed',
        message: 'Your YouTube connection expired or was revoked. Reconnect the channel in Settings → YouTube.',
      },
      { status: 412 }
    );
  }
  if (!accessToken) {
    return NextResponse.json(
      { error: 'youtube_not_connected', message: 'Connect a YouTube channel in Settings first.' },
      { status: 412 }
    );
  }

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  const finalPrivacy = privacyStatus ?? 'unlisted';

  const { data: row, error: insertErr } = await db
    .from('videos')
    .insert({
      site_id: siteId,
      title,
      description: description ?? null,
      original_filename: originalFilename ?? null,
      size_bytes: fileSize,
      privacy_status: finalPrivacy,
      status: 'uploading',
      created_by: userId,
    })
    .select('id')
    .single();

  if (insertErr || !row) {
    return NextResponse.json(
      { error: `db insert failed: ${insertErr?.message ?? 'unknown'}` },
      { status: 500 }
    );
  }

  // Forward the browser's Origin so YouTube's UploadServer pins the session's
  // ACAO to it. Without this, the cross-origin PUT will be blocked.
  const browserOrigin = request.headers.get('origin') ?? undefined;

  let session;
  try {
    session = await initResumableUpload({
      accessToken,
      title,
      description: description ?? '',
      privacyStatus: finalPrivacy,
      fileSize,
      mimeType,
      browserOrigin,
    });
  } catch (e) {
    // Roll back so we don't leave an orphan 'uploading' row that the user
    // can't tell apart from one that's actually in flight.
    await db.from('videos').delete().eq('id', row.id);
    const message = e instanceof Error ? e.message : 'youtube init failed';
    return NextResponse.json({ error: 'youtube_init_failed', message }, { status: 502 });
  }

  return NextResponse.json({
    videoId: row.id,
    youtubeUploadUrl: session.uploadUrl,
  });
}
