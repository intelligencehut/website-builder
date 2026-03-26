'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import type { CarouselSlide } from '@website-builder/content-schema';

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    src: '/images/about/about-2.jpg',
    alt: 'SEVAA Mission and Values',
    title: 'Inspired by Thakur-Maa-Swamiji',
    description: 'Working among the underprivileged section of society',
  },
  {
    src: '/images/gallery/gallery-1.jpg',
    alt: 'SEVAA Gallery Image 1',
    title: 'Education & Awareness',
    description: 'Quality education to the underprivileged',
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    alt: 'SEVAA Gallery Image 2',
    title: 'Community Service',
    description: 'Serving humanity with compassion and care',
  },
  {
    src: '/images/events/2.jpg',
    alt: 'SEVAA Events Image 2',
  },
  {
    src: '/images/events/3.jpg',
    alt: 'SEVAA Events Image 3',
  },
];

interface HeroCarouselProps {
  slides?: CarouselSlide[];
}

export function HeroCarousel({ slides = DEFAULT_SLIDES }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='relative w-full h-full'>
      <Carousel
        setApi={setApi}
        className='w-full h-full'
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((image, index) => (
            <CarouselItem key={index}>
              <div className='relative w-full h-full min-h-[350px] lg:min-h-[450px]'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='object-cover rounded-2xl'
                  priority={index === 0}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {/* Text overlay with strong background */}
                {false && image.title && (
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl'>
                    <div className='absolute bottom-6 left-6 right-6'>
                      <div className='bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20'>
                        <h3 className='text-white text-lg font-bold mb-1 drop-shadow-lg'>
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className='text-white text-sm font-medium drop-shadow-md'>
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-white/80 hover:bg-white text-gray-800 border-0 shadow-lg' />
        <CarouselNext className='right-4 bg-white/80 hover:bg-white text-gray-800 border-0 shadow-lg' />
      </Carousel>

      {/* Dots indicator - positioned higher to avoid text overlap */}
      <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10'>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-lg border ${
              index === current - 1
                ? 'bg-white scale-110 border-white'
                : 'bg-white/80 border-white/90 hover:bg-white hover:border-white'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
