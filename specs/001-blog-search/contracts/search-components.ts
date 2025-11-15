/**
 * Search Component Contracts
 * 
 * These are the React component prop interfaces that MUST be implemented.
 * All components MUST accept these exact prop types.
 */

import { SearchResults } from '@/interfaces/search';

/**
 * SearchInput Component Props
 * 
 * Component: src/app/_components/search-input.tsx
 * 
 * Displays a search input field and manages search query state.
 */
export interface SearchInputProps {
  /**
   * Current search query value
   */
  value: string;
  
  /**
   * Callback when search query changes
   * @param query - New search query string
   */
  onChange: (query: string) => void;
  
  /**
   * Callback when search is submitted (e.g., Enter key pressed)
   * @param query - Current search query
   */
  onSubmit?: (query: string) => void;
  
  /**
   * Placeholder text for the input
   * @default "Search posts..."
   */
  placeholder?: string;
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * ARIA label for accessibility
   * @default "Search blog posts"
   */
  'aria-label'?: string;
}

/**
 * SearchResults Component Props
 * 
 * Component: src/app/_components/search-results.tsx
 * 
 * Displays search results in a list format.
 */
export interface SearchResultsProps {
  /**
   * Search results to display
   */
  results: SearchResults;
  
  /**
   * Callback when a result is clicked/selected
   * @param slug - Post slug to navigate to
   */
  onResultClick: (slug: string) => void;
  
  /**
   * Whether results are currently visible
   * Used to show/hide the results panel
   * @default true
   */
  isVisible?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Maximum number of results to display
   * @default undefined (show all results)
   */
  maxResults?: number;
}

/**
 * SearchResultItem Component Props
 * 
 * Component: Internal component within SearchResults
 * 
 * Displays a single search result item.
 */
export interface SearchResultItemProps {
  /**
   * Post title
   */
  title: string;
  
  /**
   * Post excerpt
   */
  excerpt: string;
  
  /**
   * Post slug (for navigation)
   */
  slug: string;
  
  /**
   * Post date (for display, optional)
   */
  date?: string;
  
  /**
   * Callback when item is clicked
   * @param slug - Post slug
   */
  onClick: (slug: string) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * NoResults Component Props
 * 
 * Component: Internal component within SearchResults
 * 
 * Displays "No results found" message.
 */
export interface NoResultsProps {
  /**
   * Search query that produced no results
   */
  query: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

