'use client';

import { InViewAnimation } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Download, FileText, Calendar } from 'lucide-react';

export default function AnnualReportsPage() {
  const reports = [
    {
      year: '2024',
      title: 'SEVAA Annual Report 2024',
      description:
        'Comprehensive overview of our activities and achievements in 2024',
      fileName: 'Tilka_Murmu_Forest_School.pdf',
      size: '2.1 MB',
      pages: 42,
      date: 'March 2024',
    },
    {
      year: '2023',
      title: 'SEVAA Annual Report 2023',
      description: 'Activities and impact report for the year 2023',
      fileName: 'sevaa_annual_report_2023.pdf',
      size: '1.8 MB',
      pages: 38,
      date: 'March 2023',
      disabled: true,
    },
    {
      year: '2022',
      title: 'SEVAA Annual Report 2022',
      description: 'Detailed report of projects and initiatives in 2022',
      fileName: 'sevaa_annual_report_2022.pdf',
      size: '2.0 MB',
      pages: 40,
      date: 'March 2022',
      disabled: true,
    },
  ];

  const handleDownload = (fileName: string) => {
    window.open(`/documents/${fileName}`, '_blank');
  };

  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-6'>
                  Annual Reports
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Transparency in action - Access our comprehensive annual
                  reports showcasing our impact and activities
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Introduction Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-3xl md:text-4xl font-display font-light text-text-primary text-center'>
                      Our Commitment to Transparency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <p className='text-base font-light leading-relaxed text-secondary text-center'>
                      SEVAA believes in complete transparency and
                      accountability. Our annual reports provide detailed
                      insights into our activities, financial statements, impact
                      assessments, and future plans. These reports demonstrate
                      our commitment to responsible governance and effective
                      utilization of resources.
                    </p>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-6'>
                    Available Reports
                  </h2>
                  <p className='text-base font-light leading-relaxed text-secondary max-w-3xl mx-auto'>
                    Download our comprehensive annual reports showcasing our
                    activities, impact, and financial transparency
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {reports.map((report, index) => (
                  <InViewAnimation key={report.year} delay={index * 0.1}>
                    <Card
                      className={`bg-white border border-border hover:shadow-lg transition-shadow duration-300 ${report.disabled ? 'opacity-60' : ''}`}
                    >
                      <CardContent className='p-6'>
                        <div className='flex items-center justify-between mb-4'>
                          <div className='bg-accent p-3 rounded-md'>
                            <FileText className='h-8 w-8 text-primary' />
                          </div>
                          <span className='text-2xl font-medium text-primary'>
                            {report.year}
                          </span>
                        </div>

                        <h3 className='text-xl font-medium leading-tight mb-2 text-text-primary'>
                          {report.title}
                        </h3>
                        <p className='text-secondary mb-4 text-sm font-light leading-relaxed'>
                          {report.description}
                        </p>

                        <div className='space-y-2 mb-4 text-sm text-secondary'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span>{report.date}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>{report.pages} pages</span>
                            <span>{report.size}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDownload(report.fileName)}
                          className='w-full'
                          disabled={report.disabled}
                          variant={report.disabled ? 'outline' : 'default'}
                        >
                          <Download className='h-4 w-4 mr-2' />
                          {report.disabled ? 'Coming Soon' : 'Download PDF'}
                        </Button>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activities Overview Images */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-6'>
                    Activities Overview
                  </h2>
                  <p className='text-base font-light leading-relaxed text-secondary max-w-3xl mx-auto'>
                    Visual highlights of our community development initiatives
                    and impact
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 gap-8'>
                <InViewAnimation delay={0.1}>
                  <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
                    <Image
                      src='/images/seva_activities_1.jpg'
                      alt='SEVAA Activities Overview 1'
                      width={800}
                      height={1000}
                      className='w-full h-auto object-cover'
                    />
                    <CardContent className='p-6'>
                      <h3 className='text-lg font-medium leading-tight text-text-primary mb-2'>
                        Annual Activities Summary - Part 1
                      </h3>
                      <p className='text-secondary font-light leading-relaxed'>
                        Overview of our key projects and initiatives throughout
                        the year
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.2}>
                  <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
                    <Image
                      src='/images/seva_activities_2.jpg'
                      alt='SEVAA Activities Overview 2'
                      width={800}
                      height={1000}
                      className='w-full h-auto object-cover'
                    />
                    <CardContent className='p-6'>
                      <h3 className='text-lg font-medium leading-tight text-text-primary mb-2'>
                        Annual Activities Summary - Part 2
                      </h3>
                      <p className='text-secondary font-light leading-relaxed'>
                        Detailed breakdown of community impact and beneficiary
                        statistics
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Transparency Section */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-3xl md:text-4xl font-display font-light text-text-primary text-center'>
                      Financial Transparency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0 text-center'>
                    <p className='text-base font-light leading-relaxed text-secondary mb-6'>
                      All our reports include audited financial statements, fund
                      utilization details, and impact assessments. We maintain
                      the highest standards of financial transparency and
                      accountability.
                    </p>
                    <Button
                      onClick={() =>
                        window.open('/legal-financial-information', '_blank')
                      }
                      variant='outline'
                      className='border-primary text-primary hover:bg-accent transition-colors'
                    >
                      View Legal & Financial Information
                    </Button>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <div className='text-center'>
                  <h2 className='font-display text-3xl md:text-4xl font-light leading-tight mb-6 text-text-primary'>
                    Need More Information?
                  </h2>
                  <p className='text-base font-light leading-relaxed text-secondary mb-8 max-w-2xl mx-auto'>
                    For detailed queries about our reports or specific
                    information, please contact us.
                  </p>
                  <Button onClick={() => window.open('/contact', '_self')}>
                    Contact Us
                  </Button>
                </div>
              </InViewAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
