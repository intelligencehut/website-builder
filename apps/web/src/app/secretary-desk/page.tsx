import { Metadata } from 'next';
import Image from 'next/image';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "Secretary's Desk",
  description:
    'Read a welcoming message from the Secretary of SEVAA about our mission, key focus areas including livelihood upliftment, primary education, and healthcare services.',
  keywords: [
    'secretary',
    'leadership',
    'message',
    'mission',
    'livelihood',
    'education',
    'healthcare',
    'welcome',
  ],
  url: '/secretary-desk',
});

export default function SecretaryDeskPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  From Secretary&apos;s Desk
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Welcome message and insights from our Secretary
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Content Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    {/* Secretary Image */}
                    <div className='text-center mb-12'>
                      <div className='relative w-64 h-96 mx-auto mb-8'>
                        <Image
                          src='/images/secretary-image.jpg'
                          alt='Secretary SEVAA'
                          fill
                          className='object-cover rounded-md'
                        />
                      </div>
                      <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                        From Secretary&apos;s Desk
                      </h2>
                      <div className='w-24 h-1 bg-primary mx-auto'></div>
                    </div>

                    {/* Content */}
                    <div className='prose prose-lg max-w-none text-secondary space-y-8'>
                      <p className='text-base font-light leading-relaxed'>
                        It is with great pleasure that I welcome you to the
                        website of SEVAA (Society for Envisioning Vivekananda in
                        Awareness and Action), a non-profit organisation
                        dedicated to improving the lives of people in need. Our
                        primary focus lies in three key areas: livelihood
                        upliftment projects, primary education, and healthcare.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        We believe that empowering individuals with sustainable
                        livelihoods is crucial for breaking the cycle of
                        poverty. Our livelihood upliftment projects in remote
                        tribal pockets in Puruliya district of West Bengal
                        provide training, resources, and market access to
                        marginalized communities, enabling them to generate
                        income and support their families.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Education is the foundation for a brighter future. We
                        work to ensure that children from underserved
                        communities have access to quality primary education.
                        Our programs include building and renovating schools,
                        providing infrastructure, educational materials, and
                        training teachers.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Good health is essential for a fulfilling life. We offer
                        healthcare services, including medical camps, and health
                        education programs, to communities lacking access to
                        basic healthcare facilities.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Our team of SEVAA members and volunteers works
                        tirelessly to make a positive impact on the lives of
                        those we serve. We rely on the generosity of donors and
                        supporters like you to continue our work.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Thank you for visiting our website and learning about
                        our mission. Together, we can create a world where
                        everyone has the opportunity to thrive.
                      </p>

                      <div className='bg-accent border border-primary/20 rounded-md p-8 mt-12'>
                        <p className='font-medium text-text-primary text-lg'>
                          Sincerely,
                        </p>
                        <p className='font-medium text-text-primary text-lg italic mt-2'>
                          Dr Krishnendu Das
                        </p>
                        <p className='font-medium text-primary text-lg'>
                          Secretary
                        </p>
                        <p className='font-medium text-primary text-lg italic'>
                          SEVAA
                        </p>
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
