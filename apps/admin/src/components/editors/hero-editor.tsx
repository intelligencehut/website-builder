'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, ImagePicker } from '@/components/ui/field';
import type { CarouselSlide } from '@website-builder/content-schema';

interface Props {
  slides: CarouselSlide[];
  onChange: (slides: CarouselSlide[]) => void;
}

export function HeroEditor({ slides, onChange }: Props) {
  return (
    <SortableItemList
      items={slides}
      onChange={onChange}
      createItem={(): CarouselSlide => ({ src: '', alt: '' })}
      getItemLabel={(item) => item.title || item.alt || 'Untitled Slide'}
      addLabel="Add Slide"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Image">
            <ImagePicker value={item.src} onChange={(value) => update({ src: value })} />
          </Field>
          <Field label="Alt Text">
            <TextInput value={item.alt} onChange={(e) => update({ alt: e.currentTarget.value })} />
          </Field>
          <Field label="Title">
            <TextInput value={item.title ?? ''} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Description">
            <TextArea value={item.description ?? ''} onChange={(e) => update({ description: e.currentTarget.value })} />
          </Field>
        </div>
      )}
    />
  );
}
