import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Heart,
  GraduationCap,
  Shield,
  Home,
  HandHeart,
  School,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'We Support Activities',
  description:
    "Learn about SEVAA's support activities including scholarships, COVID-19 relief, emergency assistance, Alma Mater support, and Sudur Pathshala educational programs reaching students across rural Bengal.",
  keywords: [
    'support activities',
    'scholarship program',
    'covid relief',
    'emergency assistance',
    'sudur pathshala',
    'educational support',
    'disaster relief',
    'community support',
  ],
  url: '/support-activities',
});

export default function SupportActivitiesPage() {
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
                  We Support Activities
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Beyond our regular projects, extending help to those in need
                  across communities
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Overview */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    <p className='text-base font-light leading-relaxed text-secondary text-center'>
                      Whenever SEVAA feels that some sort of support we need to
                      provide to anybody or in any situation beyond normal
                      project based recurring expenditure is termed as{' '}
                      <strong>&ldquo;We Support&rdquo;</strong> activity. Every
                      year we spend more than{' '}
                      <strong>10% of our annual expenditure</strong> on these
                      activities.
                    </p>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto space-y-12'>
              {/* SEVAA Scholarship */}
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardHeader className='p-8 pb-4'>
                    <CardTitle className='flex items-center gap-3 font-display text-3xl font-light text-text-primary'>
                      <GraduationCap className='h-8 w-8 text-primary' />
                      SEVAA Scholarship Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='px-8 pb-8 space-y-6'>
                    <p className='text-base font-light leading-relaxed text-secondary'>
                      Financial support for students undertaking higher
                      education. Selection criteria focus on merit and students
                      from economically disadvantaged families.
                    </p>

                    <div className='bg-accent border border-primary/20 rounded-md p-6'>
                      <h4 className='font-medium text-text-primary mb-4'>
                        Current Scholarship Recipients (Last 3 Years):
                      </h4>
                      <div className='grid md:grid-cols-2 gap-4'>
                        <div className='space-y-3'>
                          <div className='bg-white rounded-lg p-4'>
                            <h5 className='font-medium text-text-primary'>
                              Astham Hembram
                            </h5>
                            <p className='text-sm text-secondary'>
                              4th Year MBBS, Sagar Dutta Medical College,
                              Kolkata
                            </p>
                          </div>
                          <div className='bg-white rounded-lg p-4'>
                            <h5 className='font-medium text-text-primary'>
                              Nabin Roy
                            </h5>
                            <p className='text-sm text-secondary'>
                              Final Year Engineering, Engineering and Textile
                              Technology, Srirampore
                            </p>
                          </div>
                        </div>
                        <div className='space-y-3'>
                          <div className='bg-white rounded-lg p-4'>
                            <h5 className='font-medium text-text-primary'>
                              Moumita Kapat
                            </h5>
                            <p className='text-sm text-secondary'>
                              Graduate (2023), Nursing, Medinipur Medical
                              College and Hospital
                            </p>
                          </div>
                          <div className='bg-white rounded-lg p-4'>
                            <h5 className='font-medium text-text-primary'>
                              Moumita Ghosh
                            </h5>
                            <p className='text-sm text-secondary'>
                              Graduate (2023), Nursing, Burdwan Medical College
                              and Hospital
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className='text-sm text-secondary mt-4 font-medium'>
                        <strong>2024-25 Session:</strong> Continuing support to
                        Astham and Nabin for their ongoing studies.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* COVID Support */}
              <InViewAnimation delay={0.1}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-3 text-2xl'>
                      <Shield className='h-7 w-7 text-primary' />
                      COVID-19 Support Activities (2020-2022)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <p className='text-secondary leading-relaxed'>
                      During the COVID-19 pandemic years, SEVAA continued its
                      support activities to help communities cope with the
                      crisis.
                    </p>

                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='bg-accent/20 rounded-lg p-6'>
                        <h4 className='font-semibold text-text-primary mb-3 flex items-center gap-2'>
                          <Home className='h-5 w-5 text-primary' />
                          COVID Facility Development
                        </h4>
                        <p className='text-secondary leading-relaxed text-sm'>
                          Supported the development of a short-stay facility for
                          COVID patients at Gouranga Bhawan in R.K.M Residential
                          College, Narendrapur campus. Responded to Mission
                          Authority&apos;s call with financial donation for this
                          purpose.
                        </p>
                      </div>

                      <div className='bg-accent/20 rounded-lg p-6'>
                        <h4 className='font-semibold text-text-primary mb-3 flex items-center gap-2'>
                          <HandHeart className='h-5 w-5 text-primary' />
                          Frontline Worker Support
                        </h4>
                        <p className='text-secondary leading-relaxed text-sm'>
                          Provided support to Janaswasthya Suraksha Samanyay at
                          Barasat, an organization of frontline fighters during
                          the COVID-19 pandemic.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Alma Mater Support */}
              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-3 text-2xl'>
                      <School className='h-7 w-7 text-primary' />
                      Support to Alma Mater
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-secondary leading-relaxed'>
                      <strong>Gouranga Bhawan Renovation:</strong> Responding to
                      the call of the then Principal Maharaj Swami
                      Shastrajnananda for renovation of Gouranga Bhawan, which
                      was in dilapidated condition. SEVAA provided financial
                      donation to the authority for this restoration purpose.
                    </p>

                    <div className='bg-primary/5 rounded-lg p-4'>
                      <p className='text-secondary text-sm'>
                        <strong>Individual Student Support:</strong> When Kabir,
                        a Physics Honours student at R.K.M.R College,
                        Narendrapur, fell critically ill, SEVAA provided medical
                        support upon the Principal Maharaj&apos;s call. Coming
                        from a poor family, his father couldn&apos;t manage
                        treatment costs. We&apos;re happy that Kabir overcame
                        the crisis and rejoined college.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              {/* Emergency Relief */}
              <InViewAnimation delay={0.3}>
                <Card className='bg-white shadow-lg'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-3 text-2xl'>
                      <Shield className='h-7 w-7 text-primary' />
                      Emergency Relief Work
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='space-y-4'>
                      <div className='bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg'>
                        <h4 className='font-semibold text-text-primary mb-2'>
                          Cyclone YAAS Relief (2021)
                        </h4>
                        <p className='text-secondary leading-relaxed text-sm mb-3'>
                          When Cyclone YAAS devastated the lives of lakhs of
                          people across districts, with South and North 24
                          Parganas being the most affected, SEVAA stood by the
                          victims.
                        </p>
                        <div className='bg-white rounded-lg p-3'>
                          <p className='text-secondary text-sm mb-2'>
                            <strong>Areas Supported:</strong> 3 islands of North
                            24 Parganas
                          </p>
                          <ul className='text-xs text-secondary space-y-1 list-disc list-inside ml-2'>
                            <li>Kumirmari GP</li>
                            <li>Pargumti Kalitala GP</li>
                            <li>
                              East Charalkhali-Sabebkhali GP, PS-Hingalganj
                            </li>
                          </ul>
                          <p className='text-sm text-secondary mt-2'>
                            <strong>Support Provided:</strong> Rice, potato,
                            oil, soybean, and soap distributed to 300 highly
                            affected families.
                          </p>
                        </div>
                      </div>

                      <div className='bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg'>
                        <h4 className='font-semibold text-text-primary mb-2'>
                          Flood Relief (2022)
                        </h4>
                        <p className='text-secondary leading-relaxed text-sm'>
                          When massive flooding inundated islands in the same
                          districts, SEVAA provided essential relief materials
                          including blankets and mosquito nets to affected
                          families.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Sudur Pathshala Section */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'>
                  <CardHeader className='pb-6'>
                    <CardTitle className='text-3xl'>SUDUR PATHSHALA</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-8'>
                    {/* Version 0.1 - COVID Period */}
                    <div className='space-y-4'>
                      <h3 className='text-xl font-semibold text-text-primary'>
                        Sudur Pathshala Version 0.1 (COVID Period)
                      </h3>
                      <p className='text-secondary leading-relaxed'>
                        During COVID-19, when schools remained closed for more
                        than two years, SEVAA recognized that meritorious but
                        poor students in rural Bengal were deprived of learning
                        opportunities. We initiated e-classes to bridge this
                        gap.
                      </p>

                      <div className='bg-white rounded-lg p-6 space-y-4'>
                        <div className='grid md:grid-cols-2 gap-6'>
                          <div className='space-y-3'>
                            <h4 className='font-medium text-text-primary'>
                              Program Scale:
                            </h4>
                            <ul className='text-secondary text-sm space-y-1 list-disc list-inside'>
                              <li>26 schools across 13 districts</li>
                              <li>28 dedicated teachers</li>
                              <li>Daily classes except Sunday</li>
                            </ul>
                          </div>
                          <div className='space-y-3'>
                            <h4 className='font-medium text-text-primary'>
                              Schedule:
                            </h4>
                            <ul className='text-secondary text-sm space-y-1 list-disc list-inside'>
                              <li>Evening classes: 6:30 PM - 9:00 PM</li>
                              <li>Three class sessions per day</li>
                              <li>Eligible students from rural areas</li>
                            </ul>
                          </div>
                        </div>
                        <p className='text-secondary text-sm italic'>
                          The program successfully concluded in 2022 when
                          schools reopened.
                        </p>
                      </div>
                    </div>

                    {/* Version 0.2 - Teacher Shortage Solution */}
                    <div className='space-y-4'>
                      <h3 className='text-xl font-semibold text-text-primary'>
                        Sudur Pathshala Version 0.2 (Teacher Shortage Solution)
                      </h3>
                      <p className='text-secondary leading-relaxed'>
                        In 2023, we identified a new need: many schools,
                        especially in rural areas, lacked subject teachers due
                        to recruitment difficulties in West Bengal.
                      </p>

                      <div className='bg-white rounded-lg p-6 space-y-4'>
                        <div className='bg-primary/5 rounded-lg p-4'>
                          <h4 className='font-medium text-text-primary mb-2'>
                            Pilot Project Discovery
                          </h4>
                          <p className='text-secondary text-sm leading-relaxed'>
                            The need was first identified at our projected Girls
                            High School, which had been running without a
                            Mathematics teacher for three years after
                            retirement. We equipped the school with a SMART Room
                            enabling two-way communication for effective
                            teaching.
                          </p>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                          <div className='space-y-3'>
                            <h4 className='font-medium text-text-primary'>
                              Current Implementation:
                            </h4>
                            <ul className='text-secondary text-sm space-y-1 list-disc list-inside'>
                              <li>10 schools participating</li>
                              <li>Classes 9-12 covered</li>
                              <li>During regular school hours</li>
                              <li>Integrated time scheduling</li>
                            </ul>
                          </div>
                          <div className='space-y-3'>
                            <h4 className='font-medium text-text-primary'>
                              Subjects Offered:
                            </h4>
                            <ul className='text-secondary text-sm space-y-1 list-disc list-inside'>
                              <li>Mathematics</li>
                              <li>Life Science</li>
                              <li>Interactive two-way classes</li>
                              <li>Real-time student participation</li>
                            </ul>
                          </div>
                        </div>

                        <div className='bg-primary/5 rounded-lg p-4'>
                          <p className='text-secondary text-sm'>
                            <strong>Vision:</strong> Multiple schools with
                            deficiency of the same subject teacher can be
                            brought under one umbrella for broader service
                            provision.
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

        {/* Impact Summary */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4'>
                    Support Activities Impact
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Our commitment extends beyond regular programs to address
                    immediate community needs
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <InViewAnimation delay={0.1}>
                  <Card className='bg-white text-center shadow-lg'>
                    <CardContent className='pt-8 pb-6'>
                      <GraduationCap className='h-12 w-12 text-primary mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-text-primary'>
                        4+
                      </h3>
                      <p className='text-secondary'>Students Supported</p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.2}>
                  <Card className='bg-white text-center shadow-lg'>
                    <CardContent className='pt-8 pb-6'>
                      <Shield className='h-12 w-12 text-primary mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-text-primary'>
                        300
                      </h3>
                      <p className='text-secondary'>Families Assisted</p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.3}>
                  <Card className='bg-white text-center shadow-lg'>
                    <CardContent className='pt-8 pb-6'>
                      <School className='h-12 w-12 text-primary mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-text-primary'>
                        36
                      </h3>
                      <p className='text-secondary'>Schools Reached</p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.4}>
                  <Card className='bg-white text-center shadow-lg'>
                    <CardContent className='pt-8 pb-6'>
                      <Heart className='h-12 w-12 text-primary mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-text-primary'>
                        10%
                      </h3>
                      <p className='text-secondary'>Annual Budget</p>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
