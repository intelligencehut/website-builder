import { useEffect, useState } from 'react';

// Extended Navigator type to include connection property
interface ExtendedNavigator extends Navigator {
  connection?: {
    effectiveType?: string;
  };
}

export function useProgressiveEnhancement(initiallyEnabled = false) {
  const [isEnhanced, setIsEnhanced] = useState(initiallyEnabled);

  useEffect(() => {
    const nav = navigator as ExtendedNavigator;
    const shouldEnhance =
      typeof window !== 'undefined' &&
      'IntersectionObserver' in window &&
      nav.connection?.effectiveType !== '2g';

    setIsEnhanced(shouldEnhance);
  }, []);

  return isEnhanced;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useConnectionSpeed() {
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow'>(
    'fast'
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as ExtendedNavigator).connection;
      const effectiveType = connection?.effectiveType || '4g';

      setConnectionSpeed(
        ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast'
      );
    }
  }, []);

  return connectionSpeed;
}
