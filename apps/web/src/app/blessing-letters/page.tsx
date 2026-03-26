import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlessingLettersSection } from '@/components/sections/BlessingLettersSection';

export const metadata: Metadata = {
  title: 'Blessing Letters | Sevaa',
  description:
    'Words of encouragement and blessings from spiritual leaders who guide our mission at Sevaa.',
  keywords: [
    'blessing letters',
    'spiritual guidance',
    'sevaa',
    'swami blessings',
  ],
  openGraph: {
    title: 'Blessing Letters | Sevaa',
    description:
      'Words of encouragement and blessings from spiritual leaders who guide our mission at Sevaa.',
    type: 'website',
  },
};

export default function BlessingLettersPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        <BlessingLettersSection />
      </main>
      <Footer />
    </>
  );
}
