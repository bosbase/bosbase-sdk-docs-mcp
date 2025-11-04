# Fixing Git Push Issues

If you're getting errors like "src refspec main does not match any" or "nothing to commit", follow these steps:

## Issue 1: Branch Name Mismatch (master vs main)

You're on `master` branch but trying to push to `main`. Here are two solutions:

### Solution A: Rename branch to main (Recommended)

```bash
cd mcp
git branch -M main
git push -u origin main
```

### Solution B: Push master branch

```bash
cd mcp
git push -u origin master
```

Then update your GitHub repository default branch to `master` if needed.

## Issue 2: Nothing to Commit

If you see "nothing to commit, working tree clean", check:

### Check if files are tracked

```bash
git status
git ls-files
```

### If no files are tracked, add them:

```bash
# Make sure you're in the mcp directory
cd mcp

# Check what files exist
ls -la

# Add all files
git add .

# Check status again
git status

# If files show up now, commit them
git commit -m "Initial commit: MCP service for BosBase SDK documentation"

# Then push
git push -u origin master  # or main if you renamed it
```

## Issue 3: Repository Not Initialized in mcp Directory

If git isn't initialized in the mcp directory:

```bash
cd mcp
git init
git add .
git commit -m "Initial commit: MCP service for BosBase SDK documentation"
git branch -M main
git remote add origin git@github.com:bosbase/bosbase-sdk-docs-mcp.git
git push -u origin main
```

## Complete Fix for Your Situation

Based on your output, try this sequence:

```bash
cd ~/Documents/rbosbase/mcp

# 1. Remove existing remote (if needed)
git remote remove origin

# 2. Add remote again
git remote add origin git@github.com:bosbase/bosbase-sdk-docs-mcp.git

# 3. Check current branch
git branch

# 4. Rename branch to main (if on master)
git branch -M main

# 5. Check what files are tracked
git ls-files

# 6. If no files, add them
git add .
git status

# 7. Commit if there are changes
git commit -m "Initial commit: MCP service for BosBase SDK documentation"

# 8. Push to main
git push -u origin main
```

## If You Still Have Issues

### Check if .gitignore is excluding files

```bash
cat .gitignore
```

### Force add if .gitignore is too restrictive

```bash
git add -f .
```

### Check remote URL

```bash
git remote -v
```

### Set upstream branch explicitly

```bash
git push --set-upstream origin main
```
