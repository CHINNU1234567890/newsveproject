/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Keep if you're using Next.js Image optimization
    // Images will be automatically optimized in production
  },
  swcMinify: true,
  compress: true,
  // Disable telemetry
  telemetry: {
    telemetryDisabled: true,
  },
};

export default nextConfig;