'use client';

import { useRef } from 'react';

export interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
  onSubmit?: (query: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onFocus,
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
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 bg-white text-gray-900"
      />
    </div>
  );
}

