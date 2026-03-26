'use client';

import Image from 'next/image';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SaparamberaProjectPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Saparambera Vivekpally
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tilka Murmu SEVAA Vano Vidyalaya - A holistic community development platform in Ajodhya Hills
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← Back to Home
                </Button>
              </Link>
              <a 
                href="/documents/Tilka Murmu Forest School.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm">
                  View School Details (PDF)
                </Button>
              </a>
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
                  Vivekpally: A People&apos;s Platform
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  After months of field experience, SEVAA realized the need for a holistic approach to development. 
                  Vivekpally serves as a people&apos;s platform where communities can make decisions, plan targets, 
                  develop strategies, and implement solutions jointly.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Birbaba Tilka Murmu Vivekpalli
                  </h3>
                  <p className="text-gray-700">
                    Named after the great tribal leader Tilka Murmu, this unit serves all 52 families in Saparambera village, 
                    providing comprehensive development across education, health, livelihood, and environmental initiatives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/projects/saparambera/saparambera1 - low resolution.jpg" 
                  alt="Saparambera Village Overview" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Village Challenges */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Challenges We Addressed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Saparambera village faced significant infrastructure and livelihood challenges before SEVAA&apos;s intervention
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">🏫</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No School</h3>
                <p className="text-gray-600 text-sm">Village had no educational facilities for children</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Electricity</h3>
                <p className="text-gray-600 text-sm">Basic infrastructure was completely absent</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">🛣️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Poor Roads</h3>
                <p className="text-gray-600 text-sm">Limited connectivity to outside world</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Limited Resources</h3>
                <p className="text-gray-600 text-sm">Lack of funds for quality farming seeds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Our Development Approach
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                SEVAA&apos;s comprehensive development strategy covers all aspects of community growth and empowerment
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Education & Culture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Tilka Murmu Forest School establishment</li>
                  <li>• Indigenous folk culture preservation</li>
                  <li>• Community learning programs</li>
                  <li>• Educational infrastructure development</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health & Livelihood</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Community health programs</li>
                  <li>• Sustainable livelihood training</li>
                  <li>• Healthcare awareness campaigns</li>
                  <li>• Nutritional support initiatives</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Environment & Agriculture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Forest conservation initiatives</li>
                  <li>• Agricultural support and training</li>
                  <li>• Environmental awareness programs</li>
                  <li>• Sustainable farming practices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Project Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Visual journey of transformation in Saparambera village
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: '/images/projects/saparambera/saparambera 2 - low resolution.jpg', alt: 'Saparambera Development 1' },
                { src: '/images/projects/saparambera/saparambera 3.jpg', alt: 'Saparambera Development 2' },
                { src: '/images/projects/saparambera/saparambera 5.jpg', alt: 'Saparambera Development 3' },
                { src: '/images/projects/saparambera/saparambera 6 -low resolution.jpg', alt: 'Saparambera Development 4' },
                { src: '/images/projects/saparambera/saparabera 8 low resolution.jpg', alt: 'Saparambera Development 5' },
                { src: '/images/programs/saparambera-1.jpg', alt: 'Saparambera Activities' }
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

      {/* Impact Statement */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Making a Lasting Impact
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl opacity-90">
                In just 2 years, SEVAA&apos;s work at Saparambera has created significant transformation. 
                The village has gained recognition from local administration, people&apos;s representatives, 
                and officers at block and district levels.
              </p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p className="text-lg">
                  &quot;The great impact on the villagers&apos; mindset demonstrates the power of community-driven development 
                  and collaborative problem-solving.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}