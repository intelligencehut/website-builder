'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Search, X, Check, ImageIcon, FileText, Loader2 } from 'lucide-react';
import { listMediaForSite, type MediaItem } from '@/lib/actions/media';
import { getActiveSiteId } from '@/lib/site-context';
import { UploadZone } from './upload-zone';

type MediaKind = 'image' | 'document';

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  kind?: MediaKind;
}

function matchesKind(mimeType: string, kind: MediaKind): boolean {
  if (kind === 'image') return mimeType.startsWith('image/');
  return mimeType === 'application/pdf' || (!mimeType.startsWith('image/') && !mimeType.startsWith('video/'));
}

export function MediaPickerModal({ open, onClose, onSelect, kind = 'image' }: MediaPickerModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const noun = kind === 'document' ? 'document' : 'image';
  const nounPlural = kind === 'document' ? 'documents' : 'images';

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    (async () => {
      const siteId = await getActiveSiteId();
      const media = await listMediaForSite(siteId);
      setItems(media.filter(m => matchesKind(m.mime_type, kind)));
      setLoading(false);
    })();
  }, [open, showUpload, kind]);

  const filtered = items.filter(item =>
    search === '' ||
    item.original_filename.toLowerCase().includes(search.toLowerCase()) ||
    (item.alt_text || '').toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    if (selected) {
      const item = items.find(i => i.id === selected);
      if (item) {
        onSelect(item.public_url);
        onClose();
        setSelected(null);
        setSearch('');
      }
    }
  }

  function formatSize(bytes: number | null) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[720px] max-h-[80vh] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
            <div>
              <Dialog.Title className="text-heading text-ink">Select Media</Dialog.Title>
              <Dialog.Description className="text-[12px] text-ink-muted mt-0.5">
                Choose {kind === 'document' ? 'a document' : 'an image'} from the library or upload a new one
              </Dialog.Description>
            </div>
            <Dialog.Close className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Search + toggle */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-surface-border flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${nounPlural}...`}
                className="w-full pl-9 pr-3 py-1.5 bg-surface-raised border border-surface-border rounded-button text-[13px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className={cn(
                'px-3 py-1.5 rounded-button text-[12px] font-medium transition-all border',
                showUpload
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-surface-raised text-ink-secondary border-surface-border hover:bg-surface-hover'
              )}
            >
              {showUpload ? 'Show Library' : 'Upload New'}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {showUpload ? (
              <UploadZone onUpload={() => setShowUpload(false)} />
            ) : loading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-6 h-6 text-ink-muted mx-auto mb-3 animate-spin" />
                <p className="text-[13px] text-ink-secondary">Loading media...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                {kind === 'document' ? (
                  <FileText className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                )}
                <p className="text-[13px] text-ink-secondary">
                  {items.length === 0 ? `No ${nounPlural} uploaded yet` : `No ${nounPlural} found`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {filtered.map((item) => {
                  const isSelected = selected === item.id;
                  const isImage = item.mime_type.startsWith('image/');
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelected(isSelected ? null : item.id)}
                      className={cn(
                        'group relative aspect-square rounded-card overflow-hidden border-2 transition-all duration-150',
                        isSelected
                          ? 'border-accent ring-2 ring-accent/20 scale-[0.97]'
                          : 'border-transparent hover:border-surface-border'
                      )}
                    >
                      <div className="absolute inset-0 bg-surface-raised">
                        {isImage ? (
                          <img
                            src={item.public_url}
                            alt={item.alt_text || item.original_filename}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3">
                            <FileText className="w-10 h-10 text-ink-muted" />
                            <p className="text-[11px] text-ink-secondary font-medium text-center line-clamp-2 break-all">
                              {item.original_filename}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className={cn(
                        'absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-150',
                        isSelected && 'bg-accent/20'
                      )} />

                      <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[11px] text-white font-medium truncate">{item.original_filename}</p>
                        <p className="text-[10px] text-white/70">{formatSize(item.size_bytes)}</p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md animate-scale-in">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-surface-border bg-surface-raised/50 flex-shrink-0">
            <p className="text-[12px] text-ink-muted">
              {selected ? `1 ${noun} selected` : `${filtered.length} ${nounPlural}`}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-ink-secondary border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selected}
                className="px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-40"
              >
                Select {noun === 'document' ? 'Document' : 'Image'}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
