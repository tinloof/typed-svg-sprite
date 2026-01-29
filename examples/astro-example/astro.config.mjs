import { defineConfig } from "astro/config";
import { svgSprite } from "@tinloof/typed-svg-sprite/astro";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    svgSprite({
      inputDir: "../../shared/icons",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});