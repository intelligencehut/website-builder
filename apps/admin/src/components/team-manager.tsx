'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Users,
  Trash2,
  Plus,
  Loader2,
  Check,
  Crown,
  Eye,
  Pencil,
  X,
  AlertCircle,
  Mail,
} from 'lucide-react';
import {
  getSiteMembers,
  addSiteMemberByEmail,
  updateSiteMemberRole,
  removeSiteMember,
} from '@/lib/site-context';

interface TeamManagerProps {
  siteId: string;
  currentUserId: string | null;
}

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  is_super_admin: boolean;
}

interface MemberRow {
  id: string;
  role: string;
  created_at: string;
  user: UserProfile;
}

const ROLE_CONFIG: Record<string, { label: string; icon: typeof Crown; badgeClass: string }> = {
  owner: {
    label: 'Owner',
    icon: Crown,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  editor: {
    label: 'Editor',
    icon: Pencil,
    badgeClass: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  viewer: {
    label: 'Viewer',
    icon: Eye,
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

export function TeamManager({ siteId, currentUserId }: TeamManagerProps) {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'owner' | 'editor' | 'viewer'>('editor');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSiteMembers(siteId);
      setMembers(data as unknown as MemberRow[]);
    } catch {
      setError('Failed to load team members');
    }
    setLoading(false);
  }, [siteId]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  async function handleInvite() {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setError(null);
    setSuccess(null);
    try {
      await addSiteMemberByEmail(siteId, inviteEmail.trim().toLowerCase(), inviteRole);
      setSuccess(`Added ${inviteEmail.trim()} as ${inviteRole}`);
      setInviteEmail('');
      setShowInvite(false);
      await loadMembers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member');
    }
    setInviting(false);
  }

  async function handleRoleChange(userId: string, newRole: 'owner' | 'editor' | 'viewer') {
    setError(null);
    try {
      await updateSiteMemberRole(siteId, userId, newRole);
      await loadMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
    }
  }

  async function handleRemove(userId: string) {
    setRemovingId(userId);
    setError(null);
    try {
      await removeSiteMember(siteId, userId);
      await loadMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member');
    }
    setRemovingId(null);
  }

  return (
    <div className="glass-card rounded-card overflow-hidden">
      <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between">
        <div>
          <h2 className="text-heading text-ink">Team Members</h2>
          <p className="text-[12px] text-ink-muted mt-0.5">
            People who can access this site in the admin panel
          </p>
        </div>
        <button
          onClick={() => { setShowInvite(!showInvite); setError(null); }}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-button text-[13px] font-medium transition-colors',
            showInvite
              ? 'bg-accent/10 text-accent border border-accent/30'
              : 'border border-surface-border text-ink hover:bg-surface-hover'
          )}
        >
          {showInvite ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {showInvite ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2 animate-scale-in">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-700 flex-1">{error}</p>
          <button onClick={() => setError(null)} className="p-0.5 text-red-400 hover:text-red-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2 animate-scale-in">
          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <p className="text-[12px] text-emerald-700">{success}</p>
        </div>
      )}

      {/* Invite form */}
      {showInvite && (
        <div className="px-6 py-4 bg-surface-raised border-b border-surface-border animate-scale-in">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="text-[11px] font-medium text-ink-secondary block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                  placeholder="user@example.com"
                  className="w-full pl-9 pr-4 py-2 bg-surface-card border border-surface-border rounded-button text-[13px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>
            </div>
            <div className="w-[130px]">
              <label className="text-[11px] font-medium text-ink-secondary block mb-1.5">Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as 'owner' | 'editor' | 'viewer')}
                className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded-button text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button
              onClick={handleInvite}
              disabled={inviting || !inviteEmail.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors disabled:opacity-50"
            >
              {inviting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Add
            </button>
          </div>
        </div>
      )}

      {/* Members list */}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-5 h-5 text-ink-muted animate-spin mx-auto mb-2" />
          <p className="text-[12px] text-ink-muted">Loading team members...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="py-12 text-center">
          <Users className="w-8 h-8 text-ink-muted mx-auto mb-3" />
          <p className="text-heading text-ink">No members yet</p>
          <p className="text-[12px] text-ink-muted mt-1">Add team members to give them access to this site</p>
        </div>
      ) : (
        <div className="divide-y divide-surface-border">
          {members.map((member) => {
            const user = member.user;
            if (!user) return null;

            const roleConfig = ROLE_CONFIG[member.role] ?? ROLE_CONFIG.viewer!;
            const isCurrentUser = user.id === currentUserId;
            const isRemoving = removingId === user.id;

            return (
              <div
                key={member.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-surface-hover/50 transition-colors"
              >
                {/* Avatar */}
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.email}
                    className="w-9 h-9 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[13px] font-semibold text-accent">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Name & email */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-ink truncate">
                      {user.name || user.email.split('@')[0]}
                    </p>
                    {isCurrentUser && (
                      <span className="text-[10px] text-ink-muted bg-surface-raised px-1.5 py-0.5 rounded border border-surface-border flex-shrink-0">
                        You
                      </span>
                    )}
                    {user.is_super_admin && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex-shrink-0">
                        Super Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-ink-muted truncate">{user.email}</p>
                </div>

                {/* Role selector */}
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as 'owner' | 'editor' | 'viewer')}
                  disabled={isCurrentUser}
                  className={cn(
                    'px-2 py-1 rounded-badge text-[11px] font-medium border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-default disabled:opacity-70',
                    roleConfig.badgeClass
                  )}
                >
                  <option value="owner">Owner</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>

                {/* Remove */}
                {!isCurrentUser && (
                  <button
                    onClick={() => handleRemove(user.id)}
                    disabled={isRemoving}
                    className="p-1.5 rounded-[6px] text-ink-muted hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Remove member"
                  >
                    {isRemoving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
