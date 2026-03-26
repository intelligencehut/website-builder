'use client';

import { Layout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const newsArticles = [
  {
    id: 'tilka-murmu-school',
    title: 'Inauguration of Tilka Murmu SEVAA Vano Vidyalay',
    excerpt: 'A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.',
    content: `
      <p>We are proud to announce the inauguration of the Tilka Murmu SEVAA Vano Vidyalay (Forest School) on 9th & 10th March 2025 at Saparambera, Ajodhya Hills, Purulia.</p>
      
      <p>This groundbreaking initiative represents our commitment to providing quality education in harmony with nature. The school features:</p>
      
      <ul>
        <li>Eco-friendly classrooms designed to blend with the natural environment</li>
        <li>Allied facilities including library, computer lab, and health center</li>
        <li>Community centers for local engagement and development</li>
        <li>Sustainable infrastructure using local materials and renewable energy</li>
      </ul>
      
      <p>The forest school will serve the tribal and rural communities of the Ajodhya Hills region, providing education that respects and incorporates traditional knowledge while preparing students for the modern world.</p>
    `,
    image: '/images/userfiles/image/Sevaa Booklet 2024_001.jpg',
    date: 'March 9-10, 2025',
    category: 'Education',
    tags: ['Forest School', 'Education', 'Community Development', 'Sustainability'],
    pdfLink: '/userfiles/Tilka Murmu Forest School.pdf'
  },
  {
    id: 'sevaa-booklet-2024',
    title: 'SEVAA Annual Booklet 2024 Released',
    excerpt: 'Our comprehensive annual booklet showcasing all activities, achievements, and impact of SEVAA throughout 2024.',
    content: `
      <p>We are pleased to release our Annual Booklet for 2024, a comprehensive document that showcases the remarkable journey of SEVAA throughout the year.</p>
      
      <p>The booklet includes:</p>
      
      <ul>
        <li>Detailed reports on all our educational initiatives</li>
        <li>Healthcare and livelihood programs impact assessment</li>
        <li>Financial transparency and accountability reports</li>
        <li>Stories from beneficiaries and community members</li>
        <li>Future plans and vision for upcoming projects</li>
      </ul>
      
      <p>This publication reflects our commitment to transparency and community engagement, providing stakeholders with insights into how their support translates into meaningful change.</p>
    `,
    image: '/images/userfiles/image/Sevaa Booklet 2024_002.jpg',
    date: '2024',
    category: 'Publication',
    tags: ['Annual Report', 'Transparency', 'Impact Assessment']
  },
  {
    id: 'lac-training-program',
    title: 'LAC Training Program Successfully Completed',
    excerpt: 'Successful completion of Local Area Coordinator training program for community development and capacity building.',
    content: `
      <p>Our Local Area Coordinator (LAC) Training Program has been successfully completed, marking a significant milestone in our community development efforts.</p>
      
      <p>The training program focused on:</p>
      
      <ul>
        <li>Community mobilization and engagement strategies</li>
        <li>Project management and monitoring techniques</li>
        <li>Local resource mapping and utilization</li>
        <li>Sustainable development practices</li>
        <li>Leadership and communication skills</li>
      </ul>
      
      <p>The newly trained coordinators will play a crucial role in implementing our grassroots programs and ensuring community ownership of development initiatives.</p>
    `,
    image: '/images/news_image/org/lac training program-1721231943.jpg',
    date: 'July 2024',
    category: 'Training',
    tags: ['Capacity Building', 'Community Development', 'Leadership']
  },
  {
    id: 'media-coverage-telegraph',
    title: 'SEVAA Featured in The Telegraph',
    excerpt: 'Our organization and impactful work has been featured in The Telegraph newspaper, highlighting our community development initiatives.',
    content: `
      <p>We are honored to be featured in The Telegraph newspaper, which has highlighted our ongoing community development initiatives and their impact on rural communities.</p>
      
      <p>The coverage includes:</p>
      
      <ul>
        <li>Our educational programs in remote areas</li>
        <li>Healthcare initiatives and medical camps</li>
        <li>Livelihood generation projects</li>
        <li>Environmental conservation efforts</li>
        <li>Community testimonials and success stories</li>
      </ul>
      
      <p>This media recognition helps us reach a wider audience and attract more supporters to our cause of serving the underprivileged communities.</p>
    `,
    image: '/images/userfiles/image/the telegraph_001.jpg',
    date: '2024',
    category: 'Media Coverage',
    tags: ['Media', 'Recognition', 'Community Impact']
  }
];

export default function NewsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              News & Media
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stay updated with our latest activities, announcements, and media coverage
            </motion.p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Card className="overflow-hidden">
                    <div className="relative h-80">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900">
                    {article.title}
                  </h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/news/${article.id}`}>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        Read Full Article
                      </Button>
                    </Link>
                    {article.pdfLink && (
                      <Link href={article.pdfLink} target="_blank">
                        <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}