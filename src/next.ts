import * as fs from "fs";
import * as path from "path";
import { generateSprite } from "./core.js";
import { generateTypesFile } from "./types.js";

// Minimal Next.js config types we need
interface NextConfig {
  [key: string]: any;
}

interface SpriteLoaderOptions {
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
   * @default "generated/icons.ts"
   */
  typesOutputFile?: string;
}

// Track if we've already started watching
let watcherInitialized = false;

function generateSpriteAndTypes(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string
): void {
  // Generate sprite and get symbols
  const symbols = generateSprite({
    inputDir,
    outputFile,
    verbose: false,
    minify: true,
  });

  // Log success with prefix
  if (symbols.length > 0) {
    console.log(
      `[svg-sprite] ✅ Generated sprite with ${symbols.length} symbols → ${outputFile}`
    );
  }

  // Generate TypeScript types file if specified
  if (typesOutputFile && symbols.length > 0) {
    generateTypesFile({
      symbols,
      spriteUrl,
      spriteFilename,
      outputFile: typesOutputFile,
      verbose: false,
    });
  }
}

function startWatcher(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string
): void {
  if (watcherInitialized) {
    return;
  }

  const projectRoot = process.cwd();
  const absoluteInputDir = path.resolve(projectRoot, inputDir);

  if (!fs.existsSync(absoluteInputDir)) {
    return;
  }

  watcherInitialized = true;
  console.log(`[svg-sprite] 👀 Watching ${inputDir} for changes...`);

  fs.watch(absoluteInputDir, { recursive: true }, (eventType, filename) => {
    if (filename?.endsWith(".svg")) {
      console.log(`[svg-sprite] Change detected: ${filename}`);
      generateSpriteAndTypes(
        inputDir,
        outputFile,
        spriteUrl,
        spriteFilename,
        typesOutputFile
      );
    }
  });
}

/**
 * Generates SVG sprite and TypeScript types for Next.js projects
 *
 * This function generates:
 * 1. An SVG sprite file containing all icons
 * 2. A TypeScript file with typed icon IDs and helper functions
 *
 * No loader is needed - just import the typed icon references directly.
 *
 * @param nextConfig - The existing Next.js configuration object
 * @param options - Optional sprite generation configuration
 * @returns Next.js configuration (unchanged, sprite generation happens during config)
 *
 * @example
 * ```typescript
 * // next.config.ts
 * import { withSpriteLoader } from 'svg-sprite-loader/next';
 *
 * export default withSpriteLoader({
 *   // your existing Next.js config
 * });
 *
 * // Then in your components:
 * import { HOME, SETTINGS } from '@/generated/icons';
 * import { Icon } from '@/components/Icon';
 *
 * function MyComponent() {
 *   return (
 *     <>
 *       <Icon href={HOME} />
 *       <Icon href={SETTINGS} />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // With custom options
 * export default withSpriteLoader(
 *   {
 *     // your existing Next.js config
 *   },
 *   {
 *     inputDir: "assets/icons",
 *     outputFile: "public/icons-sprite.svg",
 *     typesOutputFile: "lib/icons.ts",
 *     url: "/",
 *     filename: "icons-sprite.svg"
 *   }
 * );
 * ```
 */
export function withSpriteLoader(
  nextConfig: any,
  options?: SpriteLoaderOptions
): NextConfig {
  const inputDir = options?.inputDir ?? "public/icons";
  const outputFile = options?.outputFile ?? "public/sprite.svg";
  const spriteUrl = options?.url ?? "/";
  const spriteFilename = options?.filename ?? "sprite.svg";
  const typesOutputFile = options?.typesOutputFile ?? "generated/icons.ts";

  // Generate sprite and types on startup
  generateSpriteAndTypes(
    inputDir,
    outputFile,
    spriteUrl,
    spriteFilename,
    typesOutputFile
  );

  // Start watcher in dev mode
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    startWatcher(
      inputDir,
      outputFile,
      spriteUrl,
      spriteFilename,
      typesOutputFile
    );
  }

  // Return config without loader modifications
  // Users should import from the generated types file instead
  return nextConfig;
}
