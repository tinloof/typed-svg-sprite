# SVG Sprite Webpack Loader

A webpack loader that automatically creates SVG sprites from all SVG files in your project directory. This loader scans your project for SVG files, combines them into a single sprite, and makes it available as an importable module.

## Features

- 🎯 **Automatic Discovery**: Finds all SVG files in your project automatically
- 📦 **Single Sprite**: Combines all SVGs into one optimized sprite
- 🔧 **Configurable**: Customizable search patterns, prefixes, and output options
- ⚡ **Webpack Integration**: Seamlessly integrates with your webpack build process
- 🔄 **Hot Reload**: Automatically updates when SVG files change
- 📁 **Nested Support**: Handles SVGs in subdirectories
- 📝 **TypeScript Support**: Full TypeScript definitions included

## Installation

### From GitHub (Recommended)

```bash
npm install github:your-username/svg-sprite-webpack-loader --save-dev
```

### Local Development

```bash
git clone https://github.com/your-username/svg-sprite-webpack-loader.git
cd svg-sprite-webpack-loader
npm install
npm run build
```

**⚡ TypeScript First**: The package is written in TypeScript and automatically compiles during installation from GitHub using the `prepare` script. The compiled JavaScript files are generated on-the-fly, so only TypeScript source code is stored in the repository.

## Usage

### 1. Configure Webpack

Add the loader to your webpack configuration:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg-sprite$/,
        use: [
          {
            loader: "svg-sprite-webpack-loader",
            options: {
              srcDir: "src", // Directory to search for SVGs
              pattern: "**/*.svg", // File pattern to match
              symbolPrefix: "icon-", // Prefix for symbol IDs
              className: "svg-sprite", // CSS class for the sprite container
            },
          },
        ],
      },
    ],
  },
};
```

**TypeScript Configuration:**

```typescript
// webpack.config.ts
import type { Configuration } from "webpack";
import type { SvgSpriteLoaderOptions } from "svg-sprite-webpack-loader";

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.svg-sprite$/,
        use: [
          {
            loader: "svg-sprite-webpack-loader",
            options: {
              srcDir: "src/icons",
              symbolPrefix: "icon-",
              className: "svg-sprite",
              // Generate TypeScript types for icon IDs
              generateTypes: true,
              typesOutputPath: "icon-types.ts",
              typesFormat: "both", // 'enum' | 'union' | 'both'
            } satisfies SvgSpriteLoaderOptions,
          },
        ],
      },
    ],
  },
};

export default config;
```

### 2. Create a Trigger File

Create a file with the `.svg-sprite` extension to trigger the loader:

```javascript
// sprites.svg-sprite
export default "svg-sprite";
```

### 3. Import and Use the Sprite

```javascript
// In your JavaScript/TypeScript file
import svgSprite from "./sprites.svg-sprite";

// Inject the sprite into your HTML
document.body.innerHTML += svgSprite;

// Use icons in your HTML
// <svg class="icon"><use xlink:href="#icon-home"></use></svg>
```

### 4. Using Icons in HTML

Once the sprite is injected, you can use any SVG icon:

```html
<!-- For a file: src/icons/home.svg -->
<svg class="icon">
  <use xlink:href="#icon-home"></use>
</svg>

<!-- For a nested file: src/icons/navigation/menu.svg -->
<svg class="icon">
  <use xlink:href="#icon-navigation-menu"></use>
</svg>
```

## Configuration Options

| Option            | Type    | Default           | Description                                                     |
| ----------------- | ------- | ----------------- | --------------------------------------------------------------- |
| `srcDir`          | string  | `'src'`           | Directory to search for SVG files (relative to webpack context) |
| `pattern`         | string  | `'**/*.svg'`      | Glob pattern to match SVG files                                 |
| `recursive`       | boolean | `true`            | Whether to include subdirectories                               |
| `symbolPrefix`    | string  | `'icon-'`         | Prefix for symbol IDs                                           |
| `inline`          | boolean | `true`            | Whether to inline the sprite or emit as separate file           |
| `className`       | string  | `'svg-sprite'`    | CSS class for the sprite container                              |
| `generateTypes`   | boolean | `false`           | Generate TypeScript definitions for icon IDs                    |
| `typesOutputPath` | string  | `'icon-types.ts'` | Output path for generated TypeScript file                       |
| `typesFormat`     | string  | `'both'`          | Format for generated types: `'enum'`, `'union'`, or `'both'`    |

### Example Configuration

```javascript
{
  loader: 'svg-sprite-webpack-loader',
  options: {
    srcDir: 'assets/icons',
    pattern: '**/*.svg',
    symbolPrefix: 'my-icon-',
    className: 'my-svg-sprite'
  }
}
```

## File Structure Example

```
project/
├── src/
│   ├── icons/
│   │   ├── home.svg
│   │   ├── user.svg
│   │   ├── settings.svg
│   │   └── navigation/
│   │       └── menu.svg
│   └── components/
├── sprites.svg-sprite
└── webpack.config.js
```

This structure will generate a sprite with the following symbol IDs:

- `icon-home`
- `icon-user`
- `icon-settings`
- `icon-navigation-menu`

## Generated Sprite Format

The loader generates an SVG sprite in the following format:

```xml
<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
  <symbol id="icon-home" viewBox="0 0 24 24">
    <!-- SVG content -->
  </symbol>
  <symbol id="icon-user" viewBox="0 0 24 24">
    <!-- SVG content -->
  </symbol>
  <!-- More symbols... -->
</svg>
```

## CSS Styling

Add CSS to style your icons:

```css
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 2;
  stroke: currentColor;
  fill: none;
}

.svg-sprite {
  display: none;
}
```

## TypeScript Usage

Import the loader with full type safety:

```typescript
// sprites.svg-sprite
import type { SvgSpriteLoaderOptions } from "svg-sprite-webpack-loader";

// The loader will process this file and return the sprite
export default "svg-sprite";
```

```typescript
// In your TypeScript component
import svgSprite from "./sprites.svg-sprite";
// Import generated types (when generateTypes: true)
import {
  IconId,
  IconIdType,
  IconProps,
  isValidIconId,
  ALL_ICON_IDS,
} from "./icon-types";

// Inject sprite with type safety
function injectSvgSprite(): void {
  const spriteContainer = document.createElement("div");
  spriteContainer.innerHTML = svgSprite;
  document.body.appendChild(spriteContainer);
}

// Using the generated enum
function createIconWithEnum(id: IconId, className = "icon"): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${id}`);

  svg.appendChild(use);
  return svg;
}

// Using the generated union type
function createIconWithUnion(
  id: IconIdType,
  className = "icon"
): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${id}`);

  svg.appendChild(use);
  return svg;
}

// Using the generated IconProps interface
function createIcon({
  id,
  className = "icon",
  size = 24,
}: IconProps): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", size.toString());
  svg.setAttribute("height", size.toString());

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${id}`);

  svg.appendChild(use);
  return svg;
}

// Examples of usage with type safety
const homeIcon = createIcon({ id: IconId.Home }); // ✅ Type-safe!
const userIcon = createIcon({ id: "icon-user" }); // ✅ Type-safe!
// const invalidIcon = createIcon({ id: "invalid-icon" }); // ❌ TypeScript error!

// Runtime validation
function safeCreateIcon(id: string): SVGSVGElement | null {
  if (isValidIconId(id)) {
    return createIcon({ id });
  }
  console.error(`Invalid icon ID: ${id}`);
  return null;
}

// Get all available icons
console.log("Available icons:", ALL_ICON_IDS);
```

### Generated Types Example

When `generateTypes: true`, the loader will create a TypeScript file (e.g., `icon-types.ts`) with:

```typescript
// Auto-generated by svg-sprite-webpack-loader
// Do not edit this file manually

/**
 * Enum containing all available icon IDs
 */
export enum IconId {
  Home = "icon-home",
  User = "icon-user",
  Settings = "icon-settings",
  NavigationMenu = "icon-navigation-menu",
}

/**
 * Union type of all available icon IDs
 */
export type IconIdType =
  | "icon-home"
  | "icon-user"
  | "icon-settings"
  | "icon-navigation-menu";

/**
 * Props for icon components
 */
export interface IconProps {
  id: IconId | IconIdType;
  className?: string;
  size?: number | string;
}

/**
 * Array of all available icon IDs
 */
export const ALL_ICON_IDS = [
  "icon-home",
  "icon-user",
  "icon-settings",
  "icon-navigation-menu",
] as const;

/**
 * Type guard to check if a string is a valid icon ID
 */
export function isValidIconId(id: string): id is IconId | IconIdType {
  return ALL_ICON_IDS.includes(id as any);
}
```

## How It Works

1. **Discovery**: The loader uses glob patterns to find all SVG files in the specified directory
2. **Parsing**: Each SVG file is parsed using Cheerio to extract the content and attributes
3. **Symbol Generation**: SVG content is wrapped in `<symbol>` elements with unique IDs
4. **Sprite Creation**: All symbols are combined into a single SVG sprite
5. **Type Generation** (optional): Generates TypeScript definitions for icon IDs with enums, union types, and helper functions
6. **Module Export**: The sprite is returned as a JavaScript module that can be imported

## Browser Support

This loader generates standard SVG sprites that work in all modern browsers. For older browsers, you may need polyfills for:

- SVG `<use>` element (IE 9+)
- SVG external references

## Performance Benefits

- **Reduced HTTP Requests**: All SVG icons are loaded in a single request
- **Caching**: The sprite is cached by the browser
- **Compression**: SVG sprites compress well with gzip
- **Scalability**: Vector graphics scale perfectly at any size

## Troubleshooting

### Icons not displaying

1. Ensure the sprite is injected into the DOM before using icons
2. Check that the symbol ID matches the file path structure
3. Verify that SVG files are valid and contain proper viewBox attributes

### Build errors

1. Check that all required dependencies are installed
2. Verify the webpack configuration is correct
3. Ensure SVG files are accessible from the specified source directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Related Projects

- [svg-sprite](https://github.com/svg-sprite/svg-sprite) - Comprehensive SVG sprite generator
- [webpack-svgstore-plugin](https://github.com/mrsum/webpack-svgstore-plugin) - Alternative webpack plugin approach
