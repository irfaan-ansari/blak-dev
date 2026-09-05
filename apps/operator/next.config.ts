import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@blak/ui", "@blak/utils", "@blak/auth", "@blak/db"],
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "blak.*" },
    ],
  },
}

export default nextConfig
