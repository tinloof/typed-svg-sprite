import * as path from "path";
import * as cheerio from "cheerio";
import type { LoaderContext } from "webpack";

interface LoaderOptions {
  /**
   * Custom path/filename for the sprite file.
   * Can be a relative path from the webpack output directory.
   * Defaults to "sprite.svg"
   */
  dist?: string;
}

interface SvgSymbol {
  id: string;
  viewBox: string;
  content: string;
  attributes: Record<string, string>;
}

// Global sprite registry to track imported SVGs
const spriteRegistry = new Map<string, SvgSymbol>();
const SPRITE_FILENAME = "sprite.svg";

/**
 * SVG Sprite Webpack Loader
 * Processes individual SVG imports and adds them to a shared sprite
 */
const svgSpriteLoader = function (
  this: LoaderContext<LoaderOptions>,
  source: string
): string {
  // Mark this loader as cacheable
  this.cacheable && this.cacheable();

  // Get loader options
  const options = this.getOptions() || {};

  // Get the webpack context (project root)
  const context = this.rootContext || process.cwd();

  // Get the current SVG file path
  const currentFilePath = this.resourcePath;

  try {
    // Generate symbol ID from file path
    const symbolId = generateSymbolIdFromPath(currentFilePath, context);

    // Parse the current SVG file
    const svgSymbol = parseSvgFile(source, symbolId);

    // Add/update symbol in registry
    spriteRegistry.set(currentFilePath, svgSymbol);

    // Update the sprite file incrementally
    updateSpriteFile(this, options);

    let dist = options.dist || SPRITE_FILENAME;
    // remove the leading /
    if (dist.startsWith("/")) {
      dist = dist.slice(1);
    }

    const moduleHref = `${dist}#${symbolId}`;
    // Return the symbol ID
    return `module.exports = ${JSON.stringify(moduleHref)};`;
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

/**
 * Parses an SVG file content and creates a symbol
 */
function parseSvgFile(svgContent: string, symbolId: string): SvgSymbol {
  // Parse the SVG with cheerio
  const $ = cheerio.load(svgContent, { xmlMode: true });
  const $svg = $("svg").first();

  if ($svg.length === 0) {
    throw new Error("Invalid SVG content");
  }

  // Get the viewBox or calculate it from width/height
  let viewBox = $svg.attr("viewBox");
  if (!viewBox) {
    const width = $svg.attr("width") || "24";
    const height = $svg.attr("height") || "24";
    viewBox = `0 0 ${width} ${height}`;
  }

  // Collect all SVG attributes (except those we handle separately)
  const attributes: Record<string, string> = {};
  const svgAttribs = $svg.get(0)?.attribs || {};

  // Preserve important attributes, excluding some that don't make sense for symbols
  const excludeAttribs = new Set([
    "viewBox",
    "width",
    "height",
    "xmlns",
    "xmlns:xlink",
  ]);

  for (const [key, value] of Object.entries(svgAttribs)) {
    if (!excludeAttribs.has(key) && value) {
      attributes[key] = value;
    }
  }

  return {
    id: symbolId,
    viewBox: viewBox,
    content: $svg.html() || "",
    attributes: attributes,
  };
}

// Track sprite emission with timeout-based debouncing
let spriteEmissionTimeout: NodeJS.Timeout | null = null;
let lastLoaderContext: LoaderContext<LoaderOptions> | null = null;
let lastOptions: LoaderOptions = {};

/**
 * Updates the sprite file using a debounced approach
 */
function updateSpriteFile(
  loaderContext: LoaderContext<LoaderOptions>,
  options: LoaderOptions
): void {
  // Store the latest loader context and options
  lastLoaderContext = loaderContext;
  lastOptions = options;

  // Clear any pending emission
  if (spriteEmissionTimeout) {
    clearTimeout(spriteEmissionTimeout);
  }

  // Set a new timeout to emit the sprite after all SVGs are processed
  spriteEmissionTimeout = setTimeout(() => {
    console.log("Updating sprite file");
    try {
      if (lastLoaderContext) {
        // Generate sprite from current registry
        const symbols = Array.from(spriteRegistry.values());
        const sprite = generateSpriteSvg(symbols);

        // Determine sprite filename from options or use default
        const spriteFilename = lastOptions.dist || SPRITE_FILENAME;

        // Emit sprite file using webpack
        const spriteBuffer = Buffer.from(sprite, "utf8");
        lastLoaderContext.emitFile(spriteFilename, spriteBuffer);
      }
    } catch (error) {
      console.error("Error updating sprite file:", error);
    } finally {
      spriteEmissionTimeout = null;
      lastLoaderContext = null;
      lastOptions = {};
    }
  }, 100); // Small delay to allow all SVGs to be processed
}

/**
 * Generates the final sprite SVG
 */
function generateSpriteSvg(symbols: SvgSymbol[]): string {
  if (symbols.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
</svg>`;
  }

  const symbolElements = symbols
    .map((symbol) => {
      // Build attributes string
      let attributesStr = "";
      for (const [key, value] of Object.entries(symbol.attributes)) {
        attributesStr += ` ${key}="${value}"`;
      }

      return `<symbol id="${symbol.id}" viewBox="${symbol.viewBox}"${attributesStr}>${symbol.content}</symbol>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
  ${symbolElements}
</svg>`;
}

export default svgSpriteLoader;
