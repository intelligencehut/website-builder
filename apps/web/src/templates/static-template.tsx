'use client';

import { EditableSection, EditModeBar } from '@/components/edit-mode';
import PageHeader from '@/components/sections/PageHeader';
import Image from 'next/image';

/**
 * Generic static page template.
 * Renders a page header + flexible content sections from the database.
 * Used for: about, mission, genesis, legal, privacy, get-involved, etc.
 */
interface StaticTemplateProps {
  title: string;
  content: Record<string, unknown> | null;
}

interface ContentSection {
  type: 'text' | 'image' | 'html' | 'quote' | 'list';
  heading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  items?: string[];
  author?: string;
}

export function StaticTemplate({ title, content }: StaticTemplateProps) {
  const header = content?.header as { title?: string; subtitle?: string; backgroundImage?: string } | undefined;
  const sections = (content?.sections as ContentSection[]) ?? [];
  const body = content?.body as string | undefined;

  return (
    <>
      <EditModeBar />

      <EditableSection sectionId="header" label="Page Header">
        <PageHeader
          title={header?.title || title}
          subtitle={header?.subtitle}
          backgroundImage={header?.backgroundImage}
        />
      </EditableSection>

      <EditableSection sectionId="content" label="Page Content">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Simple body text (HTML) */}
            {body && (
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}

            {/* Structured sections */}
            {sections.map((section, i) => (
              <div key={i} className="mb-12">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                )}

                {section.type === 'text' && section.body && (
                  <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.body }} />
                )}

                {section.type === 'image' && section.image && (
                  <div className="rounded-xl overflow-hidden shadow-lg my-6">
                    <Image src={section.image} alt={section.imageAlt || ''} width={900} height={500} className="object-cover w-full" />
                  </div>
                )}

                {section.type === 'list' && section.items && (
                  <ul className="space-y-2 text-gray-700 text-lg">
                    {section.items.map((item, j) => <li key={j}>• {item}</li>)}
                  </ul>
                )}

                {section.type === 'quote' && section.body && (
                  <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-6 bg-orange-50 rounded-r-lg">
                    <p className="text-lg italic text-gray-700">{section.body}</p>
                    {section.author && <footer className="text-sm text-gray-500 mt-2">— {section.author}</footer>}
                  </blockquote>
                )}

                {section.type === 'html' && section.body && (
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: section.body }} />
                )}
              </div>
            ))}

            {/* Fallback for empty pages */}
            {!body && sections.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">This page has no content yet.</p>
                <p className="text-sm mt-2">Add content through the admin panel.</p>
              </div>
            )}
          </div>
        </section>
      </EditableSection>
    </>
  );
}
