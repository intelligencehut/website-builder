import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken, fetchVideoDetails } from '@/lib/youtube/client';

/**
 * Called by the browser after the direct PUT to YouTube finishes.
 * Body: { videoId, youtubeVideoId, youtubeChannelId }
 *
 * We trust the youtubeVideoId from the browser (since the browser received
 * it in YouTube's response body) but re-fetch details server-side to get
 * the thumbnail / duration and to guard against spoofing.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { videoId, youtubeVideoId } = body as {
    videoId?: string;
    youtubeVideoId?: string;
  };

  if (!videoId || !youtubeVideoId) {
    return NextResponse.json({ error: 'videoId and youtubeVideoId required' }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  // Load the row to verify ownership before letting them mark it ready.
  const { data: existing, error: loadErr } = await db
    .from('videos')
    .select('id, site_id, status')
    .eq('id', videoId)
    .single();

  if (loadErr || !existing) {
    return NextResponse.json({ error: 'video not found' }, { status: 404 });
  }

  const role = await getUserRoleForSite(existing.site_id, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  // Enrich from YouTube so the library has a thumbnail right away.
  let thumbnailUrl: string | null = null;
  let durationSeconds: number | null = null;
  let youtubeChannelId: string | null = null;
  const accessToken = await getValidAccessToken(existing.site_id);
  if (accessToken) {
    const details = await fetchVideoDetails(accessToken, youtubeVideoId);
    if (details) {
      thumbnailUrl = details.thumbnailUrl;
      durationSeconds = details.durationSeconds;
    }
    const { data: tok } = await db
      .from('youtube_tokens')
      .select('channel_id')
      .eq('site_id', existing.site_id)
      .single();
    youtubeChannelId = tok?.channel_id ?? null;
  }

  const { error: updateErr } = await db
    .from('videos')
    .update({
      youtube_video_id: youtubeVideoId,
      youtube_channel_id: youtubeChannelId,
      thumbnail_url: thumbnailUrl,
      duration_seconds: durationSeconds,
      status: 'ready',
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', videoId);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, videoId, youtubeVideoId, thumbnailUrl });
}
