'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import { InViewAnimation } from '@/components/common/InViewAnimation';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import type { Program, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'adur-pathshala',
    title: 'Adur Pathshala',
    description:
      'Neighborhood learning centers providing quality education in Purulia and Paschim Burdwan districts.',
    image: '/images/programs/seva-activities-1.jpg',
    location: 'West Bengal',
    status: 'Active',
    category: 'Education',
  },
  {
    id: 'vano-vidyalay',
    title: 'Tilka Murmu SEVAA Vano Vidyalay',
    description:
      'Forest school initiative connecting children with nature through experiential learning at Saparambera village with 52 families.',
    image: '/images/programs/saparambera-1.jpg',
    location: 'Saparambera, Ajodhya Hills, Purulia',
    status: 'Planned',
    year: '2025',
    category: 'Education',
    beneficiaries: 52,
  },
  {
    id: 'lac-cultivation',
    title: 'Lac Cultivation Project',
    description:
      'Sustainable livelihood program training farmers in lac cultivation techniques and market linkages.',
    image: '/images/gallery/gallery-1.jpg',
    location: 'Purulia',
    status: 'Active',
    category: 'Livelihood',
  },
  {
    id: 'kitchen-gardens',
    title: 'Organic Kitchen Gardens',
    description:
      'Community-based organic farming initiative promoting food security and nutrition at Saparambera village.',
    image: '/images/programs/saparambera-2.jpg',
    location: 'Saparambera',
    status: 'Active',
    category: 'Environment',
  },
  {
    id: 'health-camps',
    title: 'Health Awareness Camps',
    description:
      'Mobile healthcare services providing medical checkups and health education in rural areas.',
    image: '/images/programs/seva-activities-2.jpg',
    location: 'Purulia District',
    status: 'Active',
    category: 'Healthcare',
  },
  {
    id: 'banomahotsab',
    title: 'Banomahotsab',
    description:
      'Annual tree plantation festival promoting environmental conservation and community participation.',
    image: '/images/gallery/gallery-2.jpg',
    location: 'Multiple Locations',
    status: 'Annual',
    category: 'Environment',
  },
];

const categories = [
  'All',
  'Education',
  'Healthcare',
  'Livelihood',
  'Environment',
];
const statuses = ['All', 'Active', 'Planned', 'Development', 'Annual'];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Planned: 'bg-blue-100 text-blue-800',
  Development: 'bg-yellow-100 text-yellow-800',
  Annual: 'bg-purple-100 text-purple-800',
};

const categoryColors = {
  Education: 'bg-blue-500',
  Healthcare: 'bg-red-500',
  Livelihood: 'bg-green-500',
  Environment: 'bg-emerald-500',
};

interface Props {
  header?: SectionHeader;
  items?: Program[];
}

export function ProgramsSection({ header, items = DEFAULT_PROGRAMS }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrograms = items.filter(program => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || program.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' || program.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id='programs' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <InViewAnimation className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Current Programs
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Strategic initiatives creating measurable change in West Bengal and
            beyond
          </p>
        </InViewAnimation>

        {/* Search and Filter Controls */}
        <InViewAnimation className='mb-8'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
            {/* Search Bar */}
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search programs, locations, or keywords...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
              />
            </div>

            {/* Filter Toggle Button */}
            <div className='flex items-center justify-between mb-4'>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors'
              >
                <Filter className='w-4 h-4' />
                <span>Filters</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.div>
              </button>

              {filteredPrograms.length !== items.length && (
                <div className='text-sm text-gray-500'>
                  Showing {filteredPrograms.length} of {items.length}{' '}
                  programs
                </div>
              )}
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200'
                >
                  {/* Category Filter */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Category
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Status
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {statuses.map(status => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedStatus === status
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </InViewAnimation>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          <AnimatePresence mode='popLayout'>
            {filteredPrograms.map(program => (
              <motion.div
                key={program.id}
                variants={cardVariants}
                layout
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group'
              >
                {/* Program Image */}
                <div className='h-48 relative overflow-hidden'>
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-3 left-3 w-3 h-3 ${categoryColors[program.category]} rounded-full`}
                  ></div>
                </div>

                {/* Program Content */}
                <div className='p-6 space-y-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors'>
                      {program.title}
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {program.description}
                    </p>
                  </div>

                  {/* Program Details */}
                  <div className='space-y-2 text-sm text-gray-500'>
                    <div className='flex items-center'>
                      <MapPin className='w-4 h-4 mr-2' />
                      <span>{program.location}</span>
                    </div>

                    {program.beneficiaries && (
                      <div className='flex items-center'>
                        <Users className='w-4 h-4 mr-2' />
                        <span>
                          {program.beneficiaries.toLocaleString()}{' '}
                          {program.id === 'vano-vidyalay'
                            ? 'families'
                            : 'beneficiaries'}
                        </span>
                      </div>
                    )}

                    {program.year && (
                      <div className='flex items-center'>
                        <Calendar className='w-4 h-4 mr-2' />
                        <span>{program.year}</span>
                      </div>
                    )}
                  </div>

                  {/* Status and Action */}
                  <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[program.status]}`}
                    >
                      {program.status}
                    </span>

                    <AnimatedButton
                      variant='outline'
                      size='sm'
                      className='opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredPrograms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center py-12'
          >
            <div className='text-gray-400 mb-4'>
              <Search className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No programs found
            </h3>
            <p className='text-gray-600 mb-6'>
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className='text-orange-600 hover:text-orange-700 font-medium'
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <InViewAnimation className='text-center mt-16'>
          <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Want to learn more about our programs?
            </h3>
            <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
              Get detailed information about our ongoing initiatives, impact
              reports, and how you can contribute to our mission of community
              transformation.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <AnimatedButton
                variant='primary'
                size='lg'
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/documents/Tilka_Murmu_Forest_School.pdf';
                  link.download = 'SEVAA-Program-Brochure.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Program Brochure
              </AnimatedButton>
              <AnimatedButton
                variant='outline'
                size='lg'
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/contact';
                  }
                }}
              >
                Contact Our Team
              </AnimatedButton>
            </div>
          </div>
        </InViewAnimation>
      </div>
    </section>
  );
}
