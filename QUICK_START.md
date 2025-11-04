# Quick Start - Publishing Checklist

A quick checklist for publishing your MCP service to npm and GitHub.

## Pre-Publishing Checklist

- [ ] Update `package.json` with your information:
  - [ ] Author name and email
  - [ ] Repository URL
  - [ ] Verify version number (start with 1.0.0)
  
- [ ] Ensure all documentation files are in `mcp/docs/`
  - [ ] `docs/js-sdk/*.md` files
  - [ ] `docs/dart-sdk/*.md` files  
  - [ ] `docs/SDK_DOCUMENTATION.md`

- [ ] Build the project:
  ```bash
  npm install
  npm run build
  ```

- [ ] Test locally:
  ```bash
  npm pack
  # Verify the .tgz contains dist/, docs/, README.md, LICENSE
  ```

## Publishing Steps

### 1. Initialize Git (if needed)
```bash
cd mcp
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Name: `bosbase-sdk-docs-mcp`
3. Create repository
4. Connect local repo:
   ```bash
   git remote add origin https://github.com/yourusername/bosbase-sdk-docs-mcp.git
   git push -u origin main
   ```

### 3. Login to npm
```bash
npm login
```

### 4. Publish to npm
```bash
npm publish --access public
```

### 5. Create GitHub Release
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Then create release on GitHub UI.

### 6. Set Up Automation (Optional)
1. Add `NPM_TOKEN` secret to GitHub repo
2. GitHub Actions will auto-publish on future releases

## Verify

- [ ] Check npm: https://www.npmjs.com/package/@bosbase/sdk-docs-mcp
- [ ] Check GitHub: https://github.com/yourusername/bosbase-sdk-docs-mcp
- [ ] Test installation: `npm install -g @bosbase/sdk-docs-mcp`

## Next Release

1. Update version:
   ```bash
   npm version patch  # or minor, major
   ```
2. Commit and push:
   ```bash
   git push && git push --tags
   ```
3. Create GitHub release → Auto-publishes to npm (if automation is set up)

For detailed instructions, see [PUBLISHING.md](./PUBLISHING.md).
