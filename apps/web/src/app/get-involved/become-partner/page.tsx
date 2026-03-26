import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Become a Sevaa Partner - SEVAA',
  description:
    'Form strategic partnerships with SEVAA to amplify collective impact. Learn about partnership opportunities and how organizations can collaborate with us.',
  keywords: [
    'sevaa partner',
    'strategic partnership',
    'collaboration',
    'organizational partnership',
    'collective impact',
  ],
  url: '/get-involved/become-partner',
});

export default function BecomePartnerPage() {
  return (
    <ComingSoon
      title='Become a Sevaa Partner'
      description='We are creating comprehensive partnership frameworks for organizations looking to collaborate with SEVAA. This will include partnership models, mutual benefits, collaboration opportunities, and how we can work together to maximize community impact.'
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
