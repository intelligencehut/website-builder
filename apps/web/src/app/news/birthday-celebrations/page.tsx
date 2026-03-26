import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Gift, Users, MapPin, Calendar, Heart, Cake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Birthday Celebrations - SEVAA',
  description:
    'SEVAA celebrates special birthdays and anniversaries, strengthening community bonds and spreading joy among members.',
  keywords: [
    'birthday celebrations',
    'community celebrations',
    'sevaa family',
    'special occasions',
    'community bonding',
    'anniversary celebrations',
  ],
  url: '/news/birthday-celebrations',
});

const celebrationTypes = [
  {
    title: 'Community Members',
    description: 'Celebrating birthdays of SEVAA team members and volunteers.',
    icon: Users,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Special Anniversaries',
    description:
      'Marking important milestones and organizational anniversaries.',
    icon: Gift,
    color: 'bg-green-50 border-green-200',
  },
  {
    title: 'Cultural Celebrations',
    description: 'Honoring traditional festivals and cultural occasions.',
    icon: Heart,
    color: 'bg-pink-50 border-pink-200',
  },
];

export default function BirthdayCelebrationsPage() {
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
                  Birthday Celebrations
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Celebrating special moments and strengthening community bonds
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    Year-round Celebrations
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
                        At SEVAA, we believe in celebrating life&apos;s special
                        moments together as one big family. Our birthday
                        celebrations and anniversary commemorations bring joy,
                        strengthen bonds, and create lasting memories within our
                        community.
                      </p>

                      <div className='bg-accent/20 p-6 rounded-lg mb-8'>
                        <h3 className='text-xl font-semibold text-text-primary mb-3 flex items-center gap-2'>
                          <Heart className='h-5 w-5 text-primary' />
                          Celebrating Together
                        </h3>
                        <p className='text-secondary leading-relaxed'>
                          These celebrations reflect our core values of unity,
                          compassion, and community spirit. Every birthday and
                          anniversary is an opportunity to express gratitude and
                          strengthen our bonds as the SEVAA family.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Types of Celebrations */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Our Celebration Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      {celebrationTypes.map((type, index) => (
                        <div
                          key={index}
                          className={`p-6 rounded-lg border-2 ${type.color}`}
                        >
                          <div className='flex items-start gap-4'>
                            <div className='bg-white p-3 rounded-lg shadow-sm'>
                              <type.icon className='h-6 w-6 text-primary' />
                            </div>
                            <div className='flex-1'>
                              <h4 className='text-lg font-semibold text-text-primary mb-2'>
                                {type.title}
                              </h4>
                              <p className='text-secondary'>
                                {type.description}
                              </p>
                            </div>
                          </div>
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
                      Celebration Moments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-center py-12'>
                      <Cake className='h-16 w-16 text-secondary mx-auto mb-4' />
                      <p className='text-secondary mb-4'>
                        Photos from our birthday celebrations and special
                        occasions
                      </p>
                      <p className='text-sm text-secondary'>
                        Capturing the joy, laughter, and togetherness of our
                        SEVAA family celebrations throughout the year.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 md:p-12'>
                    <div className='text-center mb-8'>
                      <Gift className='h-16 w-16 text-primary mx-auto mb-6' />
                      <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                        More Than Just Celebrations
                      </h2>
                    </div>

                    <div className='grid md:grid-cols-2 gap-8'>
                      <div className='space-y-4'>
                        <h4 className='font-semibold text-text-primary'>
                          Building Relationships
                        </h4>
                        <p className='text-secondary'>
                          Our celebrations foster deeper connections among team
                          members, volunteers, and community partners.
                        </p>
                      </div>

                      <div className='space-y-4'>
                        <h4 className='font-semibold text-text-primary'>
                          Creating Memories
                        </h4>
                        <p className='text-secondary'>
                          These special moments create lasting memories that
                          strengthen our collective identity as the SEVAA
                          family.
                        </p>
                      </div>

                      <div className='space-y-4'>
                        <h4 className='font-semibold text-text-primary'>
                          Spreading Joy
                        </h4>
                        <p className='text-secondary'>
                          Every celebration brings happiness and positive energy
                          to our community, enhancing our work environment.
                        </p>
                      </div>

                      <div className='space-y-4'>
                        <h4 className='font-semibold text-text-primary'>
                          Cultural Values
                        </h4>
                        <p className='text-secondary'>
                          We honor cultural traditions and values through our
                          celebration practices and customs.
                        </p>
                      </div>
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
                  Join Our Celebrating Family
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Become part of our joyful community and share in our
                  celebrations
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join Our Family
                  </a>
                  <a
                    href='/team'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Meet Our Team
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
