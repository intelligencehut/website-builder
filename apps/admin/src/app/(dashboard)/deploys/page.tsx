'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PublishDialog } from '@/components/editors/publish-dialog';
import { deployToStage, publishToProduction } from '@/lib/actions/deploy';
import { cn } from '@/lib/utils';
import {
  Rocket,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  ExternalLink,
  RotateCw,
} from 'lucide-react';

const deploys = [
  {
    id: '1',
    environment: 'production' as const,
    status: 'success' as const,
    version: 'v1.4.2',
    triggeredBy: 'Amit Das',
    triggeredAt: '2025-03-26T10:30:00Z',
    completedAt: '2025-03-26T10:31:45Z',
    url: 'https://sevaa.org',
  },
  {
    id: '2',
    environment: 'stage' as const,
    status: 'building' as const,
    version: 'v1.5.0-rc1',
    triggeredBy: 'Amit Das',
    triggeredAt: '2025-03-27T08:15:00Z',
    completedAt: null,
    url: 'https://stage-sevaa.vercel.app',
  },
  {
    id: '3',
    environment: 'stage' as const,
    status: 'success' as const,
    version: 'v1.4.3-rc2',
    triggeredBy: 'Amit Das',
    triggeredAt: '2025-03-25T16:00:00Z',
    completedAt: '2025-03-25T16:01:30Z',
    url: 'https://stage-sevaa.vercel.app',
  },
  {
    id: '4',
    environment: 'production' as const,
    status: 'success' as const,
    version: 'v1.4.1',
    triggeredBy: 'Amit Das',
    triggeredAt: '2025-03-24T11:00:00Z',
    completedAt: '2025-03-24T11:01:50Z',
    url: 'https://sevaa.org',
  },
  {
    id: '5',
    environment: 'stage' as const,
    status: 'failed' as const,
    version: 'v1.4.3-rc1',
    triggeredBy: 'Amit Das',
    triggeredAt: '2025-03-23T14:00:00Z',
    completedAt: '2025-03-23T14:00:45Z',
    url: null,
  },
];

const statusConfig = {
  success: { label: 'Success', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  building: { label: 'Building', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  failed: { label: 'Failed', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  pending: { label: 'Pending', icon: AlertCircle, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
};

export default function DeploysPage() {
  const [deployAction, setDeployAction] = useState<'stage' | 'publish' | null>(null);

  return (
    <>
      <Header
        title="Deploys"
        description="Deployment history and environment status"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDeployAction('stage')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-button text-[13px] font-medium hover:bg-amber-600 transition-colors"
            >
              <Rocket className="w-3.5 h-3.5" />
              Deploy Stage
            </button>
            <button
              onClick={() => setDeployAction('publish')}
              className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Publish Production
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6 animate-fade-in">
        {/* Environment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card rounded-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-heading text-ink">Production</h3>
              </div>
              <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border">
                v1.4.2
              </span>
            </div>
            <p className="text-[13px] text-ink-secondary mb-3">sevaa.org</p>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-ink-muted">Last deployed 2h ago</span>
              <button className="flex items-center gap-1.5 text-caption text-accent hover:text-accent-hover transition-colors">
                <RotateCw className="w-3 h-3" />
                Redeploy
              </button>
            </div>
          </div>

          <div className="glass-card rounded-card p-5 ring-1 ring-amber-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 animate-pulse-soft" />
                <h3 className="text-heading text-ink">Staging</h3>
              </div>
              <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border">
                v1.5.0-rc1
              </span>
            </div>
            <p className="text-[13px] text-ink-secondary mb-3">stage-sevaa.vercel.app</p>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-amber-600 font-medium">Building...</span>
              <span className="text-[12px] text-ink-muted">Started 15 min ago</span>
            </div>
          </div>
        </div>

        {/* Deploy history */}
        <div className="glass-card rounded-card overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-border">
            <h2 className="text-heading text-ink">Deploy History</h2>
          </div>
          <div className="divide-y divide-surface-border">
            {deploys.map((deploy) => {
              const cfg = statusConfig[deploy.status];
              return (
                <div key={deploy.id} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-hover transition-colors">
                  <cfg.icon className={cn('w-4 h-4 flex-shrink-0', cfg.color, deploy.status === 'building' && 'animate-pulse-soft')} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-ink">{deploy.version}</span>
                      <span className={cn(
                        'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider',
                        deploy.environment === 'production'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      )}>
                        {deploy.environment}
                      </span>
                    </div>
                    <p className="text-[12px] text-ink-muted">
                      by {deploy.triggeredBy} ·{' '}
                      {new Date(deploy.triggeredAt).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border',
                    cfg.bg, cfg.color, cfg.border
                  )}>
                    {cfg.label}
                  </span>
                  {deploy.url && (
                    <a
                      href={deploy.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-ink-muted hover:text-accent hover:bg-accent/10 rounded-[4px] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {deployAction && (
        <PublishDialog
          open={!!deployAction}
          onClose={() => setDeployAction(null)}
          action={deployAction}
          pageName="All Pages"
          onConfirm={async () => {
            if (deployAction === 'stage') {
              await deployToStage('demo-site', 'latest');
            } else {
              await publishToProduction('demo-site', 'latest');
            }
          }}
        />
      )}
    </>
  );
}
