import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';
import { getValidAccessToken } from '@/lib/youtube/client';

/**
 * Step 1 of the upload flow: insert a `videos` row (status=uploading) and
 * return a signed Supabase Storage upload URL. The browser PUTs the file
 * bytes directly to Storage, bypassing Vercel's 4.5 MB request body cap.
 *
 * Step 2 happens in `/api/youtube/upload/from-storage` — the server pulls
 * the file out of Storage and pushes it to YouTube.
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

  // Verify YouTube is connected before we let them upload 100s of MB.
  // Wrap in try/catch because getValidAccessToken throws on refresh-token
  // failure (revoked / expired / test-app 7-day expiry) — without this,
  // a revoked token surfaces as a bare 500 with no body.
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

  // Insert videos row first so we can key the storage path by its UUID.
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

  // Mint a signed upload URL for the media bucket. Storage SDK needs a
  // vanilla client (not the website-schema-scoped admin).
  const storageUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const storageKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!storageUrl || !storageKey) {
    return NextResponse.json({ error: 'storage not configured' }, { status: 500 });
  }
  const storage = createSupabaseClient(storageUrl, storageKey, {
    auth: { persistSession: false },
  });

  const ext = originalFilename?.includes('.') ? `.${originalFilename.split('.').pop()}` : '';
  const storagePath = `video-staging/${siteId}/${row.id}${ext}`;

  const { data: signed, error: signErr } = await storage.storage
    .from('media')
    .createSignedUploadUrl(storagePath);

  if (signErr || !signed) {
    // Roll back the DB insert so the library isn't polluted with orphans.
    await db.from('videos').delete().eq('id', row.id);
    return NextResponse.json({ error: `signed URL failed: ${signErr?.message ?? 'unknown'}` }, { status: 500 });
  }

  return NextResponse.json({
    videoId: row.id,
    storagePath,
    storageSignedUrl: signed.signedUrl,
    storageToken: signed.token,
  });
}
