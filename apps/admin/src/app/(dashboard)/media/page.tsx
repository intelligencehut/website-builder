'use client';

import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/header';
import { UploadZone } from '@/components/media/upload-zone';
import { cn } from '@/lib/utils';
import {
  Upload,
  Search,
  Grid3X3,
  List,
  ImageIcon,
  FileText,
  Film,
  Trash2,
  Download,
  Link2,
  MoreHorizontal,
  Check,
  X,
  Eye,
} from 'lucide-react';

type MediaType = 'all' | 'image' | 'document' | 'video';
type ViewMode = 'grid' | 'list';

interface MediaItem {
  id: string;
  name: string;
  src: string;
  type: 'image' | 'document' | 'video';
  size: string;
  dimensions?: string;
  uploadedAt: string;
  folder: string;
}

// Demo data for SEVAA site only
const SEVAA_SITE_ID = 'a0000000-0000-0000-0000-000000000001';

const DEMO_MEDIA: MediaItem[] = [
  { id: '1', name: 'about-2.jpg', src: '/images/about/about-2.jpg', type: 'image', size: '245 KB', dimensions: '1920×1080', uploadedAt: '2025-03-26', folder: '/about' },
  { id: '2', name: 'gallery-1.jpg', src: '/images/gallery/gallery-1.jpg', type: 'image', size: '312 KB', dimensions: '1600×1200', uploadedAt: '2025-03-25', folder: '/gallery' },
  { id: '3', name: 'gallery-2.jpg', src: '/images/gallery/gallery-2.jpg', type: 'image', size: '287 KB', dimensions: '1600×1200', uploadedAt: '2025-03-25', folder: '/gallery' },
  { id: '4', name: 'events-1.jpg', src: '/images/events/1.jpg', type: 'image', size: '198 KB', dimensions: '1920×1280', uploadedAt: '2025-03-24', folder: '/events' },
  { id: '5', name: 'events-2.jpg', src: '/images/events/2.jpg', type: 'image', size: '210 KB', dimensions: '1920×1280', uploadedAt: '2025-03-24', folder: '/events' },
  { id: '6', name: 'events-3.jpg', src: '/images/events/3.jpg', type: 'image', size: '175 KB', dimensions: '1920×1280', uploadedAt: '2025-03-24', folder: '/events' },
  { id: '7', name: 'seva-activities-1.jpg', src: '/images/programs/seva-activities-1.jpg', type: 'image', size: '420 KB', dimensions: '2048×1365', uploadedAt: '2025-03-20', folder: '/programs' },
  { id: '8', name: 'saparambera-1.jpg', src: '/images/programs/saparambera-1.jpg', type: 'image', size: '380 KB', dimensions: '2048×1365', uploadedAt: '2025-03-18', folder: '/programs' },
  { id: '9', name: 'banner-1.jpg', src: '/images/banner-1.jpg', type: 'image', size: '510 KB', dimensions: '2400×800', uploadedAt: '2025-03-15', folder: '/' },
  { id: '10', name: 'blessing-shivapradananda.jpg', src: '/images/blessing-letter-shivapradananda.jpg', type: 'image', size: '890 KB', dimensions: '1200×1600', uploadedAt: '2025-03-10', folder: '/' },
  { id: '11', name: 'Tilka Murmu Forest School.pdf', src: '/documents/Tilka Murmu Forest School.pdf', type: 'document', size: '2.1 MB', uploadedAt: '2025-03-09', folder: '/documents' },
  { id: '12', name: 'Sevaa Booklet 2024.jpg', src: '/images/userfiles/image/Sevaa Booklet 2024_001.jpg', type: 'image', size: '1.2 MB', dimensions: '2480×3508', uploadedAt: '2025-02-20', folder: '/publications' },
];

const typeFilters: { key: MediaType; label: string; icon: typeof ImageIcon }[] = [
  { key: 'all', label: 'All Files', icon: Grid3X3 },
  { key: 'image', label: 'Images', icon: ImageIcon },
  { key: 'document', label: 'Documents', icon: FileText },
  { key: 'video', label: 'Videos', icon: Film },
];

export default function MediaPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MediaType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [siteId, setSiteId] = useState<string>('');

  // Read active site from cookie
  useEffect(() => {
    const match = document.cookie.match(/wb_site_id=([^;]+)/);
    setSiteId(match?.[1] || SEVAA_SITE_ID);
  }, []);

  // Only show demo media for SEVAA; other sites start empty until media DB is wired up
  const siteMedia = siteId === SEVAA_SITE_ID ? DEMO_MEDIA : [];

  const filtered = siteMedia
    .filter(m => typeFilter === 'all' || m.type === typeFilter)
    .filter(m => search === '' || m.name.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(m => m.id)));
    }
  }, [filtered, selected.size]);

  const copyUrl = useCallback((id: string, src: string) => {
    navigator.clipboard.writeText(src);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  const hasSelection = selected.size > 0;

  return (
    <>
      <Header
        title="Media Library"
        description={`${siteMedia.length} files · ${typeFilter === 'all' ? 'All types' : typeFilter + 's'}`}
        actions={
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-button text-[13px] font-medium transition-colors',
              showUpload
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'bg-sidebar text-ink-inverse hover:bg-sidebar-hover'
            )}
          >
            <Upload className="w-3.5 h-3.5" />
            {showUpload ? 'Close Upload' : 'Upload Files'}
          </button>
        }
      />

      <div className="p-8 space-y-5 animate-fade-in">
        {/* Upload zone (collapsible) */}
        {showUpload && (
          <div className="animate-slide-up">
            <UploadZone onUpload={() => {}} />
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2 bg-surface-card border border-surface-border rounded-button text-body text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1 bg-surface-card border border-surface-border rounded-button p-1">
            {typeFilters.map(tf => (
              <button
                key={tf.key}
                onClick={() => setTypeFilter(tf.key)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] font-medium transition-all',
                  typeFilter === tf.key
                    ? 'bg-sidebar text-ink-inverse shadow-sm'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface-hover'
                )}
              >
                <tf.icon className="w-3 h-3" />
                {tf.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-0.5 bg-surface-card border border-surface-border rounded-button p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-[4px] transition-all',
                viewMode === 'grid' ? 'bg-sidebar text-ink-inverse' : 'text-ink-muted hover:text-ink'
              )}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-[4px] transition-all',
                viewMode === 'list' ? 'bg-sidebar text-ink-inverse' : 'text-ink-muted hover:text-ink'
              )}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bulk actions bar */}
        {hasSelection && (
          <div className="flex items-center gap-3 px-4 py-2.5 bg-accent/10 border border-accent/20 rounded-button animate-scale-in">
            <button
              onClick={() => setSelected(new Set())}
              className="p-1 text-ink-secondary hover:text-ink rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-[13px] font-medium text-ink">
              {selected.size} selected
            </span>
            <div className="flex-1" />
            <button
              onClick={selectAll}
              className="text-[12px] text-accent hover:text-accent-hover transition-colors"
            >
              {selected.size === filtered.length ? 'Deselect all' : 'Select all'}
            </button>
            <div className="h-4 w-px bg-surface-border" />
            <button className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium text-ink-secondary hover:text-ink rounded-[4px] hover:bg-surface-hover transition-colors">
              <Download className="w-3 h-3" /> Download
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium text-red-600 hover:text-red-700 rounded-[4px] hover:bg-red-50 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}

        {/* Grid view */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-card py-20 text-center">
            <ImageIcon className="w-8 h-8 text-ink-muted mx-auto mb-3" />
            <p className="text-heading text-ink">No files found</p>
            <p className="text-body text-ink-secondary mt-1">
              {search ? 'Try a different search term' : 'Upload files to get started'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((item) => {
              const isSelected = selected.has(item.id);
              const isCopied = copiedId === item.id;
              const isImage = item.type === 'image';

              return (
                <div
                  key={item.id}
                  className={cn(
                    'group relative rounded-card overflow-hidden border-2 transition-all duration-150 cursor-pointer',
                    isSelected
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-surface-border hover:border-ink-muted/30 hover:shadow-card-hover'
                  )}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square bg-surface-raised relative">
                    {isImage ? (
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-10 h-10 text-ink-muted/40" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); copyUrl(item.id, item.src); }}
                        className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                        title="Copy URL"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Link2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-2 bg-white/90 rounded-button text-red-600 hover:bg-red-50 transition-colors shadow-md"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Select checkbox */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
                      className={cn(
                        'absolute top-2 left-2 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-all',
                        isSelected
                          ? 'bg-accent border-accent'
                          : 'bg-white/80 border-white/60 opacity-0 group-hover:opacity-100 hover:border-accent'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </button>

                    {/* Size badge */}
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/60 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.size}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="px-2.5 py-2 bg-surface-card">
                    <p className="text-[12px] font-medium text-ink truncate">{item.name}</p>
                    <p className="text-[11px] text-ink-muted mt-0.5">{item.dimensions || item.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List view */
          <div className="glass-card rounded-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="w-10 px-4 py-3">
                    <button
                      onClick={selectAll}
                      className={cn(
                        'w-4 h-4 rounded-[3px] border-2 flex items-center justify-center transition-all',
                        selected.size === filtered.length && selected.size > 0
                          ? 'bg-accent border-accent'
                          : 'border-surface-border hover:border-ink-muted'
                      )}
                    >
                      {selected.size === filtered.length && selected.size > 0 && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </button>
                  </th>
                  <th className="text-left text-overline text-ink-muted px-4 py-3">File</th>
                  <th className="text-left text-overline text-ink-muted px-4 py-3">Type</th>
                  <th className="text-left text-overline text-ink-muted px-4 py-3">Size</th>
                  <th className="text-left text-overline text-ink-muted px-4 py-3">Uploaded</th>
                  <th className="w-10 px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.map((item) => {
                  const isSelected = selected.has(item.id);
                  return (
                    <tr key={item.id} className="hover:bg-surface-hover transition-colors group">
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => toggleSelect(item.id)}
                          className={cn(
                            'w-4 h-4 rounded-[3px] border-2 flex items-center justify-center transition-all',
                            isSelected ? 'bg-accent border-accent' : 'border-surface-border hover:border-ink-muted'
                          )}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </button>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[4px] overflow-hidden bg-surface-raised flex-shrink-0">
                            {item.type === 'image' ? (
                              <img src={item.src} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-ink-muted" />
                              </div>
                            )}
                          </div>
                          <span className="text-[13px] font-medium text-ink truncate">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary capitalize">{item.type}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary font-mono">{item.size}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-muted">{item.uploadedAt}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <button className="p-1 text-ink-muted hover:text-ink rounded opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
