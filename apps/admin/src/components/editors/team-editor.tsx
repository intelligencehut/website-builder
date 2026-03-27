'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, SelectInput, ImagePicker } from '@/components/ui/field';
import type { TeamMember } from '@website-builder/content-schema';

interface Props {
  members: TeamMember[];
  onChange: (members: TeamMember[]) => void;
}

const categoryOptions = [
  { value: 'executive', label: 'Executive' },
  { value: 'general', label: 'General' },
];

export function TeamEditor({ members, onChange }: Props) {
  return (
    <SortableItemList
      items={members}
      onChange={onChange}
      createItem={(): TeamMember => ({
        name: '',
        position: '',
        category: 'general' as const,
      })}
      getItemLabel={(item) => item.name || 'Untitled Member'}
      addLabel="Add Member"
      renderItem={(item, index, update) => (
        <div className="space-y-3">
          <Field label="Name">
            <TextInput value={item.name} onChange={(e) => update({ name: e.currentTarget.value })} />
          </Field>
          <Field label="Position">
            <TextInput value={item.position} onChange={(e) => update({ position: e.currentTarget.value })} />
          </Field>
          <Field label="Category">
            <SelectInput
              options={categoryOptions}
              value={item.category}
              onChange={(e) => update({ category: e.currentTarget.value as TeamMember['category'] })}
            />
          </Field>
          <Field label="Photo">
            <ImagePicker value={item.photo ?? ''} onChange={(value) => update({ photo: value || undefined })} />
          </Field>
          <Field label="Bio">
            <TextArea
              value={item.bio ?? ''}
              onChange={(e) => update({ bio: e.currentTarget.value || undefined })}
              placeholder="Optional"
            />
          </Field>
        </div>
      )}
    />
  );
}
