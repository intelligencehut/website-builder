'use client';

import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Construction, ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
  expectedDate?: string;
  backLink?: string;
  backLabel?: string;
}

export function ComingSoon({
  title,
  description = 'This page is currently under development. Please check back soon for updates.',
  expectedDate,
  backLink = '/',
  backLabel = 'Back to Home',
}: ComingSoonProps) {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  {title}
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Coming Soon
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Construction className='h-20 w-20 text-orange-500 mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Under Development
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary max-w-2xl mx-auto'>
                      <p className='text-lg'>{description}</p>
                      {expectedDate && (
                        <div className='flex items-center justify-center gap-2 text-primary'>
                          <Calendar className='h-5 w-5' />
                          <span className='font-medium'>
                            Expected: {expectedDate}
                          </span>
                        </div>
                      )}
                      <p>
                        We are working hard to bring you this new feature. In
                        the meantime, feel free to explore our other sections or
                        contact us if you have any questions.
                      </p>
                    </div>
                    <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
                      <Link
                        href={backLink}
                        className='inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <ArrowLeft className='h-5 w-5' />
                        {backLabel}
                      </Link>
                      <Link
                        href='/contact'
                        className='px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors'
                      >
                        Contact Us
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 text-center'>
                    <h3 className='font-display text-2xl font-light text-text-primary mb-6'>
                      Meanwhile, Explore
                    </h3>
                    <div className='grid md:grid-cols-3 gap-4'>
                      <Link
                        href='/projects/saparambera'
                        className='flex flex-col items-center gap-2 p-4 bg-accent text-secondary rounded-lg hover:bg-accent/80 transition-colors'
                      >
                        <span className='font-medium'>Our Projects</span>
                      </Link>
                      <Link
                        href='/news'
                        className='flex flex-col items-center gap-2 p-4 bg-accent text-secondary rounded-lg hover:bg-accent/80 transition-colors'
                      >
                        <span className='font-medium'>Latest News</span>
                      </Link>
                      <Link
                        href='/join-us'
                        className='flex flex-col items-center gap-2 p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <span className='font-medium'>Support Us</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
