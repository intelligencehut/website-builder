'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export interface PageRecord {
  id: string;
  slug: string;
  title: string;
  page_type: string;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  is_active: boolean;
  updated_at: string;
  latest_status: string | null;
}

/**
 * Get all pages for the current site with their latest content status.
 */
export async function getPages(siteId: string): Promise<PageRecord[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data: pages, error } = await supabase
    .from('pages')
    .select('*')
    .eq('site_id', siteId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error || !pages) return [];

  // Get latest content version status for each page
  const pagesWithStatus = await Promise.all(
    pages.map(async (page) => {
      const { data: version } = await supabase
        .from('content_versions')
        .select('status')
        .eq('page_id', page.id)
        .order('version_number', { ascending: false })
        .limit(1)
        .single();

      return {
        ...page,
        latest_status: version?.status || null,
      } as PageRecord;
    })
  );

  return pagesWithStatus;
}

/**
 * Get a single page with its latest content.
 */
export async function getPageWithContent(pageId: string) {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single();

  if (pageError || !page) return null;

  const { data: version } = await supabase
    .from('content_versions')
    .select('*')
    .eq('page_id', pageId)
    .order('version_number', { ascending: false })
    .limit(1)
    .single();

  return {
    ...page,
    content: version?.content || null,
    version_id: version?.id || null,
    version_number: version?.version_number || 0,
    content_status: version?.status || 'draft',
  };
}

/**
 * Trigger on-demand revalidation on a site's preview URL (server-side).
 */
export async function revalidateSite(siteId: string, path: string = '/') {
  const site = await getSiteMetadata(siteId);
  if (!site) return;

  const metadata = site.metadata as Record<string, unknown> | undefined;
  const previewUrl = metadata?.preview_url as string | undefined;
  const revalidationSecret = metadata?.revalidation_secret as string | undefined;

  if (!previewUrl) return;

  try {
    await fetch(`${previewUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(revalidationSecret ? { 'x-revalidation-secret': revalidationSecret } : {}),
      },
      body: JSON.stringify({ path }),
    });
  } catch (err) {
    console.error('revalidateSite failed:', err);
  }
}

/**
 * Get site metadata (preview URL, available slots, etc.)
 */
export async function getSiteMetadata(siteId: string) {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('sites')
    .select('id, name, slug, domain, metadata')
    .eq('id', siteId)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Save content as a new draft version.
 */
export async function savePageContent(
  pageId: string,
  content: Record<string, unknown>,
  userId?: string
) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Get latest version number
  const { data: latest } = await supabase
    .from('content_versions')
    .select('version_number')
    .eq('page_id', pageId)
    .order('version_number', { ascending: false })
    .limit(1)
    .single();

  const nextVersion = (latest?.version_number ?? 0) + 1;

  const { data, error } = await supabase
    .from('content_versions')
    .insert({
      page_id: pageId,
      version_number: nextVersion,
      status: 'draft',
      content,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update content version status.
 */
export async function updateVersionStatus(
  versionId: string,
  status: 'draft' | 'staged' | 'published' | 'archived'
) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  const updateData: Record<string, unknown> = { status };
  if (status === 'published') {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('content_versions')
    .update(updateData)
    .eq('id', versionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get version history for a page.
 */
export async function getPageVersionHistory(pageId: string) {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('content_versions')
    .select('id, version_number, status, created_by, created_at, published_at')
    .eq('page_id', pageId)
    .order('version_number', { ascending: false })
    .limit(20);

  if (error) return [];
  return data ?? [];
}

/**
 * Update page metadata (title, slug, meta fields).
 */
export async function updatePageMeta(
  pageId: string,
  meta: { title?: string; slug?: string; meta_title?: string; meta_description?: string }
) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('pages')
    .update({ ...meta, updated_at: new Date().toISOString() })
    .eq('id', pageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
