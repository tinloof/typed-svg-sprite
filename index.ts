import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as cheerio from "cheerio";
import type { LoaderContext } from "webpack";

export interface SvgSpriteLoaderOptions {
  src: string; // Source folder with SVGs
  dist?: string; // Output folder (default: same as webpack output)
  symbolPrefix?: string; // Symbol ID prefix (default: "icon-")
  generateTypes?: boolean; // Generate TypeScript types (default: false)
  typesOutput?: string; // Where to save types file (default: "src/sprite-types.ts")
}

interface SvgSymbol {
  id: string;
  viewBox: string;
  content: string;
}

/**
 * SVG Sprite Webpack Loader
 * Creates a single SVG sprite from all SVG files in the project directory
 */
const svgSpriteLoader = function (
  this: LoaderContext<SvgSpriteLoaderOptions>,
  source: string
): string {
  // Mark this loader as cacheable
  this.cacheable && this.cacheable();

  // Get loader options (webpack 5 compatible)
  const options = this.getOptions() || {};

  // Validate required options
  if (!options.src) {
    this.emitError(new Error('SVG Sprite Loader: "src" option is required'));
    return 'module.exports = "";';
  }

  // Simple options
  const config = {
    src: options.src,
    dist: options.dist || "", // Will use webpack output dir
    symbolPrefix: options.symbolPrefix || "icon-",
    generateTypes: options.generateTypes || false,
    typesOutput: options.typesOutput || "src/sprite-types.ts",
    spriteFilename: "sprite.svg",
  };

  // Get the webpack context (project root)
  const context = this.rootContext || process.cwd();

  // Build the search path - automatically find all SVGs in src directory
  const searchDir = path.resolve(context, config.src);
  const searchPattern = path.join(searchDir, "**/*.svg").replace(/\\/g, "/");

  try {
    // Find all SVG files
    const svgFiles = glob.sync(searchPattern, {
      nodir: true,
      absolute: true,
    });

    // Add dependencies so webpack watches these files
    svgFiles.forEach((file) => {
      this.addDependency(file);
    });

    // Also watch the source directory for new files
    this.addContextDependency(searchDir);

    if (svgFiles.length === 0) {
      console.warn("SVG Sprite Loader: No SVG files found in", searchDir);
      return 'module.exports = "";';
    }

    // Create the SVG sprite
    const { sprite, symbolIds } = createSvgSprite(svgFiles, config, context);

    // Generate TypeScript types if requested
    if (config.generateTypes) {
      const typesContent = generateTypesFile(symbolIds);
      const typesFilePath = path.resolve(context, config.typesOutput);

      // Ensure directory exists
      const typesDir = path.dirname(typesFilePath);
      if (!fs.existsSync(typesDir)) {
        fs.mkdirSync(typesDir, { recursive: true });
      }

      // Only write the types file if it doesn't exist or content has changed
      let shouldWrite = true;
      if (fs.existsSync(typesFilePath)) {
        const existingContent = fs.readFileSync(typesFilePath, "utf8");
        shouldWrite = existingContent !== typesContent;
      }

      if (shouldWrite) {
        fs.writeFileSync(typesFilePath, typesContent, "utf8");
      }
    }

    // Always emit as external file (no inline support)
    const spriteBuffer = Buffer.from(sprite, "utf8");

    let spriteUrl: string;

    if (config.dist) {
      // Custom output directory specified
      const outputDir = path.resolve(context, config.dist);
      const spriteFilePath = path.join(outputDir, config.spriteFilename);

      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Only write sprite file if it doesn't exist or content has changed
      let shouldWriteSprite = true;
      if (fs.existsSync(spriteFilePath)) {
        const existingSprite = fs.readFileSync(spriteFilePath, "utf8");
        shouldWriteSprite = existingSprite !== sprite;
      }

      if (shouldWriteSprite) {
        fs.writeFileSync(spriteFilePath, sprite, "utf8");
      }

      // For custom dist directories, use the directory name as the public path
      const distDirName = path.basename(config.dist);
      spriteUrl = `/${distDirName}/${config.spriteFilename}`;
    } else {
      // Use webpack's default output directory
      this.emitFile(config.spriteFilename, spriteBuffer);

      // Get the public path for the sprite file
      const publicPathOption =
        this._compilation?.outputOptions?.publicPath || "";
      const publicPath =
        typeof publicPathOption === "string" ? publicPathOption : "";

      // Build sprite URL
      spriteUrl = publicPath.endsWith("/")
        ? publicPath + config.spriteFilename
        : publicPath
        ? publicPath + "/" + config.spriteFilename
        : config.spriteFilename;
    }

    return `module.exports = ${JSON.stringify(spriteUrl)};`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.emitError(new Error(`SVG Sprite Loader Error: ${errorMessage}`));
    return 'module.exports = "";';
  }
};

/**
 * Creates an SVG sprite from multiple SVG files
 */
function createSvgSprite(
  svgFiles: string[],
  config: { src: string; symbolPrefix: string },
  context: string
): { sprite: string; symbolIds: string[] } {
  const symbols: SvgSymbol[] = [];
  const symbolIds: string[] = [];

  svgFiles.forEach((filePath) => {
    try {
      // Read the SVG file
      const svgContent = fs.readFileSync(filePath, "utf8");

      // Parse the SVG with cheerio
      const $ = cheerio.load(svgContent, {
        xmlMode: true,
      });

      const $svg = $("svg").first();

      if ($svg.length === 0) {
        console.warn(`SVG Sprite Loader: Invalid SVG file ${filePath}`);
        return;
      }

      // Generate symbol ID from file path
      const relativePath = path.relative(context, filePath);
      const symbolId = generateSymbolId(
        relativePath,
        config.symbolPrefix,
        config.src
      );

      // Get the viewBox or calculate it from width/height
      let viewBox = $svg.attr("viewBox");
      if (!viewBox) {
        const width = $svg.attr("width") || "24";
        const height = $svg.attr("height") || "24";
        viewBox = `0 0 ${width} ${height}`;
      }

      // Create symbol element
      const symbol = {
        id: symbolId,
        viewBox: viewBox,
        content: $svg.html() || "",
      };

      symbols.push(symbol);
      symbolIds.push(symbolId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.warn(
        `SVG Sprite Loader: Error processing ${filePath}:`,
        errorMessage
      );
    }
  });

  // Generate the final sprite SVG
  const sprite = generateSpriteSvg(symbols);

  return { sprite, symbolIds };
}

/**
 * Generates a symbol ID from file path
 */
function generateSymbolId(
  filePath: string,
  prefix: string,
  srcDir: string
): string {
  // Remove extension and normalize path separators
  const name = path.parse(filePath).name;
  const dir = path.dirname(filePath);

  // Create a meaningful ID by removing the srcDir prefix
  let id = name;
  if (dir && dir !== ".") {
    // Normalize srcDir path and create a pattern to remove it
    const normalizedSrcDir = srcDir.replace(/[\/\\]/g, "[/\\\\]");
    const srcDirPattern = new RegExp(`^${normalizedSrcDir}[/\\\\]?`);

    // Remove the srcDir prefix from the directory path
    const cleanDir = dir.replace(srcDirPattern, "");

    if (cleanDir) {
      id = cleanDir.replace(/[\/\\]/g, "-") + "-" + name;
    }
  }

  // Clean up the ID
  id = id.replace(/[^a-zA-Z0-9-_]/g, "-").replace(/--+/g, "-");

  return prefix + id;
}

/**
 * Generates the final sprite SVG
 */
function generateSpriteSvg(symbols: SvgSymbol[]): string {
  if (symbols.length === 0) {
    return "";
  }

  const symbolElements = symbols
    .map((symbol) => {
      return `<symbol id="${symbol.id}" viewBox="${symbol.viewBox}">${symbol.content}</symbol>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
  ${symbolElements}
</svg>`;
}

/**
 * Generates TypeScript definitions for icon IDs
 */
function generateTypesFile(symbolIds: string[]): string {
  let content = `// Auto-generated by svg-sprite-webpack-loader
// Do not edit this file manually

/**
 * Union type of all available icon IDs
 */
export type IconId = 
`;

  symbolIds.forEach((id, index) => {
    const isLast = index === symbolIds.length - 1;
    content += `  | "${id}"${isLast ? ";" : ""}\n`;
  });

  content += `

/**
 * Props for icon components
 */
export interface IconProps {
  id: IconId;
  className?: string;
  size?: number | string;
}

/**
 * Array of all available icon IDs
 */
export const ALL_ICON_IDS = [
`;

  symbolIds.forEach((id, index) => {
    const isLast = index === symbolIds.length - 1;
    content += `  "${id}"${isLast ? "" : ","}\n`;
  });

  content += `] as const;

/**
 * Type guard to check if a string is a valid icon ID
 */
export function isValidIconId(id: string): id is IconId {
  return ALL_ICON_IDS.includes(id as any);
}
`;

  return content;
}

/**
 * Helper function to get symbol IDs (can be imported separately)
 */
export function getSymbolIds(
  svgFiles: string[],
  options: Partial<SvgSpriteLoaderOptions & { context?: string }> = {}
): string[] {
  const context = options.context || process.cwd();
  const symbolPrefix = options.symbolPrefix || "icon-";
  const src = options.src || "src";

  return svgFiles.map((filePath) => {
    const relativePath = path.relative(context, filePath);
    return generateSymbolId(relativePath, symbolPrefix, src);
  });
}

export default svgSpriteLoader;
