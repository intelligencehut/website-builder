'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

interface AnimatedWrapperProps {
  children: ReactNode;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedWrapper({
  children,
  variants,
  initial = 'hidden',
  animate = 'visible',
  exit,
  className,
  delay = 0,
  duration,
  once = true,
}: AnimatedWrapperProps) {
  const customVariants: Variants = variants || {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.6,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={customVariants}
      initial={initial}
      animate={animate}
      exit={exit}
      className={className}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}