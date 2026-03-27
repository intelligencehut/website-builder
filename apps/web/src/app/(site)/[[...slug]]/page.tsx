import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { PageRenderer } from '@/templates';
import { getAllPages, getPageBySlug } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Generate static paths for all pages at build time.
 * This tells Next.js which pages to pre-render as static HTML.
 */
export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page: { slug: string }) => {
    const slug = page.slug === '/' ? undefined : page.slug.replace(/^\//, '').split('/');
    return { slug };
  });
}

/**
 * Generate metadata (title, description) for each page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug ? `/${slug.join('/')}` : '/';
  const page = await getPageBySlug(slugPath);

  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || undefined,
  };
}

/**
 * Dynamic page renderer.
 * Fetches page data from Supabase at BUILD TIME and renders the appropriate template.
 * Output is static HTML — no database calls at runtime.
 */
export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug ? `/${slug.join('/')}` : '/';

  const page = await getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <PageRenderer
        pageType={page.page_type}
        title={page.title}
        content={page.content}
      />
    </Layout>
  );
}
