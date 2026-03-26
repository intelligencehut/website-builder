'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover, buttonTap } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

export function AnimatedButton({
  children,
  className,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
}: AnimatedButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    primary:
      'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500',
    secondary:
      'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50 focus-visible:ring-orange-500',
    outline:
      'border-2 border-orange-600 bg-transparent text-orange-600 hover:bg-orange-50 focus-visible:ring-orange-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
  };

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : buttonHover}
      whileTap={disabled ? undefined : buttonTap}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
