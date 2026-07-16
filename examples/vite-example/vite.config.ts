import { defineConfig } from "vite";
import { svgSprite } from "@tinloof/typed-svg-sprite/vite";

export default defineConfig({
  plugins: [
    svgSprite({
      inputDir: "../../shared/icons",
    }),
  ],
});

