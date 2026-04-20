/**
 * YouTube Data API v3 client helpers.
 *
 * We talk to Google directly over fetch instead of pulling in the googleapis
 * SDK — keeps the bundle small and avoids Node-only dependencies from
 * leaking into server actions. All calls are server-side only (service role).
 */

import { createAdminClient } from '@/lib/supabase/admin';

// ── Config ─────────────────────────────────────────────────────

export function getYoutubeConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return null;
  return { clientId, clientSecret, redirectUri };
}

export const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
].join(' ');

// ── OAuth URL construction ─────────────────────────────────────

export function buildAuthUrl(state: string): string | null {
  const cfg = getYoutubeConfig();
  if (!cfg) return null;

  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: 'code',
    scope: YOUTUBE_SCOPES,
    access_type: 'offline',
    prompt: 'consent', // force refresh_token every time, not just first consent
    include_granted_scopes: 'true',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const cfg = getYoutubeConfig();
  if (!cfg) throw new Error('Google OAuth not configured');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      redirect_uri: cfg.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`token exchange failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const cfg = getYoutubeConfig();
  if (!cfg) throw new Error('Google OAuth not configured');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`token refresh failed: ${res.status} ${text}`);
  }
  return res.json();
}

// ── Get a valid access token for a site (refreshing if needed) ──

export async function getValidAccessToken(siteId: string): Promise<string | null> {
  const db = createAdminClient();
  if (!db) return null;

  const { data: row } = await db
    .from('youtube_tokens')
    .select('refresh_token, access_token, access_token_expires_at')
    .eq('site_id', siteId)
    .single();

  if (!row) return null;

  // 60-second safety margin
  const exp = row.access_token_expires_at ? new Date(row.access_token_expires_at).getTime() : 0;
  if (row.access_token && exp > Date.now() + 60_000) {
    return row.access_token;
  }

  const fresh = await refreshAccessToken(row.refresh_token);
  const expiresAt = new Date(Date.now() + fresh.expires_in * 1000).toISOString();
  await db
    .from('youtube_tokens')
    .update({
      access_token: fresh.access_token,
      access_token_expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq('site_id', siteId);
  return fresh.access_token;
}

// ── YouTube API helpers ────────────────────────────────────────

export interface YoutubeChannelInfo {
  channelId: string;
  channelTitle: string;
}

export async function fetchChannelInfo(accessToken: string): Promise<YoutubeChannelInfo | null> {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return null;
  const body = await res.json();
  const item = body.items?.[0];
  if (!item) return null;
  return { channelId: item.id, channelTitle: item.snippet?.title ?? '' };
}

export interface ResumableSession {
  uploadUrl: string;
}

/**
 * Initiate a resumable upload. Returns an opaque Google-hosted URL that the
 * browser will PUT the video bytes to. The access token is baked into the URL,
 * so the browser never sees the refresh token.
 *
 * Docs: https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol
 */
export async function initResumableUpload(params: {
  accessToken: string;
  title: string;
  description?: string;
  privacyStatus: 'private' | 'unlisted' | 'public';
  fileSize: number;
  mimeType: string;
}): Promise<ResumableSession> {
  const metadata = {
    snippet: {
      title: params.title,
      description: params.description ?? '',
      categoryId: '22', // People & Blogs — broad, safe default
    },
    status: {
      privacyStatus: params.privacyStatus,
      selfDeclaredMadeForKids: false,
    },
  };

  const res = await fetch(
    'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Length': String(params.fileSize),
        'X-Upload-Content-Type': params.mimeType,
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`resumable init failed: ${res.status} ${text}`);
  }

  const uploadUrl = res.headers.get('location');
  if (!uploadUrl) throw new Error('resumable init: no Location header');
  return { uploadUrl };
}

/**
 * Delete a video from YouTube. Best-effort — returns success/failure but
 * doesn't throw, because the caller also wants to remove the DB row.
 */
export async function deleteYoutubeVideo(
  accessToken: string,
  youtubeVideoId: string
): Promise<boolean> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${encodeURIComponent(youtubeVideoId)}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.ok;
}

/**
 * Look up a video's current state (processing / ready / etc).
 */
export async function fetchVideoDetails(
  accessToken: string,
  youtubeVideoId: string
): Promise<{
  status: string;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
} | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=status,snippet,contentDetails&id=${encodeURIComponent(youtubeVideoId)}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return null;
  const body = await res.json();
  const item = body.items?.[0];
  if (!item) return null;

  const thumbs = item.snippet?.thumbnails ?? {};
  const thumbnailUrl = thumbs.high?.url ?? thumbs.medium?.url ?? thumbs.default?.url ?? null;

  // ISO8601 duration e.g. "PT1M30S"
  const iso = item.contentDetails?.duration as string | undefined;
  const durationSeconds = iso ? parseIsoDuration(iso) : null;

  return {
    status: item.status?.uploadStatus ?? 'unknown',
    thumbnailUrl,
    durationSeconds,
  };
}

function parseIsoDuration(iso: string): number | null {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const s = Number(m[3] ?? 0);
  return h * 3600 + min * 60 + s;
}
