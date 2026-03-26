import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JoinUs } from '@/components/sections/JoinUs';
import { InViewAnimation } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Join Us - SEVAA',
  description:
    'Join SEVAA in making a difference. Support our initiatives through donations, sponsorships, and various contribution options.',
  keywords: [
    'join us',
    'get involved',
    'donate',
    'sponsor',
    'sevaa',
    'donations',
    'scholarships',
    'sponsor child',
    'sponsor meal',
  ],
  url: '/get-involved',
});

export default function GetInvolvedPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent border-b border-primary/20 py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-5xl md:text-6xl font-light leading-tight text-text-primary mb-6'>
                  Join Us
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Make a lasting impact on the lives of children and communities
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        <JoinUs />
      </main>
      <Footer />
    </>
  );
}
