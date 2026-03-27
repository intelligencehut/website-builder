'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, ImagePicker } from '@/components/ui/field';
import type { Testimonial } from '@website-builder/content-schema';

interface Props {
  items: Testimonial[];
  onChange: (items: Testimonial[]) => void;
}

export function TestimonialsEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={(updated) => {
        // Auto-assign id from index+1
        onChange(updated.map((item, i) => ({ ...item, id: i + 1 })));
      }}
      createItem={(): Testimonial => ({
        id: items.length + 1,
        name: '',
        title: '',
        content: '',
      })}
      getItemLabel={(item) => item.name || 'Untitled Testimonial'}
      addLabel="Add Testimonial"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Name">
            <TextInput value={item.name} onChange={(e) => update({ name: e.currentTarget.value })} />
          </Field>
          <Field label="Title">
            <TextInput
              value={item.title}
              onChange={(e) => update({ title: e.currentTarget.value })}
              placeholder="Role / Organization"
            />
          </Field>
          <Field label="Content">
            <TextArea
              value={item.content}
              onChange={(e) => update({ content: e.currentTarget.value })}
              rows={4}
            />
          </Field>
          <Field label="Image">
            <ImagePicker value={item.image ?? ''} onChange={(value) => update({ image: value || undefined })} />
          </Field>
        </div>
      )}
    />
  );
}
