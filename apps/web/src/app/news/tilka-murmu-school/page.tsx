import { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import {
  School,
  Users,
  MapPin,
  Calendar,
  Award,
  Building,
  Lightbulb,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Inauguration of Tilka Murmu SEVAA Vana Vidyalaya',
  description:
    'Historic inauguration of TMSVV school by State Ministers and government officials, marking a milestone in rural education development.',
  keywords: [
    'tilka murmu school',
    'sevaa vana vidyalaya',
    'school inauguration',
    'rural education',
    'CSR funding',
    'murugappa group',
    'tribal education',
    'government support',
  ],
  url: '/news/tilka-murmu-school',
});

export default function TilkaMurmuSchoolPage() {
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
                  Inauguration of Tilka Murmu SEVAA Vana Vidyalaya
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  A historic milestone in rural education development
                </p>
                <div className='flex items-center justify-center gap-4 text-sm text-secondary mt-4'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    March 9, 2025
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    Saparambera, Ajodhya Hills
                  </div>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Main Article */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardContent className='p-8 md:p-12'>
                    <div className='prose prose-lg max-w-none'>
                      <p className='text-xl text-secondary leading-relaxed mb-8'>
                        State Ministers B. Roychoudhuri, Sandhyarani Tudu, and
                        SP-Purulia inaugurated the Tilka Murmu SEVAA Vana
                        Vidyalaya on March 9th, 2025, marking a significant
                        milestone in rural education development.
                      </p>

                      <div className='grid md:grid-cols-2 gap-8 mb-8'>
                        <div className='bg-accent/20 p-6 rounded-lg'>
                          <School className='h-8 w-8 text-primary mb-4' />
                          <h3 className='text-xl font-semibold text-text-primary mb-3'>
                            School Infrastructure
                          </h3>
                          <p className='text-secondary'>
                            Modern educational facility designed to serve tribal
                            communities in the Ajodhya Hills region with focus
                            on preserving local culture.
                          </p>
                        </div>

                        <div className='bg-accent/20 p-6 rounded-lg'>
                          <Users className='h-8 w-8 text-primary mb-4' />
                          <h3 className='text-xl font-semibold text-text-primary mb-3'>
                            Community Impact
                          </h3>
                          <p className='text-secondary'>
                            Providing quality education to children from
                            far-flung villages around Ajodhya Hills, bridging
                            the education gap in rural areas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* School Images */}
              <InViewAnimation delay={0.15}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary flex items-center gap-3'>
                      <School className='h-6 w-6 text-primary' />
                      School Inauguration & Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                      <div className='space-y-4'>
                        <div className='relative aspect-video rounded-lg overflow-hidden shadow-md'>
                          <Image
                            src='/images/events/Picture7.png'
                            alt='State Ministers B.Roychoudhuri, Sandhyarani Tudu, SP-Purulia inaugurating the school on 9th March, 2025'
                            fill
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className='object-cover'
                          />
                        </div>
                        <div className='text-center'>
                          <h4 className='font-semibold text-text-primary mb-2'>
                            School Inauguration Ceremony
                          </h4>
                          <p className='text-sm text-secondary'>
                            State Ministers and officials inaugurating TMSVV on
                            March 9, 2025
                          </p>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <div className='relative aspect-video rounded-lg overflow-hidden shadow-md'>
                          <Image
                            src='/images/events/Picture8.png'
                            alt='Tilka Murmu SEVAA Vana Vidyalaya building as on 9th March, 2025'
                            fill
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className='object-cover'
                          />
                        </div>
                        <div className='text-center'>
                          <h4 className='font-semibold text-text-primary mb-2'>
                            School Infrastructure
                          </h4>
                          <p className='text-sm text-secondary'>
                            Modern TMSVV building ready for tribal education
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* CSR Funding Success */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary flex items-center gap-3'>
                      <Award className='h-6 w-6 text-primary' />
                      CSR Funding Achievement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      <p className='text-secondary leading-relaxed'>
                        SEVAA has successfully registered itself in the
                        Government of India&apos;s CSR (Corporate Social
                        Responsibility) portal and has recently received funding
                        under CSR allotment from the prestigious &apos;Murugappa
                        Group of Companies&apos; based in Tamil Nadu.
                      </p>

                      <div className='bg-primary/5 p-6 rounded-lg'>
                        <h4 className='font-semibold text-text-primary mb-4'>
                          Funded Projects Include:
                        </h4>
                        <ul className='space-y-2'>
                          <li className='flex items-center gap-3'>
                            <Building className='h-4 w-4 text-primary flex-shrink-0' />
                            <span className='text-secondary'>
                              Modern kitchen for cooking midday meals
                            </span>
                          </li>
                          <li className='flex items-center gap-3'>
                            <School className='h-4 w-4 text-primary flex-shrink-0' />
                            <span className='text-secondary'>
                              Library construction
                            </span>
                          </li>
                          <li className='flex items-center gap-3'>
                            <Users className='h-4 w-4 text-primary flex-shrink-0' />
                            <span className='text-secondary'>
                              Preservation of Tribal Art & Culture
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Government Support */}
              <InViewAnimation delay={0.3}>
                <Card className='bg-white shadow-lg mb-8'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary flex items-center gap-3'>
                      <Lightbulb className='h-6 w-6 text-primary' />
                      Government Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-secondary leading-relaxed mb-6'>
                      The Government of India&apos;s Ministry of Science &
                      Technology, through Indian Institute of Engineering
                      Science and Technology (IIEST), Shibpur (WB) has
                      undertaken the construction of one solar toilet within the
                      school premises, which will be completed soon.
                    </p>

                    <div className='bg-accent/20 p-6 rounded-lg'>
                      <div className='flex items-center gap-3 mb-3'>
                        <Lightbulb className='h-5 w-5 text-primary' />
                        <h4 className='font-semibold text-text-primary'>
                          Sustainable Infrastructure
                        </h4>
                      </div>
                      <p className='text-secondary'>
                        Focus on eco-friendly solutions including solar-powered
                        facilities to make the school self-reliant in energy
                        consumption.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Future Plans */}
              <InViewAnimation delay={0.4}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader>
                    <CardTitle className='font-display text-2xl font-light text-text-primary'>
                      Future Development Plans
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      <p className='text-secondary leading-relaxed'>
                        After this initial success, SEVAA now plans to gradually
                        expand the school infrastructure to better serve the
                        community.
                      </p>

                      <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                          <h4 className='font-semibold text-text-primary'>
                            Planned Infrastructure:
                          </h4>
                          <ul className='space-y-3'>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0' />
                              <span className='text-secondary'>
                                Students&apos; hostel for children from
                                far-flung villages
                              </span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0' />
                              <span className='text-secondary'>
                                Guest house for resident teachers and SEVAA
                                members
                              </span>
                            </li>
                            <li className='flex items-start gap-3'>
                              <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0' />
                              <span className='text-secondary'>
                                Solar panels and energy infrastructure
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className='bg-primary/5 p-6 rounded-lg'>
                          <h4 className='font-semibold text-text-primary mb-3'>
                            Investment Required:
                          </h4>
                          <p className='text-2xl font-bold text-primary mb-2'>
                            ₹20 Lakh
                          </p>
                          <p className='text-sm text-secondary'>
                            Estimated cost for hostel and guest house
                            construction
                          </p>
                        </div>
                      </div>
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
                  Support Rural Education
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Help us continue expanding educational opportunities for
                  tribal communities
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Support Our Mission
                  </a>
                  <a
                    href='/projects/saparambera'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Learn More About the Project
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
