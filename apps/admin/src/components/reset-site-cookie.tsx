'use client';

import { useEffect } from 'react';

/**
 * Client component that sets the wb_site_id cookie and reloads.
 * Used when the server detects the user's cookie points to a site
 * they don't have access to (e.g., new user after approval).
 */
export function ResetSiteCookie({ siteId }: { siteId: string }) {
  useEffect(() => {
    document.cookie = `wb_site_id=${siteId};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    window.location.reload();
  }, [siteId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-body text-ink-secondary">Loading your workspace...</p>
      </div>
    </div>
  );
}
