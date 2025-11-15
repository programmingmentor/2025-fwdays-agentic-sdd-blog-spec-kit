/**
 * Search Type Definitions Contract
 * 
 * These types MUST be defined in src/interfaces/search.ts
 * All types MUST match these exact definitions.
 */

import { Post } from '@/interfaces/post';

/**
 * Search query string type
 * Represents user-entered search query
 */
export type SearchQuery = string;

/**
 * Single search result (alias for Post)
 * A blog post that matches a search query
 */
export type SearchResult = Post;

/**
 * Search results collection with metadata
 */
export interface SearchResults {
  /**
   * Array of matching posts, ordered by date (newest first)
   */
  results: SearchResult[];
  
  /**
   * Original search query that produced these results
   */
  query: string;
  
  /**
   * Total number of matching posts
   * Must equal results.length
   */
  totalCount: number;
  
  /**
   * True if no results found
   * Must be true when totalCount === 0
   */
  isEmpty: boolean;
}

/**
 * Search component state (for internal component state management)
 * This is a conceptual type - actual implementation may vary
 */
export interface SearchState {
  /**
   * Current search query
   */
  query: string;
  
  /**
   * Current search results (null if no search performed)
   */
  results: SearchResults | null;
  
  /**
   * Whether search results panel is open/visible
   */
  isOpen: boolean;
}

