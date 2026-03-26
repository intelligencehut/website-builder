'use client';

import Image from 'next/image';
import type { BlessingLetter, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_BLESSING_LETTERS: BlessingLetter[] = [
  {
    title: 'Blessing from Swami Shivapradananda',
    imageSrc: '/images/blessing-letter-shivapradananda.jpg',
    imageAlt: 'Blessing letter from Swami Shivapradananda',
  },
  {
    title: 'Blessing from Swami Suparnanadiji',
    imageSrc: '/images/blessing-letter-suparnanadiji.jpg',
    imageAlt: 'Blessing letter from Swami Suparnanadiji',
  },
];

interface Props {
  header?: SectionHeader;
  items?: BlessingLetter[];
}

export function BlessingLettersSection({ header, items = DEFAULT_BLESSING_LETTERS }: Props) {
  return (
    <section
      id='blessing-letters'
      className='py-24 bg-accent border-b border-primary/20'
    >
      <div className='container mx-auto px-8 md:px-4'>
        <div className='text-center space-y-12'>
          <div className='space-y-6'>
            <h1 className='font-display text-5xl md:text-6xl font-light leading-tight text-text-primary mb-6'>
              Blessing Letters
            </h1>
            <p className='text-xl text-secondary leading-relaxed max-w-3xl mx-auto'>
              Words of encouragement and blessings from spiritual leaders who
              guide our mission
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
            {items.map((letter, index) => (
              <div key={index} className='bg-white border border-border rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <div className='p-6'>
                  <h3 className='text-xl font-medium text-text-primary mb-4 text-center'>
                    {letter.title}
                  </h3>
                  <div className='relative aspect-[3/4] rounded overflow-hidden'>
                    <Image
                      src={letter.imageSrc}
                      alt={letter.imageAlt}
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
