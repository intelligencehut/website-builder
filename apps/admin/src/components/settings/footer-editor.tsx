'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Field, TextInput, TextArea } from '@/components/ui/field';

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSocial {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
  href: string;
}

export interface FooterPlatform {
  name: string;
  subtitle: string;
  href: string;
  dotColor?: string;
}

export interface FooterData {
  description?: string;
  tagline?: string;
  infoLines?: { label: string; value: string }[];
  quickLinks?: FooterLink[];
  programs?: FooterLink[];
  legalLinks?: FooterLink[];
  contact?: {
    address?: string;
    email?: string;
    emailNote?: string;
    phone?: string;
    phoneNote?: string;
  };
  socialLinks?: FooterSocial[];
  newsletter?: {
    heading?: string;
    description?: string;
    placeholder?: string;
    ctaLabel?: string;
  };
  platforms?: FooterPlatform[];
  donationBanner?: {
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  bottom?: {
    copyrightName?: string;
    taxId?: string;
    ngoStatusLabel?: string;
    initiativeNote?: string;
    initiativeOrgName?: string;
    initiativeUrl?: string;
  };
}

interface FooterEditorProps {
  value: FooterData;
  onChange: (next: FooterData) => void;
}

export function FooterEditor({ value, onChange }: FooterEditorProps) {
  function patch<K extends keyof FooterData>(key: K, v: FooterData[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="space-y-6">
      <Card title="Brand & Description" subtitle="Shown at the top of the footer">
        <Field label="Description">
          <TextArea
            value={value.description ?? ''}
            onChange={(e) => patch('description', e.currentTarget.value)}
            placeholder="Short paragraph about the organization"
          />
        </Field>
        <Field label="Tagline" description="Optional — e.g. a motto in another language">
          <TextInput
            value={value.tagline ?? ''}
            onChange={(e) => patch('tagline', e.currentTarget.value)}
          />
        </Field>
        <Repeater
          label="Info lines"
          description="Key/value rows like 'Capacity: 30 children' (ukhra, tmsvv)"
          items={value.infoLines ?? []}
          onChange={(items) => patch('infoLines', items)}
          defaultItem={{ label: '', value: '' }}
          render={(item, set) => (
            <>
              <TextInput
                value={item.label}
                onChange={(e) => set({ ...item, label: e.currentTarget.value })}
                placeholder="Label"
              />
              <TextInput
                value={item.value}
                onChange={(e) => set({ ...item, value: e.currentTarget.value })}
                placeholder="Value"
              />
            </>
          )}
        />
      </Card>

      <Card title="Contact Block">
        <Field label="Address" description="Multi-line text; newlines render as line breaks">
          <TextArea
            value={value.contact?.address ?? ''}
            onChange={(e) =>
              patch('contact', { ...value.contact, address: e.currentTarget.value })
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <TextInput
              value={value.contact?.email ?? ''}
              onChange={(e) =>
                patch('contact', { ...value.contact, email: e.currentTarget.value })
              }
            />
          </Field>
          <Field label="Email note" description="Shown below email (e.g. '(Placeholder)')">
            <TextInput
              value={value.contact?.emailNote ?? ''}
              onChange={(e) =>
                patch('contact', { ...value.contact, emailNote: e.currentTarget.value })
              }
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone">
            <TextInput
              value={value.contact?.phone ?? ''}
              onChange={(e) =>
                patch('contact', { ...value.contact, phone: e.currentTarget.value })
              }
            />
          </Field>
          <Field label="Phone note">
            <TextInput
              value={value.contact?.phoneNote ?? ''}
              onChange={(e) =>
                patch('contact', { ...value.contact, phoneNote: e.currentTarget.value })
              }
            />
          </Field>
        </div>
      </Card>

      <Card title="Link Columns">
        <LinkRepeater
          label="Quick Links"
          items={value.quickLinks ?? []}
          onChange={(items) => patch('quickLinks', items)}
        />
        <LinkRepeater
          label="Programs"
          description="Used on ukhra site; leave empty otherwise"
          items={value.programs ?? []}
          onChange={(items) => patch('programs', items)}
        />
        <LinkRepeater
          label="Legal Links"
          items={value.legalLinks ?? []}
          onChange={(items) => patch('legalLinks', items)}
        />
      </Card>

      <Card
        title="Social & Newsletter"
        subtitle="Used on sevaa.net; leave fields blank on sites without them"
      >
        <Repeater
          label="Social links"
          items={value.socialLinks ?? []}
          onChange={(items) => patch('socialLinks', items)}
          defaultItem={{ platform: 'facebook', href: '' } as FooterSocial}
          render={(item, set) => (
            <>
              <select
                value={item.platform}
                onChange={(e) =>
                  set({ ...item, platform: e.currentTarget.value as FooterSocial['platform'] })
                }
                className="w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink"
              >
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter/X</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
              <TextInput
                value={item.href}
                onChange={(e) => set({ ...item, href: e.currentTarget.value })}
                placeholder="https://..."
                mono
              />
            </>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Newsletter heading">
            <TextInput
              value={value.newsletter?.heading ?? ''}
              onChange={(e) =>
                patch('newsletter', {
                  ...value.newsletter,
                  heading: e.currentTarget.value,
                })
              }
            />
          </Field>
          <Field label="Newsletter CTA label">
            <TextInput
              value={value.newsletter?.ctaLabel ?? ''}
              onChange={(e) =>
                patch('newsletter', {
                  ...value.newsletter,
                  ctaLabel: e.currentTarget.value,
                })
              }
            />
          </Field>
        </div>
        <Field label="Newsletter description">
          <TextInput
            value={value.newsletter?.description ?? ''}
            onChange={(e) =>
              patch('newsletter', {
                ...value.newsletter,
                description: e.currentTarget.value,
              })
            }
          />
        </Field>
        <Field label="Newsletter input placeholder">
          <TextInput
            value={value.newsletter?.placeholder ?? ''}
            onChange={(e) =>
              patch('newsletter', {
                ...value.newsletter,
                placeholder: e.currentTarget.value,
              })
            }
          />
        </Field>
      </Card>

      <Card
        title="Our Platforms"
        subtitle="sevaa.net's platforms grid; leave empty on other sites"
      >
        <Repeater
          label="Platforms"
          items={value.platforms ?? []}
          onChange={(items) => patch('platforms', items)}
          defaultItem={{ name: '', subtitle: '', href: '' }}
          render={(item, set) => (
            <>
              <TextInput
                value={item.name}
                onChange={(e) => set({ ...item, name: e.currentTarget.value })}
                placeholder="Name"
              />
              <TextInput
                value={item.subtitle}
                onChange={(e) => set({ ...item, subtitle: e.currentTarget.value })}
                placeholder="Subtitle"
              />
              <TextInput
                value={item.href}
                onChange={(e) => set({ ...item, href: e.currentTarget.value })}
                placeholder="https://..."
                mono
              />
              <select
                value={item.dotColor ?? 'green'}
                onChange={(e) => set({ ...item, dotColor: e.currentTarget.value })}
                className="w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink"
              >
                <option value="green">Green dot</option>
                <option value="orange">Orange dot</option>
                <option value="blue">Blue dot</option>
                <option value="red">Red dot</option>
                <option value="yellow">Yellow dot</option>
              </select>
            </>
          )}
        />
      </Card>

      <Card title="Donation Banner" subtitle="Shown between columns and bottom bar">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Banner title">
            <TextInput
              value={value.donationBanner?.title ?? ''}
              onChange={(e) =>
                patch('donationBanner', {
                  ...value.donationBanner,
                  title: e.currentTarget.value,
                })
              }
            />
          </Field>
          <Field label="CTA label">
            <TextInput
              value={value.donationBanner?.ctaLabel ?? ''}
              onChange={(e) =>
                patch('donationBanner', {
                  ...value.donationBanner,
                  ctaLabel: e.currentTarget.value,
                })
              }
            />
          </Field>
        </div>
        <Field label="Banner description">
          <TextInput
            value={value.donationBanner?.description ?? ''}
            onChange={(e) =>
              patch('donationBanner', {
                ...value.donationBanner,
                description: e.currentTarget.value,
              })
            }
          />
        </Field>
        <Field label="CTA link">
          <TextInput
            value={value.donationBanner?.ctaHref ?? ''}
            onChange={(e) =>
              patch('donationBanner', {
                ...value.donationBanner,
                ctaHref: e.currentTarget.value,
              })
            }
            mono
          />
        </Field>
      </Card>

      <Card title="Bottom Bar" subtitle="Copyright, tax ID, initiative attribution">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Copyright name" description="Shown as '© YEAR <name>. All rights reserved.'">
            <TextInput
              value={value.bottom?.copyrightName ?? ''}
              onChange={(e) =>
                patch('bottom', { ...value.bottom, copyrightName: e.currentTarget.value })
              }
            />
          </Field>
          <Field label="Tax ID" description="Optional (sevaa.net)">
            <TextInput
              value={value.bottom?.taxId ?? ''}
              onChange={(e) =>
                patch('bottom', { ...value.bottom, taxId: e.currentTarget.value })
              }
            />
          </Field>
        </div>
        <Field label="NGO status label" description="e.g. 'Registered NGO' (sevaa.net)">
          <TextInput
            value={value.bottom?.ngoStatusLabel ?? ''}
            onChange={(e) =>
              patch('bottom', { ...value.bottom, ngoStatusLabel: e.currentTarget.value })
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Initiative note" description="e.g. 'A joint initiative of'">
            <TextInput
              value={value.bottom?.initiativeNote ?? ''}
              onChange={(e) =>
                patch('bottom', { ...value.bottom, initiativeNote: e.currentTarget.value })
              }
            />
          </Field>
          <Field label="Initiative org URL">
            <TextInput
              value={value.bottom?.initiativeUrl ?? ''}
              onChange={(e) =>
                patch('bottom', { ...value.bottom, initiativeUrl: e.currentTarget.value })
              }
              mono
            />
          </Field>
        </div>
        <Field label="Initiative org name">
          <TextInput
            value={value.bottom?.initiativeOrgName ?? ''}
            onChange={(e) =>
              patch('bottom', { ...value.bottom, initiativeOrgName: e.currentTarget.value })
            }
          />
        </Field>
      </Card>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-card overflow-hidden">
      <div className="px-6 py-4 border-b border-surface-border">
        <h2 className="text-heading text-ink">{title}</h2>
        {subtitle && <p className="text-[12px] text-ink-muted mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function LinkRepeater({
  label,
  description,
  items,
  onChange,
}: {
  label: string;
  description?: string;
  items: FooterLink[];
  onChange: (items: FooterLink[]) => void;
}) {
  return (
    <Repeater
      label={label}
      description={description}
      items={items}
      onChange={onChange}
      defaultItem={{ title: '', href: '' }}
      render={(item, set) => (
        <>
          <TextInput
            value={item.title}
            onChange={(e) => set({ ...item, title: e.currentTarget.value })}
            placeholder="Title"
          />
          <TextInput
            value={item.href}
            onChange={(e) => set({ ...item, href: e.currentTarget.value })}
            placeholder="/path or https://..."
            mono
          />
        </>
      )}
    />
  );
}

function Repeater<T>({
  label,
  description,
  items,
  onChange,
  defaultItem,
  render,
}: {
  label: string;
  description?: string;
  items: T[];
  onChange: (items: T[]) => void;
  defaultItem: T;
  render: (item: T, set: (next: T) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium text-ink-secondary block">{label}</label>
      {description && <p className="text-[11px] text-ink-muted">{description}</p>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2 bg-surface-raised rounded-[4px] border border-surface-border"
          >
            <div className="flex-1 grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
              {render(item, (next) => {
                const copy = items.slice();
                copy[i] = next;
                onChange(copy);
              })}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="p-1 text-ink-muted hover:text-red-500"
              aria-label={`Remove ${label} row`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, defaultItem])}
          className="flex items-center gap-1 text-[12px] text-accent hover:text-accent-hover"
        >
          <Plus className="w-3.5 h-3.5" /> Add row
        </button>
      </div>
    </div>
  );
}
