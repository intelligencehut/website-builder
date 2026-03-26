import { Header } from '@/components/header';
import { Globe, Key, Webhook, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <Header
        title="Settings"
        description="Configure your site, deploy hooks, and preferences"
      />
      <div className="p-8 space-y-6 animate-fade-in max-w-3xl">
        {/* Site info */}
        <div className="glass-card rounded-card overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-border flex items-center gap-2">
            <Globe className="w-4 h-4 text-ink-muted" />
            <h2 className="text-heading text-ink">Site Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-caption text-ink-secondary block">Site Name</label>
                <input
                  type="text"
                  defaultValue="SEVAA"
                  className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-caption text-ink-secondary block">Domain</label>
                <input
                  type="text"
                  defaultValue="sevaa.org"
                  className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Deploy hooks */}
        <div className="glass-card rounded-card overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-border flex items-center gap-2">
            <Webhook className="w-4 h-4 text-ink-muted" />
            <h2 className="text-heading text-ink">Deploy Hooks</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">
                Stage Deploy Hook URL
              </label>
              <input
                type="url"
                placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink font-mono placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">
                Production Deploy Hook URL
              </label>
              <input
                type="url"
                placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink font-mono placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="glass-card rounded-card overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-border flex items-center gap-2">
            <Key className="w-4 h-4 text-ink-muted" />
            <h2 className="text-heading text-ink">API Configuration</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-caption text-ink-secondary block">Supabase URL</label>
              <input
                type="text"
                placeholder="https://your-project.supabase.co"
                className="w-full px-3 py-2 bg-surface-raised border border-surface-border rounded-button text-body text-ink font-mono placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>
            <p className="text-[12px] text-ink-muted">
              API keys are configured via environment variables and cannot be changed here.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
