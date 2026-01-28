import * as fs from "fs";
import * as path from "path";
import { generateSprite } from "./core.js";
import { generateTypesFile } from "./types.js";
import { generateIconComponent } from "./components.js";

// Track if we've already started watching
let watcherInitialized = false;

export function generateSpriteAndTypes(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
): void {
  // Generate sprite and get symbols
  const symbols = generateSprite({
    inputDir,
    outputFile,
    verbose: true,
    minify: true,
    optimize: true,
  });

  // Generate TypeScript types file if specified
  if (typesOutputFile && symbols.length > 0) {
    generateTypesFile({
      symbols,
      spriteUrl,
      spriteFilename,
      outputFile: typesOutputFile,
      verbose: false,
    });

    // Generate Icon component if enabled
    if (generateIcon && iconComponentOutputFile) {
      // Calculate relative path from component to types file
      const componentDir = path.dirname(
        path.resolve(process.cwd(), iconComponentOutputFile)
      );
      const typesFile = path.resolve(process.cwd(), typesOutputFile);
      const typesDir = path.dirname(typesFile);
      const typesFilename = path.basename(typesFile, path.extname(typesFile));

      // Get relative path from component dir to types dir
      const relativePath = path
        .relative(componentDir, typesDir)
        .replace(/\\/g, "/");

      // Construct the import path
      // If same directory, use ./filename
      // If parent/child relationship, ensure proper path format
      let importPath: string;
      if (relativePath === "") {
        importPath = `./${typesFilename}`;
      } else if (relativePath.startsWith("..")) {
        // Parent directory - ensure proper path
        importPath = `${relativePath}/${typesFilename}`.replace(/\/+/g, "/");
      } else {
        // Child directory - ensure it starts with ./
        const normalizedPath = relativePath.startsWith("./")
          ? relativePath
          : `./${relativePath}`;
        importPath = `${normalizedPath}/${typesFilename}`.replace(/\/+/g, "/");
      }

      generateIconComponent({
        outputFile: iconComponentOutputFile,
        typesFileRelativePath: importPath,
        verbose: false,
      });
    }
  }
}

export function startWatcher(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
): void {
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
    if (filename?.endsWith(".svg")) {
      console.log(`[svg-sprite] Change detected: ${filename}`);
      generateSpriteAndTypes(
        inputDir,
        outputFile,
        spriteUrl,
        spriteFilename,
        typesOutputFile,
        generateIcon,
        iconComponentOutputFile
      );
    }
  });
}
