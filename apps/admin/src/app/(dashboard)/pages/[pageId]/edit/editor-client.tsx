'use client';

import { useState, useCallback } from 'react';
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
  BarChart3,
  Heart,
  Eye,
  Check,
  Loader2,
  History,
  PanelRightClose,
} from 'lucide-react';
import { savePageContent, updateVersionStatus, updatePageMeta } from '@/lib/actions/pages';
import { deployToStage, publishToProduction } from '@/lib/actions/deploy';
import { PublishDialog } from '@/components/editors/publish-dialog';
import { VersionHistory } from '@/components/editors/version-history';
import { Field, TextInput } from '@/components/ui/field';
import { HeroEditor } from '@/components/editors/hero-editor';
import { ImpactEditor } from '@/components/editors/impact-editor';
import { ProgramsEditor } from '@/components/editors/programs-editor';
import { TeamEditor } from '@/components/editors/team-editor';
import { TestimonialsEditor } from '@/components/editors/testimonials-editor';
import { BlessingLettersEditor } from '@/components/editors/blessing-letters-editor';
import { GalleryEditor } from '@/components/editors/gallery-editor';
import { NewsEditor } from '@/components/editors/news-editor';
import { EventsEditor } from '@/components/editors/events-editor';
import { JoinUsEditor } from '@/components/editors/join-us-editor';
import { ResourcesEditor } from '@/components/editors/resources-editor';
import { StatsEditor } from '@/components/editors/stats-editor';
import type {
  CarouselSlide, ImpactArea, Program, TeamMember, Testimonial,
  BlessingLetter, GalleryImage, NewsItem, UpcomingEvent,
  DonationOption, Resource, StatItem,
} from '@website-builder/content-schema';

// ── Section config ─────────────────────────────────────────

type SectionId = 'hero' | 'impact' | 'stats' | 'programs' | 'testimonials' | 'team' | 'blessingLetters' | 'gallery' | 'news' | 'events' | 'joinUs' | 'resources';

interface SectionConfig {
  id: SectionId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  getItemCount: (c: ContentState) => number;
}

const SECTIONS: SectionConfig[] = [
  { id: 'hero', title: 'Hero Carousel', icon: ImageIcon, getItemCount: (c) => c.heroSlides.length },
  { id: 'impact', title: 'Impact Areas', icon: Heart, getItemCount: (c) => c.impact.length },
  { id: 'stats', title: 'Statistics', icon: BarChart3, getItemCount: (c) => c.stats.length },
  { id: 'programs', title: 'Programs', icon: List, getItemCount: (c) => c.programs.length },
  { id: 'testimonials', title: 'Testimonials', icon: Type, getItemCount: (c) => c.testimonials.length },
  { id: 'team', title: 'Team / Governance', icon: List, getItemCount: (c) => c.team.length },
  { id: 'blessingLetters', title: 'Blessing Letters', icon: ImageIcon, getItemCount: (c) => c.blessingLetters.length },
  { id: 'gallery', title: 'Gallery', icon: ImageIcon, getItemCount: (c) => c.gallery.length },
  { id: 'news', title: 'News', icon: List, getItemCount: (c) => c.news.length },
  { id: 'events', title: 'Upcoming Events', icon: List, getItemCount: (c) => c.events.length },
  { id: 'joinUs', title: 'Join Us / Donate', icon: Heart, getItemCount: (c) => c.donationOptions.length },
  { id: 'resources', title: 'Resources', icon: List, getItemCount: (c) => c.resources.length },
];

// ── Content state ──────────────────────────────────────────

interface ContentState {
  heroSlides: CarouselSlide[];
  impact: ImpactArea[];
  stats: StatItem[];
  programs: Program[];
  testimonials: Testimonial[];
  team: TeamMember[];
  blessingLetters: BlessingLetter[];
  gallery: GalleryImage[];
  news: NewsItem[];
  events: UpcomingEvent[];
  activities: string[];
  donationOptions: DonationOption[];
  resources: Resource[];
}

function parseContent(raw: Record<string, unknown> | null): ContentState {
  if (!raw) return EMPTY_CONTENT;
  return {
    heroSlides: (raw.hero as { slides?: CarouselSlide[] })?.slides ?? [],
    impact: (raw.impact as { items?: ImpactArea[] })?.items ?? [],
    stats: (raw.stats as { items?: StatItem[] })?.items ?? [],
    programs: (raw.programs as { items?: Program[] })?.items ?? [],
    testimonials: (raw.testimonials as { items?: Testimonial[] })?.items ?? [],
    team: (raw.team as { members?: TeamMember[] })?.members ?? [],
    blessingLetters: (raw.blessingLetters as { items?: BlessingLetter[] })?.items ?? [],
    gallery: (raw.gallery as { images?: GalleryImage[] })?.images ?? [],
    news: (raw.news as { items?: NewsItem[] })?.items ?? [],
    events: (raw.events as { upcoming?: UpcomingEvent[] })?.upcoming ?? [],
    activities: (raw.events as { activities?: string[] })?.activities ?? [],
    donationOptions: (raw.joinUs as { donationOptions?: DonationOption[] })?.donationOptions ?? [],
    resources: (raw.resources as { items?: Resource[] })?.items ?? [],
  };
}

function serializeContent(state: ContentState): Record<string, unknown> {
  return {
    hero: { slides: state.heroSlides },
    impact: { items: state.impact },
    stats: { items: state.stats },
    programs: { items: state.programs },
    testimonials: { items: state.testimonials },
    team: { members: state.team },
    blessingLetters: { items: state.blessingLetters },
    gallery: { images: state.gallery },
    news: { items: state.news },
    events: { upcoming: state.events, activities: state.activities },
    joinUs: { donationOptions: state.donationOptions },
    resources: { items: state.resources },
  };
}

const EMPTY_CONTENT: ContentState = {
  heroSlides: [], impact: [], stats: [], programs: [], testimonials: [],
  team: [], blessingLetters: [], gallery: [], news: [], events: [],
  activities: [], donationOptions: [], resources: [],
};

// ── Props ──────────────────────────────────────────────────

interface PageEditorClientProps {
  pageId: string;
  initialTitle: string;
  initialSlug: string;
  initialMetaTitle: string;
  initialMetaDescription: string;
  initialContent: Record<string, unknown> | null;
  initialVersionId: string | null;
  initialVersionNumber: number;
  initialStatus: string;
  pageType: string;
}

// ── Component ──────────────────────────────────────────────

export function PageEditorClient({
  pageId,
  initialTitle,
  initialSlug,
  initialMetaTitle,
  initialMetaDescription,
  initialContent,
  initialVersionId,
  initialVersionNumber,
  initialStatus,
  pageType,
}: PageEditorClientProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [metaTitle, setMetaTitle] = useState(initialMetaTitle);
  const [metaDescription, setMetaDescription] = useState(initialMetaDescription);
  const [content, setContent] = useState<ContentState>(parseContent(initialContent));
  const [openSections, setOpenSections] = useState<string[]>(['hero']);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [publishAction, setPublishAction] = useState<'stage' | 'publish' | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(initialVersionId);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const updateContent = useCallback(<K extends keyof ContentState>(key: K, value: ContentState[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSaved(false);
  }, []);

  function toggleSection(id: string) {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Save page metadata
      await updatePageMeta(pageId, {
        title, slug, meta_title: metaTitle, meta_description: metaDescription,
      });
      // Save content as new draft version
      const result = await savePageContent(pageId, serializeContent(content));
      setCurrentVersionId(result.id);
      setCurrentStatus('draft');
      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Save failed:', err);
    }
    setSaving(false);
  }

  async function handleDeployToStage() {
    if (dirty) await handleSave();
    if (currentVersionId) {
      await updateVersionStatus(currentVersionId, 'staged');
      setCurrentStatus('staged');
    }
    await deployToStage('a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  async function handlePublish() {
    if (dirty) await handleSave();
    if (currentVersionId) {
      await updateVersionStatus(currentVersionId, 'published');
      setCurrentStatus('published');
    }
    await publishToProduction('a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  function renderSectionEditor(sectionId: SectionId) {
    switch (sectionId) {
      case 'hero': return <HeroEditor slides={content.heroSlides} onChange={(v) => updateContent('heroSlides', v)} />;
      case 'impact': return <ImpactEditor items={content.impact} onChange={(v) => updateContent('impact', v)} />;
      case 'stats': return <StatsEditor items={content.stats} onChange={(v) => updateContent('stats', v)} />;
      case 'programs': return <ProgramsEditor items={content.programs} onChange={(v) => updateContent('programs', v)} />;
      case 'testimonials': return <TestimonialsEditor items={content.testimonials} onChange={(v) => updateContent('testimonials', v)} />;
      case 'team': return <TeamEditor members={content.team} onChange={(v) => updateContent('team', v)} />;
      case 'blessingLetters': return <BlessingLettersEditor items={content.blessingLetters} onChange={(v) => updateContent('blessingLetters', v)} />;
      case 'gallery': return <GalleryEditor images={content.gallery} onChange={(v) => updateContent('gallery', v)} />;
      case 'news': return <NewsEditor items={content.news} onChange={(v) => updateContent('news', v)} />;
      case 'events': return <EventsEditor upcoming={content.events} activities={content.activities} onChangeUpcoming={(v) => updateContent('events', v)} onChangeActivities={(v) => updateContent('activities', v)} />;
      case 'joinUs': return <JoinUsEditor options={content.donationOptions} onChange={(v) => updateContent('donationOptions', v)} />;
      case 'resources': return <ResourcesEditor items={content.resources} onChange={(v) => updateContent('resources', v)} />;
    }
  }

  const statusBadge = {
    draft: { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400', label: 'Draft' },
    staged: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500 animate-pulse-soft', label: 'Staged' },
    published: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Published' },
  }[currentStatus] || { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400', label: currentStatus };

  return (
    <div className="min-h-screen bg-surface">
      {/* Editor top bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-surface-border">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/pages" className="p-1.5 rounded-button text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="h-5 w-px bg-surface-border" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-heading text-ink">{title}</h1>
                <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border', statusBadge.bg)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', statusBadge.dot)} />
                  {statusBadge.label}
                </span>
                {dirty && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-badge text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    Unsaved
                  </span>
                )}
              </div>
              <p className="text-[12px] text-ink-muted font-mono mt-0.5">{slug}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-ink-secondary hover:text-ink border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all">
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button onClick={handleSave} disabled={saving || !dirty} className="flex items-center gap-2 px-4 py-1.5 bg-surface-card border border-surface-border text-ink rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all disabled:opacity-50">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5 text-status-published" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? 'Saved' : 'Save Draft'}
            </button>
            <button onClick={() => setPublishAction('stage')} className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white rounded-button text-[13px] font-medium hover:bg-amber-600 transition-colors">
              <Rocket className="w-3.5 h-3.5" /> Stage
            </button>
            <button onClick={() => setPublishAction('publish')} className="flex items-center gap-2 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
              <Globe className="w-3.5 h-3.5" /> Publish
            </button>
            <button onClick={() => setShowHistory(!showHistory)} className={cn('p-1.5 rounded-button transition-colors', showHistory ? 'text-accent bg-accent/10' : 'text-ink-muted hover:text-ink hover:bg-surface-hover')} title="Version history">
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Editor content */}
        <div className={cn('flex-1 max-w-4xl mx-auto p-8 animate-fade-in transition-all', showHistory && 'mr-[320px]')}>
          {/* Page info */}
          <div className="glass-card rounded-card p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Page Title" required>
                <TextInput value={title} onChange={(e) => { setTitle(e.currentTarget.value); setDirty(true); }} />
              </Field>
              <Field label="Slug">
                <TextInput value={slug} onChange={(e) => { setSlug(e.currentTarget.value); setDirty(true); }} mono />
              </Field>
              <Field label="Meta Title (SEO)">
                <TextInput value={metaTitle} onChange={(e) => { setMetaTitle(e.currentTarget.value); setDirty(true); }} />
              </Field>
              <Field label="Meta Description (SEO)">
                <TextInput value={metaDescription} onChange={(e) => { setMetaDescription(e.currentTarget.value); setDirty(true); }} />
              </Field>
            </div>
          </div>

          {/* Section accordion */}
          <div className="space-y-2">
            <h2 className="text-heading text-ink mb-4">Page Sections</h2>
            {SECTIONS.map((section) => {
              const isOpen = openSections.includes(section.id);
              const itemCount = section.getItemCount(content);
              return (
                <div key={section.id} className={cn('glass-card rounded-card overflow-hidden transition-all duration-200', isOpen && 'ring-1 ring-accent/20')}>
                  <button onClick={() => toggleSection(section.id)} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-surface-hover transition-colors text-left">
                    <GripVertical className="w-4 h-4 text-ink-muted flex-shrink-0 cursor-grab" />
                    <div className="w-8 h-8 bg-surface-raised rounded-button flex items-center justify-center border border-surface-border flex-shrink-0">
                      <section.icon className="w-4 h-4 text-ink-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-ink">{section.title}</p>
                    </div>
                    <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border mr-2">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                    <ChevronDown className={cn('w-4 h-4 text-ink-muted transition-transform duration-200', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-surface-border px-5 py-5 bg-surface-raised/50 animate-scale-in">
                      {renderSectionEditor(section.id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Version history sidebar */}
        {showHistory && (
          <aside className="fixed right-0 top-0 bottom-0 w-[320px] bg-surface-card border-l border-surface-border shadow-panel z-30 animate-slide-in-left overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 bg-surface-card border-b border-surface-border px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-ink-muted" />
                <h3 className="text-heading text-ink">Version History</h3>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-1 text-ink-muted hover:text-ink rounded transition-colors">
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <VersionHistory pageId={pageId} onRestore={() => setShowHistory(false)} />
            </div>
          </aside>
        )}
      </div>

      {/* Publish dialog */}
      {publishAction && (
        <PublishDialog
          open={!!publishAction}
          onClose={() => setPublishAction(null)}
          action={publishAction}
          pageName={title}
          onConfirm={publishAction === 'stage' ? handleDeployToStage : handlePublish}
        />
      )}
    </div>
  );
}
