'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Search, X, Check, Play, Loader2, Upload, AlertCircle } from 'lucide-react';
import { listVideosForSite, isYoutubeConnected, type VideoItem } from '@/lib/actions/videos';
import { getActiveSiteId } from '@/lib/site-context';
import { uploadVideoToYoutube, YoutubeNotConnectedError } from '@/lib/youtube/browser-upload';
import { VideoMetadataDialog, filenameToTitle } from '@/components/media/video-metadata-dialog';

export interface VideoPickerSelection {
  youtubeId: string;
  title: string;
  caption?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (selection: VideoPickerSelection) => void;
}

export function VideoPickerModal({ open, onClose, onSelect }: Props) {
  const [siteId, setSiteId] = useState<string>('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  async function refresh() {
    setLoading(true);
    const sid = await getActiveSiteId();
    setSiteId(sid);
    const [videos, conn] = await Promise.all([
      listVideosForSite(sid),
      isYoutubeConnected(sid),
    ]);
    setItems(videos.filter(v => v.status === 'ready' && v.youtube_video_id));
    setConnected(conn.connected);
    setLoading(false);
  }

  useEffect(() => {
    if (!open) return;
    refresh();
  }, [open]);

  const filtered = items.filter(v =>
    search === '' ||
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    (v.original_filename ?? '').toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    const item = items.find(i => i.id === selected);
    if (!item || !item.youtube_video_id) return;
    onSelect({
      youtubeId: item.youtube_video_id,
      title: item.title,
      caption: item.description ?? undefined,
    });
    onClose();
    setSelected(null);
    setSearch('');
  }

  function handleFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset the input so picking the same file twice in a row still fires change.
    e.target.value = '';
    if (!file || !siteId) return;
    setError(null);
    setPendingFile(file);
  }

  async function handleUploadConfirmed(title: string, description: string) {
    const file = pendingFile;
    if (!file || !siteId) return;
    setPendingFile(null);
    setUploading(true);
    setUploadPct(0);
    setError(null);
    try {
      await uploadVideoToYoutube(
        { siteId, file, title, description, privacyStatus: 'unlisted' },
        { onProgress: setUploadPct }
      );
      await refresh();
    } catch (err) {
      setError(
        err instanceof YoutubeNotConnectedError
          ? err.message || 'Connect a YouTube channel in Settings to upload videos.'
          : err instanceof Error
          ? err.message
          : 'Upload failed'
      );
    }
    setUploading(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[760px] max-h-[82vh] bg-surface-card rounded-panel shadow-panel border border-surface-border overflow-hidden animate-scale-in flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border flex-shrink-0">
            <div>
              <Dialog.Title className="text-heading text-ink">Select Video</Dialog.Title>
              <Dialog.Description className="text-[12px] text-ink-muted mt-0.5">
                Pick a video from your library or upload a new one to YouTube.
              </Dialog.Description>
            </div>
            <Dialog.Close className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {connected === false && (
            <div className="px-6 py-3 border-b border-surface-border bg-amber-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-[12px] text-amber-800 flex-1">
                  No YouTube channel connected for this site.
                </p>
                <a href="/settings?tab=youtube" className="text-[12px] font-medium text-amber-900 underline">
                  Connect →
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 px-6 py-3 border-b border-surface-border flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search videos..."
                className="w-full pl-9 pr-3 py-1.5 bg-surface-raised border border-surface-border rounded-button text-[13px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <label
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-button text-[12px] font-medium cursor-pointer transition-all border',
                uploading
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-surface-raised text-ink-secondary border-surface-border hover:bg-surface-hover'
              )}
            >
              {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              {uploading ? `Uploading ${uploadPct}%` : 'Upload New'}
              <input
                type="file"
                accept="video/*"
                onChange={handleFilePicked}
                disabled={uploading || !connected}
                className="hidden"
              />
            </label>
          </div>

          {error && (
            <div className="px-6 py-2 bg-red-50 border-b border-red-100">
              <p className="text-[12px] text-red-700">{error}</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {loading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-6 h-6 text-ink-muted mx-auto mb-3 animate-spin" />
                <p className="text-[13px] text-ink-secondary">Loading videos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <Play className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                <p className="text-[13px] text-ink-secondary">
                  {items.length === 0 ? 'No videos uploaded yet' : 'No videos match your search'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {filtered.map((v) => {
                  const isSelected = selected === v.id;
                  const thumb = v.thumbnail_url ?? (v.youtube_video_id ? `https://i.ytimg.com/vi/${v.youtube_video_id}/mqdefault.jpg` : null);
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelected(isSelected ? null : v.id)}
                      className={cn(
                        'group relative rounded-card overflow-hidden border-2 transition-all duration-150 text-left',
                        isSelected
                          ? 'border-accent ring-2 ring-accent/20 scale-[0.98]'
                          : 'border-transparent hover:border-surface-border'
                      )}
                    >
                      <div className="aspect-video bg-surface-raised relative">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
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
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md animate-scale-in">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="px-2.5 py-2 bg-surface-card">
                        <p className="text-[12px] font-medium text-ink truncate">{v.title}</p>
                        <p className="text-[11px] text-ink-muted font-mono mt-0.5 truncate">{v.youtube_video_id}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-6 py-3 border-t border-surface-border bg-surface-raised/50 flex-shrink-0">
            <p className="text-[12px] text-ink-muted">
              {selected ? '1 video selected' : `${filtered.length} videos`}
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
                Select Video
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      <VideoMetadataDialog
        open={pendingFile !== null}
        mode="upload"
        subheading={pendingFile?.name}
        initialTitle={pendingFile ? filenameToTitle(pendingFile.name) : ''}
        initialDescription=""
        onClose={() => setPendingFile(null)}
        onSubmit={handleUploadConfirmed}
      />
    </Dialog.Root>
  );
}
