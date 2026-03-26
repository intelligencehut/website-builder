import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'আর্কাইভস - SEVAA',
  description:
    'SEVAA এর কার্যক্রম, প্রকল্প ও অনুষ্ঠানসমূহের ছবি, ভিডিও ও ডকুমেন্টের সংরক্ষণাগার।',
  keywords: [
    'আর্কাইভস',
    'SEVAA archives',
    'photo gallery',
    'videos',
    'documents',
    'প্রকল্প',
    'কার্যক্রম',
    'স্মৃতি',
  ],
  url: '/archives',
});

const archiveCategories = [
  {
    title: 'ছবির সংগ্রহ',
    description: 'SEVAA এর বিভিন্ন প্রকল্প ও কার্যক্রমের ছবির সংগ্রহ',
    href: '/archives/photos',
    image: '/images/gallery/gallery-1.jpg',
    itemCount: '50+ ছবি',
    categories: ['প্রকল্প ভিত্তিক ছবি', 'সাধারণ ছবি', 'অনুষ্ঠানের ছবি'],
  },
  {
    title: 'ভিডিও সংগ্রহ',
    description: 'কার্যক্রম ও সাক্ষাৎকারের ভিডিও সংগ্রহ',
    href: '/archives/videos',
    image: '/images/events/2.jpg',
    itemCount: '10+ ভিডিও',
    categories: ['কার্যক্রমের ভিডিও', 'সাক্ষাৎকার', 'প্রশিক্ষণ'],
  },
  {
    title: 'প্রকাশনা',
    description: 'বার্ষিক প্রতিবেদন, নিউজলেটার ও অন্যান্য প্রকাশনা',
    href: '/publications',
    image: '/images/about/about-2.jpg',
    itemCount: '20+ প্রকাশনা',
    categories: ['বার্ষিক প্রতিবেদন', 'নিউজলেটার', 'বিশেষ প্রকাশনা'],
  },
  {
    title: 'সাধারণ আর্কাইভ',
    description: 'পূর্ববর্তী উপদেষ্টা পরিষদ ও অন্যান্য ঐতিহাসিক তথ্য',
    href: '/archives/general',
    image: '/images/gallery/gallery-1.jpg',
    itemCount: 'ঐতিহাসিক তথ্য',
    categories: ['উপদেষ্টা পরিষদ', 'প্রাথমিক পর্যায়', 'সাংগঠনিক ইতিহাস'],
  },
];

export default function ArchivesPage() {
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
                  আর্কাইভস
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  SEVAA এর কার্যক্রম ও প্রকল্পসমূহের স্মৃতিসংরক্ষণাগার
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
                </nav>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Archive Categories Section */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-10'>
                  <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-4'>
                    সংরক্ষণাগারের বিভাগসমূহ
                  </h2>
                  <p className='text-lg text-secondary leading-relaxed max-w-3xl mx-auto'>
                    SEVAA এর যাত্রা শুরু থেকে আজ পর্যন্ত সকল কার্যক্রম, প্রকল্প
                    ও অনুষ্ঠানের স্মৃতি সংরক্ষিত রয়েছে এই আর্কাইভে।
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {archiveCategories.map((category, index) => (
                  <InViewAnimation key={index} delay={index * 0.2}>
                    <Link href={category.href}>
                      <Card className='group h-full bg-white border border-border shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden'>
                        {/* Image Header */}
                        <div className='relative h-48 overflow-hidden'>
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                          <div className='absolute bottom-4 left-4 right-4'>
                            <div className='inline-flex items-center px-3 py-1 bg-white/90 text-primary text-sm rounded-full'>
                              {category.itemCount}
                            </div>
                          </div>
                        </div>

                        <CardHeader className='pb-4'>
                          <CardTitle className='text-xl font-medium text-text-primary group-hover:text-primary transition-colors'>
                            {category.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className='pt-0 pb-6'>
                          <p className='text-secondary mb-4 leading-relaxed'>
                            {category.description}
                          </p>

                          {/* Category Tags */}
                          <div className='space-y-2'>
                            <p className='text-sm font-medium text-text-primary'>
                              অন্তর্ভুক্ত:
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              {category.categories.map((cat, catIndex) => (
                                <span
                                  key={catIndex}
                                  className='text-xs bg-accent text-secondary px-2 py-1 rounded-full'
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Arrow Indicator */}
                          <div className='mt-4 flex items-center text-primary text-sm group-hover:translate-x-1 transition-transform'>
                            <span>বিস্তারিত দেখুন</span>
                            <svg
                              className='w-4 h-4 ml-2'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 5l7 7-7 7'
                              />
                            </svg>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </InViewAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Updates Section */}
        <section className='py-10 bg-accent/30'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md'>
                  <CardContent className='p-8'>
                    <h3 className='font-display text-2xl md:text-3xl font-light text-text-primary mb-6 text-center'>
                      সাম্প্রতিক সংযোজন
                    </h3>

                    <div className='grid md:grid-cols-2 gap-8'>
                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          নতুন ছবি সংযোজিত হয়েছে:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full'></div>
                            <span>
                              সপরমবেড়া প্রকল্পের সাম্প্রতিক কার্যক্রম
                            </span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full'></div>
                            <span>উখরা নবদিশা প্রকল্পের ছবি</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full'></div>
                            <span>স্বাস্থ্য শিবিরের ছবি</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          আসছে শীঘ্রই:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full'></div>
                            <span>বার্ষিক প্রতিবেদন ২০২৪</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full'></div>
                            <span>প্রকল্প ভিত্তিক ভিডিও ডকুমেন্টারি</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full'></div>
                            <span>স্বেচ্ছাসেবকদের সাক্ষাৎকার</span>
                          </li>
                        </ul>
                      </div>
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
