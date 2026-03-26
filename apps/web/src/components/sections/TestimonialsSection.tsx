'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Quote } from 'lucide-react';
import type { Testimonial, SectionHeader } from '@website-builder/content-schema';

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Himadri Saha",
    title: "Engineer",
    content: "I have been introduced with SEVAA through Pratham Housing Complex where a good number of SEVAA friends stay. I have been associated for last few years and see that the wheel turners who are running SEVAA are genuinely performing activities in the society, particularly for tribals and downtrodden people."
  },
  {
    id: 2,
    name: "Dr M M Ghatak",
    title: "MD, Physician, eminent social worker and Chairman of Medical Rehabilitation Trust (MRT), Kolkata",
    content: "Wherever SEVAA works, a magical result is seen. It is due to the blessings of Thakur-Maa-Swamiji. SEVAA could converge education with health, health with agriculture, agriculture with environment and finally it promotes well being of the suffering people. This inspired my organisation, Medical Rehabilitation Trust to make a permanent tie with SEVAA. I hope a rapid success of this organisation in future."
  }
];

interface Props {
  header?: SectionHeader;
  items?: Testimonial[];
}

export function TestimonialsSection({ header, items = DEFAULT_TESTIMONIALS }: Props) {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h5 className="text-primary font-medium text-lg mb-4">Testimonials</h5>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            What people say <br />
            About Sevaa
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {items.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/1">
                  <div className="p-4">
                    <Card className="bg-white border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="text-center space-y-6">
                          <Quote className="h-8 w-8 text-primary mx-auto" />
                          
                          <blockquote className="text-lg text-secondary leading-relaxed italic">
                            &ldquo;{testimonial.content}&rdquo;
                          </blockquote>
                          
                          <div className="space-y-2">
                            <h4 className="text-xl font-semibold text-text-primary">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-secondary">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary border-primary hover:bg-primary-light" />
            <CarouselNext className="text-primary border-primary hover:bg-primary-light" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}