'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';

interface Site {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

interface MobileNavState {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

const MobileNavContext = createContext<MobileNavState>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function useMobileNav() {
  return useContext(MobileNavContext);
}

interface AdminShellProps {
  user: { email?: string; name?: string } | null;
  sites: Site[];
  activeSiteId: string;
  userRole: string | null;
  children: ReactNode;
}

export function AdminShell({ user, sites, activeSiteId, userRole, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes (link click from inside it).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the drawer is open on mobile.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const value: MobileNavState = {
    open,
    setOpen,
    toggle: () => setOpen(v => !v),
  };

  return (
    <MobileNavContext.Provider value={value}>
      <div className="flex min-h-screen">
        <Sidebar user={user} sites={sites} activeSiteId={activeSiteId} userRole={userRole} />
        {open && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          />
        )}
        <main className="flex-1 lg:ml-[260px] bg-surface min-h-screen min-w-0 w-full">
          {children}
        </main>
      </div>
    </MobileNavContext.Provider>
  );
}
