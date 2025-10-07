import type { NextConfig } from "next";
import { withSpriteLoader } from "svg-sprite-loader/next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withSpriteLoader(nextConfig);
