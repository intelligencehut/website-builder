import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Book, Calendar, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sevaa Souvenir 2025 - SEVAA',
  description:
    'SEVAA Souvenir 2025 - A commemorative publication celebrating our journey, achievements, and community impact.',
  keywords: [
    'sevaa souvenir 2025',
    'commemorative publication',
    'sevaa journey',
    'community impact',
    'organizational milestones',
    'anniversary publication',
  ],
  url: '/publications/sevaa-souvenir-2025',
});

export default function SevaaSouvenirPage() {
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
                  Sevaa Souvenir 2025
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  A commemorative journey through our impact, achievements, and
                  community stories
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    2025 Edition
                  </div>
                  <div className='flex items-center gap-2'>
                    <Gift className='h-4 w-4' />
                    Commemorative Publication
                  </div>
                </div>
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
                    <Book className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Souvenir Publication in Progress
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        We are currently compiling stories, photographs, and
                        testimonials for our commemorative 2025 souvenir
                        publication.
                      </p>
                      <p>
                        This special edition will serve as a lasting testament
                        to our community&apos;s journey and the collective
                        impact of our efforts in rural development and social
                        transformation.
                      </p>
                      <p className='text-primary font-medium'>
                        The souvenir will be available soon for our community
                        members and supporters!
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
                  Be Part of Our Story
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Join our mission and help us create more stories of
                  transformation
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join Our Mission
                  </a>
                  <a
                    href='/publications'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    View Other Publications
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
