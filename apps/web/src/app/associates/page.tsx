import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserCheck } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';

const associatesData = [
  'Adrija Bannerjee',
  'Ahana Bera',
  'Dipankar Dan',
  'Krishnendu Kundu',
  'Ranita Ghosh Dastidar',
  'Santosh Mandal',
  'Tapas Kumar Haldar',
  'Tarun Ghatak',
  'Dr Tapas Mondal',
  'Dr Srishti Nayak',
  'Dilip kr Som',
  'Maloy Chakraborty',
  'Shukdev Das',
  'Ushakanta Kundu',
  'Jitendranath Jana',
];

export const metadata: Metadata = generatePageMetadata({
  title: 'Associates',
  description:
    "Meet our associate members who support SEVAA's mission and activities.",
  keywords: [
    'associates',
    'members',
    'supporters',
    'team',
    'SEVAA members',
    'associate members',
  ],
  url: '/associates',
});

export default function Associates() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent border-b border-primary/20 py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-5xl md:text-6xl font-light leading-tight text-text-primary mb-6'>
                  Associates
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Our dedicated associate members supporting SEVAA&apos;s
                  mission
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Redirect Notice */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <UserCheck className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Associate Members Information Moved
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        Our associate members information has been moved to our
                        comprehensive Governance section for better organization
                        and accessibility.
                      </p>
                      <p>
                        You can now find detailed information about all our
                        Associate Members along with our complete governance
                        structure including Executive Committee, Members,
                        Friends, and Partners.
                      </p>
                    </div>
                    <div className='mt-8'>
                      <a
                        href='/governance#sevaa-assoc-members'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <UserCheck className='h-5 w-5' />
                        View Associate Members
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                    SEVAA Associate Members Preview
                  </h2>
                  <div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
                  <p className='text-lg text-secondary'>
                    {associatesData.length} dedicated associate members
                    supporting our mission
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='p-8'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
                      {associatesData.slice(0, 8).map((name, index) => (
                        <div
                          key={index}
                          className='bg-accent border border-primary/20 rounded-md p-4 text-center'
                        >
                          <p className='text-text-primary font-medium text-sm'>
                            {name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {associatesData.length > 8 && (
                      <div className='text-center'>
                        <p className='text-secondary mb-4'>
                          And {associatesData.length - 8} more associate
                          members...
                        </p>
                        <a
                          href='/governance#sevaa-assoc-members'
                          className='inline-flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors'
                        >
                          View All Associate Members
                        </a>
                      </div>
                    )}
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
