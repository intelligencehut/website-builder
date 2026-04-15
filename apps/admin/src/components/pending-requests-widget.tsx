'use client';

import { useState } from 'react';
import { UserPlus, Check, X, Loader2 } from 'lucide-react';
import { approveRequest, denyRequest } from '@/lib/actions/access-requests';

interface PendingRequest {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
  user: { id: string; email: string; name: string | null; avatar_url: string | null } | null;
  site: { id: string; name: string; slug: string; domain: string } | null;
}

interface PendingRequestsWidgetProps {
  requests: PendingRequest[];
}

export function PendingRequestsWidget({ requests: initialRequests }: PendingRequestsWidgetProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [processing, setProcessing] = useState<string | null>(null);

  if (requests.length === 0) return null;

  async function handleApprove(requestId: string) {
    setProcessing(requestId);
    const result = await approveRequest(requestId, 'editor');
    if (result.success) {
      setRequests(prev => prev.filter(r => r.id !== requestId));
    }
    setProcessing(null);
  }

  async function handleDeny(requestId: string) {
    setProcessing(requestId);
    const result = await denyRequest(requestId);
    if (result.success) {
      setRequests(prev => prev.filter(r => r.id !== requestId));
    }
    setProcessing(null);
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  return (
    <div className="bg-surface-card border border-surface-border rounded-panel shadow-card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-surface-border">
        <div className="w-8 h-8 bg-amber-50 rounded-card flex items-center justify-center">
          <UserPlus className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h2 className="text-heading text-ink">Access Requests</h2>
          <p className="text-[11px] text-ink-muted">{requests.length} pending</p>
        </div>
      </div>

      <div className="divide-y divide-surface-border">
        {requests.map(req => (
          <div key={req.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-surface-raised rounded-full flex items-center justify-center flex-shrink-0">
                {req.user?.avatar_url ? (
                  <img src={req.user.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-[11px] font-semibold text-ink-secondary">
                    {(req.user?.name || req.user?.email || '?').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink truncate">
                  {req.user?.name || req.user?.email}
                </p>
                <p className="text-[11px] text-ink-muted truncate">
                  {req.site?.name} &middot; {timeAgo(req.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {processing === req.id ? (
                <Loader2 className="w-4 h-4 text-ink-muted animate-spin" />
              ) : (
                <>
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-button text-[11px] font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button
                    onClick={() => handleDeny(req.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-surface-raised text-ink-secondary border border-surface-border rounded-button text-[11px] font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    <X className="w-3 h-3" /> Deny
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
