'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!isSupabaseConfigured()) {
        router.push('/?error=auth_not_configured');
        return;
      }

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error during auth callback:', error);
          router.push('/?error=auth_error');
          return;
        }

        if (data.session) {
          router.push('/?success=logged_in');
        } else {
          router.push('/?error=no_session');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        router.push('/?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <LoadingSpinner />
        <p className='mt-4 text-gray-600'>Completing sign in...</p>
      </div>
    </div>
  );
}
