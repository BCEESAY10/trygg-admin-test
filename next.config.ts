import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/cribio-db.appspot.com/**',
      },
      {
        protocol: 'https',
        hostname: 'trygg-bucket.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
