import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    // AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Trimmed from the defaults: the widest slot on this site is a full-bleed
    // hero, so 3840px variants are never requested and only cost build time.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [64, 96, 128, 256, 384],
    // Remote photos are immutable, so cache optimised output for a year
    // instead of re-fetching from the origin every minute.
    minimumCacheTTL: 31536000,
  },
  // Strip React's dev-only prop types and test ids from the production bundle.
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  poweredByHeader: false,
  // Old slug from the first demo: Bali is now a package inside Indonesia.
  async redirects() {
    return [
      {
        source: "/destinations/bali",
        destination: "/destinations/indonesia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
