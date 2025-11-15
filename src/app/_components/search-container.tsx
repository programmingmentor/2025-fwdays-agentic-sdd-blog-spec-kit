'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Post } from '@/interfaces/post';
import { searchPosts } from '@/lib/search';
import { SearchResults as SearchResultsType } from '@/interfaces/search';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

interface SearchContainerProps {
  initialPosts: Post[];
}

export function SearchContainer({ initialPosts }: SearchContainerProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use posts passed from server component
  const allPosts = useMemo(() => initialPosts, [initialPosts]);
  
  // Debounce search query (300ms delay)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);
  
  // Perform search with debounced query
  const searchResults: SearchResultsType = useMemo(() => {
    return searchPosts(debouncedQuery, allPosts);
  }, [debouncedQuery, allPosts]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setIsOpen(true);
  };

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    // Preserve query in input after clicking result
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

