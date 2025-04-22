/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'newsveproject.vercel.app'], // Added your Vercel deployment domain
    unoptimized: process.env.NODE_ENV === 'production', // Use unoptimized images in production if needed
    // Images will be automatically optimized in development
  },
  swcMinify: true,
  compress: true,
  // Ensure all assets are included in the build
  output: 'standalone',
};

export default nextConfig;
