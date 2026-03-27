'use client';

import { EditableSection, EditModeBar } from '@/components/edit-mode';
import PageHeader from '@/components/sections/PageHeader';
import Image from 'next/image';

interface NewsTemplateProps {
  title: string;
  content: Record<string, unknown> | null;
}

export function NewsTemplate({ title, content }: NewsTemplateProps) {
  const article = content as {
    title?: string; excerpt?: string; content?: string; image?: string;
    date?: string; category?: string; tags?: string[]; pdfLink?: string;
  } | null;

  return (
    <>
      <EditModeBar />
      <EditableSection sectionId="content" label="Article">
        <PageHeader title={article?.title || title} subtitle={article?.date ? `${article.category || ''} · ${article.date}` : undefined} />

        <article className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {article?.image && (
              <div className="rounded-xl overflow-hidden shadow-lg mb-8">
                <Image src={article.image} alt={article.title || ''} width={900} height={500} className="object-cover w-full" />
              </div>
            )}

            {article?.excerpt && (
              <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">{article.excerpt}</p>
            )}

            {article?.content && (
              <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: article.content }} />
            )}

            {article?.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">{tag}</span>
                ))}
              </div>
            )}

            {article?.pdfLink && (
              <a href={article.pdfLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Download PDF
              </a>
            )}

            {!article?.content && !article?.excerpt && (
              <div className="text-center py-20 text-gray-400">
                <p>This article has no content yet. Add content through the admin panel.</p>
              </div>
            )}
          </div>
        </article>
      </EditableSection>
    </>
  );
}
