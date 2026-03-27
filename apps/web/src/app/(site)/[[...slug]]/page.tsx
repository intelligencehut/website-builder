import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { SectionRenderer } from '@/sections';
import type { PageSection } from '@/sections/types';
import { getAllPages, getPageBySlug, getSiteConfig } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Generate static paths for all pages at build time.
 */
export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page: { slug: string }) => {
    const slug = page.slug === '/' ? undefined : page.slug.replace(/^\//, '').split('/');
    return { slug };
  });
}

/**
 * Generate metadata for each page.
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
 * Fetches page data + sections from Supabase at BUILD TIME.
 * Output is static HTML — zero database calls at runtime.
 *
 * Content format in database:
 * {
 *   "sections": [
 *     { "id": "s1", "type": "hero", "data": { ... } },
 *     { "id": "s2", "type": "text-with-image", "data": { ... } },
 *     ...
 *   ]
 * }
 */
export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug ? `/${slug.join('/')}` : '/';
  const page = await getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  // Fetch site-level config (navigation, theme) for header/footer
  const siteConfigRaw = await getSiteConfig();
  const siteConfig = siteConfigRaw ? {
    navigation: siteConfigRaw.navigation as { main?: unknown[]; footer?: unknown } | undefined,
    theme: siteConfigRaw.theme as Record<string, unknown> | undefined,
  } : null;

  // Parse sections from content
  const content = page.content ?? {};
  let sections: PageSection[] = [];

  if (Array.isArray(content.sections)) {
    // New format: sections array
    sections = content.sections as PageSection[];
  } else if (content.body || content.header) {
    // Legacy format: static page with header + body
    // Auto-convert to sections
    const header = content.header as { title?: string; subtitle?: string } | undefined;
    sections = [];
    if (header?.title) {
      sections.push({ id: 'header', type: 'page-header', data: { title: header.title, subtitle: header.subtitle } });
    }
    if (content.body) {
      sections.push({ id: 'content', type: 'html', data: { body: content.body } });
    }
  } else if (content.heroText) {
    // Legacy format: home page with heroText/mission/etc.
    // Auto-convert to sections
    sections = [];
    const heroText = content.heroText as Record<string, unknown>;
    if (heroText) {
      sections.push({
        id: 'hero',
        type: 'hero',
        data: {
          heading: heroText.heading,
          headingHighlight: heroText.headingHighlight,
          subtitle: heroText.subtitle,
          description: heroText.description,
          primaryCta: heroText.primaryCtaLabel ? { label: heroText.primaryCtaLabel, href: `#${heroText.primaryCtaTarget || 'impact'}` } : undefined,
          secondaryCta: heroText.secondaryCtaLabel ? { label: heroText.secondaryCtaLabel, href: `#${heroText.secondaryCtaTarget || 'programs'}` } : undefined,
        },
      });
    }
    const mission = content.mission as Record<string, unknown>;
    if (mission) {
      sections.push({
        id: 'mission',
        type: 'text-with-image',
        data: {
          heading: mission.heading,
          subtitle: mission.subtitle,
          body: mission.description,
          items: mission.commitments,
          itemsHeading: 'We are committed to:',
          image: mission.image,
        },
      });
    }
    const programs = content.programs as { items?: unknown[] };
    if (programs?.items?.length) {
      sections.push({
        id: 'programs',
        type: 'card-grid',
        data: { heading: 'Our Programs', items: programs.items },
      });
    }
  }

  return (
    <Layout siteConfig={siteConfig as Parameters<typeof Layout>[0]['siteConfig']}>
      <SectionRenderer sections={sections} />
    </Layout>
  );
}
