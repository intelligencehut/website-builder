'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken, deleteYoutubeVideo } from '@/lib/youtube/client';

export interface VideoItem {
  id: string;
  site_id: string;
  title: string;
  description: string | null;
  original_filename: string | null;
  size_bytes: number | null;
  duration_seconds: number | null;
  youtube_video_id: string | null;
  youtube_channel_id: string | null;
  privacy_status: 'private' | 'unlisted' | 'public';
  thumbnail_url: string | null;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  error_message: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

/** True if the site has a linked YouTube channel (service-role query). */
export async function isYoutubeConnected(siteId: string): Promise<{
  connected: boolean;
  channelTitle: string | null;
  channelId: string | null;
  connectedAt: string | null;
}> {
  const db = createAdminClient();
  if (!db) return { connected: false, channelTitle: null, channelId: null, connectedAt: null };

  const { data } = await db
    .from('youtube_connections')
    .select('channel_id, channel_title, connected_at')
    .eq('site_id', siteId)
    .single();

  if (!data) return { connected: false, channelTitle: null, channelId: null, connectedAt: null };
  return {
    connected: true,
    channelTitle: data.channel_title,
    channelId: data.channel_id,
    connectedAt: data.connected_at,
  };
}

export async function listVideosForSite(siteId: string): Promise<VideoItem[]> {
  const db = createAdminClient();
  if (!db) return [];

  const { data, error } = await db
    .from('videos')
    .select('*')
    .eq('site_id', siteId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as VideoItem[];
}

export async function deleteVideo(videoId: string, alsoDeleteOnYoutube = true): Promise<void> {
  const db = createAdminClient();
  if (!db) throw new Error('Supabase not configured');

  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not authenticated');

  const { data: row, error: loadErr } = await db
    .from('videos')
    .select('site_id, youtube_video_id')
    .eq('id', videoId)
    .single();

  if (loadErr || !row) throw new Error('Video not found');

  const role = await getUserRoleForSite(row.site_id, userId);
  if (role !== 'owner' && role !== 'editor') throw new Error('Forbidden');

  if (alsoDeleteOnYoutube && row.youtube_video_id) {
    const token = await getValidAccessToken(row.site_id);
    if (token) {
      // Best-effort — if YouTube deletion fails (e.g. already deleted), we
      // still remove the DB row so the library isn't polluted.
      await deleteYoutubeVideo(token, row.youtube_video_id).catch(() => false);
    }
  }

  const { error } = await db.from('videos').delete().eq('id', videoId);
  if (error) throw new Error(error.message);
}

export async function updateVideoMetadata(
  videoId: string,
  patch: { title?: string; description?: string }
): Promise<void> {
  const db = createAdminClient();
  if (!db) throw new Error('Supabase not configured');

  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not authenticated');

  const { data: row } = await db
    .from('videos')
    .select('site_id')
    .eq('id', videoId)
    .single();
  if (!row) throw new Error('Video not found');

  const role = await getUserRoleForSite(row.site_id, userId);
  if (role !== 'owner' && role !== 'editor') throw new Error('Forbidden');

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.title !== undefined) update.title = patch.title;
  if (patch.description !== undefined) update.description = patch.description;

  const { error } = await db.from('videos').update(update).eq('id', videoId);
  if (error) throw new Error(error.message);
}
