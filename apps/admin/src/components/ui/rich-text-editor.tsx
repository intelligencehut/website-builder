'use client';

import { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Link2,
  Link2Off,
  Undo2,
  Redo2,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

/**
 * WYSIWYG editor used for any section field whose value is HTML.
 *
 * Emits HTML compatible with what seeded content already uses:
 * <p>, <h3>, <h4>, <ul>/<ol>/<li>, <strong>, <em>, <a>.
 *
 * Includes a "view HTML" toggle that swaps the rich editor for a raw textarea
 * so power users can still paste/edit raw HTML.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  minHeight = '200px',
}: RichTextEditorProps) {
  const [rawMode, setRawMode] = useState(false);

  const editor = useEditor({
    // Avoid SSR/hydration mismatches in Next.js.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [3, 4] },
        // StarterKit ships link in v3 — disable so we can use the standalone
        // extension with explicit config.
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-accent underline',
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none',
          'prose-headings:text-ink prose-p:text-ink prose-li:text-ink',
          'prose-strong:text-ink prose-a:text-accent',
          'px-3 py-2'
        ),
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // TipTap emits "<p></p>" for empty doc — normalise to empty string.
      onChange(html === '<p></p>' ? '' : html);
    },
  });

  // Keep the editor in sync when `value` changes from outside (e.g. loading a
  // different section). Skip if content already matches to avoid cursor jumps.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = value || '';
    const normalizedCurrent = current === '<p></p>' ? '' : current;
    if (normalizedCurrent !== incoming) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [value, editor]);

  const toggleRawMode = useCallback(() => {
    setRawMode((prev) => !prev);
  }, []);

  if (rawMode) {
    return (
      <div className={cn('space-y-1', className)}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            'w-full px-2.5 py-1.5 bg-surface-raised border border-surface-border rounded-[4px] text-[12px] text-ink font-mono',
            'placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-y'
          )}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleRawMode}
            className="text-[11px] text-accent hover:text-accent-hover transition-colors"
          >
            Switch to visual editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-surface-raised border border-surface-border rounded-[4px] overflow-hidden',
        'focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent transition-all',
        className
      )}
    >
      <Toolbar editor={editor} onToggleRaw={toggleRawMode} />
      <EditorContent editor={editor} />
    </div>
  );
}

// ── Toolbar ────────────────────────────────────────────────

interface ToolbarProps {
  editor: Editor | null;
  onToggleRaw: () => void;
}

function Toolbar({ editor, onToggleRaw }: ToolbarProps) {
  const promptForLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Enter URL', previous ?? 'https://');
    // Cancelled prompt
    if (url === null) return;
    // Empty string → remove link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const unlink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-1.5 py-1 border-b border-surface-border bg-surface-raised/60">
      <ToolbarButton
        label="Bold (Ctrl+B)"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        active={editor?.isActive('bold')}
        disabled={!editor}
      >
        <Bold className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic (Ctrl+I)"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        active={editor?.isActive('italic')}
        disabled={!editor}
      >
        <Italic className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        active={editor?.isActive('strike')}
        disabled={!editor}
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Heading 3"
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor?.isActive('heading', { level: 3 })}
        disabled={!editor}
      >
        <Heading3 className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 4"
        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor?.isActive('heading', { level: 4 })}
        disabled={!editor}
      >
        <Heading4 className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Bullet list"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        active={editor?.isActive('bulletList')}
        disabled={!editor}
      >
        <List className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        active={editor?.isActive('orderedList')}
        disabled={!editor}
      >
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label={editor?.isActive('link') ? 'Edit link' : 'Insert link'}
        onClick={promptForLink}
        active={editor?.isActive('link')}
        disabled={!editor}
      >
        <Link2 className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Remove link"
        onClick={unlink}
        disabled={!editor || !editor.isActive('link')}
      >
        <Link2Off className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Undo"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor || !editor.can().chain().focus().undo().run()}
      >
        <Undo2 className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor || !editor.can().chain().focus().redo().run()}
      >
        <Redo2 className="w-3.5 h-3.5" />
      </ToolbarButton>

      <div className="ml-auto">
        <ToolbarButton label="View / edit raw HTML" onClick={onToggleRaw}>
          <Code2 className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-surface-border mx-0.5" />;
}

interface ToolbarButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

function ToolbarButton({ label, onClick, active, disabled, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center w-6 h-6 rounded-[3px] transition-colors',
        'text-ink-secondary hover:text-ink hover:bg-surface-border/60',
        active && 'bg-accent/15 text-accent hover:bg-accent/20 hover:text-accent',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:text-ink-secondary'
      )}
    >
      {children}
    </button>
  );
}
