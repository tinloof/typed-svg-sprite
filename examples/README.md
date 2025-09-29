# SVG Sprite Webpack Loader Examples

This directory contains examples demonstrating how to use the SVG Sprite Webpack Loader with different bundlers and frameworks.

## Available Examples

### 📦 [Webpack Example](./webpack-example/)

Complete webpack configuration showing all loader features:

- Basic sprite generation from nested SVG directories
- TypeScript type generation for icons
- Hot reload development server
- Performance optimization techniques

### ⚡ [Next.js Example](./next-example/)

Next.js 15 integration with Turbopack compatibility:

- App Router support with React 19
- Automatic sprite generation and TypeScript types
- Optimized React icon components
- Turbopack + Webpack dual support

## Quick Start

1. **Install dependencies** (from project root):

   ```bash
   npm install
   ```

2. **Build the loader**:

   ```bash
   npm run build
   ```

3. **Run an example**:

   ```bash
   # Webpack example
   npm run dev

    # Next.js example
    cd examples/next-example && npm run dev
   ```

## Creating New Examples

To add support for a new framework or bundler:

1. Create a new directory: `examples/[framework-name]/`
2. Add appropriate configuration files
3. Include a README.md with setup instructions
4. Test the integration thoroughly
5. Update this main README

## Framework Support Status

| Framework           | Status      | Example                               |
| ------------------- | ----------- | ------------------------------------- |
| Webpack 5           | ✅ Complete | [webpack-example](./webpack-example/) |
| Next.js + Turbopack | ✅ Complete | [next-example](./next-example/)       |
| Vite                | 📋 Planned  | -                                     |
| Parcel              | 📋 Planned  | -                                     |
| Rollup              | 📋 Planned  | -                                     |

## Contributing

We welcome contributions for new framework integrations! Please:

1. Follow the existing example structure
2. Include comprehensive documentation
3. Add tests for the integration
4. Submit a pull request with your changes
