'use client';

import { Field, TextInput, TextArea, ImagePicker, DocumentPicker } from '@/components/ui/field';
import type { NewsArticle } from '@website-builder/content-schema';

interface Props {
  article: NewsArticle;
  onChange: (article: NewsArticle) => void;
}

export function NewsArticleEditor({ article, onChange }: Props) {
  const update = (patch: Partial<NewsArticle>) => {
    onChange({ ...article, ...patch });
  };

  return (
    <div className="space-y-3">
      <Field label="ID">
        <TextInput mono value={article.id} onChange={(e) => update({ id: e.currentTarget.value })} />
      </Field>
      <Field label="Title">
        <TextInput value={article.title} onChange={(e) => update({ title: e.currentTarget.value })} />
      </Field>
      <Field label="Excerpt">
        <TextArea
          value={article.excerpt}
          onChange={(e) => update({ excerpt: e.currentTarget.value })}
          rows={2}
        />
      </Field>
      <Field label="Content" description="HTML content">
        <TextArea
          value={article.content}
          onChange={(e) => update({ content: e.currentTarget.value })}
          rows={10}
        />
      </Field>
      <Field label="Image">
        <ImagePicker value={article.image} onChange={(value) => update({ image: value })} />
      </Field>
      <Field label="Date">
        <TextInput value={article.date} onChange={(e) => update({ date: e.currentTarget.value })} />
      </Field>
      <Field label="Category">
        <TextInput value={article.category} onChange={(e) => update({ category: e.currentTarget.value })} />
      </Field>
      <Field label="Tags" description="Comma-separated">
        <TextInput
          value={article.tags.join(', ')}
          onChange={(e) => update({ tags: e.currentTarget.value.split(',').map((t) => t.trim()).filter(Boolean) })}
        />
      </Field>
      <Field label="PDF Link">
        <DocumentPicker
          value={article.pdfLink ?? ''}
          onChange={(value) => update({ pdfLink: value || undefined })}
          placeholder="Optional"
        />
      </Field>
    </div>
  );
}
