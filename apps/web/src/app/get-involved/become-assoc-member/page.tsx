import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Become a Sevaa Associate Member - SEVAA',
  description:
    'Join SEVAA as an Associate Member and become part of our extended community. Learn about membership benefits, responsibilities, and application process.',
  keywords: [
    'sevaa associate member',
    'membership',
    'community involvement',
    'volunteer',
    'social service',
  ],
  url: '/get-involved/become-assoc-member',
});

export default function BecomeAssocMemberPage() {
  return (
    <ComingSoon
      title='Become a Sevaa Associate Member'
      description='We are preparing detailed information about our Associate Membership program. This will include membership benefits, responsibilities, application process, and how you can contribute to our community development initiatives.'
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
