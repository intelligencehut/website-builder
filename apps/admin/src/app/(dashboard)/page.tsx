import { Header } from '@/components/header';
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

const stats = [
  {
    label: 'Total Pages',
    value: '52',
    change: '+3 this week',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Media Files',
    value: '128',
    change: '2.4 GB used',
    icon: Image,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    label: 'Deploys',
    value: '24',
    change: 'Last: 2h ago',
    icon: Rocket,
    color: 'text-accent',
    bg: 'bg-amber-50',
  },
  {
    label: 'Uptime',
    value: '99.9%',
    change: 'All systems go',
    icon: Zap,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const recentEdits = [
  {
    page: 'Home',
    section: 'Hero Carousel',
    time: '2 hours ago',
    user: 'Amit Das',
    status: 'published' as const,
  },
  {
    page: 'News: Tilka Murmu School',
    section: 'Content',
    time: '5 hours ago',
    user: 'Amit Das',
    status: 'staged' as const,
  },
  {
    page: 'Programs',
    section: 'Programs List',
    time: '1 day ago',
    user: 'Amit Das',
    status: 'draft' as const,
  },
  {
    page: 'About / Genesis',
    section: 'Full page',
    time: '2 days ago',
    user: 'Amit Das',
    status: 'published' as const,
  },
];

const environments = [
  {
    name: 'Production',
    url: 'sevaa.org',
    status: 'live' as const,
    lastDeploy: '2 hours ago',
    version: 'v1.4.2',
  },
  {
    name: 'Staging',
    url: 'stage-sevaa.vercel.app',
    status: 'building' as const,
    lastDeploy: '15 min ago',
    version: 'v1.5.0-rc1',
  },
];

const quickActions = [
  { label: 'Edit Home Page', href: '/pages/home/edit', icon: FileText },
  { label: 'Upload Media', href: '/media', icon: Image },
  { label: 'View Deploys', href: '/deploys', icon: Rocket },
];

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Dashboard"
        description="Overview of your website content and deployments"
      />

      <div className="p-8 space-y-8 animate-fade-in">
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
              {recentEdits.map((edit, i) => (
                <div
                  key={i}
                  className="px-6 py-3.5 flex items-center gap-4 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-ink truncate">
                      {edit.page}
                    </p>
                    <p className="text-[12px] text-ink-muted">
                      {edit.section} · {edit.user}
                    </p>
                  </div>
                  <StatusBadge status={edit.status} />
                  <span className="text-[12px] text-ink-muted whitespace-nowrap">
                    {edit.time}
                  </span>
                </div>
              ))}
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
                      <span className="text-[11px] font-mono text-ink-muted bg-surface-card px-1.5 py-0.5 rounded border border-surface-border">
                        {env.version}
                      </span>
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
