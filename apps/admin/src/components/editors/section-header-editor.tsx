'use client';

import { Field, TextInput, TextArea } from '@/components/ui/field';
import type { SectionHeader } from '@website-builder/content-schema';

interface Props {
  header: SectionHeader;
  onChange: (header: SectionHeader) => void;
}

export function SectionHeaderEditor({ header, onChange }: Props) {
  const update = (patch: Partial<SectionHeader>) => {
    onChange({ ...header, ...patch });
  };

  return (
    <div className="space-y-3">
      <Field label="Title">
        <TextInput value={header.title} onChange={(e) => update({ title: e.currentTarget.value })} />
      </Field>
      <Field label="Subtitle">
        <TextInput
          value={header.subtitle ?? ''}
          onChange={(e) => update({ subtitle: e.currentTarget.value || undefined })}
          placeholder="Optional"
        />
      </Field>
      <Field label="Description">
        <TextArea
          value={header.description ?? ''}
          onChange={(e) => update({ description: e.currentTarget.value || undefined })}
          placeholder="Optional"
        />
      </Field>
    </div>
  );
}
