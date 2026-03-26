'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Zap,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface NetworkData {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export default function PerformanceDashboard() {
  const [metrics] = useState<MetricData[]>([]);
  const [networkInfo, setNetworkInfo] = useState<NetworkData | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Get current network information
    if ('connection' in navigator) {
      const connection = (
        navigator as Navigator & {
          connection?: { effectiveType: string; downlink: number; rtt: number };
        }
      ).connection;
      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        });
      }
    }

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className='w-4 h-4' />;
      case 'needs-improvement':
        return <AlertTriangle className='w-4 h-4' />;
      case 'poor':
        return <XCircle className='w-4 h-4' />;
      default:
        return <Activity className='w-4 h-4' />;
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  const getMetricDescription = (name: string) => {
    switch (name) {
      case 'CLS':
        return 'Cumulative Layout Shift - Visual stability of the page';
      case 'FID':
        return 'First Input Delay - Time from first interaction to browser response';
      case 'FCP':
        return 'First Contentful Paint - Time when first content appears';
      case 'LCP':
        return 'Largest Contentful Paint - Time when main content loads';
      case 'TTFB':
        return 'Time to First Byte - Server response time';
      default:
        return 'Performance metric';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>
          Performance Dashboard
        </h2>
        <div className='flex items-center space-x-2'>
          <Globe
            className={`w-5 h-5 ${isOnline ? 'text-green-600' : 'text-red-600'}`}
          />
          <span
            className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Network Information */}
      {networkInfo && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Zap className='w-5 h-5' />
              <span>Network Information</span>
            </CardTitle>
            <CardDescription>Current network conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Connection Type
                </label>
                <p className='text-lg font-semibold'>
                  {networkInfo.effectiveType.toUpperCase()}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Download Speed
                </label>
                <p className='text-lg font-semibold'>
                  {networkInfo.downlink} Mbps
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Round Trip Time
                </label>
                <p className='text-lg font-semibold'>{networkInfo.rtt}ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Core Web Vitals */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].map(metricName => {
          const metric = metrics.find(m => m.name === metricName);
          const hasData = !!metric;

          return (
            <Card key={metricName}>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center justify-between'>
                  <span className='text-lg font-semibold'>{metricName}</span>
                  {hasData && (
                    <Badge className={getRatingColor(metric.rating)}>
                      {getRatingIcon(metric.rating)}
                      <span className='ml-1 capitalize'>{metric.rating}</span>
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className='text-sm'>
                  {getMetricDescription(metricName)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='text-3xl font-bold'>
                    {hasData ? formatValue(metricName, metric.value) : '—'}
                  </div>
                  {hasData && (
                    <div className='text-sm text-gray-500'>
                      Measured {new Date(metric.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                  {!hasData && (
                    <div className='text-sm text-gray-400'>
                      Waiting for data...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Tips</CardTitle>
          <CardDescription>
            Recommendations to improve your website performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-start space-x-3'>
              <CheckCircle className='w-5 h-5 text-green-600 mt-0.5' />
              <div>
                <h4 className='font-medium'>Image Optimization</h4>
                <p className='text-sm text-gray-600'>
                  Use modern image formats like WebP and AVIF, implement lazy
                  loading, and serve appropriately sized images.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-3'>
              <CheckCircle className='w-5 h-5 text-green-600 mt-0.5' />
              <div>
                <h4 className='font-medium'>Code Splitting</h4>
                <p className='text-sm text-gray-600'>
                  Split your JavaScript bundles to load only the code needed for
                  each page.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-3'>
              <CheckCircle className='w-5 h-5 text-green-600 mt-0.5' />
              <div>
                <h4 className='font-medium'>Caching Strategy</h4>
                <p className='text-sm text-gray-600'>
                  Implement service workers and CDN caching to reduce load times
                  for returning visitors.
                </p>
              </div>
            </div>
            <div className='flex items-start space-x-3'>
              <CheckCircle className='w-5 h-5 text-green-600 mt-0.5' />
              <div>
                <h4 className='font-medium'>Critical CSS</h4>
                <p className='text-sm text-gray-600'>
                  Inline critical CSS and defer non-critical styles to improve
                  First Contentful Paint.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
