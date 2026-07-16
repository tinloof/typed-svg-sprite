import * as path from "path";
import { generateSpriteAndTypes } from "./shared.js";

// Keep the integration structurally typed so importing the package's other
// entry points does not require Vite or its ESM-only type declarations.
interface ResolvedViteConfig {
  base: string;
  publicDir: string;
  root: string;
}

type WatchEvent = "add" | "change" | "unlink";
type WatchListener = (file: string) => void;

interface ViteDevServer {
  config: {
    logger: {
      error(message: string): void;
    };
  };
  httpServer?: {
    once(event: "close", listener: () => void): unknown;
  } | null;
  watcher: {
    add(path: string): unknown;
    off(event: WatchEvent, listener: WatchListener): unknown;
    on(event: WatchEvent, listener: WatchListener): unknown;
  };
  ws: {
    send(payload: { type: "full-reload"; path: string }): void;
  };
}

export interface ViteSpritePlugin {
  name: string;
  configResolved(config: ResolvedViteConfig): void;
  configureServer(server: ViteDevServer): void;
}

export interface ViteSpritePluginOptions {
  /**
   * URL path where the sprite file will be served from.
   * Defaults to Vite's resolved `base`.
   */
  url?: string;

  /**
   * Filename for the sprite file.
   * @default "sprite.svg"
   */
  filename?: string;

  /**
   * Directory containing SVG files to include in the sprite.
   * Relative paths are resolved from Vite's project root.
   * Defaults to the `icons` directory inside Vite's public directory.
   */
  inputDir?: string;

  /**
   * Output path for the sprite file.
   * Relative paths are resolved from Vite's project root.
   * Defaults to the sprite filename inside Vite's public directory.
   */
  outputFile?: string;

  /**
   * Output path for the TypeScript types file.
   * Relative paths are resolved from Vite's project root.
   * @default "src/generated/icons.ts"
   */
  typesOutputFile?: string;

  /**
   * Whether to generate a React Icon component.
   * @default false
   */
  generateIconComponent?: boolean;

  /**
   * Output path for the React Icon component (without extension).
   * Relative paths are resolved from Vite's project root.
   * @default "src/generated/Icon"
   */
  iconComponentOutputFile?: string;
}

interface ResolvedSpriteOptions {
  inputDir: string;
  outputFile: string;
  spriteUrl: string;
  spriteFilename: string;
  typesOutputFile: string;
  generateIcon: false | { react: true };
  iconComponentOutputFile: string;
}

function resolveFromRoot(root: string, filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(root, filePath);
}

function resolveOptions(
  config: ResolvedViteConfig,
  options: ViteSpritePluginOptions,
): ResolvedSpriteOptions {
  const spriteFilename = options.filename ?? "sprite.svg";

  return {
    inputDir: options.inputDir
      ? resolveFromRoot(config.root, options.inputDir)
      : path.resolve(config.publicDir, "icons"),
    outputFile: options.outputFile
      ? resolveFromRoot(config.root, options.outputFile)
      : path.resolve(config.publicDir, spriteFilename),
    spriteUrl: options.url ?? config.base,
    spriteFilename,
    typesOutputFile: resolveFromRoot(
      config.root,
      options.typesOutputFile ?? "src/generated/icons.ts",
    ),
    generateIcon: options.generateIconComponent ? { react: true } : false,
    iconComponentOutputFile: resolveFromRoot(
      config.root,
      options.iconComponentOutputFile ?? "src/generated/Icon",
    ),
  };
}

function generate(options: ResolvedSpriteOptions): void {
  generateSpriteAndTypes(
    options.inputDir,
    options.outputFile,
    options.spriteUrl,
    options.spriteFilename,
    options.typesOutputFile,
    options.generateIcon,
    options.iconComponentOutputFile,
  );
}

function isSvgInsideDirectory(file: string, directory: string): boolean {
  if (path.extname(file).toLowerCase() !== ".svg") {
    return false;
  }

  const relativePath = path.relative(directory, file);
  return (
    relativePath !== "" &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== ".." &&
    !path.isAbsolute(relativePath)
  );
}

function watchIcons(
  server: ViteDevServer,
  options: ResolvedSpriteOptions,
): void {
  const regenerate = (file: string): void => {
    if (!isSvgInsideDirectory(file, options.inputDir)) {
      return;
    }

    try {
      generate(options);
      server.ws.send({ type: "full-reload", path: "*" });
    } catch (error) {
      server.config.logger.error(
        `[typed-svg-sprite] Failed to regenerate sprite: ${String(error)}`,
      );
    }
  };

  server.watcher.add(options.inputDir);
  server.watcher.on("add", regenerate);
  server.watcher.on("change", regenerate);
  server.watcher.on("unlink", regenerate);
  server.httpServer?.once("close", () => {
    server.watcher.off("add", regenerate);
    server.watcher.off("change", regenerate);
    server.watcher.off("unlink", regenerate);
  });
}

/**
 * Generates an SVG sprite and TypeScript icon hrefs for Vite projects.
 */
export function svgSprite(
  options: ViteSpritePluginOptions = {},
): ViteSpritePlugin {
  let resolvedOptions: ResolvedSpriteOptions | undefined;

  return {
    name: "typed-svg-sprite",
    configResolved(config) {
      resolvedOptions = resolveOptions(config, options);
      generate(resolvedOptions);
    },
    configureServer(server) {
      if (resolvedOptions) {
        watchIcons(server, resolvedOptions);
      }
    },
  };
}
