#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
  Resource,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to documentation files relative to this file (all docs are in mcp/docs/)
const JS_DOCS_DIR = path.resolve(__dirname, '../docs/js-sdk');
const DART_DOCS_DIR = path.resolve(__dirname, '../docs/dart-sdk');
const MAIN_DOC = path.resolve(__dirname, '../docs/SDK_DOCUMENTATION.md');

// Documentation file mapping
const DOC_FILES = {
  // JavaScript SDK
  'js-collections': { file: 'COLLECTIONS.md', dir: JS_DOCS_DIR, title: 'Collections - JS SDK' },
  'js-api-rules': { file: 'API_RULES_AND_FILTERS.md', dir: JS_DOCS_DIR, title: 'API Rules and Filters - JS SDK' },
  'js-authentication': { file: 'AUTHENTICATION.md', dir: JS_DOCS_DIR, title: 'Authentication - JS SDK' },
  'js-files': { file: 'FILES.md', dir: JS_DOCS_DIR, title: 'Files - JS SDK' },
  'js-file-api': { file: 'FILE_API.md', dir: JS_DOCS_DIR, title: 'File API - JS SDK' },
  'js-relations': { file: 'RELATIONS.md', dir: JS_DOCS_DIR, title: 'Relations - JS SDK' },
  'js-api-records': { file: 'API_RECORDS.md', dir: JS_DOCS_DIR, title: 'API Records - JS SDK' },
  'js-realtime': { file: 'REALTIME.md', dir: JS_DOCS_DIR, title: 'Realtime - JS SDK' },
  'js-collection-api': { file: 'COLLECTION_API.md', dir: JS_DOCS_DIR, title: 'Collection API - JS SDK' },
  'js-logs-api': { file: 'LOGS_API.md', dir: JS_DOCS_DIR, title: 'Logs API - JS SDK' },
  'js-crons-api': { file: 'CRONS_API.md', dir: JS_DOCS_DIR, title: 'Crons API - JS SDK' },
  'js-backups-api': { file: 'BACKUPS_API.md', dir: JS_DOCS_DIR, title: 'Backups API - JS SDK' },
  'js-health-api': { file: 'HEALTH_API.md', dir: JS_DOCS_DIR, title: 'Health API - JS SDK' },
  
  // Dart SDK
  'dart-collections': { file: 'COLLECTIONS.md', dir: DART_DOCS_DIR, title: 'Collections - Dart SDK' },
  'dart-api-rules': { file: 'API_RULES_AND_FILTERS.md', dir: DART_DOCS_DIR, title: 'API Rules and Filters - Dart SDK' },
  'dart-authentication': { file: 'AUTHENTICATION.md', dir: DART_DOCS_DIR, title: 'Authentication - Dart SDK' },
  'dart-files': { file: 'FILES.md', dir: DART_DOCS_DIR, title: 'Files - Dart SDK' },
  'dart-file-api': { file: 'FILE_API.md', dir: DART_DOCS_DIR, title: 'File API - Dart SDK' },
  'dart-relations': { file: 'RELATIONS.md', dir: DART_DOCS_DIR, title: 'Relations - Dart SDK' },
  'dart-api-records': { file: 'API_RECORDS.md', dir: DART_DOCS_DIR, title: 'API Records - Dart SDK' },
  'dart-realtime': { file: 'REALTIME.md', dir: DART_DOCS_DIR, title: 'Realtime - Dart SDK' },
  'dart-collection-api': { file: 'COLLECTION_API.md', dir: DART_DOCS_DIR, title: 'Collection API - Dart SDK' },
  'dart-logs-api': { file: 'LOGS_API.md', dir: DART_DOCS_DIR, title: 'Logs API - Dart SDK' },
  'dart-crons-api': { file: 'CRONS_API.md', dir: DART_DOCS_DIR, title: 'Crons API - Dart SDK' },
  'dart-backups-api': { file: 'BACKUPS_API.md', dir: DART_DOCS_DIR, title: 'Backups API - Dart SDK' },
  'dart-health-api': { file: 'HEALTH_API.md', dir: DART_DOCS_DIR, title: 'Health API - Dart SDK' },
  
  // Main documentation
  'sdk-overview': { file: 'SDK_DOCUMENTATION.md', dir: path.resolve(__dirname, '../docs'), title: 'SDK Documentation Overview' },
};

class SDKDocsServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'bosbase-sdk-docs',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const resources: Resource[] = [];

      for (const [uri, info] of Object.entries(DOC_FILES)) {
        const filePath = path.join(info.dir, info.file);
        try {
          await fs.access(filePath);
          resources.push({
            uri: `sdk-doc://${uri}`,
            name: info.title,
            description: `${info.title} documentation`,
            mimeType: 'text/markdown',
          });
        } catch {
          // File doesn't exist, skip it
        }
      }

      return { resources };
    });

    // Read a resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      const match = uri.match(/^sdk-doc:\/\/(.+)$/);
      
      if (!match) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Invalid resource URI: ${uri}`
        );
      }

      const docKey = match[1];
      const docInfo = DOC_FILES[docKey as keyof typeof DOC_FILES];

      if (!docInfo) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown documentation resource: ${docKey}`
        );
      }

      const filePath = path.join(docInfo.dir, docInfo.file);

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: content,
            },
          ],
        };
      } catch (error: any) {
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to read documentation file: ${error.message}`
        );
      }
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: 'search_sdk_docs',
          description: 'Search SDK documentation for specific topics, APIs, or code examples. Supports both JavaScript and Dart SDK documentation.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (keywords, API names, concepts, etc.)',
              },
              sdk: {
                type: 'string',
                enum: ['js', 'dart', 'both'],
                default: 'both',
                description: 'Which SDK to search (js, dart, or both)',
              },
              topic: {
                type: 'string',
                enum: ['collections', 'authentication', 'files', 'relations', 'api-records', 'realtime', 'collection-api', 'logs-api', 'crons-api', 'backups-api', 'health-api', 'api-rules'],
                description: 'Optional: Filter by specific documentation topic',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_sdk_doc',
          description: 'Retrieve a specific SDK documentation file by topic and SDK type.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                enum: ['collections', 'authentication', 'files', 'file-api', 'relations', 'api-records', 'realtime', 'collection-api', 'logs-api', 'crons-api', 'backups-api', 'health-api', 'api-rules', 'overview'],
                description: 'The documentation topic to retrieve',
              },
              sdk: {
                type: 'string',
                enum: ['js', 'dart'],
                description: 'The SDK type (js or dart). Ignored if topic is "overview"',
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'list_sdk_docs',
          description: 'List all available SDK documentation resources',
          inputSchema: {
            type: 'object',
            properties: {
              sdk: {
                type: 'string',
                enum: ['js', 'dart', 'both'],
                default: 'both',
                description: 'Filter by SDK type (js, dart, or both)',
              },
            },
          },
        },
      ];

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_sdk_docs':
            return await this.handleSearchDocs(args as any);
          
          case 'get_sdk_doc':
            return await this.handleGetDoc(args as any);
          
          case 'list_sdk_docs':
            return await this.handleListDocs(args as any);
          
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error: any) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error.message}`
        );
      }
    });
  }

  private async handleSearchDocs(args: {
    query: string;
    sdk?: 'js' | 'dart' | 'both';
    topic?: string;
  }) {
    const { query, sdk = 'both', topic } = args;
    const results: Array<{ uri: string; title: string; snippet: string; relevance: number }> = [];

    const sdkFilter = sdk === 'both' ? ['js', 'dart'] : [sdk];
    
    // Build topic filter - get unique topics from DOC_FILES keys
    const allTopics = new Set<string>();
    for (const key of Object.keys(DOC_FILES)) {
      if (key === 'sdk-overview') continue;
      const topicMatch = key.match(/^(js|dart)-(.+)$/);
      if (topicMatch) {
        allTopics.add(topicMatch[2]);
      }
    }
    const topicFilter = topic ? [topic] : Array.from(allTopics);

    for (const sdkType of sdkFilter) {
      for (const docTopic of topicFilter) {
        const docKey = `${sdkType}-${docTopic}` as keyof typeof DOC_FILES;
        const docInfo = DOC_FILES[docKey];
        
        if (!docInfo || docKey === 'sdk-overview') continue;

        const filePath = path.join(docInfo.dir, docInfo.file);
        
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const lowerQuery = query.toLowerCase();
          const lowerContent = content.toLowerCase();

          // Simple relevance scoring
          let relevance = 0;
          const queryWords = lowerQuery.split(/\s+/);
          
          // Count occurrences
          for (const word of queryWords) {
            const matches = (lowerContent.match(new RegExp(word, 'g')) || []).length;
            relevance += matches;
          }

          // Boost for title matches
          if (docInfo.title.toLowerCase().includes(lowerQuery)) {
            relevance += 10;
          }

          // Boost for exact phrase matches
          if (lowerContent.includes(lowerQuery)) {
            relevance += 5;
          }

          if (relevance > 0) {
            // Extract a snippet
            const index = lowerContent.indexOf(lowerQuery);
            const start = Math.max(0, index - 100);
            const end = Math.min(content.length, index + query.length + 200);
            const snippet = content.substring(start, end).trim();

            results.push({
              uri: `sdk-doc://${docKey}`,
              title: docInfo.title,
              snippet: snippet || content.substring(0, 300),
              relevance,
            });
          }
        } catch {
          // File doesn't exist, skip
        }
      }
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            query,
            results: results.slice(0, 10), // Top 10 results
            total: results.length,
          }, null, 2),
        },
      ],
    };
  }

  private async handleGetDoc(args: { topic: string; sdk?: 'js' | 'dart' }) {
    const { topic, sdk } = args;

    if (topic === 'overview') {
      const content = await fs.readFile(MAIN_DOC, 'utf-8');
      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    }

    if (!sdk) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'SDK type is required when topic is not "overview"'
      );
    }

    const docKey = `${sdk}-${topic}` as keyof typeof DOC_FILES;
    const docInfo = DOC_FILES[docKey];

    if (!docInfo) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Unknown documentation: ${sdk} SDK - ${topic}`
      );
    }

    const filePath = path.join(docInfo.dir, docInfo.file);
    const content = await fs.readFile(filePath, 'utf-8');

    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  private async handleListDocs(args: { sdk?: 'js' | 'dart' | 'both' }) {
    const { sdk = 'both' } = args;
    const sdkFilter = sdk === 'both' ? ['js', 'dart'] : [sdk];
    
    const docs: Array<{ uri: string; title: string; sdk: string; topic: string }> = [];

    for (const [key, info] of Object.entries(DOC_FILES)) {
      if (key === 'sdk-overview') {
        docs.push({
          uri: `sdk-doc://${key}`,
          title: info.title,
          sdk: 'overview',
          topic: 'overview',
        });
        continue;
      }

      const sdkType = key.startsWith('js-') ? 'js' : key.startsWith('dart-') ? 'dart' : null;
      if (!sdkType || !sdkFilter.includes(sdkType)) continue;

      const topic = key.replace(/^(js|dart)-/, '');
      docs.push({
        uri: `sdk-doc://${key}`,
        title: info.title,
        sdk: sdkType,
        topic,
      });
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ docs }, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('BosBase SDK Documentation MCP server running on stdio');
  }
}

// Start the server
const server = new SDKDocsServer();
server.run().catch(console.error);
