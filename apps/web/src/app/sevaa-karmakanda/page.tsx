import { Metadata } from 'next';
import { InViewAnimation } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';

export const metadata: Metadata = generatePageMetadata({
  title: 'সেবা কর্মকাণ্ড',
  description:
    'SEVAA এর কার্যক্রম এবং সেবামূলক কর্মকাণ্ডের বিবরণ। স্বামী বিবেকানন্দের আদর্শে পরিচালিত সমাজসেবামূলক প্রকল্পসমূহ।',
  keywords: [
    'সেবা কর্মকাণ্ড',
    'SEVAA activities',
    'community service',
    'social work',
    'Vivekananda ideals',
    'স্বামী বিবেকানন্দ',
    'সমাজসেবা',
  ],
  url: '/sevaa-karmakanda',
});

export default function SevaaKarmakandaPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  সেবা কর্মকাণ্ড
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  স্বামী বিবেকানন্দের আদর্শে পরিচালিত সেবামূলক কার্যক্রম
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Main Content */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                      সেবা কর্মসূচি (সংক্ষেপে)
                    </h2>

                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        সময়টা ছিল ২০১৯ সনের ডিসেম্বর মাস। বেলুড়মঠের প্রাঙ্গনে
                        রামকৃষ্ণ মিশন আয়োজিত প্রাক্তন ছাত্র সমাবেশে যোগ দিতে
                        গিয়েছিল নরেন্দ্রপুর আবাসিক মহাবিদ্যালয়ের ১৯৭৬ থেকে
                        ১৯৭৯ বর্ষের স্নাতক চার বন্ধু। সমাবেশ শেষে পড়ন্ত বিকেলে
                        বন্ধুরা মিলে তৈরি করল এক হোয়াটসঅ্যাপ গ্রুপ- যার নাম
                        &lsquo;নরেন্দ্রপুর রামকৃষ্ণ মিশন রেসিডেন্সিয়াল কলেজ
                        ১৯৭৬-৭৯ ব্যাচ&rsquo;।
                      </p>

                      <div className='flex justify-center my-8'>
                        <Card className='overflow-hidden max-w-2xl w-full shadow-md'>
                          <div className='relative h-80'>
                            <Image
                              src='/images/userfiles/image/photo 1.jpg'
                              alt='নরেন্দ্রপুর কলেজের বন্ধুদের সমাবেশ'
                              fill
                              className='object-cover'
                            />
                          </div>
                          <CardContent className='p-4'>
                            <p className='text-sm text-secondary text-center'>
                              বেলুড় মঠে প্রাক্তন ছাত্র সমাবেশ
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <p>
                        ধীরে ধীরে নিজেদের ব্যাচেই অনেককেই এই গ্রুপের মধ্যে আনা
                        সম্ভব হল। গ্রুপের নানান আলাপচারিতায় দেখা গেল যে প্রায়
                        সকলেই অবসরপ্রাপ্ত আর স্বামীজীর &lsquo;শিবজ্ঞানে
                        জীবসেবা&rsquo;র আদর্শে সমাজের জন্য কিছু করতে উন্মুখ।
                        কিন্তু কীভাবে ইচ্ছাকে বাস্তবায়িত করা যায় বিশেষত
                        সামর্থ্য যেখানে সীমিত?
                      </p>

                      <p>
                        অতএব সকলে মিলে নরেন্দ্রপুর কলেজের প্রাক্তন অধ্যক্ষ ও
                        বর্তমানে গোলপার্ক রামকৃষ্ণ মিশন ইনস্টিটিউট অব কালচারের
                        সচিব স্বামী সুপর্ণানন্দ যিনি সকলের অতি প্রিয় সত্যদা
                        তাঁর সঙ্গে এক গুগল মিটের মাধ্যমে মিলিত হল। সব শুনে
                        সত্যদা অভয় দিয়ে বললেন &ldquo;যত বৃহৎ সংস্থাই হোক না
                        কেন তার কাজও মহাকালের বিচারে এক অতি ক্ষুদ্র আঁচড়ের
                        সমান- আর তাই নিজেদের সামর্থ্যকে সীমিত ভেবে নিরৎসাহ হয়ো
                        না। যত ক্ষুদ্র প্রচেষ্টাই হোক না কেন, সমাজের সামগ্রিক
                        কল্যাণে তার ভূমিকাও অনস্বীকার্য।&rdquo;
                      </p>

                      <p>
                        এরপর রইল না আর কোনো দ্বিধা বা সংশয়। সবার সম্মতিতে জন্ম
                        হল &lsquo;সেবা&rsquo; সংস্থার, ইংরেজিতে
                        &lsquo;SEVAA&rsquo;-- যার পূর্ণ নাম হল &lsquo;Society
                        for Envisioning Vivekananda in Awareness & Action&rsquo;
                        অর্থাৎ এমন এক সোসাইটি বা সমিতি যা তার চেতনা ও কর্মের
                        মর্মস্থলে স্বামীজীকে রেখে চলে।
                      </p>

                      <p>
                        &lsquo;সেবা&rsquo; তার সীমিত সামর্থ্যের মধ্যে সদস্য ও
                        অন্যান্য শুভানুধ্যায়ীদের অনুদানকে পাথেয় করে ইতিমধ্যে
                        কয়েকটি প্রকল্প বাস্তবায়িত করেছে ও করে চলেছে।
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <h3 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center'>
                      সেবার বিভিন্ন ক্ষেত্র
                    </h3>

                    <div className='space-y-8 text-base font-light leading-relaxed text-secondary'>
                      <div>
                        <h4 className='text-xl font-medium text-text-primary mb-4'>
                          শিক্ষা ক্ষেত্রে সেবা
                        </h4>
                        <p className='mb-4'>
                          দরিদ্র অথচ মেধাবী ছাত্রছাত্রীদের উচ্চশিক্ষার ব্যাপারে
                          আর্থিক সহায়তা প্রদান। &lsquo;সেবা&rsquo; বর্তমানে
                          একজন ডাক্তারী (এম বি বি এস) পাঠরত ছাত্র, একজন
                          ইঞ্জিনিয়ারিং (আই টি) ছাত্র ও দুই জন নার্সিংয়ের
                          ছাত্রীকে আর্থিক সহায়তা প্রদান করছে।
                        </p>
                        <p>
                          পুরুলিয়া জেলার অযোধ্যাপাহাড় আদিবাসীদের গ্রাম
                          সপরমবেড়ায় উন্মুক্ত অরণ্যপ্রকৃতির মধ্যে একটি প্রাথমিক
                          বিদ্যালয় স্থাপন করতে চলেছে যেখানে প্রথাগত শিক্ষালাভের
                          সঙ্গে সঙ্গে আদিবাসী ছাত্রছাত্রীরা নিজেদের সংস্কৃতির
                          সঙ্গেও নিবিড়ভাবে যুক্ত থাকবে।
                        </p>
                      </div>

                      <div>
                        <h4 className='text-xl font-medium text-text-primary mb-4'>
                          স্বাস্থ্যসেবা
                        </h4>
                        <p className='mb-4'>
                          কোভিড-১৯ এর সময় &lsquo;সেবা&rsquo;র পক্ষ থেকে
                          নরেন্দ্রপুর কলেজের গৌরাঙ্গ ভবনে কোভিড রোগীদের শিবির
                          আয়োজনের জন্য আর্থিক সহায়তা প্রদান। এ ছাড়া
                          স্বেচ্ছাসেবী সংস্থা &lsquo;জনস্বাস্থ্য সুরক্ষা
                          সমন্বয়&rsquo;কেও আর্থিক সহায়তা প্রদান করা হয়।
                        </p>
                        <p>
                          স্বাস্থ্য সচেতনতা বাড়াতে &lsquo;সেবা&rsquo; সপরমবেড়া
                          গ্রামে আয়ুর্বেদিক ও অ্যালোপ্যাথিক চিকিৎসার একাধিক
                          শিবিরের আয়োজন করেছে। শিবিরে কোলকাতা থেকে স্ত্রীরোগ
                          বিশেষজ্ঞ সহ অন্যান্য বিশেষজ্ঞ চিকিৎসকেরা অংশগ্রহণ
                          করেন।
                        </p>
                      </div>

                      <div>
                        <h4 className='text-xl font-medium text-text-primary mb-4'>
                          শিক্ষা প্রকল্প
                        </h4>
                        <p className='mb-4'>
                          &lsquo;সেবা&rsquo; ২০২৩ সালের আগস্ট মাস থেকে পশ্চিম
                          বর্ধমান জেলার উখরা গ্রামে &lsquo;নবদিশা&rsquo; নামে
                          একটি শিক্ষা প্রকল্প শুরু করেছে। অঞ্চলের পাঁচখানি
                          প্রাথমিক ও দুইখানি মাধ্যমিক বিদ্যালয়ের প্রথম থেকে
                          পঞ্চম শ্রেণী পর্যন্ত ছাত্রছাত্রীদের নিয়ে স্বামীজীর
                          ভাবধারায় গুণগত মানের শিক্ষা প্রদানের মধ্য দিয়ে
                          প্রকৃত মানুষ গড়ে তোলাই এর লক্ষ্য।
                        </p>
                        <p>
                          ২০২০ সালে কোভিড অতিমারীর কারণে গ্রামাঞ্চলের
                          বিদ্যালয়গুলি যখন বন্ধ ছিল তখন পশ্চিমবঙ্গের ১২টি জেলার
                          ১৫টি বিদ্যালয়ের নবম ও দশম শ্রেণীর প্রান্তিক পরিবারের
                          ছাত্রছাত্রীদের জন্য অনলাইনে &lsquo;সুদূর
                          পাঠশালা&rsquo;র মাধ্যমে নিয়মিত ক্লাসের আয়োজন।
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>

              <InViewAnimation>
                <Card className='bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
                  <CardContent className='p-8'>
                    <h3 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-6 text-center'>
                      আমাদের লক্ষ্য ও উদ্দেশ্য
                    </h3>
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div>
                        <h4 className='text-xl font-medium text-text-primary mb-4'>
                          মূল নীতি:
                        </h4>
                        <ul className='space-y-3 text-base font-light text-secondary'>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>শিবজ্ঞানে জীবসেবা</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>স্বামীজীর আদর্শে চরিত্র গঠন</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>সমাজের সামগ্রিক কল্যাণসাধন</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>স্বনির্ভর জীবিকার ব্যবস্থা</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='text-xl font-medium text-text-primary mb-4'>
                          কর্মপদ্ধতি:
                        </h4>
                        <ul className='space-y-3 text-base font-light text-secondary'>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>সহযোগিতামূলক কাজের পরিবেশ</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>স্থানীয় সমাজের সক্রিয় অংশগ্রহণ</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>দীর্ঘমেয়াদি টেকসই উন্নয়ন</span>
                          </li>
                          <li className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                            <span>পরিবেশ বান্ধব উন্নয়ন কার্যক্রম</span>
                          </li>
                        </ul>
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
