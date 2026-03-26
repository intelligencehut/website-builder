import { Metadata } from 'next';
import Image from 'next/image';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "President's Desk",
  description:
    "Read a message from the President of SEVAA, sharing insights about our mission, values, and commitment to service inspired by Swami Vivekananda's teachings.",
  keywords: [
    'president',
    'leadership',
    'message',
    'vision',
    'Swami Vivekananda',
    'service',
    'philosophy',
    'guidance',
  ],
  url: '/president-desk',
});

export default function PresidentDeskPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-6'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  From President&apos;s Desk
                </h1>
                <p className='text-xl text-secondary leading-relaxed'>
                  Insights and guidance from our leadership
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
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8 md:p-12'>
                    {/* President Image */}
                    <div className='text-center mb-12'>
                      <div className='relative w-64 h-96 mx-auto mb-8'>
                        <Image
                          src='/images/president-image.jpg'
                          alt='President SEVAA'
                          fill
                          className='object-cover rounded-md'
                        />
                      </div>
                      <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6'>
                        From President&apos;s Desk
                      </h2>
                      <div className='w-24 h-1 bg-primary mx-auto'></div>
                    </div>

                    {/* Content */}
                    <div className='prose prose-lg max-w-none text-secondary space-y-8'>
                      <p className='text-base font-light leading-relaxed'>
                        Swami Vivekananda, once said: &ldquo;Perfect sincerity,
                        holiness, gigantic intellect and all conquering will.
                        Let only a handful of men work with these, and the whole
                        world will be revolutionized.&rdquo; We know that the
                        dream has always remained tantalizingly near to
                        fulfillment not only during His lifetime but at our time
                        also. To me, &lsquo;Sincerity&rsquo; and
                        &lsquo;Holiness&rsquo; always remained as the missing
                        threads in the whole fabrics. Rabindranath Tagore in one
                        of his songs confessed on behalf of all mankind: আমার যা
                        আছে আমি সকল দিতে পারিনি তোমারে, নাথ।{' '}
                        <em>
                          (I could not sacrifice all that I have, to you, Oh
                          Lord)
                        </em>
                        . My firm belief is that to ensure success of an
                        organization for a longer period, three things are of
                        utmost importance&ndash;
                        <strong>Sacrifice, Sincerity, and Sacredness</strong>.
                        It is the sincerity and holiness in sacrifice that makes
                        a difference. As we traverse through the era of
                        industrial revolution and strident march of Science and
                        Technology, our world has no doubt sufficiently acquired
                        &lsquo;gigantic intellect&rsquo; and &lsquo;all
                        conquering will.&rsquo; But in a nascent organization
                        like SEVAA, where our goal is to come together for a
                        greater cause, it is our sincere duty to mingle our
                        gigantic intellect and indomitable will with utmost
                        holiness and sense of sacrifice.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Swamiji always considered an organization as
                        &lsquo;means&rsquo;, not as an &lsquo;end&rsquo;. We
                        know how much struggle and hardship Swamiji had to go
                        through to establish the Ramakrishna Math and Mission in
                        1897 and mobilize resources. It is known that often
                        people who build institutions fall in the trap of the
                        same institutions owning them completely. Many a time
                        such persons lose sight of the objectives and thus get
                        confused. They forget the greater purpose for which the
                        organization is made. In this regard, Swamiji had
                        different outlook. When the plague broke out in the city
                        of Calcutta in 1998, Swamiji immediately started
                        catering an intensive service to the panic-stricken
                        people of the city. This required a lot of money since
                        the situation was getting desperate. One of his brother
                        disciples raised a question on whether the money would
                        come from. Swamiji, a great exponent of out of box
                        thinking replied,{' '}
                        <em>
                          &ldquo;We are monks. We can sleep under the trees and
                          live on alms. If I can save the lives of millions, I
                          don&apos;t mind selling the Math&rdquo;
                        </em>
                        . To him, service for the suffering people was far
                        higher than the mere existence of the Math.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Inspired by Swamiji&apos;s teachings, the{' '}
                        <strong>
                          Society for Envisioning Vivekananda in Awareness and
                          Action (SEVAA)
                        </strong>{' '}
                        was created by a group of sexagenarian people. Welfare
                        for the needy and suffering people is the only objective
                        of SEVAA, whoever may be at the helm of this
                        organization in future. We strongly believe that such
                        selfless approach is essential for the growth and
                        stability of SEVAA. In this regard, we fondly remember
                        the inspiring lecture by Swami Suparnanandaji Maharaj
                        (our beloved Satyada), the Secretary of the RKM
                        Institute of Culture Golpark, Kolkata. He stressed the
                        true meaning of &lsquo;Sevaa&rsquo; as serving the
                        mankind as God.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        Swamiji in one of his talks contextually mentioned a
                        challenge frequently faced by organisation members.{' '}
                        <strong>
                          &ldquo;If two Indians get together, then they will
                          fight over three ideas that they get and fall apart in
                          four minutes.&rdquo;
                        </strong>{' '}
                        While saying this, almost at the same time in a
                        simplistic, yet profound and practical manner, Swamiji
                        noted the need for three things to make an organization:
                        i) absence of jealousy and suspicion, ii) conviction in
                        the power of goodness, and iii) and helping those who
                        really require.
                      </p>

                      <p className='text-base font-light leading-relaxed'>
                        To me, the above challenge and its solution clues as
                        envisaged by Swamiji need to be remembered when we are
                        to run SEVAA. Teamwork is truly possible only when the
                        team members will not only have respect and love for
                        each other but also learn to cooperate with a high level
                        of trust, reciprocity and interdependence. This is
                        possible only when there is absence of jealousy and
                        suspicion. Self-doubt can sometimes be dreadful and one
                        may be constantly challenged by a seemingly hopeless
                        situation. The only panacea prescribed by Swamiji here
                        is to believe that good will always triumph. This is not
                        only a truthful reality but also a good motivator to
                        keep the spirit alive in times of extreme crisis. The
                        change we hope to bring about may seem small,
                        insignificant and hopeless, but the spirit of
                        &lsquo;doing good and helping&rsquo; is very important.
                        Swamiji had always been very practical and knew the
                        difficulties faced by the ordinary men. Keeping all His
                        blessings and sayings in heart, we hope SEVAA will step
                        forward to a new possibility and definitely achieve a
                        synergistic goal.
                      </p>

                      <p className='text-base font-light leading-relaxed pl-8 bg-accent border-l-4 border-primary p-6 rounded-r-md'>
                        I hereby welcome you all to this website which will give
                        a full picture of SEVAA and moreover help you to get all
                        sorts of updation in details. Please visit us again and
                        make us grateful by collaborating with us.
                      </p>

                      <div className='bg-accent border border-primary/20 rounded-md p-8 mt-12'>
                        <p className='font-medium text-text-primary text-lg'>
                          Dibya Gopal Ghatak,
                        </p>
                        <p className='font-medium text-primary text-lg'>
                          President,
                        </p>
                        <p className='font-medium text-primary text-lg'>
                          SEVAA
                        </p>
                      </div>
                    </div>
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
