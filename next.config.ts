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
  // Configure static export
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/auth/signin": { page: "/auth/signin" },
      "/auth/signup": { page: "/auth/signup" },
      "/profile": { page: "/profile" },
      "/uploadArea": { page: "/uploadArea" },
      "/404": { page: "/404" },
    };
  },
};

export default nextConfig;
