# Data Model: Search in a Blog

**Feature**: Search in a Blog  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This document defines the data structures, types, and interfaces for the blog search feature. All types are TypeScript-compatible and follow the project's TypeScript-first constitution principle.

## Entities

### SearchQuery

Represents a user-entered search query.

**Type Definition**:
```typescript
type SearchQuery = string;
```

**Properties**:
- Raw string input from user
- No length limit enforced (but UI may truncate display)
- Can contain any characters (special characters treated literally)
- Whitespace-only queries are considered empty

**Validation Rules**:
- Empty string or whitespace-only → treated as empty query
- No maximum length enforced (performance handled by filtering logic)
- Case-insensitive matching (normalized to lowercase for comparison)

**Usage**:
- Input from search input component
- Passed to search function for filtering posts

---

### SearchResult

Represents a single blog post that matches a search query.

**Type Definition**:
```typescript
type SearchResult = Post;
```

**Properties**: Inherits all properties from `Post` type:
- `slug: string` - Unique identifier for the post
- `title: string` - Post title (displayed in results)
- `excerpt: string` - Post excerpt (displayed in results)
- `date: string` - Post date (used for sorting)
- `author: Author` - Post author
- `coverImage: string` - Cover image URL
- `ogImage: { url: string }` - Open Graph image
- `content: string` - Full post content (not used in search matching)
- `preview?: boolean` - Optional preview flag

**Relationships**:
- One SearchResult corresponds to one Post
- Multiple SearchResults can match a single SearchQuery

**Usage**:
- Returned from search function as array of matching posts
- Displayed in search results component
- Used for navigation to full post page

---

### SearchResults

Collection of search results with metadata.

**Type Definition**:
```typescript
type SearchResults = {
  results: SearchResult[];
  query: string;
  totalCount: number;
  isEmpty: boolean;
};
```

**Properties**:
- `results: SearchResult[]` - Array of matching posts, ordered by date (newest first)
- `query: string` - Original search query that produced these results
- `totalCount: number` - Total number of matching posts
- `isEmpty: boolean` - True if no results found

**Validation Rules**:
- `totalCount` must equal `results.length`
- `isEmpty` must be `true` when `totalCount === 0`
- Results must be sorted by date (newest first)

**Usage**:
- Returned from search function
- Passed to search results component for display
- Used to determine if "No results found" message should be shown

---

## Functions/Operations

### searchPosts(query: SearchQuery, posts: Post[]): SearchResults

Searches through posts and returns matching results.

**Parameters**:
- `query: SearchQuery` - Search query string
- `posts: Post[]` - Array of all posts to search through

**Returns**: `SearchResults` - Object containing matching posts and metadata

**Behavior**:
- Case-insensitive matching (normalizes query and post fields to lowercase)
- Partial word matching (uses substring search)
- Matches against `title` and `excerpt` fields only
- Filters out results where query doesn't match
- Sorts results by date (newest first)
- Returns empty results if query is empty or whitespace-only

**Example**:
```typescript
const allPosts = getAllPosts();
const searchResults = searchPosts("next", allPosts);
// Returns posts where title or excerpt contains "next" (case-insensitive)
```

---

### normalizeQuery(query: string): string

Normalizes a search query for comparison.

**Parameters**:
- `query: string` - Raw search query

**Returns**: `string` - Normalized query (trimmed, lowercase)

**Behavior**:
- Trims leading/trailing whitespace
- Converts to lowercase
- Returns empty string if result is empty after normalization

**Usage**:
- Internal utility for search matching
- Used to normalize user input before searching

---

### isQueryEmpty(query: string): boolean

Checks if a query is considered empty.

**Parameters**:
- `query: string` - Search query to check

**Returns**: `boolean` - True if query is empty or whitespace-only

**Behavior**:
- Returns `true` if query is empty string
- Returns `true` if query contains only whitespace characters
- Returns `false` otherwise

**Usage**:
- Used to determine if search should be performed
- Used to show/hide search results

---

## State Management

### Search State (Component-level)

Search components will manage local state for:
- Current search query (string)
- Search results (SearchResults | null)
- Loading state (boolean) - not needed for client-side, but may be useful for future enhancements
- Input focus state (boolean) - for UI interactions

**State Structure** (conceptual, implementation-specific):
```typescript
type SearchState = {
  query: string;
  results: SearchResults | null;
  isOpen: boolean; // For dropdown/overlay UI
};
```

---

## Type Definitions Summary

All types will be defined in `src/interfaces/search.ts`:

```typescript
// Re-export Post type for convenience
import { Post } from './post';

export type SearchQuery = string;

export type SearchResult = Post;

export type SearchResults = {
  results: SearchResult[];
  query: string;
  totalCount: number;
  isEmpty: boolean;
};

export type SearchState = {
  query: string;
  results: SearchResults | null;
  isOpen: boolean;
};
```

---

## Relationships Diagram

```
SearchQuery (string)
    │
    │ (used to filter)
    ▼
Post[] (all posts)
    │
    │ (filtered by searchPosts)
    ▼
SearchResults
    ├── results: SearchResult[] (Post[])
    ├── query: string
    ├── totalCount: number
    └── isEmpty: boolean
```

---

## Validation Rules Summary

1. **SearchQuery**:
   - Empty/whitespace → treated as empty
   - No length limit
   - All characters treated literally

2. **SearchResults**:
   - `totalCount === results.length`
   - `isEmpty === (totalCount === 0)`
   - Results sorted by date (newest first)

3. **Search Matching**:
   - Case-insensitive
   - Partial word matching
   - Matches title OR excerpt
   - Empty query returns empty results

---

## Future Enhancements (Out of Scope)

These are potential future additions but not part of initial implementation:
- Search highlighting (highlighting matched terms in results)
- Search history (storing recent searches)
- Search suggestions/autocomplete
- Full-text content search (currently only title + excerpt)
- Fuzzy matching (typo tolerance)
- Search filters (by author, date range, etc.)
- Search analytics (tracking popular searches)

