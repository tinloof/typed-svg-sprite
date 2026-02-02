import type { AstroIntegration } from "astro";
import {
  generateSpriteAndTypes,
  startWatcher,
  type GenerateIconOption,
} from "./shared.js";

export interface SpriteIntegrationOptions {
  /**
   * URL path where the sprite file will be served from.
   * @default "/"
   */
  url?: string;

  /**
   * Filename for the sprite file.
   * @default "sprite.svg"
   */
  filename?: string;

  /**
   * Directory containing SVG files to include in the sprite.
   * Relative to project root.
   * @default "public/icons"
   */
  inputDir?: string;

  /**
   * Output path for the sprite file.
   * Relative to project root.
   * @default "public/sprite.svg"
   */
  outputFile?: string;

  /**
   * Output path for the TypeScript types file.
   * Relative to project root.
   * @default "src/generated/icons.ts"
   */
  typesOutputFile?: string;

  /**
   * Whether to generate the Icon component.
   * - `true`: generates both Astro and React components
   * - `false`: generates no component
   * - `{ astro?: boolean, react?: boolean }`: choose which to generate
   * @default { astro: true }
   */
  generateIconComponent?: boolean | {
    astro?: boolean
    react?: boolean
  };

  /**
   * Output path for the Icon component file (without extension).
   * Extension will be added based on component type (.astro, .tsx).
   * Relative to project root.
   * @default "src/generated/Icon"
   */
  iconComponentOutputFile?: string;
}

/**
 * Astro integration for generating SVG sprites with TypeScript types
 *
 * @example
 * ```typescript
 * // astro.config.mjs
 * import { svgSprite } from '@tinloof/typed-svg-sprite/astro';
 *
 * export default defineConfig({
 *   integrations: [svgSprite()]
 * });
 * ```
 */
export function svgSprite(options?: SpriteIntegrationOptions): AstroIntegration {
  const inputDir = options?.inputDir ?? "public/icons";
  const outputFile = options?.outputFile ?? "public/sprite.svg";
  const spriteUrl = options?.url ?? "/";
  const spriteFilename = options?.filename ?? "sprite.svg";
  const typesOutputFile = options?.typesOutputFile ?? "src/generated/icons.ts";
  const generateIcon: GenerateIconOption =
    options?.generateIconComponent === false
      ? false
      : options?.generateIconComponent === true
        ? true
        : options?.generateIconComponent ?? { astro: true };
  const iconComponentOutputFile =
    options?.iconComponentOutputFile ?? "src/generated/Icon";

  return {
    name: "typed-svg-sprite",
    hooks: {
      "astro:config:setup": ({ command }) => {
        // Generate on startup
        generateSpriteAndTypes(
          inputDir,
          outputFile,
          spriteUrl,
          spriteFilename,
          typesOutputFile,
          generateIcon,
          iconComponentOutputFile
        );

        // Watch in dev mode
        if (command === "dev") {
          startWatcher(
            inputDir,
            outputFile,
            spriteUrl,
            spriteFilename,
            typesOutputFile,
            generateIcon,
            iconComponentOutputFile
          );
        }
      },
      "astro:build:start": () => {
        // Regenerate before build
        generateSpriteAndTypes(
          inputDir,
          outputFile,
          spriteUrl,
          spriteFilename,
          typesOutputFile,
          generateIcon,
          iconComponentOutputFile
        );
      },
    },
  };
}
