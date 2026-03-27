'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { PageRecord } from '@/lib/actions/pages';
import {
  FileText,
  Home,
  Newspaper,
  FolderKanban,
  Calendar,
  GalleryHorizontalEnd,
  BookOpen,
  Users,
  Layout,
  Filter,
  Plus,
  Search,
  ArrowUpRight,
} from 'lucide-react';

type PageType = 'all' | 'home' | 'static' | 'news' | 'project' | 'event' | 'gallery' | 'publication' | 'team';

const pageTypeConfig: Record<string, { label: string; icon: typeof FileText; color: string; bg: string }> = {
  home: { label: 'Home', icon: Home, color: 'text-blue-600', bg: 'bg-blue-50' },
  static: { label: 'Static', icon: Layout, color: 'text-slate-600', bg: 'bg-slate-50' },
  news: { label: 'News', icon: Newspaper, color: 'text-violet-600', bg: 'bg-violet-50' },
  project: { label: 'Project', icon: FolderKanban, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  event: { label: 'Event', icon: Calendar, color: 'text-rose-600', bg: 'bg-rose-50' },
  gallery: { label: 'Gallery', icon: GalleryHorizontalEnd, color: 'text-amber-600', bg: 'bg-amber-50' },
  publication: { label: 'Publication', icon: BookOpen, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  team: { label: 'Team', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
};

interface PagesClientProps {
  pages: PageRecord[];
}

export function PagesClient({ pages }: PagesClientProps) {
  const [filter, setFilter] = useState<PageType>('all');
  const [search, setSearch] = useState('');

  const filteredPages = pages
    .filter((p) => filter === 'all' || p.page_type === filter)
    .filter(
      (p) =>
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

  const typeFilters: { key: PageType; label: string }[] = [
    { key: 'all', label: 'All' },
    ...Object.entries(pageTypeConfig).map(([key, cfg]) => ({
      key: key as PageType,
      label: cfg.label,
    })),
  ];

  return (
    <>
      <Header
        title="Pages"
        description={`${pages.length} pages across your website`}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-sidebar text-ink-inverse rounded-button text-[13px] font-medium hover:bg-sidebar-hover transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New Page
          </button>
        }
      />

      <div className="p-8 space-y-6 animate-fade-in">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages by title or slug..."
              className="w-full pl-10 pr-4 py-2 bg-surface-card border border-surface-border rounded-button text-body text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-surface-card border border-surface-border rounded-button p-1">
            <Filter className="w-3.5 h-3.5 text-ink-muted ml-2" />
            {typeFilters.map((tf) => (
              <button
                key={tf.key}
                onClick={() => setFilter(tf.key)}
                className={cn(
                  'px-2.5 py-1 rounded-[4px] text-[12px] font-medium transition-all',
                  filter === tf.key
                    ? 'bg-sidebar text-ink-inverse shadow-sm'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface-hover'
                )}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pages table */}
        <div className="glass-card rounded-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left text-overline text-ink-muted px-6 py-3 uppercase">Page</th>
                <th className="text-left text-overline text-ink-muted px-4 py-3 uppercase">Type</th>
                <th className="text-left text-overline text-ink-muted px-4 py-3 uppercase">Status</th>
                <th className="text-left text-overline text-ink-muted px-4 py-3 uppercase">Last Updated</th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredPages.map((page) => {
                const config = pageTypeConfig[page.page_type];
                const status = (page.latest_status || 'draft') as 'draft' | 'staged' | 'published';
                return (
                  <tr key={page.id} className="hover:bg-surface-hover transition-colors group">
                    <td className="px-6 py-3.5">
                      <div>
                        <p className="text-[13px] font-medium text-ink group-hover:text-accent transition-colors">
                          {page.title}
                        </p>
                        <p className="text-[12px] text-ink-muted font-mono mt-0.5">{page.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {config && (
                        <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium', config.bg, config.color)}>
                          <config.icon className="w-3 h-3" />
                          {config.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[12px] text-ink-secondary">
                        {new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/pages/${page.id}/edit`}
                        className="p-1.5 rounded-[6px] text-ink-muted hover:text-accent hover:bg-accent/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredPages.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="w-8 h-8 text-ink-muted mx-auto mb-3" />
              <p className="text-heading text-ink">No pages found</p>
              <p className="text-body text-ink-secondary mt-1">
                {search ? 'Try adjusting your search or filter' : 'No pages in the database yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: 'draft' | 'staged' | 'published' }) {
  const styles = {
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    staged: 'bg-amber-50 text-amber-700 border-amber-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px] font-medium border', styles[status])}>
      <span className={cn('w-1.5 h-1.5 rounded-full', status === 'draft' ? 'bg-slate-400' : status === 'staged' ? 'bg-amber-500 animate-pulse-soft' : 'bg-emerald-500')} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
