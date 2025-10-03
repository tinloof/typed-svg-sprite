#!/usr/bin/env node
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cheerio = __importStar(require("cheerio"));
const glob_1 = require("glob");
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {};
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "--input":
            case "-i":
                options.input = args[++i];
                break;
            case "--output":
            case "-o":
                options.output = args[++i];
                break;
            case "--watch":
            case "-w":
                options.watch = true;
                break;
            case "--help":
            case "-h":
                printHelp();
                process.exit(0);
        }
    }
    if (!options.input || !options.output) {
        console.error("Error: --input and --output are required\n");
        printHelp();
        process.exit(1);
    }
    return options;
}
function printHelp() {
    console.log(`
SVG Sprite Generator

Usage:
  svg-sprite-generate --input <dir> --output <file> [options]

Options:
  -i, --input <dir>    Directory containing SVG files
  -o, --output <file>  Output sprite file path
  -w, --watch          Watch for changes and regenerate
  -h, --help           Show this help message

Examples:
  svg-sprite-generate --input public/icons --output public/sprite.svg
  svg-sprite-generate -i ./icons -o ./dist/sprite.svg --watch
`);
}
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
function generateSprite(inputDir, outputFile) {
    try {
        const absoluteInputDir = path.resolve(process.cwd(), inputDir);
        const absoluteOutputFile = path.resolve(process.cwd(), outputFile);
        // Find all SVG files
        const svgFiles = (0, glob_1.globSync)("**/*.svg", {
            cwd: absoluteInputDir,
            absolute: true,
        });
        console.log(`Found ${svgFiles.length} SVG files in ${inputDir}`);
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
                console.error(`Error parsing ${svgFile}:`, error);
            }
        }
        // Generate sprite
        const spriteContent = generateSpriteSvg(symbols);
        // Write sprite file
        const outputDir = path.dirname(absoluteOutputFile);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(absoluteOutputFile, spriteContent, "utf8");
        console.log(`✅ Generated sprite with ${symbols.length} symbols → ${outputFile}`);
    }
    catch (error) {
        console.error("Error generating sprite:", error);
        process.exit(1);
    }
}
function main() {
    const options = parseArgs();
    // Initial generation
    generateSprite(options.input, options.output);
    // Watch mode
    if (options.watch) {
        const absoluteInputDir = path.resolve(process.cwd(), options.input);
        console.log(`\n👀 Watching ${options.input} for changes...`);
        fs.watch(absoluteInputDir, { recursive: true }, (eventType, filename) => {
            if (filename && filename.endsWith(".svg")) {
                console.log(`\n📝 Change detected: ${filename}`);
                generateSprite(options.input, options.output);
            }
        });
    }
}
main();
