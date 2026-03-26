'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NewsItem, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: "sevaa-booklet-2024",
    title: "SEVAA Booklet 2024 Released",
    excerpt: "Our comprehensive annual booklet showcasing all activities and achievements of SEVAA throughout 2024.",
    image: "/images/userfiles/image/Sevaa Booklet 2024_001.jpg",
    date: "2024",
    category: "Publication"
  },
  {
    id: "lac-training-program",
    title: "LAC Training Program Conducted",
    excerpt: "Successful completion of LAC (Local Area Coordinator) training program for community development.",
    image: "/images/news_image/org/lac training program-1721231943.jpg",
    date: "July 2024",
    category: "Training"
  },
  {
    id: "tilka-murmu-school",
    title: "Inauguration of Tilka Murmu SEVAA Vano Vidyalay",
    excerpt: "A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.",
    image: "/images/userfiles/image/Sevaa Booklet 2024_002.jpg",
    date: "March 9-10, 2025",
    category: "Education"
  },
  {
    id: "media-coverage-telegraph",
    title: "Media Coverage - The Telegraph",
    excerpt: "SEVAA's activities and impact featured in The Telegraph newspaper coverage.",
    image: "/images/userfiles/image/the telegraph_001.jpg",
    date: "2024",
    category: "Media"
  }
];

interface Props {
  header?: SectionHeader;
  items?: NewsItem[];
}

export function NewsSection({ header, items = DEFAULT_NEWS_ITEMS }: Props) {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            News & Media
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Stay updated with our latest activities, announcements, and media coverage
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <Link href={`/news/${item.id}`}>
                    <Button 
                      variant="outline" 
                      className="mt-auto border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                    >
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/news">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                View All News & Media →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}