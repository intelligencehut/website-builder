import { NextResponse } from 'next/server';
import { buildAuthUrl } from '@/lib/youtube/client';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, getUserRoleForSite } from '@/lib/site-context';

/**
 * Kick off the Google OAuth consent flow for connecting a YouTube channel
 * to the given site. Only owners/editors can initiate this.
 *
 * Flow:
 *   /api/youtube/auth/start?siteId=... -> Google consent -> /api/youtube/auth/callback
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const siteId = searchParams.get('siteId');

  if (!siteId) {
    return NextResponse.json({ error: 'siteId required' }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const role = await getUserRoleForSite(siteId, userId);
  if (role !== 'owner' && role !== 'editor') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  // Generate CSRF state and persist it.
  const state = crypto.randomUUID();
  const db = createAdminClient();
  if (!db) {
    return NextResponse.json({ error: 'db not configured' }, { status: 500 });
  }

  const { error: insertErr } = await db
    .from('youtube_oauth_states')
    .insert({ state, site_id: siteId, user_id: userId });

  if (insertErr) {
    return NextResponse.json({ error: `state insert failed: ${insertErr.message}` }, { status: 500 });
  }

  const authUrl = buildAuthUrl(state);
  if (!authUrl) {
    return NextResponse.redirect(
      `${origin}/settings?tab=youtube&error=not_configured`
    );
  }

  return NextResponse.redirect(authUrl);
}
