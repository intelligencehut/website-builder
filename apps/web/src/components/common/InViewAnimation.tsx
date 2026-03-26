'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

interface InViewAnimationProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export function InViewAnimation({
  children,
  variants,
  className,
  threshold = 0.1,
  once = true,
  delay = 0,
}: InViewAnimationProps) {
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, once }}
      className={className}
    >
      {children}
    </motion.div>
  );
}