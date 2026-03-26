import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import { Crown, Archive, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'সাধারণ আর্কাইভ - SEVAA',
  description:
    'SEVAA এর পূর্ববর্তী উপদেষ্টা পরিষদ ও অন্যান্য ঐতিহাসিক তথ্যের সংরক্ষণাগার।',
  keywords: [
    'সাধারণ আর্কাইভ',
    'উপদেষ্টা পরিষদ',
    'ঐতিহাসিক তথ্য',
    'SEVAA archives',
    'advisory body',
    'historical records',
  ],
  url: '/archives/general',
});

// Former Advisory Body members (archived)
const formerAdvisoryBody = [
  'Ashok Punjabi',
  'Debdas Bhattacharya',
  'Gautam Bannerjee',
  'Sajal Kumar Das',
  'Samir Nayak',
  'Siddharta Maity',
  'Saikat Das',
];

// Former Executive Committee members (archived 2023-2025)
const formerExecutiveCommittee = [
  { name: 'Dibyagopal Ghatak', position: 'President' },
  { name: 'Ratan Ghosh Dastidar', position: 'Vice President' },
  { name: 'Pradip Dey', position: 'Vice President' },
  { name: 'Krishnendu Das', position: 'Secretary' },
  { name: 'Dibes Bera', position: 'Assistant Secretary' },
  { name: 'Narayan Tatachari', position: 'Treasurer' },
  { name: 'Joydeb De', position: 'Assistant Treasurer' },
  { name: 'Pradip De', position: 'Member' },
  { name: 'Swapan Maity', position: 'Member' },
  { name: 'Manoj Kowar', position: 'Member' },
  { name: 'Monishankar Banerjee', position: 'Member' },
  { name: 'Pradip Mukhopadhyay', position: 'Member' },
];

export default function GeneralArchivePage() {
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
                  সাধারণ আর্কাইভ
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  SEVAA এর ঐতিহাসিক তথ্য ও পূর্ববর্তী কাঠামোর সংরক্ষণাগার
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
                  <span className='text-primary'>সাধারণ</span>
                </nav>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Archive Notice */}
        <section className='py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-orange-50 border-orange-200 border'>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <Archive className='h-6 w-6 text-orange-600 mt-1 flex-shrink-0' />
                      <div>
                        <h3 className='font-medium text-orange-800 mb-2'>
                          আর্কাইভ নোটিশ
                        </h3>
                        <p className='text-orange-700 leading-relaxed'>
                          এই পৃষ্ঠায় SEVAA এর ঐতিহাসিক তথ্য সংরক্ষিত রয়েছে যা
                          বর্তমানে সক্রিয় নয়। বর্তমান সাংগঠনিক কাঠামো ও
                          কার্যকর তথ্যের জন্য অনুগ্রহ করে আমাদের গভর্নেন্স
                          পৃষ্ঠা দেখুন।
                        </p>
                        <div className='mt-4'>
                          <Link
                            href='/governance'
                            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium'
                          >
                            বর্তমান গভর্নেন্স দেখুন
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
                                d='M9 5l7 7-7 7'
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Former Advisory Body Section */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <div className='flex items-center justify-center gap-3 mb-4'>
                    <Crown className='h-8 w-8 text-orange-500' />
                    <Clock className='h-6 w-6 text-orange-400' />
                  </div>
                  <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-4'>
                    Advisory Body (2023-2025)
                  </h2>
                  <p className='text-lg text-secondary leading-relaxed max-w-3xl mx-auto'>
                    The Advisory Body that provided guidance and counsel to
                    SEVAA during 2023-2025, contributing to the
                    organization&apos;s strategic direction and policy
                    formulation.
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {formerAdvisoryBody.map((name, index) => (
                  <InViewAnimation key={name} delay={index * 0.1}>
                    <Card className='bg-white hover:shadow-lg transition-all border border-orange-100'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Crown className='h-6 w-6 text-orange-500' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {name}
                          </h3>
                          <p className='text-sm text-orange-600 mt-1'>
                            Advisory Member
                          </p>
                          <p className='text-xs text-secondary mt-1'>
                            (2023-2025)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                ))}
              </div>

              {/* Historical Context */}
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary text-center'>
                      Advisory Body Legacy (2023-2025)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          Key Contributions:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Provided strategic guidance during SEVAA&apos;s
                              foundational period
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Formulated organizational policies and operational
                              guidelines
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Advised on early project planning and program
                              development
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          Transition:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Organizational restructuring and modernization in
                              progress
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              New advisory structure planning and formation
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Operations continue under current governance
                              framework
                            </span>
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

        {/* Former Executive Committee Section (2023-2025) */}
        <section className='py-10 bg-accent/30'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <div className='flex items-center justify-center gap-3 mb-4'>
                    <Crown className='h-8 w-8 text-blue-500' />
                    <Clock className='h-6 w-6 text-blue-400' />
                  </div>
                  <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-4'>
                    Executive Committee (2023-2025)
                  </h2>
                  <p className='text-lg text-secondary leading-relaxed max-w-3xl mx-auto'>
                    The Executive Committee that served SEVAA during 2023-2025,
                    providing leadership and guidance during a crucial period of
                    organizational development.
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {formerExecutiveCommittee.map((member, index) => (
                  <InViewAnimation key={member.name} delay={index * 0.1}>
                    <Card className='bg-white hover:shadow-lg transition-all border border-blue-100'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Crown className='h-6 w-6 text-blue-500' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {member.name}
                          </h3>
                          <p className='text-sm text-blue-600 mt-1'>
                            {member.position}
                          </p>
                          <p className='text-xs text-secondary mt-1'>
                            (2023-2025)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                ))}
              </div>

              {/* Executive Committee Historical Context */}
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary text-center'>
                      Executive Committee Legacy (2023-2025)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          Key Achievements:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Established foundational governance structure and
                              policies
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Launched major community development projects
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Strengthened partnerships with local communities
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className='text-lg font-medium text-text-primary mb-4'>
                          Transition Period:
                        </h4>
                        <ul className='space-y-2 text-secondary'>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Smooth transition to new leadership structure in
                              2025
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Established specialized subcommittees for focused
                              work
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                            <span>
                              Enhanced organizational structure for better
                              efficiency
                            </span>
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

        {/* Navigation Links */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md'>
                  <CardContent className='p-8 text-center'>
                    <h3 className='font-display text-2xl font-light text-text-primary mb-6'>
                      সংশ্লিষ্ট পৃষ্ঠাসমূহ
                    </h3>
                    <div className='grid md:grid-cols-3 gap-4'>
                      <Link
                        href='/governance'
                        className='flex flex-col items-center gap-2 p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <Crown className='h-6 w-6' />
                        <span className='font-medium'>বর্তমান গভর্নেন্স</span>
                      </Link>
                      <Link
                        href='/archives'
                        className='flex flex-col items-center gap-2 p-4 bg-accent text-secondary rounded-lg hover:bg-accent/80 transition-colors'
                      >
                        <Archive className='h-6 w-6' />
                        <span className='font-medium'>আর্কাইভস মূল পৃষ্ঠা</span>
                      </Link>
                      <Link
                        href='/team'
                        className='flex flex-col items-center gap-2 p-4 bg-white border border-border text-text-primary rounded-lg hover:bg-gray-50 transition-colors'
                      >
                        <Crown className='h-6 w-6' />
                        <span className='font-medium'>টিম SEVAA</span>
                      </Link>
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
