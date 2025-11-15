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

