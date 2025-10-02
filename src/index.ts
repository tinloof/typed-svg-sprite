import * as path from "path";
import type { LoaderContext } from "webpack";

interface LoaderOptions {
  /**
   * URL path where the sprite file will be served from.
   * This is the base URL that will be prepended to the sprite filename.
   */
  url: string;

  /**
   * Filename for the sprite file.
   * @default "sprite.svg"
   */
  filename?: string;

  /**
   * Directory containing SVG files (relative to project root).
   * Used to generate symbol IDs consistently with the sprite generator.
   * If not provided, uses the project root.
   * @default undefined
   */
  inputDir?: string;
}

/**
 * SVG Sprite Webpack Loader
 *
 * Transforms SVG imports into sprite symbol references.
 *
 * Note: This loader only generates symbol references.
 * You must generate the actual sprite file separately using the CLI tool:
 * `svg-sprite-generate --input <icons-dir> --output <sprite-path>`
 *
 * @example
 * // Input
 * import homeIcon from './icons/home.svg';
 *
 * // Output
 * const homeIcon = '/sprite.svg#icons-home';
 */
const svgSpriteLoader = function (
  this: LoaderContext<LoaderOptions>,
  source: string
): string {
  // Mark this loader as cacheable
  this.cacheable && this.cacheable();

  // Get loader options
  const options = this.getOptions() || {};

  // Validate required options
  if (!options.url) {
    this.emitError(
      new Error("SVG Sprite Loader Error: 'url' option is required.")
    );
    return `module.exports = "";`;
  }

  // Get the webpack context (project root)
  const context = this.rootContext || process.cwd();

  // Get the current SVG file path
  const currentFilePath = this.resourcePath;

  try {
    // Determine the base directory for generating symbol IDs
    let baseDir = context;
    if (options.inputDir) {
      // Use inputDir to generate IDs consistent with sprite generator
      baseDir = path.resolve(context, options.inputDir);
    }

    // Generate symbol ID from file path
    const symbolId = generateSymbolIdFromPath(currentFilePath, baseDir);

    // Build the URL for the symbol reference
    const spriteUrl = options.url.endsWith("/")
      ? options.url
      : `${options.url}/`;
    const spriteFilename = options.filename || "sprite.svg";
    const symbolReference = `${spriteUrl}${spriteFilename}#${symbolId}`;

    // Return the symbol reference
    return `module.exports = ${JSON.stringify(symbolReference)};`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.emitError(new Error(`SVG Sprite Loader Error: ${errorMessage}`));
    return `module.exports = "";`;
  }
};

/**
 * Generates a symbol ID from file path (relative to project root)
 */
function generateSymbolIdFromPath(filePath: string, context: string): string {
  // Get relative path from project root
  const relativePath = path.relative(context, filePath);

  // Remove extension and convert path to symbol ID
  const pathWithoutExt = relativePath.replace(/\.svg$/, "");

  // Replace path separators with dashes and clean up
  const symbolId = pathWithoutExt
    .replace(/[\/\\]/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes

  return symbolId;
}

export default svgSpriteLoader;
