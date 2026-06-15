// Domain Types
export interface PRComment {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
}

export interface CodeLine {
  lineNumber: number;
  content: string;
  isAdded: boolean;
  isRemoved: boolean;
  aiConfidence?: number;
  riskPatterns?: PatternDetection[];
}

export interface PatternDetection {
  id: string;
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  lineNumber: number;
  remediation: string;
  frequency: number; // AI가 저지르는 확률 (%)
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'critical' | 'medium' | 'low';
  checked: boolean;
  status?: 'pass' | 'fail' | 'pending';
  targetLines?: string;
  standard?: string;
  relatedPatterns?: string[];
}

export interface ReviewChecklist {
  id: string;
  prId: string;
  items: ChecklistItem[];
  lastUpdated: Date;
}

export interface AIDetection {
  segmentId: string;
  startLine: number;
  endLine: number;
  confidence: number; // 0-100
  tool?: 'copilot' | 'cursor' | 'codeium' | 'unknown';
}

export interface CodeDiff {
  prId: string;
  filePath: string;
  beforeCode?: string;
  afterCode: string;
  addedLines: number;
  removedLines: number;
  lines: CodeLine[];
  aiDetections: AIDetection[];
  patterns: PatternDetection[];
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  description?: string;
  author: string;
  status: 'open' | 'draft' | 'merged' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  diff: CodeDiff;
  checklist: ReviewChecklist;
  comments: PRComment[];
  estimatedReviewTime: number; // minutes
}

export interface ReviewState {
  decision?: 'pending' | 'approved' | 'changes_requested' | 'commented';
  comment?: string;
  checkedItems: Set<string>;
}

export interface TeamPolicy {
  id: string;
  name: string;
  description: string;
  category: 'technical' | 'security' | 'general';
  rules: string[];
  violations?: string[];
  createdBy: string;
  createdAt: Date;
}
