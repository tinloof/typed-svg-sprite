# SVG Sprite Webpack Loader

A webpack loader that automatically creates SVG sprites from all SVG files in your project directory. This loader scans your project for SVG files, combines them into a single sprite file, and enables efficient external sprite referencing for optimal performance.

**🚀 Now defaults to external sprite files** for better performance, following [best practices for SVG sprites in modern web applications](https://benadam.me/thoughts/react-svg-sprites/).

## Features

- 🎯 **Automatic Discovery**: Finds all SVG files in your project automatically
- 📦 **External Sprites**: Emits sprites as separate files for optimal caching and performance (default)
- ⚡ **Performance Optimized**: Smaller bundles, better caching, preloadable sprites
- 🔧 **Configurable**: Customizable search patterns, prefixes, and output options
- ⚡ **Webpack Integration**: Seamlessly integrates with your webpack build process
- 🔄 **Hot Reload**: Automatically updates when SVG files change
- 📁 **Nested Support**: Handles SVGs in subdirectories
- 📝 **TypeScript Support**: Full TypeScript definitions included
- 🎨 **CSS Styleable**: Icons can be styled with CSS (color, size, etc.)

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
              src: "src/icons", // Source folder with SVGs
              symbolPrefix: "icon-", // Optional: prefix for symbol IDs
              generateTypes: true, // Optional: generate TypeScript types
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
              src: "src/icons",
              symbolPrefix: "icon-",
              generateTypes: true,
            } satisfies SvgSpriteLoaderOptions,
          },
        ],
      },
    ],
  },
};

export default config;
```

### 2. Create a Sprite Import

Create a simple file with `.svg-sprite` extension:

```javascript
// sprites.svg-sprite
export default "svg-sprite";
```

This file acts as an entry point that tells the loader to scan for SVG files and generate the sprite.

### 3. Import and Use the Sprite

```javascript
// In your JavaScript/TypeScript file
import spriteUrl from "./sprites.svg-sprite";

// Create icons that reference the external sprite
function Icon({ id, className = "icon", ...props }) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");
  Object.assign(svg, props);

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${spriteUrl}#${id}`);

  svg.appendChild(use);
  return svg;
}

// Usage
const homeIcon = Icon({ id: "icon-home" });
document.body.appendChild(homeIcon);
```

### 4. Using Icons in HTML

With external sprites, icons reference the sprite file directly:

```html
<!-- For a file: src/icons/home.svg -->
<svg class="icon">
  <use href="/sprite.svg#icon-home"></use>
</svg>

<!-- For a nested file: src/icons/navigation/menu.svg -->
<svg class="icon">
  <use href="/sprite.svg#icon-navigation-menu"></use>
</svg>
```

### 5. Performance Optimization (Recommended)

Add a preload hint to your HTML for better performance:

```html
<head>
  <link rel="preload" href="/sprite.svg" as="image" type="image/svg+xml" />
</head>
```

## Configuration Options

| Option          | Type    | Required | Default                 | Description                                           |
| --------------- | ------- | -------- | ----------------------- | ----------------------------------------------------- |
| `src`           | string  | ✅       | -                       | Source folder containing SVG files                    |
| `symbolPrefix`  | string  | ❌       | `'icon-'`               | Prefix for symbol IDs                                 |
| `generateTypes` | boolean | ❌       | `false`                 | Generate TypeScript definitions for icon IDs          |
| `typesOutput`   | string  | ❌       | `'src/sprite-types.ts'` | Where to save the generated types file                |
| `dist`          | string  | ❌       | webpack output          | Custom output folder for sprite file (e.g., `public`) |

### Example Configuration

```javascript
{
  loader: 'svg-sprite-webpack-loader',
  options: {
    src: 'assets/icons',        // Required: where your SVGs are
    dist: 'public',             // Optional: save sprite in public folder
    symbolPrefix: 'my-icon-',   // Optional: custom prefix
    generateTypes: true,        // Optional: generate TypeScript types
    typesOutput: 'src/types/sprite-types.ts', // Optional: where to save types
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

### External Sprites (Default) - Recommended ⚡

- **Smaller JavaScript Bundles**: SVG content is not included in your JS bundle
- **Better Caching**: Sprite file is cached separately and can be shared across pages
- **Preloadable**: Can be preloaded for instant icon rendering
- **Cleaner DOM**: No sprite injection into the DOM tree
- **Reduced Memory Usage**: Lower DOM node count improves performance

### Additional Benefits

- **Single HTTP Request**: All SVG icons loaded in one request
- **Perfect Scalability**: Vector graphics scale at any size
- **CSS Styleable**: Icons can be styled with CSS (color, size, stroke, etc.)
- **Excellent Compression**: SVG sprites compress well with gzip/brotli

This approach follows [Ben Adam's recommendations for optimal SVG sprite performance](https://benadam.me/thoughts/react-svg-sprites/) in modern web applications.

## Migration from Inline Sprites

If you were using the previous version with inline sprites, here's how to migrate:

### Before (Inline Sprites)

```javascript
import svgSprite from "./sprites.svg-sprite";
// Sprite content was a string containing the full SVG
document.body.innerHTML += svgSprite;
```

### After (External Sprites - Current Default)

```javascript
import spriteUrl from "./sprites.svg-sprite";
// spriteUrl is now a string containing the path to the sprite file
// No DOM injection needed - icons reference the external file
function createIcon(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${spriteUrl}#${id}`);
  svg.appendChild(use);
  return svg;
}
```

### Force Inline Mode (Not Recommended)

If you need to use inline sprites for compatibility reasons:

```javascript
{
  loader: 'svg-sprite-webpack-loader',
  options: {
    inline: true // Explicitly enable inline mode
  }
}
```

## Troubleshooting

### Icons not displaying

1. Ensure the sprite file is accessible at the expected URL
2. Check that the symbol ID matches the file path structure
3. Verify that SVG files are valid and contain proper viewBox attributes
4. Add preload hint for better performance: `<link rel="preload" href="/sprite.svg" as="image">`

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
