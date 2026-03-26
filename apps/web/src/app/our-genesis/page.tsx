import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/sections/PageHeader';
import Image from 'next/image';

export const metadata: Metadata = {
  title:
    'Our Genesis | SEVAA - Society for Envisioning Vivekananda in Awareness and Action',
  description:
    'Learn about the genesis and founding story of SEVAA, from a chance encounter at Belur Math to building a society dedicated to service and social development.',
  keywords:
    'SEVAA genesis, founding story, Belur Math, Swami Vivekananda, social service, charity origin',
};

export default function OurGenesisPage() {
  return (
    <div className='min-h-screen'>
      <PageHeader
        title='Our Genesis'
        subtitle='The inspiring story of how SEVAA came to be'
        backgroundImage='/images/assets/banner/13.jpg'
      />

      <section className='py-20 bg-white'>
        <div className='container max-w-6xl mx-auto px-4'>
          <div className='grid lg:grid-cols-2 gap-12 items-start mb-16'>
            <div>
              <Card className='p-8 bg-saffron-50 border-saffron-200'>
                <CardContent className='p-0'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
                    SEVAA Genesis
                  </h2>

                  <div className='space-y-6 text-lg leading-relaxed text-gray-700'>
                    <div className='text-center'>
                      <p className='text-xl font-semibold mb-2 text-saffron-700'>
                        समानोमन्त्र: समिति: समानी
                        <br />
                        समानंमन: सहचित्तमेषाम्।
                        <br />
                        समानीवआकूति: समानाहृदयानिव:
                        <br />
                        समानमस्तुवोमनोयथाव: सुसहासति ||
                      </p>

                      <p className='text-base mb-2 italic'>
                        samānomantraḥsamitiḥsamānī
                        <br />
                        samānammanaḥsahachittameṣām |<br />
                        samānīvaākūti: samānāhradayāniva:।
                        <br />
                        samānamastuvomanoyathāva: susahāsati॥
                        <br />
                        <span className='font-semibold'>
                          (Rig Veda 10.191.3)
                        </span>
                      </p>

                      <p className='text-gray-600 italic'>
                        (May our purpose be the same, may all we be of one mind,
                        May our intention and aspiration be alike, so that a
                        common objective unifies us all.)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='space-y-6'>
              <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed'>
                  This Maitri (fraternity) tune once occasionally chanted in our
                  RKM college days created a deep root into our consciousness
                  and, after a prolonged silence, suddenly became a reality
                  through the inception of the Society for Envisioning
                  Vivekananda in Awareness and Action (SEVAA). It is only by the
                  grace and blessings of the Holy Trio, Thakur-Maa-Swamiji, we
                  believe that we could assemble under the great canopy of
                  &ldquo;Service to mankind is service to God.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            <div className='prose prose-lg max-w-none'>
              <p className='text-gray-700 leading-relaxed'>
                All of us can fondly remember the day in December 2019 when a
                few of us discovered each other in a sudden rendezvous at Belur
                Math while attending the 125th Anniversary Celebration of Swami
                Vivekananda&rsquo;s Address at the Parliament of World Religions
                Conference in Chicago. That auspicious event made the unison
                long lasting by forming a steady group which was subsequently
                snowballed into a wider virtual network of communication with
                our friends all over the world. This finally resulted in the
                formation of SEVAA which was finally registered under West
                Bengal Societies Registration Act, XXVI of 1961 (Registration
                noS0017771 of 2020-2021, dtd. March 18, 2021, with the Registrar
                of Firms, Societies & Non-Trading Corporations, Govt. of West
                Bengal) and has also been registered under sections 12A and 80G
                exemptions under Income Tax Act 1961 of Govt. of India.
              </p>

              <p className='text-gray-700 leading-relaxed'>
                At the initial phase before formation of the society, the focus
                of the members was on Swamiji&rsquo;s call for Nation building
                through self-awakening from within. Some of the great quotes of
                Swamiji that inspired us the most are: &ldquo;Education is the
                manifestation of the perfection already in man,&rdquo;
                &ldquo;Arise, awake, and stop not till the goal is
                reached,&rdquo; &ldquo;Religion is the manifestation of divinity
                already in man,&rdquo; &ldquo;Service to mankind is service to
                God,&rdquo; and unending similar messages relating to Practical
                Vedanta. These powerful messages helped making the backbone of
                SEVAA. Additionally, the group received invaluable inspiration
                and support from Swami Suparnananda (our beloved Satyada),
                Secretary of the Ramakrishna Mission Institute of Culture,
                Kolkata. This guidance shown by Swamiji helped us figure out the
                aims and objectives of the society.
              </p>

              <p className='text-gray-700 leading-relaxed'>
                In last four years, SEVAA has tried continuously to translate
                Swamiji&rsquo;s synergistic ideas and thoughts such as
                man-making character-building education, wellness and happiness
                in mental and physical health, self-generating livelihood,
                creative and local culture, and adherence to values, into action
                oriented mission. And with these goals SEVAA has been convinced
                to develop Vivekpally, a platform of local people to integrate
                different developmental factors in a wholistic way. First
                Vivekpally was established at Saparambera, a tribal village in
                Ayodhya Hills, Purulia district in West Bengal.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6 mt-12'>
              <Card className='overflow-hidden'>
                <div className='relative h-64'>
                  <Image
                    src='/images/userfiles/image/Old memories Narendrapur college mates.jpg'
                    alt='Old memories of Narendrapur college mates'
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-4'>
                  <p className='text-sm text-gray-600 text-center'>
                    Old memories of Narendrapur college mates
                  </p>
                </CardContent>
              </Card>

              <Card className='overflow-hidden'>
                <div className='relative h-64'>
                  <Image
                    src='/images/userfiles/image/R K M College batch with Satyada.jpg'
                    alt='RKM College batch with Satyada'
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-4'>
                  <p className='text-sm text-gray-600 text-center'>
                    RKM College batch with our beloved Satyada
                  </p>
                </CardContent>
              </Card>

              <Card className='overflow-hidden'>
                <div className='relative h-64'>
                  <Image
                    src='/images/userfiles/image/Belur visit SEVAA Initiation.jpg'
                    alt='Belur Math visit during SEVAA initiation'
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-4'>
                  <p className='text-sm text-gray-600 text-center'>
                    Belur Math visit during SEVAA initiation
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='bg-saffron-50 p-8 rounded-lg border border-saffron-200 mt-12'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center'>
                The Foundation of Service
              </h3>
              <p className='text-gray-700 leading-relaxed text-center'>
                From a chance meeting at Belur Math to establishing a registered
                society dedicated to comprehensive rural development,
                SEVAA&rsquo;s genesis is rooted in the timeless wisdom of Swami
                Vivekananda and the spirit of selfless service. Our journey
                continues as we work towards creating sustainable change in
                communities across India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
