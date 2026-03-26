import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NostalgicNarendrapurContent from './NostalgicNarendrapurContent';

export const metadata: Metadata = {
  title: 'Nostalgic Narendrapur | Publications | SEVAA',
  description:
    "Nostalgic Narendrapur - SEVAA's annual magazine featuring literary pieces, SEVAA activity reports, and contributions from RK Mission alumni and revered Swamijis.",
  keywords:
    'Nostalgic Narendrapur, SEVAA magazine, annual publication, RK Mission, literary magazine, e-magazine',
};

export default function NostalgicNarendrapurPage() {
  return (
    <>
      <Header />
      <NostalgicNarendrapurContent />
      <Footer />
    </>
  );
}
