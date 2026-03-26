import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Get a site by its slug.
 */
export async function getSiteBySlug(
  supabase: SupabaseClient,
  slug: string
) {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get a site by its ID.
 */
export async function getSiteById(
  supabase: SupabaseClient,
  siteId: string
) {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all sites a user has access to.
 */
export async function getUserSites(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("site_members")
    .select("role, sites(*)")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

/**
 * Get site configuration (navigation, footer, theme, etc.) by type and status.
 */
export async function getSiteConfig(
  supabase: SupabaseClient,
  siteId: string,
  configType: string,
  status: string = "published"
) {
  const { data, error } = await supabase
    .from("site_config")
    .select("id, content, version_number, status")
    .eq("site_id", siteId)
    .eq("config_type", configType)
    .eq("status", status)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}
