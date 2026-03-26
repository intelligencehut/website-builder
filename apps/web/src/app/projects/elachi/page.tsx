'use client';

import Image from 'next/image';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ElachiProjectPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Elachi Project
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                SEVAA&apos;s pioneering Communicative English Course initiative in Elachi village, Ramchandrapur
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Our First Initiative
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Elachi Project was SEVAA&apos;s very first initiative, marking the beginning of our journey in 
                  community education and development. This groundbreaking program set the foundation for all our 
                  subsequent educational endeavors.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Project Highlights
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Duration:</strong> 4-month intensive program</p>
                    <p><strong>Participants:</strong> 95 students from Class V to Class XII</p>
                    <p><strong>Location:</strong> Village Elachi, Ramchandrapur (near Narendrapur)</p>
                    <p><strong>Delivery:</strong> Professional trainers and innovative methodologies</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/projects/elachi/capacity-building-program.jpg" 
                  alt="Elachi Project - Capacity Building Program" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Communicative English Course
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                An innovative approach to English language learning combining international methodologies 
                with contextual Indian educational frameworks
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Methodology */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Innovative Methodology</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The course was uniquely designed by amalgamating the &apos;Dianetics&apos; chapter of Scientology 
                    (a UK-based study technology) with the written Indian version of the &apos;Eclectic method&apos;.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Course Features:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Professional trainer-led sessions</li>
                      <li>• Interactive communication methods</li>
                      <li>• Contextual learning approach</li>
                      <li>• Progressive skill development</li>
                      <li>• Practical application focus</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Program Structure */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Structure</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">95</div>
                      <div className="text-sm text-gray-600">Students Enrolled</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">2</div>
                      <div className="text-sm text-gray-600">Batches</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4</div>
                      <div className="text-sm text-gray-600">Months Duration</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">V-XII</div>
                      <div className="text-sm text-gray-600">Class Range</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact and Success */}
            <div className="bg-orange-50 rounded-xl p-8">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Project Impact & Legacy</h3>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                  The remarkable success of the Elachi Project became the cornerstone of SEVAA&apos;s educational initiatives. 
                  This pilot program&apos;s achievements inspired us to replicate similar projects across other parts of West Bengal, 
                  demonstrating the effectiveness of our innovative teaching methodologies and community-centric approach.
                </p>
                <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-orange-600 font-semibold text-lg">
                      &quot;This success story continues to guide our educational initiatives across Bengal&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}