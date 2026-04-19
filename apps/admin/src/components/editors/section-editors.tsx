'use client';

import { Field, TextInput, TextArea, SelectInput, NumberInput, ImagePicker, Checkbox } from '@/components/ui/field';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { SortableItemList } from './sortable-item-list';
import { DynamicSlotEditor } from './dynamic-slot-editor';

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

interface HeroImage { src?: string; alt?: string }
interface HeroData {
  heading?: string; headingHighlight?: string; subtitle?: string; eyebrow?: string;
  description?: string; image?: string; backgroundImage?: string;
  images?: HeroImage[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroEditor({ data, onChange }: EditorProps<HeroData>) {
  const u = (patch: Partial<HeroData>) => upd(data, onChange, patch);
  const hasImages = Array.isArray(data.images) && data.images.length > 0;
  return (
    <div className="space-y-3">
      <Field label="Eyebrow" description="Small text above the heading"><TextInput value={data.eyebrow ?? ''} onChange={e => u({ eyebrow: e.currentTarget.value })} /></Field>
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Heading Highlight" description="Second line, accent color"><TextInput value={data.headingHighlight ?? ''} onChange={e => u({ headingHighlight: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Description"><TextArea value={data.description ?? ''} onChange={e => u({ description: e.currentTarget.value })} rows={3} /></Field>
      {hasImages ? (
        <div>
          <p className="text-[11px] font-medium text-ink-secondary mb-2">Hero Images</p>
          <div className="space-y-3">
            {data.images!.map((img, i) => (
              <div key={i} className="p-3 bg-surface-raised rounded-card border border-surface-border space-y-2">
                <p className="text-[11px] text-ink-muted">Image {i + 1}</p>
                <Field label="Image"><ImagePicker value={img.src ?? ''} onChange={v => { const next = [...(data.images ?? [])]; next[i] = { ...next[i], src: v }; u({ images: next }); }} /></Field>
                <Field label="Alt Text"><TextInput value={img.alt ?? ''} onChange={e => { const next = [...(data.images ?? [])]; next[i] = { ...next[i], alt: e.currentTarget.value }; u({ images: next }); }} /></Field>
              </div>
            ))}
            <button onClick={() => u({ images: [...(data.images ?? []), { src: '', alt: '' }] })} className="w-full py-1.5 border border-dashed border-surface-border rounded text-[12px] text-ink-secondary hover:text-accent hover:border-accent/40 transition-all">+ Add Image</button>
          </div>
        </div>
      ) : (
        <Field label="Image"><ImagePicker value={data.image ?? ''} onChange={v => u({ image: v })} /></Field>
      )}
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
      <Field label="Body"><RichTextEditor value={data.body ?? ''} onChange={body => onChange({ ...data, body })} minHeight="240px" /></Field>
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
      <Field label="Body"><RichTextEditor value={data.body ?? ''} onChange={body => u({ body })} minHeight="200px" /></Field>
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
      <Field label="Additional Content"><RichTextEditor value={data.body ?? ''} onChange={body => u({ body })} minHeight="160px" /></Field>
    </div>
  );
}

// ── HTML Editor ────────────────────────────────────────────

interface HtmlData { body?: string }

export function HtmlEditor({ data, onChange }: EditorProps<HtmlData>) {
  return (
    <div className="space-y-3">
      <Field label="HTML Content"><RichTextEditor value={data.body ?? ''} onChange={body => onChange({ body })} minHeight="320px" /></Field>
    </div>
  );
}

// ── Cards Grid Editor (icon + stat variant) ──────────────────

interface CardsGridItem { icon?: string; iconColor?: string; title?: string; stat?: string; description?: string }
interface CardsGridData { eyebrow?: string; heading?: string; subtitle?: string; columns?: number; background?: string; items?: CardsGridItem[] }

export function CardsGridEditor({ data, onChange }: EditorProps<CardsGridData>) {
  const u = (patch: Partial<CardsGridData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Eyebrow"><TextInput value={data.eyebrow ?? ''} onChange={e => u({ eyebrow: e.currentTarget.value })} /></Field>
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Columns"><SelectInput value={String(data.columns ?? 4)} onChange={e => u({ columns: Number(e.currentTarget.value) })} options={[{value:'2',label:'2 columns'},{value:'3',label:'3 columns'},{value:'4',label:'4 columns'}]} /></Field>
      <Field label="Background"><SelectInput value={data.background ?? 'white'} onChange={e => u({ background: e.currentTarget.value })} options={[{value:'white',label:'White'},{value:'cream',label:'Cream'}]} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): CardsGridItem => ({ title: '', description: '' })}
        getItemLabel={item => item.title || 'Untitled Card'}
        addLabel="Add Card"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Title"><TextInput value={item.title ?? ''} onChange={e => upd({ title: e.currentTarget.value })} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Icon" description="Lucide icon name"><TextInput value={item.icon ?? ''} onChange={e => upd({ icon: e.currentTarget.value })} placeholder="BookOpen" /></Field>
              <Field label="Icon Color"><SelectInput value={item.iconColor ?? 'primary'} onChange={e => upd({ iconColor: e.currentTarget.value })} options={[{value:'primary',label:'Primary'},{value:'secondary',label:'Secondary'},{value:'red',label:'Red'},{value:'blue',label:'Blue'},{value:'gold',label:'Gold'},{value:'copper',label:'Copper'}]} /></Field>
            </div>
            <Field label="Stat" description="Large accent value shown above description"><TextInput value={item.stat ?? ''} onChange={e => upd({ stat: e.currentTarget.value })} /></Field>
            <Field label="Description"><TextArea value={item.description ?? ''} onChange={e => upd({ description: e.currentTarget.value })} rows={2} /></Field>
          </div>
        )}
      />
    </div>
  );
}

// ── Programs Grid Editor ─────────────────────────────────────

interface ProgramsGridItem { title?: string; description?: string; image?: string; href?: string; icon?: string; iconColor?: string }
interface ProgramsGridData { eyebrow?: string; heading?: string; subtitle?: string; background?: string; items?: ProgramsGridItem[] }

export function ProgramsGridEditor({ data, onChange }: EditorProps<ProgramsGridData>) {
  const u = (patch: Partial<ProgramsGridData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Eyebrow"><TextInput value={data.eyebrow ?? ''} onChange={e => u({ eyebrow: e.currentTarget.value })} /></Field>
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextArea value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} rows={2} /></Field>
      <Field label="Background"><SelectInput value={data.background ?? 'white'} onChange={e => u({ background: e.currentTarget.value })} options={[{value:'white',label:'White'},{value:'warm',label:'Warm gradient'}]} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): ProgramsGridItem => ({ title: '', description: '', href: '/' })}
        getItemLabel={item => item.title || 'Untitled Program'}
        addLabel="Add Program"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Title"><TextInput value={item.title ?? ''} onChange={e => upd({ title: e.currentTarget.value })} /></Field>
            <Field label="Description"><TextArea value={item.description ?? ''} onChange={e => upd({ description: e.currentTarget.value })} rows={2} /></Field>
            <Field label="Image"><ImagePicker value={item.image ?? ''} onChange={v => upd({ image: v })} /></Field>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Link"><TextInput value={item.href ?? ''} onChange={e => upd({ href: e.currentTarget.value })} mono /></Field>
              <Field label="Icon"><TextInput value={item.icon ?? ''} onChange={e => upd({ icon: e.currentTarget.value })} placeholder="BookOpen" /></Field>
              <Field label="Icon Color"><SelectInput value={item.iconColor ?? 'primary'} onChange={e => upd({ iconColor: e.currentTarget.value })} options={[{value:'primary',label:'Primary'},{value:'secondary',label:'Secondary'},{value:'red',label:'Red'},{value:'gold',label:'Gold'},{value:'copper',label:'Copper'}]} /></Field>
            </div>
          </div>
        )}
      />
    </div>
  );
}

// ── Partners Editor ─────────────────────────────────────────

interface PartnerItem { name?: string; description?: string }
interface PartnersData { icon?: string; heading?: string; subtitle?: string; background?: string; items?: PartnerItem[] }

export function PartnersEditor({ data, onChange }: EditorProps<PartnersData>) {
  const u = (patch: Partial<PartnersData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <Field label="Icon"><TextInput value={data.icon ?? ''} onChange={e => u({ icon: e.currentTarget.value })} placeholder="HeartHandshake" /></Field>
      <Field label="Background"><SelectInput value={data.background ?? 'cream'} onChange={e => u({ background: e.currentTarget.value })} options={[{value:'cream',label:'Cream'},{value:'white',label:'White'}]} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): PartnerItem => ({ name: '', description: '' })}
        getItemLabel={item => item.name || 'Partner'}
        addLabel="Add Partner"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="Name"><TextInput value={item.name ?? ''} onChange={e => upd({ name: e.currentTarget.value })} /></Field>
            <Field label="Description"><TextArea value={item.description ?? ''} onChange={e => upd({ description: e.currentTarget.value })} rows={3} /></Field>
          </div>
        )}
      />
    </div>
  );
}

// ── Feature Highlight Editor ────────────────────────────────

interface FeatureHighlightData { eyebrow?: string; heading?: string; description?: string; items?: string[]; image?: string; imageCaption?: string }

export function FeatureHighlightEditor({ data, onChange }: EditorProps<FeatureHighlightData>) {
  const u = (patch: Partial<FeatureHighlightData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Eyebrow"><TextInput value={data.eyebrow ?? ''} onChange={e => u({ eyebrow: e.currentTarget.value })} /></Field>
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Description"><TextArea value={data.description ?? ''} onChange={e => u({ description: e.currentTarget.value })} rows={3} /></Field>
      <Field label="Image"><ImagePicker value={data.image ?? ''} onChange={v => u({ image: v })} /></Field>
      <Field label="Image Caption"><TextInput value={data.imageCaption ?? ''} onChange={e => u({ imageCaption: e.currentTarget.value })} /></Field>
      <div>
        <p className="text-[11px] font-medium text-ink-secondary mb-2">Bullet Items</p>
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
    </div>
  );
}

// ── Bank Details Editor ─────────────────────────────────────

interface BankDetailsData { heading?: string; beneficiaryName?: string; bankName?: string; accountNumber?: string; ifscCode?: string; note?: string }

export function BankDetailsEditor({ data, onChange }: EditorProps<BankDetailsData>) {
  const u = (patch: Partial<BankDetailsData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Beneficiary Name"><TextInput value={data.beneficiaryName ?? ''} onChange={e => u({ beneficiaryName: e.currentTarget.value })} /></Field>
      <Field label="Bank Name"><TextInput value={data.bankName ?? ''} onChange={e => u({ bankName: e.currentTarget.value })} /></Field>
      <Field label="Account Number"><TextInput value={data.accountNumber ?? ''} onChange={e => u({ accountNumber: e.currentTarget.value })} mono /></Field>
      <Field label="IFSC Code"><TextInput value={data.ifscCode ?? ''} onChange={e => u({ ifscCode: e.currentTarget.value })} mono /></Field>
      <Field label="Note"><TextArea value={data.note ?? ''} onChange={e => u({ note: e.currentTarget.value })} rows={3} /></Field>
    </div>
  );
}

// ── List Editor ─────────────────────────────────────────────

interface ListData { heading?: string; subtitle?: string; items?: string[] }

export function ListEditor({ data, onChange }: EditorProps<ListData>) {
  const u = (patch: Partial<ListData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
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
    </div>
  );
}

// ── Video Editor ────────────────────────────────────────────

interface VideoItem { youtubeId?: string; title?: string; caption?: string }
interface VideoData { eyebrow?: string; heading?: string; subtitle?: string; items?: VideoItem[] }

export function VideoEditor({ data, onChange }: EditorProps<VideoData>) {
  const u = (patch: Partial<VideoData>) => upd(data, onChange, patch);
  return (
    <div className="space-y-3">
      <Field label="Eyebrow"><TextInput value={data.eyebrow ?? ''} onChange={e => u({ eyebrow: e.currentTarget.value })} /></Field>
      <Field label="Heading"><TextInput value={data.heading ?? ''} onChange={e => u({ heading: e.currentTarget.value })} /></Field>
      <Field label="Subtitle"><TextInput value={data.subtitle ?? ''} onChange={e => u({ subtitle: e.currentTarget.value })} /></Field>
      <SortableItemList
        items={data.items ?? []}
        onChange={items => u({ items })}
        createItem={(): VideoItem => ({ youtubeId: '', title: '' })}
        getItemLabel={item => item.title || item.youtubeId || 'Video'}
        addLabel="Add Video"
        renderItem={(item, _, upd) => (
          <div className="space-y-2">
            <Field label="YouTube ID" description="The 11-char ID from the video URL (e.g. dQw4w9WgXcQ)"><TextInput value={item.youtubeId ?? ''} onChange={e => upd({ youtubeId: e.currentTarget.value })} mono /></Field>
            <Field label="Title"><TextInput value={item.title ?? ''} onChange={e => upd({ title: e.currentTarget.value })} /></Field>
            <Field label="Caption"><TextArea value={item.caption ?? ''} onChange={e => upd({ caption: e.currentTarget.value })} rows={2} /></Field>
          </div>
        )}
      />
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
    case 'video': return <VideoEditor data={data as VideoData} onChange={onChange} />;
    case 'testimonials': return <TestimonialsEditor data={data as TestimonialsData} onChange={onChange} />;
    case 'stats': return <StatsEditor data={data as StatsData} onChange={onChange} />;
    case 'cta': return <CtaEditor data={data as CtaData} onChange={onChange} />;
    case 'contact': return <ContactEditor data={data as ContactData} onChange={onChange} />;
    case 'html': return <HtmlEditor data={data as HtmlData} onChange={onChange} />;
    case 'cards-grid': return <CardsGridEditor data={data as CardsGridData} onChange={onChange} />;
    case 'programs-grid': return <ProgramsGridEditor data={data as ProgramsGridData} onChange={onChange} />;
    case 'partners': return <PartnersEditor data={data as PartnersData} onChange={onChange} />;
    case 'feature-highlight': return <FeatureHighlightEditor data={data as FeatureHighlightData} onChange={onChange} />;
    case 'bank-details': return <BankDetailsEditor data={data as BankDetailsData} onChange={onChange} />;
    case 'list': return <ListEditor data={data as ListData} onChange={onChange} />;
    case 'dynamic-slot': return <DynamicSlotEditor data={data as { slot?: string; label?: string; config?: string }} onChange={onChange} />;
    default: return <p className="text-[13px] text-ink-muted">Unknown section type: {type}</p>;
  }
}
