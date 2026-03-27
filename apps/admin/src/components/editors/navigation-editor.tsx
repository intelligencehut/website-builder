'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Field, TextInput } from '@/components/ui/field';
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Plus,
  Trash2,
  ChevronUp,
} from 'lucide-react';

// Supports up to 3 levels of nesting matching the SEVAA nav structure
interface NavItem {
  id: string;
  label: string;
  href: string;
  dropdown?: NavItem[];
}

interface NavigationEditorProps {
  items: NavItem[];
  onChange: (items: NavItem[]) => void;
  maxDepth?: number;
}

export function NavigationEditor({ items, onChange, maxDepth = 3 }: NavigationEditorProps) {
  return (
    <div className="space-y-1">
      <NavItemList items={items} onChange={onChange} depth={0} maxDepth={maxDepth} />
      <button
        onClick={() => onChange([...items, { id: `nav-${Date.now()}`, label: '', href: '/' }])}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-surface-border rounded-button text-[13px] text-ink-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Menu Item
      </button>
    </div>
  );
}

function NavItemList({
  items,
  onChange,
  depth,
  maxDepth,
}: {
  items: NavItem[];
  onChange: (items: NavItem[]) => void;
  depth: number;
  maxDepth: number;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateItem = useCallback((index: number, patch: Partial<NavItem>) => {
    const next = [...items];
    next[index] = { ...next[index]!, ...patch };
    onChange(next);
  }, [items, onChange]);

  const removeItem = useCallback((index: number) => {
    onChange(items.filter((_, i) => i !== index));
  }, [items, onChange]);

  const moveItem = useCallback((index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  }, [items, onChange]);

  const addChild = useCallback((index: number) => {
    const next = [...items];
    const item = next[index]!;
    next[index] = {
      ...item,
      dropdown: [...(item.dropdown || []), { id: `nav-${Date.now()}`, label: '', href: '/' }],
    };
    onChange(next);
    setExpanded(prev => new Set([...prev, item.id]));
  }, [items, onChange]);

  return (
    <div className={cn('space-y-1', depth > 0 && 'ml-6 pl-3 border-l-2 border-surface-border')}>
      {items.map((item, index) => {
        const isOpen = expanded.has(item.id);
        const hasChildren = item.dropdown && item.dropdown.length > 0;
        const canNest = depth < maxDepth - 1;

        return (
          <div key={item.id}>
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 bg-surface-card border border-surface-border rounded-button group',
              hasChildren && isOpen && 'rounded-b-none border-b-0'
            )}>
              <GripVertical className="w-3.5 h-3.5 text-ink-muted cursor-grab flex-shrink-0" />

              {/* Depth indicator */}
              {depth > 0 && (
                <span className="text-[10px] font-mono text-ink-muted bg-surface-raised px-1 py-0.5 rounded border border-surface-border flex-shrink-0">
                  L{depth + 1}
                </span>
              )}

              {/* Expand toggle */}
              {hasChildren ? (
                <button onClick={() => toggle(item.id)} className="p-0.5 text-ink-muted hover:text-ink rounded transition-colors">
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ) : (
                <div className="w-4.5" />
              )}

              {/* Label & href */}
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateItem(index, { label: e.target.value })}
                placeholder="Label"
                className="flex-1 min-w-0 px-2 py-0.5 bg-transparent border-0 text-[13px] font-medium text-ink placeholder:text-ink-muted focus:outline-none focus:bg-surface-raised rounded transition-colors"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => updateItem(index, { href: e.target.value })}
                placeholder="/path"
                className="w-[140px] px-2 py-0.5 bg-transparent border-0 text-[12px] font-mono text-ink-secondary placeholder:text-ink-muted focus:outline-none focus:bg-surface-raised rounded transition-colors"
              />

              {/* Actions */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors">
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors">
                  <ChevronDown className="w-3 h-3" />
                </button>
                {canNest && (
                  <button onClick={() => addChild(index)} className="p-1 text-ink-muted hover:text-accent rounded transition-colors" title="Add sub-item">
                    <Plus className="w-3 h-3" />
                  </button>
                )}
                <button onClick={() => removeItem(index)} className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            {hasChildren && isOpen && (
              <div className="bg-surface-card border border-surface-border border-t-0 rounded-b-button px-2 py-2">
                <NavItemList
                  items={item.dropdown!}
                  onChange={(children) => updateItem(index, { dropdown: children })}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
