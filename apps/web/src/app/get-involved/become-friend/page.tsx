import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Become a Sevaa Friend - SEVAA',
  description:
    'Support SEVAA mission by becoming a Sevaa Friend. Learn how you can contribute to our community development programs and help us reach more communities.',
  keywords: [
    'sevaa friend',
    'supporter',
    'community support',
    'social service',
    'volunteer network',
  ],
  url: '/get-involved/become-friend',
});

export default function BecomeFriendPage() {
  return (
    <ComingSoon
      title='Become a Sevaa Friend'
      description='We are developing our Sevaa Friends program to create a supportive network of individuals who share our vision. This section will detail how you can support our mission and connect with like-minded people in your community.'
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
