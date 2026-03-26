import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';

const stakeholderData = [
  {
    name: 'Service Place',
    description:
      "Operates in America and India. Service Place has taken special steps to help 'SEVAA, Ukhra' in health matters. They are also implementing telemedicine system through 'SEVAA'.",
  },
  {
    name: 'Ahead Initiative',
    description:
      'An NGO actively engaged with SEVAA in agricultural development in Saparambera and other tribal areas of Ayodhya Hills of Purulia.',
  },
  {
    name: 'Kalyan Krishi Vigyan Kendra, Purulia',
    description:
      'Undertook rural development based schemes under the Ramakrishna Mission and continues to help in the adoption of organic agriculture development programs in Saparambera.',
  },
  {
    name: 'Medical Rehabilitation Trust (MRT)',
    description:
      "Provides voluntary services across the state to provide relief from physical disabilities. For the past two years, health related programs have been undertaken with 'SEVAA at Saparambera, Puruliya.",
  },
  {
    name: 'Antorik',
    description:
      'From Texas, America, a Bengali Organization providing active help in construction of school at Purulia.',
  },
  {
    name: 'BCAA, Arizona, USA',
    description:
      'A Bengali organization actively providing monetary support to build a primary school at Saparambera.',
  },
  {
    name: 'Sundarban Diganta Dishari',
    description:
      "From Sundarban, Hingalganj, North 24 Parganas, assisted 'SEVAA in various relief distribution programs undertaken during natural calamities.",
  },
];

export const metadata: Metadata = generatePageMetadata({
  title: 'Stakeholder',
  description:
    "Learn about SEVAA's stakeholder network including partner organizations and collaborators who support our mission.",
  keywords: [
    'stakeholder',
    'partners',
    'collaborators',
    'organizations',
    'network',
    'support',
    'partnerships',
  ],
  url: '/stakeholder',
});

export default function Stakeholder() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent border-b border-primary/20 py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-5xl md:text-6xl font-light leading-tight text-text-primary mb-6'>
                  Stakeholder
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Our network of partners and collaborators supporting our
                  mission
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Content Section */}
        <section className='py-24'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <div className='text-center mb-12'>
                      <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                        Our Stakeholders
                      </h2>
                      <div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
                      <p className='text-base font-light leading-relaxed text-secondary max-w-4xl mx-auto'>
                        In the last three years, a network of
                        &lsquo;services&rsquo; was formed by SEVAA with several
                        civil societies and voluntary organizations of the
                        country and abroad.
                      </p>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                      {stakeholderData.map((stakeholder, index) => (
                        <InViewAnimation key={index} delay={index * 0.1}>
                          <div className='bg-accent border border-primary/20 rounded-md p-6 hover:shadow-md transition-all duration-300 hover:bg-accent/80'>
                            <h3 className='text-xl font-medium text-primary mb-4'>
                              {stakeholder.name}
                            </h3>
                            <p className='text-base font-light leading-relaxed text-secondary'>
                              {stakeholder.description}
                            </p>
                          </div>
                        </InViewAnimation>
                      ))}
                    </div>

                    <InViewAnimation delay={0.8}>
                      <div className='mt-12 bg-accent border border-primary/20 rounded-md p-8'>
                        <h3 className='font-display text-2xl font-light text-text-primary mb-4 text-center'>
                          Partnership Network
                        </h3>
                        <p className='text-base font-light leading-relaxed text-secondary text-center'>
                          Our stakeholder network spans across multiple
                          countries and sectors, enabling us to create
                          meaningful impact through collaborative efforts.
                          Together, we work towards sustainable development and
                          community empowerment across India and
                          internationally.
                        </p>
                      </div>
                    </InViewAnimation>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
