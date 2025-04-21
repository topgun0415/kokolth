import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  useFileSystemPublicRoutes: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'profile.line-scdn.net'],
  },
};

export default nextConfig;
