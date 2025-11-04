# Copying Documentation Files

This MCP service is designed to be self-contained. All documentation files should be copied into the `mcp/docs/` directory.

## Quick Copy Script

If you have the documentation files in the expected locations, you can use these commands:

```bash
# From the project root directory

# Copy JavaScript SDK documentation
cp js-sdk/docs/*.md mcp/docs/js-sdk/ 2>/dev/null || echo "JS SDK docs not found - copy manually"

# Copy Dart SDK documentation
cp dart-sdk/docs/*.md mcp/docs/dart-sdk/ 2>/dev/null || echo "Dart SDK docs not found - copy manually"

# Copy main SDK documentation
cp SDK_DOCUMENTATION.md mcp/docs/ 2>/dev/null || echo "Main SDK doc not found - copy manually"
```

## Manual Copy

If the automated copy doesn't work, manually copy the following files:

### JavaScript SDK Files
Copy these files from `js-sdk/docs/` to `mcp/docs/js-sdk/`:
- COLLECTIONS.md
- API_RULES_AND_FILTERS.md
- AUTHENTICATION.md
- FILES.md
- FILE_API.md
- RELATIONS.md
- API_RECORDS.md
- REALTIME.md
- COLLECTION_API.md
- LOGS_API.md
- CRONS_API.md
- BACKUPS_API.md
- HEALTH_API.md

### Dart SDK Files
Copy these files from `dart-sdk/docs/` to `mcp/docs/dart-sdk/`:
- COLLECTIONS.md
- API_RULES_AND_FILTERS.md
- AUTHENTICATION.md
- FILES.md
- FILE_API.md
- RELATIONS.md
- API_RECORDS.md
- REALTIME.md
- COLLECTION_API.md
- LOGS_API.md
- CRONS_API.md
- BACKUPS_API.md
- HEALTH_API.md

### Main Documentation
Copy `SDK_DOCUMENTATION.md` from the project root to `mcp/docs/`

## Verification

After copying, verify the files are in place:

```bash
ls -la mcp/docs/js-sdk/*.md
ls -la mcp/docs/dart-sdk/*.md
ls -la mcp/docs/SDK_DOCUMENTATION.md
```

The MCP service will automatically detect and serve all `.md` files found in these directories.
