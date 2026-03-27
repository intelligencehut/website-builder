'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { History, RotateCcw, Check } from 'lucide-react';
import { getVersionHistory } from '@/lib/actions/content';
import type { ContentStatus } from '@website-builder/content-schema';

interface VersionRecord {
  id: string;
  version_number: number;
  status: ContentStatus;
  created_at: string;
  created_by: string;
}

interface VersionHistoryProps {
  pageId: string;
  onRestore?: (versionId: string) => void;
}

const statusStyles: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  staged: 'bg-amber-50 text-amber-700 border-amber-200',
  published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  archived: 'bg-stone-100 text-stone-500 border-stone-200',
};

export function VersionHistory({ pageId, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVersionHistory(pageId).then((data) => {
      setVersions(data);
      setLoading(false);
    });
  }, [pageId]);

  if (loading) {
    return (
      <div className="py-6 text-center">
        <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
        <p className="text-[12px] text-ink-muted mt-2">Loading history...</p>
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="py-6 text-center">
        <History className="w-6 h-6 text-ink-muted mx-auto mb-2" />
        <p className="text-[12px] text-ink-muted">No version history</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {versions.map((version, i) => {
        const isLatest = i === 0;
        const date = new Date(version.created_at);

        return (
          <div
            key={version.id}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-button transition-colors',
              isLatest ? 'bg-accent/5' : 'hover:bg-surface-hover'
            )}
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={cn(
                'w-2.5 h-2.5 rounded-full border-2',
                isLatest ? 'bg-accent border-accent' : 'bg-surface-card border-surface-border'
              )} />
              {i < versions.length - 1 && (
                <div className="w-px h-6 bg-surface-border mt-1" />
              )}
            </div>

            {/* Version info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-mono font-medium text-ink">
                  v{version.version_number}
                </span>
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-medium border',
                  statusStyles[version.status] || statusStyles.draft
                )}>
                  {version.status}
                </span>
                {isLatest && (
                  <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
                    <Check className="w-3 h-3" /> Current
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ink-muted mt-0.5">
                {version.created_by} · {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at{' '}
                {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>

            {/* Restore button */}
            {!isLatest && onRestore && (
              <button
                onClick={() => onRestore(version.id)}
                className="p-1.5 text-ink-muted hover:text-accent hover:bg-accent/10 rounded-[4px] transition-colors"
                title="Restore this version"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
