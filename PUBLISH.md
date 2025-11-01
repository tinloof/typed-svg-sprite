# Publishing Guide

## Pre-Publish Checklist

- [x] Package name is correct (`typed-svg-sprite`)
- [x] Version is set (`1.0.0`)
- [x] Description matches README
- [x] `dist/` folder is built and contains all files
- [x] `.npmignore` excludes examples and source files
- [x] `files` field in `package.json` includes only `dist/` and `README.md`
- [ ] Update repository URL in `package.json` (if you have a GitHub repo)
- [ ] Add author information (optional)

## Build

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist/` folder.

## Test Locally

Before publishing, test the package locally:

```bash
# Create a tarball
npm pack

# This creates typed-svg-sprite-1.0.0.tgz
# You can install it in another project to test:
# npm install ./typed-svg-sprite-1.0.0.tgz
```

## Publish to npm

### First Time Publishing

1. **Login to npm**:

   ```bash
   npm login
   ```

2. **Verify you're logged in**:

   ```bash
   npm whoami
   ```

3. **Check what will be published**:

   ```bash
   npm publish --dry-run
   ```

4. **Publish**:
   ```bash
   npm publish
   ```

### Subsequent Releases

1. **Update version** in `package.json`:

   ```bash
   npm version patch   # 1.0.0 -> 1.0.1 (bug fixes)
   npm version minor    # 1.0.0 -> 1.1.0 (new features)
   npm version major    # 1.0.0 -> 2.0.0 (breaking changes)
   ```

2. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

## Verify Publication

Check the package on npm:

```
https://www.npmjs.com/package/typed-svg-sprite
```

## Notes

- The `prepare` script automatically runs `npm run build` before publish
- Only files listed in `files` field or not in `.npmignore` will be published
- Examples are excluded via `.npmignore`
- The package will be public by default (use `--access restricted` for private)
