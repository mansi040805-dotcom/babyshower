
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/babyshower",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
