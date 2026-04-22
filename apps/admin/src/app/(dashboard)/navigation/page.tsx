'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { NavigationEditor } from '@/components/editors/navigation-editor';
import { SortableItemList } from '@/components/editors/sortable-item-list';
import { Field, TextInput } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { Save, Check, Loader2, Menu, Link2, Share2 } from 'lucide-react';

type TabId = 'header' | 'footer' | 'social';

const tabs: { id: TabId; label: string; icon: typeof Menu }[] = [
  { id: 'header', label: 'Header Navigation', icon: Menu },
  { id: 'footer', label: 'Footer Links', icon: Link2 },
  { id: 'social', label: 'Social Links', icon: Share2 },
];

// Default nav data from SEVAA constants
const DEFAULT_HEADER_NAV = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'about-us', label: 'About Us', href: '/mission-vision',
    dropdown: [
      { id: 'mission-vision', label: 'Our Mission & Vision', href: '/mission-vision' },
      { id: 'our-genesis', label: 'Our Genesis', href: '/our-genesis' },
      { id: 'governance', label: 'Governance', href: '/governance' },
    ],
  },
  {
    id: 'activities', label: 'Our Activities', href: '/formation-of-vivek-pally',
    dropdown: [
      { id: 'evolution-of-sevaa', label: 'Evolution of Sevaa', href: '/formation-of-vivek-pally' },
      { id: 'saparambera-project', label: 'Saparambera Project', href: '/projects/saparambera' },
      { id: 'ukhra-project', label: 'Ukhra Project', href: '/projects/ukhra' },
      { id: 'support-activities', label: 'Support Activities', href: '/support-activities' },
    ],
  },
  {
    id: 'news-publications', label: 'News & Publications', href: '/news',
    dropdown: [
      { id: 'sevaa-news', label: 'Sevaa News', href: '/news' },
      { id: 'photo-gallery', label: 'Photo Gallery', href: '/gallery/photos' },
      { id: 'events', label: 'Events', href: '/events' },
      { id: 'publications', label: 'Publications', href: '/publications' },
    ],
  },
  {
    id: 'archives', label: 'Archives', href: '/archives',
    dropdown: [
      { id: 'project-photos', label: 'Project Photos', href: '/archives/photos' },
      { id: 'general-archives', label: 'General Archives', href: '/archives/general' },
      { id: 'videos', label: 'Videos', href: '/archives/videos' },
    ],
  },
  {
    id: 'join-us', label: 'Join Us', href: '/join-us',
    dropdown: [
      { id: 'csr', label: 'CSR Opportunities', href: '/get-involved/csr-opportunities' },
      { id: 'assoc-member', label: 'Become Associate Member', href: '/get-involved/become-assoc-member' },
      { id: 'friend', label: 'Become a Friend', href: '/get-involved/become-friend' },
      { id: 'sponsor-child', label: 'Sponsor a Child', href: '/get-involved/sponsor-child' },
    ],
  },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
];

const DEFAULT_FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Annual Reports', href: '/annual-reports' },
  { label: 'Legal & Financial', href: '/legal-financial' },
];

const DEFAULT_SOCIAL_LINKS = [
  { icon: 'Facebook', href: 'https://www.facebook.com/sevaa2023', label: 'Facebook' },
  { icon: 'Twitter', href: 'https://twitter.com/sevaa2023', label: 'Twitter' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/sevaa2023', label: 'LinkedIn' },
  { icon: 'Instagram', href: 'https://www.instagram.com/sevaa2023', label: 'Instagram' },
];

export default function NavigationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('header');
  const [headerNav, setHeaderNav] = useState(DEFAULT_HEADER_NAV);
  const [footerLinks, setFooterLinks] = useState(DEFAULT_FOOTER_LINKS);
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SOCIAL_LINKS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Header
        title="Navigation"
        description="Manage header menus, footer links, and social media"
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {saved ? 'Saved' : 'Save Navigation'}
          </button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-surface-card border border-surface-border rounded-button p-1 w-full sm:w-fit overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[13px] font-medium transition-all whitespace-nowrap flex-shrink-0',
                activeTab === tab.id
                  ? 'bg-sidebar text-ink-inverse shadow-sm'
                  : 'text-ink-secondary hover:text-ink hover:bg-surface-hover'
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header Navigation */}
        {activeTab === 'header' && (
          <div className="glass-card rounded-card overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-surface-border">
              <h2 className="text-heading text-ink">Header Menu</h2>
              <p className="text-[12px] text-ink-muted mt-0.5">
                {headerNav.length} top-level items · Supports up to 3 levels of nesting
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <NavigationEditor items={headerNav} onChange={setHeaderNav} maxDepth={3} />
            </div>
          </div>
        )}

        {/* Footer Links */}
        {activeTab === 'footer' && (
          <div className="glass-card rounded-card overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-surface-border">
              <h2 className="text-heading text-ink">Footer Quick Links</h2>
              <p className="text-[12px] text-ink-muted mt-0.5">
                Links displayed in the website footer
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <SortableItemList
                items={footerLinks}
                onChange={setFooterLinks}
                createItem={() => ({ label: '', href: '/' })}
                getItemLabel={(item) => item.label || 'Untitled Link'}
                addLabel="Add Footer Link"
                collapsible={false}
                renderItem={(item, _index, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Label">
                      <TextInput value={item.label} onChange={(e) => update({ label: e.currentTarget.value })} placeholder="Link text" />
                    </Field>
                    <Field label="URL">
                      <TextInput value={item.href} onChange={(e) => update({ href: e.currentTarget.value })} placeholder="/path" mono />
                    </Field>
                  </div>
                )}
              />
            </div>
          </div>
        )}

        {/* Social Links */}
        {activeTab === 'social' && (
          <div className="glass-card rounded-card overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-surface-border">
              <h2 className="text-heading text-ink">Social Media Links</h2>
              <p className="text-[12px] text-ink-muted mt-0.5">
                Displayed in the header and footer of the website
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <SortableItemList
                items={socialLinks}
                onChange={setSocialLinks}
                createItem={() => ({ icon: '', href: '', label: '' })}
                getItemLabel={(item) => item.label || 'Untitled'}
                addLabel="Add Social Link"
                renderItem={(item, _index, update) => (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Field label="Platform">
                      <TextInput value={item.label} onChange={(e) => update({ label: e.currentTarget.value })} placeholder="Facebook" />
                    </Field>
                    <Field label="Icon Name">
                      <TextInput value={item.icon} onChange={(e) => update({ icon: e.currentTarget.value })} placeholder="Facebook" />
                    </Field>
                    <Field label="URL">
                      <TextInput value={item.href} onChange={(e) => update({ href: e.currentTarget.value })} placeholder="https://..." mono />
                    </Field>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
