'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Trash2, X, Loader2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  filename?: string;
  count?: number;
}

export function DeleteConfirmDialog({ open, onClose, onConfirm, filename, count }: DeleteConfirmDialogProps) {
  const [status, setStatus] = useState<'idle' | 'deleting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isBulk = typeof count === 'number' && count > 1;
  const title = isBulk ? `Delete ${count} files?` : 'Delete file?';
  const target = isBulk ? `${count} selected files` : filename || 'this file';

  async function handleConfirm() {
    setStatus('deleting');
    setErrorMsg(null);
    try {
      await onConfirm();
      onClose();
      setStatus('idle');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Delete failed');
      setStatus('error');
    }
  }

  function handleClose() {
    if (status === 'deleting') return;
    onClose();
    setStatus('idle');
    setErrorMsg(null);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[440px] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-card flex items-center justify-center bg-red-50">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <Dialog.Title className="text-heading text-ink">{title}</Dialog.Title>
            </div>
            <Dialog.Close className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <div className="px-6 py-5">
            <p className="text-body text-ink-secondary">
              This will permanently remove {target} from storage. This action cannot be undone.
            </p>

            {!isBulk && filename && (
              <div className="mt-4 p-3 bg-surface-raised rounded-button border border-surface-border">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-ink-muted">File</span>
                  <span className="text-[13px] font-medium text-ink truncate ml-3">{filename}</span>
                </div>
              </div>
            )}

            {status === 'error' && errorMsg && (
              <div className="mt-3 flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-button">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-red-700">{errorMsg}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-surface-border bg-surface-raised/50">
            <button
              onClick={handleClose}
              disabled={status === 'deleting'}
              className="px-4 py-1.5 text-ink-secondary border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={status === 'deleting'}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-button text-[13px] font-medium transition-colors disabled:opacity-70"
            >
              {status === 'deleting' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </>
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
