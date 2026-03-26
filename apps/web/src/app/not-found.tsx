'use client';

import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { useSmoothScroll } from '@/hooks/useSmootScroll';

export default function NotFound() {
  const { scrollToTop } = useSmoothScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          variants={numberVariants}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-orange-600 mb-4">
            404
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off. 
            Don&apos;t worry, even our best volunteers sometimes lose their way!
          </p>

          {/* Suggestions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What you can do:
            </h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Check the URL for any typos
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Use the search function to find what you need
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Visit our homepage to explore our programs
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Contact us if you think this is an error
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" onClick={scrollToTop}>
              <AnimatedButton variant="primary" size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </AnimatedButton>
            </Link>
            
            <Link href="/#programs">
              <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Browse Programs
              </AnimatedButton>
            </Link>
          </div>

          {/* Help Text */}
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <p className="text-sm text-gray-500">
              If you believe this is an error, please{' '}
              <Link 
                href="/#contact" 
                className="text-orange-600 hover:text-orange-700 underline"
              >
                contact our support team
              </Link>
              . We&apos;re here to help!
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-orange-300 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  );
}