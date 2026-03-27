'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Layout } from '@/components/layout';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { SectionLoader } from '@/components/common/SectionLoader';
import { HeroCarousel } from '@/components/sections';
import Image from 'next/image';

// Lazy load sections
const ImpactSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ImpactSection })), { loading: () => <SectionLoader /> });
const ProgramsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ProgramsSection })), { loading: () => <SectionLoader /> });
const UpcomingEventsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.UpcomingEventsSection })), { loading: () => <SectionLoader /> });
const TestimonialsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.TestimonialsSection })), { loading: () => <SectionLoader /> });
const TeamSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.TeamSection })), { loading: () => <SectionLoader /> });
const BlessingLettersSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.BlessingLettersSection })), { loading: () => <SectionLoader /> });
const GallerySection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.GallerySection })), { loading: () => <SectionLoader /> });
const NewsSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.NewsSection })), { loading: () => <SectionLoader /> });
const JoinUs = dynamic(() => import('@/components/sections/JoinUs').then(mod => ({ default: mod.JoinUs })), { loading: () => <SectionLoader /> });
const ResourcesSection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ResourcesSection })), { loading: () => <SectionLoader /> });

// Default hero text (fallback when no DB content)
const DEFAULT_HERO = {
  heading: 'Society for Envisioning Vivekananda',
  headingHighlight: 'in Awareness and Action',
  subtitle: "We're a non government philanthropic organisation.",
  description: 'Inspired by the ideals of Thakur-Maa-Swamiji. Our organisation SEVAA dedicates itself to work among the underprivileged section of our society in the areas of Education, Health, Livelihood, Relief, Culture and Environment in the true spirit of "Shiv Gyane Jeev Seva" as espoused by Swamiji.',
  primaryCtaLabel: 'Explore Our Impact',
  primaryCtaTarget: 'impact',
  secondaryCtaLabel: 'Our Programs',
  secondaryCtaTarget: 'programs',
};

const DEFAULT_MISSION = {
  heading: 'Our Mission',
  subtitle: 'Empowering communities through service and compassion',
  description: 'We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.',
  commitments: [
    'Equity, Diversity, and Inclusion',
    'Collaboration & Community Engagement',
    'Building self confidence within the community',
    'Shared Commitment',
    'Responsibility & Accountability',
    'Respect, Mutual Trust and Compassion',
    'Integrity in everything we do',
  ],
  image: '/images/events/1.jpg',
};

interface HomeClientProps {
  content: Record<string, unknown> | null;
}

export function HomeClient({ content }: HomeClientProps) {
  const heroText = (content?.heroText as typeof DEFAULT_HERO) || DEFAULT_HERO;
  const mission = (content?.mission as typeof DEFAULT_MISSION) || DEFAULT_MISSION;

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.getElementById(window.location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        id='home'
        className='flex items-center justify-center bg-gradient-to-br from-orange-50 to-white relative overflow-hidden py-20'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-white/95 to-orange-50/90 z-10'></div>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
                  {heroText.heading}
                  <span className='text-orange-600 block'>
                    {heroText.headingHighlight}
                  </span>
                </h1>
                <p className='text-xl md:text-2xl text-gray-700 leading-relaxed'>
                  {heroText.subtitle}
                </p>
                <p className='text-xl md:text-2xl text-gray-700 leading-relaxed'>
                  {heroText.description}
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <AnimatedButton
                  variant='primary'
                  size='lg'
                  onClick={() =>
                    document
                      .getElementById(heroText.primaryCtaTarget)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {heroText.primaryCtaLabel}
                </AnimatedButton>
                <AnimatedButton
                  variant='secondary'
                  size='lg'
                  onClick={() =>
                    document
                      .getElementById(heroText.secondaryCtaTarget)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {heroText.secondaryCtaLabel}
                </AnimatedButton>
              </div>
            </div>
            <div className='relative h-[350px] lg:h-[450px]'>
              <div className='relative rounded-2xl overflow-hidden shadow-2xl h-full'>
                <HeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id='mission' className='py-20 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
                  {mission.heading}
                </h2>
                <p className='text-lg text-gray-600'>
                  {mission.subtitle}
                </p>
              </div>
              <div className='space-y-6'>
                <p className='text-lg text-gray-700 leading-relaxed'>
                  {mission.description}
                </p>
                <h4 className='text-xl font-semibold text-gray-900'>
                  We are committed to:
                </h4>
                <ul className='space-y-2 text-gray-700'>
                  {mission.commitments.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='relative'>
              <div className='rounded-2xl overflow-hidden shadow-xl'>
                <Image
                  src={mission.image}
                  alt={`${mission.heading} - SEVAA`}
                  width={600}
                  height={500}
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImpactSection />
      <ProgramsSection />
      <TestimonialsSection />
      <TeamSection />
      <BlessingLettersSection />
      <GallerySection />
      <NewsSection />
      <UpcomingEventsSection />
      <JoinUs />
      <ResourcesSection />
    </Layout>
  );
}
