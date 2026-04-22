import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin-shell';
import { getUserSites, getActiveSiteId, getUserRoleForSite, syncCurrentUser } from '@/lib/site-context';
import { AccessRequestScreen } from '@/components/access-request-screen';
import { ResetSiteCookie } from '@/components/reset-site-cookie';
import { listAllSites, listUserPendingRequests, createAccessRequest } from '@/lib/actions/access-requests';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // If Supabase isn't configured at all (no env vars), we're in a local dev
  // scenario where the admin can't do anything useful. Surface a demo user so
  // the shell renders without crashing.
  if (!supabase) {
    const displayUser = { email: 'demo@example.com', name: 'Demo User (no Supabase configured)' };
    const sites = await getUserSites();
    const activeSiteId = await getActiveSiteId();
    return (
      <AdminShell user={displayUser} sites={sites} activeSiteId={activeSiteId} userRole={null}>
        {children}
      </AdminShell>
    );
  }

  // Supabase is configured → real auth required.
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    redirect('/login');
  }

  // Sync user profile to website.users
  await syncCurrentUser();

  const displayUser = {
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name,
  };

  const sites = await getUserSites();

  // No site memberships → show access request screen
  if (sites.length === 0) {
    const allSites = await listAllSites();
    const pendingRequests = await listUserPendingRequests();

    async function handleRequestAccess(siteId: string) {
      'use server';
      return createAccessRequest(siteId);
    }

    return (
      <AccessRequestScreen
        user={displayUser}
        sites={allSites}
        pendingRequests={pendingRequests}
        onRequestAccess={handleRequestAccess}
      />
    );
  }

  // Validate active site — if cookie points to a site the user doesn't have
  // access to, render a client component that fixes the cookie and reloads.
  const activeSiteId = await getActiveSiteId();
  const hasAccess = sites.some(s => s.id === activeSiteId);
  if (!hasAccess) {
    return <ResetSiteCookie siteId={sites[0]!.id} />;
  }

  const userRole = await getUserRoleForSite(activeSiteId);

  return (
    <AdminShell user={displayUser} sites={sites} activeSiteId={activeSiteId} userRole={userRole}>
      {children}
    </AdminShell>
  );
}
