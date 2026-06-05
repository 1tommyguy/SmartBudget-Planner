import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure build works on Vercel
  output: 'standalone',
};

export default nextConfig;
