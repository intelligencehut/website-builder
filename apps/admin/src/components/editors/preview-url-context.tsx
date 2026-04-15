'use client';

import { createContext, useContext } from 'react';

const PreviewUrlContext = createContext<string | null>(null);

export function PreviewUrlProvider({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <PreviewUrlContext.Provider value={url || null}>
      {children}
    </PreviewUrlContext.Provider>
  );
}

/**
 * Returns the full URL for an image path. If the path is relative (starts with /)
 * and a preview URL is available, prepends the preview URL so the admin can
 * load the thumbnail from the target site.
 */
export function useImageUrl(path: string): string {
  const previewUrl = useContext(PreviewUrlContext);
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (previewUrl && path.startsWith('/')) return `${previewUrl}${path}`;
  return path;
}

export { PreviewUrlContext };
