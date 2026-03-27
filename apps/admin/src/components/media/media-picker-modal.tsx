'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Search, X, Check, ImageIcon } from 'lucide-react';
import { UploadZone } from './upload-zone';

// Demo data
const DEMO_IMAGES = [
  { id: '1', src: '/images/about/about-2.jpg', name: 'about-2.jpg', size: '245 KB' },
  { id: '2', src: '/images/gallery/gallery-1.jpg', name: 'gallery-1.jpg', size: '312 KB' },
  { id: '3', src: '/images/gallery/gallery-2.jpg', name: 'gallery-2.jpg', size: '287 KB' },
  { id: '4', src: '/images/events/1.jpg', name: 'events-1.jpg', size: '198 KB' },
  { id: '5', src: '/images/events/2.jpg', name: 'events-2.jpg', size: '210 KB' },
  { id: '6', src: '/images/events/3.jpg', name: 'events-3.jpg', size: '175 KB' },
  { id: '7', src: '/images/programs/seva-activities-1.jpg', name: 'seva-activities-1.jpg', size: '420 KB' },
  { id: '8', src: '/images/programs/saparambera-1.jpg', name: 'saparambera-1.jpg', size: '380 KB' },
  { id: '9', src: '/images/banner-1.jpg', name: 'banner-1.jpg', size: '510 KB' },
];

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ open, onClose, onSelect }: MediaPickerModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = DEMO_IMAGES.filter(img =>
    search === '' || img.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    if (selected) {
      const img = DEMO_IMAGES.find(i => i.id === selected);
      if (img) {
        onSelect(img.src);
        onClose();
        setSelected(null);
        setSearch('');
      }
    }
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
                Choose an image from the library or upload a new one
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
                placeholder="Search images..."
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
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <ImageIcon className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                <p className="text-[13px] text-ink-secondary">No images found</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {filtered.map((img) => {
                  const isSelected = selected === img.id;
                  return (
                    <button
                      key={img.id}
                      onClick={() => setSelected(isSelected ? null : img.id)}
                      className={cn(
                        'group relative aspect-square rounded-card overflow-hidden border-2 transition-all duration-150',
                        isSelected
                          ? 'border-accent ring-2 ring-accent/20 scale-[0.97]'
                          : 'border-transparent hover:border-surface-border'
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="absolute inset-0 bg-surface-raised">
                        <img
                          src={img.src}
                          alt={img.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className={cn(
                        'absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-150',
                        isSelected && 'bg-accent/20'
                      )} />

                      {/* Filename on hover */}
                      <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[11px] text-white font-medium truncate">{img.name}</p>
                        <p className="text-[10px] text-white/70">{img.size}</p>
                      </div>

                      {/* Selected check */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md animate-scale-in">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}

                      {/* Fallback for broken images */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ImageIcon className="w-6 h-6 text-ink-muted/30" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-surface-border bg-surface-raised/50 flex-shrink-0">
            <p className="text-[12px] text-ink-muted">
              {selected ? `1 image selected` : `${filtered.length} images`}
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
                Select Image
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
