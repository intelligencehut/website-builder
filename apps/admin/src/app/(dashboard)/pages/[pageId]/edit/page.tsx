'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Save,
  Rocket,
  Globe,
  ChevronDown,
  GripVertical,
  ImageIcon,
  Type,
  List,
  Plus,
  Trash2,
  Eye,
  MoreHorizontal,
  Check,
  Loader2,
} from 'lucide-react';

// Demo: sections for the home page editor
const homeSections = [
  {
    id: 'hero',
    title: 'Hero Carousel',
    description: '5 slides with images and captions',
    icon: ImageIcon,
    fieldCount: 5,
  },
  {
    id: 'mission',
    title: 'Mission Section',
    description: 'Heading, description, commitment list, image',
    icon: Type,
    fieldCount: 4,
  },
  {
    id: 'impact',
    title: 'Impact Areas',
    description: '4 impact cards with icons and descriptions',
    icon: List,
    fieldCount: 4,
  },
  {
    id: 'programs',
    title: 'Programs',
    description: '6 program cards with filtering',
    icon: List,
    fieldCount: 6,
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: '2 testimonial quotes',
    icon: Type,
    fieldCount: 2,
  },
  {
    id: 'team',
    title: 'Team / Governance',
    description: '25 team members (executive + general)',
    icon: List,
    fieldCount: 25,
  },
  {
    id: 'gallery',
    title: 'Gallery',
    description: '6 gallery images',
    icon: ImageIcon,
    fieldCount: 6,
  },
  {
    id: 'news',
    title: 'News',
    description: '4 featured news articles',
    icon: List,
    fieldCount: 4,
  },
  {
    id: 'events',
    title: 'Upcoming Events',
    description: '4 events with activities list',
    icon: List,
    fieldCount: 4,
  },
  {
    id: 'joinUs',
    title: 'Join Us / Donate',
    description: '9 donation options',
    icon: List,
    fieldCount: 9,
  },
  {
    id: 'resources',
    title: 'Resources',
    description: '4 downloadable resources',
    icon: List,
    fieldCount: 4,
  },
];

export default function PageEditorPage() {
  const params = useParams();
  const [openSections, setOpenSections] = useState<string[]>(['hero']);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleSection(id: string) {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSave() {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Editor top bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-surface-border">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/pages"
              className="p-1.5 rounded-button text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="h-5 w-px bg-surface-border" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-heading text-ink">Home</h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Published
                </span>
              </div>
              <p className="text-[12px] text-ink-muted font-mono mt-0.5">/</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-ink-secondary hover:text-ink border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-1.5 bg-surface-card border border-surface-border text-ink rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5 text-status-published" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {saved ? 'Saved' : 'Save Draft'}
            </button>

            <button className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white rounded-button text-[13px] font-medium hover:bg-amber-600 transition-colors">
              <Rocket className="w-3.5 h-3.5" />
              Deploy to Stage
            </button>

            <button className="flex items-center gap-2 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
              <Globe className="w-3.5 h-3.5" />
              Publish
            </button>

            <button className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor content */}
      <div className="max-w-4xl mx-auto p-8 animate-fade-in">
        {/* Page info */}
        <div className="glass-card rounded-card p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">Page Title</label>
              <input
                type="text"
                defaultValue="Home"
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">Slug</label>
              <input
                type="text"
                defaultValue="/"
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">Meta Title (SEO)</label>
              <input
                type="text"
                defaultValue="SEVAA — Society for Envisioning Vivekananda in Awareness and Action"
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">
                Meta Description (SEO)
              </label>
              <input
                type="text"
                defaultValue="Non-government philanthropic organisation inspired by Swami Vivekananda"
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section accordion */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading text-ink">Page Sections</h2>
            <button className="flex items-center gap-1.5 text-caption text-accent hover:text-accent-hover transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Section
            </button>
          </div>

          {homeSections.map((section, index) => {
            const isOpen = openSections.includes(section.id);

            return (
              <div
                key={section.id}
                className={cn(
                  'glass-card rounded-card overflow-hidden transition-all duration-200',
                  isOpen && 'ring-1 ring-accent/20'
                )}
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-surface-hover transition-colors text-left"
                >
                  <GripVertical className="w-4 h-4 text-ink-muted flex-shrink-0 cursor-grab" />

                  <div className="w-8 h-8 bg-surface-raised rounded-button flex items-center justify-center border border-surface-border flex-shrink-0">
                    <section.icon className="w-4 h-4 text-ink-secondary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-ink">{section.title}</p>
                    <p className="text-[12px] text-ink-muted">{section.description}</p>
                  </div>

                  <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border mr-2">
                    {section.fieldCount} {section.fieldCount === 1 ? 'item' : 'items'}
                  </span>

                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-ink-muted transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Section content */}
                {isOpen && (
                  <div className="border-t border-surface-border px-5 py-5 bg-surface-raised/50 animate-scale-in">
                    {section.id === 'hero' ? (
                      <HeroEditorDemo />
                    ) : (
                      <div className="text-center py-8">
                        <section.icon className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                        <p className="text-[13px] text-ink-secondary">
                          Section editor for <span className="font-medium">{section.title}</span> will be built in Phase 4
                        </p>
                        <p className="text-[12px] text-ink-muted mt-1">
                          {section.fieldCount} editable {section.fieldCount === 1 ? 'field' : 'fields'} available
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Demo hero section editor — shows the pattern for all section editors */
function HeroEditorDemo() {
  const slides = [
    { src: '/images/about/about-2.jpg', alt: 'SEVAA Mission', title: 'Inspired by Thakur-Maa-Swamiji', description: 'Working among the underprivileged section of society' },
    { src: '/images/gallery/gallery-1.jpg', alt: 'Education', title: 'Education & Awareness', description: 'Quality education to the underprivileged' },
    { src: '/images/gallery/gallery-2.jpg', alt: 'Service', title: 'Community Service', description: 'Serving humanity with compassion and care' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-overline text-ink-muted uppercase">Carousel Slides</p>
        <button className="flex items-center gap-1.5 text-caption text-accent hover:text-accent-hover transition-colors">
          <Plus className="w-3 h-3" />
          Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="bg-surface-card border border-surface-border rounded-button p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <GripVertical className="w-4 h-4 text-ink-muted mt-0.5 cursor-grab flex-shrink-0" />

              {/* Image preview */}
              <div className="w-24 h-16 bg-surface-raised rounded-[6px] border border-surface-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                <ImageIcon className="w-5 h-5 text-ink-muted" />
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-ink-muted mb-1 block">Title</label>
                    <input
                      type="text"
                      defaultValue={slide.title}
                      className="w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ink-muted mb-1 block">Alt Text</label>
                    <input
                      type="text"
                      defaultValue={slide.alt}
                      className="w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-ink-muted mb-1 block">Description</label>
                  <input
                    type="text"
                    defaultValue={slide.description}
                    className="w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
              </div>

              <button className="p-1.5 text-ink-muted hover:text-red-500 hover:bg-red-50 rounded-[4px] transition-colors flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
