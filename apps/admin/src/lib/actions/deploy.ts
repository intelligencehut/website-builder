'use server';

import { revalidatePath } from 'next/cache';
import type { DeployEnvironment, DeployStatus } from '@website-builder/content-schema';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId } from '@/lib/site-context';
import { getSiteMetadata } from './pages';

export interface DeployRecord {
  id: string;
  site_id: string;
  environment: DeployEnvironment;
  status: DeployStatus;
  content_version_id?: string;
  deploy_url?: string;
  triggered_by?: string;
  triggered_by_name?: string;
  triggered_at: string;
  completed_at?: string;
}

/**
 * Trigger a deploy to stage or production.
 * Records a row in website.deploys, fires the site's Vercel deploy hook
 * (from site metadata, falling back to env vars), and triggers ISR
 * revalidation if the site has a revalidation URL.
 */
export async function triggerDeploy(
  siteId: string,
  environment: DeployEnvironment,
  contentVersionId?: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  const supabase = createAdminClient();
  const userId = triggeredBy || (await getCurrentUserId()) || undefined;

  const site = await getSiteMetadata(siteId);
  const metadata = site?.metadata as Record<string, unknown> | undefined;
  const deployMeta = metadata?.deploy as Record<string, unknown> | undefined;

  const siteHookUrl =
    environment === 'stage'
      ? (deployMeta?.stage_hook_url as string | undefined)
      : (deployMeta?.prod_hook_url as string | undefined);

  const fallbackHookUrl =
    environment === 'stage'
      ? process.env.STAGE_DEPLOY_HOOK_URL
      : process.env.PRODUCTION_DEPLOY_HOOK_URL;

  const hookUrl = siteHookUrl || fallbackHookUrl;

  const stageDomain = metadata?.stage_domain as string | undefined;
  const prodDomain = site?.domain || undefined;
  const deployUrl =
    environment === 'stage'
      ? stageDomain
        ? `https://${stageDomain}`
        : undefined
      : prodDomain
        ? `https://${prodDomain}`
        : undefined;

  const triggeredAt = new Date().toISOString();
  let insertedId: string | undefined;

  if (supabase) {
    const { data, error } = await supabase
      .from('deploys')
      .insert({
        site_id: siteId,
        environment,
        content_version_id: contentVersionId || null,
        status: hookUrl ? 'building' : 'failed',
        deploy_url: deployUrl || null,
        triggered_by: userId || null,
        triggered_at: triggeredAt,
        completed_at: hookUrl ? null : triggeredAt,
      })
      .select('id')
      .single();
    if (error) console.error('Failed to record deploy:', error);
    insertedId = data?.id;
  }

  let fetchOk = false;
  if (hookUrl) {
    try {
      const res = await fetch(hookUrl, { method: 'POST' });
      fetchOk = res.ok;
    } catch (err) {
      console.error(`Failed to trigger ${environment} deploy hook:`, err);
    }
    if (!fetchOk && supabase && insertedId) {
      await supabase
        .from('deploys')
        .update({ status: 'failed', completed_at: new Date().toISOString() })
        .eq('id', insertedId);
    }
  } else {
    console.warn(
      `No deploy hook configured for site ${siteId} (${environment}). ` +
        `Set metadata.deploy.${environment === 'stage' ? 'stage' : 'prod'}_hook_url in the site settings.`
    );
  }

  // ISR revalidation (no-op for SSG sites)
  try {
    const revalidationUrl = metadata?.revalidation_url as string | undefined;
    const revalidationSecret = metadata?.revalidation_secret as string | undefined;
    if (revalidationUrl) {
      await fetch(revalidationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(revalidationSecret ? { 'x-revalidation-secret': revalidationSecret } : {}),
        },
        body: JSON.stringify({ path: '/' }),
      }).catch((err) => console.error('Revalidation failed:', err));
    }
  } catch (err) {
    console.error('Failed to trigger revalidation:', err);
  }

  revalidatePath('/deploys');
  revalidatePath('/');

  const finalStatus: DeployStatus = hookUrl ? (fetchOk ? 'building' : 'failed') : 'failed';
  return {
    id: insertedId || crypto.randomUUID(),
    site_id: siteId,
    environment,
    status: finalStatus,
    content_version_id: contentVersionId,
    deploy_url: deployUrl,
    triggered_by: userId,
    triggered_at: triggeredAt,
    completed_at: finalStatus === 'building' ? undefined : new Date().toISOString(),
  };
}

export async function deployToStage(
  siteId: string,
  contentVersionId: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  return triggerDeploy(siteId, 'stage', contentVersionId, triggeredBy);
}

export async function publishToProduction(
  siteId: string,
  contentVersionId: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  return triggerDeploy(siteId, 'production', contentVersionId, triggeredBy);
}

/**
 * Get deploy history for a site, newest first.
 */
export async function getDeployHistory(siteId: string, limit = 50): Promise<DeployRecord[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data: rows, error } = await supabase
    .from('deploys')
    .select(
      'id, site_id, environment, content_version_id, status, deploy_url, triggered_by, triggered_at, completed_at'
    )
    .eq('site_id', siteId)
    .order('triggered_at', { ascending: false })
    .limit(limit);

  if (error || !rows) return [];

  const userIds = Array.from(
    new Set(rows.map((r) => r.triggered_by).filter(Boolean))
  ) as string[];
  let userMap: Record<string, string> = {};
  if (userIds.length > 0) {
    const { data: users } = await supabase
      .from('users')
      .select('id, name, email')
      .in('id', userIds);
    if (users) {
      userMap = Object.fromEntries(users.map((u) => [u.id, u.name || u.email || '']));
    }
  }

  return rows.map((r) => ({
    id: r.id,
    site_id: r.site_id,
    environment: r.environment as DeployEnvironment,
    status: r.status as DeployStatus,
    content_version_id: r.content_version_id || undefined,
    deploy_url: r.deploy_url || undefined,
    triggered_by: r.triggered_by || undefined,
    triggered_by_name: r.triggered_by ? userMap[r.triggered_by] : undefined,
    triggered_at: r.triggered_at,
    completed_at: r.completed_at || undefined,
  }));
}

/**
 * Most recent deploy for a site/environment, or null if none.
 */
export async function getLatestDeploy(
  siteId: string,
  environment: DeployEnvironment
): Promise<DeployRecord | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('deploys')
    .select(
      'id, site_id, environment, content_version_id, status, deploy_url, triggered_by, triggered_at, completed_at'
    )
    .eq('site_id', siteId)
    .eq('environment', environment)
    .order('triggered_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  return {
    id: data.id,
    site_id: data.site_id,
    environment: data.environment as DeployEnvironment,
    status: data.status as DeployStatus,
    content_version_id: data.content_version_id || undefined,
    deploy_url: data.deploy_url || undefined,
    triggered_by: data.triggered_by || undefined,
    triggered_at: data.triggered_at,
    completed_at: data.completed_at || undefined,
  };
}
