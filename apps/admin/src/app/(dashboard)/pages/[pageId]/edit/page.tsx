import { getPageWithContent } from '@/lib/actions/pages';
import { PageEditorClient } from './editor-client';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ pageId: string }>;
}

export default async function PageEditorPage({ params }: Props) {
  const { pageId } = await params;
  const pageData = await getPageWithContent(pageId);

  if (!pageData) {
    notFound();
  }

  return (
    <PageEditorClient
      pageId={pageData.id}
      siteId={pageData.site_id}
      initialTitle={pageData.title}
      initialSlug={pageData.slug}
      initialMetaTitle={pageData.meta_title || ''}
      initialMetaDescription={pageData.meta_description || ''}
      initialContent={pageData.content as Record<string, unknown> | null}
      initialVersionId={pageData.version_id}
      initialVersionNumber={pageData.version_number}
      initialStatus={pageData.content_status}
      pageType={pageData.page_type}
    />
  );
}
