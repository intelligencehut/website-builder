'use client';

import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import {
  Upload,
  Search,
  Grid3X3,
  List,
  ImageIcon,
  FileText,
  Trash2,
  Link2,
  Check,
  X,
  Eye,
  Loader2,
  AlertCircle,
  Play,
  Pencil,
} from 'lucide-react';
import type { MediaItem } from '@/lib/actions/media';
import { listMediaForSite, uploadMediaFile, deleteMediaFile } from '@/lib/actions/media';
import { listVideosForSite, deleteVideo, isYoutubeConnected, updateVideoMetadata, type VideoItem } from '@/lib/actions/videos';
import { findAssetReferences } from '@/lib/actions/asset-references';
import { uploadVideoToYoutube, YoutubeNotConnectedError } from '@/lib/youtube/browser-upload';
import { DeleteConfirmDialog } from '@/components/media/delete-confirm-dialog';
import { VideoMetadataDialog, filenameToTitle } from '@/components/media/video-metadata-dialog';

type MediaType = 'all' | 'image' | 'document' | 'video';
type ViewMode = 'grid' | 'list';

const ACCEPTED_IMAGE_DOC_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
];

const ACCEPTED_VIDEO_TYPES = [
  'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska',
];

function getFileCategory(mimeType: string): 'image' | 'document' | 'video' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'document';
}

function formatSize(bytes: number | null): string {
  if (bytes == null) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const typeFilters: { key: MediaType; label: string; icon: typeof ImageIcon }[] = [
  { key: 'all', label: 'All Files', icon: Grid3X3 },
  { key: 'image', label: 'Images', icon: ImageIcon },
  { key: 'video', label: 'Videos', icon: Play },
  { key: 'document', label: 'Documents', icon: FileText },
];

interface VideoUploadProgress {
  id: string;
  filename: string;
  pct: number;
  error?: string;
}

export default function MediaPage() {
  const [siteId, setSiteId] = useState<string>('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [youtubeConnected, setYoutubeConnected] = useState<boolean | null>(null);
  const [youtubeChannelTitle, setYoutubeChannelTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState<VideoUploadProgress[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MediaType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ ids: string[]; filename?: string; kind?: 'media' | 'video' } | null>(null);
  const [pendingVideos, setPendingVideos] = useState<File[]>([]);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Read active site and load media
  useEffect(() => {
    const match = document.cookie.match(/wb_site_id=([^;]+)/);
    const activeSiteId = match?.[1] || 'a0000000-0000-0000-0000-000000000001';
    setSiteId(activeSiteId);
  }, []);

  const loadMedia = useCallback(async () => {
    if (!siteId) return;
    setLoading(true);
    try {
      const [mediaRes, videoRes, conn] = await Promise.all([
        listMediaForSite(siteId),
        listVideosForSite(siteId),
        isYoutubeConnected(siteId),
      ]);
      setMedia(mediaRes);
      setVideos(videoRes);
      setYoutubeConnected(conn.connected);
      setYoutubeChannelTitle(conn.channelTitle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media');
    }
    setLoading(false);
  }, [siteId]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleUpload = useCallback(async (files: FileList | File[]) => {
    if (!siteId) return;
    const all = Array.from(files);
    const videoFiles = all.filter(f => f.type.startsWith('video/'));
    const otherFiles = all.filter(f => ACCEPTED_IMAGE_DOC_TYPES.includes(f.type));

    if (videoFiles.length === 0 && otherFiles.length === 0) {
      setError('No valid files. Allowed: images, PDFs, and videos.');
      return;
    }

    setError(null);

    // Non-video uploads (images/PDFs) go through Supabase storage as before.
    if (otherFiles.length > 0) {
      setUploading(true);
      try {
        for (const file of otherFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('siteId', siteId);
          await uploadMediaFile(formData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      }
      await loadMedia();
      setUploading(false);
    }

    // Video uploads: enqueue and let the metadata dialog drive the loop.
    if (videoFiles.length > 0) {
      setPendingVideos(prev => [...prev, ...videoFiles]);
    }
  }, [siteId, loadMedia]);

  // Actually uploads the currently-queued video using the user-provided
  // metadata, then advances the queue. Runs in the background so multiple
  // videos can be queued without blocking the dialog on each one.
  const uploadPendingVideo = useCallback(
    async (file: File, title: string, description: string) => {
      if (!siteId) return;
      setUploading(true);
      const progressId = crypto.randomUUID();
      setVideoProgress(prev => [...prev, { id: progressId, filename: title, pct: 0 }]);
      try {
        await uploadVideoToYoutube(
          { siteId, file, title, description, privacyStatus: 'unlisted' },
          {
            onProgress: (pct) =>
              setVideoProgress(prev => prev.map(p => (p.id === progressId ? { ...p, pct } : p))),
          }
        );
        setVideoProgress(prev => prev.filter(p => p.id !== progressId));
      } catch (err) {
        const message =
          err instanceof YoutubeNotConnectedError
            ? err.message || 'Connect a YouTube channel in Settings to upload videos.'
            : err instanceof Error
            ? err.message
            : 'Video upload failed';
        setVideoProgress(prev => prev.map(p => (p.id === progressId ? { ...p, error: message } : p)));
        setError(message);
      }
      await loadMedia();
      setUploading(false);
    },
    [siteId, loadMedia]
  );

  const requestDelete = useCallback((id: string, filename: string, kind: 'media' | 'video' = 'media') => {
    setPendingDelete({ ids: [id], filename, kind });
  }, []);

  const saveVideoEdit = useCallback(async (title: string, description: string) => {
    const v = editingVideo;
    if (!v) return;
    setEditSaving(true);
    setEditError(null);
    try {
      await updateVideoMetadata(v.id, { title, description });
      setEditingVideo(null);
      await loadMedia();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Failed to save');
    }
    setEditSaving(false);
  }, [editingVideo, loadMedia]);

  const requestBulkDelete = useCallback(() => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const kind: 'media' | 'video' = typeFilter === 'video' ? 'video' : 'media';
    setPendingDelete({ ids, kind });
  }, [selected, typeFilter]);

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setError(null);
    const kind = pendingDelete.kind ?? 'media';
    for (const id of pendingDelete.ids) {
      if (kind === 'video') {
        await deleteVideo(id);
      } else {
        await deleteMediaFile(id);
      }
    }
    const deletedIds = new Set(pendingDelete.ids);
    if (kind === 'video') {
      setVideos(prev => prev.filter(v => !deletedIds.has(v.id)));
    } else {
      setMedia(prev => prev.filter(m => !deletedIds.has(m.id)));
    }
    setSelected(prev => {
      const next = new Set(prev);
      for (const id of pendingDelete.ids) next.delete(id);
      return next;
    });
  }, [pendingDelete]);

  const filtered = media
    .filter(m => {
      if (typeFilter === 'all') return true;
      if (typeFilter === 'image') return m.mime_type.startsWith('image/');
      if (typeFilter === 'document') return !m.mime_type.startsWith('image/') && !m.mime_type.startsWith('video/');
      return false; // videos rendered from their own collection
    })
    .filter(m => search === '' || m.original_filename.toLowerCase().includes(search.toLowerCase()));

  const filteredVideos = videos.filter(v =>
    search === '' ||
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    (v.original_filename ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const showVideos = typeFilter === 'all' || typeFilter === 'video';

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
        description={`${media.length + videos.length} files · ${typeFilter === 'all' ? 'All types' : typeFilter + 's'}`}
        actions={
          <label
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-button text-[13px] font-medium transition-colors cursor-pointer',
              uploading
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'bg-sidebar text-ink-inverse hover:bg-sidebar-hover'
            )}
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {uploading ? 'Uploading...' : 'Upload Files'}
            <input
              type="file"
              multiple
              accept={[...ACCEPTED_IMAGE_DOC_TYPES, ...ACCEPTED_VIDEO_TYPES].join(',')}
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
              disabled={uploading}
              className="hidden"
            />
          </label>
        }
      />

      <div
        className="p-8 space-y-5 animate-fade-in"
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files.length > 0) handleUpload(e.dataTransfer.files);
        }}
      >
        {/* Drag overlay */}
        {isDragOver && (
          <div className="fixed inset-0 bg-accent/5 border-2 border-dashed border-accent pointer-events-none z-50 flex items-center justify-center">
            <div className="bg-surface-card rounded-card p-6 shadow-panel border border-accent/30">
              <Upload className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="text-heading text-ink text-center">Drop files to upload</p>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-button animate-scale-in">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <p className="text-[12px] text-red-700 flex-1">{error}</p>
            <button onClick={() => setError(null)} className="p-0.5 text-red-400 hover:text-red-600">
              <X className="w-3 h-3" />
            </button>
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
            <span className="text-[13px] font-medium text-ink">{selected.size} selected</span>
            <div className="flex-1" />
            <button
              onClick={selectAll}
              className="text-[12px] text-accent hover:text-accent-hover transition-colors"
            >
              {selected.size === filtered.length ? 'Deselect all' : 'Select all'}
            </button>
            <div className="h-4 w-px bg-surface-border" />
            <button
              onClick={requestBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium text-red-600 hover:text-red-700 rounded-[4px] hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}

        {/* YouTube connection banner (only in Videos view, when not connected) */}
        {typeFilter === 'video' && youtubeConnected === false && (
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-button">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-[12px] text-amber-800 flex-1">
              No YouTube channel connected to this site. Uploaded videos go to the channel you connect.
            </p>
            <a
              href="/settings?tab=youtube"
              className="text-[12px] font-medium text-amber-900 hover:text-amber-950 underline"
            >
              Connect in Settings →
            </a>
          </div>
        )}
        {typeFilter === 'video' && youtubeConnected && youtubeChannelTitle && (
          <p className="text-[11px] text-ink-muted">
            Uploading to YouTube channel: <span className="font-medium text-ink-secondary">{youtubeChannelTitle}</span>
          </p>
        )}

        {/* Video upload progress */}
        {videoProgress.length > 0 && (
          <div className="glass-card rounded-card p-4 space-y-2">
            <p className="text-[12px] font-medium text-ink-secondary mb-2">Video uploads</p>
            {videoProgress.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <Play className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-ink truncate">{p.filename}</p>
                  <div className="mt-1 h-1 bg-surface-raised rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        p.error ? 'bg-red-500' : 'bg-accent'
                      )}
                      style={{ width: `${p.error ? 100 : p.pct}%` }}
                    />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-ink-muted w-16 text-right">
                  {p.error ? 'failed' : `${p.pct}%`}
                </span>
                {p.error && (
                  <button
                    onClick={() => setVideoProgress(prev => prev.filter(x => x.id !== p.id))}
                    className="text-ink-muted hover:text-ink"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading / empty / grid / list */}
        {loading ? (
          <div className="glass-card rounded-card py-20 text-center">
            <Loader2 className="w-6 h-6 text-ink-muted animate-spin mx-auto mb-3" />
            <p className="text-[12px] text-ink-muted">Loading media...</p>
          </div>
        ) : filtered.length === 0 && (!showVideos || filteredVideos.length === 0) ? (
          <div className="glass-card rounded-card py-20 text-center">
            <ImageIcon className="w-8 h-8 text-ink-muted mx-auto mb-3" />
            <p className="text-heading text-ink">
              {media.length + videos.length === 0 ? 'No files yet' : 'No files found'}
            </p>
            <p className="text-body text-ink-secondary mt-1">
              {search
                ? 'Try a different search term'
                : media.length + videos.length === 0
                ? 'Upload files or drag & drop to get started'
                : 'Try a different filter'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <>
          {showVideos && filteredVideos.length > 0 && (
            <div className="space-y-2">
              {typeFilter === 'all' && <p className="text-overline text-ink-muted">Videos</p>}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredVideos.map((v) => {
                  const isSelected = selected.has(v.id);
                  const isCopied = copiedId === v.id;
                  const youtubeUrl = v.youtube_video_id ? `https://www.youtube.com/watch?v=${v.youtube_video_id}` : '';
                  return (
                    <div
                      key={v.id}
                      className={cn(
                        'group relative rounded-card overflow-hidden border-2 transition-all duration-150',
                        isSelected
                          ? 'border-accent ring-2 ring-accent/20'
                          : 'border-surface-border hover:border-ink-muted/30 hover:shadow-card-hover'
                      )}
                    >
                      <div className="aspect-square bg-surface-raised relative">
                        {v.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
                        ) : v.youtube_video_id ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={`https://i.ytimg.com/vi/${v.youtube_video_id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="w-10 h-10 text-ink-muted/40" />
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </div>

                        {v.status !== 'ready' && (
                          <div className="absolute top-2 right-2 text-[10px] font-medium bg-black/70 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                            {v.status}
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          {youtubeUrl && (
                            <>
                              <button
                                onClick={() => copyUrl(v.id, youtubeUrl)}
                                className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                                title="Copy YouTube URL"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Link2 className="w-3.5 h-3.5" />}
                              </button>
                              <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                                title="Open on YouTube"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                          <button
                            onClick={() => { setEditError(null); setEditingVideo(v); }}
                            className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                            title="Edit title & description"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => requestDelete(v.id, v.title, 'video')}
                            className="p-2 bg-white/90 rounded-button text-red-600 hover:bg-red-50 transition-colors shadow-md"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => toggleSelect(v.id)}
                          className={cn(
                            'absolute top-2 left-2 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-all',
                            isSelected
                              ? 'bg-accent border-accent'
                              : 'bg-white/80 border-white/60 opacity-0 group-hover:opacity-100 hover:border-accent'
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </button>
                      </div>

                      <div className="px-2.5 py-2 bg-surface-card">
                        <p className="text-[12px] font-medium text-ink truncate">{v.title}</p>
                        <p className="text-[11px] text-ink-muted mt-0.5">
                          video{v.duration_seconds ? ` · ${formatDuration(v.duration_seconds)}` : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filtered.length > 0 && (
          <div className="space-y-2">
            {typeFilter === 'all' && showVideos && filteredVideos.length > 0 && (
              <p className="text-overline text-ink-muted mt-2">Images & Documents</p>
            )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((item) => {
              const isSelected = selected.has(item.id);
              const isCopied = copiedId === item.id;
              const category = getFileCategory(item.mime_type);
              const isImage = category === 'image';

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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.public_url}
                        alt={item.alt_text || item.original_filename}
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
                        onClick={(e) => { e.stopPropagation(); copyUrl(item.id, item.public_url); }}
                        className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                        title="Copy URL"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Link2 className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={item.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/90 rounded-button text-ink hover:bg-white transition-colors shadow-md"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); requestDelete(item.id, item.original_filename); }}
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
                      {formatSize(item.size_bytes)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="px-2.5 py-2 bg-surface-card">
                    <p className="text-[12px] font-medium text-ink truncate">{item.original_filename}</p>
                    <p className="text-[11px] text-ink-muted mt-0.5">{category}</p>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          )}
          </>
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
                {showVideos && filteredVideos.map((v) => {
                  const isSelected = selected.has(v.id);
                  const youtubeUrl = v.youtube_video_id ? `https://www.youtube.com/watch?v=${v.youtube_video_id}` : '';
                  return (
                    <tr key={v.id} className="hover:bg-surface-hover transition-colors group">
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => toggleSelect(v.id)}
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
                          <div className="w-8 h-8 rounded-[4px] overflow-hidden bg-surface-raised flex-shrink-0 relative">
                            {v.thumbnail_url || v.youtube_video_id ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={v.thumbnail_url || `https://i.ytimg.com/vi/${v.youtube_video_id}/default.jpg`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Play className="w-4 h-4 text-ink-muted m-auto" />
                            )}
                          </div>
                          <span className="text-[13px] font-medium text-ink truncate">{v.title}</span>
                          {v.status !== 'ready' && (
                            <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded uppercase tracking-wide">
                              {v.status}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary capitalize">video</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary font-mono">{formatSize(v.size_bytes)}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-muted">
                          {new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          {youtubeUrl && (
                            <button
                              onClick={() => copyUrl(v.id, youtubeUrl)}
                              className="p-1 text-ink-muted hover:text-accent rounded transition-colors"
                              title="Copy YouTube URL"
                            >
                              {copiedId === v.id ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Link2 className="w-3.5 h-3.5" />}
                            </button>
                          )}
                          <button
                            onClick={() => { setEditError(null); setEditingVideo(v); }}
                            className="p-1 text-ink-muted hover:text-accent rounded transition-colors"
                            title="Edit title & description"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => requestDelete(v.id, v.title, 'video')}
                            className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.map((item) => {
                  const isSelected = selected.has(item.id);
                  const category = getFileCategory(item.mime_type);
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
                            {category === 'image' ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.public_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-ink-muted" />
                              </div>
                            )}
                          </div>
                          <span className="text-[13px] font-medium text-ink truncate">{item.original_filename}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary capitalize">{category}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-secondary font-mono">{formatSize(item.size_bytes)}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-ink-muted">
                          {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => copyUrl(item.id, item.public_url)}
                            className="p-1 text-ink-muted hover:text-accent rounded transition-colors"
                            title="Copy URL"
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Link2 className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => requestDelete(item.id, item.original_filename)}
                            className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <VideoMetadataDialog
        open={pendingVideos.length > 0}
        mode="upload"
        subheading={pendingVideos[0]?.name}
        initialTitle={pendingVideos[0] ? filenameToTitle(pendingVideos[0].name) : ''}
        initialDescription=""
        onClose={() => setPendingVideos(prev => prev.slice(1))}
        onSubmit={(title, description) => {
          const file = pendingVideos[0];
          if (!file) return;
          setPendingVideos(prev => prev.slice(1));
          void uploadPendingVideo(file, title, description);
        }}
      />

      <VideoMetadataDialog
        open={editingVideo !== null}
        mode="edit"
        initialTitle={editingVideo?.title ?? ''}
        initialDescription={editingVideo?.description ?? ''}
        saving={editSaving}
        error={editError}
        onClose={() => { if (!editSaving) { setEditingVideo(null); setEditError(null); } }}
        onSubmit={(title, description) => void saveVideoEdit(title, description)}
      />

      <DeleteConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        filename={pendingDelete?.filename}
        count={pendingDelete?.ids.length}
        checkReferences={
          pendingDelete && pendingDelete.ids.length === 1 && siteId
            ? async () => {
                const id = pendingDelete.ids[0];
                if (pendingDelete.kind === 'video') {
                  const v = videos.find((x) => x.id === id);
                  if (!v?.youtube_video_id) return [];
                  return findAssetReferences({ siteId, youtubeId: v.youtube_video_id });
                }
                const m = media.find((x) => x.id === id);
                if (!m) return [];
                return findAssetReferences({
                  siteId,
                  imageUrl: m.public_url,
                  imagePath: m.storage_path,
                });
              }
            : undefined
        }
      />
    </>
  );
}
