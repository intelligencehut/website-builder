'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

export function UserMenu() {
  const { user, signOut, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await signOut();

      if (error) {
        console.error('Error signing out:', error);
        // You can add toast notification here
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse' />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center gap-2'>
        <Avatar className='w-8 h-8'>
          <AvatarImage
            src={user.user_metadata?.avatar_url}
            alt={user.user_metadata?.full_name || user.email || 'User'}
          />
          <AvatarFallback>
            {user.user_metadata?.full_name?.charAt(0) ||
              user.email?.charAt(0) ||
              'U'}
          </AvatarFallback>
        </Avatar>
        <div className='hidden md:block'>
          <p className='text-sm font-medium'>
            {user.user_metadata?.full_name || user.email}
          </p>
        </div>
      </div>
      <Button
        onClick={handleSignOut}
        disabled={isSigningOut}
        variant='ghost'
        size='sm'
      >
        {isSigningOut ? 'Signing out...' : 'Sign Out'}
      </Button>
    </div>
  );
}
