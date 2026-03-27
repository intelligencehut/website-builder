'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, ImagePicker } from '@/components/ui/field';
import type { NewsItem } from '@website-builder/content-schema';

interface Props {
  items: NewsItem[];
  onChange: (items: NewsItem[]) => void;
}

export function NewsEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): NewsItem => ({
        id: '',
        title: '',
        excerpt: '',
        image: '',
        date: '',
        category: '',
      })}
      getItemLabel={(item) => item.title || 'Untitled News'}
      addLabel="Add News Item"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="ID">
            <TextInput mono value={item.id} onChange={(e) => update({ id: e.currentTarget.value })} />
          </Field>
          <Field label="Title">
            <TextInput value={item.title} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Excerpt">
            <TextArea
              value={item.excerpt}
              onChange={(e) => update({ excerpt: e.currentTarget.value })}
              rows={2}
            />
          </Field>
          <Field label="Image">
            <ImagePicker value={item.image} onChange={(value) => update({ image: value })} />
          </Field>
          <Field label="Date">
            <TextInput value={item.date} onChange={(e) => update({ date: e.currentTarget.value })} />
          </Field>
          <Field label="Category">
            <TextInput value={item.category} onChange={(e) => update({ category: e.currentTarget.value })} />
          </Field>
        </div>
      )}
    />
  );
}
