'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Layout, Type, Image, Grid3X3, GalleryHorizontalEnd, Quote, BarChart3, Megaphone, Phone, Code, Plug, Sparkles, HeartHandshake, Landmark, List, Video } from 'lucide-react';

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero Banner', description: 'Full-width hero with heading, buttons, and image', icon: Layout },
  { type: 'page-header', label: 'Page Header', description: 'Dark banner with title and subtitle', icon: Layout },
  { type: 'text', label: 'Text Block', description: 'Heading and body text content', icon: Type },
  { type: 'text-with-image', label: 'Text with Image', description: 'Text on one side, image on the other', icon: Image },
  { type: 'card-grid', label: 'Card Grid', description: 'Grid of cards with images and descriptions', icon: Grid3X3 },
  { type: 'cards-grid', label: 'Cards Grid (Icon + Stat)', description: 'Cards with icon, stat, and description', icon: Grid3X3 },
  { type: 'programs-grid', label: 'Programs Grid', description: 'Grid of linked program cards with images', icon: Grid3X3 },
  { type: 'gallery', label: 'Image Gallery', description: 'Grid of images with optional captions', icon: GalleryHorizontalEnd },
  { type: 'video', label: 'Video', description: 'Embed one or more YouTube videos in a grid', icon: Video },
  { type: 'testimonials', label: 'Testimonials', description: 'Customer or supporter quotes', icon: Quote },
  { type: 'stats', label: 'Statistics', description: 'Number counters with labels', icon: BarChart3 },
  { type: 'feature-highlight', label: 'Feature Highlight', description: 'Large feature box with image and bullet list', icon: Sparkles },
  { type: 'partners', label: 'Partners', description: 'Cards listing partner organisations', icon: HeartHandshake },
  { type: 'cta', label: 'Call to Action', description: 'Banner with heading and buttons', icon: Megaphone },
  { type: 'contact', label: 'Contact Info', description: 'Email, phone, address display', icon: Phone },
  { type: 'bank-details', label: 'Bank Details', description: 'Donation bank transfer details', icon: Landmark },
  { type: 'list', label: 'List', description: 'Simple bulleted list with heading', icon: List },
  { type: 'html', label: 'Custom HTML', description: 'Raw HTML content block', icon: Code },
  { type: 'dynamic-slot', label: 'Dynamic Slot', description: 'Placeholder for live data from the site\'s database', icon: Plug },
];

interface AddSectionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
}

export function AddSectionDialog({ open, onClose, onAdd }: AddSectionDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={o => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[560px] max-h-[80vh] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
            <div>
              <Dialog.Title className="text-heading text-ink">Add Section</Dialog.Title>
              <Dialog.Description className="text-[12px] text-ink-muted mt-0.5">Choose a section type to add to this page</Dialog.Description>
            </div>
            <Dialog.Close className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3">
              {SECTION_TYPES.map(st => (
                <button
                  key={st.type}
                  onClick={() => { onAdd(st.type); onClose(); }}
                  className="flex items-start gap-3 p-4 bg-surface-raised border border-surface-border rounded-card hover:border-accent/40 hover:bg-accent/5 transition-all text-left group"
                >
                  <div className="w-9 h-9 bg-surface-card rounded-button flex items-center justify-center border border-surface-border group-hover:border-accent/30 flex-shrink-0">
                    <st.icon className="w-4 h-4 text-ink-secondary group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-ink">{st.label}</p>
                    <p className="text-[11px] text-ink-muted mt-0.5">{st.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
