'use client';

import { motion } from 'framer-motion';
import { CounterAnimation } from '@/components/common/CounterAnimation';
import { InViewAnimation } from '@/components/common/InViewAnimation';
import type { StatItem } from '@website-builder/content-schema';

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  layout?: 'horizontal' | 'grid';
  className?: string;
}

export function StatsSection({ 
  title,
  subtitle,
  stats, 
  layout = 'horizontal',
  className = '' 
}: StatsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const gridClasses = layout === 'grid' 
    ? `grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8` 
    : 'flex flex-wrap justify-center gap-8';

  return (
    <div className={className}>
      {(title || subtitle) && (
        <InViewAnimation className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </InViewAnimation>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={gridClasses}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center group"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="mb-3">
                <CounterAnimation
                  to={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  decimals={stat.decimals || 0}
                  className="text-3xl md:text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors"
                  duration={2.5}
                />
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Hero Stats - Minimal version for hero section
 */
export function HeroStats({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.8 + (index * 0.2), 
            duration: 0.6,
            type: "spring",
            stiffness: 100 
          }}
          className="text-center"
        >
          <CounterAnimation
            to={stat.value}
            prefix={stat.prefix || ''}
            suffix={stat.suffix || '+'}
            decimals={stat.decimals || 0}
            className="text-2xl md:text-3xl font-bold text-orange-600"
            duration={2}
            threshold={0.1}
          />
          <div className="text-sm text-gray-600 mt-1 max-w-20">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}