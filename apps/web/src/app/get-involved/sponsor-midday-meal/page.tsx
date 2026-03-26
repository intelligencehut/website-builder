import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sponsor Midday Meal - SEVAA',
  description:
    'Ensure children receive nutritious meals at school through SEVAA midday meal sponsorship program. Learn how your support can fight hunger and improve learning outcomes.',
  keywords: [
    'sponsor midday meal',
    'meal sponsorship',
    'school meals',
    'nutrition program',
    'child welfare',
  ],
  url: '/get-involved/sponsor-midday-meal',
});

export default function SponsorMiddayMealPage() {
  return (
    <ComingSoon
      title='Sponsor Midday Meal'
      description='We are developing our midday meal sponsorship program to ensure children receive nutritious meals at school. This section will detail sponsorship options, nutritional impact, cost breakdown, and how your support directly contributes to better learning outcomes and health.'
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
