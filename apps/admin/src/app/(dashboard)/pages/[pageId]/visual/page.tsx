import { getPageWithContent } from '@/lib/actions/pages';
import { VisualEditorClient } from './visual-editor-client';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ pageId: string }>;
}

export default async function VisualEditorPage({ params }: Props) {
  const { pageId } = await params;
  const pageData = await getPageWithContent(pageId);

  if (!pageData) {
    notFound();
  }

  return (
    <VisualEditorClient
      pageId={pageData.id}
      pageTitle={pageData.title}
      pageSlug={pageData.slug}
      initialContent={pageData.content as Record<string, unknown> | null}
      initialVersionId={pageData.version_id}
      initialStatus={pageData.content_status}
    />
  );
}
