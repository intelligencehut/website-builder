import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'ছবির সংগ্রহ - আর্কাইভস',
  description:
    'SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ছবির সংগ্রহ। স্বামী বিবেকানন্দের আদর্শে পরিচালিত সমাজসেবামূলক কর্মকাণ্ডের স্মৃতি।',
  keywords: [
    'ছবির সংগ্রহ',
    'SEVAA photos',
    'photo gallery',
    'project photos',
    'activities gallery',
    'স্বামী বিবেকানন্দ',
    'সমাজসেবা',
    'আর্কাইভস',
  ],
  url: '/archives/photos',
});

// Define photo categories and their data
const photoCategories = [
  {
    id: 'project-wise',
    title: 'প্রকল্প ভিত্তিক ছবি',
    description: 'বিভিন্ন প্রকল্পের কার্যক্রমের ছবি',
    photos: [
      {
        src: '/images/events/1.jpg',
        alt: 'সপরমবেড়া প্রকল্পের কার্যক্রম',
        caption: 'সপরমবেড়া গ্রামে শিক্ষা কার্যক্রম',
      },
      {
        src: '/images/events/2.jpg',
        alt: 'উখরা প্রকল্পের কার্যক্রম',
        caption: 'উখরা নবদিশা প্রকল্প',
      },
      {
        src: '/images/events/3.jpg',
        alt: 'এলাচী প্রকল্পের কার্যক্রম',
        caption: 'এলাচী গ্রামে স্বাস্থ্য শিবির',
      },
      {
        src: '/images/gallery/gallery-1.jpg',
        alt: 'শিক্ষা সহায়তা প্রদান',
        caption: 'মেধাবী ছাত্রছাত্রীদের শিক্ষা সহায়তা',
      },
      {
        src: '/images/gallery/gallery-2.jpg',
        alt: 'স্বাস্থ্য সেবা কার্যক্রম',
        caption: 'গ্রামীণ এলাকায় স্বাস্থ্য সেবা',
      },
      {
        src: '/images/gallery/11.jpg',
        alt: 'কমিউনিটি প্রোগ্রাম',
        caption: 'সমাজভিত্তিক উন্নয়ন কর্মসূচি',
      },
    ],
  },
  {
    id: 'general-photos',
    title: 'সাধারণ ছবি',
    description: 'SEVAA এর নানান অনুষ্ঠান ও সভার ছবি',
    photos: [
      {
        src: '/images/userfiles/image/photo 1.jpg',
        alt: 'বেলুড় মঠে প্রাক্তন ছাত্র সমাবেশ',
        caption: 'বেলুড় মঠে প্রাক্তন ছাত্র সমাবেশ - SEVAA এর সূচনা',
      },
      {
        src: '/images/gallery/33.jpg',
        alt: 'SEVAA সদস্যদের সভা',
        caption: 'SEVAA সদস্যদের বার্ষিক সভা',
      },
      {
        src: '/images/gallery/44.jpg',
        alt: 'স্বেচ্ছাসেবকদের প্রশিক্ষণ',
        caption: 'স্বেচ্ছাসেবকদের প্রশিক্ষণ কর্মসূচি',
      },
      {
        src: '/images/gallery/55.jpg',
        alt: 'সাংস্কৃতিক অনুষ্ঠান',
        caption: 'SEVAA আয়োজিত সাংস্কৃতিক অনুষ্ঠান',
      },
      {
        src: '/images/gallery/66.jpg',
        alt: 'পুরস্কার বিতরণী',
        caption: 'মেধাবী ছাত্রছাত্রীদের পুরস্কার বিতরণী',
      },
      {
        src: '/images/gallery/77.jpg',
        alt: 'দাতাদের সম্মাননা',
        caption: 'দাতা ও শুভানুধ্যায়ীদের সম্মাননা অনুষ্ঠান',
      },
    ],
  },
];

export default function ArchivesPhotosPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  ছবির সংগ্রহ
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  SEVAA এর কার্যক্রম ও প্রকল্পসমূহের স্মৃতি
                </p>
                <nav className='flex justify-center items-center space-x-2 text-sm text-secondary'>
                  <Link
                    href='/'
                    className='hover:text-primary transition-colors'
                  >
                    প্রধান পৃষ্ঠা
                  </Link>
                  <span>/</span>
                  <span className='text-primary'>আর্কাইভস</span>
                  <span>/</span>
                  <span className='text-primary'>ছবির সংগ্রহ</span>
                </nav>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Photo Gallery Sections */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-7xl mx-auto'>
              {photoCategories.map((category, categoryIndex) => (
                <InViewAnimation key={category.id} delay={categoryIndex * 0.2}>
                  <div className='mb-16'>
                    <div className='text-center mb-8'>
                      <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-4'>
                        {category.title}
                      </h2>
                      <p className='text-lg text-secondary leading-relaxed'>
                        {category.description}
                      </p>
                    </div>

                    {/* Photo Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {category.photos.map((photo, photoIndex) => (
                        <InViewAnimation
                          key={photoIndex}
                          delay={(photoIndex % 3) * 0.1}
                        >
                          <Card className='group overflow-hidden bg-white border border-border shadow-md hover:shadow-lg transition-all duration-300'>
                            <div className='relative h-64 overflow-hidden'>
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform duration-300'
                                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                              />
                              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
                            </div>
                            <CardContent className='p-4'>
                              <p className='text-sm text-secondary text-center leading-relaxed'>
                                {photo.caption}
                              </p>
                            </CardContent>
                          </Card>
                        </InViewAnimation>
                      ))}
                    </div>
                  </div>
                </InViewAnimation>
              ))}

              {/* Call to Action */}
              <InViewAnimation>
                <Card className='bg-accent border border-primary/20 shadow-md'>
                  <CardContent className='p-8 text-center'>
                    <h3 className='font-display text-2xl md:text-3xl font-light text-text-primary mb-4'>
                      আরও ছবি দেখতে চান?
                    </h3>
                    <p className='text-base text-secondary mb-6 leading-relaxed'>
                      SEVAA এর সর্বশেষ কার্যক্রম ও প্রকল্পের আপডেট পেতে আমাদের
                      সোশ্যাল মিডিয়া পেজ ফলো করুন।
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                      <a
                        href='https://www.facebook.com/sevaa2023'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300 text-sm'
                      >
                        Facebook
                      </a>
                      <a
                        href='/contact'
                        className='inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-2 rounded-md hover:bg-primary-light transition-colors duration-300 text-sm'
                      >
                        যোগাযোগ করুন
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
