import { getActiveSiteId } from '@/lib/site-context';
import { getSiteMetadata } from '@/lib/actions/pages';
import { getDeployHistory, getLatestDeploy } from '@/lib/actions/deploy';
import { DeploysClient } from './deploys-client';

export default async function DeploysPage() {
  const siteId = await getActiveSiteId();
  const [site, history, latestProd, latestStage] = await Promise.all([
    getSiteMetadata(siteId),
    getDeployHistory(siteId),
    getLatestDeploy(siteId, 'production'),
    getLatestDeploy(siteId, 'stage'),
  ]);

  const metadata = (site?.metadata as Record<string, unknown> | undefined) || {};
  const deployMeta = (metadata.deploy as Record<string, unknown> | undefined) || {};

  return (
    <DeploysClient
      siteId={siteId}
      siteName={site?.name || 'Site'}
      siteDomain={site?.domain || undefined}
      stageDomain={(metadata.stage_domain as string | undefined) || undefined}
      hasProdHook={Boolean(deployMeta.prod_hook_url || process.env.PRODUCTION_DEPLOY_HOOK_URL)}
      hasStageHook={Boolean(deployMeta.stage_hook_url || process.env.STAGE_DEPLOY_HOOK_URL)}
      history={history}
      latestProd={latestProd}
      latestStage={latestStage}
    />
  );
}
