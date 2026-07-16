# @tinloof/typed-svg-sprite

## 0.2.0

### Minor Changes

- dbdcdfa: Add a first-class Vite plugin that generates the sprite and typed icon hrefs from Vite's resolved project settings and regenerates them when source icons change in development.

## 0.1.1

### Patch Changes

- 3120201: Generate the `Icon` component from `React.ComponentPropsWithRef<"svg">` instead of `React.SVGProps<SVGSVGElement>`. The old base typed `ref` as `LegacyRef` (allowing string refs), which React 19's intrinsic elements reject — causing a type error in the generated `Icon.tsx`. The new base uses the React-19-correct `Ref` typing.

## 0.1.0

### Minor Changes

- b2234dd: Added astro integration

## 0.0.1

### Patch Changes

- Initial release of @tinloof/typed-svg-sprite
- Generate optimized SVG sprites with full TypeScript support
- CLI tool for generating sprites from SVG files
- Next.js integration with `withSpriteLoader`
- Auto-generated TypeScript definitions
- Auto-generated React Icon component
- Watch mode for development
