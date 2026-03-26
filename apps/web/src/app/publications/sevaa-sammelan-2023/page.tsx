import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { BookOpen, Users, Calendar, MapPin, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sevaa Sammelan 2023 - SEVAA',
  description:
    'Documentation of SEVAA Sammelan 2023, a gathering of members, stakeholders, and well-wishers to discuss progress and future plans.',
  keywords: [
    'sevaa sammelan 2023',
    'annual gathering',
    'community meeting',
    'stakeholder conference',
    'organizational review',
    'future planning',
  ],
  url: '/publications/sevaa-sammelan-2023',
});

const sammelanHighlights = [
  {
    title: 'Annual Review',
    description:
      'Comprehensive review of SEVAA activities and achievements in 2023.',
    icon: BookOpen,
  },
  {
    title: 'Stakeholder Engagement',
    description:
      'Interactive sessions with community members, partners, and supporters.',
    icon: Users,
  },
  {
    title: 'Future Planning',
    description:
      'Strategic planning discussions for upcoming projects and initiatives.',
    icon: Award,
  },
];

export default function SevaasammelanPage() {
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
                  Sevaa Sammelan 2023
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Annual gathering bringing together our community for
                  reflection, planning, and collaboration
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    2023
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    SEVAA Community Center
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
                        The Sevaa Sammelan 2023 was a significant milestone in
                        our organizational journey, bringing together members,
                        stakeholders, and well-wishers to reflect on our
                        achievements and chart the course for future endeavors.
                      </p>

                      <div className='bg-accent/20 p-6 rounded-lg mb-8'>
                        <h3 className='text-xl font-semibold text-text-primary mb-3'>
                          A Gathering of Purpose
                        </h3>
                        <p className='text-secondary leading-relaxed'>
                          This annual conference served as a platform for
                          meaningful dialogue, transparent reporting, and
                          collaborative planning, reinforcing our commitment to
                          community development and sustainable impact.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Sammelan Highlights */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Sammelan Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      {sammelanHighlights.map((highlight, index) => (
                        <div
                          key={index}
                          className='bg-accent/20 p-6 rounded-lg'
                        >
                          <div className='flex items-start gap-4'>
                            <div className='bg-white p-3 rounded-lg shadow-sm'>
                              <highlight.icon className='h-6 w-6 text-primary' />
                            </div>
                            <div className='flex-1'>
                              <h4 className='text-lg font-semibold text-text-primary mb-2'>
                                {highlight.title}
                              </h4>
                              <p className='text-secondary'>
                                {highlight.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Documentation */}
              <InViewAnimation delay={0.3}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Sammelan Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-center py-12'>
                      <BookOpen className='h-16 w-16 text-secondary mx-auto mb-4' />
                      <p className='text-secondary mb-4'>
                        Complete documentation of Sevaa Sammelan 2023
                        proceedings
                      </p>
                      <p className='text-sm text-secondary'>
                        Comprehensive record of discussions, presentations,
                        resolutions, and action plans from our annual gathering.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
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
                    <Award className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Sammelan Documentation Available Soon
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        We are compiling comprehensive documentation from Sevaa
                        Sammelan 2023, including proceedings, presentations, and
                        outcomes.
                      </p>
                      <p>
                        The complete report will include participant feedback,
                        strategic decisions, and actionable plans for community
                        development initiatives.
                      </p>
                      <p className='text-primary font-medium'>
                        Check back soon for the complete Sammelan documentation!
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
                  Be Part of Future Sammelans
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Join our annual gatherings and contribute to community
                  development planning
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join SEVAA
                  </a>
                  <a
                    href='/annual-reports'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    View Annual Reports
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
