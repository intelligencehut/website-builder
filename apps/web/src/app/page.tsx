import { getPageContent } from '@/lib/content';
import { HomeClient } from './home-client';

export default async function Home() {
  const content = await getPageContent('/');

  return <HomeClient content={content} />;
}
