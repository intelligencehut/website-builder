'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from '@/components/common/PageTransition';

export interface SiteConfig {
  navigation?: {
    main?: { id: string; label: string; href: string; dropdown?: { id: string; label: string; href: string }[] }[];
    footer?: {
      quickLinks?: { label: string; href: string }[];
      socialLinks?: { icon: string; href: string; label: string }[];
    };
  };
  theme?: {
    logo?: string;
    siteName?: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
  };
}

interface LayoutProps {
  children: ReactNode;
  className?: string;
  siteConfig?: SiteConfig | null;
}

export function Layout({ children, className = '', siteConfig }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        navItems={siteConfig?.navigation?.main}
        logo={siteConfig?.theme?.logo}
        siteName={siteConfig?.theme?.siteName}
      />

      <main className={`flex-1 pt-16 ${className}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      <Footer
        quickLinks={siteConfig?.navigation?.footer?.quickLinks}
        socialLinks={siteConfig?.navigation?.footer?.socialLinks}
        siteName={siteConfig?.theme?.siteName}
        email={siteConfig?.theme?.contactEmail}
        phone={siteConfig?.theme?.contactPhone}
        address={siteConfig?.theme?.address}
      />
    </div>
  );
}
