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
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Pages', href: '/pages', icon: FileText },
  { label: 'Media', href: '/media', icon: Image },
  { label: 'Deploys', href: '/deploys', icon: Rocket },
  { label: 'Navigation', href: '/navigation', icon: Navigation },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  user: { email?: string; name?: string } | null;
  siteName?: string;
}

export function Sidebar({ user, siteName = 'SEVAA' }: SidebarProps) {
  const pathname = usePathname();

  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Supabase not configured — just redirect
    }
    window.location.href = '/login';
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar flex flex-col sidebar-noise z-50">
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
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
        </div>

        {/* Site selector */}
        <div className="px-3 py-3 border-b border-sidebar-border">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-button hover:bg-sidebar-hover transition-colors group">
            <div className="w-7 h-7 bg-accent/10 rounded-[6px] flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-semibold text-accent">
                {siteName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-medium text-ink-inverse truncate">{siteName}</p>
              <p className="text-[11px] text-sidebar-muted">Production</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-sidebar-muted group-hover:text-ink-inverse transition-colors flex-shrink-0" />
          </button>
        </div>

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
