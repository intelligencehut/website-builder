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
  MoreHorizontal,
  Check,
  Loader2,
  History,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';
import { saveDraft } from '@/lib/actions/content';
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
  CarouselSlide,
  ImpactArea,
  Program,
  TeamMember,
  Testimonial,
  BlessingLetter,
  GalleryImage,
  NewsItem,
  UpcomingEvent,
  DonationOption,
  Resource,
  StatItem,
} from '@website-builder/content-schema';

// ── Default data (from SEVAA website) ──────────────────────────────────────

const DEFAULT_HERO_SLIDES: CarouselSlide[] = [
  { src: '/images/about/about-2.jpg', alt: 'SEVAA Mission and Values', title: 'Inspired by Thakur-Maa-Swamiji', description: 'Working among the underprivileged section of society' },
  { src: '/images/gallery/gallery-1.jpg', alt: 'SEVAA Gallery Image 1', title: 'Education & Awareness', description: 'Quality education to the underprivileged' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'SEVAA Gallery Image 2', title: 'Community Service', description: 'Serving humanity with compassion and care' },
];

const DEFAULT_IMPACT: ImpactArea[] = [
  { icon: 'Users', label: 'Community Development', description: 'Empowering communities through sustainable development initiatives', color: 'bg-blue-500' },
  { icon: 'Heart', label: 'Healthcare', description: 'Regular health camps and medical support for underserved communities', color: 'bg-rose-500' },
  { icon: 'GraduationCap', label: 'Education', description: 'Quality education through innovative learning programs', color: 'bg-emerald-500' },
  { icon: 'Leaf', label: 'Environment', description: 'Promoting sustainable practices and environmental conservation', color: 'bg-green-500' },
];

const DEFAULT_PROGRAMS: Program[] = [
  { id: 'adur-pathshala', title: 'Adur Pathshala', description: 'Neighborhood learning centers providing quality education.', image: '/images/programs/seva-activities-1.jpg', location: 'West Bengal', status: 'Active', category: 'Education' },
  { id: 'vano-vidyalay', title: 'Tilka Murmu SEVAA Vano Vidyalay', description: 'Forest school initiative connecting children with nature.', image: '/images/programs/saparambera-1.jpg', location: 'Saparambera, Ajodhya Hills', status: 'Planned', year: '2025', category: 'Education', beneficiaries: 52 },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Himadri Saha', title: 'Engineer', content: 'SEVAA friends are genuinely performing activities in the society, particularly for tribals and downtrodden people.' },
  { id: 2, name: 'Dr M M Ghatak', title: 'MD, Physician', content: 'Wherever SEVAA works, a magical result is seen due to the blessings of Thakur-Maa-Swamiji.' },
];

const DEFAULT_TEAM: TeamMember[] = [
  { name: 'Dibes BERA', position: 'President', category: 'executive' },
  { name: 'Narayan Tatachari', position: 'Secretary', category: 'executive' },
  { name: 'Pradip Mukherjee', position: 'Treasurer', category: 'executive' },
];

const DEFAULT_GALLERY: GalleryImage[] = [
  { id: 1, src: '/images/gallery/11.jpg', alt: 'Community Work', title: 'Community Engagement' },
  { id: 2, src: '/images/gallery/33.jpg', alt: 'Educational Program', title: 'Educational Initiative' },
  { id: 3, src: '/images/gallery/44.jpg', alt: 'Healthcare Initiative', title: 'Healthcare Program' },
];

const DEFAULT_NEWS: NewsItem[] = [
  { id: 'tilka-murmu-school', title: 'Inauguration of Tilka Murmu SEVAA Vano Vidyalay', excerpt: 'A historic moment as we inaugurate our forest school.', image: '/images/userfiles/image/Sevaa Booklet 2024_001.jpg', date: 'March 9-10, 2025', category: 'Education' },
  { id: 'lac-training', title: 'LAC Training Program Conducted', excerpt: 'Successful completion of LAC training program.', image: '/images/news_image/org/lac training program-1721231943.jpg', date: 'July 2024', category: 'Training' },
];

const DEFAULT_EVENTS: UpcomingEvent[] = [
  { id: 'lac-cultivation', title: 'Lac Cultivation Training', description: 'Cluster-based lac cultivation training for sustainable livelihood.', image: '/images/events/1.jpg', date: 'Ongoing', location: 'Purulia District', category: 'Livelihood' },
  { id: 'adur-pathshala', title: 'Adur Pathshala - Learning Centers', description: 'Neighbourhood learning centres providing quality education.', image: '/images/events/2.jpg', date: 'Continuous', location: 'Purulia & Paschim Burdwan', category: 'Education' },
];

const DEFAULT_ACTIVITIES: string[] = ['School building under Construction', 'Health and Well-being Camps', 'Cluster based Lac cultivation', 'Organic food production'];

const DEFAULT_DONATION_OPTIONS: DonationOption[] = [
  { id: 'scholarships', icon: 'GraduationCap', title: '"We Support" Group Scholarships', description: 'Provide scholarships to deserving students.' },
  { id: 'school-support', icon: 'Building2', title: 'Support the School', description: 'Rs 1000 per student per month to support school operations.' },
  { id: 'in-kind', icon: 'Heart', title: 'In-Kind Donations', description: 'Donate stationery, books, school infrastructure needs.' },
];

const DEFAULT_RESOURCES: Resource[] = [
  { id: 'tilka-murmu-forest-school', title: 'Tilka Murmu SEVAA Vano Vidyalay', description: 'Inauguration details and facilities information.', type: 'pdf', url: '/documents/Tilka Murmu Forest School.pdf', size: '2.1 MB', date: 'March 2025' },
  { id: 'annual-report-2024', title: 'Annual Report 2024', description: 'Comprehensive overview of our activities.', type: 'report', url: '#', size: 'Coming Soon', date: '2024' },
];

const DEFAULT_STATS: StatItem[] = [
  { value: 1000, label: 'Beneficiaries', suffix: '+' },
  { value: 50, label: 'Volunteers', suffix: '+' },
  { value: 6, label: 'Programs' },
  { value: 3, label: 'Districts' },
];

const DEFAULT_BLESSINGS: BlessingLetter[] = [
  { title: 'Blessing from Swami Shivapradananda', imageSrc: '/images/blessing-letter-shivapradananda.jpg', imageAlt: 'Blessing letter from Swami Shivapradananda' },
  { title: 'Blessing from Swami Suparnanadiji', imageSrc: '/images/blessing-letter-suparnanadiji.jpg', imageAlt: 'Blessing letter from Swami Suparnanadiji' },
];

// ── Section config ─────────────────────────────────────────────────────────

type SectionId = 'hero' | 'impact' | 'stats' | 'programs' | 'testimonials' | 'team' | 'blessingLetters' | 'gallery' | 'news' | 'events' | 'joinUs' | 'resources';

interface SectionConfig {
  id: SectionId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  getItemCount: (state: PageState) => number;
}

const SECTIONS: SectionConfig[] = [
  { id: 'hero', title: 'Hero Carousel', icon: ImageIcon, getItemCount: (s) => s.heroSlides.length },
  { id: 'impact', title: 'Impact Areas', icon: Heart, getItemCount: (s) => s.impact.length },
  { id: 'stats', title: 'Statistics', icon: BarChart3, getItemCount: (s) => s.stats.length },
  { id: 'programs', title: 'Programs', icon: List, getItemCount: (s) => s.programs.length },
  { id: 'testimonials', title: 'Testimonials', icon: Type, getItemCount: (s) => s.testimonials.length },
  { id: 'team', title: 'Team / Governance', icon: List, getItemCount: (s) => s.team.length },
  { id: 'blessingLetters', title: 'Blessing Letters', icon: ImageIcon, getItemCount: (s) => s.blessingLetters.length },
  { id: 'gallery', title: 'Gallery', icon: ImageIcon, getItemCount: (s) => s.gallery.length },
  { id: 'news', title: 'News', icon: List, getItemCount: (s) => s.news.length },
  { id: 'events', title: 'Upcoming Events', icon: List, getItemCount: (s) => s.events.length },
  { id: 'joinUs', title: 'Join Us / Donate', icon: Heart, getItemCount: (s) => s.donationOptions.length },
  { id: 'resources', title: 'Resources', icon: List, getItemCount: (s) => s.resources.length },
];

// ── Page state ─────────────────────────────────────────────────────────────

interface PageState {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
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

const INITIAL_STATE: PageState = {
  title: 'Home',
  slug: '/',
  metaTitle: 'SEVAA — Society for Envisioning Vivekananda in Awareness and Action',
  metaDescription: 'Non-government philanthropic organisation inspired by Swami Vivekananda',
  heroSlides: DEFAULT_HERO_SLIDES,
  impact: DEFAULT_IMPACT,
  stats: DEFAULT_STATS,
  programs: DEFAULT_PROGRAMS,
  testimonials: DEFAULT_TESTIMONIALS,
  team: DEFAULT_TEAM,
  blessingLetters: DEFAULT_BLESSINGS,
  gallery: DEFAULT_GALLERY,
  news: DEFAULT_NEWS,
  events: DEFAULT_EVENTS,
  activities: DEFAULT_ACTIVITIES,
  donationOptions: DEFAULT_DONATION_OPTIONS,
  resources: DEFAULT_RESOURCES,
};

// ── Page editor ────────────────────────────────────────────────────────────

export default function PageEditorPage() {
  const [state, setState] = useState<PageState>(INITIAL_STATE);
  const [openSections, setOpenSections] = useState<string[]>(['hero']);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [publishAction, setPublishAction] = useState<'stage' | 'publish' | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentVersionId, setCurrentVersionId] = useState<string>('demo-v1');

  const update = useCallback(<K extends keyof PageState>(key: K, value: PageState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
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
    const result = await saveDraft('home', state as unknown as Record<string, unknown>);
    setCurrentVersionId(result.id);
    setSaving(false);
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDeployToStage() {
    if (dirty) await handleSave();
    await deployToStage('demo-site', currentVersionId, 'Amit Das');
  }

  async function handlePublish() {
    if (dirty) await handleSave();
    await publishToProduction('demo-site', currentVersionId, 'Amit Das');
  }

  function renderSectionEditor(sectionId: SectionId) {
    switch (sectionId) {
      case 'hero':
        return <HeroEditor slides={state.heroSlides} onChange={(v) => update('heroSlides', v)} />;
      case 'impact':
        return <ImpactEditor items={state.impact} onChange={(v) => update('impact', v)} />;
      case 'stats':
        return <StatsEditor items={state.stats} onChange={(v) => update('stats', v)} />;
      case 'programs':
        return <ProgramsEditor items={state.programs} onChange={(v) => update('programs', v)} />;
      case 'testimonials':
        return <TestimonialsEditor items={state.testimonials} onChange={(v) => update('testimonials', v)} />;
      case 'team':
        return <TeamEditor members={state.team} onChange={(v) => update('team', v)} />;
      case 'blessingLetters':
        return <BlessingLettersEditor items={state.blessingLetters} onChange={(v) => update('blessingLetters', v)} />;
      case 'gallery':
        return <GalleryEditor images={state.gallery} onChange={(v) => update('gallery', v)} />;
      case 'news':
        return <NewsEditor items={state.news} onChange={(v) => update('news', v)} />;
      case 'events':
        return (
          <EventsEditor
            upcoming={state.events}
            activities={state.activities}
            onChangeUpcoming={(v) => update('events', v)}
            onChangeActivities={(v) => update('activities', v)}
          />
        );
      case 'joinUs':
        return <JoinUsEditor options={state.donationOptions} onChange={(v) => update('donationOptions', v)} />;
      case 'resources':
        return <ResourcesEditor items={state.resources} onChange={(v) => update('resources', v)} />;
    }
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
                <h1 className="text-heading text-ink">{state.title}</h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Published
                </span>
                {dirty && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-badge text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    Unsaved changes
                  </span>
                )}
              </div>
              <p className="text-[12px] text-ink-muted font-mono mt-0.5">{state.slug}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-ink-secondary hover:text-ink border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={saving || !dirty}
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

            <button
              onClick={() => setPublishAction('stage')}
              className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white rounded-button text-[13px] font-medium hover:bg-amber-600 transition-colors"
            >
              <Rocket className="w-3.5 h-3.5" />
              Stage
            </button>

            <button
              onClick={() => setPublishAction('publish')}
              className="flex items-center gap-2 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Publish
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                'p-1.5 rounded-button transition-colors',
                showHistory ? 'text-accent bg-accent/10' : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
              )}
              title="Version history"
            >
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
              <TextInput value={state.title} onChange={(e) => update('title', e.currentTarget.value)} />
            </Field>
            <Field label="Slug">
              <TextInput value={state.slug} onChange={(e) => update('slug', e.currentTarget.value)} mono />
            </Field>
            <Field label="Meta Title (SEO)">
              <TextInput value={state.metaTitle} onChange={(e) => update('metaTitle', e.currentTarget.value)} />
            </Field>
            <Field label="Meta Description (SEO)">
              <TextInput value={state.metaDescription} onChange={(e) => update('metaDescription', e.currentTarget.value)} />
            </Field>
          </div>
        </div>

        {/* Section accordion */}
        <div className="space-y-2">
          <h2 className="text-heading text-ink mb-4">Page Sections</h2>

          {SECTIONS.map((section) => {
            const isOpen = openSections.includes(section.id);
            const itemCount = section.getItemCount(state);

            return (
              <div
                key={section.id}
                className={cn(
                  'glass-card rounded-card overflow-hidden transition-all duration-200',
                  isOpen && 'ring-1 ring-accent/20'
                )}
              >
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
                  </div>

                  <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border mr-2">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>

                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-ink-muted transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
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
            <button
              onClick={() => setShowHistory(false)}
              className="p-1 text-ink-muted hover:text-ink rounded transition-colors"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            <VersionHistory
              pageId="home"
              onRestore={(versionId) => {
                // TODO: Load version content
                setShowHistory(false);
              }}
            />
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
          pageName={state.title}
          onConfirm={publishAction === 'stage' ? handleDeployToStage : handlePublish}
        />
      )}
    </div>
  );
}
