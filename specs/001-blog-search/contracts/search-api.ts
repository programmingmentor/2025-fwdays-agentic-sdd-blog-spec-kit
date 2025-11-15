/**
 * Search API Contracts
 * 
 * These are the function signatures that MUST be implemented in src/lib/search.ts
 * All functions MUST be exported and match these exact signatures.
 */

import { Post } from '@/interfaces/post';
import { SearchQuery, SearchResults } from '@/interfaces/search';

/**
 * Searches through posts and returns matching results.
 * 
 * @param query - Search query string (will be normalized internally)
 * @param posts - Array of all posts to search through
 * @returns SearchResults object containing matching posts and metadata
 * 
 * Behavior:
 * - Case-insensitive matching
 * - Partial word matching (substring search)
 * - Matches against title and excerpt only
 * - Returns empty results if query is empty/whitespace
 * - Results sorted by date (newest first)
 * 
 * Example:
 * ```typescript
 * const allPosts = getAllPosts();
 * const results = searchPosts("next", allPosts);
 * ```
 */
export function searchPosts(query: SearchQuery, posts: Post[]): SearchResults;

/**
 * Normalizes a search query for comparison.
 * 
 * @param query - Raw search query string
 * @returns Normalized query (trimmed, lowercase) or empty string
 * 
 * Behavior:
 * - Trims leading/trailing whitespace
 * - Converts to lowercase
 * - Returns empty string if result is empty after normalization
 */
export function normalizeQuery(query: string): string;

/**
 * Checks if a query is considered empty.
 * 
 * @param query - Search query to check
 * @returns True if query is empty or whitespace-only
 * 
 * Behavior:
 * - Returns true for empty string
 * - Returns true for whitespace-only strings
 * - Returns false otherwise
 */
export function isQueryEmpty(query: string): boolean;

