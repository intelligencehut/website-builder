'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import type { UpcomingEvent, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "lac-cultivation",
    title: "Lac Cultivation Training Program",
    description: "Cluster-based lac cultivation training for sustainable livelihood development in Purulia district.",
    image: "/images/events/1.jpg",
    date: "Ongoing",
    location: "Purulia District",
    category: "Livelihood"
  },
  {
    id: "adur-pathshala",
    title: "Adur Pathshala - Learning Centers",
    description: "Neighbourhood learning centres providing quality education in rural areas of Purulia and Paschim Burdwan.",
    image: "/images/events/2.jpg",
    date: "Continuous",
    location: "Purulia & Paschim Burdwan",
    category: "Education"
  },
  {
    id: "organic-garden",
    title: "Organic & Kitchen Garden Project",
    description: "Promoting organic farming and kitchen gardens for food security and sustainable agriculture.",
    image: "/images/events/3.jpg",
    date: "Year Round",
    location: "Saparambera Village, Ajudhya Hills",
    category: "Agriculture"
  },
  {
    id: "health-camp",
    title: "Health Awareness & Medical Camp",
    description: "Regular health checkups and awareness programs for rural communities in Purulia district.",
    image: "/images/events/2.jpg",
    date: "Monthly",
    location: "Purulia District",
    category: "Healthcare"
  }
];

const DEFAULT_ACTIVITIES = [
  "School building under Construction",
  "Health and Well-being Camps",
  "Cluster based Lac cultivation",
  "Organic food production",
  "Audio visual Program at community centres"
];

interface Props {
  header?: SectionHeader;
  upcoming?: UpcomingEvent[];
  activities?: string[];
}

export function UpcomingEventsSection({ header, upcoming = DEFAULT_UPCOMING_EVENTS, activities = DEFAULT_ACTIVITIES }: Props) {
  return (
    <section id="events" className="py-20 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h5 className="text-lg font-semibold text-primary mb-2">Upcoming Events</h5>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Join to our upcoming events and get involved
              </h2>
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-secondary text-lg">{activity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link href="/programs">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    View All Programs →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcoming.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full bg-white">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-secondary mb-4 leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-secondary">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-secondary">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/programs">
              <Button 
                variant="outline"
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Explore All Our Activities →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}