# BosBase SDK Documentation MCP Service

This MCP (Model Context Protocol) service provides access to BosBase JavaScript and Dart SDK documentation, allowing AI assistants to learn about and reference SDK capabilities.

**Note:** This is a self-contained MCP service. All documentation files are included in the `mcp/docs/` directory.

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

After installation, find the package path:
```bash
# Get global npm modules path
npm root -g
# Example output: /usr/local/lib/node_modules
```

The service will be at: `/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js`

### From Source

See [Setup](#setup-from-source) section below.

## Configuration

### Cursor

Cursor natively supports MCP servers through its settings.

**Steps:**
1. Open Cursor Settings (`Cmd+,` on macOS, `Ctrl+,` on Windows/Linux)
2. Navigate to **Features** → **Model Context Protocol**
3. Click **Add Server** or edit the settings JSON directly

**Configuration (JSON):**
```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**Alternative (if installed locally):**
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

**Using npm script:**
```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "npm",
      "args": ["--prefix", "/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp", "start"]
    }
  }
}
```

**Restart Cursor** after configuration. The MCP service will be available when using Cursor's AI features.

### Claude Desktop (Claude Code)

Claude Desktop uses a configuration file for MCP servers.

**Configuration File Locations:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Steps:**
1. Create the configuration file if it doesn't exist
2. Add the MCP server configuration:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**For Linux (example path):**
```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/home/user/.npm-global/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**Restart Claude Desktop** after saving the configuration file.

### VS Code

VS Code requires an MCP extension to use Model Context Protocol servers.

**Installation:**
1. Open VS Code Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
2. Search for "Model Context Protocol" or "MCP"
3. Install the official MCP extension (if available)

**Configuration - Method 1 (Settings UI):**
1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "MCP"
3. Click "Edit in settings.json"
4. Add server configuration:

```json
{
  "mcp.servers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

**Configuration - Method 2 (Workspace Settings):**
Create or edit `.vscode/settings.json` in your workspace:

```json
{
  "mcp.servers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/path/to/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**Configuration - Method 3 (User Settings):**
Edit user settings JSON directly:
- **macOS**: `~/Library/Application Support/Code/User/settings.json`
- **Windows**: `%APPDATA%\Code\User\settings.json`
- **Linux**: `~/.config/Code/User/settings.json`

**Restart VS Code** after configuration.

### Codeium CodeX

Codeium CodeX supports MCP servers for enhanced AI features.

**Steps:**
1. Open Codeium Settings
2. Navigate to **AI Settings** → **MCP Servers** or **Integrations**
3. Click **Add MCP Server**

**Configuration:**
```json
{
  "name": "bosbase-sdk-docs",
  "command": "node",
  "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"],
  "enabled": true
}
```

**Or via Settings JSON:**
```json
{
  "codeium.mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**Restart Codeium** after configuration.

### Trae

Trae supports MCP servers for AI interactions.

**Steps:**
1. Open Trae Settings
2. Navigate to **MCP Configuration** or **AI Integrations**
3. Add new MCP server

**Configuration:**
```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"],
      "description": "BosBase SDK Documentation"
    }
  }
}
```

**Configuration File (if using file-based config):**
Edit the Trae configuration file (location varies by platform) and add:

```json
{
  "servers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js"]
    }
  }
}
```

**Restart Trae** after configuration.

## Authorization

The MCP service runs locally and **does not require authentication or API keys**. All documentation is served from local files.

**Security Notes:**
- ✅ Service runs as a local process (stdio transport)
- ✅ No network exposure or external API calls
- ✅ All documentation files are read-only
- ✅ No authentication tokens or API keys needed
- ✅ Completely offline-capable

**File Permissions:**
Ensure the user running the MCP client has read access to:
- The compiled service: `dist/index.js`
- The documentation directory: `docs/` and all subdirectories
- Node.js executable

**Verification:**
Test the service manually:
```bash
# Test if service can start
node /usr/local/lib/node_modules/@bosbase/sdk-docs-mcp/dist/index.js
```

If the command starts without errors, the service is ready.

## Usage

Once configured, the MCP service will be available in your AI assistant. Here's how to use it:

### In Your AI Assistant

Ask questions like:

- **"How do I authenticate with the BosBase JS SDK?"**
  - The AI will search the SDK documentation and provide code examples

- **"Show me how to create a collection in Dart SDK"**
  - The AI will retrieve the relevant Dart SDK documentation

- **"What are the available API methods for file uploads?"**
  - The AI will search across both JS and Dart SDK docs

- **"Compare authentication methods between JS and Dart SDKs"**
  - The AI can access documentation from both SDKs

### Available Resources

You can directly access documentation resources:
- `sdk-doc://js-collections` - JavaScript SDK Collections
- `sdk-doc://dart-collections` - Dart SDK Collections
- `sdk-doc://js-authentication` - JavaScript SDK Authentication
- `sdk-doc://dart-authentication` - Dart SDK Authentication
- `sdk-doc://sdk-overview` - Main SDK documentation overview

### Available Tools

The service provides three tools that the AI can use:

#### 1. `search_sdk_docs`
Search across all SDK documentation.

**Example AI prompt:**
"Search for vector database examples in the JS SDK"

#### 2. `get_sdk_doc`
Retrieve specific documentation by topic.

**Example AI prompt:**
"Get the Dart SDK collections documentation"

#### 3. `list_sdk_docs`
List all available documentation.

**Example AI prompt:**
"What SDK documentation topics are available?"

### Troubleshooting

**Service not found:**
- Verify the path to `dist/index.js` is correct
- Check Node.js is installed: `node --version`
- Ensure the package is installed: `npm list -g @bosbase/sdk-docs-mcp`

**Service not connecting:**
- Restart your editor/IDE after configuration
- Check file permissions on the service and docs
- Verify the path uses absolute, not relative paths
- Check editor logs for error messages

**No documentation available:**
- Ensure `docs/` directory exists with documentation files
- Check file permissions on `docs/` directory
- Verify documentation files are `.md` files

**Test service manually:**
```bash
# Should start without errors (will wait for stdio input)
node /path/to/@bosbase/sdk-docs-mcp/dist/index.js
```

## Available Resources

All documentation files are exposed as resources with URIs like:
- `sdk-doc://js-collections` - JavaScript SDK Collections documentation
- `sdk-doc://dart-collections` - Dart SDK Collections documentation
- `sdk-doc://sdk-overview` - Main SDK documentation overview

## Available Tools

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

## Setup From Source

If you want to install from source instead of npm:

```bash
# Clone the repository (or use the mcp directory)
cd mcp

# Install dependencies
npm install

# Copy documentation files (if not already present)
# From the project root:
cp ../js-sdk/docs/*.md docs/js-sdk/
cp ../dart-sdk/docs/*.md docs/dart-sdk/
cp ../SDK_DOCUMENTATION.md docs/

# Build TypeScript
npm run build

# Verify build
ls dist/index.js
```

Then configure your editor to use the local build:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/dist/index.js"]
    }
  }
}
```

### Development

```bash
# Run in development mode (with tsx, no build needed)
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