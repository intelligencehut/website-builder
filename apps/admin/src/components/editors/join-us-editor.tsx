'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea } from '@/components/ui/field';
import type { DonationOption } from '@website-builder/content-schema';

interface Props {
  options: DonationOption[];
  onChange: (options: DonationOption[]) => void;
}

export function JoinUsEditor({ options, onChange }: Props) {
  return (
    <SortableItemList
      items={options}
      onChange={onChange}
      createItem={(): DonationOption => ({ id: '', icon: '', title: '', description: '' })}
      getItemLabel={(item) => item.title || 'Untitled Option'}
      addLabel="Add Option"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="ID">
            <TextInput mono value={item.id} onChange={(e) => update({ id: e.currentTarget.value })} />
          </Field>
          <Field label="Icon">
            <TextInput
              value={item.icon}
              onChange={(e) => update({ icon: e.currentTarget.value })}
              placeholder="Lucide icon name"
            />
          </Field>
          <Field label="Title">
            <TextInput value={item.title} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Description">
            <TextArea value={item.description} onChange={(e) => update({ description: e.currentTarget.value })} />
          </Field>
        </div>
      )}
    />
  );
}
