'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Save,
  Rocket,
  Globe,
  Check,
  Loader2,
  X,
  Monitor,
  Tablet,
  Smartphone,
  MousePointerClick,
  Columns,
} from 'lucide-react';
import { savePageContent, updateVersionStatus, updatePageMeta } from '@/lib/actions/pages';
import { deployToStage, publishToProduction } from '@/lib/actions/deploy';
import { PublishDialog } from '@/components/editors/publish-dialog';
import { HeroTextEditor, type HeroTextData } from '@/components/editors/hero-text-editor';
import { MissionEditor, type MissionData } from '@/components/editors/mission-editor';
import { HeroEditor } from '@/components/editors/hero-editor';
import { ImpactEditor } from '@/components/editors/impact-editor';
import { ProgramsEditor } from '@/components/editors/programs-editor';
import { TestimonialsEditor } from '@/components/editors/testimonials-editor';
import { TeamEditor } from '@/components/editors/team-editor';
import { GalleryEditor } from '@/components/editors/gallery-editor';
import { NewsEditor } from '@/components/editors/news-editor';
import { EventsEditor } from '@/components/editors/events-editor';
import { JoinUsEditor } from '@/components/editors/join-us-editor';
import { ResourcesEditor } from '@/components/editors/resources-editor';
import { StatsEditor } from '@/components/editors/stats-editor';
import { BlessingLettersEditor } from '@/components/editors/blessing-letters-editor';
import type {
  CarouselSlide, ImpactArea, Program, TeamMember, Testimonial,
  BlessingLetter, GalleryImage, NewsItem, UpcomingEvent,
  DonationOption, Resource, StatItem,
} from '@website-builder/content-schema';

// ── Section definitions ────────────────────────────────────

const SECTION_MAP: Record<string, { label: string; color: string }> = {
  heroText: { label: 'Hero Text & CTAs', color: '#3b82f6' },
  hero: { label: 'Hero Carousel', color: '#8b5cf6' },
  mission: { label: 'Mission Section', color: '#06b6d4' },
  impact: { label: 'Impact Areas', color: '#ec4899' },
  stats: { label: 'Statistics', color: '#f59e0b' },
  programs: { label: 'Programs', color: '#10b981' },
  testimonials: { label: 'Testimonials', color: '#6366f1' },
  team: { label: 'Team / Governance', color: '#ef4444' },
  blessingLetters: { label: 'Blessing Letters', color: '#a855f7' },
  gallery: { label: 'Gallery', color: '#f97316' },
  news: { label: 'News', color: '#14b8a6' },
  events: { label: 'Events', color: '#e11d48' },
  joinUs: { label: 'Join Us / Donate', color: '#84cc16' },
  resources: { label: 'Resources', color: '#0ea5e9' },
};

// ── Content state (same structure as form editor) ──────────

interface ContentState {
  heroText: HeroTextData;
  mission: MissionData;
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

const DEFAULT_HERO_TEXT: HeroTextData = {
  heading: 'Society for Envisioning Vivekananda', headingHighlight: 'in Awareness and Action',
  subtitle: "We're a non government philanthropic organisation.",
  description: 'Inspired by the ideals of Thakur-Maa-Swamiji. Our organisation SEVAA dedicates itself to work among the underprivileged section of our society in the areas of Education, Health, Livelihood, Relief, Culture and Environment in the true spirit of "Shiv Gyane Jeev Seva" as espoused by Swamiji.',
  primaryCtaLabel: 'Explore Our Impact', primaryCtaTarget: 'impact',
  secondaryCtaLabel: 'Our Programs', secondaryCtaTarget: 'programs',
};

const DEFAULT_MISSION: MissionData = {
  heading: 'Our Mission', subtitle: 'Empowering communities through service and compassion',
  description: 'We believe that we can save the deprived mankind...', commitments: [], image: '/images/events/1.jpg',
};

function parseContent(raw: Record<string, unknown> | null): ContentState {
  if (!raw) return { heroText: DEFAULT_HERO_TEXT, mission: DEFAULT_MISSION, heroSlides: [], impact: [], stats: [], programs: [], testimonials: [], team: [], blessingLetters: [], gallery: [], news: [], events: [], activities: [], donationOptions: [], resources: [] };
  return {
    heroText: (raw.heroText as HeroTextData) ?? DEFAULT_HERO_TEXT,
    mission: (raw.mission as MissionData) ?? DEFAULT_MISSION,
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
    heroText: state.heroText, mission: state.mission,
    hero: { slides: state.heroSlides }, impact: { items: state.impact },
    stats: { items: state.stats }, programs: { items: state.programs },
    testimonials: { items: state.testimonials }, team: { members: state.team },
    blessingLetters: { items: state.blessingLetters }, gallery: { images: state.gallery },
    news: { items: state.news }, events: { upcoming: state.events, activities: state.activities },
    joinUs: { donationOptions: state.donationOptions }, resources: { items: state.resources },
  };
}

// ── Viewport sizes ─────────────────────────────────────────

type Viewport = 'desktop' | 'tablet' | 'mobile';
const viewportWidths: Record<Viewport, string> = { desktop: '100%', tablet: '768px', mobile: '375px' };

// ── Props ──────────────────────────────────────────────────

interface VisualEditorClientProps {
  pageId: string;
  pageTitle: string;
  pageSlug: string;
  initialContent: Record<string, unknown> | null;
  initialVersionId: string | null;
  initialStatus: string;
}

// ── Component ──────────────────────────────────────────────

export function VisualEditorClient({
  pageId, pageTitle, pageSlug, initialContent, initialVersionId, initialStatus,
}: VisualEditorClientProps) {
  const [content, setContent] = useState<ContentState>(parseContent(initialContent));
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [publishAction, setPublishAction] = useState<'stage' | 'publish' | null>(null);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(initialVersionId);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateContent = useCallback(<K extends keyof ContentState>(key: K, value: ContentState[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSaved(false);
  }, []);

  // Listen for messages from the iframe (section clicks)
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'section-click') {
        setActiveSection(event.data.sectionId);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await updatePageMeta(pageId, { title: pageTitle, slug: pageSlug });
      const result = await savePageContent(pageId, serializeContent(content));
      setCurrentVersionId(result.id);
      setSaved(true);
      setDirty(false);
      // Refresh iframe to show changes
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Save failed:', err);
    }
    setSaving(false);
  }

  async function handleDeployToStage() {
    if (dirty) await handleSave();
    if (currentVersionId) await updateVersionStatus(currentVersionId, 'staged');
    await deployToStage('a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  async function handlePublish() {
    if (dirty) await handleSave();
    if (currentVersionId) await updateVersionStatus(currentVersionId, 'published');
    await publishToProduction('a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  function renderEditor() {
    if (!activeSection) return null;
    const section = SECTION_MAP[activeSection];
    if (!section) return null;

    switch (activeSection) {
      case 'heroText': return <HeroTextEditor data={content.heroText} onChange={(v) => updateContent('heroText', v)} />;
      case 'hero': return <HeroEditor slides={content.heroSlides} onChange={(v) => updateContent('heroSlides', v)} />;
      case 'mission': return <MissionEditor data={content.mission} onChange={(v) => updateContent('mission', v)} />;
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
      default: return null;
    }
  }

  const sectionInfo = activeSection ? SECTION_MAP[activeSection] : null;
  const webAppUrl = `http://localhost:3000${pageSlug === '/' ? '' : pageSlug}?_edit=1`;

  return (
    <div className="h-screen flex flex-col bg-sidebar overflow-hidden">
      {/* Top toolbar */}
      <header className="flex items-center justify-between px-4 py-2 bg-sidebar border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/pages" className="p-1.5 rounded-button text-sidebar-muted hover:text-ink-inverse hover:bg-sidebar-hover transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-px bg-sidebar-border" />
          <div>
            <p className="text-[13px] font-medium text-ink-inverse">{pageTitle}</p>
            <p className="text-[11px] text-sidebar-muted font-mono">{pageSlug}</p>
          </div>
          <div className="h-4 w-px bg-sidebar-border ml-2" />
          <Link
            href={`/pages/${pageId}/edit`}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-sidebar-muted hover:text-ink-inverse rounded-button hover:bg-sidebar-hover transition-colors"
          >
            <Columns className="w-3 h-3" />
            Form Editor
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport switcher */}
          <div className="flex items-center gap-0.5 bg-sidebar-active rounded-button p-0.5">
            {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as [Viewport, typeof Monitor][]).map(([vp, Icon]) => (
              <button
                key={vp}
                onClick={() => setViewport(vp)}
                className={cn('p-1.5 rounded-[4px] transition-all', viewport === vp ? 'bg-accent text-white' : 'text-sidebar-muted hover:text-ink-inverse')}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-sidebar-border" />

          {/* Actions */}
          <button onClick={handleSave} disabled={saving || !dirty}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sidebar-active text-ink-inverse rounded-button text-[12px] font-medium hover:bg-sidebar-hover transition-all disabled:opacity-40">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <Check className="w-3 h-3 text-status-published" /> : <Save className="w-3 h-3" />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button onClick={() => setPublishAction('stage')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-button text-[12px] font-medium hover:bg-amber-600 transition-colors">
            <Rocket className="w-3 h-3" /> Stage
          </button>
          <button onClick={() => setPublishAction('publish')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-button text-[12px] font-medium hover:bg-accent-hover transition-colors">
            <Globe className="w-3 h-3" /> Publish
          </button>
        </div>
      </header>

      {/* Instruction bar */}
      {!activeSection && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 text-accent text-[12px] font-medium flex-shrink-0 border-b border-accent/20">
          <MousePointerClick className="w-3.5 h-3.5" />
          Click on any section in the preview to edit it
        </div>
      )}

      {/* Main area: iframe + editor panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Website preview iframe */}
        <div className={cn('flex-1 flex justify-center bg-[#e5e5e5] overflow-auto p-4 transition-all', activeSection && 'pr-0')}>
          <div
            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 h-fit"
            style={{ width: viewportWidths[viewport], maxWidth: '100%', minHeight: '100%' }}
          >
            <iframe
              ref={iframeRef}
              src={webAppUrl}
              className="w-full border-0"
              style={{ height: '3000px' }}
              title="Website Preview"
            />
          </div>
        </div>

        {/* Editor side panel */}
        {activeSection && sectionInfo && (
          <aside className="w-[420px] bg-surface-card border-l border-surface-border flex flex-col flex-shrink-0 animate-slide-in-left">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-surface-border flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sectionInfo.color }} />
                <h3 className="text-heading text-ink">{sectionInfo.label}</h3>
              </div>
              <button onClick={() => setActiveSection(null)} className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editor content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {renderEditor()}
            </div>

            {/* Panel footer */}
            <div className="px-5 py-3 border-t border-surface-border flex items-center justify-between bg-surface-raised/50 flex-shrink-0">
              <button onClick={() => setActiveSection(null)} className="text-[12px] text-ink-secondary hover:text-ink transition-colors">
                Close
              </button>
              <button onClick={handleSave} disabled={saving || !dirty}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[12px] font-medium hover:bg-sidebar-hover transition-all disabled:opacity-40">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                Save & Preview
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Section picker overlay (floating at bottom) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-sidebar/95 backdrop-blur-xl rounded-full px-3 py-2 shadow-panel border border-sidebar-border z-10">
        {Object.entries(SECTION_MAP).map(([id, { label, color }]) => (
          <button
            key={id}
            onClick={() => setActiveSection(activeSection === id ? null : id)}
            className={cn(
              'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap',
              activeSection === id
                ? 'text-white shadow-sm'
                : 'text-sidebar-muted hover:text-ink-inverse'
            )}
            style={activeSection === id ? { backgroundColor: color } : undefined}
            title={label}
          >
            {label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Publish dialog */}
      {publishAction && (
        <PublishDialog
          open={!!publishAction}
          onClose={() => setPublishAction(null)}
          action={publishAction}
          pageName={pageTitle}
          onConfirm={publishAction === 'stage' ? handleDeployToStage : handlePublish}
        />
      )}
    </div>
  );
}
