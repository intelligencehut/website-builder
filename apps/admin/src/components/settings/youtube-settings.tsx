'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Youtube, CheckCircle2, AlertCircle, Loader2, Unlink, Link as LinkIcon } from 'lucide-react';
import { isYoutubeConnected } from '@/lib/actions/videos';

interface Props {
  siteId: string;
}

interface ConnectionState {
  connected: boolean;
  channelTitle: string | null;
  channelId: string | null;
  connectedAt: string | null;
}

export function YoutubeSettings({ siteId }: Props) {
  const router = useRouter();
  const [state, setState] = useState<ConnectionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Pick up ?connected=1 / ?error=... from the OAuth callback. When we see
    // `connected=1`, strip the query params and trigger a server refresh —
    // Next.js's dev-mode RSC can stall on a server action fired mid-navigation,
    // so we'd rather re-render cleanly.
    const params = new URLSearchParams(window.location.search);
    const justConnected = params.get('connected') === '1';
    const googleError = params.get('error');

    if (justConnected) setConnected(true);
    if (googleError) setError(decodeURIComponent(googleError));

    if (params.has('connected') || params.has('error')) {
      const clean = new URL(window.location.href);
      clean.searchParams.delete('connected');
      clean.searchParams.delete('error');
      window.history.replaceState({}, '', clean.toString());
      if (justConnected) router.refresh();
    }

    let done = false;
    isYoutubeConnected(siteId)
      .then((s) => { if (!done) setState(s); })
      .catch((e) => {
        if (!done) setError(e instanceof Error ? e.message : 'Could not check connection');
      })
      .finally(() => { if (!done) setLoading(false); });

    // Safety: if the server action hangs (e.g. dev-mode RSC stall), stop the
    // spinner after 8s so the UI isn't perpetually stuck.
    const bailout = setTimeout(() => { setLoading(false); }, 8000);
    return () => { done = true; clearTimeout(bailout); };
  }, [siteId, router]);

  async function handleDisconnect() {
    if (!confirm('Disconnect this YouTube channel? Videos already on YouTube will stay; you just won\'t be able to upload new ones until you reconnect.')) return;
    setDisconnecting(true);
    setError(null);
    try {
      const res = await fetch(`/api/youtube/auth/disconnect?siteId=${siteId}`, { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Disconnect failed (${res.status})`);
      }
      setState({ connected: false, channelTitle: null, channelId: null, connectedAt: null });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Disconnect failed');
    }
    setDisconnecting(false);
  }

  return (
    <div className="glass-card rounded-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-600" />
          <h2 className="text-heading text-ink">YouTube Channel</h2>
        </div>
        <p className="text-[12px] text-ink-muted mt-0.5">
          Connect a YouTube channel so editors can upload videos from the Media library without leaving the admin panel.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {connected && (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-button">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <p className="text-[12px] text-green-800">Channel connected successfully.</p>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-button">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-[12px] text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-ink-muted">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[13px]">Checking connection…</span>
          </div>
        ) : state?.connected ? (
          <div className="flex items-center justify-between p-4 bg-surface-raised rounded-card border border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-ink">
                  {state.channelTitle || 'Connected channel'}
                </p>
                <p className="text-[11px] text-ink-muted font-mono">{state.channelId ?? '—'}</p>
                {state.connectedAt && (
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    Connected {new Date(state.connectedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              disabled={disconnecting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-600 border border-red-200 rounded-button hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {disconnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlink className="w-3.5 h-3.5" />}
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[13px] text-ink-secondary">
              No channel connected. Click below to sign in with Google and authorize uploads to your YouTube channel. Only owners and editors of this site can connect a channel.
            </p>
            <a
              href={`/api/youtube/auth/start?siteId=${siteId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-button text-[13px] font-medium hover:bg-red-700 transition-colors"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Connect YouTube Channel
            </a>
          </div>
        )}

        <div className="pt-3 border-t border-surface-border space-y-1">
          <p className="text-[11px] font-medium text-ink-secondary uppercase tracking-wide">Privacy & verification</p>
          <p className="text-[12px] text-ink-muted leading-relaxed">
            New uploads default to <span className="font-medium text-ink-secondary">unlisted</span> — anyone with the link (e.g. an embed on your website) can watch, but they won&apos;t appear in YouTube search. If this Google Cloud project hasn&apos;t been verified by Google for the <code className="text-[11px] bg-surface-raised px-1 rounded">youtube.upload</code> scope, YouTube may force uploads to remain private until verification completes.
          </p>
        </div>
      </div>
    </div>
  );
}
