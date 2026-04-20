import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';

/**
 * Revoke the stored YouTube credentials for a site.
 * Does not attempt to revoke the grant in Google — user can do that at
 * myaccount.google.com/permissions if they want.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get('siteId');
  if (!siteId) return NextResponse.json({ error: 'siteId required' }, { status: 400 });

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const role = await getUserRoleForSite(siteId, userId);
  if (role !== 'owner') return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db not configured' }, { status: 500 });

  const { error } = await db.from('youtube_tokens').delete().eq('site_id', siteId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
