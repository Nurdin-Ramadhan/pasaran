import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.51.252.205'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sldobkbolvrahlnowrga.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
