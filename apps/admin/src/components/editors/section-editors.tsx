'use client';

import { Field, TextInput, TextArea, SelectInput, NumberInput, ImagePicker, Checkbox } from '@/components/ui/field';
import { SortableItemList } from './sortable-item-list';

// ── Shared types ───────────────────────────────────────────

interface EditorProps<T> {
  data: T;
  onChange: (data: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function upd(data: any, onChange: (d: any) => void, patch: Record<string, unknown>) {
  onChange({ ...data, ...patch });
}

// ── Hero Editor ────────────────────────────────────────────

interface HeroData {
  heading?: string; headingHighlight?: string; subtitle?: string;
  description?: string; image?: string; backgroundImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroEditor({ data, onChange }: EditorProps<HeroData>) {
  const u = (patch: Partial<HeroData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Heading Highlight" description="Second line, accent color"><TextInput value={data.headingHighlight ?? ''} onChange={e => u({ headingHighlight: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Description"><TextArea value={data.description ?? ''} onChange={e => u({ description: e.currentTarget.value })} rows={3} /></Field>
      <Field label="Image"><ImagePicker value={data.image ?? ''} onChange={v => u({ image: v })} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary Button Label"><TextInput value={data.primaryCta?.label ?? ''} onChange={e => u({ primaryCta: { ...data.primaryCta, label: e.currentTarget.value, href: data.primaryCta?.href ?? '#' } })} /></Field>
        <Field label="Primary Button Link"><TextInput value={data.primaryCta?.href ?? ''} onChange={e => u({ primaryCta: { ...data.primaryCta, href: e.currentTarget.value, label: data.primaryCta?.label ?? '' } })} mono /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Secondary Button Label"><TextInput value={data.secondaryCta?.label ?? ''} onChange={e => u({ secondaryCta: { ...data.secondaryCta, label: e.currentTarget.value, href: data.secondaryCta?.href ?? '#' } })} /></Field>
        <Field label="Secondary Button Link"><TextInput value={data.secondaryCta?.href ?? ''} onChange={e => u({ secondaryCta: { ...data.secondaryCta, href: e.currentTarget.value, label: data.secondaryCta?.label ?? '' } })} mono /></Field>
      </div>
    </div>
  );
}

// ── Page Header Editor ─────────────────────────────────────

interface PageHeaderData { title?: string; subtitle?: string }

export function PageHeaderEditor({ data, onChange }: EditorProps<PageHeaderData>) {
  return (
    <div className="space-y-3">
      <Field label="Title"><TextInput value={data.title ?? ''} onChange={e => onChange({ ...data, title: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => onChange({ ...data, subtitle: e.currentTarget.value })} /></Field>
    </div>
  );
}

// ── Text Editor ────────────────────────────────────────────

interface TextData { heading?: string; body?: string }

export function TextEditor({ data, onChange }: EditorProps<TextData>) {
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => onChange({ ...data, heading: e.currentTarget.value })} /></Field>
      <Field label="Body (HTML)" description="Supports HTML: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;strong&gt;"><TextArea value={data.body ?? ''} onChange={e => onChange({ ...data, body: e.currentTarget.value })} rows={10} /></Field>
    </div>
  );
}

// ── Text with Image Editor ─────────────────────────────────

interface TextWithImageData {
  heading?: string; subtitle?: string; body?: string;
  items?: string[]; itemsHeading?: string;
  image?: string; imageAlt?: string; reversed?: boolean;
}

export function TextWithImageEditor({ data, onChange }: EditorProps<TextWithImageData>) {
  const u = (patch: Partial<TextWithImageData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Body Text"><TextArea value={data.body ?? ''} onChange={e => u({ body: e.currentTarget.value })} rows={4} /></Field>
      <Field label="Image"><ImagePicker value={data.image ?? ''} onChange={v => u({ image: v })} /></Field>
      <Field label="List Heading"><TextInput value={data.itemsHeading ?? ''} onChange={e => u({ itemsHeading: e.currentTarget.value })} placeholder="e.g. We are committed to:" /></Field>
      <div>
        <p className="text-[11px] font-medium text-ink-secondary mb-2">List Items</p>
        <div className="space-y-2">
          {(data.items ?? []).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput value={item} onChange={e => { const next = [...(data.items ?? [])]; next[i] = e.currentTarget.value; u({ items: next }); }} />
              <button onClick={() => u({ items: (data.items ?? []).filter((_, j) => j !== i) })} className="p-1 text-ink-muted hover:text-red-500 transition-colors text-[12px]">✕</button>
            </div>
          ))}
          <button onClick={() => u({ items: [...(data.items ?? []), ''] })} className="w-full py-1.5 border border-dashed border-surface-border rounded text-[12px] text-ink-secondary hover:text-accent hover:border-accent/40 transition-all">+ Add Item</button>
        </div>
      </div>
      <Checkbox label="Reverse layout (image on left)" checked={data.reversed ?? false} onChange={v => u({ reversed: v })} />
    </div>
  );
}

// ── Card Grid Editor ───────────────────────────────────────

interface CardItem { title?: string; description?: string; image?: string; badge?: string; link?: string }
interface CardGridData { heading?: string; subtitle?: string; columns?: number; items?: CardItem[] }

export function CardGridEditor({ data, onChange }: EditorProps<CardGridData>) {
  const u = (patch: Partial<CardGridData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Columns"><SelectInput value={String(data.columns ?? 3)} onChange={e => u({ columns: Number(e.currentTarget.value) })} options={[{value:'2',label:'2 columns'},{value:'3',label:'3 columns'},{value:'4',label:'4 columns'}]} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): CardItem => ({ title: '', description: '' })}
        getItemLabel={item => item.title || 'Untitled Card'}
        addLabel="Add Card"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Title"><TextInput value={item.title ?? ''} onChange={e => upd({ title: e.currentTarget.value })} /></Field>
            <Field label="Description"><TextArea value={item.description ?? ''} onChange={e => upd({ description: e.currentTarget.value })} rows={2} /></Field>
            <Field label="Image"><ImagePicker value={item.image ?? ''} onChange={v => upd({ image: v })} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Badge"><TextInput value={item.badge ?? ''} onChange={e => upd({ badge: e.currentTarget.value })} placeholder="Optional" /></Field>
              <Field label="Link"><TextInput value={item.link ?? ''} onChange={e => upd({ link: e.currentTarget.value })} placeholder="/path" mono /></Field>
            </div>
          </div>
        )}
      />
    </div>
  );
}

// ── Gallery Editor ─────────────────────────────────────────

interface GalleryItem { src: string; alt?: string; caption?: string }
interface GalleryData { heading?: string; subtitle?: string; columns?: number; images?: GalleryItem[] }

export function GalleryEditor({ data, onChange }: EditorProps<GalleryData>) {
  const u = (patch: Partial<GalleryData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <SortableItemList
        items={data.images ?? []}
        onChange={images => u({ images })}
        createItem={(): GalleryItem => ({ src: '' })}
        getItemLabel={item => item.caption || item.alt || 'Image'}
        addLabel="Add Image"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Image"><ImagePicker value={item.src} onChange={v => upd({ src: v })} /></Field>
            <Field label="Alt Text"><TextInput value={item.alt ?? ''} onChange={e => upd({ alt: e.currentTarget.value })} /></Field>
            <Field label="Caption"><TextInput value={item.caption ?? ''} onChange={e => upd({ caption: e.currentTarget.value })} /></Field>
          </div>
        )}
      />
    </div>
  );
}

// ── Testimonials Editor ────────────────────────────────────

interface TestimonialItem { quote: string; name?: string; title?: string; image?: string }
interface TestimonialsData { heading?: string; subtitle?: string; items?: TestimonialItem[] }

export function TestimonialsEditor({ data, onChange }: EditorProps<TestimonialsData>) {
  const u = (patch: Partial<TestimonialsData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): TestimonialItem => ({ quote: '' })}
        getItemLabel={item => item.name || 'Testimonial'}
        addLabel="Add Testimonial"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Quote"><TextArea value={item.quote} onChange={e => upd({ quote: e.currentTarget.value })} rows={3} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Name"><TextInput value={item.name ?? ''} onChange={e => upd({ name: e.currentTarget.value })} /></Field>
              <Field label="Title / Role"><TextInput value={item.title ?? ''} onChange={e => upd({ title: e.currentTarget.value })} /></Field>
            </div>
          </div>
        )}
      />
    </div>
  );
}

// ── Stats Editor ───────────────────────────────────────────

interface StatItem { value: string; label: string; suffix?: string }
interface StatsData { heading?: string; items?: StatItem[] }

export function StatsEditor({ data, onChange }: EditorProps<StatsData>) {
  const u = (patch: Partial<StatsData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): StatItem => ({ value: '0', label: '' })}
        getItemLabel={item => `${item.value}${item.suffix || ''} ${item.label}`}
        addLabel="Add Stat"
        collapsible={false}
        renderItem={(item, _, upd) => (
          <div className="grid grid-cols-3 gap-2">
            <Field label="Value"><TextInput value={item.value} onChange={e => upd({ value: e.currentTarget.value })} /></Field>
            <Field label="Label"><TextInput value={item.label} onChange={e => upd({ label: e.currentTarget.value })} /></Field>
            <Field label="Suffix"><TextInput value={item.suffix ?? ''} onChange={e => upd({ suffix: e.currentTarget.value })} placeholder="+ % etc" /></Field>
          </div>
        )}
      />
    </div>
  );
}

// ── CTA Editor ─────────────────────────────────────────────

interface CtaData {
  heading?: string; description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: string;
}

export function CtaEditor({ data, onChange }: EditorProps<CtaData>) {
  const u = (patch: Partial<CtaData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Description"><TextArea value={data.description ?? ''} onChange={e => u({ description: e.currentTarget.value })} rows={2} /></Field>
      <Field label="Background"><SelectInput value={data.background ?? 'dark'} onChange={e => u({ background: e.currentTarget.value })} options={[{value:'light',label:'Light'},{value:'dark',label:'Dark'},{value:'accent',label:'Accent Color'}]} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary Button"><TextInput value={data.primaryCta?.label ?? ''} onChange={e => u({ primaryCta: { label: e.currentTarget.value, href: data.primaryCta?.href ?? '#' } })} /></Field>
        <Field label="Primary Link"><TextInput value={data.primaryCta?.href ?? ''} onChange={e => u({ primaryCta: { label: data.primaryCta?.label ?? '', href: e.currentTarget.value } })} mono /></Field>
      </div>
    </div>
  );
}

// ── Contact Editor ─────────────────────────────────────────

interface ContactData { heading?: string; email?: string; phone?: string; address?: string; body?: string }

export function ContactEditor({ data, onChange }: EditorProps<ContactData>) {
  const u = (patch: Partial<ContactData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Email"><TextInput value={data.email ?? ''} onChange={e => u({ email: e.currentTarget.value })} /></Field>
      <Field label="Phone"><TextInput value={data.phone ?? ''} onChange={e => u({ phone: e.currentTarget.value })} /></Field>
      <Field label="Address"><TextArea value={data.address ?? ''} onChange={e => u({ address: e.currentTarget.value })} rows={2} /></Field>
      <Field label="Additional Content (HTML)"><TextArea value={data.body ?? ''} onChange={e => u({ body: e.currentTarget.value })} rows={4} /></Field>
    </div>
  );
}

// ── HTML Editor ────────────────────────────────────────────

interface HtmlData { body?: string }

export function HtmlEditor({ data, onChange }: EditorProps<HtmlData>) {
  return (
    <div className="space-y-3">
      <Field label="HTML Content" description="Raw HTML — supports any valid HTML"><TextArea value={data.body ?? ''} onChange={e => onChange({ body: e.currentTarget.value })} rows={15} /></Field>
    </div>
  );
}

// ── Editor lookup ──────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SectionDataEditor({ type, data, onChange }: { type: string; data: Record<string, unknown>; onChange: (data: any) => void }) {
  switch (type) {
    case 'hero': return <HeroEditor data={data as HeroData} onChange={onChange} />;
    case 'page-header': return <PageHeaderEditor data={data as PageHeaderData} onChange={onChange} />;
    case 'text': return <TextEditor data={data as TextData} onChange={onChange} />;
    case 'text-with-image': return <TextWithImageEditor data={data as TextWithImageData} onChange={onChange} />;
    case 'card-grid': return <CardGridEditor data={data as CardGridData} onChange={onChange} />;
    case 'gallery': return <GalleryEditor data={data as GalleryData} onChange={onChange} />;
    case 'testimonials': return <TestimonialsEditor data={data as TestimonialsData} onChange={onChange} />;
    case 'stats': return <StatsEditor data={data as StatsData} onChange={onChange} />;
    case 'cta': return <CtaEditor data={data as CtaData} onChange={onChange} />;
    case 'contact': return <ContactEditor data={data as ContactData} onChange={onChange} />;
    case 'html': return <HtmlEditor data={data as HtmlData} onChange={onChange} />;
    default: return <p className="text-[13px] text-ink-muted">Unknown section type: {type}</p>;
  }
}
