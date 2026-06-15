'use client';

import { useState } from 'react';
import { ReviewChecklist } from '@/lib/types';

interface ChecklistSectionProps {
  checklist: ReviewChecklist;
  onItemChange?: (itemId: string, checked: boolean) => void;
}

const getCategoryLabel = (category: 'critical' | 'medium' | 'low') => {
  switch (category) {
    case 'critical':
      return '🔴 필수 항목';
    case 'medium':
      return '🟡 권장 항목';
    case 'low':
      return '🟢 선택 항목';
  }
};

const getSeverityEmoji = (severity?: 'pass' | 'fail' | 'pending') => {
  switch (severity) {
    case 'pass':
      return '✅';
    case 'fail':
      return '❌';
    case 'pending':
      return '⏳';
    default:
      return '❓';
  }
};

export default function ChecklistSection({
  checklist,
  onItemChange,
}: ChecklistSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['critical'])
  );

  const toggleCategory = (category: string) => {
    const updated = new Set(expandedCategories);
    if (updated.has(category)) {
      updated.delete(category);
    } else {
      updated.add(category);
    }
    setExpandedCategories(updated);
  };

  const criticalItems = checklist.items.filter((i) => i.category === 'critical');
  const mediumItems = checklist.items.filter((i) => i.category === 'medium');
  const lowItems = checklist.items.filter((i) => i.category === 'low');

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <span className="font-semibold text-gray-900">
          📋 AI 코드 리뷰 체크리스트
        </span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ⚙️ 커스터마이징
        </button>
      </div>

      {/* Content */}
      <div className="divide-y">
        {/* Critical Section */}
        {criticalItems.length > 0 && (
          <div>
            <button
              onClick={() => toggleCategory('critical')}
              className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
            >
              {getCategoryLabel('critical')}
              <span className="text-gray-400">
                {expandedCategories.has('critical') ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.has('critical') && (
              <div className="bg-gray-50 border-t border-gray-200">
                {criticalItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-b border-gray-200 last:border-b-0 flex gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => onItemChange?.(item.id, e.target.checked)}
                      className="w-4 h-4 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </div>
                      <div className="text-gray-600 text-xs mt-1">
                        {item.description}
                      </div>
                      {item.targetLines && (
                        <div className="text-gray-500 text-xs mt-1">
                          대상: {item.targetLines}
                        </div>
                      )}
                      {item.standard && (
                        <div className="text-gray-500 text-xs mt-1">
                          팀 기준: {item.standard}
                        </div>
                      )}
                    </div>
                    {item.status && (
                      <div className="text-sm font-semibold whitespace-nowrap">
                        {getSeverityEmoji(item.status)}
                        <div className="text-xs text-gray-600 mt-1">
                          {item.status === 'pass' && 'PASS'}
                          {item.status === 'fail' && 'FAIL'}
                          {item.status === 'pending' && 'PENDING'}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Medium Section */}
        {mediumItems.length > 0 && (
          <div>
            <button
              onClick={() => toggleCategory('medium')}
              className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
            >
              {getCategoryLabel('medium')}
              <span className="text-gray-400">
                {expandedCategories.has('medium') ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.has('medium') && (
              <div className="bg-gray-50 border-t border-gray-200">
                {mediumItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-b border-gray-200 last:border-b-0 flex gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => onItemChange?.(item.id, e.target.checked)}
                      className="w-4 h-4 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </div>
                      <div className="text-gray-600 text-xs mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Low Section */}
        {lowItems.length > 0 && (
          <div>
            <button
              onClick={() => toggleCategory('low')}
              className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
            >
              {getCategoryLabel('low')}
              <span className="text-gray-400">
                {expandedCategories.has('low') ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.has('low') && (
              <div className="bg-gray-50 border-t border-gray-200">
                {lowItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-b border-gray-200 last:border-b-0 flex gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => onItemChange?.(item.id, e.target.checked)}
                      className="w-4 h-4 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </div>
                      <div className="text-gray-600 text-xs mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
