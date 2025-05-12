import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["covers.openlibrary.org"],
    unoptimized: true,
  },
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
};

export default nextConfig;
