'use client';

import Image from 'next/image';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UkhraProjectPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Ukhra Project
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering education and community development in Ukhra village, Paschim Bardhaman
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Project Overview
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ukhra village is an ancient hamlet of Paschim Bardhaman. Rich in Shaivite-Shakta-Vaishnava akharas and temples, 
                  the village is not identified as a poor one, but to SEVAA, this hamlet seems problematic in other ways.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Key Challenges Identified</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Education Quality:</strong> Although there are more than 15 primary schools and 5 high schools, 
                      our survey found that 50% of children lack proper reading ability and 80% struggle with writing skills.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Health Awareness:</strong> Limited health awareness among residents, with common diseases like 
                      diabetes and hypertension being prevalent due to lack of preventive care knowledge.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Environmental Challenges:</strong> Rapid soil degradation and deforestation due to coal mining 
                      activities in the area, affecting the quality of life.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Infrastructure:</strong> Poor drainage system causing flooding during monsoons due to inadequate 
                      water management in this century-old semi-urban settlement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/projects/ukhra/ukhra 24.jpg" 
                  alt="Ukhra Project Overview" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Initiatives */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                SEVAA Ukhra Initiatives
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach to community development through education, health, and environmental initiatives
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Ukhra Nabadisha */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ukhra Nabadisha</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A comprehensive educational project covering 5 primary schools and 1 girls&apos; high school, 
                    reaching approximately 900 children in the village.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Objectives:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Develop quality reading ability among 100% children</li>
                      <li>• Enhance listening and speaking skills</li>
                      <li>• Foster observation skills and reasoning abilities</li>
                      <li>• Develop independent writing capabilities</li>
                      <li>• Encourage creativity among students</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SMART Class */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SMART Class Initiative</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    For the first time, SEVAA introduced digital education during regular school hours. 
                    The SMART room in the girls&apos; school was equipped with new technology.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Advanced camera systems for interactive learning</li>
                      <li>• Two-way communication capabilities</li>
                      <li>• Focus on classes 11 and 12 students</li>
                      <li>• Integration with school curriculum</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Joy Box Programme */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Joy Box Programme</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A portable Audio Visual unit designed to make learning engaging and interactive for children across schools.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Activities:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Story listening sessions</li>
                      <li>• Visual problem-solving exercises</li>
                      <li>• Mind mapping for concept development</li>
                      <li>• Vocabulary enhancement activities</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Environmental Initiatives */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Initiatives</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Addressing environmental challenges through tree plantation and community awareness programs.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Actions Taken:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Tree plantation festival in 2023</li>
                      <li>• Saplings planted along water bodies</li>
                      <li>• Community environmental awareness</li>
                      <li>• Long-term sustainability focus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Winter Service Creation Festival */}
            <div className="bg-orange-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Winter Service Creation Festival</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    In December 2023, when schools were closed, SEVAA organized a creative festival for 100 backward students 
                    from Navadisha schools.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Festival Activities:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Music and dance workshops</li>
                      <li>• Drawing and painting sessions</li>
                      <li>• Recitation and drama activities</li>
                      <li>• 10-day intensive program</li>
                      <li>• Community feast and gift distribution</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/projects/ukhra/ukhra 25.jpg" 
                    alt="Winter Service Creation Festival" 
                    width={500} 
                    height={400} 
                    className="object-cover w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Project Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Moments captured from our various activities and initiatives in Ukhra
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: '/images/projects/ukhra/ukhra 20.jpg', alt: 'Ukhra Project Activity 1' },
                { src: '/images/projects/ukhra/ukhra 21.jpg', alt: 'Ukhra Project Activity 2' },
                { src: '/images/projects/ukhra/ukhra 22.jpg', alt: 'Ukhra Project Activity 3' },
                { src: '/images/projects/ukhra/ukhra 23.jpg', alt: 'Ukhra Project Activity 4' },
                { src: '/images/projects/ukhra/ukhra 26.jpg', alt: 'Ukhra Project Activity 5' },
                { src: '/images/projects/ukhra/ukhra 27.jpg', alt: 'Ukhra Project Activity 6' }
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}