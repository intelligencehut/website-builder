'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileImage, FileText, Film, CheckCircle2 } from 'lucide-react';

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  preview?: string;
}

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
  compact?: boolean;
  accept?: string;
  className?: string;
}

const ACCEPTED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf', 'video/mp4', 'video/webm',
];

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return FileImage;
  if (type.startsWith('video/')) return Film;
  return FileText;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadZone({ onUpload, compact, accept, className }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList | File[]) => {
    const validFiles = Array.from(fileList).filter(f => ACCEPTED_TYPES.includes(f.type));
    if (validFiles.length === 0) return;

    const newFiles: UploadFile[] = validFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      progress: 0,
      status: 'pending',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setFiles(prev => [...prev, ...newFiles]);
    onUpload(validFiles);

    // Simulate upload progress
    newFiles.forEach((uf, i) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          setFiles(prev => prev.map(f => {
            if (f.id !== uf.id) return f;
            const newProgress = Math.min(f.progress + Math.random() * 30 + 10, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress >= 100 ? 'done' : 'uploading',
            };
          }));
        }, 200);

        setTimeout(() => clearInterval(interval), 2000);
      }, i * 300);
    });
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  }, []);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-card cursor-pointer transition-all duration-200',
          compact ? 'px-4 py-6' : 'px-6 py-10',
          isDragOver
            ? 'border-accent bg-accent/5 scale-[1.01]'
            : 'border-surface-border hover:border-ink-muted/40 hover:bg-surface-hover/50',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept || ACCEPTED_TYPES.join(',')}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <div className={cn('flex flex-col items-center gap-3', compact && 'gap-2')}>
          <div className={cn(
            'rounded-card flex items-center justify-center transition-colors',
            compact ? 'w-10 h-10' : 'w-14 h-14',
            isDragOver ? 'bg-accent/15' : 'bg-surface-raised border border-surface-border',
          )}>
            <Upload className={cn(
              'transition-colors',
              compact ? 'w-4 h-4' : 'w-6 h-6',
              isDragOver ? 'text-accent' : 'text-ink-muted',
            )} />
          </div>

          {!compact && (
            <>
              <div className="text-center">
                <p className="text-[13px] font-medium text-ink">
                  {isDragOver ? 'Drop files here' : 'Drag & drop files'}
                </p>
                <p className="text-[12px] text-ink-muted mt-0.5">
                  or <span className="text-accent">browse</span> to upload
                </p>
              </div>
              <p className="text-[11px] text-ink-muted">
                Images, PDFs, and videos up to 10MB
              </p>
            </>
          )}

          {compact && (
            <p className="text-[12px] text-ink-muted">
              {isDragOver ? 'Drop here' : <>Drop files or <span className="text-accent">browse</span></>}
            </p>
          )}
        </div>

        {/* Animated border effect on drag */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-card border-2 border-accent animate-pulse-soft pointer-events-none" />
        )}
      </div>

      {/* Upload progress list */}
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((uf) => {
            const Icon = getFileIcon(uf.file.type);
            return (
              <div
                key={uf.id}
                className="flex items-center gap-3 px-3 py-2 bg-surface-card border border-surface-border rounded-button animate-scale-in"
              >
                {/* Preview / icon */}
                {uf.preview ? (
                  <div className="w-8 h-8 rounded-[4px] overflow-hidden bg-surface-raised flex-shrink-0">
                    <img src={uf.preview} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-[4px] bg-surface-raised flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-ink-muted" />
                  </div>
                )}

                {/* File info + progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-medium text-ink truncate">{uf.file.name}</p>
                    <span className="text-[11px] text-ink-muted ml-2 flex-shrink-0">
                      {formatSize(uf.file.size)}
                    </span>
                  </div>
                  {uf.status !== 'done' && (
                    <div className="mt-1.5 h-1 bg-surface-raised rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uf.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Status */}
                {uf.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-status-published flex-shrink-0" />
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(uf.id); }}
                    className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
