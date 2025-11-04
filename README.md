# BosBase SDK Documentation MCP Service

This MCP (Model Context Protocol) service provides access to BosBase JavaScript and Dart SDK documentation, allowing AI assistants to learn about and reference SDK capabilities.

**Note:** This is a self-contained MCP service. All documentation files are included in the `mcp/docs/` directory.

## Quick Publishing

To publish this service:

1. Update `package.json` with your info and repository URL
2. Copy docs: `cp ../js-sdk/docs/*.md docs/js-sdk/ && cp ../dart-sdk/docs/*.md docs/dart-sdk/ && cp ../SDK_DOCUMENTATION.md docs/`
3. Build: `npm install && npm run build`
4. Publish: `npm login && npm publish --access public`
5. Create GitHub release: `git tag -a v1.0.0 -m "Release v1.0.0" && git push origin v1.0.0`

See [QUICK_START.md](./QUICK_START.md) or [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

## Features

- **Resources**: Exposes all SDK documentation files as MCP resources
- **Search Tool**: Search across both JS and Dart SDK documentation
- **Get Doc Tool**: Retrieve specific documentation by topic and SDK
- **List Docs Tool**: List all available documentation resources

## Installation

### From npm

```bash
npm install -g @bosbase/sdk-docs-mcp
```

Then configure your MCP client to point to the installed package:

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

Or if installed globally, you can use `npm root -g` to find the global node_modules path:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["$(npm root -g)/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

### From Source

## Setup

### 1. Copy Documentation Files

Before using the service, copy the SDK documentation files into the `mcp/docs/` directory. See [COPY_DOCS.md](./COPY_DOCS.md) for detailed instructions.

Quick copy (from project root):
```bash
cp js-sdk/docs/*.md mcp/docs/js-sdk/
cp dart-sdk/docs/*.md mcp/docs/dart-sdk/
cp SDK_DOCUMENTATION.md mcp/docs/
```

### 2. Install Dependencies

```bash
cd mcp
npm install
```

### 3. Build

```bash
npm run build
```

## Usage

### As an MCP Server

Configure this as an MCP server in your AI assistant. Example configuration:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/path/to/mcp/dist/index.js"]
    }
  }
}
```

Or using npm script:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "npm",
      "args": ["--prefix", "/path/to/mcp", "start"]
    }
  }
}
```

### Available Resources

All documentation files are exposed as resources with URIs like:
- `sdk-doc://js-collections` - JavaScript SDK Collections documentation
- `sdk-doc://dart-collections` - Dart SDK Collections documentation
- `sdk-doc://sdk-overview` - Main SDK documentation overview

### Available Tools

#### `search_sdk_docs`

Search SDK documentation for specific topics, APIs, or code examples.

**Parameters:**
- `query` (required): Search query string
- `sdk` (optional): Filter by SDK type (`js`, `dart`, or `both` - default: `both`)
- `topic` (optional): Filter by topic (collections, authentication, files, etc.)

**Example:**
```json
{
  "query": "authentication password",
  "sdk": "js",
  "topic": "authentication"
}
```

#### `get_sdk_doc`

Retrieve a specific SDK documentation file.

**Parameters:**
- `topic` (required): Documentation topic (collections, authentication, files, etc.)
- `sdk` (optional): SDK type (`js` or `dart`, required unless topic is "overview")

**Example:**
```json
{
  "topic": "collections",
  "sdk": "js"
}
```

#### `list_sdk_docs`

List all available SDK documentation resources.

**Parameters:**
- `sdk` (optional): Filter by SDK type (`js`, `dart`, or `both` - default: `both`)

## Documentation Topics

Available documentation topics for both JS and Dart SDKs:

- `collections` - Collection and record management
  - `api-rules` - API rules and filter syntax
  - `authentication` - Authentication methods (password, OTP, OAuth2, MFA)
  - `files` - File upload and handling
  - `file-api` - File API for downloads and thumbnails
  - `relations` - Relation fields and expand functionality
  - `api-records` - CRUD operations and record management
  - `realtime` - Real-time subscriptions and SSE
  - `collection-api` - Collection management API
  - `logs-api` - Log viewing and filtering
  - `crons-api` - Cron job management
  - `backups-api` - Backup operations
  - `health-api` - Health status checks

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode (with tsx)
npm run dev

# Run built version
npm start
```

## Project Structure

```
mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── docs/                 # SDK documentation files
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT