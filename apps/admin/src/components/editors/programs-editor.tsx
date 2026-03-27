'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, SelectInput, NumberInput, ImagePicker } from '@/components/ui/field';
import type { Program } from '@website-builder/content-schema';

interface Props {
  items: Program[];
  onChange: (items: Program[]) => void;
}

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Planned', label: 'Planned' },
  { value: 'Development', label: 'Development' },
  { value: 'Annual', label: 'Annual' },
];

const categoryOptions = [
  { value: 'Education', label: 'Education' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Livelihood', label: 'Livelihood' },
  { value: 'Environment', label: 'Environment' },
];

export function ProgramsEditor({ items, onChange }: Props) {
  return (
    <SortableItemList
      items={items}
      onChange={onChange}
      createItem={(): Program => ({
        id: '',
        title: '',
        description: '',
        image: '',
        location: '',
        status: 'Active' as const,
        category: 'Education' as const,
      })}
      getItemLabel={(item) => item.title || 'Untitled Program'}
      addLabel="Add Program"
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
          <Field label="Image">
            <ImagePicker value={item.image} onChange={(value) => update({ image: value })} />
          </Field>
          <Field label="Location">
            <TextInput value={item.location} onChange={(e) => update({ location: e.currentTarget.value })} />
          </Field>
          <Field label="Status">
            <SelectInput
              options={statusOptions}
              value={item.status}
              onChange={(e) => update({ status: e.currentTarget.value as Program['status'] })}
            />
          </Field>
          <Field label="Category">
            <SelectInput
              options={categoryOptions}
              value={item.category}
              onChange={(e) => update({ category: e.currentTarget.value as Program['category'] })}
            />
          </Field>
          <Field label="Beneficiaries">
            <NumberInput
              value={item.beneficiaries ?? ''}
              onChange={(e) => update({ beneficiaries: e.currentTarget.value ? Number(e.currentTarget.value) : undefined })}
              placeholder="Optional"
            />
          </Field>
          <Field label="Year">
            <TextInput
              value={item.year ?? ''}
              onChange={(e) => update({ year: e.currentTarget.value || undefined })}
              placeholder="Optional"
            />
          </Field>
        </div>
      )}
    />
  );
}
