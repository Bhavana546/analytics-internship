/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // optional: to ignore warnings during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // optional: to prevent build failure on type warnings
  },
};

module.exports = nextConfig;
