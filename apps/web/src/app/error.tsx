'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error('Page Error:', error);
  }, [error]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-orange-600" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We encountered an unexpected error while loading this page. 
            Don&apos;t worry, our team has been notified and is working on a fix.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div variants={itemVariants}>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 text-left">
                <h3 className="font-semibold text-orange-800 mb-2">Error Details:</h3>
                <code className="text-sm text-orange-700 break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-xs text-orange-600 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                onClick={reset}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </AnimatedButton>
              
              <Link href="/">
                <AnimatedButton 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={itemVariants} className="pt-6">
            <p className="text-sm text-gray-500">
              If this problem continues, please{' '}
              <Link 
                href="/#contact" 
                className="text-orange-600 hover:text-orange-700 underline"
              >
                let us know
              </Link>
              . We appreciate your patience!
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-20 left-20 w-28 h-28 bg-orange-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-20 right-20 w-20 h-20 bg-red-300 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  );
}