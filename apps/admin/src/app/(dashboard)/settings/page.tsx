'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Field, TextInput, TextArea } from '@/components/ui/field';
import { TeamManager } from '@/components/team-manager';
import { FooterEditor, type FooterData } from '@/components/settings/footer-editor';
import { cn } from '@/lib/utils';
import { getSiteMetadata, updateSiteSettings } from '@/lib/actions/pages';
import {
  Globe,
  Key,
  Webhook,
  Search,
  Palette,
  Phone,
  Save,
  Check,
  Loader2,
  Users,
  Shield,
  Layout,
} from 'lucide-react';

type TabId = 'general' | 'seo' | 'contact' | 'footer' | 'deploy' | 'team';

const tabs: { id: TabId; label: string; icon: typeof Globe }[] = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'footer', label: 'Footer', icon: Layout },
  { id: 'deploy', label: 'Deploy', icon: Webhook },
  { id: 'team', label: 'Team', icon: Users },
];

const DEFAULT_CONFIG = {
  siteName: '',
  siteSlug: '',
  domain: '',
  stageDomain: '',
  description: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  ogImage: '',
  email: '',
  emailSecondary: '',
  phone: '',
  phoneSecondary: '',
  address: '',
  stageHookUrl: '',
  prodHookUrl: '',
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [footer, setFooter] = useState<FooterData>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [siteId, setSiteId] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Read active site ID, current user, and load site config
  useEffect(() => {
    const match = document.cookie.match(/wb_site_id=([^;]+)/);
    const activeSiteId = match?.[1] || 'a0000000-0000-0000-0000-000000000001';
    setSiteId(activeSiteId);

    import('@/lib/site-context').then(({ getCurrentUserId }) => {
      getCurrentUserId().then(setCurrentUserId);
    });

    // Load site config from database
    getSiteMetadata(activeSiteId).then(site => {
      if (!site) return;
      const meta = (site.metadata || {}) as Record<string, unknown>;
      const seo = (meta.seo || {}) as Record<string, string>;
      const contact = (meta.contact || {}) as Record<string, string>;
      const deploy = (meta.deploy || {}) as Record<string, string>;

      setConfig({
        siteName: site.name || '',
        siteSlug: site.slug || '',
        domain: site.domain || '',
        stageDomain: (meta.stage_domain as string) || '',
        description: (meta.description as string) || '',
        seoTitle: seo.title || '',
        seoDescription: seo.description || '',
        seoKeywords: seo.keywords || '',
        ogImage: seo.og_image || '',
        email: contact.email || '',
        emailSecondary: contact.email_secondary || '',
        phone: contact.phone || '',
        phoneSecondary: contact.phone_secondary || '',
        address: contact.address || '',
        stageHookUrl: deploy.stage_hook_url || '',
        prodHookUrl: deploy.prod_hook_url || '',
      });
      setFooter((meta.footer as FooterData) || {});
    });
  }, []);

  function updateConfig(key: string, value: string) {
    setConfig(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!siteId) return;
    setSaving(true);
    setError(null);
    try {
      await updateSiteSettings(siteId, {
        name: config.siteName,
        slug: config.siteSlug,
        domain: config.domain,
        metadata: {
          description: config.description,
          stage_domain: config.stageDomain,
          seo: {
            title: config.seoTitle,
            description: config.seoDescription,
            keywords: config.seoKeywords,
            og_image: config.ogImage,
          },
          contact: {
            email: config.email,
            email_secondary: config.emailSecondary,
            phone: config.phone,
            phone_secondary: config.phoneSecondary,
            address: config.address,
          },
          deploy: {
            stage_hook_url: config.stageHookUrl,
            prod_hook_url: config.prodHookUrl,
          },
          footer,
        },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    }
    setSaving(false);
  }

  return (
    <>
      <Header
        title="Settings"
        description="Site configuration, SEO, deploy hooks, and team management"
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Saved' : 'Save Settings'}
          </button>
        }
      />

      <div className="p-8 animate-fade-in">
        <div className="flex gap-8 max-w-5xl">
          {/* Sidebar tabs */}
          <nav className="w-[200px] flex-shrink-0 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-[13px] font-medium transition-all text-left',
                  activeTab === tab.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface-hover'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {error && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-button">
                <p className="text-[12px] text-red-700 flex-1">{error}</p>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 text-[14px]">×</button>
              </div>
            )}
            {activeTab === 'general' && (
              <div className="glass-card rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border">
                  <h2 className="text-heading text-ink">Site Information</h2>
                  <p className="text-[12px] text-ink-muted mt-0.5">Basic site configuration</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Site Name" required>
                      <TextInput value={config.siteName} onChange={(e) => updateConfig('siteName', e.currentTarget.value)} />
                    </Field>
                    <Field label="Site Slug" description="Used in URLs and API">
                      <TextInput value={config.siteSlug} onChange={(e) => updateConfig('siteSlug', e.currentTarget.value)} mono />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Production Domain">
                      <TextInput value={config.domain} onChange={(e) => updateConfig('domain', e.currentTarget.value)} mono />
                    </Field>
                    <Field label="Stage Domain">
                      <TextInput value={config.stageDomain} onChange={(e) => updateConfig('stageDomain', e.currentTarget.value)} mono />
                    </Field>
                  </div>
                  <Field label="Site Description">
                    <TextArea value={config.description} onChange={(e) => updateConfig('description', e.currentTarget.value)} />
                  </Field>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="glass-card rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border">
                  <h2 className="text-heading text-ink">SEO Defaults</h2>
                  <p className="text-[12px] text-ink-muted mt-0.5">Default meta tags for pages without custom SEO settings</p>
                </div>
                <div className="p-6 space-y-4">
                  <Field label="Default Title Tag" description="Shown in browser tabs and search results">
                    <TextInput value={config.seoTitle} onChange={(e) => updateConfig('seoTitle', e.currentTarget.value)} />
                  </Field>
                  <Field label="Default Meta Description" description="Shown in search result snippets (150-160 chars recommended)">
                    <TextArea value={config.seoDescription} onChange={(e) => updateConfig('seoDescription', e.currentTarget.value)} />
                  </Field>
                  <Field label="Keywords" description="Comma-separated keywords for search engines">
                    <TextInput value={config.seoKeywords} onChange={(e) => updateConfig('seoKeywords', e.currentTarget.value)} />
                  </Field>
                  <Field label="Open Graph Image" description="Default social sharing image (1200x630 recommended)">
                    <TextInput value={config.ogImage} onChange={(e) => updateConfig('ogImage', e.currentTarget.value)} mono />
                  </Field>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="glass-card rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border">
                  <h2 className="text-heading text-ink">Contact Information</h2>
                  <p className="text-[12px] text-ink-muted mt-0.5">Displayed across the website</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Primary Email">
                      <TextInput value={config.email} onChange={(e) => updateConfig('email', e.currentTarget.value)} />
                    </Field>
                    <Field label="Secondary Email">
                      <TextInput value={config.emailSecondary} onChange={(e) => updateConfig('emailSecondary', e.currentTarget.value)} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Primary Phone">
                      <TextInput value={config.phone} onChange={(e) => updateConfig('phone', e.currentTarget.value)} />
                    </Field>
                    <Field label="Secondary Phone">
                      <TextInput value={config.phoneSecondary} onChange={(e) => updateConfig('phoneSecondary', e.currentTarget.value)} />
                    </Field>
                  </div>
                  <Field label="Address">
                    <TextArea value={config.address} onChange={(e) => updateConfig('address', e.currentTarget.value)} />
                  </Field>
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <FooterEditor value={footer} onChange={setFooter} />
            )}

            {activeTab === 'deploy' && (
              <>
                <div className="glass-card rounded-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-border">
                    <h2 className="text-heading text-ink">Vercel Deploy Hooks</h2>
                    <p className="text-[12px] text-ink-muted mt-0.5">Webhook URLs that trigger site rebuilds</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <Field label="Stage Deploy Hook URL" description="Triggered when content is deployed to staging">
                      <TextInput value={config.stageHookUrl} onChange={(e) => updateConfig('stageHookUrl', e.currentTarget.value)} placeholder="https://api.vercel.com/v1/integrations/deploy/..." mono />
                    </Field>
                    <Field label="Production Deploy Hook URL" description="Triggered when content is published to production">
                      <TextInput value={config.prodHookUrl} onChange={(e) => updateConfig('prodHookUrl', e.currentTarget.value)} placeholder="https://api.vercel.com/v1/integrations/deploy/..." mono />
                    </Field>
                  </div>
                </div>

                <div className="glass-card rounded-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-border">
                    <h2 className="text-heading text-ink">Environment Variables</h2>
                    <p className="text-[12px] text-ink-muted mt-0.5">Configured via Vercel dashboard</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {[
                        { key: 'SUPABASE_URL', value: 'Configured', set: true },
                        { key: 'SUPABASE_SERVICE_ROLE_KEY', value: '••••••••', set: true },
                        { key: 'NEXT_PUBLIC_SUPABASE_URL', value: 'Configured', set: true },
                        { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: '••••••••', set: true },
                        { key: 'SITE_ID', value: 'Configured', set: true },
                        { key: 'CONTENT_STATUS', value: 'published', set: true },
                      ].map(env => (
                        <div key={env.key} className="flex items-center justify-between px-3 py-2 bg-surface-raised rounded-button border border-surface-border">
                          <span className="text-[12px] font-mono text-ink">{env.key}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] text-ink-muted font-mono">{env.value}</span>
                            <span className={cn(
                              'w-2 h-2 rounded-full',
                              env.set ? 'bg-status-published' : 'bg-status-draft'
                            )} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-ink-muted mt-3">
                      Environment variables are managed in the Vercel dashboard and cannot be changed here.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'team' && siteId && (
              <TeamManager siteId={siteId} currentUserId={currentUserId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
