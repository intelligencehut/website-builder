'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function ServiceWorkerRegistration() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
            }
          );

          // ServiceWorker registration successful

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // New content is available
                  if (confirm('New content is available. Refresh to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        } catch {
          // ServiceWorker registration failed
        }
      });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // setShowInstallPrompt(true); // Disabled - Do not show install prompt
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (
      window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches
    ) {
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      // User accepted the install prompt
    } else {
      // User dismissed the install prompt
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm'>
      <div className='bg-white border border-orange-200 rounded-lg shadow-lg p-4'>
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>
            <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-orange-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                />
              </svg>
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900'>
              Install SEVAA App
            </p>
            <p className='text-sm text-gray-500'>
              Add SEVAA to your home screen for a better experience.
            </p>
          </div>
        </div>
        <div className='mt-4 flex space-x-2'>
          <button
            onClick={handleInstallClick}
            className='flex-1 bg-orange-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-orange-700 transition-colors'
          >
            Install
          </button>
          <button
            onClick={handleDismissInstall}
            className='flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-200 transition-colors'
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
