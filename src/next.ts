import * as fs from "fs";
import * as path from "path";
import { generateSprite } from "./core.js";
import { generateTypesFile } from "./types.js";
import { generateIconComponent } from "./components.js";

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
   * Output path for the Icon component file.
   * Relative to project root.
   * @default "generated/Icon.tsx"
   */
  iconComponentOutputFile?: string;
}

// Track if we've already started watching
let watcherInitialized = false;

function generateSpriteAndTypes(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
): void {
  // Generate sprite and get symbols
  const symbols = generateSprite({
    inputDir,
    outputFile,
    verbose: true,
    minify: true,
    optimize: true,
  });

  // Generate TypeScript types file if specified
  if (typesOutputFile && symbols.length > 0) {
    generateTypesFile({
      symbols,
      spriteUrl,
      spriteFilename,
      outputFile: typesOutputFile,
      verbose: false,
    });

    // Generate Icon component if enabled
    if (generateIcon && iconComponentOutputFile) {
      // Calculate relative path from component to types file
      const componentDir = path.dirname(
        path.resolve(process.cwd(), iconComponentOutputFile)
      );
      const typesFile = path.resolve(process.cwd(), typesOutputFile);
      const typesDir = path.dirname(typesFile);
      const typesFilename = path.basename(typesFile, path.extname(typesFile));

      // Get relative path from component dir to types dir
      const relativePath = path
        .relative(componentDir, typesDir)
        .replace(/\\/g, "/");

      // Construct the import path
      // If same directory, use ./filename
      // If parent/child relationship, ensure proper path format
      let importPath: string;
      if (relativePath === "") {
        importPath = `./${typesFilename}`;
      } else if (relativePath.startsWith("..")) {
        // Parent directory - ensure proper path
        importPath = `${relativePath}/${typesFilename}`.replace(/\/+/g, "/");
      } else {
        // Child directory - ensure it starts with ./
        const normalizedPath = relativePath.startsWith("./")
          ? relativePath
          : `./${relativePath}`;
        importPath = `${normalizedPath}/${typesFilename}`.replace(/\/+/g, "/");
      }

      generateIconComponent({
        outputFile: iconComponentOutputFile,
        typesFileRelativePath: importPath,
        verbose: false,
      });
    }
  }
}

function startWatcher(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
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
        typesOutputFile,
        generateIcon,
        iconComponentOutputFile
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
 * import { withSpriteLoader } from 'typed-svg-sprite/next';
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
  const generateIcon =
    options?.generateIconComponent !== false
      ? options?.generateIconComponent ?? true
      : false;
  const iconComponentOutputFile =
    options?.iconComponentOutputFile ?? "generated/Icon.tsx";

  // Generate sprite and types on startup
  generateSpriteAndTypes(
    inputDir,
    outputFile,
    spriteUrl,
    spriteFilename,
    typesOutputFile,
    generateIcon,
    generateIcon ? iconComponentOutputFile : undefined
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
      generateIcon ? iconComponentOutputFile : undefined
    );
  }

  // Return config without loader modifications
  // Users should import from the generated types file instead
  return nextConfig;
}
