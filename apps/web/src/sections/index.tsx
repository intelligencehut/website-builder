'use client';

import { useEffect, useState } from 'react';
import type { PageSection } from './types';
import { EditableSection, EditModeBar } from '@/components/edit-mode';
import { HeroSection } from './hero-section';
import { PageHeaderSection } from './page-header-section';
import { TextSection } from './text-section';
import { TextWithImageSection } from './text-with-image-section';
import { CardGridSection } from './card-grid-section';
import { GallerySection } from './gallery-section';
import { TestimonialsSection } from './testimonials-section';
import { StatsSection } from './stats-section';
import { CtaSection } from './cta-section';
import { ContactSection } from './contact-section';
import { HtmlSection } from './html-section';
import { VideoSection } from './video-section';

// When the page is loaded inside the admin iframe (?_edit=1), swap
// the SSG-rendered published sections for whatever the editor is
// currently working on, pushed via postMessage. Real visitors never
// hit this path — the effect is gated on _edit=1.
function useDraftSections(initial: PageSection[]): PageSection[] {
  const [sections, setSections] = useState<PageSection[]>(initial);

  useEffect(() => {
    const isEdit = new URLSearchParams(window.location.search).get('_edit') === '1';
    if (!isEdit) return;

    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'draft-content' && Array.isArray(e.data.sections)) {
        setSections(e.data.sections as PageSection[]);
      }
    }
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'editor-ready' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return sections;
}

function renderSection(section: PageSection) {
  switch (section.type) {
    case 'hero': return <HeroSection data={section.data} />;
    case 'page-header': return <PageHeaderSection data={section.data} />;
    case 'text': return <TextSection data={section.data} />;
    case 'text-with-image': return <TextWithImageSection data={section.data} />;
    case 'card-grid': return <CardGridSection data={section.data} />;
    case 'gallery': return <GallerySection data={section.data} />;
    case 'testimonials': return <TestimonialsSection data={section.data} />;
    case 'stats': return <StatsSection data={section.data} />;
    case 'cta': return <CtaSection data={section.data} />;
    case 'contact': return <ContactSection data={section.data} />;
    case 'html': return <HtmlSection data={section.data} />;
    case 'video': return <VideoSection data={section.data} />;
    case 'dynamic-slot': return null; // Rendered by the target site, not the website-builder
    default: return null;
  }
}

/**
 * Generic page renderer.
 * Renders an array of sections from the database.
 * No client-specific code — works for any website.
 */
export function SectionRenderer({ sections: initialSections }: { sections: PageSection[] }) {
  const sections = useDraftSections(initialSections);

  if (!sections || sections.length === 0) {
    return (
      <section className="py-20 text-center text-gray-400">
        <p className="text-lg">This page has no content yet.</p>
        <p className="text-sm mt-2">Add sections through the admin panel.</p>
      </section>
    );
  }

  return (
    <>
      <EditModeBar />
      {sections.map((section) => (
        <EditableSection key={section.id} sectionId={section.id} label={section.type}>
          {renderSection(section)}
        </EditableSection>
      ))}
    </>
  );
}

/** Available section types for the admin panel */
export const SECTION_TYPES = [
  { type: 'hero', label: 'Hero Banner', description: 'Full-width hero with heading, CTAs, and image' },
  { type: 'page-header', label: 'Page Header', description: 'Dark banner with title and subtitle' },
  { type: 'text', label: 'Text Block', description: 'Heading and body text' },
  { type: 'text-with-image', label: 'Text with Image', description: 'Text on one side, image on the other' },
  { type: 'card-grid', label: 'Card Grid', description: 'Grid of cards with title, description, and image' },
  { type: 'gallery', label: 'Image Gallery', description: 'Grid of images with optional captions' },
  { type: 'testimonials', label: 'Testimonials', description: 'Customer or supporter quotes' },
  { type: 'stats', label: 'Statistics', description: 'Number counters with labels' },
  { type: 'cta', label: 'Call to Action', description: 'Banner with heading, description, and buttons' },
  { type: 'contact', label: 'Contact Info', description: 'Email, phone, address, and optional text' },
  { type: 'html', label: 'Custom HTML', description: 'Raw HTML content block' },
  { type: 'video', label: 'Video', description: 'YouTube video gallery with captions' },
] as const;
