import { defineConfig } from "astro/config";
import { svgSprite } from "@tinloof/typed-svg-sprite/astro";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [svgSprite(), react()],
});