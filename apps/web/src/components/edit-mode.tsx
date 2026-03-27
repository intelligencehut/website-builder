'use client';

import { useEffect, useState, useMemo } from 'react';

/**
 * Check if we're in edit mode by looking at the URL query parameter.
 * Uses window.location instead of useSearchParams to avoid Suspense requirement.
 */
function useEditMode(): boolean {
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    setIsEdit(new URLSearchParams(window.location.search).get('_edit') === '1');
  }, []);
  return isEdit;
}

/**
 * Wraps a section to make it clickable in edit mode.
 * When the website is loaded in the admin iframe with ?_edit=1,
 * sections get hover highlights and clicking sends a postMessage to the parent.
 */
export function EditableSection({
  sectionId,
  label,
  children,
}: {
  sectionId: string;
  label: string;
  children: React.ReactNode;
}) {
  const isEditMode = useEditMode();
  const [isHovered, setIsHovered] = useState(false);

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative"
      style={{
        outline: isHovered ? '2px solid #e8a951' : '2px solid transparent',
        outlineOffset: '-2px',
        transition: 'outline-color 0.15s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Invisible click overlay that captures all clicks in edit mode */}
      <div
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.parent.postMessage({ type: 'section-click', sectionId }, '*');
        }}
      />

      {isHovered && (
        <div
          className="absolute top-2 right-2 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-semibold shadow-lg pointer-events-none"
          style={{ backgroundColor: '#e8a951' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
          Edit {label}
        </div>
      )}
    </div>
  );
}

/**
 * Shows edit mode bar at the top when loaded in iframe
 */
export function EditModeBar() {
  const isEditMode = useEditMode();

  if (!isEditMode) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 py-1.5 text-white text-[11px] font-medium"
      style={{ backgroundColor: '#e8a951' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
      Edit Mode — Click on any section to edit
    </div>
  );
}
