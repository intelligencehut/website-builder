import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Calendar, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Events - SEVAA',
  description:
    'Stay updated with SEVAA events, community programs, educational activities, and cultural celebrations.',
  keywords: [
    'sevaa events',
    'community events',
    'educational programs',
    'cultural celebrations',
    'school events',
    'developmental activities',
  ],
  url: '/events',
});

const upcomingEvents: any[] = [
  // Upcoming events will be added here
];

const pastEvents = [
  {
    id: 'tmsvv-inauguration',
    title: 'Inauguration of Tilka Murmu SEVAA Vana Vidyalaya',
    date: 'March 9, 2025',
    location: 'TMSVV School, Saparambera',
    description:
      'State Ministers B. Roychoudhuri, Sandhyarani Tudu, and SP-Purulia inaugurated the school in a grand ceremony.',
    category: 'School Event',
    featured: true,
    highlights: [
      'School building inauguration',
      'Presence of state ministers and officials',
      'Community celebration',
      'Student performances',
    ],
  },
  {
    id: 'health-camp-inauguration',
    title: 'Health Camp Inauguration',
    date: 'March 10, 2025',
    location: 'Primary Health Centre',
    description:
      'ServicePlace USA organized Health Camp arranged by Primary Health Centre was inaugurated.',
    category: 'Health Event',
    featured: false,
    highlights: [
      'Medical camp setup',
      'Community health checkups',
      'Health awareness programs',
      'Collaboration with ServicePlace USA',
    ],
  },
  {
    id: 'independence-day-2025',
    title: 'Independence Day Celebration',
    date: 'August 15, 2025',
    location: 'TMSVV School',
    description:
      'Independence Day celebrated with great enthusiasm at the school with students and community participation.',
    category: 'Cultural Event',
    featured: false,
    highlights: [
      'Flag hoisting ceremony',
      'Student performances',
      'Patriotic songs and speeches',
      'Community participation',
    ],
  },
];

export default function EventsPage() {
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
                  Events
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Stay connected with our community programs, educational
                  activities, and cultural celebrations
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className='py-16'>
            <div className='container mx-auto px-4'>
              <div className='max-w-6xl mx-auto'>
                <InViewAnimation>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-8 text-center'>
                    Upcoming Events
                  </h2>
                </InViewAnimation>

                <div className='grid gap-6'>
                  {upcomingEvents.map((event, index) => (
                    <InViewAnimation key={event.id} delay={index * 0.1}>
                      <Card className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'>
                        <CardContent className='p-6'>
                          {/* Event content */}
                        </CardContent>
                      </Card>
                    </InViewAnimation>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Past Events */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <h2 className='font-display text-3xl font-light text-text-primary mb-8 text-center'>
                  Recent Events
                </h2>
              </InViewAnimation>

              <div className='grid gap-8'>
                {pastEvents.map((event, index) => (
                  <InViewAnimation key={event.id} delay={index * 0.1}>
                    <Card
                      className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                        event.featured ? 'ring-2 ring-primary/20' : ''
                      }`}
                    >
                      <CardHeader className='pb-4'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              {event.featured && (
                                <Star className='h-5 w-5 text-yellow-500 fill-current' />
                              )}
                              <span className='px-3 py-1 bg-primary/10 text-primary text-sm rounded-full'>
                                {event.category}
                              </span>
                            </div>
                            <CardTitle className='font-display text-2xl font-light text-text-primary mb-2'>
                              {event.title}
                            </CardTitle>
                            <p className='text-secondary leading-relaxed mb-4'>
                              {event.description}
                            </p>
                          </div>
                          <div className='ml-6'>
                            <Calendar className='h-12 w-12 text-primary/60' />
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-4 text-sm text-secondary'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            {event.date}
                          </div>
                          <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4' />
                            {event.location}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div>
                          <h4 className='font-semibold text-text-primary mb-3'>
                            Event Highlights:
                          </h4>
                          <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {event.highlights.map(
                              (highlight, highlightIndex) => (
                                <li
                                  key={highlightIndex}
                                  className='flex items-center gap-2 text-secondary'
                                >
                                  <div className='w-2 h-2 bg-primary rounded-full flex-shrink-0' />
                                  {highlight}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Calendar className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      More Events Coming Soon
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        We regularly organize community events, educational
                        programs, and cultural celebrations throughout the year.
                      </p>
                      <p>
                        Stay connected with us to be informed about upcoming
                        events and opportunities to participate in our community
                        initiatives.
                      </p>
                      <p className='text-primary font-medium'>
                        Follow our news section for the latest event
                        announcements!
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
                  Join Our Community Events
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Be part of meaningful community development and cultural
                  celebrations
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join Our Team
                  </a>
                  <a
                    href='/contact'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Get Involved
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
