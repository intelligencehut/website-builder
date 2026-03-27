'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, NumberInput } from '@/components/ui/field';
import type { StatItem } from '@website-builder/content-schema';

interface Props {
  items: StatItem[];
  onChange: (items: StatItem[]) => void;
}

export function StatsEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): StatItem => ({ value: 0, label: '' })}
      getItemLabel={(item) => item.label || 'Untitled Stat'}
      addLabel="Add Stat"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Value">
            <NumberInput
              value={item.value}
              onChange={(e) => update({ value: Number(e.currentTarget.value) })}
            />
          </Field>
          <Field label="Label">
            <TextInput value={item.label} onChange={(e) => update({ label: e.currentTarget.value })} />
          </Field>
          <Field label="Suffix">
            <TextInput
              value={item.suffix ?? ''}
              onChange={(e) => update({ suffix: e.currentTarget.value || undefined })}
              placeholder="Optional, e.g. +"
            />
          </Field>
          <Field label="Prefix">
            <TextInput
              value={item.prefix ?? ''}
              onChange={(e) => update({ prefix: e.currentTarget.value || undefined })}
              placeholder="Optional, e.g. $"
            />
          </Field>
        </div>
      )}
    />
  );
}
