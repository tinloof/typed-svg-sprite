import { defineConfig } from "astro/config";
import { svgSprite } from "@tinloof/typed-svg-sprite/astro";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    svgSprite({
      inputDir: "../../shared/icons",
    })
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
