import type { NextConfig } from "next";
import { withSpriteLoader } from "typed-svg-sprite/next";

const nextConfig: NextConfig = {};

export default withSpriteLoader(nextConfig);
