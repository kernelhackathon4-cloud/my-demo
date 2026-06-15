'use client';

import { PullRequest } from '@/lib/types';

interface AIDetectionSummaryProps {
  pr: PullRequest;
}

export default function AIDetectionSummary({ pr }: AIDetectionSummaryProps) {
  const { diff, estimatedReviewTime } = pr;
  const aiCount = diff.aiDetections.length;
  const patternCount = diff.patterns.length;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="font-semibold text-gray-900 mb-2">🎯 AI 감지 요약</div>

      <ul className="space-y-1.5 text-sm text-gray-700 mb-3">
        <li>
          • AI 구간 {aiCount}곳 감지됨{' '}
          {diff.aiDetections.map((d) => `(${d.confidence}%)`).join(', ')}
        </li>
        <li>
          • 위험 패턴 {patternCount}개 발견:{' '}
          {diff.patterns.map((p) => `${p.name} (${p.severity[0].toUpperCase()})`).join(', ')}
        </li>
        <li>• 예상 리뷰 시간: {estimatedReviewTime}분</li>
      </ul>

      <div className="flex gap-2 text-sm">
        <a href="#checklist" className="text-blue-600 hover:text-blue-800 font-medium">
          📋 Checklist
        </a>
        <a href="#policies" className="text-blue-600 hover:text-blue-800 font-medium">
          📚 Policies
        </a>
      </div>
    </div>
  );
}
