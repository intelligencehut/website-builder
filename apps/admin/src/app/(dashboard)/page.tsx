import { getPages } from '@/lib/actions/pages';
import { getActiveSiteId, getUserSites } from '@/lib/site-context';
import { listPendingRequests } from '@/lib/actions/access-requests';
import { Header } from '@/components/header';
import { PendingRequestsWidget } from '@/components/pending-requests-widget';
import {
  FileText,
  Image,
  Rocket,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

function makeStats(pageCount: number) {
  return [
    { label: 'Total Pages', value: String(pageCount), change: 'From database', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Media Files', value: '12', change: 'In /public', icon: Image, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Deploys', value: '0', change: 'No deploys yet', icon: Rocket, color: 'text-accent', bg: 'bg-amber-50' },
    { label: 'Uptime', value: '99.9%', change: 'All systems go', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];
}

// Recent edits derived from pages data

function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

const quickActions = [
  { label: 'Edit Home Page', href: '/pages/b0000000-0000-0000-0000-000000000001/edit', icon: FileText },
  { label: 'Upload Media', href: '/media', icon: Image },
  { label: 'View Deploys', href: '/deploys', icon: Rocket },
];

export default async function DashboardPage() {
  const siteId = await getActiveSiteId();
  const [pages, pendingRequests, sites] = await Promise.all([
    getPages(siteId),
    listPendingRequests(),
    getUserSites(),
  ]);
  const stats = makeStats(pages.length);

  const activeSite = sites.find((s: any) => s.id === siteId) as
    | { id: string; name: string; domain: string; metadata: Record<string, any> | null }
    | undefined;
  const previewUrl = (activeSite?.metadata as any)?.preview_url as string | undefined;
  const productionUrl = previewUrl
    ? previewUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : activeSite?.domain || '';
  const lastEdit = pages.reduce<Date | null>((latest, p) => {
    const d = new Date(p.updated_at);
    return !latest || d > latest ? d : latest;
  }, null);
  const environments = [
    {
      name: 'Production',
      url: productionUrl || '—',
      status: 'live' as const,
      lastDeploy: lastEdit ? formatRelative(lastEdit) : '—',
    },
  ];

  return (
    <>
      <Header
        title="Dashboard"
        description="Overview of your website content and deployments"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-fade-in">
        {/* Pending access requests (visible to admins/owners) */}
        {pendingRequests.length > 0 && (
          <PendingRequestsWidget requests={pendingRequests as any} />
        )}
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card rounded-card p-5 hover:shadow-card-hover transition-all duration-200 animate-slide-up stagger-${i + 1}`}
              style={{ animationFillMode: 'backwards' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-caption text-ink-muted uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="font-display text-display-md text-ink mt-1">{stat.value}</p>
                  <p className="text-[12px] text-ink-secondary mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 ${stat.bg} rounded-card flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent edits */}
          <div className="lg:col-span-2 glass-card rounded-card overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ink-muted" />
                <h2 className="text-heading text-ink">Recent Edits</h2>
              </div>
              <Link
                href="/pages"
                className="text-caption text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
              >
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-surface-border">
              {pages.slice(0, 5).map((page) => {
                const status = (page.latest_status || 'draft') as 'draft' | 'staged' | 'published';
                return (
                  <div
                    key={page.id}
                    className="px-6 py-3.5 flex items-center gap-4 hover:bg-surface-hover transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-ink truncate">
                        {page.title}
                      </p>
                      <p className="text-[12px] text-ink-muted">
                        {page.slug} · {page.page_type}
                      </p>
                    </div>
                    <StatusBadge status={status} />
                    <span className="text-[12px] text-ink-muted whitespace-nowrap">
                      {new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Environments */}
            <div className="glass-card rounded-card overflow-hidden">
              <div className="px-5 py-4 border-b border-surface-border">
                <h2 className="text-heading text-ink">Environments</h2>
              </div>
              <div className="p-4 space-y-3">
                {environments.map((env) => (
                  <div
                    key={env.name}
                    className="p-3 rounded-button bg-surface-raised border border-surface-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {env.status === 'live' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-status-published" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-status-staged animate-pulse-soft" />
                        )}
                        <span className="text-[13px] font-medium text-ink">{env.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-ink-secondary">{env.url}</span>
                      <span className="text-[11px] text-ink-muted">{env.lastDeploy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass-card rounded-card overflow-hidden">
              <div className="px-5 py-4 border-b border-surface-border">
                <h2 className="text-heading text-ink">Quick Actions</h2>
              </div>
              <div className="p-3 space-y-1">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-button hover:bg-surface-hover transition-colors group"
                  >
                    <div className="w-8 h-8 bg-surface-raised rounded-button flex items-center justify-center border border-surface-border group-hover:border-accent/30 transition-colors">
                      <action.icon className="w-4 h-4 text-ink-secondary group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-[13px] font-medium text-ink">{action.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: 'draft' | 'staged' | 'published' }) {
  const styles = {
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    staged: 'bg-amber-50 text-amber-700 border-amber-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'draft'
            ? 'bg-slate-400'
            : status === 'staged'
            ? 'bg-amber-500 animate-pulse-soft'
            : 'bg-emerald-500'
        }`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
