import * as fs from "fs";
import * as path from "path";
import { generateSprite } from "./core.js";
import { generateTypesFile } from "./types.js";
import {
  generateReactIconComponent,
  generateAstroIconComponent,
} from "./components.js";

export type GenerateIconOption =
  | boolean
  | { astro?: boolean; react?: boolean };

// Track if we've already started watching
let watcherInitialized = false;

function getTypesImportPath(
  componentOutputFile: string,
  typesOutputFile: string
): string {
  const componentDir = path.dirname(
    path.resolve(process.cwd(), componentOutputFile)
  );
  const typesFile = path.resolve(process.cwd(), typesOutputFile);
  const typesDir = path.dirname(typesFile);
  const typesFilename = path.basename(typesFile, path.extname(typesFile));

  const relativePath = path
    .relative(componentDir, typesDir)
    .replace(/\\/g, "/");

  if (relativePath === "") {
    return `./${typesFilename}`;
  } else if (relativePath.startsWith("..")) {
    return `${relativePath}/${typesFilename}`.replace(/\/+/g, "/");
  } else {
    const normalizedPath = relativePath.startsWith("./")
      ? relativePath
      : `./${relativePath}`;
    return `${normalizedPath}/${typesFilename}`.replace(/\/+/g, "/");
  }
}

export function generateSpriteAndTypes(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: GenerateIconOption,
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

    // Determine which components to generate
    const shouldGenerateAstro =
      generateIcon === true ||
      (typeof generateIcon === "object" && generateIcon.astro === true);
    const shouldGenerateReact =
      generateIcon === true ||
      (typeof generateIcon === "object" && generateIcon.react === true);

    if (iconComponentOutputFile && (shouldGenerateAstro || shouldGenerateReact)) {
      const baseOutputFile = iconComponentOutputFile.replace(/\.(tsx|astro)$/, "");

      if (shouldGenerateAstro) {
        const astroOutputFile = `${baseOutputFile}.astro`;
        const importPath = getTypesImportPath(astroOutputFile, typesOutputFile);
        generateAstroIconComponent({
          outputFile: astroOutputFile,
          typesFileRelativePath: importPath,
          verbose: false,
        });
      }

      if (shouldGenerateReact) {
        const reactOutputFile = `${baseOutputFile}.tsx`;
        const importPath = getTypesImportPath(reactOutputFile, typesOutputFile);
        generateReactIconComponent({
          outputFile: reactOutputFile,
          typesFileRelativePath: importPath,
          verbose: false,
        });
      }
    }
  }
}

export function startWatcher(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: GenerateIconOption,
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
