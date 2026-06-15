'use client';

import { useState } from 'react';

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  critical: boolean;
  high: boolean;
  medium: boolean;
  sortBy: 'recent' | 'review-time';
  search: string;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    critical: true,
    high: false,
    medium: false,
    sortBy: 'recent',
    search: '',
  });

  const handleFilterToggle = (key: keyof Omit<FilterState, 'sortBy' | 'search'>) => {
    const updated = { ...filters, [key]: !filters[key] };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSortChange = (sortBy: 'recent' | 'review-time') => {
    const updated = { ...filters, sortBy };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSearchChange = (search: string) => {
    const updated = { ...filters, search };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 sticky top-0 z-10 shadow-sm">
      <div className="flex flex-col md:flex-row gap-3 flex-wrap items-center">
        {/* Severity Filters */}
        <button
          onClick={() => handleFilterToggle('critical')}
          className={`px-3 py-1.5 text-sm rounded border font-medium transition-all ${
            filters.critical
              ? 'bg-red-100 text-red-800 border-red-300'
              : 'bg-white text-gray-600 border-gray-300 hover:border-red-300'
          }`}
        >
          🔴 Critical
        </button>

        <button
          onClick={() => handleFilterToggle('high')}
          className={`px-3 py-1.5 text-sm rounded border font-medium transition-all ${
            filters.high
              ? 'bg-orange-100 text-orange-800 border-orange-300'
              : 'bg-white text-gray-600 border-gray-300 hover:border-orange-300'
          }`}
        >
          🟠 High
        </button>

        <button
          onClick={() => handleFilterToggle('medium')}
          className={`px-3 py-1.5 text-sm rounded border font-medium transition-all ${
            filters.medium
              ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
              : 'bg-white text-gray-600 border-gray-300 hover:border-yellow-300'
          }`}
        >
          🟡 Medium
        </button>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as 'recent' | 'review-time')}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-blue-400 bg-white font-medium"
        >
          <option value="recent">🔽 최신순</option>
          <option value="review-time">🕐 리뷰 시간순</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 PR 검색..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}
