'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Image,
  Rocket,
  Navigation,
  Settings,
  Layers,
  LogOut,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SiteSwitcher } from './site-switcher';
import { useMobileNav } from './admin-shell';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Pages', href: '/pages', icon: FileText },
  { label: 'Media', href: '/media', icon: Image },
  { label: 'Deploys', href: '/deploys', icon: Rocket },
  { label: 'Navigation', href: '/navigation', icon: Navigation },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface Site {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

interface SidebarProps {
  user: { email?: string; name?: string } | null;
  sites?: Site[];
  activeSiteId?: string;
  userRole?: string | null;
}

export function Sidebar({ user, sites = [], activeSiteId = '', userRole }: SidebarProps) {
  const pathname = usePathname();
  const { open, setOpen } = useMobileNav();

  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase?.auth.signOut();
    } catch {
      // Supabase not configured — just redirect
    }
    window.location.href = '/login';
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar flex flex-col sidebar-noise z-50 transition-transform duration-200 ease-out',
        'lg:translate-x-0',
        open ? 'translate-x-0 shadow-panel' : '-translate-x-full'
      )}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-accent/15 rounded-[8px] flex items-center justify-center flex-shrink-0">
              <Layers className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[15px] text-ink-inverse truncate leading-tight">
                Website Builder
              </p>
              <p className="text-[11px] text-sidebar-muted mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-button text-sidebar-muted hover:text-ink-inverse hover:bg-sidebar-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Site selector */}
        <SiteSwitcher sites={sites} activeSiteId={activeSiteId} />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto custom-scrollbar">
          <p className="text-overline text-sidebar-muted px-3 mb-2">MANAGE</p>
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-button text-[13px] font-medium transition-all duration-150',
                  isActive
                    ? 'bg-sidebar-active text-ink-inverse'
                    : 'text-sidebar-muted hover:text-ink-inverse hover:bg-sidebar-hover'
                )}
              >
                <item.icon
                  className={cn(
                    'w-[18px] h-[18px] flex-shrink-0 transition-colors',
                    isActive ? 'text-accent' : ''
                  )}
                />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-active flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-semibold text-accent">
                {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink-inverse truncate">
                {user?.name || user?.email || 'User'}
              </p>
              <p className="text-[11px] text-sidebar-muted truncate">
                {user?.email || ''}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-[6px] text-sidebar-muted hover:text-ink-inverse hover:bg-sidebar-hover transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
