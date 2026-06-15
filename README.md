# AI Code Review Assistant - Next.js Prototype

AI 생성 코드를 더 빠르게 신뢰할 수 있게 하는 팀의 리뷰 도우미 프로토타입입니다.

## 🎯 핵심 기능 (Must Features)

### 1️⃣ AI 코드 감지 & 표시
- PR에 올라온 코드 중 AI 생성 구간을 자동 감지
- 각 diff 라인에 AI 배지 표시 (신뢰도 점수 포함)
- AI 감지 요약 박스로 빠른 파악

### 2️⃣ 위험 패턴 플래깅
- AI가 자주 저지르는 패턴 자동 감지
  - 에러 처리 누락 (60% 빈도)
  - N+1 쿼리 (42%)
  - 권한 검증 부재 (38%)
  - 타입 안정성 위반 (35%)
- 심각도별 색상 구분 (Critical/High/Medium/Low)

### 3️⃣ 동적 체크리스트
- 팀 정책 기반 자동 생성 체크리스트
- 필수/권장/선택 항목별 카테고리화
- 1-Click으로 의견 템플릿 적용 가능
- 체크박스 상태 추적

## 📱 화면 구성

### 화면 A: PR 목록 + 필터
- **경로**: `/` (홈페이지)
- **기능**:
  - 상단 고정 필터 바 (심각도, 정렬, 검색)
  - PR 카드 목록 (AI 배지, 패턴, 예상 시간)
  - 주간 통계 표시
  - 클릭 시 상세 페이지로 이동

### 화면 B: PR 상세 + 리뷰
- **경로**: `/review/[id]`
- **기능**:
  - AI 감지 요약 박스
  - 코드 Diff 뷰어 (라인별 AI 표시, 패턴 플래깅)
  - 동적 체크리스트 (카테고리별 접기/펼치기)
  - 리뷰 의견 입력 (Approve/Request Changes/Comment)
  - 리뷰 결과 피드백

### 화면 C: Empty State
- 모든 리뷰 완료 상태
- 주간 통계 및 성과 카드 표시

## 🏗️ 프로젝트 구조

```
ai-code-review/
├── app/
│   ├── page.tsx              # 홈 (PR 목록)
│   ├── layout.tsx            # 전역 레이아웃
│   ├── globals.css           # 전역 스타일
│   └── review/
│       └── [id]/
│           └── page.tsx      # PR 상세 페이지
├── components/
│   ├── Header.tsx            # 헤더
│   ├── FilterBar.tsx         # 필터 바 (상단 고정)
│   ├── PRCard.tsx            # PR 카드 컴포넌트
│   ├── AIDetectionSummary.tsx # AI 감지 요약 박스
│   ├── CodeDiffViewer.tsx    # 코드 Diff 뷰어
│   └── ChecklistSection.tsx  # 체크리스트 섹션
├── lib/
│   ├── types.ts              # TypeScript 타입 정의
│   └── mockData.ts           # 더미 데이터 (3개 PR + 패턴)
└── package.json
```

## 🚀 빠른 시작

### 설치
```bash
cd ai-code-review
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드
```bash
npm run build
npm run start
```

## 📊 더미 데이터 시나리오

### PR #1234: 결제 웹훅 핸들러 (김철수)
- **AI 감지**: 2곳 (87%, 92% 신뢰도)
- **위험 패턴**: Error Handling Missing (C), N+1 Query (H)
- **예상 시간**: 20분
- **상태**: Open

### PR #1232: JWT 검증 (이순신)
- **AI 감지**: 1곳 (88% 신뢰도)
- **위험 패턴**: Type Safety Violation (M)
- **예상 시간**: 12분
- **상태**: Open

### PR #1220: Redis 캐싱 최적화 (박영희)
- **AI 감지**: 없음
- **위험 패턴**: 없음
- **예상 시간**: 10분
- **상태**: Open

## 💾 타입 정의 (lib/types.ts)

- `PullRequest`: PR 메타데이터 + Diff + Checklist + Comments
- `CodeDiff`: 파일 경로 + 라인 + AI 감지 + 패턴
- `PatternDetection`: 패턴 이름 + 심각도 + 설명 + 해결책
- `ChecklistItem`: 제목 + 설명 + 카테고리 + 상태
- `AIDetection`: 구간 범위 + 신뢰도 + 도구 정보

## 🎨 스타일링

- **Framework**: Tailwind CSS
- **Colors**:
  - Critical: 빨강 (#E74C3C)
  - High: 주황 (#F39C12)
  - Medium: 노랑 (#F1C40F)
  - Success: 초록 (#27AE60)
  - Info: 파랑 (#3498DB)

## 📱 반응형 디자인

- **Mobile**: 단일 열, 터치 친화적
- **Tablet**: 2열 그리드
- **Desktop**: 전체 레이아웃

모든 컴포넌트는 `sm:`, `md:`, `lg:` Tailwind 브레이크포인트로 최적화됨

## 🔄 상태 관리

- **React Hook**: `useState`, `useMemo`로 간단하게 구현
- **필터 상태**: FilterBar에서 관리 → Home으로 전파
- **체크리스트**: Review 페이지의 로컬 상태
- **확장성**: 향후 Zustand/Redux로 전환 가능

## ✨ 주요 특징

✅ **타입 안전성**: 전체 TypeScript 구현
✅ **컴포넌트 분리**: 재사용 가능한 모듈식 설계
✅ **더미 데이터**: 3개 PR로 모든 시나리오 재현
✅ **모바일 반응형**: 모든 디바이스에서 동작
✅ **접근성**: 시맨틱 HTML + ARIA 고려
✅ **성능**: Next.js 13+ App Router 활용

## 🛣️ 다음 단계 (Phase 2)

- [ ] GitHub API 연동 (실제 PR 데이터 불러오기)
- [ ] 사용자 인증 (GitHub OAuth)
- [ ] 데이터베이스 연동 (PostgreSQL)
- [ ] 팀 정책 관리 UI
- [ ] 정책 위반 감지 로직
- [ ] 분석 & 대시보드

## 📝 License

MIT
