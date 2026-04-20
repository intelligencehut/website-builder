import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@website-builder/content-schema',
    '@website-builder/database',
    '@website-builder/ui',
  ],
  // Allow large video uploads through the YouTube proxy route.
  // The project's proxy.ts buffers request bodies; default cap is 10 MB.
  // Vercel Pro caps at 100 MB regardless of this value.
  experimental: {
    serverActions: { bodySizeLimit: '500mb' },
    proxyClientMaxBodySize: '500mb',
  },
};

export default nextConfig;
