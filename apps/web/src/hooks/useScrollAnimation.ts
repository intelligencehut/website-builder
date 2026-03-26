'use client';

import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function useScrollAnimation() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  
  const smoothScrollY = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      
      scrollY.set(currentScrollY);
      scrollYProgress.set(currentScrollY / maxScrollY);
    };

    window.addEventListener('scroll', updateScrollY, { passive: true });
    updateScrollY();

    return () => window.removeEventListener('scroll', updateScrollY);
  }, [scrollY, scrollYProgress]);

  return {
    scrollY: smoothScrollY,
    scrollYProgress,
  };
}

export function useParallax(distance: number = 50) {
  const { scrollY } = useScrollAnimation();
  
  const y = useTransform(scrollY, [0, 1000], [0, distance]);
  
  return y;
}

export function useScrollScale(range: [number, number] = [0.8, 1]) {
  const { scrollYProgress } = useScrollAnimation();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [range[0], range[1], range[0]]);
  
  return scale;
}

export function useScrollOpacity() {
  const { scrollYProgress } = useScrollAnimation();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0]);
  
  return opacity;
}