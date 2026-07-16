# @tinloof/typed-svg-sprite

> Generate optimized SVG sprites with full TypeScript support

Automatically generates SVG sprite files with type-safe TypeScript definitions and a ready-to-use React component. Works with Vite, Next.js, Astro, or standalone via CLI.

## Installation

```bash
npm install @tinloof/typed-svg-sprite
```

## Quick Start

### CLI

```bash
# Generate sprite
typed-svg-sprite --input public/icons --output public/sprite.svg

# Watch mode
typed-svg-sprite -i public/icons -o public/sprite.svg --watch
```

### Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { svgSprite } from "@tinloof/typed-svg-sprite/vite";

export default defineConfig({
  plugins: [svgSprite()],
});
```

Place SVGs in `public/icons/` and use the generated type-safe hrefs:

```typescript
import { HOME, SETTINGS } from "./generated/icons";

document.querySelector("#app").innerHTML = `
  <svg><use href="${HOME}"></use></svg>
  <svg><use href="${SETTINGS}"></use></svg>
`;
```

Vite's resolved `root`, `publicDir`, and `base` settings are respected. During development, adding, changing, or removing an SVG regenerates the sprite and reloads the page.

### Next.js

```typescript
// next.config.ts
import { withSpriteLoader } from "@tinloof/typed-svg-sprite/next";

export default withSpriteLoader({});
```

Place SVGs in `public/icons/` and use:

```typescript
import { HOME, SETTINGS } from "@/generated/icons";
import { Icon } from "@/generated/Icon";

function MyComponent() {
  return (
    <>
      <Icon href={HOME} />
      <Icon href={SETTINGS} size={32} />
    </>
  );
}
```

### Astro

```typescript
// astro.config.mjs
import { defineConfig } from "astro/config";
import { svgSprite } from "@tinloof/typed-svg-sprite/astro";

export default defineConfig({
  integrations: [svgSprite()],
});
```

Place SVGs in `public/icons/` and use:

```typescript
import { HOME, SETTINGS } from "../generated/icons";
import { Icon } from "../generated/Icon";

<Icon href={HOME} />
<Icon href={SETTINGS} size={32} />
```

## Usage

### CLI Options

```bash
typed-svg-sprite --input <dir> --output <file> [options]

Options:
  -i, --input <dir>    Directory containing SVG files
  -o, --output <file>  Output sprite file path
  -w, --watch          Watch for changes and regenerate
  -h, --help           Show help message
```

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [
    svgSprite({
      url?: string; // default: Vite's resolved base
      filename?: string; // default: "sprite.svg"
      inputDir?: string; // default: "<publicDir>/icons"
      outputFile?: string; // default: "<publicDir>/sprite.svg"
      typesOutputFile?: string; // default: "src/generated/icons.ts"
      generateIconComponent?: boolean; // default: false
      iconComponentOutputFile?: string; // default: "src/generated/Icon"
    }),
  ],
});
```

Relative filesystem paths are resolved from Vite's project root. Set `generateIconComponent: true` in React projects to also generate the typed `Icon.tsx` wrapper.

### Next.js Configuration

```typescript
export default withSpriteLoader(
  {
    // your existing Next.js config
  },
  {
    inputDir?: string; // default: "public/icons"
    outputFile?: string; // default: "public/sprite.svg"
    url?: string; // default: "/"
    filename?: string; // default: "sprite.svg"
    typesOutputFile?: string; // default: "generated/icons.ts"
    generateIconComponent?: boolean; // default: true
    iconComponentOutputFile?: string; // default: "generated/Icon.tsx"
  }
);
```

### Astro Configuration

```typescript
export default defineConfig({
  integrations: [
    svgSprite({
      inputDir?: string; // default: "public/icons"
      outputFile?: string; // default: "public/sprite.svg"
      url?: string; // default: "/"
      filename?: string; // default: "sprite.svg"
      typesOutputFile?: string; // default: "src/generated/icons.ts"
      generateIconComponent?: boolean; // default: true
      iconComponentOutputFile?: string; // default: "src/generated/Icon.tsx"
    }),
  ],
});
```

## Generated Files

### 1. Sprite (`public/sprite.svg`)

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="a" viewBox="0 0 24 24"><!-- icon content --></symbol>
  <symbol id="b" viewBox="0 0 24 24"><!-- icon content --></symbol>
</svg>
```

### 2. TypeScript Types (`generated/icons.ts`)

```typescript
export enum IconId {
  HOME = "a",
  SETTINGS = "b",
}

export type IconHref = `/sprite.svg#${IconId}`;

export const HOME: IconHref = "/sprite.svg#a";
export const SETTINGS: IconHref = "/sprite.svg#b";

export function getIconHref(iconId: IconId): IconHref;
export const allIcons: IconId[];
```

### 3. React Component (`generated/Icon.tsx`)

```typescript
import { IconHref } from "./icons";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  href: IconHref;
  size?: number | string;
}

export function Icon({ href, size = 24, ...props }: IconProps) {
  // ...
}
```

## Examples

### Basic Usage

```typescript
import { HOME, SEARCH, SETTINGS } from "@/generated/icons";
import { Icon } from "@/generated/Icon";

<Icon href={HOME} />
<Icon href={SEARCH} size={20} />
<Icon href={SETTINGS} className="text-blue-500" />
```

### Dynamic Icons

```typescript
import { IconId, getIconHref } from "@/generated/icons";

function DynamicIcon({ iconId }: { iconId: IconId }) {
  return <Icon href={getIconHref(iconId)} />;
}
```

### Build Script Integration

```json
{
  "scripts": {
    "generate:icons": "typed-svg-sprite --input public/icons --output public/sprite.svg",
    "build": "npm run generate:icons && next build"
  }
}
```

### Without React

```bash
# Generate sprite and types
typed-svg-sprite --input src/icons --output public/sprite.svg

# Use generated types
import { HOME, SETTINGS } from "./generated/icons";

// In your HTML/JS
<svg><use href={HOME} /></svg>
```

## How It Works

1. Scans directory for `.svg` files
2. Extracts and optimizes SVG content
3. Generates compact base-52 IDs (`a`, `b`, `aa`, etc.)
4. Combines into single sprite file
5. Generates TypeScript types with file-based names
6. Generates React component (optional)

**Symbol IDs**: Short IDs (`a`, `b`) in sprite, original names (`HOME`, `SETTINGS`) in TypeScript exports.

## Roadmap

- [ ] Integrate SVGO for advanced SVG optimization

## License

MIT
