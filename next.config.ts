import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["covers.openlibrary.org"],
    unoptimized: true,
  },
};

export default nextConfig;
