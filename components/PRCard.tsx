'use client';

import { PullRequest } from '@/lib/types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Link from 'next/link';

interface PRCardProps {
  pr: PullRequest;
  onClick?: () => void;
}

const getSeverityColor = (
  severity: 'critical' | 'high' | 'medium' | 'low'
) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    default:
      return 'bg-green-100 text-green-800 border-green-300';
  }
};

const getSeverityEmoji = (severity: 'critical' | 'high' | 'medium' | 'low') => {
  switch (severity) {
    case 'critical':
      return '🔴';
    case 'high':
      return '🟠';
    case 'medium':
      return '🟡';
    default:
      return '🟢';
  }
};

export default function PRCard({ pr, onClick }: PRCardProps) {
  const patterns = pr.diff.patterns;
  const aiCount = pr.diff.aiDetections.length;

  return (
    <Link href={`/review/${pr.id}`}>
      <div
        onClick={onClick}
        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-700">
              {aiCount > 0 && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                  AI {aiCount}
                </span>
              )}
              <span className="text-gray-500">#{pr.number}</span>
            </div>
            <div className="text-base font-semibold text-gray-900 mt-1">
              {pr.title}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex gap-4 text-xs text-gray-600 mb-3">
          <span>👤 {pr.author}</span>
          <span>+{pr.diff.addedLines} -{pr.diff.removedLines}</span>
          <span>
            {format(pr.createdAt, 'HH:mm aaa', { locale: zhCN })}
          </span>
        </div>

        {/* Patterns */}
        {patterns.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`text-xs px-2 py-1 rounded border ${getSeverityColor(
                  pattern.severity
                )}`}
              >
                {getSeverityEmoji(pattern.severity)} {pattern.name} (
                {pattern.severity[0].toUpperCase()})
              </div>
            ))}
          </div>
        )}

        {/* Est Time */}
        <div className="text-xs text-gray-600 mb-3">
          🕐 예상 리뷰 시간: {pr.estimatedReviewTime}분
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50 font-medium">
            Request Changes
          </button>
          <button className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50 font-medium">
            Comment
          </button>
          <button className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
            Approve
          </button>
        </div>
      </div>
    </Link>
  );
}
