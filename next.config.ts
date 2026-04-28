import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js optimization is skipped — Sanity CDN and Figma CDN handle
    // their own delivery. Sanity's image-url builder already outputs
    // correctly sized WebP URLs, so double-proxying adds no benefit.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Remove the figma.com entry below once all images are uploaded to Sanity
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
};

export default nextConfig;
