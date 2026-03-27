import type { ContentStatus } from "@website-builder/content-schema";

/**
 * Site-level data fetching for build time.
 * All functions here run ONLY during `next build` — never at runtime.
 */

function getContentStatus(): ContentStatus {
  const status = process.env.CONTENT_STATUS;
  if (status === "staged" || status === "published") return status;
  return "published";
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: "website" },
  });
}

const siteId = () => process.env.SITE_ID;

/**
 * Get all pages for static generation (generateStaticParams)
 */
export async function getAllPages() {
  const supabase = getClient();
  if (!supabase || !siteId()) return [];

  const { data } = await supabase
    .from("pages")
    .select("id, slug, title, page_type, meta_title, meta_description, sort_order")
    .eq("site_id", siteId())
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return data ?? [];
}

/**
 * Get a page with its latest published/staged content
 */
export async function getPageBySlug(slug: string) {
  const supabase = getClient();
  if (!supabase || !siteId()) return null;

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("site_id", siteId())
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!page) return null;

  const { data: version } = await supabase
    .from("content_versions")
    .select("content")
    .eq("page_id", page.id)
    .eq("status", getContentStatus())
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  return {
    ...page,
    content: (version?.content as Record<string, unknown>) ?? null,
  };
}

/**
 * Get site configuration (navigation, footer, theme)
 */
export async function getSiteConfig() {
  const supabase = getClient();
  if (!supabase || !siteId()) return null;

  const configs: Record<string, unknown> = {};

  for (const configType of ["navigation", "footer", "theme", "seo"]) {
    const { data } = await supabase
      .from("site_config")
      .select("content")
      .eq("site_id", siteId())
      .eq("config_type", configType)
      .eq("status", getContentStatus())
      .order("version_number", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      configs[configType] = data.content;
    }
  }

  return configs;
}

/**
 * Get site metadata (name, domain, etc.)
 */
export async function getSiteMeta() {
  const supabase = getClient();
  if (!supabase || !siteId()) return null;

  const { data } = await supabase
    .from("sites")
    .select("name, slug, domain, metadata")
    .eq("id", siteId())
    .single();

  return data;
}
