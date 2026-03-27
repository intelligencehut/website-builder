'use server';

import type { ContentStatus } from '@website-builder/content-schema';

/**
 * Save a draft content version for a page.
 * Creates a new version with status "draft".
 */
export async function saveDraft(
  pageId: string,
  content: Record<string, unknown>,
  userId?: string
) {
  // TODO: Replace with real Supabase call when connected
  // const supabase = createServerClient();
  // return await saveDraftQuery(supabase, pageId, content, userId);

  // Simulate for now
  await new Promise((r) => setTimeout(r, 500));

  return {
    id: crypto.randomUUID(),
    page_id: pageId,
    version_number: Math.floor(Math.random() * 100) + 1,
    status: 'draft' as ContentStatus,
    content,
    created_by: userId,
    created_at: new Date().toISOString(),
  };
}

/**
 * Update a content version's status (draft → staged → published).
 */
export async function updateContentStatus(
  versionId: string,
  status: ContentStatus
) {
  await new Promise((r) => setTimeout(r, 300));

  return {
    id: versionId,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  };
}

/**
 * Get version history for a page.
 */
export async function getVersionHistory(pageId: string) {
  // Demo data
  return [
    { id: 'v1', version_number: 5, status: 'published' as ContentStatus, created_at: '2025-03-26T10:30:00Z', created_by: 'Amit Das' },
    { id: 'v2', version_number: 4, status: 'archived' as ContentStatus, created_at: '2025-03-25T14:00:00Z', created_by: 'Amit Das' },
    { id: 'v3', version_number: 3, status: 'archived' as ContentStatus, created_at: '2025-03-24T09:00:00Z', created_by: 'Amit Das' },
    { id: 'v4', version_number: 2, status: 'archived' as ContentStatus, created_at: '2025-03-20T11:00:00Z', created_by: 'Amit Das' },
    { id: 'v5', version_number: 1, status: 'archived' as ContentStatus, created_at: '2025-03-15T10:00:00Z', created_by: 'Amit Das' },
  ];
}
