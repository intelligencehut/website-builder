'use client';

import { useState } from 'react';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar,
  ExternalLink,
  Eye,
  Newspaper,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const mediaItems = [
  {
    id: 'telegraph-coverage-1',
    title: "The Telegraph Features SEVAA's Community Work",
    publication: 'The Telegraph',
    excerpt:
      "SEVAA's impactful work in rural development and education has been highlighted in The Telegraph, showcasing our commitment to community service.",
    date: '2024',
    category: 'Print Media',
    image: '/images/userfiles/image/the telegraph_001.jpg',
    description:
      "The Telegraph newspaper has featured our organization's remarkable work in community development, highlighting our educational initiatives, healthcare programs, and sustainable development efforts in rural areas.",
    fullContent: `
      <p>The Telegraph's comprehensive coverage of SEVAA's work has brought significant attention to our community development initiatives. The article highlights several key aspects of our programs:</p>
      
      <h4>Educational Initiatives</h4>
      <p>Our innovative approach to education, including the forest school project at Saparambera, has been praised for its unique blend of traditional knowledge and modern pedagogy. The coverage emphasizes how we respect tribal culture while preparing students for contemporary challenges.</p>
      
      <h4>Healthcare Programs</h4>
      <p>The newspaper featured our medical camps and healthcare initiatives, particularly highlighting our work with tribal communities in remote areas. Our collaborative approach with specialist doctors from Kolkata has been noted as exemplary.</p>
      
      <h4>Sustainable Development</h4>
      <p>The Telegraph's report emphasized our commitment to environmentally sustainable development practices and our focus on long-term community empowerment rather than short-term aid.</p>
    `,
  },
  {
    id: 'telegraph-coverage-2',
    title: "SEVAA's Educational Initiatives in Media Spotlight",
    publication: 'The Telegraph',
    excerpt:
      'Our forest school project and educational programs receive detailed coverage in The Telegraph.',
    date: '2024',
    category: 'Print Media',
    image: '/images/userfiles/image/the telegraph_002.jpg',
    description:
      'Extended coverage of our educational initiatives, including the innovative forest school project at Saparambera and our commitment to providing quality education that respects traditional knowledge while preparing students for the modern world.',
    fullContent: `
      <p>This detailed coverage focuses specifically on SEVAA's groundbreaking educational initiatives and their impact on rural communities:</p>
      
      <h4>Forest School Project</h4>
      <p>The Tilka Murmu SEVAA Vano Vidyalay (Forest School) at Saparambera represents a revolutionary approach to education. The Telegraph highlighted how this school integrates environmental learning with traditional curriculum, allowing students to learn in harmony with nature.</p>
      
      <h4>Navadisha Project</h4>
      <p>Our educational initiative in Ukhra has been recognized for its holistic approach to character development and quality education. The project serves students from multiple primary and secondary schools in the region.</p>
      
      <h4>Online Learning During Pandemic</h4>
      <p>The coverage praised our quick adaptation during COVID-19, when we launched 'Sudur Pathshala' to serve 15 schools across 12 districts in West Bengal, ensuring continuity of education for marginalized students.</p>
    `,
  },
  {
    id: 'telegraph-coverage-3',
    title: 'Healthcare and Community Development Coverage',
    publication: 'The Telegraph',
    excerpt:
      'The Telegraph highlights our healthcare initiatives and community development programs.',
    date: '2024',
    category: 'Print Media',
    image: '/images/userfiles/image/the telegraph_003.jpg',
    description:
      'Comprehensive coverage of our healthcare camps, medical assistance programs, and community development initiatives that are making a real difference in the lives of tribal and rural communities.',
    fullContent: `
      <p>The Telegraph's feature on our healthcare and community development work showcased the comprehensive approach SEVAA takes towards holistic community welfare:</p>
      
      <h4>Medical Camps and Healthcare</h4>
      <p>Our regular medical camps in Saparambera and other remote villages have been highlighted, featuring specialist doctors including gynecologists from Kolkata who volunteer their time to serve tribal communities with limited access to healthcare.</p>
      
      <h4>COVID-19 Response</h4>
      <p>The coverage praised our rapid response during the pandemic, including financial support for COVID care centers at Narendrapur College and assistance to voluntary organizations working in public health.</p>
      
      <h4>Community Capacity Building</h4>
      <p>The article emphasized our Local Area Coordinator (LAC) training programs that build local capacity for sustainable community development, ensuring long-term impact beyond direct interventions.</p>
    `,
  },
  {
    id: 'pabitra-sarkar-article',
    title: 'Feature Article on SEVAA by Pabitra Sarkar',
    publication: 'Print Media',
    excerpt:
      "An in-depth article about SEVAA's work and impact by renowned writer Pabitra Sarkar.",
    date: '2024',
    category: 'Feature Article',
    image: '/images/userfiles/image/Pabitra Sarkar article on SEVAA.jpg',
    description:
      "A detailed feature article by Pabitra Sarkar that explores SEVAA's philosophy, approach to community service, and the tangible impact of our programs on rural and tribal communities.",
    fullContent: `
      <p>Renowned writer Pabitra Sarkar's comprehensive feature article provides an in-depth analysis of SEVAA's philosophy and methodology:</p>
      
      <h4>Vivekananda's Vision in Action</h4>
      <p>The article explores how SEVAA translates Swami Vivekananda's ideal of "Shivjnaney Jibsheba" (service to humanity as worship of the divine) into practical community development programs.</p>
      
      <h4>Genesis and Growth</h4>
      <p>Sarkar traces SEVAA's origins from a WhatsApp group of Narendrapur college alumni to a registered society making tangible differences in rural Bengal, highlighting the power of collective action.</p>
      
      <h4>Impact Assessment</h4>
      <p>The article includes testimonials from beneficiaries and provides concrete examples of how SEVAA's interventions have improved lives, from supporting MBBS and engineering students to establishing schools in remote areas.</p>
      
      <h4>Future Vision</h4>
      <p>Sarkar concludes by examining SEVAA's expansion plans and its commitment to sustainable, community-driven development that respects local culture while embracing progress.</p>
    `,
  },
];

export default function MediaPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className='flex justify-center mb-6'
                >
                  <div className='p-4 bg-primary/10 rounded-full'>
                    <Newspaper className='h-12 w-12 text-primary' />
                  </div>
                </motion.div>
                <motion.h1
                  className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Print and Digital Media
                </motion.h1>
                <motion.p
                  className='text-lg text-secondary leading-relaxed max-w-3xl mx-auto'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Discover how SEVAA&apos;s impactful work has been featured in
                  various print and digital media outlets, showcasing our
                  commitment to community development and social service.
                </motion.p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className='py-20 bg-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <InViewAnimation>
              <div className='text-center mb-16'>
                <h2 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-4'>
                  Media Coverage
                </h2>
                <p className='text-lg text-secondary max-w-2xl mx-auto'>
                  Our work has been recognized and featured in various media
                  outlets, helping us reach a wider audience and inspire more
                  people to join our cause.
                </p>
              </div>
            </InViewAnimation>

            <div className='space-y-12'>
              {mediaItems.map((item, index) => (
                <InViewAnimation key={item.id} delay={index * 0.1}>
                  <Card className='overflow-hidden bg-white border border-border shadow-md hover:shadow-lg transition-all duration-300'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
                      <div
                        className={`relative h-80 lg:h-96 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className='object-cover hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
                        <div className='absolute bottom-4 left-4 right-4'>
                          <Badge className='bg-primary text-white mb-2'>
                            {item.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent
                        className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                      >
                        <div className='space-y-6'>
                          <div className='flex items-center space-x-4 text-sm text-secondary'>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-2' />
                              {item.date}
                            </div>
                            <Badge variant='outline' className='text-xs'>
                              {item.publication}
                            </Badge>
                          </div>

                          <div className='space-y-4'>
                            <h3 className='font-display text-2xl md:text-3xl font-light text-text-primary leading-tight'>
                              {item.title}
                            </h3>

                            <p className='text-base text-secondary leading-relaxed'>
                              {item.description}
                            </p>

                            {/* Expanded Content */}
                            <AnimatePresence>
                              {expandedItems.includes(item.id) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className='overflow-hidden'
                                >
                                  <div className='mt-4 pt-4 border-t border-gray-200'>
                                    <div
                                      className='prose prose-sm max-w-none text-secondary'
                                      dangerouslySetInnerHTML={{
                                        __html: item.fullContent,
                                      }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className='flex flex-col sm:flex-row gap-4'>
                            <Button
                              className='bg-primary hover:bg-primary-dark text-white'
                              onClick={() => {
                                // Open image in new tab for full view
                                window.open(item.image, '_blank');
                              }}
                            >
                              <Eye className='h-4 w-4 mr-2' />
                              View Coverage
                            </Button>
                            <Button
                              variant='outline'
                              className='border-primary text-primary hover:bg-primary-light'
                              onClick={() => toggleExpanded(item.id)}
                            >
                              {expandedItems.includes(item.id) ? (
                                <>
                                  <ChevronUp className='h-4 w-4 mr-2' />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className='h-4 w-4 mr-2' />
                                  Read More
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </InViewAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Media Recognition Section */}
        <section className='py-20 bg-accent'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <InViewAnimation>
              <Card className='bg-white border border-primary/20 shadow-lg'>
                <CardContent className='p-8 md:p-12 text-center'>
                  <h3 className='font-display text-3xl md:text-4xl font-light text-text-primary mb-6'>
                    Media Recognition
                  </h3>
                  <p className='text-lg text-secondary leading-relaxed max-w-4xl mx-auto mb-8'>
                    The recognition of our work in print and digital media helps
                    us build trust, attract supporters, and inspire more
                    organizations and individuals to contribute to the cause of
                    rural development and community service. Each media coverage
                    brings us closer to our goal of creating sustainable and
                    meaningful change in the communities we serve.
                  </p>

                  <div className='grid md:grid-cols-3 gap-8 mt-12'>
                    <div className='text-center'>
                      <div className='p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                        <Newspaper className='h-8 w-8 text-primary' />
                      </div>
                      <h4 className='text-xl font-medium text-text-primary mb-2'>
                        Print Media
                      </h4>
                      <p className='text-secondary'>
                        Featured in established newspapers and publications
                      </p>
                    </div>

                    <div className='text-center'>
                      <div className='p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                        <Eye className='h-8 w-8 text-primary' />
                      </div>
                      <h4 className='text-xl font-medium text-text-primary mb-2'>
                        Visibility
                      </h4>
                      <p className='text-secondary'>
                        Increased awareness of our community programs
                      </p>
                    </div>

                    <div className='text-center'>
                      <div className='p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                        <ExternalLink className='h-8 w-8 text-primary' />
                      </div>
                      <h4 className='text-xl font-medium text-text-primary mb-2'>
                        Outreach
                      </h4>
                      <p className='text-secondary'>
                        Connecting with supporters and stakeholders
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </InViewAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
