'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🤖</div>
            <div className="font-bold text-gray-900 text-lg">
              AI Code Review Assistant
            </div>
          </div>

          <div className="flex gap-3">
            <button className="text-gray-600 hover:text-gray-900 text-xl">
              🔔
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-xl">
              ⊙
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
