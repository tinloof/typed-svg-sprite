#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { generateSprite } from "./core.js";

interface CliOptions {
  input: string;
  output: string;
  watch?: boolean;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: Partial<CliOptions> = {};

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

  return options as CliOptions;
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

function runSpriteGeneration(inputDir: string, outputFile: string): void {
  try {
    generateSprite({
      inputDir,
      outputFile,
      verbose: true,
      minify: true,
    });
  } catch (error) {
    console.error("Error generating sprite:", error);
    process.exit(1);
  }
}

function main() {
  const options = parseArgs();

  // Initial generation
  runSpriteGeneration(options.input, options.output);

  // Watch mode
  if (options.watch) {
    const absoluteInputDir = path.resolve(process.cwd(), options.input);
    console.log(`\n👀 Watching ${options.input} for changes...`);

    fs.watch(absoluteInputDir, { recursive: true }, (_eventType, filename) => {
      if (filename?.endsWith(".svg")) {
        console.log(`\n📝 Change detected: ${filename}`);
        runSpriteGeneration(options.input, options.output);
      }
    });
  }
}

main();
