import { generateSpriteAndTypes, startWatcher } from "./shared.js";

// Prevent double generation when Next.js loads config multiple times
let hasGenerated = false;

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

  /**
   * Whether to generate the Icon React component.
   * @default true
   */
  generateIconComponent?: boolean;

  /**
   * Output path for the Icon component file (without extension).
   * Relative to project root.
   * @default "generated/Icon"
   */
  iconComponentOutputFile?: string;
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
 * import { withSpriteLoader } from '@tinloof/typed-svg-sprite/next';
 *
 * export default withSpriteLoader({
 *   // your existing Next.js config
 * });
 *
 * // Then in your components:
 * import { HOME, SETTINGS } from '@/generated/icons';
 * import { Icon } from '@/generated/Icon'; // Icon component is auto-generated
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
 *     iconComponentOutputFile: "components/Icon.tsx",
 *     url: "/",
 *     filename: "icons-sprite.svg"
 *   }
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Disable Icon component generation
 * export default withSpriteLoader(
 *   { /* your config *\/ },
 *   {
 *     generateIconComponent: false
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
  const generateIcon = options?.generateIconComponent === false ? false : { react: true };
  const iconComponentOutputFile =
    options?.iconComponentOutputFile ?? "generated/Icon";

  // Generate sprite and types on startup (only once)
  if (!hasGenerated) {
    hasGenerated = true;
    generateSpriteAndTypes(
      inputDir,
      outputFile,
      spriteUrl,
      spriteFilename,
      typesOutputFile,
      generateIcon,
      iconComponentOutputFile
    );

    // Start watcher in dev mode
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
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
  }

  // Return config without loader modifications
  // Users should import from the generated types file instead
  return nextConfig;
}
