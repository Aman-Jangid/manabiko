import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["covers.openlibrary.org"],
  },
  output: "standalone",
};

export default nextConfig;
