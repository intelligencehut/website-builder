'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export interface AssetReference {
  pageId: string;
  pageTitle: string;
  pageSlug: string;
  sectionType: string;
  // Human-readable version status — 'published', 'staged', 'draft'.
  versionStatus: string;
}

export interface AssetReferenceQuery {
  siteId: string;
  /**
   * Match assets by one of:
   *   - `imageUrl` (public_url, matched as substring)
   *   - `imagePath` (storage_path, matched as substring)
   *   - `youtubeId` (matched exactly against `items[].youtubeId`)
   */
  imageUrl?: string;
  imagePath?: string;
  youtubeId?: string;
}

/**
 * Walk every content_version for the site and find sections that still
 * reference the given asset. Used by the delete-confirm dialog to warn
 * editors before removing something that's in active use.
 *
 * We scan all non-archived versions (draft/staged/published) — deleting
 * an asset still in a draft would regress when the editor opens that
 * draft next.
 */
export async function findAssetReferences(
  query: AssetReferenceQuery
): Promise<AssetReference[]> {
  const db = createAdminClient();
  if (!db) return [];

  if (!query.imageUrl && !query.imagePath && !query.youtubeId) return [];

  const { data: pages } = await db
    .from('pages')
    .select('id, title, slug')
    .eq('site_id', query.siteId);
  if (!pages?.length) return [];

  const pageIds = pages.map((p) => p.id);
  const { data: versions } = await db
    .from('content_versions')
    .select('id, page_id, status, content, version_number')
    .in('page_id', pageIds)
    .in('status', ['draft', 'staged', 'published'])
    .order('version_number', { ascending: false });
  if (!versions?.length) return [];

  // Keep only the most-recent version per (page_id, status).
  type Version = (typeof versions)[number];
  const latestByPageStatus = new Map<string, Version>();
  for (const v of versions) {
    const key = `${v.page_id}:${v.status}`;
    if (!latestByPageStatus.has(key)) latestByPageStatus.set(key, v);
  }

  const pagesById = new Map(pages.map((p) => [p.id, p]));
  const refs: AssetReference[] = [];
  const seen = new Set<string>(); // dedupe per page+sectionType

  for (const v of latestByPageStatus.values()) {
    const content = v.content as { sections?: unknown[] } | null;
    const sections = Array.isArray(content?.sections) ? content.sections : [];
    for (const section of sections) {
      if (!section || typeof section !== 'object') continue;
      const s = section as { type?: string; data?: unknown; id?: string };
      if (sectionReferencesAsset(s.data, query)) {
        const page = pagesById.get(v.page_id);
        if (!page) continue;
        const dedupeKey = `${page.id}:${s.type}:${v.status}`;
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);
        refs.push({
          pageId: page.id,
          pageTitle: page.title,
          pageSlug: page.slug,
          sectionType: s.type ?? 'unknown',
          versionStatus: v.status,
        });
      }
    }
  }

  // Stable sort: pages first by slug, then by status so 'published' precedes 'draft'.
  const statusRank: Record<string, number> = { published: 0, staged: 1, draft: 2 };
  refs.sort((a, b) => {
    if (a.pageSlug !== b.pageSlug) return a.pageSlug.localeCompare(b.pageSlug);
    return (statusRank[a.versionStatus] ?? 99) - (statusRank[b.versionStatus] ?? 99);
  });
  return refs;
}

function sectionReferencesAsset(data: unknown, query: AssetReferenceQuery): boolean {
  if (data == null) return false;
  if (typeof data === 'string') {
    if (query.imageUrl && data.includes(query.imageUrl)) return true;
    if (query.imagePath && data.includes(query.imagePath)) return true;
    return false;
  }
  if (typeof data === 'object') {
    // Fast path for videos: look for items[].youtubeId exactly.
    if (query.youtubeId && 'items' in (data as Record<string, unknown>)) {
      const items = (data as { items?: unknown }).items;
      if (Array.isArray(items)) {
        for (const item of items) {
          if (
            item &&
            typeof item === 'object' &&
            (item as { youtubeId?: unknown }).youtubeId === query.youtubeId
          ) {
            return true;
          }
        }
      }
    }
    // Recurse into every value — images and other media live in many shapes.
    for (const v of Object.values(data as Record<string, unknown>)) {
      if (sectionReferencesAsset(v, query)) return true;
    }
  }
  if (Array.isArray(data)) {
    for (const v of data) {
      if (sectionReferencesAsset(v, query)) return true;
    }
  }
  return false;
}
