'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea } from '@/components/ui/field';
import type { ImpactArea } from '@website-builder/content-schema';

interface Props {
  items: ImpactArea[];
  onChange: (items: ImpactArea[]) => void;
}

export function ImpactEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): ImpactArea => ({ icon: '', label: '', description: '', color: '' })}
      getItemLabel={(item) => item.label || 'Untitled'}
      addLabel="Add Impact Area"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Icon">
            <TextInput
              value={item.icon}
              onChange={(e) => update({ icon: e.currentTarget.value })}
              placeholder="Lucide icon name e.g. Users"
            />
          </Field>
          <Field label="Label">
            <TextInput value={item.label} onChange={(e) => update({ label: e.currentTarget.value })} />
          </Field>
          <Field label="Description">
            <TextArea value={item.description} onChange={(e) => update({ description: e.currentTarget.value })} />
          </Field>
          <Field label="Color">
            <TextInput
              value={item.color}
              onChange={(e) => update({ color: e.currentTarget.value })}
              placeholder="Tailwind class e.g. bg-blue-500"
            />
          </Field>
        </div>
      )}
    />
  );
}
