'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, BookOpen } from 'lucide-react';
import type { Resource, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: 'tilka-murmu-forest-school',
    title: 'Tilka Murmu SEVAA Vano Vidyalay',
    description: 'Inauguration details and facilities information for Tilka Murmu Forest School at Saparambera, Ajodhya Hills, Purulia.',
    type: 'pdf',
    url: '/documents/Tilka Murmu Forest School.pdf',
    size: '2.1 MB',
    date: 'March 2025'
  },
  {
    id: 'annual-report-2024',
    title: 'Annual Report 2024',
    description: 'Comprehensive overview of our activities, impact, and financial statements for the year 2024.',
    type: 'report',
    url: '#',
    size: 'Coming Soon',
    date: '2024'
  },
  {
    id: 'audited-reports',
    title: 'Audited Financial Reports',
    description: 'Year-wise audited financial reports showing transparency in our fund utilization.',
    type: 'report',
    url: '#',
    size: 'Multiple Files',
    date: 'Yearly'
  },
  {
    id: 'program-brochure',
    title: 'Program Brochure',
    description: 'Detailed information about all our ongoing programs and initiatives.',
    type: 'document',
    url: '#',
    size: 'Coming Soon',
    date: '2024'
  }
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-6 w-6" />;
    case 'report':
      return <BookOpen className="h-6 w-6" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

interface Props {
  header?: SectionHeader;
  items?: Resource[];
}

export function ResourcesSection({ header, items = DEFAULT_RESOURCES }: Props) {
  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Resources & Downloads
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our annual reports, program documentation, and other important resources to learn more about our work and impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-sm line-clamp-3">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{resource.date}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {resource.size}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant={resource.url === '#' ? 'outline' : 'default'}
                    size="sm"
                    className="w-full"
                    disabled={resource.url === '#'}
                  >
                    {resource.url === '#' ? (
                      <span>Coming Soon</span>
                    ) : (
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Looking for Something Specific?
              </h3>
              <p className="text-gray-600">
                Can&apos;t find the document you&apos;re looking for? Contact us and we&apos;ll be happy to help you access the information you need.
              </p>
              <Button variant="outline" size="lg">
                Contact Us for More Resources
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}