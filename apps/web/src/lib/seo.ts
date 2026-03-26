import type { Metadata } from 'next';

export const baseMetadata: Metadata = {
  title: {
    default:
      'SEVAA - Society for Envisioning Vivekananda in Awareness and Action',
    template: '%s | SEVAA',
  },
  description:
    'Society for Envisioning Vivekananda in Awareness and Action (SEVAA) is a non-government philanthropic organisation inspired by the ideals of Thakur-Maa-Swamiji, working to eliminate illiteracy, poverty, and social exclusion through community development and empowerment.',
  keywords: [
    'SEVAA',
    'NGO',
    'non-profit',
    'community development',
    'education',
    'healthcare',
    'poverty alleviation',
    'Vivekananda',
    'social service',
    'India',
    'philanthropy',
    'volunteer',
    'donation',
  ],
  authors: [{ name: 'SEVAA Team' }],
  creator: 'SEVAA',
  publisher: 'Society for Envisioning Vivekananda in Awareness and Action',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sevaaa.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sevaaa.org',
    title:
      'SEVAA - Fighting Illiteracy, Poverty and Exclusion Through Community Development',
    description:
      'Society for Envisioning Vivekananda in Awareness and Action (SEVAA) is a non-government philanthropic organisation working to eliminate illiteracy, poverty, and social exclusion through community development.',
    siteName: 'SEVAA',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SEVAA - Community Development and Social Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SEVAA - Fighting Illiteracy, Poverty and Exclusion Through Community Development',
    description:
      'Society for Envisioning Vivekananda in Awareness and Action (SEVAA) is a non-government philanthropic organisation working to eliminate illiteracy, poverty, and social exclusion.',
    images: ['/images/twitter-image.jpg'],
    creator: '@sevaaindia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when ready to deploy
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'Non-profit',
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}): Metadata {
  return {
    title,
    description,
    keywords: keywords
      ? [...(baseMetadata.keywords as string[]), ...keywords]
      : baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url: url ? `https://sevaaa.org${url}` : baseMetadata.openGraph?.url,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
    alternates: {
      canonical: url || '/',
    },
  };
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Society for Envisioning Vivekananda in Awareness and Action',
  alternateName: 'SEVAA',
  url: 'https://sevaaa.org',
  logo: 'https://sevaaa.org/images/logo.png',
  image: 'https://sevaaa.org/images/og-image.jpg',
  description:
    'Society for Envisioning Vivekananda in Awareness and Action (SEVAA) is a non-government philanthropic organisation inspired by the ideals of Thakur-Maa-Swamiji, working to eliminate illiteracy, poverty, and social exclusion through community development and empowerment.',
  foundingDate: '2016',
  founders: [],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '131/B Sri Ramkrishna Pally, Sonarpur',
    addressLocality: 'India',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 98271 93272',
    contactType: 'customer service',
    email: 'info@sevaaa.org',
  },
  sameAs: [
    'https://facebook.com/sevaaindia',
    'https://twitter.com/sevaaindia',
    'https://instagram.com/sevaaindia',
    'https://linkedin.com/company/sevaa',
  ],
  mission:
    'Fighting illiteracy, poverty and exclusion through community development and empowerment',
  keywords:
    'NGO, non-profit, community development, education, healthcare, poverty alleviation, Vivekananda, social service, India',
};
