'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
import type { DeployRecord } from '@/lib/actions/deploy';
import type { DeployStatus } from '@website-builder/content-schema';

const statusConfig: Record<
  DeployStatus,
  { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }
> = {
  success: {
    label: 'Success',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  building: {
    label: 'Building',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  pending: {
    label: 'Pending',
    icon: AlertCircle,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
  },
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

interface DeploysClientProps {
  siteId: string;
  siteName: string;
  siteDomain?: string;
  stageDomain?: string;
  hasProdHook: boolean;
  hasStageHook: boolean;
  history: DeployRecord[];
  latestProd: DeployRecord | null;
  latestStage: DeployRecord | null;
}

export function DeploysClient({
  siteId,
  siteName,
  siteDomain,
  stageDomain,
  hasProdHook,
  hasStageHook,
  history,
  latestProd,
  latestStage,
}: DeploysClientProps) {
  const [deployAction, setDeployAction] = useState<'stage' | 'publish' | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  return (
    <>
      <Header
        title="Deploys"
        description={`Deployment history and environment status for ${siteName}`}
        actions={
          <div className="flex items-center gap-2">
            {hasStageHook && (
              <button
                onClick={() => setDeployAction('stage')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-button text-[13px] font-medium hover:bg-amber-600 transition-colors"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Deploy </span>Stage
              </button>
            )}
            <button
              onClick={() => setDeployAction('publish')}
              disabled={!hasProdHook}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={hasProdHook ? '' : 'Configure a production deploy hook in Settings → Deploy'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Publish </span>Production
            </button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Environment cards */}
        <div className={cn('grid gap-4 grid-cols-1', hasStageHook && 'md:grid-cols-2')}>
          <EnvironmentCard
            label="Production"
            domain={siteDomain}
            latest={latestProd}
            hookConfigured={hasProdHook}
            onRedeploy={() => setDeployAction('publish')}
          />
          {hasStageHook && (
            <EnvironmentCard
              label="Staging"
              domain={stageDomain}
              latest={latestStage}
              hookConfigured={hasStageHook}
              onRedeploy={() => setDeployAction('stage')}
            />
          )}
        </div>

        {/* Deploy history */}
        <div className="glass-card rounded-card overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-border">
            <h2 className="text-heading text-ink">Deploy History</h2>
          </div>
          {history.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[13px] text-ink-muted">
                No deploys yet. Trigger your first build with the buttons above.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-surface-border">
              {history.map((deploy) => {
                const cfg = statusConfig[deploy.status] || statusConfig.pending;
                return (
                  <div
                    key={deploy.id}
                    className="px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4 hover:bg-surface-hover transition-colors"
                  >
                    <cfg.icon
                      className={cn(
                        'w-4 h-4 flex-shrink-0',
                        cfg.color,
                        deploy.status === 'building' && 'animate-pulse-soft'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider',
                            deploy.environment === 'production'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          )}
                        >
                          {deploy.environment}
                        </span>
                        <span className="text-[12px] text-ink-muted">
                          {timeAgo(deploy.triggered_at)}
                        </span>
                      </div>
                      <p className="text-[12px] text-ink-muted truncate">
                        {deploy.triggered_by_name ? `by ${deploy.triggered_by_name} · ` : ''}
                        {new Date(deploy.triggered_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border flex-shrink-0',
                        cfg.bg,
                        cfg.color,
                        cfg.border
                      )}
                    >
                      {cfg.label}
                    </span>
                    {deploy.deploy_url && (
                      <a
                        href={deploy.deploy_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-ink-muted hover:text-accent hover:bg-accent/10 rounded-[4px] transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {deployAction && (
        <PublishDialog
          open={!!deployAction}
          onClose={() => setDeployAction(null)}
          action={deployAction}
          pageName="All Pages"
          siteDomain={siteDomain}
          stageDomain={stageDomain}
          onConfirm={async () => {
            if (deployAction === 'stage') {
              await deployToStage(siteId, '');
            } else {
              await publishToProduction(siteId, '');
            }
            startTransition(() => router.refresh());
          }}
        />
      )}
    </>
  );
}

function EnvironmentCard({
  label,
  domain,
  latest,
  hookConfigured,
  onRedeploy,
}: {
  label: string;
  domain?: string;
  latest: DeployRecord | null;
  hookConfigured: boolean;
  onRedeploy: () => void;
}) {
  const status = latest?.status;
  const Icon = status ? statusConfig[status].icon : CheckCircle2;
  const iconClass = status ? statusConfig[status].color : 'text-ink-muted';
  const isBuilding = status === 'building';

  return (
    <div
      className={cn('glass-card rounded-card p-5', isBuilding && 'ring-1 ring-amber-200')}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={cn('w-4 h-4', iconClass, isBuilding && 'animate-pulse-soft')} />
          <h3 className="text-heading text-ink">{label}</h3>
        </div>
      </div>
      <p className="text-[13px] text-ink-secondary mb-3">
        {domain || <span className="text-ink-muted italic">No domain configured</span>}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-ink-muted">
          {latest ? `Last deployed ${timeAgo(latest.triggered_at)}` : 'No deploys yet'}
        </span>
        {hookConfigured && (
          <button
            onClick={onRedeploy}
            className="flex items-center gap-1.5 text-caption text-accent hover:text-accent-hover transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            Redeploy
          </button>
        )}
      </div>
    </div>
  );
}
