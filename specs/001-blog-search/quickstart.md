# Quickstart Guide: Search in a Blog

**Feature**: Search in a Blog  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This guide provides step-by-step instructions for implementing the blog search feature. Follow these steps in order to ensure proper implementation.

## Prerequisites

- Existing blog application with Next.js 16+ (App Router)
- TypeScript 5.5+ with strict mode enabled
- Existing `getAllPosts()` function from `src/lib/api.ts`
- Tailwind CSS for styling

## Implementation Steps

### Step 1: Create Type Definitions

**File**: `src/interfaces/search.ts`

```typescript
import { Post } from './post';

export type SearchQuery = string;
export type SearchResult = Post;

export interface SearchResults {
  results: SearchResult[];
  query: string;
  totalCount: number;
  isEmpty: boolean;
}

export interface SearchState {
  query: string;
  results: SearchResults | null;
  isOpen: boolean;
}
```

**Action**: Create the file with the above content.

---

### Step 2: Implement Search Utility Functions

**File**: `src/lib/search.ts`

```typescript
import { Post } from '@/interfaces/post';
import { SearchQuery, SearchResults } from '@/interfaces/search';

/**
 * Normalizes a search query for comparison
 */
export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

/**
 * Checks if a query is considered empty
 */
export function isQueryEmpty(query: string): boolean {
  return normalizeQuery(query).length === 0;
}

/**
 * Searches through posts and returns matching results
 */
export function searchPosts(query: SearchQuery, posts: Post[]): SearchResults {
  const normalizedQuery = normalizeQuery(query);
  
  // Return empty results for empty queries
  if (isQueryEmpty(normalizedQuery)) {
    return {
      results: [],
      query: query,
      totalCount: 0,
      isEmpty: true,
    };
  }
  
  // Filter posts that match the query
  const matchingPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(normalizedQuery);
    const excerptMatch = post.excerpt.toLowerCase().includes(normalizedQuery);
    return titleMatch || excerptMatch;
  });
  
  // Sort by date (newest first) - posts are already sorted, but ensure consistency
  const sortedResults = matchingPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return {
    results: sortedResults,
    query: query,
    totalCount: sortedResults.length,
    isEmpty: sortedResults.length === 0,
  };
}
```

**Action**: Create the file with the above content.

**Testing**: 
- Test with empty query → should return empty results
- Test with matching query → should return filtered results
- Test case-insensitive matching → "NEXT" should match "next"
- Test partial matching → "blog" should match "blogging"

---

### Step 3: Create Search Input Component

**File**: `src/app/_components/search-input.tsx`

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { SearchInputProps } from './search-input.types'; // Define types based on contracts

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search posts...',
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Search blog posts',
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
      />
    </div>
  );
}
```

**Note**: You'll need to create `search-input.types.ts` or import types from contracts. For simplicity, you can inline the types initially.

**Action**: Create the component file. Adjust styling classes to match your design system.

---

### Step 4: Create Search Results Component

**File**: `src/app/_components/search-results.tsx`

```typescript
'use client';

import Link from 'next/link';
import { SearchResultsProps } from './search-results.types'; // Define types based on contracts
import { SearchResults as SearchResultsType } from '@/interfaces/search';

export function SearchResults({
  results,
  onResultClick,
  isVisible = true,
  className = '',
  maxResults,
}: SearchResultsProps) {
  if (!isVisible || results.isEmpty) {
    return (
      <div className={className}>
        {results.isEmpty && (
          <div className="p-4 text-center text-gray-500 dark:text-slate-400">
            No results found for &quot;{results.query}&quot;
          </div>
        )}
      </div>
    );
  }

  const displayResults = maxResults 
    ? results.results.slice(0, maxResults)
    : results.results;

  return (
    <div className={`${className} border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-slate-800 dark:border-slate-600`}>
      <div className="p-2">
        {displayResults.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            onClick={() => onResultClick(post.slug)}
            className="block p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <h3 className="font-semibold text-lg mb-1 dark:text-slate-200">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
        {maxResults && results.totalCount > maxResults && (
          <div className="p-2 text-sm text-gray-500 text-center dark:text-slate-400">
            Showing {maxResults} of {results.totalCount} results
          </div>
        )}
      </div>
    </div>
  );
}
```

**Action**: Create the component file. Adjust styling to match your design system.

---

### Step 5: Create Search Container Component (Optional but Recommended)

**File**: `src/app/_components/search-container.tsx`

This component combines SearchInput and SearchResults with state management.

```typescript
'use client';

import { useState, useMemo } from 'react';
import { getAllPosts } from '@/lib/api';
import { searchPosts } from '@/lib/search';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';
import { SearchResults as SearchResultsType } from '@/interfaces/search';

export function SearchContainer() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Get all posts (consider memoizing if posts don't change)
  const allPosts = useMemo(() => getAllPosts(), []);
  
  // Perform search
  const searchResults: SearchResultsType = useMemo(() => {
    return searchPosts(query, allPosts);
  }, [query, allPosts]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setIsOpen(true);
  };

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    // Navigation handled by Link component
  };

  return (
    <div className="relative">
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        onFocus={() => setIsOpen(true)}
        className="w-full"
      />
      {isOpen && (
        <div className="absolute z-50 w-full mt-2">
          <SearchResults
            results={searchResults}
            onResultClick={handleResultClick}
            isVisible={isOpen}
            maxResults={10}
          />
        </div>
      )}
    </div>
  );
}
```

**Action**: Create this component to tie everything together.

---

### Step 6: Integrate Search into Header

**File**: `src/app/_components/header.tsx`

Update the header to include the search component:

```typescript
import Link from "next/link";
import { SearchContainer } from "./search-container";

const Header = () => {
  return (
    <div className="mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-4 flex items-center">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="max-w-md">
        <SearchContainer />
      </div>
    </div>
  );
};

export default Header;
```

**Action**: Update the header component to include search.

---

### Step 7: Add Search to Layout (Alternative)

If you prefer search in the layout instead of header:

**File**: `src/app/layout.tsx`

Add SearchContainer to the layout (similar to how ThemeSwitcher is added).

---

## Testing Checklist

- [ ] Empty query shows no results
- [ ] Valid query shows matching posts
- [ ] Case-insensitive matching works ("NEXT" matches "next")
- [ ] Partial word matching works ("blog" matches "blogging")
- [ ] Results are sorted by date (newest first)
- [ ] Clicking a result navigates to post page
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Search input is accessible (ARIA labels)
- [ ] Mobile responsive design works
- [ ] Dark mode styling works (if applicable)

## Performance Considerations

- Consider debouncing search input (e.g., 300ms delay) to reduce filtering frequency
- Use `useMemo` to cache search results
- Consider limiting displayed results (e.g., top 10) for better performance

## Future Enhancements

- Add search highlighting (highlight matched terms)
- Add search history
- Add keyboard shortcuts (Ctrl+K to focus search)
- Add search analytics
- Add full-text content search

## Troubleshooting

**Issue**: Search not working
- Check that `getAllPosts()` returns posts correctly
- Verify search function is imported correctly
- Check browser console for errors

**Issue**: Results not displaying
- Verify `isOpen` state is managed correctly
- Check CSS classes for visibility
- Verify results array is not empty

**Issue**: TypeScript errors
- Ensure all types are imported correctly
- Check that Post type matches expected structure
- Verify strict mode compatibility

## Next Steps

After implementation:
1. Test all acceptance scenarios from spec.md
2. Verify constitution compliance
3. Run `npm run build` to ensure build succeeds
4. Test on mobile devices
5. Test keyboard accessibility
6. Consider adding unit tests for search functions

