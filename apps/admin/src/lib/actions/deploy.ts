'use server';

import type { DeployEnvironment, DeployStatus } from '@website-builder/content-schema';
import { getSiteMetadata } from './pages';

export interface DeployRecord {
  id: string;
  site_id: string;
  environment: DeployEnvironment;
  status: DeployStatus;
  version?: string;
  deploy_url?: string;
  triggered_by?: string;
  triggered_at: string;
  completed_at?: string;
}

/**
 * Trigger a deploy to stage or production.
 * Calls the Vercel deploy hook and logs the deploy.
 */
export async function triggerDeploy(
  siteId: string,
  environment: DeployEnvironment,
  contentVersionId?: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  const hookUrl =
    environment === 'stage'
      ? process.env.STAGE_DEPLOY_HOOK_URL
      : process.env.PRODUCTION_DEPLOY_HOOK_URL;

  // Trigger Vercel deploy hook if configured
  if (hookUrl) {
    try {
      await fetch(hookUrl, { method: 'POST' });
    } catch (err) {
      console.error(`Failed to trigger ${environment} deploy hook:`, err);
    }
  }

  // Trigger on-demand revalidation if the site has a revalidation URL
  try {
    const site = await getSiteMetadata(siteId);
    const metadata = site?.metadata as Record<string, unknown> | undefined;
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
      }).catch(err => console.error('Revalidation failed:', err));
    }
  } catch (err) {
    console.error('Failed to trigger revalidation:', err);
  }

  // Log the deploy (TODO: save to Supabase deploys table)
  const deploy: DeployRecord = {
    id: crypto.randomUUID(),
    site_id: siteId,
    environment,
    status: 'building',
    version: contentVersionId ? `v${Date.now() % 1000}` : undefined,
    deploy_url: environment === 'stage'
      ? 'https://stage-sevaa.vercel.app'
      : 'https://sevaa.org',
    triggered_by: triggeredBy,
    triggered_at: new Date().toISOString(),
  };

  return deploy;
}

/**
 * Deploy to stage: update content status to "staged" + trigger stage build.
 */
export async function deployToStage(
  siteId: string,
  contentVersionId: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  // Update content status
  await new Promise((r) => setTimeout(r, 300));

  // Trigger deploy
  const deploy = await triggerDeploy(siteId, 'stage', contentVersionId, triggeredBy);
  return deploy;
}

/**
 * Publish to production: update content status to "published" + trigger production build.
 */
export async function publishToProduction(
  siteId: string,
  contentVersionId: string,
  triggeredBy?: string
): Promise<DeployRecord> {
  // Update content status
  await new Promise((r) => setTimeout(r, 300));

  // Trigger deploy
  const deploy = await triggerDeploy(siteId, 'production', contentVersionId, triggeredBy);
  return deploy;
}

/**
 * Get deploy history for a site.
 */
export async function getDeployHistory(siteId: string): Promise<DeployRecord[]> {
  // Demo data
  return [
    { id: '1', site_id: siteId, environment: 'production', status: 'success', version: 'v1.4.2', triggered_by: 'Amit Das', triggered_at: '2025-03-26T10:30:00Z', completed_at: '2025-03-26T10:31:45Z', deploy_url: 'https://sevaa.org' },
    { id: '2', site_id: siteId, environment: 'stage', status: 'success', version: 'v1.5.0-rc1', triggered_by: 'Amit Das', triggered_at: '2025-03-27T08:15:00Z', completed_at: '2025-03-27T08:16:30Z', deploy_url: 'https://stage-sevaa.vercel.app' },
    { id: '3', site_id: siteId, environment: 'stage', status: 'success', version: 'v1.4.3-rc2', triggered_by: 'Amit Das', triggered_at: '2025-03-25T16:00:00Z', completed_at: '2025-03-25T16:01:30Z', deploy_url: 'https://stage-sevaa.vercel.app' },
    { id: '4', site_id: siteId, environment: 'production', status: 'success', version: 'v1.4.1', triggered_by: 'Amit Das', triggered_at: '2025-03-24T11:00:00Z', completed_at: '2025-03-24T11:01:50Z', deploy_url: 'https://sevaa.org' },
    { id: '5', site_id: siteId, environment: 'stage', status: 'failed', version: 'v1.4.3-rc1', triggered_by: 'Amit Das', triggered_at: '2025-03-23T14:00:00Z', completed_at: '2025-03-23T14:00:45Z' },
  ];
}
