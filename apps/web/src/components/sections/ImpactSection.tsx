'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Heart, TreePine } from 'lucide-react';
import { InViewAnimation } from '@/components/common/InViewAnimation';
import type { SectionHeader } from '@website-builder/content-schema';

interface ImpactAreaWithIcon {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
}

const DEFAULT_IMPACT_AREAS: ImpactAreaWithIcon[] = [
  {
    icon: <Users className='w-8 h-8' />,
    label: 'Community Development',
    description:
      'Empowering communities through sustainable development initiatives',
    color: 'bg-blue-500',
  },
  {
    icon: <BookOpen className='w-8 h-8' />,
    label: 'Education & Awareness',
    description:
      'Quality education through Adur Pathshala and awareness programs',
    color: 'bg-green-500',
  },
  {
    icon: <Heart className='w-8 h-8' />,
    label: 'Healthcare Services',
    description: 'Health awareness camps and medical support initiatives',
    color: 'bg-red-500',
  },
  {
    icon: <TreePine className='w-8 h-8' />,
    label: 'Environmental Conservation',
    description:
      'Tree plantation and environmental awareness through Banomahotsab',
    color: 'bg-emerald-500',
  },
];

interface Props {
  header?: SectionHeader;
  items?: ImpactAreaWithIcon[];
}

export function ImpactSection({ header, items = DEFAULT_IMPACT_AREAS }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id='impact'
      className='py-20 bg-gradient-to-br from-gray-50 to-white'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <InViewAnimation className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Our Impact
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Measuring success through lives transformed, communities empowered,
            and sustainable change created across West Bengal
          </p>
        </InViewAnimation>

        {/* Our Impact Areas */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'
        >
          {items.map((area, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group'
            >
              <div
                className={`w-16 h-16 ${area.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {area.icon}
              </div>

              <div className='space-y-3'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {area.label}
                </h3>

                <p className='text-sm text-gray-600 leading-relaxed'>
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Commitment */}
        <InViewAnimation>
          <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Our Commitment
              </h3>
              <p className='text-gray-600'>
                Dedicated to creating sustainable change in rural West Bengal
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-center'>
              <div className='p-4'>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  Sustainable Development
                </h4>
                <p className='text-gray-600'>
                  Creating lasting change through education, healthcare, and
                  environmental initiatives
                </p>
              </div>
              <div className='p-4'>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  Community Empowerment
                </h4>
                <p className='text-gray-600'>
                  Working with local communities to build capacity and
                  self-reliance
                </p>
              </div>
            </div>
          </div>
        </InViewAnimation>

        {/* Call to Action */}
        <InViewAnimation className='text-center mt-16'>
          <div className='bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white'>
            <h3 className='text-2xl md:text-3xl font-bold mb-4'>
              Want to be part of our next milestone?
            </h3>
            <p className='text-orange-100 mb-6 max-w-2xl mx-auto'>
              Join us in creating lasting impact. Every contribution, every
              volunteer hour, every partnership brings us closer to our vision
              of an empowered society.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('support');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/join-us';
                  }
                }}
                className='bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors'
              >
                Support Our Mission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Pre-select volunteer option in the form
                    setTimeout(() => {
                      const selectElement = document.querySelector(
                        'select[required]'
                      ) as HTMLSelectElement;
                      if (selectElement) {
                        selectElement.value = 'volunteer';
                      }
                    }, 500);
                  } else {
                    window.location.href = '/contact?type=volunteer';
                  }
                }}
                className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors'
              >
                Become a Volunteer
              </motion.button>
            </div>
          </div>
        </InViewAnimation>
      </div>
    </section>
  );
}
