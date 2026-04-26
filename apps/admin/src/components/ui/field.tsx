'use client';

import { useState, useContext } from 'react';
import { cn } from '@/lib/utils';
import { PreviewUrlContext } from '@/components/editors/preview-url-context';

interface FieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, description, error, required, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-[11px] font-medium text-ink-secondary block">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {description && !error && (
        <p className="text-[11px] text-ink-muted">{description}</p>
      )}
      {error && (
        <p className="text-[11px] text-red-500">{error}</p>
      )}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean;
}

export function TextInput({ className, mono, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink',
        'placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all',
        mono && 'font-mono',
        className
      )}
    />
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink',
        'placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-y min-h-[80px]',
        className
      )}
    />
  );
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function SelectInput({ className, options, ...props }: SelectInputProps) {
  return (
    <select
      {...props}
      className={cn(
        'w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink',
        'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all appearance-none',
        'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a8a29e%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E")] bg-[length:12px] bg-[right_8px_center] bg-no-repeat pr-7',
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorInput({ value, onChange, className }: ColorInputProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded-[4px] border border-surface-border cursor-pointer p-0.5"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
      />
    </div>
  );
}

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export function NumberInput({ className, ...props }: NumberInputProps) {
  return (
    <input
      type="number"
      {...props}
      className={cn(
        'w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink',
        'placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all',
        className
      )}
    />
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-surface-border text-accent focus:ring-accent/30"
      />
      <span className="text-[13px] text-ink">{label}</span>
    </label>
  );
}

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const previewUrl = useContext(PreviewUrlContext);

  // Resolve relative paths using the site's preview URL for thumbnail display.
  // Coerce defensively — some legacy section data uses object shapes for image fields.
  const safeValue = typeof value === 'string' ? value : '';
  const thumbnailSrc = safeValue
    ? safeValue.startsWith('http')
      ? safeValue
      : previewUrl && safeValue.startsWith('/')
        ? `${previewUrl}${safeValue}`
        : null
    : null;

  return (
    <div className="space-y-1.5">
      {label && <label className="text-[11px] font-medium text-ink-secondary block">{label}</label>}
      <div className="flex items-start gap-3">
        <div className="w-20 h-14 bg-surface-raised rounded-[6px] border border-dashed border-surface-border flex items-center justify-center flex-shrink-0 overflow-hidden">
          {thumbnailSrc ? (
            <img src={thumbnailSrc} alt="" className="w-full h-full object-cover rounded-[5px]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <svg className="w-5 h-5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <TextInput
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            placeholder="/images/..."
            mono
          />
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="mt-1.5 text-[11px] text-accent hover:text-accent-hover transition-colors"
          >
            Browse Media Library
          </button>
        </div>
      </div>
      {showPicker && (
        <MediaPickerLazy
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onSelect={(url) => { onChange(url); setShowPicker(false); }}
        />
      )}
    </div>
  );
}

/** Lazy-loaded media picker to avoid circular deps and bundle size */
function MediaPickerLazy(props: { open: boolean; onClose: () => void; onSelect: (url: string) => void; kind?: 'image' | 'document' }) {
  const { MediaPickerModal } = require('@/components/media/media-picker-modal');
  return <MediaPickerModal {...props} />;
}

interface DocumentPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function DocumentPicker({ value, onChange, label, placeholder }: DocumentPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const filename = value ? value.split('/').pop() || value : null;

  return (
    <div className="space-y-1.5">
      {label && <label className="text-[11px] font-medium text-ink-secondary block">{label}</label>}
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 bg-surface-raised rounded-[6px] border border-dashed border-surface-border flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div className="flex-1">
          <TextInput
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            placeholder={placeholder ?? '/documents/...'}
            mono
          />
          {filename && value && (
            <p className="mt-1 text-[11px] text-ink-muted truncate">{filename}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="mt-1.5 text-[11px] text-accent hover:text-accent-hover transition-colors"
          >
            Browse Media Library
          </button>
        </div>
      </div>
      {showPicker && (
        <MediaPickerLazy
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onSelect={(url) => { onChange(url); setShowPicker(false); }}
          kind="document"
        />
      )}
    </div>
  );
}
