import { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Heart, Users, MapPin, Calendar, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Celebration of Rakhi Festival 2025 - SEVAA',
  description:
    'SEVAA celebrates Rakhi festival with community members, showcasing the bond of love and protection in our extended family.',
  keywords: [
    'rakhi celebration',
    'rakhi festival 2025',
    'community celebration',
    'cultural events',
    'sevaa family',
    'traditional festivals',
  ],
  url: '/news/rakhi-celebration',
});

export default function RakhiCelebrationPage() {
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
                  Celebration of Rakhi Festival 2025
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Strengthening bonds of love and protection in our SEVAA family
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    August 2025
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    SEVAA Community Centers
                  </div>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Main Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardContent className='p-8 md:p-12'>
                    <div className='prose prose-lg max-w-none'>
                      <p className='text-xl text-secondary leading-relaxed mb-8'>
                        The SEVAA community came together to celebrate the
                        beautiful festival of Rakhi, symbolizing the eternal
                        bond of love, care, and protection that defines our
                        extended family.
                      </p>

                      <div className='grid md:grid-cols-2 gap-8 mb-8'>
                        <div className='bg-accent/20 p-6 rounded-lg'>
                          <Heart className='h-8 w-8 text-primary mb-4' />
                          <h3 className='text-xl font-semibold text-text-primary mb-3'>
                            Community Bond
                          </h3>
                          <p className='text-secondary'>
                            The celebration reinforced the strong bonds within
                            our SEVAA family, bringing together members from
                            different communities.
                          </p>
                        </div>

                        <div className='bg-accent/20 p-6 rounded-lg'>
                          <Users className='h-8 w-8 text-primary mb-4' />
                          <h3 className='text-xl font-semibold text-text-primary mb-3'>
                            Cultural Preservation
                          </h3>
                          <p className='text-secondary'>
                            Traditional rituals and customs were observed,
                            passing on cultural values to the younger
                            generation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Photo Gallery Section */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary flex items-center gap-3'>
                      <Camera className='h-6 w-6 text-primary' />
                      Celebration Moments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                      <div className='relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                        <Image
                          src='/images/news/1.jpg'
                          alt='Rakhi celebration - Community gathering'
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                      <div className='relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                        <Image
                          src='/images/news/2.jpg'
                          alt='Rakhi festival - Traditional rituals'
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                      <div className='relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                        <Image
                          src='/images/news/3.jpg'
                          alt='Rakhi celebration - Family bonding'
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                    </div>
                    <div className='text-center'>
                      <p className='text-secondary mb-2'>
                        Beautiful moments captured during our community Rakhi
                        celebration 2025
                      </p>
                      <p className='text-sm text-secondary'>
                        Showcasing the joy, togetherness, and cultural
                        preservation of the SEVAA family.
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
                  Join Our Community Family
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Be part of our celebrations and community bonding activities
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join Our Family
                  </a>
                  <a
                    href='/gallery/photos'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    View Photo Gallery
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
