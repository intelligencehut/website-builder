import { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Camera, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Photo Gallery - SEVAA',
  description:
    'Browse through our photo gallery showcasing SEVAA projects, community activities, school events, and developmental work across rural areas.',
  keywords: [
    'photo gallery',
    'sevaa photos',
    'community projects',
    'school events',
    'rural development',
    'agriculture development',
    'educational activities',
  ],
  url: '/gallery/photos',
});

const photoGalleries = [
  {
    id: 'saparambera-agriculture',
    title: 'Agriculture Development Meeting',
    subtitle:
      'Asst. District Agriculture Officer discussed with Saparambera villagers',
    description:
      'Important discussion session between the Assistant District Agriculture Officer and villagers of Saparambera regarding agricultural development initiatives and modern farming techniques.',
    location: 'Saparambera Village',
    date: '2025',
    category: 'Agriculture Development',
    photos: [
      {
        src: '/images/gallery/1.jpg',
        alt: 'Agriculture officer discussing with villagers - Group discussion',
        title: 'Community Agriculture Discussion',
      },
      {
        src: '/images/gallery/2.jpg',
        alt: 'Agriculture officer explaining farming techniques',
        title: 'Agricultural Training Session',
      },
      {
        src: '/images/gallery/3.jpg',
        alt: 'Villagers listening to agriculture guidance',
        title: 'Community Engagement',
      },
    ],
  },
  {
    id: 'school-events',
    title: 'School Activities',
    subtitle: 'TMSVV School Events and Activities',
    description:
      'Various events and activities from Tilka Murmu SEVAA Vana Vidyalaya showcasing student engagement and educational programs.',
    location: 'TMSVV School',
    date: '2025',
    category: 'Education',
    photos: [
      {
        src: '/images/events/TMSVV Students are taking Lessons in Classroom.png',
        alt: 'TMSVV students learning in classroom',
        title: 'Classroom Learning',
      },
      {
        src: '/images/events/Students are playing Football at School Campus.png',
        alt: 'Students playing football at school campus',
        title: 'Sports Activities',
      },
      {
        src: '/images/events/Swamijis Felicitated the TMSVV School Teachers.png',
        alt: 'Swamijis felicitating TMSVV school teachers',
        title: 'Teacher Recognition',
      },
      {
        src: '/images/events/SEVAA Members and Guests concluded the School Opening ceremony.png',
        alt: 'SEVAA members and guests at school opening ceremony conclusion',
        title: 'Opening Ceremony',
      },
      {
        src: '/images/events/SP-Purulia and DSP-Jhalda took lunch with School Children.png',
        alt: 'SP-Purulia and DSP-Jhalda having lunch with school children',
        title: 'Community Bonding',
      },
    ],
  },
  {
    id: 'community-events',
    title: 'Community Celebrations',
    subtitle: 'Festivals and Cultural Events',
    description:
      'Community celebrations, festivals, and cultural events organized by SEVAA and local communities.',
    location: 'Various Locations',
    date: '2025',
    category: 'Community',
    photos: [
      {
        src: '/images/events/ServicePlace USA organized Health Camp arranged by Primary Health Centre Inaugurated on 10th March,2025.png',
        alt: 'Health camp inauguration organized by ServicePlace USA on 10th March, 2025',
        title: 'Health Camp Inauguration',
      },
    ],
  },
];

export default function PhotoGalleryPage() {
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
                  Photo Gallery
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Capturing moments from our community development initiatives
                  and educational programs
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Photo Galleries */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <div className='grid gap-8'>
                {photoGalleries.map((gallery, index) => (
                  <InViewAnimation key={gallery.id} delay={index * 0.1}>
                    <Card className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'>
                      <CardHeader className='pb-4'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <CardTitle className='font-display text-2xl font-light text-text-primary mb-2'>
                              {gallery.title}
                            </CardTitle>
                            <p className='text-lg text-primary font-medium mb-3'>
                              {gallery.subtitle}
                            </p>
                            <p className='text-secondary leading-relaxed mb-4'>
                              {gallery.description}
                            </p>
                          </div>
                          <div className='ml-6'>
                            <Camera className='h-12 w-12 text-primary/60' />
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-4 text-sm text-secondary'>
                          <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4' />
                            {gallery.location}
                          </div>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            {gallery.date}
                          </div>
                          <div className='flex items-center gap-2'>
                            <Users className='h-4 w-4' />
                            {gallery.category}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        {gallery.photos.length > 0 ? (
                          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {gallery.photos.map((photo, photoIndex) => (
                              <div
                                key={photoIndex}
                                className='relative aspect-square bg-accent rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group'
                                title={photo.title}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  fill
                                  sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
                                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className='text-center py-12'>
                            <Camera className='h-16 w-16 text-secondary mx-auto mb-4' />
                            <p className='text-secondary'>
                              Photos will be added soon
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
                    <Camera className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      More Photos Coming Soon
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        We are continuously documenting our community
                        development work, educational initiatives, and cultural
                        events.
                      </p>
                      <p>
                        Check back regularly to see new photos from our ongoing
                        projects and community activities across rural areas.
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
                  Support Our Documentation Efforts
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Help us document and share the impact of our community work
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
