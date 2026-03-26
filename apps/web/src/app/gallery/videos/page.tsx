import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Video, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Video Gallery - SEVAA',
  description:
    'Watch videos of SEVAA projects, community activities, school events, and developmental work across rural areas.',
  keywords: [
    'video gallery',
    'sevaa videos',
    'community projects',
    'school events',
    'rural development',
    'educational activities',
    'documentary videos',
  ],
  url: '/gallery/videos',
});

const videoCategories = [
  {
    id: 'school-activities',
    title: 'School Activities',
    description:
      'Videos from Tilka Murmu SEVAA Vana Vidyalaya showcasing educational programs and student activities.',
    videos: [
      // Video entries will be added when content is available
    ],
  },
  {
    id: 'community-events',
    title: 'Community Events',
    description:
      'Documentation of community celebrations, cultural events, and developmental meetings.',
    videos: [
      // Video entries will be added when content is available
    ],
  },
  {
    id: 'project-documentation',
    title: 'Project Documentation',
    description:
      'Videos documenting our various projects and their impact on rural communities.',
    videos: [
      // Video entries will be added when content is available
    ],
  },
];

export default function VideoGalleryPage() {
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
                  Video Gallery
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Watch our community development initiatives and educational
                  programs in action
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Video Categories */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <div className='grid gap-8'>
                {videoCategories.map((category, index) => (
                  <InViewAnimation key={category.id} delay={index * 0.1}>
                    <Card className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'>
                      <CardHeader className='pb-4'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <CardTitle className='font-display text-2xl font-light text-text-primary mb-2'>
                              {category.title}
                            </CardTitle>
                            <p className='text-secondary leading-relaxed'>
                              {category.description}
                            </p>
                          </div>
                          <div className='ml-6'>
                            <Video className='h-12 w-12 text-primary/60' />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        {category.videos.length > 0 ? (
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {category.videos.map((video, videoIndex) => (
                              <div
                                key={videoIndex}
                                className='group cursor-pointer'
                              >
                                <div className='relative aspect-video bg-accent rounded-lg overflow-hidden hover:shadow-md transition-shadow'>
                                  <div className='w-full h-full bg-accent flex items-center justify-center group-hover:bg-accent/80 transition-colors'>
                                    <Play className='h-12 w-12 text-primary group-hover:scale-110 transition-transform' />
                                  </div>
                                </div>
                                {/* Video title and details would go here */}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className='text-center py-12'>
                            <Video className='h-16 w-16 text-secondary mx-auto mb-4' />
                            <p className='text-secondary'>
                              Videos will be added soon
                            </p>
                          </div>
                        )}
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
                    <Video className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Video Documentation in Progress
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        We are working on creating comprehensive video
                        documentation of our community development work and
                        educational initiatives.
                      </p>
                      <p>
                        Our video gallery will feature documentaries, event
                        coverage, project progress reports, and testimonials
                        from community members.
                      </p>
                      <p className='text-primary font-medium'>
                        Check back soon for inspiring videos from our work!
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
                  Help Us Tell Our Story
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Support our efforts to document and share the impact of
                  community development
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
