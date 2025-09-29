# Webpack Example

This directory contains a webpack example demonstrating the SVG Sprite Webpack Loader functionality.

## Quick Start

```bash
# Install dependencies (from project root)
npm install

# Start development server (automatically builds TypeScript first)
npm run dev

# Build for testing (automatically builds TypeScript first)
npm run dev:build

# Clean development files
npm run dev:clean
```

## Structure

```
webpack-example/
├── assets/
│   └── icons/           # Test SVG files
│       ├── home.svg
│       ├── user.svg
│       ├── settings.svg
│       ├── navigation/
│       │   └── menu.svg
│       └── social/
│           └── github.svg
├── src/
│   ├── index.html       # Test page
│   ├── index.js         # Demo application
│   ├── styles.css       # Demo styles
│   └── sprites.svg-sprite # Loader trigger file
├── webpack.config.js    # Webpack configuration
└── README.md           # This file
```

## Testing Features

The dev environment tests:

- ✅ **Basic sprite generation** from multiple SVG files
- ✅ **Nested directory support** (navigation/, social/)
- ✅ **Symbol ID generation** with proper naming
- ✅ **TypeScript type generation** (when enabled)
- ✅ **Hot reload** during development
- ✅ **Icon rendering** with `<use>` elements

## Debug Utilities

Open browser console and use:

```javascript
// Access debug utilities
window.svgSpriteDebug.symbols(); // List all symbols
window.svgSpriteDebug.createIcon("icon-home"); // Create icon element
window.svgSpriteDebug.testIcon("icon-user"); // Test icon rendering
```

## Configuration Testing

The webpack config tests these loader options:

```javascript
{
  src: "examples/webpack-example/assets/icons",
  dist: "examples/webpack-example/public",
  symbolPrefix: "icon-",
  generateTypes: true,
  typesOutput: "examples/webpack-example/src/sprite-types.ts"
}
```

## Adding Test Icons

1. Add SVG files to `examples/webpack-example/assets/icons/`
2. Update `testIcons` array in `examples/webpack-example/src/index.js`
3. Restart dev server to see changes

## Generated Files

When `generateTypes: true`:

- `examples/webpack-example/src/sprite-types.ts` - Generated TypeScript definitions
- `examples/webpack-example/dist/` - Webpack build output

These files are automatically excluded from npm publishing.
