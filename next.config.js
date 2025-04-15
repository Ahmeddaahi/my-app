/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    // During Vercel deployment, type errors are checked but won't fail the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // During Vercel deployment, lint errors are checked but won't fail the build
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

module.exports = nextConfig; 