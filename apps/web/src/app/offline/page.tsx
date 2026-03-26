'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WifiOff, RefreshCw, Home, BookOpen, Heart } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Check initial status
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (isOnline) {
    // Automatically redirect when connection is restored
    handleRefresh();
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md mx-auto text-center'>
        <CardHeader className='pb-6'>
          <div className='mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4'>
            <WifiOff className='w-8 h-8 text-orange-600' />
          </div>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            You&apos;re Offline
          </CardTitle>
          <CardDescription className='text-gray-600'>
            It looks like you&apos;ve lost your internet connection. Don&apos;t
            worry, some content is still available!
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <Button
              onClick={handleRefresh}
              className='w-full bg-orange-600 hover:bg-orange-700'
              size='lg'
            >
              <RefreshCw className='w-4 h-4 mr-2' />
              Try Again
            </Button>

            <Button
              onClick={handleGoHome}
              variant='outline'
              className='w-full'
              size='lg'
            >
              <Home className='w-4 h-4 mr-2' />
              Go to Homepage
            </Button>
          </div>

          <div className='border-t pt-6'>
            <h3 className='font-semibold text-gray-900 mb-3'>
              Available Offline:
            </h3>
            <div className='space-y-2 text-sm text-gray-600'>
              <div className='flex items-center'>
                <BookOpen className='w-4 h-4 mr-2 text-orange-600' />
                Previously viewed pages
              </div>
              <div className='flex items-center'>
                <Heart className='w-4 h-4 mr-2 text-orange-600' />
                Cached images and content
              </div>
            </div>
          </div>

          <div className='bg-orange-50 rounded-lg p-4 text-sm'>
            <p className='text-orange-800'>
              <strong>About SEVAA:</strong> We work to empower communities
              through education, healthcare, and sustainable development in
              rural West Bengal, India.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
