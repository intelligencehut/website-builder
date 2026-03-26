'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export function AnimatedCard({
  children,
  className,
  hoverEffect = true,
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedCardProps) {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={hoverEffect ? cardHover : undefined}
      viewport={{ amount: threshold, once }}
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all',
        className
      )}
    >
      {children}
    </motion.div>
  );
}