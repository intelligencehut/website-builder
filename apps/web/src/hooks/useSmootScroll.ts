'use client';

import { useCallback } from 'react';
import { scrollToElement } from '@/lib/utils';

/**
 * Hook for smooth scrolling functionality
 */
export function useSmoothScroll() {
  const scrollTo = useCallback((
    elementId: string, 
    offset = 80 // Default offset for fixed header
  ) => {
    scrollToElement(elementId, offset);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const scrollToSection = useCallback((
    sectionName: string,
    offset = 80
  ) => {
    // Remove # if present
    const elementId = sectionName.replace('#', '');
    scrollTo(elementId, offset);
  }, [scrollTo]);

  return {
    scrollTo,
    scrollToTop,
    scrollToSection,
  };
}