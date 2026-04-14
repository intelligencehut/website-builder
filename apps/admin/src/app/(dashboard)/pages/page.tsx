import { getPages } from '@/lib/actions/pages';
import { getActiveSiteId } from '@/lib/site-context';
import { PagesClient } from './pages-client';

export default async function PagesPage() {
  const siteId = await getActiveSiteId();
  const pages = await getPages(siteId);

  return <PagesClient pages={pages} />;
}
