'use client';

import { SortableItemList } from './sortable-item-list';
import { Field, TextInput, TextArea, ImagePicker } from '@/components/ui/field';
import { Plus, Trash2 } from 'lucide-react';
import type { UpcomingEvent } from '@website-builder/content-schema';

interface Props {
  upcoming: UpcomingEvent[];
  activities: string[];
  onChangeUpcoming: (events: UpcomingEvent[]) => void;
  onChangeActivities: (activities: string[]) => void;
}

export function EventsEditor({ upcoming, activities, onChangeUpcoming, onChangeActivities }: Props) {
  const updateActivity = (index: number, value: string) => {
    const next = [...activities];
    next[index] = value;
    onChangeActivities(next);
  };

  const removeActivity = (index: number) => {
    onChangeActivities(activities.filter((_, i) => i !== index));
  };

  const addActivity = () => {
    onChangeActivities([...activities, '']);
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <div>
        <h3 className="text-[13px] font-semibold text-ink mb-3">Upcoming Events</h3>
        <SortableItemList
          items={upcoming}
          onChange={onChangeUpcoming}
          createItem={(): UpcomingEvent => ({
            id: '',
            title: '',
            description: '',
            image: '',
            date: '',
            location: '',
            category: '',
          })}
          getItemLabel={(item) => item.title || 'Untitled Event'}
          addLabel="Add Event"
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
              <Field label="Date">
                <TextInput value={item.date} onChange={(e) => update({ date: e.currentTarget.value })} />
              </Field>
              <Field label="Location">
                <TextInput value={item.location} onChange={(e) => update({ location: e.currentTarget.value })} />
              </Field>
              <Field label="Category">
                <TextInput value={item.category} onChange={(e) => update({ category: e.currentTarget.value })} />
              </Field>
            </div>
          )}
        />
      </div>

      {/* Activities */}
      <div>
        <h3 className="text-[13px] font-semibold text-ink mb-3">Activities</h3>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextInput
                value={activity}
                onChange={(e) => updateActivity(index, e.currentTarget.value)}
                placeholder="Activity name"
                className="flex-1"
              />
              <button
                onClick={() => removeActivity(index)}
                className="p-1.5 text-ink-muted hover:text-red-500 rounded transition-colors flex-shrink-0"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={addActivity}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-surface-border rounded-button text-[13px] text-ink-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}
