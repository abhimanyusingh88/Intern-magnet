import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "kmhubgyqhetgfamnmqie.supabase.co",
      },
    ],
  },
  cacheLife: {
    page: {
      stale: 3600, // 1 hour
      revalidate: 7200, // 2 hours
      expire: 86400, // 24 hours
    },
  },
  experimental: {},
};

export default nextConfig;
