import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // A package-lock.json in the parent folder otherwise makes Next infer
  // ~/Documents/GitHub as the workspace root, which stalls `next dev`
  turbopack: { root: __dirname },
};

export default nextConfig;
