import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { exchangeCodeForTokens, fetchChannelInfo } from '@/lib/youtube/client';

/**
 * Google OAuth redirect target. Exchanges the auth code for tokens,
 * fetches the authorized channel, and upserts a youtube_tokens row.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const googleError = searchParams.get('error');

  const redirectTo = (msg: string) =>
    NextResponse.redirect(`${origin}/settings?tab=youtube&${msg}`);

  if (googleError) return redirectTo(`error=${encodeURIComponent(googleError)}`);
  if (!code || !state) return redirectTo('error=missing_code');

  const db = createAdminClient();
  if (!db) return redirectTo('error=db_not_configured');

  // Consume one-time state row.
  const { data: stateRow } = await db
    .from('youtube_oauth_states')
    .select('site_id, user_id')
    .eq('state', state)
    .single();

  if (!stateRow) return redirectTo('error=invalid_state');
  await db.from('youtube_oauth_states').delete().eq('state', state);

  let tokens;
  try {
    tokens = await exchangeCodeForTokens(code);
  } catch (e) {
    return redirectTo(`error=${encodeURIComponent(`token_exchange_failed: ${(e as Error).message}`)}`);
  }

  if (!tokens.refresh_token) {
    // Happens if the user previously granted consent without revoking. We set
    // prompt=consent on the auth request to avoid this, but defensive.
    return redirectTo('error=no_refresh_token');
  }

  const channel = await fetchChannelInfo(tokens.access_token);

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  const { error: upsertErr } = await db.from('youtube_tokens').upsert(
    {
      site_id: stateRow.site_id,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      access_token_expires_at: expiresAt,
      scopes: tokens.scope,
      channel_id: channel?.channelId ?? null,
      channel_title: channel?.channelTitle ?? null,
      connected_by: stateRow.user_id,
      connected_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'site_id' }
  );

  if (upsertErr) return redirectTo(`error=${encodeURIComponent(upsertErr.message)}`);

  return redirectTo('connected=1');
}
