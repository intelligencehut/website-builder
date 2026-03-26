/**
 * Hook for tracking scroll position
 */

import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    // Set initial position
    updatePosition();

    // Add scroll event listener
    window.addEventListener('scroll', updatePosition, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}