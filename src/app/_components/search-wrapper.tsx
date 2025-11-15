import { getAllPosts } from '@/lib/api';
import { SearchContainer } from './search-container';

export function SearchWrapper() {
  // Load posts server-side
  const allPosts = getAllPosts();
  
  // Pass posts to client component
  return <SearchContainer initialPosts={allPosts} />;
}

