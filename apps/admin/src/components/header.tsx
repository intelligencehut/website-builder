'use client';

import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Header({ title, description, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="min-w-0">
          <h1 className="font-display text-display-sm text-ink truncate">{title}</h1>
          {description && (
            <p className="text-body text-ink-secondary mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-surface-border rounded-button text-[13px] text-ink-muted hover:text-ink hover:border-ink-muted/30 transition-all w-[200px]">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="ml-auto text-[10px] font-mono bg-surface-raised px-1.5 py-0.5 rounded text-ink-muted border border-surface-border">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>

          {actions}
        </div>
      </div>
    </header>
  );
}
