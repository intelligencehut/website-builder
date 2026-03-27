'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Rocket, Globe, X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Action = 'stage' | 'publish';

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  action: Action;
  onConfirm: () => Promise<void>;
  pageName: string;
}

const config: Record<Action, {
  title: string;
  description: string;
  icon: typeof Rocket;
  buttonText: string;
  buttonClass: string;
  successText: string;
  env: string;
}> = {
  stage: {
    title: 'Deploy to Stage',
    description: 'This will update the staging environment with your current draft. The staging site will rebuild with the latest content.',
    icon: Rocket,
    buttonText: 'Deploy to Stage',
    buttonClass: 'bg-amber-500 hover:bg-amber-600 text-white',
    successText: 'Deployed to staging!',
    env: 'stage-sevaa.vercel.app',
  },
  publish: {
    title: 'Publish to Production',
    description: 'This will push your content live to the production website. This action affects the public-facing site.',
    icon: Globe,
    buttonText: 'Publish to Production',
    buttonClass: 'bg-sidebar hover:bg-sidebar-hover text-ink-inverse',
    successText: 'Published to production!',
    env: 'sevaa.org',
  },
};

export function PublishDialog({ open, onClose, action, onConfirm, pageName }: PublishDialogProps) {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const cfg = config[action];

  async function handleConfirm() {
    setStatus('deploying');
    try {
      await onConfirm();
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 1500);
    } catch {
      setStatus('error');
    }
  }

  function handleClose() {
    if (status === 'deploying') return;
    onClose();
    setStatus('idle');
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[440px] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-9 h-9 rounded-card flex items-center justify-center',
                action === 'stage' ? 'bg-amber-50' : 'bg-surface-raised'
              )}>
                <cfg.icon className={cn('w-4.5 h-4.5', action === 'stage' ? 'text-amber-600' : 'text-ink-secondary')} />
              </div>
              <Dialog.Title className="text-heading text-ink">{cfg.title}</Dialog.Title>
            </div>
            <Dialog.Close className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {status === 'success' ? (
              <div className="text-center py-4 animate-scale-in">
                <CheckCircle2 className="w-10 h-10 text-status-published mx-auto mb-3" />
                <p className="text-heading text-ink">{cfg.successText}</p>
                <p className="text-[12px] text-ink-muted mt-1">
                  Build triggered for {cfg.env}
                </p>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-4 animate-scale-in">
                <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-heading text-ink">Deploy failed</p>
                <p className="text-[12px] text-ink-muted mt-1">
                  Check your deploy hook configuration in Settings.
                </p>
              </div>
            ) : (
              <>
                <p className="text-body text-ink-secondary">{cfg.description}</p>

                <div className="mt-4 p-3 bg-surface-raised rounded-button border border-surface-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-ink-muted">Page</span>
                    <span className="text-[13px] font-medium text-ink">{pageName}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[12px] text-ink-muted">Target</span>
                    <span className="text-[12px] font-mono text-ink-secondary">{cfg.env}</span>
                  </div>
                </div>

                {action === 'publish' && (
                  <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-button">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-amber-700">
                      This will update the live website visible to all visitors.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {status !== 'success' && (
            <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-surface-border bg-surface-raised/50">
              <button
                onClick={handleClose}
                disabled={status === 'deploying'}
                className="px-4 py-1.5 text-ink-secondary border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={status === 'deploying'}
                className={cn(
                  'flex items-center gap-2 px-4 py-1.5 rounded-button text-[13px] font-medium transition-colors disabled:opacity-70',
                  cfg.buttonClass
                )}
              >
                {status === 'deploying' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <cfg.icon className="w-3.5 h-3.5" />
                    {cfg.buttonText}
                  </>
                )}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
