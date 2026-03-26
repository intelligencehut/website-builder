import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { InViewAnimation } from '@/components/common';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description:
    "Get in touch with SEVAA. We're here to help and answer any questions you may have about our programs and initiatives. Contact us for volunteering, donations, partnerships, or general inquiries.",
  keywords: [
    'contact',
    'get in touch',
    'support',
    'help',
    'volunteer',
    'donate',
    'partnership',
    'inquiry',
  ],
  url: '/contact',
});

export default function ContactPage() {
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
                  Contact SEVAA
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  We&apos;re here to help and answer any questions you may have.
                  Whether you want to volunteer, donate, or learn more about our
                  work, we&apos;d love to hear from you.
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto'>
              {/* Contact Information */}
              <InViewAnimation>
                <div className='space-y-8'>
                  <div>
                    <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                      Get in Touch
                    </h2>
                    <p className='text-base font-light leading-relaxed text-secondary mb-8'>
                      Have questions about our programs or want to get involved?
                      We&apos;re always excited to connect with like-minded
                      individuals who share our passion for positive change.
                    </p>
                  </div>

                  <div className='space-y-6'>
                    {/* Office Address */}
                    <div className='flex items-start gap-4'>
                      <div className='bg-primary/10 p-3 rounded-md'>
                        <MapPinIcon className='h-6 w-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='text-xl font-medium text-text-primary mb-2'>
                          Our Office
                        </h3>
                        <p className='text-base font-light text-secondary'>
                          131/B Sri Ramkrishna Pally, Sonarpur
                          <br />
                          Kolkata-700150, West Bengal
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className='flex items-start gap-4'>
                      <div className='bg-primary/10 p-3 rounded-md'>
                        <PhoneIcon className='h-6 w-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='text-xl font-medium text-text-primary mb-2'>
                          Phone
                        </h3>
                        <p className='text-base font-light text-secondary'>
                          +91 98271 93272
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className='flex items-start gap-4'>
                      <div className='bg-primary/10 p-3 rounded-md'>
                        <MailIcon className='h-6 w-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='text-xl font-medium text-text-primary mb-2'>
                          Email
                        </h3>
                        <p className='text-base font-light text-secondary'>
                          infosevaa@gmail.com
                        </p>
                      </div>
                    </div>

                    {/* Office Hours */}
                    <div className='flex items-start gap-4'>
                      <div className='bg-primary/10 p-3 rounded-md'>
                        <ClockIcon className='h-6 w-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='text-xl font-medium text-text-primary mb-2'>
                          Office Hours
                        </h3>
                        <p className='text-base font-light text-secondary'>
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 1:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Response Promise */}
                  <div className='bg-accent border border-primary/20 rounded-md p-6'>
                    <h3 className='text-xl font-medium text-text-primary mb-3'>
                      Quick Response Guarantee
                    </h3>
                    <p className='text-base font-light text-secondary'>
                      We typically respond to all inquiries within 24 hours
                      during business days. For urgent matters, please call us
                      directly.
                    </p>
                  </div>
                </div>
              </InViewAnimation>

              {/* Contact Form */}
              <InViewAnimation delay={0.2}>
                <ContactForm />
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-24 bg-accent'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-3xl mx-auto mb-12'>
                <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                  Frequently Asked Questions
                </h2>
                <p className='text-base font-light leading-relaxed text-secondary'>
                  Here are some common questions we receive. If you don&apos;t
                  find what you&apos;re looking for, please don&apos;t hesitate
                  to contact us.
                </p>
              </div>
            </InViewAnimation>

            <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
              <InViewAnimation delay={0.1}>
                <div className='bg-white border border-border rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-medium text-text-primary mb-3'>
                    How can I volunteer with SEVAA?
                  </h3>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    We welcome volunteers from all backgrounds. You can start by
                    filling out our volunteer form or contacting us directly to
                    discuss available opportunities that match your skills and
                    interests.
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <div className='bg-white border border-border rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-medium text-text-primary mb-3'>
                    What programs does SEVAA currently run?
                  </h3>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    We focus on education, healthcare, livelihood development,
                    and environmental conservation. Visit our programs page to
                    learn more about our current initiatives and their impact.
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.3}>
                <div className='bg-white border border-border rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-medium text-text-primary mb-3'>
                    How are donations used?
                  </h3>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    We maintain complete transparency in our financial
                    operations. Detailed reports showing how donations are
                    utilized are available in our annual reports section.
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.4}>
                <div className='bg-white border border-border rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-medium text-text-primary mb-3'>
                    Can I visit your office?
                  </h3>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    Yes, we welcome visitors during our office hours. However,
                    we recommend calling ahead to ensure someone is available to
                    meet with you and answer your questions.
                  </p>
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
