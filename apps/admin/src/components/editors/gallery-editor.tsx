'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, ImagePicker } from '@/components/ui/field';
import type { GalleryImage } from '@website-builder/content-schema';

interface Props {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}

export function GalleryEditor({ images, onChange }: Props) {
  return (
    <SortableItemList
      items={images}
      onChange={(updated) => {
        // Auto-assign id from index
        onChange(updated.map((item, i) => ({ ...item, id: i + 1 })));
      }}
      createItem={(): GalleryImage => ({
        id: images.length + 1,
        src: '',
        alt: '',
        title: '',
      })}
      getItemLabel={(item) => item.title || item.alt || 'Untitled Image'}
      addLabel="Add Image"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Image">
            <ImagePicker value={item.src} onChange={(value) => update({ src: value })} />
          </Field>
          <Field label="Alt Text">
            <TextInput value={item.alt} onChange={(e) => update({ alt: e.currentTarget.value })} />
          </Field>
          <Field label="Title">
            <TextInput value={item.title} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Category">
            <TextInput
              value={item.category ?? ''}
              onChange={(e) => update({ category: e.currentTarget.value || undefined })}
              placeholder="Optional"
            />
          </Field>
        </div>
      )}
    />
  );
}
