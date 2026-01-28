import type { AstroIntegration } from "astro";
import { generateSpriteAndTypes, startWatcher } from "./shared.js";

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
   * Whether to generate the Icon React component.
   * @default true
   */
  generateIconComponent?: boolean;

  /**
   * Output path for the Icon component file.
   * Relative to project root.
   * @default "src/generated/Icon.tsx"
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
  const generateIcon =
    options?.generateIconComponent !== false
      ? options?.generateIconComponent ?? true
      : false;
  const iconComponentOutputFile =
    options?.iconComponentOutputFile ?? "src/generated/Icon.tsx";

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
          generateIcon ? iconComponentOutputFile : undefined
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
            generateIcon ? iconComponentOutputFile : undefined
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
          generateIcon ? iconComponentOutputFile : undefined
        );
      },
    },
  };
}
