'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { GalleryImage, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: '/images/gallery/11.jpg',
    alt: 'SEVAA Community Work',
    title: 'Community Engagement',
  },
  {
    id: 2,
    src: '/images/gallery/33.jpg',
    alt: 'Educational Program',
    title: 'Educational Initiative',
  },
  {
    id: 3,
    src: '/images/gallery/44.jpg',
    alt: 'Healthcare Initiative',
    title: 'Healthcare Program',
  },
  {
    id: 4,
    src: '/images/gallery/55.jpg',
    alt: 'Livelihood Program',
    title: 'Livelihood Development',
  },
  {
    id: 5,
    src: '/images/gallery/66.jpg',
    alt: 'Environmental Activity',
    title: 'Environmental Protection',
  },
  {
    id: 6,
    src: '/images/gallery/77.jpg',
    alt: 'Community Service',
    title: 'Community Service',
  },
];

interface Props {
  header?: SectionHeader;
  images?: GalleryImage[];
}

export function GallerySection({ header, images = DEFAULT_GALLERY_IMAGES }: Props) {
  return (
    <section id='gallery' className='py-20 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
              Gallery
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Witness the impact of our work through these moments captured from
              our various programs and initiatives
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {images.map(image => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className='relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                    <div className='relative aspect-square'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center'>
                        <div className='text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <h3 className='text-lg font-semibold mb-2'>
                            {image.title}
                          </h3>
                          <p className='text-sm'>Click to view</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-[90vw] w-[90vw] max-h-[90vh] p-6 sm:max-w-6xl'>
                  <DialogTitle className='sr-only'>{image.title}</DialogTitle>
                  <DialogDescription className='sr-only'>
                    {image.alt}
                  </DialogDescription>
                  <div className='flex flex-col space-y-4'>
                    <div className='relative flex justify-center'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className='max-w-full max-h-[75vh] object-contain rounded-lg'
                        priority
                      />
                    </div>
                    <div className='text-center'>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
