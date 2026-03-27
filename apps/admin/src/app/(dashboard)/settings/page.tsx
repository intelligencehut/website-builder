'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Field, TextInput, TextArea } from '@/components/ui/field';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';

type TabId = 'general' | 'seo' | 'contact' | 'deploy' | 'team';

const tabs: { id: TabId; label: string; icon: typeof Globe }[] = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'deploy', label: 'Deploy', icon: Webhook },
  { id: 'team', label: 'Team', icon: Users },
];

const DEFAULT_CONFIG = {
  siteName: 'SEVAA',
  siteSlug: 'sevaa',
  domain: 'sevaa.org',
  stageDomain: 'stage-sevaa.vercel.app',
  description: 'Society for Envisioning Vivekananda in Awareness and Action',
  seoTitle: 'SEVAA — Society for Envisioning Vivekananda in Awareness and Action',
  seoDescription: 'Non-government philanthropic organisation inspired by the ideals of Thakur-Maa-Swamiji, working among the underprivileged section of society.',
  seoKeywords: 'SEVAA, NGO, education, healthcare, livelihood, Purulia, West Bengal',
  ogImage: '/images/banner-1.jpg',
  email: 'infosevaa@gmail.com',
  emailSecondary: 'sevaa.narendrapur@gmail.com',
  phone: '+91 98271 93272',
  phoneSecondary: '+91 33 2477 2545',
  address: '131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal.',
  stageHookUrl: '',
  prodHookUrl: '',
};

const TEAM_MEMBERS = [
  { email: 'amit@example.com', name: 'Amit Das', role: 'owner' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateConfig(key: string, value: string) {
    setConfig(prev => ({ ...prev, [key]: value }));
  }

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

            {activeTab === 'team' && (
              <div className="glass-card rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
                  <div>
                    <h2 className="text-heading text-ink">Team Members</h2>
                    <p className="text-[12px] text-ink-muted mt-0.5">People who can access this site in the admin panel</p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-surface-border rounded-button text-[13px] font-medium text-ink hover:bg-surface-hover transition-colors">
                    <Users className="w-3.5 h-3.5" />
                    Invite Member
                  </button>
                </div>
                <div className="divide-y divide-surface-border">
                  {TEAM_MEMBERS.map(member => (
                    <div key={member.email} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[13px] font-semibold text-accent">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-ink">{member.name}</p>
                        <p className="text-[12px] text-ink-muted">{member.email}</p>
                      </div>
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border',
                        member.role === 'owner' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      )}>
                        <Shield className="w-3 h-3" />
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
