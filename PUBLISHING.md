# Publishing Guide

This guide covers how to publish the BosBase SDK Documentation MCP service to npm and GitHub.

## Prerequisites

1. **npm account**: Sign up at [npmjs.com](https://www.npmjs.com/signup)
2. **GitHub account**: Sign up at [github.com](https://github.com/signup)
3. **Node.js and npm**: Ensure you have Node.js 18+ installed

## Step 1: Prepare Package for Publishing

### 1.1 Update package.json

Ensure your `package.json` has:
- ✅ Correct package name: `@bosbase/sdk-docs-mcp`
- ✅ Version number (start with `1.0.0` for first release)
- ✅ Repository URL
- ✅ Author information
- ✅ License
- ✅ Keywords
- ✅ Files to include

Example:
```json
{
  "name": "@bosbase/sdk-docs-mcp",
  "version": "1.0.0",
  "description": "MCP service for BosBase JS and Dart SDK documentation",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/bosbase-sdk-docs-mcp.git"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "sdk",
    "documentation",
    "bosbase",
    "javascript",
    "dart",
    "api"
  ],
  "files": [
    "dist",
    "docs",
    "README.md",
    "LICENSE"
  ]
}
```

### 1.2 Create LICENSE File

Create a `LICENSE` file (MIT is common for open source):

```text
MIT License

Copyright (c) 2024 BosBase

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 1.3 Create .npmignore

Create a `.npmignore` file to exclude unnecessary files:

```
src/
tsconfig.json
*.log
.DS_Store
.env
node_modules/
.git/
.gitignore
*.tsbuildinfo
.npm/
mcp-config-example.json
SETUP.md
COPY_DOCS.md
PUBLISHING.md
```

### 1.4 Ensure Documentation Files are Included

Make sure all documentation files are in `docs/` before publishing. Users will need these files.

## Step 2: Initialize Git Repository

### 2.1 Initialize Git (if not already)

```bash
cd mcp
git init
git add .
git commit -m "Initial commit: BosBase SDK Documentation MCP service"
```

### 2.2 Create .gitignore

Ensure `.gitignore` includes:
```
node_modules/
dist/
*.log
.DS_Store
.env
*.tsbuildinfo
.npm/
```

## Step 3: Create GitHub Repository

### 3.1 Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `bosbase-sdk-docs-mcp`
3. Description: "MCP service for BosBase JavaScript and Dart SDK documentation"
4. Choose Public or Private
5. **Don't** initialize with README (you already have one)
6. Click "Create repository"

### 3.2 Connect Local Repository

```bash
cd mcp
git remote add origin https://github.com/yourusername/bosbase-sdk-docs-mcp.git
git branch -M main
git push -u origin main
```

Or using SSH:
```bash
git remote add origin git@github.com:yourusername/bosbase-sdk-docs-mcp.git
```

## Step 4: Build Before Publishing

```bash
cd mcp
npm install
npm run build
```

Verify `dist/` directory exists with compiled files.

## Step 5: Publish to npm

### 5.1 Login to npm

```bash
npm login
```

Enter your npm username, password, and email.

### 5.2 Verify Package Name Availability

```bash
npm view @bosbase/sdk-docs-mcp
```

If you get a 404, the name is available. If it exists, you may need to:
- Use a different scope (e.g., `@yourname/sdk-docs-mcp`)
- Contact the maintainer if you have rights to the scope

### 5.3 Test Locally (Optional)

Test the package locally before publishing:

```bash
# In the mcp directory
npm pack

# This creates a .tgz file you can test
# In another directory:
npm install /path/to/mcp/bosbase-sdk-docs-mcp-1.0.0.tgz
```

### 5.4 Publish to npm

```bash
# For first publish
npm publish --access public

# For scoped packages, you might need:
npm publish --access public --registry https://registry.npmjs.org/
```

**Note:** For scoped packages (`@bosbase/...`), you need `--access public` on first publish.

### 5.5 Verify Publication

```bash
npm view @bosbase/sdk-docs-mcp
```

Visit: https://www.npmjs.com/package/@bosbase/sdk-docs-mcp

## Step 6: Create GitHub Release

### 6.1 Tag the Release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 6.2 Create Release on GitHub

1. Go to your repository: `https://github.com/yourusername/bosbase-sdk-docs-mcp`
2. Click "Releases" → "Create a new release"
3. Choose tag: `v1.0.0`
4. Title: `v1.0.0`
5. Description: Use release notes (see below)
6. Click "Publish release"

### 6.3 Example Release Notes

```markdown
## v1.0.0 - Initial Release

### Features
- MCP service for BosBase JavaScript and Dart SDK documentation
- Search functionality across both SDKs
- Resource-based access to documentation files
- Support for 13 documentation topics per SDK

### Installation
```bash
npm install -g @bosbase/sdk-docs-mcp
```

### Usage
See [README.md](README.md) for configuration instructions.
```

## Step 7: Set Up Automated Publishing (Optional)

### 7.1 GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

### 7.2 Set Up NPM Token Secret

1. Generate npm token: https://www.npmjs.com/settings/yourusername/tokens
2. Create classic token with "Automation" type
3. Go to GitHub repo → Settings → Secrets and variables → Actions
4. Add secret: `NPM_TOKEN` with your npm token value

### 7.3 Update Version and Release

After this setup, publishing is automated:
1. Update version in `package.json`: `1.0.1`
2. Commit and push changes
3. Create GitHub release → GitHub Actions publishes to npm

## Step 8: Version Management

### Semantic Versioning

Follow [semver](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes

### Updating Version

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major

# This automatically:
# - Updates package.json version
# - Creates git commit
# - Creates git tag
```

Then publish:
```bash
git push && git push --tags
npm publish
```

## Step 9: Update Documentation

### 9.1 Add Installation Instructions

Update `README.md` to include npm installation:

```markdown
## Installation

### From npm

```bash
npm install -g @bosbase/sdk-docs-mcp
```

Then configure your MCP client:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/path/to/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

### From Source

[existing instructions...]
```

## Troubleshooting

### npm publish fails with "You must verify your email"

1. Check your email for npm verification
2. Verify at: https://www.npmjs.com/settings/yourusername/emails

### Package name already exists

- Choose a different name
- Use your own scope: `@yourusername/sdk-docs-mcp`
- Contact the maintainer if you have rights

### Permission denied for scoped package

- Ensure you're logged in: `npm whoami`
- Use `--access public` for first publish of scoped packages
- Check you have access to the `@bosbase` scope

### Files not included in package

- Check `.npmignore` isn't excluding needed files
- Verify `files` array in `package.json`
- Test with `npm pack` to see what will be published

## Best Practices

1. **Always build before publishing**: Run `npm run build`
2. **Test locally first**: Use `npm pack` to test
3. **Use semantic versioning**: Follow semver guidelines
4. **Write release notes**: Document changes in GitHub releases
5. **Keep CHANGELOG.md**: Track all changes (optional but recommended)
6. **Tag releases**: Always tag releases in git
7. **Automate**: Use GitHub Actions for CI/CD

## Next Steps

After publishing:
- Share the package: `npm install -g @bosbase/sdk-docs-mcp`
- Update documentation with npm installation steps
- Monitor for issues and feedback
- Plan future releases
