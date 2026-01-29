import type { NextConfig } from "next";
import { withSpriteLoader } from "@tinloof/typed-svg-sprite/next";

const nextConfig: NextConfig = {};

export default withSpriteLoader(nextConfig, {
  inputDir: "../../shared/icons",
});
