import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  BookOpen,
  FileText,
  Video,
  Users,
  Calendar,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'Publications & Campaigns',
  description:
    "Explore SEVAA's publications including Nostalgic Narendrapur magazine, annual reports, campaign materials, training programs, and festival documentation. Discover our literary contributions and community activities.",
  keywords: [
    'publications',
    'nostalgic narendrapur',
    'annual reports',
    'campaigns',
    'training programs',
    'festivals',
    'sammelan',
    'leaflets',
    'videos',
  ],
  url: '/publications',
});

export default function PublicationsPage() {
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
                  Publications & Campaigns
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Sharing knowledge, preserving memories, and spreading
                  awareness through our publications
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Publication Department Overview */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-12'>
                  <CardHeader className='p-8 pb-4'>
                    <CardTitle className='flex items-center gap-3 font-display text-5xl md:text-4xl font-light text-text-primary'>
                      <BookOpen className='h-10 w-10 text-primary' />
                      Publication Department
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='px-8 pb-8'>
                    <p className='text-base font-light leading-relaxed text-secondary'>
                      SEVAA has a dedicated Publication Department that
                      continuously publishes annual magazines, program-based
                      journals, and leaflets to document our activities and
                      share knowledge with the community.
                    </p>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Main Publications */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                    Our Publications
                  </h2>
                  <div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
                  <p className='text-base font-light leading-relaxed text-secondary max-w-3xl mx-auto'>
                    Documenting our journey and sharing insights through various
                    publication formats
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid lg:grid-cols-2 gap-8'>
                {/* Nostalgic Narendrapur */}
                <InViewAnimation delay={0.1}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-2xl'>
                        <BookOpen className='h-6 w-6 text-primary' />
                        Nostalgic Narendrapur
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <p className='text-secondary leading-relaxed'>
                        An annual e-magazine featuring literary pieces and
                        reports on SEVAA activities. Contains contributions from
                        ex-students of R.K. Mission, external writers, and
                        revered Swamijis.
                      </p>
                      <div className='bg-accent/20 rounded-lg p-4'>
                        <p className='text-sm text-secondary font-medium'>
                          <strong>Published:</strong> 2 issues in the last 3
                          years
                        </p>
                        <p className='text-sm text-secondary'>
                          Features literary contributions, activity reports, and
                          community stories
                        </p>
                      </div>
                      <Link href='/publications/nostalgic-narendrapur'>
                        <Button className='w-full'>
                          <Download className='h-4 w-4 mr-2' />
                          View Magazine
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                {/* Annual Reports */}
                <InViewAnimation delay={0.2}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-2xl'>
                        <FileText className='h-6 w-6 text-primary' />
                        Annual Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <p className='text-secondary leading-relaxed'>
                        Comprehensive annual reports in journal format
                        containing detailed documentation of all SEVAA
                        activities, achievements, and financial information.
                      </p>
                      <div className='bg-accent/20 rounded-lg p-4'>
                        <p className='text-sm text-secondary font-medium'>
                          <strong>Latest:</strong> Annual Report 2024
                        </p>
                        <p className='text-sm text-secondary'>
                          Complete activity details and organizational updates
                        </p>
                      </div>
                      <Link href='/annual-reports'>
                        <Button className='w-full'>
                          <Download className='h-4 w-4 mr-2' />
                          View Reports
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                {/* Campaign Materials */}
                <InViewAnimation delay={0.3}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-2xl'>
                        <FileText className='h-6 w-6 text-primary' />
                        Campaign Materials
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <p className='text-secondary leading-relaxed'>
                        Educational leaflets and promotional materials designed
                        to raise awareness about our programs and engage
                        community participation.
                      </p>
                      <div className='bg-accent/20 rounded-lg p-4'>
                        <p className='text-sm text-secondary font-medium'>
                          <strong>Purpose:</strong> Community outreach and
                          education
                        </p>
                        <p className='text-sm text-secondary'>
                          Program information, awareness campaigns, and
                          volunteer recruitment
                        </p>
                      </div>
                      <Button className='w-full' variant='outline'>
                        <Download className='h-4 w-4 mr-2' />
                        Request Materials
                      </Button>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                {/* Video Content */}
                <InViewAnimation delay={0.4}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-2xl'>
                        <Video className='h-6 w-6 text-primary' />
                        Video Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <p className='text-secondary leading-relaxed'>
                        Campaign videos showcasing our work and impact,
                        including content uploaded to our YouTube channel with
                        significant community engagement.
                      </p>
                      <div className='bg-accent/20 rounded-lg p-4'>
                        <p className='text-sm text-secondary font-medium'>
                          <strong>Content:</strong> 3+ campaign videos developed
                        </p>
                        <p className='text-sm text-secondary'>
                          YouTube uploads with strong community response
                        </p>
                      </div>
                      <Button className='w-full' variant='outline'>
                        <Video className='h-4 w-4 mr-2' />
                        Watch Videos
                      </Button>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Training, Festival and Sammelan */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-3 text-3xl'>
                      <Users className='h-8 w-8 text-primary' />
                      Training, Festival and Sammelan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-8'>
                    <p className='text-lg text-secondary leading-relaxed'>
                      Each year SEVAA holds several training programmes and
                      Sammelan or Festival for attracting and involving outside
                      people in SEVAA activities.
                    </p>

                    {/* Training Programs */}
                    <div className='space-y-4'>
                      <h3 className='text-xl font-semibold text-text-primary flex items-center gap-2'>
                        <BookOpen className='h-5 w-5 text-primary' />
                        Training Programs
                      </h3>
                      <div className='space-y-3 pl-4'>
                        <p className='text-secondary leading-relaxed'>
                          <strong>Lac Cultivation Training:</strong> Conducted
                          thrice at Saparambera, making huge impact on the local
                          community.
                        </p>
                        <p className='text-secondary leading-relaxed'>
                          <strong>Teachers&apos; Training:</strong> Held thrice
                          at Ukhra, significantly impacting local educational
                          practices.
                        </p>
                      </div>
                    </div>

                    {/* Program Evaluation Festival */}
                    <div className='space-y-4'>
                      <h3 className='text-xl font-semibold text-text-primary flex items-center gap-2'>
                        <Calendar className='h-5 w-5 text-primary' />
                        Program Evaluation Festival (January 2023)
                      </h3>
                      <p className='text-secondary leading-relaxed pl-4'>
                        A program evaluation team visited Saparambera, Ajodhya
                        Hills, which evolved into a community festival where
                        tribal people performed their traditional rituals,
                        songs, and dances in celebration.
                      </p>
                    </div>

                    {/* First SEVAA Sammelan */}
                    <div className='space-y-6'>
                      <h3 className='text-xl font-semibold text-text-primary flex items-center gap-2'>
                        <Users className='h-5 w-5 text-primary' />
                        First SEVAA Sammelan (January 28, 2024)
                      </h3>
                      <div className='pl-4 space-y-4'>
                        <div className='bg-white/50 rounded-lg p-4'>
                          <p className='text-secondary leading-relaxed mb-2'>
                            <strong>Venue:</strong> Maa Sarada Hall, Narendrapur
                            R.K. Mission Lokshiksha Parishad
                          </p>
                          <p className='text-secondary leading-relaxed'>
                            <strong>Participants:</strong> Regular members and
                            families, Associate members, representatives from
                            Saparambera and SEVAA Ukhra, well-wishers, and
                            distinguished guests.
                          </p>
                        </div>

                        <div className='space-y-3'>
                          <p className='text-secondary leading-relaxed'>
                            <strong>Inaugurated by:</strong> Hon&apos;ble
                            Principal Maharaj, Swami Ekachittanandaji
                          </p>
                          <p className='text-secondary leading-relaxed'>
                            <strong>Chief Guest:</strong> Dr. Manas Ghosh
                          </p>
                        </div>

                        <div className='space-y-4'>
                          <h4 className='font-semibold text-text-primary'>
                            Session Schedule:
                          </h4>
                          <div className='grid md:grid-cols-2 gap-4'>
                            <div className='bg-white/50 rounded-lg p-4'>
                              <p className='font-medium text-text-primary mb-1'>
                                1. About SEVAA
                              </p>
                              <p className='text-sm text-secondary'>
                                Representatives introduced activities from
                                Kolkata, Saparambera Vivekpally, SEVAA Ukhra,
                                and Sudur Pathshala teachers.
                              </p>
                              <p className='text-xs text-secondary mt-1'>
                                <strong>Compered by:</strong> Dr. Sajal Das and
                                Dr. Swaraj Bose
                              </p>
                            </div>

                            <div className='bg-white/50 rounded-lg p-4'>
                              <p className='font-medium text-text-primary mb-1'>
                                2. Health Awareness & SEVAA
                              </p>
                              <p className='text-sm text-secondary'>
                                Health-focused discussions and community
                                wellness programs.
                              </p>
                              <p className='text-xs text-secondary mt-1'>
                                <strong>Compered by:</strong> Samir Nayek and
                                Dibes Bera
                                <br />
                                <strong>Participants:</strong> Dr. Punyabrata
                                Gun, Dr. Nandini Mukherjee
                              </p>
                            </div>

                            <div className='bg-white/50 rounded-lg p-4'>
                              <p className='font-medium text-text-primary mb-1'>
                                3. Civil Society Organisation & SEVAA
                              </p>
                              <p className='text-sm text-secondary'>
                                Representatives from 10+ CSOs discussed
                                networking opportunities for field-level program
                                implementation.
                              </p>
                              <p className='text-xs text-secondary mt-1'>
                                <strong>Compered by:</strong> Dibya Gopal Ghatak
                                and Dr. Jaydev De
                              </p>
                            </div>

                            <div className='bg-white/50 rounded-lg p-4'>
                              <p className='font-medium text-text-primary mb-1'>
                                4. Open Discussion
                              </p>
                              <p className='text-sm text-secondary'>
                                Community dialogue and feedback session for
                                future planning.
                              </p>
                              <p className='text-xs text-secondary mt-1'>
                                <strong>Compered by:</strong> Ratan Ghosh
                                Dastidar
                              </p>
                            </div>
                          </div>

                          <div className='bg-primary/5 rounded-lg p-4 mt-4'>
                            <h5 className='font-semibold text-text-primary mb-2'>
                              Closing Session
                            </h5>
                            <p className='text-secondary text-sm leading-relaxed'>
                              <strong>Presided by:</strong> Swami Basavananda
                              <br />
                              <strong>Chief Guest:</strong> Justice Rajarshi
                              Bharadwaj
                              <br />
                              <strong>Special Guests:</strong> Dr. Nilendu
                              Moitra and Dr. Mouli Madhab Ghatak
                            </p>
                            <p className='text-secondary text-sm mt-2'>
                              The event concluded with a beautiful evening
                              cultural programme performed by SEVAA members and
                              tribal participants from Saparambera.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Publication Categories */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4'>
                    Publication Categories
                  </h2>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <InViewAnimation delay={0.1}>
                  <Link href='/publications/nostalgic-narendrapur'>
                    <Card className='bg-white hover:shadow-lg transition-all cursor-pointer h-full group'>
                      <CardHeader className='pb-4'>
                        <CardTitle className='flex items-center gap-3 text-lg group-hover:text-primary transition-colors'>
                          <BookOpen className='h-5 w-5 text-primary' />
                          Magazines
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-secondary leading-relaxed text-sm'>
                          Annual literary and activity magazines including the
                          flagship &quot;Nostalgic Narendrapur&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </InViewAnimation>

                <InViewAnimation delay={0.2}>
                  <Link href='/annual-reports'>
                    <Card className='bg-white hover:shadow-lg transition-all cursor-pointer h-full group'>
                      <CardHeader className='pb-4'>
                        <CardTitle className='flex items-center gap-3 text-lg group-hover:text-primary transition-colors'>
                          <FileText className='h-5 w-5 text-primary' />
                          Annual Reports
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-secondary leading-relaxed text-sm'>
                          Detailed yearly reports documenting organizational
                          activities, achievements, and financial statements
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </InViewAnimation>

                <InViewAnimation delay={0.3}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-lg'>
                        <FileText className='h-5 w-5 text-primary' />
                        Campaign Materials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-secondary leading-relaxed text-sm'>
                        Educational leaflets and promotional materials for
                        awareness campaigns and program promotion
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                <InViewAnimation delay={0.4}>
                  <Card className='bg-white hover:shadow-lg transition-all h-full'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3 text-lg'>
                        <Video className='h-5 w-5 text-primary' />
                        Video Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-secondary leading-relaxed text-sm'>
                        Campaign videos and documentaries showcasing our impact,
                        available on our YouTube channel
                      </p>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-3xl mx-auto space-y-6'>
                <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                  Stay Updated with Our Publications
                </h2>
                <div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
                <p className='text-base font-light leading-relaxed text-secondary mb-8'>
                  Subscribe to receive notifications about new publications,
                  reports, and campaign materials
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link href='/contact'>
                    <Button
                      size='lg'
                      className='bg-primary hover:bg-primary-dark text-white transition-colors duration-300'
                    >
                      Subscribe to Updates
                    </Button>
                  </Link>
                  <Link href='/publications/nostalgic-narendrapur'>
                    <Button
                      size='lg'
                      variant='outline'
                      className='border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300'
                    >
                      <BookOpen className='h-4 w-4 mr-2' />
                      Latest Magazine
                    </Button>
                  </Link>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
