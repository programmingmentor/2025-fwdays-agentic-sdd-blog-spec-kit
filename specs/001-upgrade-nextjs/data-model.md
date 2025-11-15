# Data Model: Next.js Upgrade

**Date**: 2025-01-27  
**Feature**: Upgrade Next.js to Latest Version

## Overview

This upgrade does not introduce new data models or modify existing data structures. The application's data model remains unchanged:

- **Blog Posts**: Markdown files with front matter metadata (unchanged)
- **Author Data**: Embedded in blog post front matter (unchanged)
- **Application State**: Client-side theme state (unchanged)

## Existing Entities (No Changes)

### Blog Post

**Location**: `_posts/*.md` files

**Structure**: Markdown files with YAML front matter

**Fields**:

- `title`: string (required)
- `date`: string (required, ISO date format)
- `author`: Author object (required)
- `coverImage`: string (required, path to image)
- `excerpt`: string (optional)
- `slug`: string (derived from filename)

**Relationships**: None (standalone markdown files)

**Validation Rules**:

- Front matter parsed by `gray-matter`
- Content processed by `remark` and `remark-html`
- No changes to parsing logic

### Author

**Location**: Embedded in blog post front matter

**Structure**: Object with name and picture

**Fields**:

- `name`: string (required)
- `picture`: string (required, path to author image)

**Relationships**: Referenced by Blog Post entities

**Validation Rules**: No changes

### Application Configuration

**Location**: Various config files (`package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`)

**Changes**:

- `package.json`: Dependency versions updated
- `tsconfig.json`: May require minor adjustments for Next.js 16 types
- Other configs: No changes expected

## State Transitions

No state transitions affected by upgrade. All state management remains client-side React state (theme switching).

## Data Flow (Unchanged)

1. **Build Time**:

   - Markdown files read from `_posts/`
   - Front matter parsed by `gray-matter`
   - Content converted to HTML by `remark` + `remark-html`
   - Static pages generated

2. **Runtime**:
   - Static pages served
   - Client-side navigation via Next.js App Router
   - Theme state managed in React components

**No changes to data flow** - upgrade is transparent to data processing.

## Migration Notes

**No data migration required** - this is a framework upgrade, not a data model change.

All existing blog posts, images, and metadata remain unchanged and compatible with Next.js 16.
