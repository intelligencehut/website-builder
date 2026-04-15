'use client';

import { useState } from 'react';
import { Layers, LogOut, Shield, Clock, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Site {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

interface PendingRequest {
  site_id: string;
  status: string;
  created_at: string;
}

interface AccessRequestScreenProps {
  user: { email?: string; name?: string };
  sites: Site[];
  pendingRequests: PendingRequest[];
  onRequestAccess: (siteId: string, message?: string) => Promise<{ success: boolean; error?: string }>;
}

export function AccessRequestScreen({ user, sites, pendingRequests, onRequestAccess }: AccessRequestScreenProps) {
  const [requesting, setRequesting] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const pendingSiteIds = new Set(pendingRequests.filter(r => r.status === 'pending').map(r => r.site_id));

  async function handleRequest(siteId: string) {
    setRequesting(siteId);
    setError(null);
    const result = await onRequestAccess(siteId);
    if (result.success) {
      setSubmitted(prev => new Set(prev).add(siteId));
    } else {
      setError(result.error || 'Failed to submit request');
    }
    setRequesting(null);
  }

  async function handleSignOut() {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="w-full max-w-[560px] animate-fade-in">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-sidebar rounded-card flex items-center justify-center">
            <Layers className="w-5 h-5 text-accent" />
          </div>
          <span className="font-display text-display-sm text-ink">Website Builder</span>
        </div>

        {/* Welcome */}
        <div className="bg-surface-card rounded-panel border border-surface-border shadow-panel overflow-hidden">
          <div className="px-8 py-6 border-b border-surface-border">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-ink-muted" />
              <h1 className="text-heading text-ink">Access Required</h1>
            </div>
            <p className="text-body text-ink-secondary">
              Welcome, <strong>{user.name || user.email}</strong>. You don&apos;t have access to any websites yet.
              Request access below and an administrator will review your request.
            </p>
          </div>

          {/* Site list */}
          <div className="px-8 py-6">
            {sites.length === 0 ? (
              <p className="text-body text-ink-muted text-center py-4">
                No websites are available. Contact an administrator.
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-caption text-ink-secondary uppercase tracking-wider font-medium mb-4">
                  Available Websites
                </p>
                {sites.map(site => {
                  const isPending = pendingSiteIds.has(site.id) || submitted.has(site.id);
                  return (
                    <div
                      key={site.id}
                      className="flex items-center justify-between p-4 bg-surface-raised rounded-card border border-surface-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-accent/10 rounded-[6px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[12px] font-semibold text-accent">
                            {site.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-ink">{site.name}</p>
                          <p className="text-[11px] text-ink-muted">{site.domain || site.slug}</p>
                        </div>
                      </div>

                      {isPending ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-button text-[11px] font-medium border border-amber-200">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRequest(site.id)}
                          disabled={requesting === site.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-sidebar text-ink-inverse rounded-button text-[11px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-50"
                        >
                          {requesting === site.id ? (
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Send className="w-3 h-3" />
                          )}
                          Request Access
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {error && (
              <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-badge text-caption text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-surface-raised/50 border-t border-surface-border flex items-center justify-between">
            <p className="text-[11px] text-ink-muted">
              Signed in as {user.email}
            </p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 text-ink-secondary border border-surface-border rounded-button text-[11px] font-medium hover:bg-surface-hover transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
