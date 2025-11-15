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

