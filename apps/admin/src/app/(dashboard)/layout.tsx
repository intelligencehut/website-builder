import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { getUserSites, getActiveSiteId, getUserRoleForSite } from '@/lib/site-context';

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

  const displayUser = {
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name,
  };

  const [sites, activeSiteId] = await Promise.all([
    getUserSites(),
    getActiveSiteId(),
  ]);
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
