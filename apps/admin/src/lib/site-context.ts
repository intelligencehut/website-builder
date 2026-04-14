'use server';

import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

const SITE_COOKIE = 'wb_site_id';
const DEFAULT_SITE_ID = 'a0000000-0000-0000-0000-000000000001';

// ── Cookie-based site selection ───────────────────────────────

export async function getActiveSiteId(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(SITE_COOKIE)?.value || DEFAULT_SITE_ID;
}

export async function setActiveSiteId(siteId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SITE_COOKIE, siteId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax',
  });
}

// ── Current user ──────────────────────────────────────────────

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id || null;
}

/**
 * Sync the current auth user's profile to website.users.
 * Called after login to keep email/name/avatar up to date.
 */
export async function syncCurrentUser(): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const admin = createAdminClient();
  if (!admin) return;

  await admin.from('users').upsert({
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '',
    avatar_url: user.user_metadata?.avatar_url || null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });
}

// ── Super admin check ─────────────────────────────────────────

export async function isSuperAdmin(userId?: string): Promise<boolean> {
  const uid = userId || await getCurrentUserId();
  if (!uid) return false;

  const supabase = createAdminClient();
  if (!supabase) return false;

  const { data } = await supabase
    .from('users')
    .select('is_super_admin')
    .eq('id', uid)
    .single();

  return data?.is_super_admin === true;
}

// ── Role for a specific site ──────────────────────────────────

export async function getUserRoleForSite(siteId: string, userId?: string): Promise<string | null> {
  const uid = userId || await getCurrentUserId();
  if (!uid) return null;

  if (await isSuperAdmin(uid)) return 'owner';

  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('site_members')
    .select('role')
    .eq('site_id', siteId)
    .eq('user_id', uid)
    .single();

  return data?.role || null;
}

// ── Sites the user can access ─────────────────────────────────

export async function getUserSites() {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const userId = await getCurrentUserId();

  // No auth or super admin → show all sites
  if (!userId || await isSuperAdmin(userId)) {
    const { data } = await supabase
      .from('sites')
      .select('id, name, slug, domain, metadata')
      .order('name');
    return data || [];
  }

  // Regular user → only their sites
  const { data: memberships } = await supabase
    .from('site_members')
    .select('site_id')
    .eq('user_id', userId);

  if (!memberships || memberships.length === 0) return [];

  const { data } = await supabase
    .from('sites')
    .select('id, name, slug, domain, metadata')
    .in('id', memberships.map(m => m.site_id))
    .order('name');

  return data || [];
}

// ── Site members (with user profile) ──────────────────────────

export async function getSiteMembers(siteId: string) {
  const supabase = createAdminClient();
  if (!supabase) return [];

  // Join site_members with users to get email/name/avatar
  const { data, error } = await supabase
    .from('site_members')
    .select(`
      id,
      role,
      created_at,
      user:users (
        id,
        email,
        name,
        avatar_url,
        is_super_admin
      )
    `)
    .eq('site_id', siteId)
    .order('created_at');

  if (error || !data) return [];
  return data;
}

// ── Add/remove members ────────────────────────────────────────

/**
 * Add a member to a site by email.
 * Creates a website.users row if the user doesn't exist yet.
 */
export async function addSiteMemberByEmail(
  siteId: string,
  email: string,
  role: 'owner' | 'editor' | 'viewer'
) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Look up or create user by email
  let { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (!user) {
    // Check if the email exists in auth.users
    // We can't query auth.users directly with the client, so create a placeholder
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
      })
      .select('id')
      .single();

    if (insertError) throw new Error(`Could not create user: ${insertError.message}`);
    user = newUser;
  }

  // Add to site_members
  const { error } = await supabase
    .from('site_members')
    .upsert(
      { site_id: siteId, user_id: user.id, role },
      { onConflict: 'site_id,user_id' }
    );

  if (error) throw new Error(error.message);
}

export async function updateSiteMemberRole(
  siteId: string,
  userId: string,
  role: 'owner' | 'editor' | 'viewer'
) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('site_members')
    .update({ role })
    .eq('site_id', siteId)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function removeSiteMember(siteId: string, userId: string) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('site_members')
    .delete()
    .eq('site_id', siteId)
    .eq('user_id', userId);

  if (error) throw error;
}

// ── Super admin management ────────────────────────────────────

export async function toggleSuperAdmin(userId: string, isSuperAdmin: boolean) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('users')
    .update({ is_super_admin: isSuperAdmin })
    .eq('id', userId);

  if (error) throw error;
}
