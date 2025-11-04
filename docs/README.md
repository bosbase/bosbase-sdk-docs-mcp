# Documentation Files

This directory contains all SDK documentation files that the MCP service serves.

## Directory Structure

```
docs/
├── js-sdk/              # JavaScript SDK documentation
│   ├── COLLECTIONS.md
│   ├── API_RULES_AND_FILTERS.md
│   ├── AUTHENTICATION.md
│   ├── FILES.md
│   ├── FILE_API.md
│   ├── RELATIONS.md
│   ├── API_RECORDS.md
│   ├── REALTIME.md
│   ├── COLLECTION_API.md
│   ├── LOGS_API.md
│   ├── CRONS_API.md
│   ├── BACKUPS_API.md
│   └── HEALTH_API.md
├── dart-sdk/            # Dart SDK documentation
│   ├── COLLECTIONS.md
│   ├── API_RULES_AND_FILTERS.md
│   ├── AUTHENTICATION.md
│   ├── FILES.md
│   ├── FILE_API.md
│   ├── RELATIONS.md
│   ├── API_RECORDS.md
│   ├── REALTIME.md
│   ├── COLLECTION_API.md
│   ├── LOGS_API.md
│   ├── CRONS_API.md
│   ├── BACKUPS_API.md
│   └── HEALTH_API.md
└── SDK_DOCUMENTATION.md # Main SDK documentation overview
```

## Adding Documentation Files

To populate this directory with documentation files:

1. Copy all `.md` files from the `js-sdk/docs/` directory to `mcp/docs/js-sdk/`
2. Copy all `.md` files from the `dart-sdk/docs/` directory to `mcp/docs/dart-sdk/`
3. Copy `SDK_DOCUMENTATION.md` from the project root to `mcp/docs/`

The MCP service will automatically detect and serve all documentation files found in these directories.
