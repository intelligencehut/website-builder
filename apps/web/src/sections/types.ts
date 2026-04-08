/**
 * Generic section types for the SaaS page builder.
 * These are reusable building blocks — not specific to any client.
 */

export interface PageSection {
  id: string;
  type: SectionType;
  data: Record<string, unknown>;
}

export type SectionType =
  | 'hero'
  | 'page-header'
  | 'text'
  | 'text-with-image'
  | 'card-grid'
  | 'gallery'
  | 'testimonials'
  | 'stats'
  | 'cta'
  | 'contact'
  | 'html'
  | 'dynamic-slot';
