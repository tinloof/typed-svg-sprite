import { NextConfig } from "next";
import { withSpriteLoader } from "svg-sprite-webpack-loader/next";

const config: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

const nextConfig = withSpriteLoader(config);

export default nextConfig;
