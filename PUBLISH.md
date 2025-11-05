# Publishing Guide with Changesets

This package uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

## Pre-Publish Checklist

- [x] Package name is correct (`@tinloof/typed-svg-sprite`)
- [x] Description matches README
- [x] `dist/` folder is built and contains all files
- [x] `.npmignore` excludes examples and source files
- [x] `files` field in `package.json` includes only `dist/` and `README.md`
- [x] Update repository URL in `package.json` (if you have a GitHub repo)
- [x] Add author information (optional)
- [x] Changesets configured with `"access": "public"`

## Quick Start

```powershell
# 1. Create a changeset (describes your changes)
npm run changeset

# 2. Commit the changeset file
git add .
git commit -m "Add changeset for new feature"

# 3. Version (updates package.json and CHANGELOG)
npm run version

# 4. Commit the version changes
git add .
git commit -m "Version packages"

# 5. Publish to npm
npm run release
```

## Detailed Workflow

### 1. Making Changes

After making code changes, create a changeset to document them:

```powershell
npm run changeset
```

This will prompt you to:

1. Select the type of change:

   - **patch** (1.0.0 → 1.0.1) - Bug fixes, small updates
   - **minor** (1.0.0 → 1.1.0) - New features, backwards compatible
   - **major** (1.0.0 → 2.0.0) - Breaking changes

2. Write a summary of the changes (this becomes the changelog entry)

This creates a Markdown file in `.changeset/` directory. Commit this file with your changes:

```powershell
git add .
git commit -m "feat: add new feature with changeset"
```

### 2. Versioning

When you're ready to release, run the version command:

```powershell
npm run version
```

This will:

- Update `package.json` version based on changesets
- Generate/update `CHANGELOG.md`
- Delete the consumed changeset files

Commit the version changes:

```powershell
git add .
git commit -m "chore: version packages"
git push
```

### 3. Publishing

**First time setup:**

```powershell
# Login to npm
npm login

# Verify you're logged in
npm whoami
```

**Publish the package:**

```powershell
npm run release
```

This will:

1. Build the TypeScript files
2. Publish to npm with public access (configured in `.changeset/config.json`)
3. Create git tags for the release

After publishing, push the tags:

```powershell
git push --follow-tags
```

## Test Locally

Before publishing, test the package locally:

```powershell
# Create a tarball
npm pack

# This creates tinloof-typed-svg-sprite-X.X.X.tgz
# Install it in another project to test:
# npm install ./tinloof-typed-svg-sprite-X.X.X.tgz
```

Or use `npm link` for development:

```powershell
# In this package directory
npm link

# In your test project
npm link @tinloof/typed-svg-sprite
```

## Verify Publication

Check the package on npm:

```
https://www.npmjs.com/package/@tinloof/typed-svg-sprite
```

## Notes

- Changesets automatically handles version bumping and changelog generation
- The `prepare` script automatically runs `npm run build` before publish
- Only files listed in `files` field or not in `.npmignore` will be published
- Examples are excluded via `.npmignore`
- Scoped packages are published with public access (configured in `.changeset/config.json`)
- Changesets are committed to the repository for transparency and team collaboration

## Automated Publishing with GitHub Actions

A GitHub Actions workflow (`.github/workflows/release.yml`) is included for automated publishing.

### Setup

1. **Create an npm access token**:

   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token" → "Classic Token"
   - Select "Automation" type
   - Copy the token

2. **Add the token to GitHub**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### How It Works

The workflow automatically:

1. **Creates a "Version Packages" PR** when changesets are detected on `main` branch

   - This PR updates `package.json` versions
   - Generates/updates `CHANGELOG.md`
   - Removes consumed changeset files

2. **Publishes to npm** when the "Version Packages" PR is merged
   - Builds the package
   - Publishes to npm with public access
   - Creates git tags

### Workflow

```powershell
# 1. Make changes and create a changeset
npm run changeset
git add .
git commit -m "feat: add new feature"
git push

# 2. GitHub Actions creates a "Version Packages" PR automatically

# 3. Review and merge the PR

# 4. GitHub Actions publishes to npm automatically
```
