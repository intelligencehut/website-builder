'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from '@/components/common/PageTransition';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className={`flex-1 pt-16 ${className}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer />
    </div>
  );
}