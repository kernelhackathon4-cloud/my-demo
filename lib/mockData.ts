import {
  PullRequest,
  CodeLine,
  PatternDetection,
  AIDetection,
  ChecklistItem,
} from './types';

// 패턴 정의
const PATTERNS: PatternDetection[] = [
  {
    id: 'ERR-001',
    name: 'Error Handling Missing',
    severity: 'critical',
    description: 'async 함수에 에러 처리 코드가 없음. Promise rejection 처리 필수.',
    lineNumber: 55,
    remediation: 'try-catch 또는 .catch() 추가',
    frequency: 60,
  },
  {
    id: 'PERF-001',
    name: 'N+1 Query Pattern',
    severity: 'high',
    description: '루프 내에서 데이터베이스 쿼리 실행. 배치 쿼리로 변경 필요.',
    lineNumber: 52,
    remediation: 'batch query 또는 join으로 변경',
    frequency: 42,
  },
  {
    id: 'SEC-001',
    name: 'Auth Check Missing',
    severity: 'critical',
    description: 'DB 변경 작업에 권한 검증이 없음.',
    lineNumber: 0,
    remediation: '권한 검증 로직 추가',
    frequency: 38,
  },
  {
    id: 'TYPE-001',
    name: 'Type Safety Violation',
    severity: 'medium',
    description: 'TypeScript strict mode 위반',
    lineNumber: 44,
    remediation: '타입 명시 추가',
    frequency: 35,
  },
];

// 코드 라인
const CODE_LINES: CodeLine[] = [
  {
    lineNumber: 42,
    content: 'async handleWebhook(req, res) {',
    isAdded: false,
    isRemoved: false,
  },
  {
    lineNumber: 43,
    content: '  const signature = req.headers["x-signature"];',
    isAdded: true,
    isRemoved: false,
    aiConfidence: 87,
  },
  {
    lineNumber: 44,
    content: '  const payload = JSON.parse(req.body);',
    isAdded: true,
    isRemoved: false,
    aiConfidence: 87,
  },
  {
    lineNumber: 45,
    content: '  if (signature !== hash(payload)) {',
    isAdded: true,
    isRemoved: false,
    aiConfidence: 92,
  },
  {
    lineNumber: 46,
    content: '    return res.status(401).send("Unauthorized");',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 47,
    content: '  }',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 48,
    content: '  const result = db.query(',
    isAdded: true,
    isRemoved: false,
    aiConfidence: 92,
    riskPatterns: [PATTERNS[1]],
  },
  {
    lineNumber: 49,
    content: '    `SELECT * FROM users WHERE id = ${req.id}`',
    isAdded: true,
    isRemoved: false,
    aiConfidence: 92,
  },
  {
    lineNumber: 50,
    content: '  );',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 51,
    content: '  result.forEach(user => {',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 52,
    content: '    db.query(`UPDATE user SET balance = ...`);',
    isAdded: true,
    isRemoved: false,
    riskPatterns: [PATTERNS[1]],
  },
  {
    lineNumber: 53,
    content: '  });',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 54,
    content: '  return res.json({ success: true });',
    isAdded: true,
    isRemoved: false,
  },
  {
    lineNumber: 55,
    content: '}',
    isAdded: true,
    isRemoved: false,
    riskPatterns: [PATTERNS[0]],
  },
];

// 체크리스트 항목
const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'CL-001',
    title: '에러 처리 완전한가?',
    description: 'async 함수는 반드시 try-catch 또는 .catch() 필수',
    category: 'critical',
    checked: false,
    status: 'fail',
    targetLines: '42-55줄',
    standard: 'POL-001',
    relatedPatterns: ['ERR-001'],
  },
  {
    id: 'CL-002',
    title: '권한/인증 검증 있는가?',
    description: '모든 DB 변경은 권한 확인 필수',
    category: 'critical',
    checked: true,
    status: 'pass',
    targetLines: '45-46줄',
    standard: 'POL-001',
    relatedPatterns: ['SEC-001'],
  },
  {
    id: 'CL-003',
    title: 'N+1 쿼리 없는가?',
    description: '루프 내 쿼리 금지, 배치 사용',
    category: 'critical',
    checked: false,
    status: 'fail',
    targetLines: '48-52줄',
    standard: 'POL-001',
    relatedPatterns: ['PERF-001'],
  },
  {
    id: 'CL-004',
    title: '타입 안정성 유지?',
    description: 'strict mode 준수',
    category: 'medium',
    checked: false,
    status: 'pending',
    relatedPatterns: ['TYPE-001'],
  },
  {
    id: 'CL-005',
    title: '테스트 커버리지 충분?',
    description: 'AI 코드는 70% 이상 필수',
    category: 'medium',
    checked: false,
    status: 'pending',
  },
];

// AI 감지
const AI_DETECTIONS: AIDetection[] = [
  {
    segmentId: 'seg-1',
    startLine: 43,
    endLine: 50,
    confidence: 87,
    tool: 'copilot',
  },
  {
    segmentId: 'seg-2',
    startLine: 48,
    endLine: 54,
    confidence: 92,
    tool: 'copilot',
  },
];

// 목 PR 데이터
export const MOCK_PRS: PullRequest[] = [
  {
    id: 'pr-1',
    number: 1234,
    title: '결제: 웹훅 핸들러',
    description: 'Process webhook events from payment provider',
    author: '김철수',
    status: 'open',
    createdAt: new Date(Date.now() - 30 * 60000), // 30분 전
    updatedAt: new Date(Date.now() - 30 * 60000),
    diff: {
      prId: 'pr-1',
      filePath: 'payment/webhook.ts',
      addedLines: 24,
      removedLines: 8,
      lines: CODE_LINES,
      aiDetections: AI_DETECTIONS,
      patterns: [PATTERNS[0], PATTERNS[1]],
    },
    checklist: {
      id: 'checklist-1',
      prId: 'pr-1',
      items: CHECKLIST_ITEMS,
      lastUpdated: new Date(),
    },
    comments: [
      {
        id: 'comment-1',
        author: '이재원',
        text: '먼저 에러 처리를 확인해 주세요.',
        createdAt: new Date(Date.now() - 15 * 60000),
      },
    ],
    estimatedReviewTime: 20,
  },
  {
    id: 'pr-2',
    number: 1232,
    title: '인증: JWT 검증',
    description: 'Add JWT verification middleware',
    author: '이순신',
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 3600000), // 2시간 전
    updatedAt: new Date(Date.now() - 2 * 3600000),
    diff: {
      prId: 'pr-2',
      filePath: 'auth/jwt.ts',
      addedLines: 12,
      removedLines: 3,
      lines: [
        {
          lineNumber: 1,
          content: 'import jwt from "jsonwebtoken";',
          isAdded: true,
          isRemoved: false,
          aiConfidence: 95,
        },
        {
          lineNumber: 2,
          content: 'export const verifyToken = (token: string) => {',
          isAdded: true,
          isRemoved: false,
        },
        {
          lineNumber: 3,
          content: '  return jwt.verify(token, process.env.JWT_SECRET);',
          isAdded: true,
          isRemoved: false,
          aiConfidence: 88,
        },
      ],
      aiDetections: [
        {
          segmentId: 'seg-3',
          startLine: 1,
          endLine: 3,
          confidence: 88,
          tool: 'cursor',
        },
      ],
      patterns: [PATTERNS[3]],
    },
    checklist: {
      id: 'checklist-2',
      prId: 'pr-2',
      items: [
        {
          id: 'CL-401',
          title: 'Type Safety?',
          description: 'strict mode 준수',
          category: 'medium',
          checked: false,
          status: 'fail',
          relatedPatterns: ['TYPE-001'],
        },
      ],
      lastUpdated: new Date(),
    },
    comments: [],
    estimatedReviewTime: 12,
  },
  {
    id: 'pr-3',
    number: 1220,
    title: '캐싱: Redis 최적화',
    description: 'Optimize cache key generation',
    author: '박영희',
    status: 'open',
    createdAt: new Date(Date.now() - 4 * 3600000), // 4시간 전
    updatedAt: new Date(Date.now() - 4 * 3600000),
    diff: {
      prId: 'pr-3',
      filePath: 'cache/redis.ts',
      addedLines: 8,
      removedLines: 2,
      lines: [
        {
          lineNumber: 1,
          content: 'const cacheKey = `user:${id}:data`;',
          isAdded: true,
          isRemoved: false,
        },
      ],
      aiDetections: [],
      patterns: [],
    },
    checklist: {
      id: 'checklist-3',
      prId: 'pr-3',
      items: [],
      lastUpdated: new Date(),
    },
    comments: [],
    estimatedReviewTime: 10,
  },
];

// 통계 데이터
export const MOCK_STATS = {
  weeklyReviews: 12,
  avgReviewTime: 18,
  timeSaved: 2,
  aiReviewRate: 83,
  patternsFound: 14,
  policyViolations: 1,
  falsePositives: 0,
};
