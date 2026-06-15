'use client';

import { CodeDiff } from '@/lib/types';

interface CodeDiffViewerProps {
  diff: CodeDiff;
}

export default function CodeDiffViewer({ diff }: CodeDiffViewerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold">
        📝 CODE DIFF - {diff.filePath} ({diff.lines[0]?.lineNumber}→
        {diff.lines[diff.lines.length - 1]?.lineNumber}줄)
      </div>

      {/* Code Content */}
      <div className="bg-gray-50 px-0 py-0 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed p-4 text-gray-800">
          {diff.lines.map((line) => {
            const hasPattern = line.riskPatterns && line.riskPatterns.length > 0;
            const bgColor = hasPattern ? 'bg-red-50' : line.isAdded ? 'bg-green-50' : '';

            return (
              <div
                key={line.lineNumber}
                className={`flex gap-4 py-1 px-2 ${bgColor}`}
              >
                <span className="text-gray-500 min-w-[40px] text-right select-none">
                  {line.lineNumber}
                </span>

                <span className="text-gray-400 min-w-[20px] select-none">
                  {line.isAdded ? '+' : line.isRemoved ? '-' : ' '}
                </span>

                <code className="flex-1">
                  {line.content}
                  {line.aiConfidence && (
                    <span className="ml-4 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                      AI {line.aiConfidence}%
                    </span>
                  )}
                </code>

                {hasPattern && (
                  <span className="text-red-600 text-xs ml-auto">
                    ⚠️ Risk Pattern
                  </span>
                )}
              </div>
            );
          })}
        </pre>
      </div>

      {/* Pattern List */}
      {diff.patterns.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="font-semibold text-sm text-gray-900 mb-3">
            감지된 위험 패턴:
          </div>
          <div className="space-y-2">
            {diff.patterns.map((pattern) => (
              <div
                key={pattern.id}
                className="bg-white border border-gray-200 rounded p-3 text-sm"
              >
                <div className="font-semibold text-gray-900">
                  {pattern.severity === 'critical' && '🔴'}
                  {pattern.severity === 'high' && '🟠'}
                  {pattern.severity === 'medium' && '🟡'}
                  {' '}
                  {pattern.name}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {pattern.description}
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  해결책: {pattern.remediation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
