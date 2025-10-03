import type { NextConfig } from "next";
import { withSpriteLoader } from "svg-sprite-webpack-loader/next";

const nextConfig: NextConfig = {};

export default withSpriteLoader(nextConfig);
