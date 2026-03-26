import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContentStatus, PageType } from "@website-builder/content-schema";

/**
 * Get the latest content version for a page by status.
 * Used at build time by the web app to fetch published or staged content.
 */
export async function getPageContent(
  supabase: SupabaseClient,
  pageId: string,
  status: ContentStatus
) {
  const { data, error } = await supabase
    .from("content_versions")
    .select("id, version_number, content, created_at, published_at")
    .eq("page_id", pageId)
    .eq("status", status)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all pages for a site, optionally filtered by type.
 */
export async function getPages(
  supabase: SupabaseClient,
  siteId: string,
  pageType?: PageType
) {
  let query = supabase
    .from("pages")
    .select("*")
    .eq("site_id", siteId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (pageType) {
    query = query.eq("page_type", pageType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Get a single page by slug for a site.
 */
export async function getPageBySlug(
  supabase: SupabaseClient,
  siteId: string,
  slug: string
) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("site_id", siteId)
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all content for a site at build time.
 * Returns pages with their latest content version for the given status.
 */
export async function getSiteContent(
  supabase: SupabaseClient,
  siteId: string,
  status: ContentStatus
) {
  // Get all active pages
  const { data: pages, error: pagesError } = await supabase
    .from("pages")
    .select("id, slug, title, page_type, meta_title, meta_description, sort_order")
    .eq("site_id", siteId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (pagesError) throw pagesError;

  // For each page, get the latest content version with the requested status
  const pagesWithContent = await Promise.all(
    (pages ?? []).map(async (page) => {
      const { data: version } = await supabase
        .from("content_versions")
        .select("id, version_number, content, published_at")
        .eq("page_id", page.id)
        .eq("status", status)
        .order("version_number", { ascending: false })
        .limit(1)
        .single();

      return { ...page, content: version?.content ?? null };
    })
  );

  return pagesWithContent;
}

/**
 * Save a draft content version for a page.
 */
export async function saveDraft(
  supabase: SupabaseClient,
  pageId: string,
  content: Record<string, unknown>,
  userId?: string
) {
  // Get the latest version number
  const { data: latest } = await supabase
    .from("content_versions")
    .select("version_number")
    .eq("page_id", pageId)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  const nextVersion = (latest?.version_number ?? 0) + 1;

  const { data, error } = await supabase
    .from("content_versions")
    .insert({
      page_id: pageId,
      version_number: nextVersion,
      status: "draft",
      content,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update the status of a content version (draft → staged → published).
 */
export async function updateContentStatus(
  supabase: SupabaseClient,
  versionId: string,
  status: ContentStatus
) {
  const updateData: Record<string, unknown> = { status };
  if (status === "published") {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("content_versions")
    .update(updateData)
    .eq("id", versionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get content version history for a page.
 */
export async function getVersionHistory(
  supabase: SupabaseClient,
  pageId: string,
  limit = 20
) {
  const { data, error } = await supabase
    .from("content_versions")
    .select("id, version_number, status, created_by, created_at, published_at")
    .eq("page_id", pageId)
    .order("version_number", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
