import { getPages } from '@/lib/actions/pages';
import { PagesClient } from './pages-client';

const SITE_ID = 'a0000000-0000-0000-0000-000000000001';

export default async function PagesPage() {
  const pages = await getPages(SITE_ID);

  return <PagesClient pages={pages} />;
}
