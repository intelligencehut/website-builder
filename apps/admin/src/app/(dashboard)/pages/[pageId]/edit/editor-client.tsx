'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, Save, Rocket, Globe, ChevronDown, GripVertical,
  Plus, Trash2, Eye, Check, Loader2, History, PanelRightClose,
  Layout, Type, Image as ImageIcon, Grid3X3, GalleryHorizontalEnd,
  Quote, BarChart3, Megaphone, Phone, Code, Plug,
} from 'lucide-react';
import { savePageContent, updateVersionStatus, updatePageMeta } from '@/lib/actions/pages';
import { deployToStage, publishToProduction } from '@/lib/actions/deploy';
import { PublishDialog } from '@/components/editors/publish-dialog';
import { VersionHistory } from '@/components/editors/version-history';
import { Field, TextInput } from '@/components/ui/field';
import { SectionDataEditor } from '@/components/editors/section-editors';
import { AddSectionDialog } from '@/components/editors/add-section-dialog';

// ── Section type config ────────────────────────────────────

const SECTION_ICONS: Record<string, typeof Layout> = {
  hero: Layout, 'page-header': Layout, text: Type, 'text-with-image': ImageIcon,
  'card-grid': Grid3X3, gallery: GalleryHorizontalEnd, testimonials: Quote,
  stats: BarChart3, cta: Megaphone, contact: Phone, html: Code,
  'dynamic-slot': Plug,
};

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Banner', 'page-header': 'Page Header', text: 'Text Block',
  'text-with-image': 'Text with Image', 'card-grid': 'Card Grid',
  gallery: 'Image Gallery', testimonials: 'Testimonials', stats: 'Statistics',
  cta: 'Call to Action', contact: 'Contact Info', html: 'Custom HTML',
  'dynamic-slot': 'Dynamic Slot',
};

// ── Section type ───────────────────────────────────────────

interface PageSection {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

// ── Props ──────────────────────────────────────────────────

interface PageEditorClientProps {
  pageId: string;
  siteId: string;
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

// ── Parse content into sections ────────────────────────────

function parseToSections(content: Record<string, unknown> | null): PageSection[] {
  if (!content) return [];

  // New format: sections array
  if (Array.isArray(content.sections)) {
    return content.sections as PageSection[];
  }

  // Legacy: static page with header + body
  if (content.header || content.body) {
    const sections: PageSection[] = [];
    const header = content.header as { title?: string; subtitle?: string } | undefined;
    if (header?.title) {
      sections.push({ id: 'header', type: 'page-header', data: { title: header.title, subtitle: header.subtitle } });
    }
    if (content.body) {
      sections.push({ id: 'content', type: 'html', data: { body: content.body } });
    }
    return sections;
  }

  // Legacy: home page with heroText/mission
  if (content.heroText) {
    const sections: PageSection[] = [];
    const ht = content.heroText as Record<string, unknown>;
    sections.push({
      id: 'hero', type: 'hero',
      data: {
        heading: ht.heading, headingHighlight: ht.headingHighlight,
        subtitle: ht.subtitle, description: ht.description,
        primaryCta: ht.primaryCtaLabel ? { label: ht.primaryCtaLabel, href: `#${ht.primaryCtaTarget || ''}` } : undefined,
        secondaryCta: ht.secondaryCtaLabel ? { label: ht.secondaryCtaLabel, href: `#${ht.secondaryCtaTarget || ''}` } : undefined,
      },
    });
    const m = content.mission as Record<string, unknown>;
    if (m) {
      sections.push({
        id: 'mission', type: 'text-with-image',
        data: { heading: m.heading, subtitle: m.subtitle, body: m.description, items: m.commitments, itemsHeading: 'We are committed to:', image: m.image },
      });
    }
    const p = content.programs as { items?: unknown[] };
    if (p?.items?.length) {
      sections.push({ id: 'programs', type: 'card-grid', data: { heading: 'Our Programs', items: p.items } });
    }
    return sections;
  }

  return [];
}

// ── Component ──────────────────────────────────────────────

export function PageEditorClient({
  pageId, siteId, initialTitle, initialSlug, initialMetaTitle, initialMetaDescription,
  initialContent, initialVersionId, initialVersionNumber, initialStatus, pageType,
}: PageEditorClientProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [metaTitle, setMetaTitle] = useState(initialMetaTitle);
  const [metaDescription, setMetaDescription] = useState(initialMetaDescription);
  const [sections, setSections] = useState<PageSection[]>(parseToSections(initialContent));
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(sections[0] ? [sections[0].id] : []));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [publishAction, setPublishAction] = useState<'stage' | 'publish' | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(initialVersionId);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const updateSectionData = useCallback((sectionId: string, data: Record<string, unknown>) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, data } : s));
    setDirty(true);
    setSaved(false);
  }, []);

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    setDirty(true);
  };

  const moveSection = (id: string, dir: 'up' | 'down') => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      const target = dir === 'up' ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target]!, next[idx]!];
      return next;
    });
    setDirty(true);
  };

  const addSection = (type: string) => {
    const id = `section-${Date.now()}`;
    setSections(prev => [...prev, { id, type, data: {} }]);
    setOpenSections(prev => new Set([...prev, id]));
    setDirty(true);
  };

  async function handleSave() {
    setSaving(true);
    try {
      await updatePageMeta(pageId, { title, slug, meta_title: metaTitle, meta_description: metaDescription });
      const result = await savePageContent(pageId, { sections });
      setCurrentVersionId(result.id);
      setCurrentStatus('draft');
      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { console.error('Save failed:', err); }
    setSaving(false);
  }

  async function handleDeployToStage() {
    if (dirty) await handleSave();
    if (currentVersionId) { await updateVersionStatus(currentVersionId, 'staged'); setCurrentStatus('staged'); }
    await deployToStage(siteId, currentVersionId || '');
  }

  async function handlePublish() {
    if (dirty) await handleSave();
    if (currentVersionId) { await updateVersionStatus(currentVersionId, 'published'); setCurrentStatus('published'); }
    await publishToProduction(siteId, currentVersionId || '');
  }

  const statusBadge = {
    draft: { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400', label: 'Draft' },
    staged: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', label: 'Staged' },
    published: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Published' },
  }[currentStatus] || { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400', label: currentStatus };

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
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
                  <span className={cn('w-1.5 h-1.5 rounded-full', statusBadge.dot)} />{statusBadge.label}
                </span>
                {dirty && <span className="inline-flex items-center px-2 py-0.5 rounded-badge text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">Unsaved</span>}
              </div>
              <p className="text-[12px] text-ink-muted font-mono mt-0.5">{slug}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/pages/${pageId}/visual`} className="flex items-center gap-2 px-3 py-1.5 text-ink-secondary hover:text-ink border border-surface-border rounded-button text-[13px] font-medium hover:bg-surface-hover transition-all">
              <Eye className="w-3.5 h-3.5" /> Visual
            </Link>
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
            <button onClick={() => setShowHistory(!showHistory)} className={cn('p-1.5 rounded-button transition-colors', showHistory ? 'text-accent bg-accent/10' : 'text-ink-muted hover:text-ink hover:bg-surface-hover')}>
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <div className={cn('flex-1 max-w-4xl mx-auto p-8 animate-fade-in transition-all', showHistory && 'mr-[320px]')}>
          {/* Page meta */}
          <div className="glass-card rounded-card p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Page Title" required><TextInput value={title} onChange={e => { setTitle(e.currentTarget.value); setDirty(true); }} /></Field>
              <Field label="Slug"><TextInput value={slug} onChange={e => { setSlug(e.currentTarget.value); setDirty(true); }} mono /></Field>
              <Field label="Meta Title (SEO)"><TextInput value={metaTitle} onChange={e => { setMetaTitle(e.currentTarget.value); setDirty(true); }} /></Field>
              <Field label="Meta Description (SEO)"><TextInput value={metaDescription} onChange={e => { setMetaDescription(e.currentTarget.value); setDirty(true); }} /></Field>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading text-ink">Sections ({sections.length})</h2>
              <button onClick={() => setShowAddSection(true)} className="flex items-center gap-1.5 text-caption text-accent hover:text-accent-hover transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>

            {sections.length === 0 && (
              <div className="glass-card rounded-card py-16 text-center">
                <Layout className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                <p className="text-heading text-ink">No sections yet</p>
                <p className="text-body text-ink-secondary mt-1">Add sections to build this page</p>
                <button onClick={() => setShowAddSection(true)} className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add First Section
                </button>
              </div>
            )}

            {sections.map((section, index) => {
              const isOpen = openSections.has(section.id);
              const Icon = SECTION_ICONS[section.type] || Layout;
              const label = SECTION_LABELS[section.type] || section.type;

              return (
                <div key={section.id} className={cn('glass-card rounded-card overflow-hidden transition-all duration-200', isOpen && 'ring-1 ring-accent/20')}>
                  <div className="flex items-center gap-2 px-4 py-3 hover:bg-surface-hover transition-colors">
                    <GripVertical className="w-4 h-4 text-ink-muted cursor-grab flex-shrink-0" />
                    <button onClick={() => toggleSection(section.id)} className="flex items-center gap-3 flex-1 text-left min-w-0">
                      <div className="w-8 h-8 bg-surface-raised rounded-button flex items-center justify-center border border-surface-border flex-shrink-0">
                        <Icon className="w-4 h-4 text-ink-secondary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-ink truncate">{label}</p>
                        <p className="text-[11px] text-ink-muted">{section.type}</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button onClick={() => moveSection(section.id, 'up')} disabled={index === 0} className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors"><ChevronDown className="w-3 h-3 rotate-180" /></button>
                      <button onClick={() => moveSection(section.id, 'down')} disabled={index === sections.length - 1} className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors"><ChevronDown className="w-3 h-3" /></button>
                      <button onClick={() => removeSection(section.id)} className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors"><Trash2 className="w-3 h-3" /></button>
                      <ChevronDown className={cn('w-4 h-4 text-ink-muted transition-transform ml-1 cursor-pointer', isOpen && 'rotate-180')} onClick={() => toggleSection(section.id)} />
                    </div>
                  </div>
                  {isOpen && (
                    <div className="border-t border-surface-border px-5 py-5 bg-surface-raised/50 animate-scale-in">
                      <SectionDataEditor type={section.type} data={section.data} onChange={data => updateSectionData(section.id, data)} />
                    </div>
                  )}
                </div>
              );
            })}

            {sections.length > 0 && (
              <button onClick={() => setShowAddSection(true)} className="w-full flex items-center justify-center gap-2 px-3 py-3 border border-dashed border-surface-border rounded-card text-[13px] text-ink-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all">
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            )}
          </div>
        </div>

        {/* Version history */}
        {showHistory && (
          <aside className="fixed right-0 top-0 bottom-0 w-[320px] bg-surface-card border-l border-surface-border shadow-panel z-30 animate-slide-in-left overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 bg-surface-card border-b border-surface-border px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2"><History className="w-4 h-4 text-ink-muted" /><h3 className="text-heading text-ink">Version History</h3></div>
              <button onClick={() => setShowHistory(false)} className="p-1 text-ink-muted hover:text-ink rounded transition-colors"><PanelRightClose className="w-4 h-4" /></button>
            </div>
            <div className="p-4"><VersionHistory pageId={pageId} onRestore={() => setShowHistory(false)} /></div>
          </aside>
        )}
      </div>

      {/* Dialogs */}
      <AddSectionDialog open={showAddSection} onClose={() => setShowAddSection(false)} onAdd={addSection} />
      {publishAction && (
        <PublishDialog open={!!publishAction} onClose={() => setPublishAction(null)} action={publishAction} pageName={title}
          onConfirm={publishAction === 'stage' ? handleDeployToStage : handlePublish} />
      )}
    </div>
  );
}
