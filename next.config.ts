import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["covers.openlibrary.org"],
    unoptimized: true,
  },
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/manabiko" : "",
  trailingSlash: true,
};

export default nextConfig;
