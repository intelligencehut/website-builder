'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { InViewAnimation } from '@/components/common';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImageViewerModal } from '@/components/ui/image-viewer-modal';

export default function NostalgicNarendrapurContent() {
  const magazinePages = Array.from({ length: 105 }, (_, i) => i + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (pageNum: number) => {
    setCurrentPage(pageNum);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getImageSrc = (pageNum: number) => {
    const pageStr = pageNum.toString().padStart(4, '0');
    return `/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-${pageStr}.jpg`;
  };

  const getImageAlt = (pageNum: number) => {
    return `Nostalgic Narendrapur Page ${pageNum}`;
  };

  return (
    <>
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  Nostalgic Narendrapur
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  SEVAA&rsquo;s Annual Literary Magazine
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Main Content */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                      Publication and Campaign
                    </h2>

                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        SEVAA has a dedicated Publication Department which keeps
                        on publishing annual magazines, program-based journals
                        and leaflets. Our publications serve as a bridge
                        connecting the past, present, and future of our
                        community while documenting our journey and impact.
                      </p>

                      <div className='bg-accent p-6 rounded-lg border border-primary/20'>
                        <h3 className='text-2xl font-medium text-text-primary mb-4'>
                          About Nostalgic Narendrapur
                        </h3>
                        <p className='mb-4'>
                          <strong>Nostalgic Narendrapur</strong> is
                          SEVAA&rsquo;s flagship annual magazine, primarily an
                          e-magazine featuring literary pieces and comprehensive
                          reports on SEVAA activities. The magazine contains
                          literary contributions from former students of
                          Ramakrishna Mission as well as from outside
                          contributors. Revered Swamijis have also contributed
                          to this magazine, making it a valuable repository of
                          wisdom and experiences.
                        </p>
                        <p>
                          Over the last 3 years, 2 issues of Nostalgic
                          Narendrapur have been successfully published, each
                          capturing the essence of our collective journey and
                          the spirit of service that defines SEVAA.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <div className='mb-16'>
                  <h3 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                    Featured Content
                  </h3>

                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6 text-center'>
                        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg
                            className='w-8 h-8 text-primary'
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
                        </div>
                        <h4 className='text-lg font-medium text-text-primary mb-3'>
                          Literary Pieces
                        </h4>
                        <p className='text-secondary text-sm'>
                          Original literary contributions from RK Mission alumni
                          and distinguished writers
                        </p>
                      </CardContent>
                    </Card>

                    <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6 text-center'>
                        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg
                            className='w-8 h-8 text-primary'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                        </div>
                        <h4 className='text-lg font-medium text-text-primary mb-3'>
                          Activity Reports
                        </h4>
                        <p className='text-secondary text-sm'>
                          Detailed reports on SEVAA&rsquo;s projects and
                          community development initiatives
                        </p>
                      </CardContent>
                    </Card>

                    <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6 text-center'>
                        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg
                            className='w-8 h-8 text-primary'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                        </div>
                        <h4 className='text-lg font-medium text-text-primary mb-3'>
                          Spiritual Guidance
                        </h4>
                        <p className='text-secondary text-sm'>
                          Contributions from revered Swamijis sharing wisdom and
                          spiritual insights
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.4}>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <h3 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                      Latest Issue - Volume 2.0
                    </h3>

                    <div className='text-center mb-8'>
                      <p className='text-secondary text-base font-light leading-relaxed mb-4'>
                        Browse through the complete magazine by clicking on any
                        page below. This issue contains 105 pages of rich
                        content including literary contributions, project
                        reports, and spiritual guidance.
                      </p>
                      <Button
                        variant='outline'
                        className='mb-6 border-primary text-primary hover:bg-primary-light'
                      >
                        Download Full Magazine (PDF)
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                      {magazinePages.map(pageNum => {
                        return (
                          <Card
                            key={pageNum}
                            className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-border rounded-sm py-0'
                            onClick={() => openModal(pageNum)}
                          >
                            <div className='relative h-32'>
                              <Image
                                src={getImageSrc(pageNum)}
                                alt={getImageAlt(pageNum)}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform'
                                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw'
                              />
                              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center'>
                                <span className='text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                                  Page {pageNum}
                                </span>
                              </div>
                            </div>
                            <CardContent className='p-0.05'>
                              <p className='text-xs text-secondary text-center leading-none'>
                                Page {pageNum}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              <InViewAnimation delay={0.6}>
                <Card className='bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    <h3 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-6 text-center'>
                      Contribute to Our Next Issue
                    </h3>
                    <div className='text-center max-w-4xl mx-auto'>
                      <p className='text-secondary text-base font-light leading-relaxed mb-6'>
                        We welcome contributions from RK Mission alumni,
                        well-wishers, and anyone inspired by the ideals of
                        service and spiritual growth. Your literary pieces,
                        articles, poems, and reflections help make Nostalgic
                        Narendrapur a treasured repository of collective wisdom
                        and experiences.
                      </p>
                      <div className='grid md:grid-cols-2 gap-6 mt-8'>
                        <div>
                          <h4 className='text-xl font-medium text-text-primary mb-4'>
                            What We Accept:
                          </h4>
                          <ul className='text-secondary text-left space-y-3'>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Literary pieces and short stories</span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Poetry and reflective essays</span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>
                                Project reports and community insights
                              </span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Spiritual and philosophical articles</span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Nostalgic memories and experiences</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='text-xl font-medium text-text-primary mb-4'>
                            Submission Guidelines:
                          </h4>
                          <ul className='text-secondary text-left space-y-3'>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>
                                Send contributions to infosevaa@gmail.com
                              </span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>
                                Include author bio and contact details
                              </span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Maximum 2000 words for articles</span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>High-resolution images if applicable</span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                              <span>Original content only</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>
      </main>

      {/* Image Viewer Modal */}
      <ImageViewerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentPage={currentPage}
        totalPages={105}
        onPageChange={setCurrentPage}
        getImageSrc={getImageSrc}
        getImageAlt={getImageAlt}
      />
    </>
  );
}
