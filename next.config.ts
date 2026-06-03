import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All cover images are SVGs — bypass the image optimizer entirely.
    // The optimizer cannot process SVG format and will return broken images.
    unoptimized: true,
  },
};

export default nextConfig;
