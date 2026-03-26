import { Metadata } from 'next';
import { ComingSoon } from '@/components/common';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'CSR Opportunities - SEVAA',
  description:
    'Explore Corporate Social Responsibility opportunities with SEVAA. Partner with us to create meaningful impact through evidence-based community development programs.',
  keywords: [
    'csr opportunities',
    'corporate social responsibility',
    'business partnership',
    'community development',
    'sevaa partnership',
  ],
  url: '/get-involved/csr-opportunities',
});

export default function CSROpportunitiesPage() {
  return (
    <ComingSoon
      title='CSR Opportunities'
      description='We are developing comprehensive Corporate Social Responsibility partnership programs. This section will feature detailed information about how your organization can partner with SEVAA to create meaningful community impact through evidence-based development programs.'
      expectedDate='Q2 2025'
      backLink='/get-involved'
      backLabel='Back to Get Involved'
    />
  );
}
