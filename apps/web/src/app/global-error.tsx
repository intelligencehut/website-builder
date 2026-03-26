'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { AnimatedButton } from '@/components/common/AnimatedButton';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
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
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-2xl mx-auto"
          >
            {/* Error Icon */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We&apos;re sorry, but something unexpected happened. Our team has been 
                notified and is working to fix this issue.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                  <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                  <code className="text-sm text-red-700 break-all">
                    {error.message}
                  </code>
                  {error.digest && (
                    <p className="text-xs text-red-600 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* What happened section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What happened?
                </h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    An unexpected error occurred while loading the page
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Our development team has been automatically notified
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    You can try refreshing the page or go back to the homepage
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
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

              {/* Help Text */}
              <motion.div variants={itemVariants} className="pt-8">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>
                    If this problem persists, please{' '}
                    <Link 
                      href="/#contact" 
                      className="text-orange-600 hover:text-orange-700 underline"
                    >
                      contact our support team
                    </Link>
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-20 right-20 w-24 h-24 bg-orange-300 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </body>
    </html>
  );
}