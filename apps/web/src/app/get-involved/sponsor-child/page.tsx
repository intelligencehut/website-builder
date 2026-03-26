import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sponsor a Child - SEVAA',
  description:
    'Directly impact a child education and future through SEVAA child sponsorship program. Learn how you can sponsor a child and make a lasting difference.',
  keywords: [
    'sponsor a child',
    'child sponsorship',
    'education sponsorship',
    'child welfare',
    'educational support',
  ],
  url: '/get-involved/sponsor-child',
});

export default function SponsorChildPage() {
  return (
    <ComingSoon
      title='Sponsor a Child'
      description="We are developing a comprehensive child sponsorship program that will allow you to directly support a child's education and development. This section will feature profiles of children in need, sponsorship options, progress tracking, and impact stories."
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
