import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken, fetchVideoDetails } from '@/lib/youtube/client';

/**
 * Step 2 of the upload flow. The browser has already PUT the file bytes
 * directly to YouTube's resumable session URL and parsed the response to
 * pluck out the YouTube video id. We just enrich the row with the
 * thumbnail + duration and flip status to `ready`.
 *
 * No bytes flow through this route, so it returns quickly even for
 * multi-GB uploads.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { videoId, youtubeVideoId } = body as { videoId?: string; youtubeVideoId?: string };
  if (!videoId || !youtubeVideoId) {
    return NextResponse.json({ error: 'videoId and youtubeVideoId required' }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  const { data: video, error: loadErr } = await db
    .from('videos')
    .select('id, site_id')
    .eq('id', videoId)
    .single();
  if (loadErr || !video) return NextResponse.json({ error: 'video not found' }, { status: 404 });

  const role = await getUserRoleForSite(video.site_id, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const accessToken = await getValidAccessToken(video.site_id).catch(() => null);
  const details = accessToken
    ? await fetchVideoDetails(accessToken, youtubeVideoId).catch(() => null)
    : null;

  const { data: tok } = await db
    .from('youtube_tokens')
    .select('channel_id')
    .eq('site_id', video.site_id)
    .single();

  const { error: updateErr } = await db
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

  if (updateErr) {
    return NextResponse.json({ error: `db update failed: ${updateErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    videoId,
    youtubeVideoId,
    thumbnailUrl: details?.thumbnailUrl ?? null,
  });
}
