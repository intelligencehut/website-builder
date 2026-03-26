import { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Flag, Users, MapPin, Calendar, Star, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Independence Day Celebration 2025 - SEVAA',
  description:
    'SEVAA celebrates Independence Day with great enthusiasm at TMSVV School, fostering patriotic spirit among students and community.',
  keywords: [
    'independence day 2025',
    'patriotic celebration',
    'tmsvv school',
    'flag hoisting',
    'student performances',
    'community celebration',
  ],
  url: '/news/independence-day',
});

const celebrationHighlights = [
  {
    title: 'Flag Hoisting Ceremony',
    description:
      'Traditional flag hoisting ceremony conducted with full honors and respect.',
    icon: Flag,
  },
  {
    title: 'Student Performances',
    description:
      'Students showcased their talents through patriotic songs, dances, and speeches.',
    icon: Music,
  },
  {
    title: 'Community Participation',
    description:
      'Local community members joined the celebration, strengthening unity.',
    icon: Users,
  },
  {
    title: 'Patriotic Spirit',
    description: 'The event instilled strong patriotic values in young minds.',
    icon: Star,
  },
];

export default function IndependenceDayPage() {
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
                  Independence Day Celebration 2025
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Celebrating freedom and unity at TMSVV School
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    August 15, 2025
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    TMSVV School, Saparambera
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
                        Independence Day was celebrated with great enthusiasm
                        and patriotic fervor at the Tilka Murmu SEVAA Vana
                        Vidyalaya. The celebration brought together students,
                        teachers, and community members in a magnificent display
                        of national pride and unity.
                      </p>

                      <div className='bg-gradient-to-r from-orange-50 to-white p-6 rounded-lg mb-8 border-l-4 border-orange-500'>
                        <h3 className='text-xl font-semibold text-text-primary mb-3 flex items-center gap-2'>
                          <Flag className='h-5 w-5 text-orange-500' />A Day of
                          National Pride
                        </h3>
                        <p className='text-secondary leading-relaxed'>
                          The celebration exemplified the spirit of freedom and
                          democracy, inspiring the younger generation to
                          appreciate the sacrifices made for our independence
                          and to contribute to nation-building.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Celebration Highlights */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Celebration Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid md:grid-cols-2 gap-6'>
                      {celebrationHighlights.map((highlight, index) => (
                        <div
                          key={index}
                          className='bg-accent/20 p-6 rounded-lg'
                        >
                          <highlight.icon className='h-8 w-8 text-primary mb-4' />
                          <h4 className='text-lg font-semibold text-text-primary mb-3'>
                            {highlight.title}
                          </h4>
                          <p className='text-secondary'>
                            {highlight.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Photo Gallery */}
              <InViewAnimation delay={0.3}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Independence Day 2025 - Photo Gallery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6 mb-6'>
                      <div className='relative w-full h-96 rounded-lg overflow-hidden shadow-md mx-auto max-w-2xl'>
                        <Image
                          src='/images/events/Independence Day 15th August 2025 Celebrated in School.png'
                          alt='Independence Day celebration at TMSVV School on August 15, 2025'
                          fill
                          sizes='(max-width: 1200px) 100vw, 50vw'
                          className='object-cover'
                        />
                      </div>
                    </div>
                    <div className='text-center'>
                      <p className='text-secondary mb-2'>
                        Independence Day celebration at TMSVV School - August
                        15, 2025
                      </p>
                      <p className='text-sm text-secondary'>
                        Students and community members celebrating with
                        patriotic fervor and pride.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Star className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Building Future Citizens
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        Through such celebrations, we instill strong patriotic
                        values and civic responsibility in our students,
                        preparing them to be responsible citizens of our great
                        nation.
                      </p>
                      <p>
                        The Independence Day celebration at TMSVV reflects our
                        commitment to holistic education that includes cultural
                        and national values alongside academic excellence.
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
                  Support Patriotic Education
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Help us nurture responsible citizens and future leaders
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Support Education
                  </a>
                  <a
                    href='/projects/saparambera'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Learn About TMSVV
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
