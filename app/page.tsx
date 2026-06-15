'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FilterBar, { FilterState } from '@/components/FilterBar';
import PRCard from '@/components/PRCard';
import { MOCK_PRS, MOCK_STATS } from '@/lib/mockData';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    critical: true,
    high: false,
    medium: false,
    sortBy: 'recent',
    search: '',
  });

  const filteredPRs = useMemo(() => {
    let result = MOCK_PRS.filter((pr) => {
      // Severity filter
      const hasCritical = pr.diff.patterns.some((p) => p.severity === 'critical');
      const hasHigh = pr.diff.patterns.some((p) => p.severity === 'high');
      const hasMedium = pr.diff.patterns.some((p) => p.severity === 'medium');

      const severityMatch =
        (filters.critical && hasCritical) ||
        (filters.high && hasHigh) ||
        (filters.medium && hasMedium) ||
        (pr.diff.patterns.length === 0 && !filters.critical && !filters.high && !filters.medium);

      // Search filter
      const searchMatch =
        filters.search === '' ||
        pr.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        pr.author.toLowerCase().includes(filters.search.toLowerCase());

      return severityMatch && searchMatch;
    });

    // Sort
    if (filters.sortBy === 'review-time') {
      result.sort((a, b) => a.estimatedReviewTime - b.estimatedReviewTime);
    } else {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return result;
  }, [filters]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Bar */}
          <FilterBar onFilterChange={setFilters} />

          {/* PR List */}
          {filteredPRs.length > 0 ? (
            <div className="space-y-4 mb-8">
              {filteredPRs.map((pr) => (
                <PRCard key={pr.id} pr={pr} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <div className="text-gray-600">
                해당하는 리뷰 대기 PR이 없습니다.
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 shadow-sm">
            📊 이번 주: {MOCK_STATS.weeklyReviews} reviews | 평균{' '}
            {MOCK_STATS.avgReviewTime}분 | 시간 절감 {MOCK_STATS.timeSaved}시간
          </div>
        </div>
      </main>
    </>
  );
}
