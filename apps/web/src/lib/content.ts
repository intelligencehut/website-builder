import type { ContentStatus } from "@website-builder/content-schema";

/**
 * Content fetching layer for build-time data.
 *
 * How it works:
 * - At build time, pages call these functions to get content.
 * - If SUPABASE_URL and SITE_ID are configured, content is fetched from the database.
 * - If not configured, returns null — components fall back to their hardcoded defaults.
 * - CONTENT_STATUS env var controls whether to fetch "staged" or "published" content.
 *
 * This allows the site to work both:
 * 1. Standalone with hardcoded defaults (development, no database)
 * 2. Content-driven from Supabase (stage + production deployments)
 */

function getContentStatus(): ContentStatus {
  const status = process.env.CONTENT_STATUS;
  if (status === "staged" || status === "published") return status;
  return "published"; // default
}

function isDbConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SITE_ID);
}

/**
 * Get page content from Supabase by slug.
 * Returns null if database is not configured (components use their defaults).
 */
export async function getPageContent(slug: string): Promise<Record<string, unknown> | null> {
  if (!isDbConfigured()) return null;

  const { createServerClient, getPageBySlug, getPageContent: fetchContent } = await import(
    "@website-builder/database"
  );

  try {
    const supabase = createServerClient();
    const siteId = process.env.SITE_ID!;
    const page = await getPageBySlug(supabase, siteId, slug);
    const version = await fetchContent(supabase, page.id, getContentStatus());
    return version?.content as Record<string, unknown> ?? null;
  } catch {
    console.warn(`[content] Failed to fetch content for page "${slug}", using defaults`);
    return null;
  }
}

/**
 * Get site-level configuration (navigation, footer, theme, SEO).
 * Returns null if database is not configured.
 */
export async function getSiteConfiguration(configType: string): Promise<Record<string, unknown> | null> {
  if (!isDbConfigured()) return null;

  const { createServerClient, getSiteConfig } = await import("@website-builder/database");

  try {
    const supabase = createServerClient();
    const siteId = process.env.SITE_ID!;
    const config = await getSiteConfig(supabase, siteId, configType, getContentStatus());
    return config?.content as Record<string, unknown> ?? null;
  } catch {
    console.warn(`[content] Failed to fetch site config "${configType}", using defaults`);
    return null;
  }
}

/**
 * Get all pages for the current site (used for generating static paths).
 * Returns empty array if database is not configured.
 */
export async function getAllPages() {
  if (!isDbConfigured()) return [];

  const { createServerClient, getPages } = await import("@website-builder/database");

  try {
    const supabase = createServerClient();
    const siteId = process.env.SITE_ID!;
    return await getPages(supabase, siteId);
  } catch {
    console.warn("[content] Failed to fetch pages list");
    return [];
  }
}
