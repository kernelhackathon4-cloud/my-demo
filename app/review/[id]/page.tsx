'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AIDetectionSummary from '@/components/AIDetectionSummary';
import CodeDiffViewer from '@/components/CodeDiffViewer';
import ChecklistSection from '@/components/ChecklistSection';
import { MOCK_PRS } from '@/lib/mockData';
import Link from 'next/link';

export default function ReviewPage({ params }: { params: { id: string } }) {
  const pr = MOCK_PRS.find((p) => p.id === params.id);
  const [reviewDecision, setReviewDecision] = useState<
    'pending' | 'approved' | 'changes_requested' | 'commented'
  >('pending');
  const [reviewComment, setReviewComment] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  if (!pr) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <div className="text-gray-600">PR를 찾을 수 없습니다.</div>
              <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleChecklistChange = (itemId: string, checked: boolean) => {
    const updated = new Set(checkedItems);
    if (checked) {
      updated.add(itemId);
    } else {
      updated.delete(itemId);
    }
    setCheckedItems(updated);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Link & Title */}
          <div className="mb-6">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
            >
              ← 목록으로
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">
                #{pr.number} · {pr.status}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {pr.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <span>👤 {pr.author}</span>
                <span>상태: {pr.status === 'open' ? '오픈' : '닫힘'}</span>
                <span>+{pr.diff.addedLines} -{pr.diff.removedLines}</span>
                <span>{pr.diff.lines.length} commits</span>
              </div>
            </div>
          </div>

          {/* AI Detection Summary */}
          <AIDetectionSummary pr={pr} />

          {/* Code Diff */}
          <div className="mb-6">
            <CodeDiffViewer diff={pr.diff} />
          </div>

          {/* Checklist */}
          <div className="mb-6" id="checklist">
            <ChecklistSection
              checklist={pr.checklist}
              onItemChange={handleChecklistChange}
            />
          </div>

          {/* Comment Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="font-semibold text-gray-900 mb-4">💬 리뷰 의견</div>

            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="구간별로 피드백을 입력하세요..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400 mb-4"
              rows={8}
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                Cancel
              </button>
              <button
                onClick={() => setReviewDecision('commented')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
              >
                Comment Only
              </button>
              <button
                onClick={() => setReviewDecision('changes_requested')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Request Changes
              </button>
              <button
                onClick={() => setReviewDecision('approved')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Approve
              </button>
            </div>

            {reviewDecision !== 'pending' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                ✅ 리뷰가 {
                  reviewDecision === 'approved'
                    ? '승인'
                    : reviewDecision === 'changes_requested'
                      ? '수정 요청'
                      : '댓글'
                }되었습니다.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
