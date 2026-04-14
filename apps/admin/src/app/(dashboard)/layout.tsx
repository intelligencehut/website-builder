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

  let user = null;
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  // In development without Supabase configured, show the dashboard with a demo user
  const displayUser = user
    ? { email: user.email, name: user.user_metadata?.full_name || user.user_metadata?.name }
    : { email: 'demo@example.com', name: 'Demo User' };

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
