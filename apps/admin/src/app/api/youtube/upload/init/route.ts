import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken, initResumableUpload } from '@/lib/youtube/client';

/**
 * Mint a resumable upload URL from YouTube and create a `videos` DB row
 * with status='uploading'. The browser then PUTs the video bytes to the URL
 * directly — we never stream the file through our server (Vercel caps
 * request bodies at 4.5 MB).
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

  const accessToken = await getValidAccessToken(siteId);
  if (!accessToken) {
    return NextResponse.json(
      { error: 'youtube_not_connected', message: 'Connect a YouTube channel in Settings first.' },
      { status: 412 }
    );
  }

  const finalPrivacy = privacyStatus ?? 'unlisted';

  let session;
  try {
    session = await initResumableUpload({
      accessToken,
      title,
      description,
      privacyStatus: finalPrivacy,
      fileSize,
      mimeType,
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'youtube_init_failed', message: (e as Error).message },
      { status: 502 }
    );
  }

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

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

  return NextResponse.json({ videoId: row.id, uploadUrl: session.uploadUrl });
}
