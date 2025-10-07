import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { globSync } from "glob";

/**
 * Represents an SVG symbol with its metadata
 */
export interface SvgSymbol {
  id: string;
  viewBox: string;
  content: string;
  attributes: Record<string, string>;
}

/**
 * Options for sprite generation
 */
export interface SpriteGenerationOptions {
  /**
   * Directory containing SVG files to include in the sprite.
   * Can be relative or absolute path.
   */
  inputDir: string;

  /**
   * Output path for the sprite file.
   * Can be relative or absolute path.
   */
  outputFile: string;

  /**
   * Whether to log output messages
   * @default true
   */
  verbose?: boolean;

  /**
   * Whether to minify the output
   * @default true
   */
  minify?: boolean;
}

/**
 * Generate a symbol ID from a file path relative to a base directory.
 * Converts the path to kebab-case and sanitizes it.
 *
 * @example
 * generateSymbolIdFromPath("/path/to/icons/social/github.svg", "/path/to/icons")
 * // Returns: "social-github"
 */
export function generateSymbolIdFromPath(
  filePath: string,
  baseDir: string
): string {
  const relativePath = path.relative(baseDir, filePath);
  const pathWithoutExt = relativePath.replace(/\.svg$/, "");

  const symbolId = pathWithoutExt
    .replace(/[\/\\]/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

  return symbolId;
}

/**
 * Parse an SVG file and extract its symbol data
 */
export function parseSvgFile(
  svgContent: string,
  symbolId: string
): SvgSymbol {
  const $ = cheerio.load(svgContent, { xmlMode: true });
  const $svg = $("svg").first();

  if ($svg.length === 0) {
    throw new Error("Invalid SVG content");
  }

  let viewBox = $svg.attr("viewBox");
  if (!viewBox) {
    const width = $svg.attr("width") || "24";
    const height = $svg.attr("height") || "24";
    viewBox = `0 0 ${width} ${height}`;
  }

  const attributes: Record<string, string> = {};
  const svgAttribs = $svg.get(0)?.attribs || {};

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

/**
 * Generate the SVG sprite content from symbols
 */
export function generateSpriteSvg(
  symbols: SvgSymbol[],
  minify: boolean = true
): string {
  if (symbols.length === 0) {
    return minify
      ? '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"></svg>'
      : `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
</svg>`;
  }

  const symbolElements = symbols
    .map((symbol) => {
      let attributesStr = "";
      for (const [key, value] of Object.entries(symbol.attributes)) {
        attributesStr += ` ${key}="${value}"`;
      }

      return `<symbol id="${symbol.id}" viewBox="${symbol.viewBox}"${attributesStr}>${symbol.content}</symbol>`;
    })
    .join(minify ? "" : "\n  ");

  if (minify) {
    return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbolElements}</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
  ${symbolElements}
</svg>`;
}

/**
 * Find and parse all SVG files in a directory
 */
export function findAndParseSvgFiles(
  inputDir: string,
  verbose: boolean = true
): SvgSymbol[] {
  const absoluteInputDir = path.resolve(process.cwd(), inputDir);

  // Check if input directory exists
  if (!fs.existsSync(absoluteInputDir)) {
    if (verbose) {
      console.warn(`Input directory not found: ${inputDir}`);
    }
    return [];
  }

  // Find all SVG files
  const svgFiles = globSync("**/*.svg", {
    cwd: absoluteInputDir,
    absolute: true,
  });

  if (svgFiles.length === 0) {
    if (verbose) {
      console.warn(`No SVG files found in ${inputDir}`);
    }
    return [];
  }

  if (verbose) {
    console.log(`Found ${svgFiles.length} SVG files in ${inputDir}`);
  }

  // Parse all SVG files
  const symbols: SvgSymbol[] = [];
  for (const svgFile of svgFiles) {
    try {
      const content = fs.readFileSync(svgFile, "utf8");
      const symbolId = generateSymbolIdFromPath(svgFile, absoluteInputDir);
      const symbol = parseSvgFile(content, symbolId);
      symbols.push(symbol);
    } catch (error) {
      if (verbose) {
        console.error(`Error parsing ${svgFile}:`, error);
      }
    }
  }

  return symbols;
}

/**
 * Generate an SVG sprite file from a directory of SVG files
 */
export function generateSprite(options: SpriteGenerationOptions): SvgSymbol[] {
  const {
    inputDir,
    outputFile,
    verbose = true,
    minify = true,
  } = options;

  try {
    const projectRoot = process.cwd();
    const absoluteOutputFile = path.resolve(projectRoot, outputFile);

    // Find and parse SVG files
    const symbols = findAndParseSvgFiles(inputDir, verbose);

    if (symbols.length === 0) {
      return symbols;
    }

    // Generate sprite
    const spriteContent = generateSpriteSvg(symbols, minify);

    // Write sprite file
    const outputDir = path.dirname(absoluteOutputFile);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(absoluteOutputFile, spriteContent, "utf8");

    if (verbose) {
      console.log(
        `✅ Generated sprite with ${symbols.length} symbols → ${outputFile}`
      );
    }

    return symbols;
  } catch (error) {
    if (verbose) {
      console.error("Error generating sprite:", error);
    }
    throw error;
  }
}
