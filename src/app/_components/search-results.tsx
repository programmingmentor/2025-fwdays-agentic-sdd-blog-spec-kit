'use client';

import Link from 'next/link';
import { SearchResults as SearchResultsType } from '@/interfaces/search';

export interface SearchResultsProps {
  results: SearchResultsType;
  onResultClick: (slug: string) => void;
  isVisible?: boolean;
  className?: string;
  maxResults?: number;
}

interface SearchResultItemProps {
  title: string;
  excerpt: string;
  slug: string;
  date?: string;
  onClick: (slug: string) => void;
  className?: string;
}

function SearchResultItem({
  title,
  excerpt,
  slug,
  onClick,
  className = '',
}: SearchResultItemProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      onClick={() => onClick(slug)}
      className={`block p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded transition-colors ${className}`}
    >
      <h3 className="font-semibold text-lg mb-1 dark:text-slate-200">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
        {excerpt}
      </p>
    </Link>
  );
}

interface NoResultsProps {
  query: string;
  className?: string;
}

function NoResults({ query, className = '' }: NoResultsProps) {
  return (
    <div className={`p-4 text-center text-gray-500 dark:text-slate-400 ${className}`}>
      No results found for &quot;{query}&quot;
    </div>
  );
}

export function SearchResults({
  results,
  onResultClick,
  isVisible = true,
  className = '',
  maxResults,
}: SearchResultsProps) {
  if (!isVisible) {
    return null;
  }

  if (results.isEmpty) {
    return (
      <div className={`${className} border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-slate-800 dark:border-slate-600`}>
        <NoResults query={results.query} />
      </div>
    );
  }

  const displayResults = maxResults 
    ? results.results.slice(0, maxResults)
    : results.results;

  return (
    <div className={`${className} border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-slate-800 dark:border-slate-600`}>
      <div className="p-2 max-h-96 overflow-y-auto">
        {displayResults.map((post) => (
          <SearchResultItem
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            date={post.date}
            onClick={onResultClick}
          />
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

