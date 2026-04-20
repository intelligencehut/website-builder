import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';

export const runtime = 'nodejs';
// Lift per-request body/body-timeout limits so large video PUTs don't get cut off.
export const maxDuration = 300;

/**
 * Server-side upload proxy — forwards raw request bytes to a YouTube resumable
 * upload session URL and returns YouTube's JSON response.
 *
 * Browsers can't PUT directly to `www.googleapis.com/upload/youtube/v3/videos`
 * in a CORS-compliant way (the endpoint's preflight answers vary depending on
 * origin, protocol, and request headers). Proxying through Next.js sidesteps
 * the issue at the cost of streaming the file through our server.
 *
 * Limits to be aware of:
 *   - Vercel Hobby: 4.5 MB request body
 *   - Vercel Pro:   up to 100 MB request body (via `maxDuration` + streaming)
 *   - Self-hosted Node: unbounded
 *
 * For local dev + short videos this is fine. For GB-scale videos on Vercel Pro,
 * we'd need a separate solution (direct-to-R2/Supabase Storage + worker).
 */
export async function POST(request: Request) {
  const siteId = request.headers.get('x-site-id');
  const uploadUrl = request.headers.get('x-upload-url');
  const mimeType = request.headers.get('x-mime-type') || 'application/octet-stream';

  if (!siteId || !uploadUrl) {
    return NextResponse.json({ error: 'x-site-id and x-upload-url required' }, { status: 400 });
  }
  if (!uploadUrl.startsWith('https://www.googleapis.com/upload/youtube/v3/videos')) {
    return NextResponse.json({ error: 'uploadUrl not a YouTube resumable session' }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const role = await getUserRoleForSite(siteId, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  // Stream the request body straight into the PUT to YouTube.
  const body = request.body;
  if (!body) return NextResponse.json({ error: 'no body' }, { status: 400 });

  const contentLength = request.headers.get('content-length');
  const headers: Record<string, string> = { 'Content-Type': mimeType };
  if (contentLength) headers['Content-Length'] = contentLength;

  const ytRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers,
    body: body as unknown as BodyInit,
    // @ts-expect-error — Node fetch extension: stream body without buffering
    duplex: 'half',
  });

  const text = await ytRes.text();
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { raw: text.slice(0, 500) };
  }

  return NextResponse.json(
    { status: ytRes.status, body: parsed },
    { status: ytRes.ok ? 200 : 502 }
  );
}
