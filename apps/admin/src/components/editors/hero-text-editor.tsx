'use client';

import { Field, TextInput, TextArea } from '@/components/ui/field';

export interface HeroTextData {
  heading: string;
  headingHighlight: string;
  subtitle: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaTarget: string;
  secondaryCtaLabel: string;
  secondaryCtaTarget: string;
}

interface Props {
  data: HeroTextData;
  onChange: (data: HeroTextData) => void;
}

export function HeroTextEditor({ data, onChange }: Props) {
  function update(patch: Partial<HeroTextData>) {
    onChange({ ...data, ...patch });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Heading (Line 1)" description="Main title text">
          <TextInput
            value={data.heading}
            onChange={(e) => update({ heading: e.currentTarget.value })}
            placeholder="Society for Envisioning Vivekananda"
          />
        </Field>
        <Field label="Heading Highlight (Line 2)" description="Orange colored text">
          <TextInput
            value={data.headingHighlight}
            onChange={(e) => update({ headingHighlight: e.currentTarget.value })}
            placeholder="in Awareness and Action"
          />
        </Field>
      </div>
      <Field label="Subtitle">
        <TextInput
          value={data.subtitle}
          onChange={(e) => update({ subtitle: e.currentTarget.value })}
          placeholder="We're a non government philanthropic organisation."
        />
      </Field>
      <Field label="Description">
        <TextArea
          value={data.description}
          onChange={(e) => update({ description: e.currentTarget.value })}
          rows={4}
          placeholder="Inspired by the ideals of..."
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary Button Label">
          <TextInput
            value={data.primaryCtaLabel}
            onChange={(e) => update({ primaryCtaLabel: e.currentTarget.value })}
            placeholder="Explore Our Impact"
          />
        </Field>
        <Field label="Primary Button Target" description="Section ID to scroll to">
          <TextInput
            value={data.primaryCtaTarget}
            onChange={(e) => update({ primaryCtaTarget: e.currentTarget.value })}
            placeholder="impact"
            mono
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Secondary Button Label">
          <TextInput
            value={data.secondaryCtaLabel}
            onChange={(e) => update({ secondaryCtaLabel: e.currentTarget.value })}
            placeholder="Our Programs"
          />
        </Field>
        <Field label="Secondary Button Target">
          <TextInput
            value={data.secondaryCtaTarget}
            onChange={(e) => update({ secondaryCtaTarget: e.currentTarget.value })}
            placeholder="programs"
            mono
          />
        </Field>
      </div>
    </div>
  );
}
