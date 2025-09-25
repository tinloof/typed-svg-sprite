import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as cheerio from "cheerio";
import type { LoaderContext } from "webpack";

export interface SvgSpriteLoaderOptions {
  srcDir?: string;
  pattern?: string;
  recursive?: boolean;
  symbolPrefix?: string;
  inline?: boolean;
  className?: string;
  generateTypes?: boolean;
  typesOutputPath?: string;
  typesFormat?: "enum" | "union" | "both";
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

  // Default options
  const defaultOptions = {
    // Directory to search for SVGs (relative to webpack context)
    srcDir: options.srcDir || "src",
    // File pattern to match SVG files
    pattern: options.pattern || "**/*.svg",
    // Whether to include subdirectories
    recursive: options.recursive !== false,
    // Prefix for symbol IDs
    symbolPrefix: options.symbolPrefix || "icon-",
    // Output sprite inline or as separate file
    inline: options.inline !== false,
    // Custom class name for the sprite container
    className: options.className || "svg-sprite",
    // Generate TypeScript definitions for icon IDs
    generateTypes: options.generateTypes || false,
    // Output path for generated TypeScript file
    typesOutputPath: options.typesOutputPath || "icon-types.ts",
    // Format for generated types
    typesFormat: options.typesFormat || "both",
  };

  // Get the webpack context (project root)
  const context = this.rootContext || process.cwd();

  // Build the search path
  const searchDir = path.resolve(context, defaultOptions.srcDir);
  const searchPattern = path
    .join(searchDir, defaultOptions.pattern)
    .replace(/\\/g, "/");

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

    // Additionally, watch all subdirectories that might contain SVG files
    try {
      const subdirPattern = path.join(searchDir, "*/").replace(/\\/g, "/");
      const subdirs = glob.sync(subdirPattern, {
        nodir: false,
      });
      subdirs.forEach((dir) => {
        if (fs.statSync(dir).isDirectory()) {
          this.addContextDependency(dir);
        }
      });
    } catch (error) {
      // Fallback: just watch the main directory
      console.warn(
        "SVG Sprite Loader: Could not setup subdirectory watching:",
        error
      );
    }

    if (svgFiles.length === 0) {
      console.warn("SVG Sprite Loader: No SVG files found in", searchDir);
      return 'module.exports = "";';
    }

    // Create the SVG sprite
    const { sprite, symbolIds } = createSvgSprite(
      svgFiles,
      defaultOptions,
      context
    );

    // Generate TypeScript types if requested
    if (defaultOptions.generateTypes) {
      const typesContent = generateTypesFile(symbolIds, defaultOptions);

      // Write types file directly to filesystem using absolute path
      const typesFilePath = path.resolve(
        context,
        defaultOptions.typesOutputPath
      );
      const typesDir = path.dirname(typesFilePath);

      // Ensure directory exists
      if (!fs.existsSync(typesDir)) {
        fs.mkdirSync(typesDir, { recursive: true });
      }

      // Write the types file
      fs.writeFileSync(typesFilePath, typesContent, "utf8");
    }

    // Return the sprite as a module
    if (defaultOptions.inline) {
      return `module.exports = ${JSON.stringify(sprite)};`;
    } else {
      // For future enhancement: emit as separate file
      return `module.exports = ${JSON.stringify(sprite)};`;
    }
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
  options: Required<SvgSpriteLoaderOptions>,
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
        options.symbolPrefix,
        options.srcDir
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
  const sprite = generateSpriteSvg(symbols, options);

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
function generateSpriteSvg(
  symbols: SvgSymbol[],
  options: Required<SvgSpriteLoaderOptions>
): string {
  if (symbols.length === 0) {
    return "";
  }

  const symbolElements = symbols
    .map((symbol) => {
      return `<symbol id="${symbol.id}" viewBox="${symbol.viewBox}">${symbol.content}</symbol>`;
    })
    .join("\n  ");

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" class="${options.className}" style="display: none;">
  ${symbolElements}
</svg>`;

  return sprite;
}

/**
 * Generates TypeScript definitions for icon IDs
 */
function generateTypesFile(
  symbolIds: string[],
  options: Required<SvgSpriteLoaderOptions>
): string {
  const enumName = "IconId";
  const typeName = "IconIdType";

  let content = `// Auto-generated by svg-sprite-webpack-loader
// Do not edit this file manually

`;

  if (options.typesFormat === "enum" || options.typesFormat === "both") {
    // Generate enum
    content += `/**
 * Enum containing all available icon IDs
 */
export enum ${enumName} {
`;

    symbolIds.forEach((id) => {
      // Convert kebab-case to PascalCase for enum keys
      const enumKey = id
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");

      content += `  ${enumKey} = "${id}",\n`;
    });

    content += `}

`;
  }

  if (options.typesFormat === "union" || options.typesFormat === "both") {
    // Generate union type
    content += `/**
 * Union type of all available icon IDs
 */
export type ${typeName} = 
`;

    symbolIds.forEach((id, index) => {
      const isLast = index === symbolIds.length - 1;
      content += `  | "${id}"${isLast ? ";" : ""}\n`;
    });

    content += `
`;
  }

  // Add helper type for icon props
  if (options.typesFormat === "both" || options.typesFormat === "union") {
    const iconType =
      options.typesFormat === "both" ? `${enumName} | ${typeName}` : typeName;
    content += `/**
 * Props for icon components
 */
export interface IconProps {
  id: ${iconType};
  className?: string;
  size?: number | string;
}

`;
  } else {
    content += `/**
 * Props for icon components
 */
export interface IconProps {
  id: ${enumName};
  className?: string;
  size?: number | string;
}

`;
  }

  // Add array of all icon IDs
  content += `/**
 * Array of all available icon IDs
 */
export const ALL_ICON_IDS = [
`;

  symbolIds.forEach((id, index) => {
    const isLast = index === symbolIds.length - 1;
    content += `  "${id}"${isLast ? "" : ","}\n`;
  });

  content += `] as const;

`;

  // Add helper function
  content += `/**
 * Type guard to check if a string is a valid icon ID
 */
export function isValidIconId(id: string): id is ${
    options.typesFormat === "both"
      ? `${enumName} | ${typeName}`
      : options.typesFormat === "enum"
      ? enumName
      : typeName
  } {
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
  const srcDir = options.srcDir || "src";

  return svgFiles.map((filePath) => {
    const relativePath = path.relative(context, filePath);
    return generateSymbolId(relativePath, symbolPrefix, srcDir);
  });
}

export default svgSpriteLoader;
