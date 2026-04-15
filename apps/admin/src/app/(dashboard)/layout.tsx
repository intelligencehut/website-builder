import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { getUserSites, getActiveSiteId, getUserRoleForSite, syncCurrentUser } from '@/lib/site-context';
import { AccessRequestScreen } from '@/components/access-request-screen';
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
      <div className="flex min-h-screen">
        <Sidebar user={displayUser} sites={sites} activeSiteId={activeSiteId} userRole={null} />
        <main className="flex-1 ml-[260px] bg-surface min-h-screen">{children}</main>
      </div>
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
  // access to, set the cookie to the first available site and redirect so
  // all child pages read the correct site ID.
  const activeSiteId = await getActiveSiteId();
  const hasAccess = sites.some(s => s.id === activeSiteId);
  if (!hasAccess) {
    const correctSiteId = sites[0]!.id;
    const cookieStore = await cookies();
    cookieStore.set('wb_site_id', correctSiteId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: 'lax',
    });
    redirect('/');
  }

  const userRole = await getUserRoleForSite(activeSiteId);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={displayUser} sites={sites} activeSiteId={activeSiteId} userRole={userRole} />
      <main className="flex-1 ml-[260px] bg-surface min-h-screen">
        {children}
      </main>
    </div>
  );
}
