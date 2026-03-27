'use client';

import { HomeTemplate } from './home-template';
import { StaticTemplate } from './static-template';
import { NewsTemplate } from './news-template';

/**
 * Renders the appropriate template based on page_type.
 * All templates receive content from the database — no hardcoded content.
 */
export function PageRenderer({
  pageType,
  title,
  content,
}: {
  pageType: string;
  title: string;
  content: Record<string, unknown> | null;
}) {
  switch (pageType) {
    case 'home':
      return <HomeTemplate content={content} />;

    case 'news':
      return <NewsTemplate title={title} content={content} />;

    // All these use the generic static template
    case 'static':
    case 'project':
    case 'event':
    case 'gallery':
    case 'publication':
    case 'team':
    default:
      return <StaticTemplate title={title} content={content} />;
  }
}
