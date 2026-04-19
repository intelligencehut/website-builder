'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, SelectInput, DocumentPicker } from '@/components/ui/field';
import type { Resource } from '@website-builder/content-schema';

interface Props {
  items: Resource[];
  onChange: (items: Resource[]) => void;
}

const typeOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'document', label: 'Document' },
  { value: 'report', label: 'Report' },
];

export function ResourcesEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): Resource => ({
        id: '',
        title: '',
        description: '',
        type: 'pdf' as const,
        url: '',
      })}
      getItemLabel={(item) => item.title || 'Untitled Resource'}
      addLabel="Add Resource"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="ID">
            <TextInput mono value={item.id} onChange={(e) => update({ id: e.currentTarget.value })} />
          </Field>
          <Field label="Title">
            <TextInput value={item.title} onChange={(e) => update({ title: e.currentTarget.value })} />
          </Field>
          <Field label="Description">
            <TextArea value={item.description} onChange={(e) => update({ description: e.currentTarget.value })} />
          </Field>
          <Field label="Type">
            <SelectInput
              options={typeOptions}
              value={item.type}
              onChange={(e) => update({ type: e.currentTarget.value as Resource['type'] })}
            />
          </Field>
          <Field label="URL">
            <DocumentPicker value={item.url} onChange={(value) => update({ url: value })} />
          </Field>
          <Field label="Size">
            <TextInput
              value={item.size ?? ''}
              onChange={(e) => update({ size: e.currentTarget.value || undefined })}
              placeholder="Optional, e.g. 2.4 MB"
            />
          </Field>
          <Field label="Date">
            <TextInput
              value={item.date ?? ''}
              onChange={(e) => update({ date: e.currentTarget.value || undefined })}
              placeholder="Optional"
            />
          </Field>
        </div>
      )}
    />
  );
}
