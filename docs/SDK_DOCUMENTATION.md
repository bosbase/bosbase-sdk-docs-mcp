# BosBase SDK Documentation

This directory contains comprehensive SDK documentation for working with Collections and Fields in BosBase.

## Available SDKs

- **[JavaScript/TypeScript SDK](./js-sdk/docs/COLLECTIONS.md)** - For browser, Node.js, and React Native applications
- **[Dart SDK](./dart-sdk/docs/COLLECTIONS.md)** - For Flutter, Web, Mobile, Desktop, and CLI applications

## Documentation Index

### Collections and Records
- **[Collections - JS SDK](./js-sdk/docs/COLLECTIONS.md)** - Collection and record management
- **[Collections - Dart SDK](./dart-sdk/docs/COLLECTIONS.md)** - Collection and record management

### API Rules and Filters
- **[API Rules and Filters - JS SDK](./js-sdk/docs/API_RULES_AND_FILTERS.md)** - API rules, filter syntax, special identifiers
- **[API Rules and Filters - Dart SDK](./dart-sdk/docs/API_RULES_AND_FILTERS.md)** - API rules, filter syntax, special identifiers

### Authentication
- **[Authentication - JS SDK](./js-sdk/docs/AUTHENTICATION.md)** - Password, OTP, OAuth2, MFA, impersonation
- **[Authentication - Dart SDK](./dart-sdk/docs/AUTHENTICATION.md)** - Password, OTP, OAuth2, MFA, impersonation

### Files Upload and Handling
- **[Files - JS SDK](./js-sdk/docs/FILES.md)** - File upload, thumbnails, protected files
- **[Files - Dart SDK](./dart-sdk/docs/FILES.md)** - File upload, thumbnails, protected files

### Relations
- **[Relations - JS SDK](./js-sdk/docs/RELATIONS.md)** - Relation fields, expand, back-relations
- **[Relations - Dart SDK](./dart-sdk/docs/RELATIONS.md)** - Relation fields, expand, back-relations

### API Records (CRUD Operations)
- **[API Records - JS SDK](./js-sdk/docs/API_RECORDS.md)** - CRUD, search, filtering, authentication
- **[API Records - Dart SDK](./dart-sdk/docs/API_RECORDS.md)** - CRUD, search, filtering, authentication

### Realtime API
- **[Realtime - JS SDK](./js-sdk/docs/REALTIME.md)** - Real-time subscriptions, SSE, event handling
- **[Realtime - Dart SDK](./dart-sdk/docs/REALTIME.md)** - Real-time subscriptions, SSE, event handling

### File API
- **[File API - JS SDK](./js-sdk/docs/FILE_API.md)** - File download, thumbnails, protected files
- **[File API - Dart SDK](./dart-sdk/docs/FILE_API.md)** - File download, thumbnails, protected files

### Collection API (Management)
- **[Collection API - JS SDK](./js-sdk/docs/COLLECTION_API.md)** - Collection CRUD, import, scaffolds
- **[Collection API - Dart SDK](./dart-sdk/docs/COLLECTION_API.md)** - Collection CRUD, import, scaffolds

### Logs API
- **[Logs API - JS SDK](./js-sdk/docs/LOGS_API.md)** - Log viewing, filtering, statistics
- **[Logs API - Dart SDK](./dart-sdk/docs/LOGS_API.md)** - Log viewing, filtering, statistics

### Crons API
- **[Crons API - JS SDK](./js-sdk/docs/CRONS_API.md)** - Cron job listing and execution
- **[Crons API - Dart SDK](./dart-sdk/docs/CRONS_API.md)** - Cron job listing and execution

### Backups API
- **[Backups API - JS SDK](./js-sdk/docs/BACKUPS_API.md)** - Backup creation, upload, download, restore
- **[Backups API - Dart SDK](./dart-sdk/docs/BACKUPS_API.md)** - Backup creation, upload, download, restore

### Health API
- **[Health API - JS SDK](./js-sdk/docs/HEALTH_API.md)** - Server health status checks
- **[Health API - Dart SDK](./dart-sdk/docs/HEALTH_API.md)** - Server health status checks

## Overview

**Collections** represent your application data. Under the hood they are backed by plain SQLite tables that are generated automatically with the collection **name** and **fields** (columns).

A single entry of a collection is called a **record** (a single row in the SQL table).

## Collection Types

Currently there are 3 collection types:

1. **Base Collection** - Default collection type for storing any application data (articles, products, posts, etc.)
2. **View Collection** - Read-only collection populated from a SQL SELECT statement
3. **Auth Collection** - Base collection with authentication fields (email, password, etc.)

## Field Types

All field types are documented with examples in the respective SDK documentation:

- **BoolField** - Stores `true`/`false` values
- **NumberField** - Stores numeric values (supports `+`/`-` modifiers)
- **TextField** - Stores string values (supports `:autogenerate` modifier)
- **EmailField** - Stores email addresses
- **URLField** - Stores URL strings
- **EditorField** - Stores HTML formatted text
- **DateField** - Stores datetime strings (RFC3339 format)
- **AutodateField** - Auto-set datetime fields (created/updated timestamps)
- **SelectField** - Stores single or multiple values from predefined options (supports `+`/`-` modifiers)
- **FileField** - Manages file uploads (supports `+`/`-` modifiers)
- **RelationField** - Stores references to other collection records (supports `+`/`-` modifiers)
- **JSONField** - Stores any JSON-serializable data (only nullable field type)
- **GeoPointField** - Stores geographic coordinates (longitude, latitude)

## Quick Start

### JavaScript SDK

```javascript
import BosBase from 'bosbase';

const pb = new BosBase('http://localhost:8090');
await pb.admins.authWithPassword('admin@example.com', 'password');

// Create collection
const collection = await pb.collections.createBase('articles', {
  fields: [
    { name: 'title', type: 'text', required: true }
  ]
});

// Create record
const record = await pb.collection('articles').create({
  title: 'My Article'
});
```

### Dart SDK

```dart
import 'package:bosbase/bosbase.dart';

final pb = Bosbase('http://localhost:8090');
await pb.admins.authWithPassword('admin@example.com', 'password');

// Create collection
final collection = await pb.collections.createBase('articles', overrides: {
  'fields': [
    {'name': 'title', 'type': 'text', 'required': true}
  ]
});

// Create record
final record = await pb.collection('articles').create(body: {
  'title': 'My Article'
});
```

## Documentation

For detailed documentation with examples, see:

### Collections and Fields
- [JavaScript SDK Collections Documentation](./js-sdk/docs/COLLECTIONS.md)
- [Dart SDK Collections Documentation](./dart-sdk/docs/COLLECTIONS.md)

### API Rules and Filters
- [JavaScript SDK API Rules Documentation](./js-sdk/docs/API_RULES_AND_FILTERS.md)
- [Dart SDK API Rules Documentation](./dart-sdk/docs/API_RULES_AND_FILTERS.md)

Both documentation sets include:
- Complete API reference for collections and records
- All field types with usage examples
- API rules and filter syntax
- Access control examples
- Authentication examples
- Realtime subscription examples
- Complete working examples

## Field Modifiers

Several field types support special modifiers for update operations:

- **NumberField**: `fieldName+` (add), `fieldName-` (subtract)
- **TextField**: `fieldName:autogenerate` (auto-generate value)
- **SelectField**: `fieldName+` (append), `+fieldName` (prepend), `fieldName-` (remove)
- **FileField**: `fieldName+` (append), `+fieldName` (prepend), `fieldName-` (delete)
- **RelationField**: `fieldName+` (append), `+fieldName` (prepend), `fieldName-` (remove)

## Access Control

Collections support access control rules:

- **ListRule** - Controls who can list records
- **ViewRule** - Controls who can view individual records
- **CreateRule** - Controls who can create records
- **UpdateRule** - Controls who can update records
- **DeleteRule** - Controls who can delete records
- **ManageRule** - (Auth collections only) Controls who can manage other users

Example rules:
- `@request.auth.id != ''` - Only authenticated users
- `author = @request.auth.id` - Only the record owner
- `@request.auth.role = "admin"` - Only users with admin role
- `status = 'public'` - Public records only
- Mixed: `@request.auth.id != '' && (@request.auth.role = "staff" || author = @request.auth.id)`

## Best Practices

1. Use scaffolds (`createBase`, `createAuth`, `createView`) for standard collection creation
2. Always set appropriate access rules for your collections
3. Use field modifiers (`+`, `-`, `:autogenerate`) to simplify update operations
4. Expand relations when needed to avoid multiple API calls
5. Use realtime subscriptions for live updates instead of polling
6. Handle authentication tokens properly (they're automatically stored in `authStore`)
