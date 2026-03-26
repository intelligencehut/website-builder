'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  GraduationCap,
  Building2,
  AlertTriangle,
  Cake,
  Utensils,
  Stethoscope,
  HeartPulse,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SectionHeader } from '@website-builder/content-schema';

interface DonationOptionWithIcon {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_DONATION_OPTIONS: DonationOptionWithIcon[] = [
  {
    id: 'scholarships',
    icon: <GraduationCap className='h-6 w-6 text-primary' />,
    title: '\"We Support\" Group Scholarships',
    description:
      'Provide scholarships to deserving students and help them achieve their educational dreams',
  },
  {
    id: 'school-support',
    icon: <Building2 className='h-6 w-6 text-primary' />,
    title: 'Support the School',
    description:
      'Rs 1000 per student per month to support school operations and infrastructure',
  },
  {
    id: 'in-kind',
    icon: <Heart className='h-6 w-6 text-primary' />,
    title: 'In-Kind Donations',
    description:
      'Donate stationery, books, school infrastructure needs, computers, and other essential items',
  },
  {
    id: 'calamity-fund',
    icon: <AlertTriangle className='h-6 w-6 text-primary' />,
    title: 'Standby Funds for Natural Calamity',
    description:
      'Help us be prepared to provide immediate relief during natural disasters',
  },
  {
    id: 'celebration',
    icon: <Cake className='h-6 w-6 text-primary' />,
    title: 'Celebrate Special Days',
    description:
      'Celebrate birthdays and memorable days of your loved ones with our children - Lumpsum Rs 5000/-',
  },
  {
    id: 'sponsor-meal',
    icon: <Utensils className='h-6 w-6 text-primary' />,
    title: 'Sponsor a Meal',
    description: 'Sponsor a meal for our children in memory of your loved ones',
  },
  {
    id: 'medical-camp',
    icon: <Stethoscope className='h-6 w-6 text-primary' />,
    title: 'Sponsor a Medical Camp',
    description:
      'Support health initiatives by sponsoring medical camps for villagers and students',
  },
  {
    id: 'healthcare',
    icon: <HeartPulse className='h-6 w-6 text-primary' />,
    title: 'Sponsor Healthcare',
    description:
      'Support specific healthcare needs like cataract operations for villagers and students',
  },
  {
    id: 'general-fund',
    icon: <Wallet className='h-6 w-6 text-primary' />,
    title: 'General Fund for School Operations',
    description:
      'Contribute to the general fund to support day-to-day school operations',
  },
];

interface Props {
  header?: SectionHeader;
  donationOptions?: DonationOptionWithIcon[];
}

export function JoinUs({ header, donationOptions = DEFAULT_DONATION_OPTIONS }: Props) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-8 md:px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
            Join Us in Making a Difference
          </h2>
          <p className='text-base font-light leading-relaxed text-secondary max-w-3xl mx-auto'>
            We appeal for donations in any of the following account heads. Your
            contribution, no matter how small, creates a lasting impact on the
            lives of our children and communities.
          </p>
        </motion.div>

        {/* Donation Options Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {donationOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className='h-full bg-white border border-border hover:shadow-lg transition-shadow duration-300'>
                <CardHeader className='pb-4'>
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center'>
                      {option.icon}
                    </div>
                    <CardTitle className='text-xl font-medium text-text-primary leading-tight pt-2'>
                      {option.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='pt-0'>
                  <p className='text-base font-light leading-relaxed text-secondary'>
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center'
        >
          <Card className='bg-primary text-white border-primary max-w-4xl mx-auto shadow-md'>
            <CardContent className='p-8 md:p-12'>
              <h3 className='text-5xl md:text-4xl font-display font-light mb-4'>
                Ready to Make an Impact?
              </h3>
              <p className='text-white/90 mb-6 text-base font-light leading-relaxed max-w-3xl mx-auto'>
                Your support helps us continue our mission of empowering
                communities through education, healthcare, and sustainable
                development.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => (window.location.href = '/contact')}
                  className='px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors'
                >
                  Contact Us
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
