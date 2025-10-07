import type { NextConfig } from "next";
import { withSpriteLoader } from "svg-sprite-loader/next";

const nextConfig: NextConfig = {};

export default withSpriteLoader(nextConfig);
