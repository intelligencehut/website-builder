import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = generatePageMetadata({
  title: 'Formation of Vivek Pally',
  description:
    'Learn about the establishment of Vivekpally - a comprehensive rural development platform by SEVAA at Saparambera village in Ajodhya Hills, Purulia.',
  keywords: [
    'Vivekpally',
    'rural development',
    'Saparambera',
    'SEVAA projects',
    'tribal development',
    'holistic development',
  ],
  url: '/formation-of-vivek-pally',
});

export default function FormationOfVivekPallyPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  Formation of Vivek Pally
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  A People&rsquo;s Platform for Comprehensive Rural Development
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        <section className='py-24'>
          <div className='container max-w-6xl mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='mb-16'>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                      Tilka Murmu SEVAA Vano Vidyalaya
                    </h2>
                    <div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
                    <Button
                      variant='outline'
                      className='border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300'
                      asChild
                    >
                      <a
                        href='/documents/Tilka Murmu Forest School.pdf'
                        target='_blank'
                      >
                        Download Brochure
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </InViewAnimation>

            <InViewAnimation delay={0.2}>
              <div className='mb-16'>
                <h3 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                  Vivekpally: A People&rsquo;s Platform
                </h3>
                <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>

                <div className='prose prose-lg max-w-none space-y-8'>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    After several months of field and project experience, SEVAA
                    realised that instead of working with single projects, SEVAA
                    should move with a holistic approach of development to get a
                    better and greater impact from the field. Vivekpally is such
                    a people&rsquo;s platform through which they can take
                    decisions, plan the target, make strategies, implement
                    jointly, review from the field and modify themselves
                    accordingly and converge all kinds of support existing,
                    governmental and to be received from SEVAA.
                  </p>

                  <p className='text-base font-light leading-relaxed text-secondary'>
                    In this platform, they can identify their gaps and any
                    support they require from outside. Thus with this goal in
                    mind the concept of Vivekpalli took birth in early 2022.
                    SEVAA Vivekpalli is an adopted village by SEVAA to inject
                    all-round development in the village in-line with SEVAA
                    working-areas of Education, Health, Livelihood,
                    Emergency-Relief, Culture and Environment.
                  </p>
                </div>
              </div>
            </InViewAnimation>

            <InViewAnimation delay={0.4}>
              <div className='grid lg:grid-cols-2 gap-12 mb-16'>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    <h4 className='font-display text-3xl font-light text-text-primary mb-6'>
                      The Beginning
                    </h4>
                    <div className='space-y-6 text-secondary'>
                      <p className='text-base font-light leading-relaxed'>
                        SEVAA surveyed a few villages in Ajodhya Hills and the
                        first Vivekpalli was established in April 2022 in the
                        &ldquo;Village Saparambera&rdquo;, Ajodhya, Purulia. The
                        village had no school, electricity, proper livelihood
                        and roads.
                      </p>
                      <p className='text-base font-light leading-relaxed'>
                        The villagers had no adequate money to buy quality seeds
                        for farming. SEVAA started connecting the village with
                        the outside world and governmental facilities, training
                        them how to solve problems through best utilisation of
                        existing resources.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    <h4 className='font-display text-3xl font-light text-text-primary mb-6'>
                      The Impact
                    </h4>
                    <div className='space-y-6 text-secondary'>
                      <p className='text-base font-light leading-relaxed'>
                        This Vivekpally was named as{' '}
                        <strong>Birbaba Tilka Murmu Vivekpalli</strong> (an Unit
                        of SEVAA) which has been executing activities on all 52
                        families of that village.
                      </p>
                      <p className='text-base font-light leading-relaxed'>
                        In the last 2 years SEVAA has started projects at
                        Saparambera Vivekpalli mainly in areas of Education,
                        Health, Livelihood, Agriculture, Environment and
                        Culture. A great impact can be seen on the minds of the
                        villagers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </InViewAnimation>

            <InViewAnimation delay={0.6}>
              <div className='mb-16'>
                <h4 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                  Working Structure
                </h4>
                <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
                <Card className='bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    <p className='text-base font-light leading-relaxed text-secondary text-center'>
                      An 11-member Working Committee of the villagers including
                      2 SEVAA representatives carry out all regular activities
                      in the village under the guidance of SEVAA. This village
                      has already attracted the attention of local
                      administration, people&rsquo;s representatives and
                      officers at Block and District level.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </InViewAnimation>

            <InViewAnimation delay={0.8}>
              <div className='mb-16'>
                <h4 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                  Key Areas of Development
                </h4>
                <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-primary'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-medium text-text-primary mb-2'>
                        Education
                      </h5>
                      <p className='text-sm font-light text-secondary'>
                        Forest school establishment and educational support
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='p-6 hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-green-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-semibold text-gray-900 mb-2'>
                        Health
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        Medical camps and healthcare facilities
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='p-6 hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-yellow-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-semibold text-gray-900 mb-2'>
                        Livelihood
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        Sustainable income generation programs
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='p-6 hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-emerald-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-semibold text-gray-900 mb-2'>
                        Agriculture
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        Modern farming techniques and seed support
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='p-6 hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-teal-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-semibold text-gray-900 mb-2'>
                        Environment
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        Environmental conservation and sustainability
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='p-6 hover:shadow-lg transition-shadow'>
                    <CardContent className='p-0 text-center'>
                      <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-purple-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l1 16H6L7 4z'
                          />
                        </svg>
                      </div>
                      <h5 className='text-lg font-semibold text-gray-900 mb-2'>
                        Culture
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        Preservation of indigenous folk culture
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </InViewAnimation>

            <div className='mb-16'>
              <h4 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
                Life at Saparambera Vivekpally
              </h4>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparambera1 - low resolution.jpg'
                      alt='Saparambera village activities'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Community activities at Saparambera
                    </p>
                  </CardContent>
                </Card>

                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparambera 2 - low resolution.jpg'
                      alt='Educational activities at Vivekpally'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Educational activities at Vivekpally
                    </p>
                  </CardContent>
                </Card>

                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparambera 3.jpg'
                      alt='Development work in progress'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Development work in progress
                    </p>
                  </CardContent>
                </Card>

                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparambera 5.jpg'
                      alt='Agricultural training programs'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Agricultural training programs
                    </p>
                  </CardContent>
                </Card>

                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparambera 6 -low resolution.jpg'
                      alt='Health and wellness activities'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Health and wellness activities
                    </p>
                  </CardContent>
                </Card>

                <Card className='overflow-hidden'>
                  <div className='relative h-64'>
                    <Image
                      src='/images/userfiles/image/saparabera 8 low resolution.jpg'
                      alt='Community meetings and planning'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <p className='text-sm text-gray-600 text-center'>
                      Community meetings and planning
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <InViewAnimation delay={1.2}>
              <Card className='bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
                <CardContent className='p-8 md:p-12'>
                  <h3 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6 text-center'>
                    Vision for the Future
                  </h3>
                  <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
                  <div className='text-center max-w-4xl mx-auto space-y-6'>
                    <p className='text-base font-light leading-relaxed text-secondary'>
                      The success of Birbaba Tilka Murmu Vivekpalli at
                      Saparambera has become a model for holistic rural
                      development. This people&rsquo;s platform demonstrates how
                      communities can take ownership of their development while
                      receiving strategic support from organizations like SEVAA.
                    </p>
                    <p className='text-base font-light leading-relaxed text-secondary'>
                      The transformation of this remote tribal village from
                      having no basic facilities to becoming a center of
                      sustainable development serves as an inspiration for
                      similar initiatives across rural India.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </InViewAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
