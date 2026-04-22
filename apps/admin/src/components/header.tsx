'use client';

import { Menu, Search, Bell } from 'lucide-react';
import { useMobileNav } from './admin-shell';

interface HeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Header({ title, description, actions }: HeaderProps) {
  const { setOpen } = useMobileNav();

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="lg:hidden -ml-1 p-2 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-[20px] sm:text-display-sm text-ink truncate leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-[12px] sm:text-body text-ink-secondary mt-0.5 truncate">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search — desktop only */}
          <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-surface-border rounded-button text-[13px] text-ink-muted hover:text-ink hover:border-ink-muted/30 transition-all w-[200px]">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="ml-auto text-[10px] font-mono bg-surface-raised px-1.5 py-0.5 rounded text-ink-muted border border-surface-border">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="hidden sm:inline-flex relative p-2 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>

          {actions}
        </div>
      </div>
    </header>
  );
}
