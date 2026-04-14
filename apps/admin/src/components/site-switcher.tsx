'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { setActiveSiteId } from '@/lib/site-context';

interface Site {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

interface SiteSwitcherProps {
  sites: Site[];
  activeSiteId: string;
}

export function SiteSwitcher({ sites, activeSiteId }: SiteSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeSite = sites.find(s => s.id === activeSiteId) || sites[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSelect(siteId: string) {
    if (siteId === activeSiteId) {
      setOpen(false);
      return;
    }
    await setActiveSiteId(siteId);
    setOpen(false);
    window.location.href = '/';
  }

  if (!activeSite) return null;

  return (
    <div ref={ref} className="relative px-3 py-3 border-b border-sidebar-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-button hover:bg-sidebar-hover transition-colors group"
      >
        <div className="w-7 h-7 bg-accent/10 rounded-[6px] flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-semibold text-accent">
            {activeSite.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[13px] font-medium text-ink-inverse truncate">{activeSite.name}</p>
          <p className="text-[11px] text-sidebar-muted">{activeSite.domain || 'Production'}</p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-sidebar-muted group-hover:text-ink-inverse transition-all flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-sidebar-active rounded-button border border-sidebar-border shadow-panel z-50 overflow-hidden animate-scale-in">
          <div className="py-1">
            {sites.map(site => (
              <button
                key={site.id}
                onClick={() => handleSelect(site.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-sidebar-hover transition-colors text-left"
              >
                <div className="w-6 h-6 bg-accent/10 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-semibold text-accent">
                    {site.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-ink-inverse truncate">{site.name}</p>
                  <p className="text-[10px] text-sidebar-muted truncate">{site.domain}</p>
                </div>
                {site.id === activeSiteId && (
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
