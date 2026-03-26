import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Heart, Users, Globe, Target, Lightbulb, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Mission & Vision',
  description:
    'Discover SEVAA\'s mission and vision inspired by Swami Vivekananda\'s ideals. Our motto "Atmano Mokshartham JagatHitaya Cha" guides our work for community development and social transformation.',
  keywords: [
    'mission',
    'vision',
    'motto',
    'Atmano Mokshartham JagatHitaya Cha',
    'Swami Vivekananda',
    'Ramakrishna Mission',
    'alumni platform',
    'objectives',
  ],
  url: '/mission-vision',
});

export default function MissionVisionPage() {
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
                  Our Mission & Vision
                </h1>
                <div className='space-y-4'>
                  <p className='text-xl text-secondary leading-relaxed'>
                    Guided by timeless wisdom and inspired by Swami
                    Vivekananda&apos;s vision
                  </p>
                  <div className='bg-white border-2 border-primary/20 rounded-md p-6 max-w-3xl mx-auto shadow-lg'>
                    <h2 className='text-2xl font-display font-light mb-2 text-primary'>
                      आत्मानोमोक्षार्थमजगत्हितायच
                    </h2>
                    <p className='text-lg text-text-primary font-medium'>
                      Atmano Mokshartham JagatHitaya Cha
                    </p>
                    <p className='text-base text-secondary mt-2 italic'>
                      &quot;For the salvation of our individual self and for the
                      wellbeing of all on earth&quot; - Rig Veda
                    </p>
                  </div>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Vision Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-3 text-3xl font-light'>
                      <Target className='h-8 w-8 text-primary' />
                      Vision of SEVAA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='text-base font-light leading-relaxed text-secondary space-y-4'>
                      <p>
                        The motto{' '}
                        <strong>
                          &quot;Atmano Mokshartham JagatHitaya Cha&quot;
                        </strong>{' '}
                        (आत्मानोमोक्षार्थमजगत्हितायच), which means &quot;for the
                        salvation of our individual self and for the wellbeing
                        of all on earth&quot; (Rig-Veda), once taken by Swami
                        Vivekananda as the motto of Ramakrishna Mission has also
                        been adopted by SEVAA in contextual approaches.
                      </p>
                      <p>
                        <strong>
                          Do whatever you can for welfare of the suffering
                          community of Bengal as well as India.
                        </strong>
                        And feel happiness as well as enjoy Ananda from
                        observing those dormant possibilities being manifested
                        gradually.
                      </p>
                      <p>
                        In the idea of welfare of the suffering community,
                        Swamiji&apos;s vision of nation building is reflected.
                        It resonates the sense of equity, peaceful co-existence,
                        fraternity and resilience on one hand and on the other,
                        area-specificity, integration of problems in a holistic
                        action plan and nonstop journey to fulfillment even
                        through failure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                    Our Mission
                  </h2>
                  <p className='text-base font-light leading-relaxed text-secondary max-w-3xl mx-auto'>
                    Transforming communities through evidence-based programs
                    inspired by Swami Vivekananda&apos;s vision of service to
                    humanity
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <InViewAnimation delay={0.1}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <BookOpen className='h-6 w-6 text-primary' />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Quality education and learning initiatives for
                        underprivileged children through our Adur Pathshala and
                        forest school programs.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.2}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <Heart className='h-6 w-6 text-primary' />
                        Healthcare
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Community-based health programs, medical camps, and
                        wellness initiatives for rural communities.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.3}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <Users className='h-6 w-6 text-primary' />
                        Livelihood
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Sustainable livelihood programs including lac
                        cultivation, organic farming, and skill development
                        initiatives.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.4}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <Globe className='h-6 w-6 text-primary' />
                        Environment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Environmental conservation through tree plantation,
                        climate change mitigation, and sustainable practices.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.5}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <Lightbulb className='h-6 w-6 text-primary' />
                        Culture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Preserving and promoting cultural heritage through
                        publications, events, and community celebrations.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.6}>
                  <Card className='bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-xl font-medium'>
                        <Heart className='h-6 w-6 text-primary' />
                        Relief
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Emergency relief and support during natural disasters,
                        health crises, and community emergencies.
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-5xl md:text-4xl font-display font-light text-text-primary'>
                      Our Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0 space-y-6'>
                    <div className='space-y-4'>
                      <h3 className='text-xl font-medium text-text-primary'>
                        Alumni Platform & Community Building
                      </h3>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        To provide a common platform for the ex-students
                        (1976-79 batch) of &quot;Ramakrishna Mission Residential
                        College, Narendrapur&quot; for exchange of views,
                        promote empathetic camaraderie amongst alumni members
                        and extend a helping hand to needy and distressed
                        alumni, teaching and non-teaching members.
                      </p>
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-xl font-medium text-text-primary'>
                        Community Development & Empowerment
                      </h3>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        We believe that we can save the deprived mankind and
                        error in our environment along with you by enabling
                        people to ensure quality of living through innovative
                        socio-economic community collaboration, education,
                        cultural activities and philanthropic services.
                      </p>
                    </div>

                    <div className='space-y-4'>
                      <h3 className='text-xl font-medium text-text-primary'>
                        Swami Vivekananda&apos;s Vision
                      </h3>
                      <p className='text-base font-light leading-relaxed text-secondary'>
                        Following the path shown by Swami Vivekananda, we
                        dedicate ourselves to work among the underprivileged
                        section of our society in the true spirit of
                        <strong> &quot;Shiv Gyane Jeev Seva&quot;</strong> as
                        espoused by Swamiji.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                    We are committed to:
                  </h2>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  'Equity, Diversity, and Inclusion',
                  'Collaboration & Community Engagement',
                  'Building self confidence within the community',
                  'Shared Commitment',
                  'Responsibility & Accountability',
                  'Respect, Mutual Trust and Compassion',
                  'Integrity in everything we do',
                ].map((value, index) => (
                  <InViewAnimation key={index} delay={index * 0.1}>
                    <div className='bg-white border border-border rounded-md p-6 hover:shadow-lg transition-shadow duration-300'>
                      <div className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-primary rounded-full'></div>
                        <p className='text-text-primary text-base font-light'>
                          {value}
                        </p>
                      </div>
                    </div>
                  </InViewAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
