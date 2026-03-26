'use client';

import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can log the error to an error reporting service here
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-64 p-8 text-center bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-md">
            We encountered an error while rendering this component. Please try again.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left max-w-lg">
              <h4 className="font-semibold text-red-800 mb-2">Error Details:</h4>
              <code className="text-sm text-red-700 break-all">
                {this.state.error.message}
              </code>
            </div>
          )}
          
          <AnimatedButton
            variant="outline"
            onClick={this.handleRetry}
            className="inline-flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </AnimatedButton>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };