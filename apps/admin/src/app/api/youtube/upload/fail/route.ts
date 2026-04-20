import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';

/**
 * Record an upload failure so the library row doesn't sit in 'uploading' forever.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { videoId, errorMessage } = body as { videoId?: string; errorMessage?: string };
  if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  const { data: existing } = await db
    .from('videos')
    .select('id, site_id')
    .eq('id', videoId)
    .single();

  if (!existing) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const role = await getUserRoleForSite(existing.site_id, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  await db
    .from('videos')
    .update({
      status: 'failed',
      error_message: errorMessage ?? 'Upload failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', videoId);

  return NextResponse.json({ ok: true });
}
