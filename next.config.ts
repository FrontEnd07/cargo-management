import type { NextConfig } from "next";
import svg from '@neodx/svg/webpack';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          group: true,
          root: 'src/6_shared/ui/icon/assets',
          output: 'public/sprite',
          resetColors: false,
          metadata: 'src/6_shared/ui/icon/sprite.h.ts',
        })
      );
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**.**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
