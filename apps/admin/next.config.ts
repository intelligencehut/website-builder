import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@website-builder/content-schema',
    '@website-builder/database',
    '@website-builder/ui',
  ],
};

export default nextConfig;
