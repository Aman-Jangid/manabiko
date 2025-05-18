import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["covers.openlibrary.org"],
    unoptimized: true,
  },
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
  serverExternalPackages: ["@prisma/client", "prisma"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "prisma",
        "@prisma/client",
      ];
    }
    return config;
  },
};

export default nextConfig;
