'use client';

import { useEffect } from 'react';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { HeroCarousel } from '@/components/sections';
import { EditableSection, EditModeBar } from '@/components/edit-mode';
import Image from 'next/image';

// Lazy load sections to keep bundle small
import dynamic from 'next/dynamic';
import { SectionLoader } from '@/components/common/SectionLoader';
const ImpactSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.ImpactSection })), { loading: () => <SectionLoader /> });
const ProgramsSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.ProgramsSection })), { loading: () => <SectionLoader /> });
const TestimonialsSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.TestimonialsSection })), { loading: () => <SectionLoader /> });
const TeamSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.TeamSection })), { loading: () => <SectionLoader /> });
const BlessingLettersSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.BlessingLettersSection })), { loading: () => <SectionLoader /> });
const GallerySection = dynamic(() => import('@/components/sections').then(m => ({ default: m.GallerySection })), { loading: () => <SectionLoader /> });
const NewsSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.NewsSection })), { loading: () => <SectionLoader /> });
const UpcomingEventsSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.UpcomingEventsSection })), { loading: () => <SectionLoader /> });
const JoinUs = dynamic(() => import('@/components/sections/JoinUs').then(m => ({ default: m.JoinUs })), { loading: () => <SectionLoader /> });
const ResourcesSection = dynamic(() => import('@/components/sections').then(m => ({ default: m.ResourcesSection })), { loading: () => <SectionLoader /> });

interface HomeTemplateProps {
  content: Record<string, unknown> | null;
}

export function HomeTemplate({ content }: HomeTemplateProps) {
  const heroText = content?.heroText as { heading?: string; headingHighlight?: string; subtitle?: string; description?: string; primaryCtaLabel?: string; primaryCtaTarget?: string; secondaryCtaLabel?: string; secondaryCtaTarget?: string } | undefined;
  const mission = content?.mission as { heading?: string; subtitle?: string; description?: string; commitments?: string[]; image?: string } | undefined;
  const heroSlides = (content?.hero as { slides?: unknown[] })?.slides;

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        document.getElementById(window.location.hash.substring(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <EditModeBar />

      {/* Hero Section */}
      <EditableSection sectionId="heroText" label="Hero Text">
        <section id="home" className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-white relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-orange-50/90 z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  {heroText?.heading && (
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {heroText.heading}
                      {heroText.headingHighlight && (
                        <span className="text-orange-600 block">{heroText.headingHighlight}</span>
                      )}
                    </h1>
                  )}
                  {heroText?.subtitle && (
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{heroText.subtitle}</p>
                  )}
                  {heroText?.description && (
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{heroText.description}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  {heroText?.primaryCtaLabel && (
                    <AnimatedButton variant="primary" size="lg"
                      onClick={() => document.getElementById(heroText.primaryCtaTarget || 'impact')?.scrollIntoView({ behavior: 'smooth' })}>
                      {heroText.primaryCtaLabel}
                    </AnimatedButton>
                  )}
                  {heroText?.secondaryCtaLabel && (
                    <AnimatedButton variant="secondary" size="lg"
                      onClick={() => document.getElementById(heroText.secondaryCtaTarget || 'programs')?.scrollIntoView({ behavior: 'smooth' })}>
                      {heroText.secondaryCtaLabel}
                    </AnimatedButton>
                  )}
                </div>
              </div>
              <div className="relative h-[350px] lg:h-[450px]">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
                  <HeroCarousel slides={heroSlides as Parameters<typeof HeroCarousel>[0]['slides']} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* Mission Section */}
      {mission && (
        <EditableSection sectionId="mission" label="Mission">
          <section id="mission" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    {mission.heading && <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{mission.heading}</h2>}
                    {mission.subtitle && <p className="text-lg text-gray-600">{mission.subtitle}</p>}
                  </div>
                  <div className="space-y-6">
                    {mission.description && <p className="text-lg text-gray-700 leading-relaxed">{mission.description}</p>}
                    {mission.commitments && mission.commitments.length > 0 && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-900">We are committed to:</h4>
                        <ul className="space-y-2 text-gray-700">
                          {mission.commitments.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                {mission.image && (
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image src={mission.image} alt={mission.heading || ''} width={600} height={500} className="object-cover w-full h-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Dynamic sections — only render if content exists */}
      <EditableSection sectionId="impact" label="Impact"><ImpactSection /></EditableSection>
      <EditableSection sectionId="programs" label="Programs"><ProgramsSection /></EditableSection>
      <EditableSection sectionId="testimonials" label="Testimonials"><TestimonialsSection /></EditableSection>
      <EditableSection sectionId="team" label="Team"><TeamSection /></EditableSection>
      <EditableSection sectionId="blessingLetters" label="Blessings"><BlessingLettersSection /></EditableSection>
      <EditableSection sectionId="gallery" label="Gallery"><GallerySection /></EditableSection>
      <EditableSection sectionId="news" label="News"><NewsSection /></EditableSection>
      <EditableSection sectionId="events" label="Events"><UpcomingEventsSection /></EditableSection>
      <EditableSection sectionId="joinUs" label="Join Us"><JoinUs /></EditableSection>
      <EditableSection sectionId="resources" label="Resources"><ResourcesSection /></EditableSection>
    </>
  );
}
