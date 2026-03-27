'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, ImagePicker } from '@/components/ui/field';
import type { BlessingLetter } from '@website-builder/content-schema';

interface Props {
  items: BlessingLetter[];
  onChange: (items: BlessingLetter[]) => void;
}

export function BlessingLettersEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): BlessingLetter => ({ title: '', imageSrc: '', imageAlt: '' })}
      getItemLabel={(item) => item.title || 'Untitled Letter'}
      addLabel="Add Blessing Letter"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Title">
            <TextInput value={item.title} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Image">
            <ImagePicker value={item.imageSrc} onChange={(value) => update({ imageSrc: value })} />
          </Field>
          <Field label="Image Alt Text">
            <TextInput value={item.imageAlt} onChange={(e) => update({ imageAlt: e.currentTarget.value })} />
          </Field>
        </div>
      )}
    />
  );
}
