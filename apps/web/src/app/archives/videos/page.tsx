import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'ভিডিও সংগ্রহ - আর্কাইভস',
  description:
    'SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ভিডিও সংগ্রহ শীঘ্রই আসছে। স্বামী বিবেকানন্দের আদর্শে পরিচালিত সমাজসেবামূলক কর্মকাণ্ডের ভিডিও ডকুমেন্টারি।',
  keywords: [
    'ভিডিও সংগ্রহ',
    'SEVAA videos',
    'video gallery',
    'project videos',
    'documentary',
    'activities video',
    'স্বামী বিবেকানন্দ',
    'সমাজসেবা',
    'আর্কাইভস',
    'আসছে শীঘ্রই',
  ],
  url: '/archives/videos',
});

export default function ArchivesVideosPage() {
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
                  ভিডিও সংগ্রহ
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ভিডিও ডকুমেন্টারি
                </p>
                <nav className='flex justify-center items-center space-x-2 text-sm text-secondary'>
                  <Link
                    href='/'
                    className='hover:text-primary transition-colors'
                  >
                    প্রধান পৃষ্ঠা
                  </Link>
                  <span>/</span>
                  <Link
                    href='/archives'
                    className='hover:text-primary transition-colors'
                  >
                    আর্কাইভস
                  </Link>
                  <span>/</span>
                  <span className='text-primary'>ভিডিও সংগ্রহ</span>
                </nav>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Coming Soon Main Section */}
        <section className='py-16'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 mb-12'>
                  <CardContent className='p-12 text-center'>
                    {/* Coming Soon Icon */}
                    <div className='mb-8'>
                      <div className='inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6'>
                        <svg
                          className='w-12 h-12 text-primary'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1.5}
                            d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                    </div>

                    <h2 className='font-display text-4xl md:text-5xl font-light text-text-primary mb-6'>
                      ভিডিও সংগ্রহ শীঘ্রই আসছে
                    </h2>

                    <p className='text-xl text-secondary leading-relaxed mb-8 max-w-2xl mx-auto'>
                      SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ভিডিও সংগ্রহ শীঘ্রই এই
                      পাতায় পাওয়া যাবে।
                    </p>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Subscribe for Updates Section */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white border border-border shadow-md'>
                  <CardContent className='p-8 text-center'>
                    <h3 className='font-display text-2xl md:text-3xl font-light text-text-primary mb-4'>
                      আপডেট পেতে চান?
                    </h3>
                    <p className='text-base text-secondary mb-6 leading-relaxed max-w-2xl mx-auto'>
                      SEVAA এর সর্বশেষ আপডেট পেতে আমাদের সোশ্যাল মিডিয়া পেজ ফলো
                      করুন।
                    </p>

                    <div className='flex flex-wrap justify-center gap-4 mb-6'>
                      <a
                        href='https://www.facebook.com/sevaa2023'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                        Facebook ফলো করুন
                      </a>

                      <a
                        href='/contact'
                        className='inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-md hover:bg-primary-light transition-colors duration-300'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                        যোগাযোগ করুন
                      </a>
                    </div>

                    {/* Alternative Content */}
                    <div className='pt-6 border-t border-border'>
                      <p className='text-sm text-secondary mb-4'>
                        <strong>এই মুহূর্তে দেখতে পারেন:</strong>
                      </p>
                      <div className='flex flex-wrap justify-center gap-3'>
                        <Link
                          href='/archives/photos'
                          className='inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          ছবির সংগ্রহ
                        </Link>
                        <span className='text-secondary'>•</span>
                        <Link
                          href='/publications'
                          className='inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                            />
                          </svg>
                          প্রকাশনা
                        </Link>
                        <span className='text-secondary'>•</span>
                        <Link
                          href='/news'
                          className='inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15'
                            />
                          </svg>
                          সংবাদ
                        </Link>
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
