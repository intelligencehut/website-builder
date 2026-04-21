'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { Field, TextInput, TextArea } from '@/components/ui/field';

interface Props {
  open: boolean;
  mode: 'upload' | 'edit';
  initialTitle?: string;
  initialDescription?: string;
  /** Displayed in the dialog header, e.g. the picked filename for uploads. */
  subheading?: string;
  saving?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

/**
 * Shared dialog to collect a YouTube title + description — used pre-upload
 * so videos don't land on YouTube with raw filenames, and post-upload as an
 * Edit dialog so existing rows can have their YouTube metadata fixed up.
 */
export function VideoMetadataDialog({
  open,
  mode,
  initialTitle = '',
  initialDescription = '',
  subheading,
  saving = false,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  // Re-sync fields whenever the dialog re-opens with fresh initial values
  // (e.g. editing a different video, or a new upload).
  useEffect(() => {
    if (!open) return;
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [open, initialTitle, initialDescription]);

  const trimmedTitle = title.trim();
  const canSubmit = trimmedTitle.length > 0 && !saving;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit(trimmedTitle, description);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && !saving && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[520px] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in flex flex-col"
          onPointerDownOutside={(e) => { if (saving) e.preventDefault(); }}
          onEscapeKeyDown={(e) => { if (saving) e.preventDefault(); }}
        >
          <div className="flex items-start justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
            <div className="min-w-0">
              <Dialog.Title className="text-heading text-ink">
                {mode === 'upload' ? 'Video details' : 'Edit video details'}
              </Dialog.Title>
              <Dialog.Description className="text-[12px] text-ink-muted mt-0.5 truncate">
                {mode === 'upload'
                  ? subheading
                    ? `Uploading "${subheading}" — enter a title and optional description for YouTube.`
                    : 'Enter a title and optional description for YouTube.'
                  : 'Updates propagate to YouTube and the Media library.'}
              </Dialog.Description>
            </div>
            <Dialog.Close
              disabled={saving}
              className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors disabled:opacity-40 flex-shrink-0 ml-3"
            >
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="p-6 space-y-4"
          >
            <Field label="Title" required>
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="e.g. Health Workshop at Ukhra"
                autoFocus
                maxLength={100}
              />
            </Field>

            <Field
              label="Description"
              description="Optional. Shown on the YouTube watch page."
            >
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                placeholder="Describe the video..."
                rows={4}
                maxLength={5000}
              />
            </Field>

            {error && (
              <p className="text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-button px-3 py-2">
                {error}
              </p>
            )}
          </form>

          <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-surface-border bg-surface-raised/50 flex-shrink-0">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-1.5 text-ink-secondary border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-40"
            >
              {saving && <Loader2 className="w-3 h-3 animate-spin" />}
              {mode === 'upload' ? 'Upload' : saving ? 'Saving' : 'Save'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Turn a filename like "WhatsApp Video 2026-04-20 at 13.50.21.mp4" into a
 * human-friendlier default title: strip extension, replace underscores and
 * hyphens with spaces, collapse runs of whitespace, trim.
 */
export function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
