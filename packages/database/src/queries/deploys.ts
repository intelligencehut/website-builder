import type { SupabaseClient } from "@supabase/supabase-js";
import type { DeployEnvironment, DeployStatus } from "@website-builder/content-schema";

/**
 * Log a deploy trigger.
 */
export async function createDeploy(
  supabase: SupabaseClient,
  deploy: {
    site_id: string;
    environment: DeployEnvironment;
    content_version_id?: string;
    triggered_by?: string;
  }
) {
  const { data, error } = await supabase
    .from("deploys")
    .insert({
      ...deploy,
      status: "pending" as DeployStatus,
      triggered_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a deploy's status.
 */
export async function updateDeployStatus(
  supabase: SupabaseClient,
  deployId: string,
  status: DeployStatus,
  deployUrl?: string
) {
  const updateData: Record<string, unknown> = { status };
  if (status === "success" || status === "failed") {
    updateData.completed_at = new Date().toISOString();
  }
  if (deployUrl) {
    updateData.deploy_url = deployUrl;
  }

  const { data, error } = await supabase
    .from("deploys")
    .update(updateData)
    .eq("id", deployId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get deploy history for a site.
 */
export async function getDeployHistory(
  supabase: SupabaseClient,
  siteId: string,
  limit = 20
) {
  const { data, error } = await supabase
    .from("deploys")
    .select("*")
    .eq("site_id", siteId)
    .order("triggered_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
