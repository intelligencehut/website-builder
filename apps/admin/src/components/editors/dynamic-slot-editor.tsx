'use client';

import { Field, TextInput, TextArea } from '@/components/ui/field';

interface DynamicSlotData {
  slot?: string;
  label?: string;
  config?: string; // JSON string for optional config
}

interface DynamicSlotEditorProps {
  data: DynamicSlotData;
  onChange: (data: DynamicSlotData) => void;
}

export function DynamicSlotEditor({ data, onChange }: DynamicSlotEditorProps) {
  const u = (patch: Partial<DynamicSlotData>) => onChange({ ...data, ...patch });

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-3 bg-sky-50 border border-sky-200 rounded-lg">
        <div className="w-5 h-5 bg-sky-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-3 h-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[12px] text-sky-700 leading-relaxed">
          This section renders live data from the site&apos;s own database. The content is not editable here &mdash; only the slot name, display label, and optional configuration.
        </p>
      </div>

      <Field label="Slot Name" description="Identifier for the dynamic content (e.g. latest-posts, doctors, specialties)">
        <TextInput
          value={data.slot ?? ''}
          onChange={e => u({ slot: e.currentTarget.value })}
          placeholder="e.g. latest-posts"
        />
      </Field>

      <Field label="Display Label" description="Shown in the admin section list">
        <TextInput
          value={data.label ?? ''}
          onChange={e => u({ label: e.currentTarget.value })}
          placeholder="e.g. Latest Blog Posts"
        />
      </Field>

      <Field label="Configuration (JSON)" description="Optional parameters passed to the slot component">
        <TextArea
          value={data.config ?? ''}
          onChange={e => u({ config: e.currentTarget.value })}
          rows={3}
          placeholder='e.g. {"limit": 3}'
        />
      </Field>
    </div>
  );
}
