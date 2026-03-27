'use client';

import { Field, TextInput, TextArea, ImagePicker } from '@/components/ui/field';
import { SortableItemList } from './sortable-item-list';

export interface MissionData {
  heading: string;
  subtitle: string;
  description: string;
  commitments: string[];
  image: string;
}

interface Props {
  data: MissionData;
  onChange: (data: MissionData) => void;
}

export function MissionEditor({ data, onChange }: Props) {
  function update(patch: Partial<MissionData>) {
    onChange({ ...data, ...patch });
  }

  return (
    <div className="space-y-4">
      <Field label="Heading">
        <TextInput
          value={data.heading}
          onChange={(e) => update({ heading: e.currentTarget.value })}
          placeholder="Our Mission"
        />
      </Field>
      <Field label="Subtitle">
        <TextInput
          value={data.subtitle}
          onChange={(e) => update({ subtitle: e.currentTarget.value })}
          placeholder="Empowering communities through service and compassion"
        />
      </Field>
      <Field label="Description">
        <TextArea
          value={data.description}
          onChange={(e) => update({ description: e.currentTarget.value })}
          rows={4}
        />
      </Field>
      <Field label="Image">
        <ImagePicker value={data.image} onChange={(v) => update({ image: v })} />
      </Field>
      <div>
        <p className="text-[11px] font-medium text-ink-secondary mb-2">Commitments List</p>
        <div className="space-y-2">
          {data.commitments.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-ink-muted w-4 text-center">{i + 1}</span>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const next = [...data.commitments];
                  next[i] = e.target.value;
                  update({ commitments: next });
                }}
                className="flex-1 px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[13px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
              <button
                onClick={() => update({ commitments: data.commitments.filter((_, j) => j !== i) })}
                className="p-1 text-ink-muted hover:text-red-500 rounded transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" /></svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => update({ commitments: [...data.commitments, ''] })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-surface-border rounded-[4px] text-[13px] text-ink-secondary hover:text-accent hover:border-accent/40 transition-all"
          >
            + Add Commitment
          </button>
        </div>
      </div>
    </div>
  );
}
