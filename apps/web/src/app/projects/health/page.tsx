import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sevaa Health Projects',
  description:
    'Community health initiatives by SEVAA including medical camps, health awareness programs, maternal care, and preventive healthcare services.',
  keywords: [
    'health projects',
    'medical camps',
    'community health',
    'health awareness',
    'maternal care',
    'preventive healthcare',
    'rural health',
    'SEVAA health initiatives',
  ],
  url: '/projects/health',
});

export default function SevaaHealthProjectsPage() {
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
                  Sevaa Health Projects
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Bringing quality healthcare to underserved communities through
                  comprehensive health initiatives
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Heart className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Health Initiatives Coming Soon
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        SEVAA is developing comprehensive health programs to
                        provide accessible, quality healthcare services to rural
                        and marginalized communities.
                      </p>
                      <p>
                        Our upcoming health initiatives will focus on preventive
                        care, community health education, and holistic wellness,
                        inspired by Swami Vivekananda&apos;s vision of serving
                        humanity.
                      </p>
                      <p className='text-primary font-medium'>
                        Stay tuned for updates on our health projects!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-16 bg-primary text-white'>
          <div className='container mx-auto px-4'>
            <InViewAnimation>
              <div className='text-center max-w-3xl mx-auto space-y-6'>
                <h2 className='font-display text-3xl font-light'>
                  Support Community Health
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Help us provide quality healthcare to those who need it most
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Support Our Mission
                  </a>
                  <a
                    href='/join-us'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Join Our Team
                  </a>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>
      </div>
    </>
  );
}
