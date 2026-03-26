import { Header } from '@/components/header';
import { Image, Upload, FolderOpen } from 'lucide-react';

export default function MediaPage() {
  return (
    <>
      <Header
        title="Media Library"
        description="Manage images, documents, and other media files"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Upload Files
          </button>
        }
      />
      <div className="p-8 animate-fade-in">
        <div className="glass-card rounded-card py-20 text-center">
          <div className="w-14 h-14 bg-surface-raised rounded-card mx-auto flex items-center justify-center border border-surface-border mb-4">
            <Image className="w-7 h-7 text-ink-muted" />
          </div>
          <p className="text-heading text-ink">Media Library</p>
          <p className="text-body text-ink-secondary mt-1 max-w-sm mx-auto">
            Upload and manage images, PDFs, and documents. Drag & drop or click to upload.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Upload Files
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-surface-border text-ink rounded-button text-[13px] font-medium hover:bg-surface-hover transition-colors">
              <FolderOpen className="w-3.5 h-3.5" />
              Browse Folders
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
