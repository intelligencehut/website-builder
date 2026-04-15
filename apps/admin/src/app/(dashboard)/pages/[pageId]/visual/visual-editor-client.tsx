'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, Save, Rocket, Globe, Check, Loader2, X,
  Monitor, Tablet, Smartphone, MousePointerClick, Columns,
} from 'lucide-react';
import { savePageContent, updateVersionStatus, updatePageMeta, revalidateSite } from '@/lib/actions/pages';
import { deployToStage, publishToProduction } from '@/lib/actions/deploy';
import { PublishDialog } from '@/components/editors/publish-dialog';
import { SectionDataEditor } from '@/components/editors/section-editors';
import { PreviewUrlProvider } from '@/components/editors/preview-url-context';

// ── Section type ───────────────────────────────────────────

interface PageSection {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Banner', 'page-header': 'Page Header', text: 'Text Block',
  'text-with-image': 'Text with Image', 'card-grid': 'Card Grid',
  gallery: 'Image Gallery', testimonials: 'Testimonials', stats: 'Statistics',
  cta: 'Call to Action', contact: 'Contact Info', html: 'Custom HTML',
  'dynamic-slot': 'Dynamic Slot',
};

const SECTION_COLORS: Record<string, string> = {
  hero: '#3b82f6', 'page-header': '#1e40af', text: '#6366f1',
  'text-with-image': '#06b6d4', 'card-grid': '#10b981',
  gallery: '#f97316', testimonials: '#8b5cf6', stats: '#f59e0b',
  cta: '#84cc16', contact: '#ec4899', html: '#64748b',
  'dynamic-slot': '#0ea5e9',
};

// ── Parse content into sections (same as form editor) ──────

function parseToSections(content: Record<string, unknown> | null): PageSection[] {
  if (!content) return [];
  if (Array.isArray(content.sections)) return content.sections as PageSection[];

  // Legacy: static page
  if (content.header || content.body) {
    const sections: PageSection[] = [];
    const header = content.header as { title?: string; subtitle?: string } | undefined;
    if (header?.title) sections.push({ id: 'header', type: 'page-header', data: { title: header.title, subtitle: header.subtitle } });
    if (content.body) sections.push({ id: 'content', type: 'html', data: { body: content.body } });
    return sections;
  }

  // Legacy: home page
  if (content.heroText) {
    const sections: PageSection[] = [];
    const ht = content.heroText as Record<string, unknown>;
    sections.push({ id: 'hero', type: 'hero', data: {
      heading: ht.heading, headingHighlight: ht.headingHighlight, subtitle: ht.subtitle, description: ht.description,
      primaryCta: ht.primaryCtaLabel ? { label: ht.primaryCtaLabel, href: `#${ht.primaryCtaTarget || ''}` } : undefined,
      secondaryCta: ht.secondaryCtaLabel ? { label: ht.secondaryCtaLabel, href: `#${ht.secondaryCtaTarget || ''}` } : undefined,
    }});
    const m = content.mission as Record<string, unknown>;
    if (m) sections.push({ id: 'mission', type: 'text-with-image', data: { heading: m.heading, subtitle: m.subtitle, body: m.description, items: m.commitments, itemsHeading: 'We are committed to:', image: m.image } });
    return sections;
  }

  return [];
}

// ── Viewport ───────────────────────────────────────────────

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
  previewBaseUrl?: string;
  siteId?: string;
  siteDomain?: string;
  stageDomain?: string;
}

// ── Component ──────────────────────────────────────────────

export function VisualEditorClient({
  pageId, pageTitle, pageSlug, initialContent, initialVersionId, initialStatus,
  previewBaseUrl, siteId, siteDomain, stageDomain,
}: VisualEditorClientProps) {
  const [sections, setSections] = useState<PageSection[]>(parseToSections(initialContent));
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [publishAction, setPublishAction] = useState<'stage' | 'publish' | null>(null);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(initialVersionId);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateSectionData = useCallback((sectionId: string, data: Record<string, unknown>) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, data } : s));
    setDirty(true);
    setSaved(false);
  }, []);

  // Listen for messages from the iframe
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
      const result = await savePageContent(pageId, { sections });
      setCurrentVersionId(result.id);
      // Auto-publish and revalidate so the preview iframe shows updated content
      await updateVersionStatus(result.id, 'published');
      // Trigger server-side revalidation on the target site
      if (siteId) {
        await revalidateSite(siteId, pageSlug);
      }
      setSaved(true);
      setDirty(false);
      // Reload iframe after a short delay to allow revalidation to complete
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
      }, 500);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { console.error('Save failed:', err); }
    setSaving(false);
  }

  async function handleDeployToStage() {
    if (dirty) await handleSave();
    if (currentVersionId) await updateVersionStatus(currentVersionId, 'staged');
    await deployToStage(siteId || 'a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  async function handlePublish() {
    if (dirty) await handleSave();
    if (currentVersionId) await updateVersionStatus(currentVersionId, 'published');
    await publishToProduction(siteId || 'a0000000-0000-0000-0000-000000000001', currentVersionId || '');
  }

  const activeItem = sections.find(s => s.id === activeSection);
  const activeLabel = activeItem ? (SECTION_LABELS[activeItem.type] || activeItem.type) : null;
  const activeColor = activeItem ? (SECTION_COLORS[activeItem.type] || '#6b7280') : null;
  const baseUrl = previewBaseUrl || 'http://localhost:3000';
  const webAppUrl = `${baseUrl}${pageSlug === '/' ? '' : pageSlug}?_edit=1`;

  return (
    <PreviewUrlProvider url={previewBaseUrl}>
    <div className="h-screen flex flex-col bg-sidebar overflow-hidden">
      {/* Toolbar */}
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
          <Link href={`/pages/${pageId}/edit`} className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-sidebar-muted hover:text-ink-inverse rounded-button hover:bg-sidebar-hover transition-colors">
            <Columns className="w-3 h-3" /> Form Editor
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 bg-sidebar-active rounded-button p-0.5">
            {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as [Viewport, typeof Monitor][]).map(([vp, Icon]) => (
              <button key={vp} onClick={() => setViewport(vp)} className={cn('p-1.5 rounded-[4px] transition-all', viewport === vp ? 'bg-accent text-white' : 'text-sidebar-muted hover:text-ink-inverse')}>
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-sidebar-border" />
          <button onClick={handleSave} disabled={saving || !dirty} className="flex items-center gap-1.5 px-3 py-1.5 bg-sidebar-active text-ink-inverse rounded-button text-[12px] font-medium hover:bg-sidebar-hover transition-all disabled:opacity-40">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <Check className="w-3 h-3 text-status-published" /> : <Save className="w-3 h-3" />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button onClick={() => setPublishAction('publish')} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-button text-[12px] font-medium hover:bg-accent-hover transition-colors">
            <Globe className="w-3 h-3" /> Publish
          </button>
        </div>
      </header>

      {/* Instruction */}
      {!activeSection && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 text-accent text-[12px] font-medium flex-shrink-0 border-b border-accent/20">
          <MousePointerClick className="w-3.5 h-3.5" /> Click on any section in the preview to edit it
        </div>
      )}

      {/* Main: iframe + editor */}
      <div className="flex-1 flex overflow-hidden">
        <div className={cn('flex-1 flex justify-center bg-[#e5e5e5] overflow-auto p-4 transition-all', activeSection && 'pr-0')}>
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 h-fit" style={{ width: viewportWidths[viewport], maxWidth: '100%', minHeight: '100%' }}>
            <iframe ref={iframeRef} src={webAppUrl} className="w-full border-0" style={{ height: '3000px' }} title="Preview" />
          </div>
        </div>

        {/* Editor panel */}
        {activeSection && activeItem && activeLabel && (
          <aside className="w-[420px] bg-surface-card border-l border-surface-border flex flex-col flex-shrink-0 animate-slide-in-left">
            <div className="flex items-center justify-between px-5 py-3 border-b border-surface-border flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeColor! }} />
                <h3 className="text-heading text-ink">{activeLabel}</h3>
              </div>
              <button onClick={() => setActiveSection(null)} className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-hover rounded-button transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <SectionDataEditor
                type={activeItem.type}
                data={activeItem.data}
                onChange={(data) => updateSectionData(activeItem.id, data)}
              />
            </div>
            <div className="px-5 py-3 border-t border-surface-border flex items-center justify-between bg-surface-raised/50 flex-shrink-0">
              <button onClick={() => setActiveSection(null)} className="text-[12px] text-ink-secondary hover:text-ink transition-colors">Close</button>
              <button onClick={handleSave} disabled={saving || !dirty} className="flex items-center gap-1.5 px-4 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[12px] font-medium hover:bg-sidebar-hover transition-all disabled:opacity-40">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Section picker bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-sidebar/95 backdrop-blur-xl rounded-full px-3 py-2 shadow-panel border border-sidebar-border z-10">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
            className={cn('px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap', activeSection === s.id ? 'text-white shadow-sm' : 'text-sidebar-muted hover:text-ink-inverse')}
            style={activeSection === s.id ? { backgroundColor: SECTION_COLORS[s.type] || '#6b7280' } : undefined}
            title={SECTION_LABELS[s.type] || s.type}
          >
            {(SECTION_LABELS[s.type] || s.type).split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Publish dialog */}
      {publishAction && (
        <PublishDialog open={!!publishAction} onClose={() => setPublishAction(null)} action={publishAction} pageName={pageTitle}
          onConfirm={publishAction === 'stage' ? handleDeployToStage : handlePublish} siteDomain={siteDomain} stageDomain={stageDomain} />
      )}
    </div>
    </PreviewUrlProvider>
  );
}
