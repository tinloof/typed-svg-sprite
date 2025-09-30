import type { NextConfig } from "next";
import { withSpriteLoader } from "svg-sprite-webpack-loader/next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withSpriteLoader(nextConfig);
