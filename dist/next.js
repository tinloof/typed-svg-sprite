"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSpriteLoader = withSpriteLoader;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cheerio = __importStar(require("cheerio"));
const glob_1 = require("glob");
// Track if we've already started watching
let watcherInitialized = false;
function generateSymbolIdFromPath(filePath, baseDir) {
    const relativePath = path.relative(baseDir, filePath);
    const pathWithoutExt = relativePath.replace(/\.svg$/, "");
    const symbolId = pathWithoutExt
        .replace(/[\/\\]/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    return symbolId;
}
function parseSvgFile(svgContent, symbolId) {
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
    const attributes = {};
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
function generateSpriteSvg(symbols, minify = true) {
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
function generateSprite(inputDir, outputFile, spriteUrl, spriteFilename, typesOutputFile) {
    try {
        const projectRoot = process.cwd();
        const absoluteInputDir = path.resolve(projectRoot, inputDir);
        const absoluteOutputFile = path.resolve(projectRoot, outputFile);
        // Check if input directory exists
        if (!fs.existsSync(absoluteInputDir)) {
            console.warn(`[svg-sprite] Input directory not found: ${inputDir}`);
            return;
        }
        // Find all SVG files
        const svgFiles = (0, glob_1.globSync)("**/*.svg", {
            cwd: absoluteInputDir,
            absolute: true,
        });
        if (svgFiles.length === 0) {
            console.warn(`[svg-sprite] No SVG files found in ${inputDir}`);
            return;
        }
        // Parse all SVG files
        const symbols = [];
        for (const svgFile of svgFiles) {
            try {
                const content = fs.readFileSync(svgFile, "utf8");
                const symbolId = generateSymbolIdFromPath(svgFile, absoluteInputDir);
                const symbol = parseSvgFile(content, symbolId);
                symbols.push(symbol);
            }
            catch (error) {
                console.error(`[svg-sprite] Error parsing ${svgFile}:`, error);
            }
        }
        // Generate sprite
        const spriteContent = generateSpriteSvg(symbols);
        // Write sprite file
        const outputDir = path.dirname(absoluteOutputFile);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(absoluteOutputFile, spriteContent, "utf8");
        console.log(`[svg-sprite] ✅ Generated sprite with ${symbols.length} symbols → ${outputFile}`);
        // Generate TypeScript types file if specified
        if (typesOutputFile) {
            generateTypesFile(symbols, spriteUrl, spriteFilename, typesOutputFile);
        }
    }
    catch (error) {
        console.error("[svg-sprite] Error generating sprite:", error);
    }
}
function generateTypesFile(symbols, spriteUrl, spriteFilename, outputFile) {
    try {
        const projectRoot = process.cwd();
        const absoluteOutputFile = path.resolve(projectRoot, outputFile);
        const spriteUrlWithFilename = spriteUrl.endsWith("/")
            ? `${spriteUrl}${spriteFilename}`
            : `${spriteUrl}/${spriteFilename}`;
        // Generate TypeScript content
        const iconIds = symbols.map((s) => s.id);
        const iconIdType = iconIds.map((id) => `  | "${id}"`).join("\n");
        const iconExports = symbols
            .map((s) => {
            // Convert kebab-case to UPPER_SNAKE_CASE
            const constantName = s.id.replace(/-/g, "_").toUpperCase();
            return `export const ${constantName}: IconHref = "${spriteUrlWithFilename}#${s.id}";`;
        })
            .join("\n");
        const content = `// Auto-generated by svg-sprite-webpack-loader
// Do not edit this file manually

/**
 * Available icon IDs in the sprite
 */
export type IconId =
${iconIdType};

/**
 * Type-safe icon href (sprite URL + fragment identifier)
 */
export type IconHref = \`${spriteUrlWithFilename}#\${IconId}\`;

/**
 * Get the full sprite URL for an icon ID
 */
export function getIconHref(iconId: IconId): IconHref {
  return \`${spriteUrlWithFilename}#\${iconId}\` as IconHref;
}

/**
 * Pre-built icon references
 */
${iconExports}

/**
 * All available icons as an array
 */
export const allIcons: IconId[] = [
${iconIds.map((id) => `  "${id}",`).join("\n")}
];
`;
        // Write types file
        const outputDir = path.dirname(absoluteOutputFile);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(absoluteOutputFile, content, "utf8");
        console.log(`[svg-sprite] ✅ Generated types file → ${outputFile}`);
    }
    catch (error) {
        console.error("[svg-sprite] Error generating types file:", error);
    }
}
function startWatcher(inputDir, outputFile, spriteUrl, spriteFilename, typesOutputFile) {
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
        if (filename && filename.endsWith(".svg")) {
            console.log(`[svg-sprite] Change detected: ${filename}`);
            generateSprite(inputDir, outputFile, spriteUrl, spriteFilename, typesOutputFile);
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
 * import { withSpriteLoader } from 'svg-sprite-webpack-loader/next';
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
function withSpriteLoader(nextConfig, options) {
    const inputDir = options?.inputDir ?? "public/icons";
    const outputFile = options?.outputFile ?? "public/sprite.svg";
    const spriteUrl = options?.url ?? "/";
    const spriteFilename = options?.filename ?? "sprite.svg";
    const typesOutputFile = options?.typesOutputFile ?? "generated/icons.ts";
    // Generate sprite and types on startup
    generateSprite(inputDir, outputFile, spriteUrl, spriteFilename, typesOutputFile);
    // Start watcher in dev mode
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
        startWatcher(inputDir, outputFile, spriteUrl, spriteFilename, typesOutputFile);
    }
    // Return config without loader modifications
    // Users should import from the generated types file instead
    return nextConfig;
}
