'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId, isSuperAdmin } from '@/lib/site-context';
import { sendAccessRequestNotification, sendAccessApprovedNotification, sendAccessDeniedNotification } from '@/lib/email/resend';

/**
 * List all sites (for the access request screen — no membership filter).
 */
export async function listAllSites() {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from('sites')
    .select('id, name, slug, domain')
    .order('name');

  return data || [];
}

/**
 * List the current user's pending access requests.
 */
export async function listUserPendingRequests() {
  const supabase = createAdminClient();
  const userId = await getCurrentUserId();
  if (!supabase || !userId) return [];

  const { data } = await supabase
    .from('access_requests')
    .select('site_id, status, created_at')
    .eq('user_id', userId)
    .eq('status', 'pending');

  return data || [];
}

/**
 * Create an access request for the current user.
 */
export async function createAccessRequest(
  siteId: string,
  message?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const userId = await getCurrentUserId();
  if (!supabase || !userId) return { success: false, error: 'Not authenticated' };

  // Check for existing pending request
  const { data: existing } = await supabase
    .from('access_requests')
    .select('id')
    .eq('user_id', userId)
    .eq('site_id', siteId)
    .eq('status', 'pending')
    .limit(1);

  if (existing && existing.length > 0) {
    return { success: false, error: 'You already have a pending request for this site' };
  }

  // Insert the request
  const { error } = await supabase
    .from('access_requests')
    .insert({
      user_id: userId,
      site_id: siteId,
      status: 'pending',
      message: message || null,
    });

  if (error) return { success: false, error: error.message };

  // Send email to super admins + site owners
  try {
    const { data: user } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', userId)
      .single();

    const { data: site } = await supabase
      .from('sites')
      .select('name')
      .eq('id', siteId)
      .single();

    // Get super admins
    const { data: superAdmins } = await supabase
      .from('users')
      .select('email')
      .eq('is_super_admin', true);

    // Get site owners
    const { data: owners } = await supabase
      .from('site_members')
      .select('user:users(email)')
      .eq('site_id', siteId)
      .eq('role', 'owner');

    const adminEmails = new Set<string>();
    superAdmins?.forEach(a => adminEmails.add(a.email));
    owners?.forEach(o => {
      const u = o.user as unknown as { email: string } | null;
      if (u?.email) adminEmails.add(u.email);
    });

    if (user && site && adminEmails.size > 0) {
      await sendAccessRequestNotification(
        Array.from(adminEmails),
        { name: user.name || user.email, email: user.email },
        site.name
      ).catch(err => console.error('Email notification failed:', err));
    }
  } catch (err) {
    console.error('Failed to send access request notification:', err);
  }

  return { success: true };
}

/**
 * List pending access requests (for admin dashboard).
 * Super admins see all. Site owners see requests for their sites.
 */
export async function listPendingRequests() {
  const supabase = createAdminClient();
  const userId = await getCurrentUserId();
  if (!supabase || !userId) return [];

  const isAdmin = await isSuperAdmin(userId);

  let query = supabase
    .from('access_requests')
    .select(`
      id,
      status,
      message,
      created_at,
      user:users!access_requests_user_id_fkey(id, email, name, avatar_url),
      site:sites!access_requests_site_id_fkey(id, name, slug, domain)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (!isAdmin) {
    // Get site IDs where user is owner
    const { data: memberships } = await supabase
      .from('site_members')
      .select('site_id')
      .eq('user_id', userId)
      .eq('role', 'owner');

    if (!memberships || memberships.length === 0) return [];

    query = query.in('site_id', memberships.map(m => m.site_id));
  }

  const { data, error } = await query;
  if (error) {
    console.error('listPendingRequests error:', error);
    return [];
  }

  return data || [];
}

/**
 * Approve an access request — creates a site_members row and notifies the user.
 */
export async function approveRequest(
  requestId: string,
  role: 'editor' | 'viewer' = 'editor'
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const reviewerId = await getCurrentUserId();
  if (!supabase || !reviewerId) return { success: false, error: 'Not authenticated' };

  // Fetch the request
  const { data: request, error: fetchError } = await supabase
    .from('access_requests')
    .select('user_id, site_id, status')
    .eq('id', requestId)
    .single();

  if (fetchError || !request) return { success: false, error: 'Request not found' };
  if (request.status !== 'pending') return { success: false, error: 'Request is no longer pending' };

  // Create the membership
  const { error: memberError } = await supabase
    .from('site_members')
    .upsert(
      { site_id: request.site_id, user_id: request.user_id, role },
      { onConflict: 'site_id,user_id' }
    );

  if (memberError) return { success: false, error: memberError.message };

  // Update request status
  await supabase
    .from('access_requests')
    .update({ status: 'approved', reviewed_by: reviewerId, updated_at: new Date().toISOString() })
    .eq('id', requestId);

  // Send approval email
  try {
    const { data: user } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', request.user_id)
      .single();

    const { data: site } = await supabase
      .from('sites')
      .select('name')
      .eq('id', request.site_id)
      .single();

    if (user && site) {
      await sendAccessApprovedNotification(
        user.email,
        user.name || user.email,
        site.name,
        role
      ).catch(err => console.error('Approval email failed:', err));
    }
  } catch (err) {
    console.error('Failed to send approval email:', err);
  }

  return { success: true };
}

/**
 * Deny an access request and notify the user.
 */
export async function denyRequest(
  requestId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const reviewerId = await getCurrentUserId();
  if (!supabase || !reviewerId) return { success: false, error: 'Not authenticated' };

  const { data: request, error: fetchError } = await supabase
    .from('access_requests')
    .select('user_id, site_id, status')
    .eq('id', requestId)
    .single();

  if (fetchError || !request) return { success: false, error: 'Request not found' };
  if (request.status !== 'pending') return { success: false, error: 'Request is no longer pending' };

  await supabase
    .from('access_requests')
    .update({ status: 'denied', reviewed_by: reviewerId, updated_at: new Date().toISOString() })
    .eq('id', requestId);

  // Send denial email
  try {
    const { data: user } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', request.user_id)
      .single();

    const { data: site } = await supabase
      .from('sites')
      .select('name')
      .eq('id', request.site_id)
      .single();

    if (user && site) {
      await sendAccessDeniedNotification(
        user.email,
        user.name || user.email,
        site.name
      ).catch(err => console.error('Denial email failed:', err));
    }
  } catch (err) {
    console.error('Failed to send denial email:', err);
  }

  return { success: true };
}
