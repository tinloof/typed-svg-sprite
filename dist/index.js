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
const path = __importStar(require("path"));
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
const svgSpriteLoader = function (source) {
    // Mark this loader as cacheable
    this.cacheable && this.cacheable();
    // Get loader options
    const options = this.getOptions() || {};
    // Validate required options
    if (!options.url) {
        this.emitError(new Error("SVG Sprite Loader Error: 'url' option is required."));
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.emitError(new Error(`SVG Sprite Loader Error: ${errorMessage}`));
        return `module.exports = "";`;
    }
};
/**
 * Generates a symbol ID from file path (relative to project root)
 */
function generateSymbolIdFromPath(filePath, context) {
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
exports.default = svgSpriteLoader;
