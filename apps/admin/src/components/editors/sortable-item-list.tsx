'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronUp, Copy } from 'lucide-react';

interface SortableItemListProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
  getItemLabel?: (item: T, index: number) => string;
  addLabel?: string;
  maxItems?: number;
  minItems?: number;
  collapsible?: boolean;
}

export function SortableItemList<T>({
  items,
  onChange,
  renderItem,
  createItem,
  getItemLabel,
  addLabel = 'Add Item',
  maxItems,
  minItems = 0,
  collapsible = true,
}: SortableItemListProps<T>) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(items.length <= 3 ? items.map((_, i) => i) : [0])
  );

  const toggleItem = useCallback((index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const updateItem = useCallback(
    (index: number, patch: Partial<T>) => {
      const next = [...items];
      next[index] = { ...next[index]!, ...patch };
      onChange(next);
    },
    [items, onChange]
  );

  const removeItem = useCallback(
    (index: number) => {
      if (items.length <= minItems) return;
      const next = items.filter((_, i) => i !== index);
      onChange(next);
      setExpandedItems((prev) => {
        const updated = new Set<number>();
        prev.forEach((i) => {
          if (i < index) updated.add(i);
          else if (i > index) updated.add(i - 1);
        });
        return updated;
      });
    },
    [items, onChange, minItems]
  );

  const duplicateItem = useCallback(
    (index: number) => {
      if (maxItems && items.length >= maxItems) return;
      const next = [...items];
      next.splice(index + 1, 0, { ...items[index]! });
      onChange(next);
      setExpandedItems((prev) => {
        const updated = new Set<number>();
        prev.forEach((i) => {
          if (i <= index) updated.add(i);
          else updated.add(i + 1);
        });
        updated.add(index + 1);
        return updated;
      });
    },
    [items, onChange, maxItems]
  );

  const moveItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= items.length) return;
      const next = [...items];
      [next[index], next[targetIndex]] = [next[targetIndex]!, next[index]!];
      onChange(next);
      setExpandedItems((prev) => {
        const updated = new Set<number>();
        prev.forEach((i) => {
          if (i === index) updated.add(targetIndex);
          else if (i === targetIndex) updated.add(index);
          else updated.add(i);
        });
        return updated;
      });
    },
    [items, onChange]
  );

  const addItem = useCallback(() => {
    if (maxItems && items.length >= maxItems) return;
    const newItem = createItem();
    onChange([...items, newItem]);
    setExpandedItems((prev) => new Set([...prev, items.length]));
  }, [items, onChange, createItem, maxItems]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isExpanded = !collapsible || expandedItems.has(index);
        const label = getItemLabel?.(item, index) || `Item ${index + 1}`;

        return (
          <div
            key={index}
            className={cn(
              'bg-surface-card border border-surface-border rounded-button overflow-hidden transition-all duration-150',
              isExpanded && 'ring-1 ring-accent/10'
            )}
          >
            {/* Item header */}
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-surface-hover/50 transition-colors">
              <GripVertical className="w-3.5 h-3.5 text-ink-muted cursor-grab flex-shrink-0" />

              <span className="text-[11px] font-mono text-ink-muted bg-surface-raised px-1.5 py-0.5 rounded border border-surface-border flex-shrink-0">
                {index + 1}
              </span>

              {collapsible ? (
                <button
                  onClick={() => toggleItem(index)}
                  className="flex-1 text-left text-[13px] font-medium text-ink truncate hover:text-accent transition-colors"
                >
                  {label}
                </button>
              ) : (
                <span className="flex-1 text-[13px] font-medium text-ink truncate">
                  {label}
                </span>
              )}

              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors"
                  title="Move up"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors"
                  title="Move down"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => duplicateItem(index)}
                  disabled={!!maxItems && items.length >= maxItems}
                  className="p-1 text-ink-muted hover:text-ink disabled:opacity-30 rounded transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length <= minItems}
                  className="p-1 text-ink-muted hover:text-red-500 disabled:opacity-30 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                {collapsible && (
                  <button
                    onClick={() => toggleItem(index)}
                    className="p-1 text-ink-muted hover:text-ink rounded transition-colors ml-1"
                  >
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', isExpanded && 'rotate-180')} />
                  </button>
                )}
              </div>
            </div>

            {/* Item content */}
            {isExpanded && (
              <div className="px-3 pb-3 pt-1 border-t border-surface-border bg-surface-raised/30 animate-scale-in">
                {renderItem(item, index, (patch) => updateItem(index, patch))}
              </div>
            )}
          </div>
        );
      })}

      {/* Add button */}
      {(!maxItems || items.length < maxItems) && (
        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-surface-border rounded-button text-[13px] text-ink-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
