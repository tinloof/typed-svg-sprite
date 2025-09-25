# Development Environment

This directory contains the development and testing setup for the SVG Sprite Webpack Loader.

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
dev/
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
  srcDir: "dev/assets/icons",
  pattern: "**/*.svg",
  symbolPrefix: "icon-",
  className: "svg-sprite",
  generateTypes: true,
  typesOutputPath: "dev/src/icon-types.ts",
  typesFormat: "both"
}
```

## Adding Test Icons

1. Add SVG files to `dev/assets/icons/`
2. Update `testIcons` array in `dev/src/index.js`
3. Restart dev server to see changes

## Generated Files

When `generateTypes: true`:

- `dev/src/icon-types.ts` - Generated TypeScript definitions
- `dev/dist/` - Webpack build output

These files are automatically excluded from npm publishing.
