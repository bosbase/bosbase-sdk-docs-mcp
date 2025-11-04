# MCP Service Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd mcp
   npm install
   ```

2. **Build the Service**
   ```bash
   npm run build
   ```

3. **Test the Service** (optional)
   ```bash
   npm start
   ```
   The service runs on stdio, so it expects to be called by an MCP client.

## Configuration

### For Claude Desktop / Other MCP Clients

Add this to your MCP configuration file (usually `~/.config/claude_desktop_config.json` or similar):

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "node",
      "args": ["/full/path/to/bosbase/mcp/dist/index.js"]
    }
  }
}
```

Replace `/full/path/to/bosbase/mcp/dist/index.js` with the actual absolute path to the compiled file.

### Alternative: Using npm script

If you prefer using npm scripts:

```json
{
  "mcpServers": {
    "bosbase-sdk-docs": {
      "command": "npm",
      "args": ["--prefix", "/full/path/to/bosbase/mcp", "start"]
    }
  }
}
```

## Verification

After configuration, your AI assistant should be able to:

1. **List SDK documentation resources**
   - Ask: "What SDK documentation is available?"
   - The service exposes all JS and Dart SDK docs as resources

2. **Search documentation**
   - Ask: "How do I authenticate with the JS SDK?"
   - The service will search through relevant documentation

3. **Get specific documentation**
   - Ask: "Show me the Dart SDK collections documentation"
   - The service retrieves the specific doc file

## Troubleshooting

### Service won't start
- Ensure Node.js 18+ is installed: `node --version`
- Check that dependencies are installed: `npm install`
- Verify the build completed: `npm run build`

### Documentation not found
- Verify the documentation files exist in `mcp/docs/js-sdk/` and `mcp/docs/dart-sdk/` directories
- Check that `mcp/docs/SDK_DOCUMENTATION.md` exists
- All documentation files should be in the `mcp/docs/` directory (this service is self-contained)

### MCP client connection issues
- Verify the path in your MCP config is absolute (not relative)
- Check file permissions: `chmod +x dist/index.js` (if needed)
- Check server logs for errors (usually in stderr)

## Development

For development with hot reload:

```bash
npm run dev
```

This uses `tsx` to run TypeScript directly without building first.
