import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import { Users, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Team SEVAA',
  description:
    "Meet the dedicated team of SEVAA - our Advisory Body, Executive Committee, and General Members working together to serve communities and implement Swami Vivekananda's vision.",
  keywords: [
    'team sevaa',
    'executive committee',
    'advisory body',
    'general members',
    'leadership',
    'organization structure',
    'working group',
  ],
  url: '/team',
});

export default function TeamPage() {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  Team SEVAA
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Dedicated individuals working together to serve communities
                  and implement our mission
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Redirect Notice */}
        <section className='py-16'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Users className='h-16 w-16 text-primary mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      Team Information Moved
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        Our comprehensive team and governance information has
                        been moved to our dedicated Governance section for
                        better organization and accessibility.
                      </p>
                      <p>
                        You can now find detailed information about our Advisory
                        Body, Executive Committee, Members, Associate Members,
                        Friends, and Partners all in one place.
                      </p>
                    </div>
                    <div className='mt-8'>
                      <a
                        href='/governance'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <Users className='h-5 w-5' />
                        View Governance Structure
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Advisory Body Archive Notice */}
        <section className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md'>
                  <CardContent className='p-8 md:p-12 text-center'>
                    <Crown className='h-16 w-16 text-orange-500 mx-auto mb-6' />
                    <h2 className='font-display text-3xl font-light text-text-primary mb-6'>
                      উপদেষ্টা পরিষদ পুনর্গঠন চলমান
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        SEVAA এর উপদেষ্টা পরিষদ বর্তমানে পুনর্গঠনের
                        প্রক্রিয়াধীন রয়েছে। আমাদের সাংগঠনিক কাঠামো আধুনিকায়ন
                        ও নতুন চ্যালেঞ্জ মোকাবেলার জন্য একটি নতুন উপদেষ্টা পরিষদ
                        গঠনের কাজ চলমান।
                      </p>
                      <p>
                        পূর্ববর্তী উপদেষ্টা পরিষদের সদস্যদের অবদানের
                        স্বীকৃতিস্বরূপ তাদের তথ্য আমাদের আর্কাইভে সংরক্ষিত
                        রয়েছে।
                      </p>
                    </div>
                    <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
                      <a
                        href='/archives/general'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors'
                      >
                        <Crown className='h-5 w-5' />
                        পূর্ববর্তী উপদেষ্টা পরিষদ দেখুন
                      </a>
                      <a
                        href='/governance'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <Users className='h-5 w-5' />
                        বর্তমান গভর্নেন্স দেখুন
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-16 bg-primary text-white'>
          <div className='container mx-auto px-4'>
            <InViewAnimation>
              <div className='text-center max-w-3xl mx-auto space-y-6'>
                <h2 className='font-display text-3xl font-light'>
                  Join Our Mission
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Become part of our extended community and contribute to
                  meaningful social change
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join as Volunteer
                  </a>
                  <a
                    href='/governance'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    View Governance
                  </a>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>
      </div>
    </>
  );
}
