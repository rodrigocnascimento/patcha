import type { Vulnerability } from '../types.js';

export type ResolutionLevel = 1 | 2 | 3;

export type ResolutionAction = 
  | 'auto_fixed'
  | 'upgrade'
  | 'replace'
  | 'ai_analysis'
  | 'no_fix_available';

export interface ResolutionResult {
  level: ResolutionLevel;
  vulnerability: Vulnerability;
  action: ResolutionAction;
  newVersion?: string;
  alternative?: string;
  alternativeStars?: number;
  confidence: number;
  explanation?: string;
}

export interface ResolutionContext {
  projectPath: string;
  useAI: boolean;
  dryRun: boolean;
  verbose?: boolean;
  auto?: boolean;
}

export interface ResolutionSummary {
  total: number;
  resolved: number;
  level1Count: number;
  level2Count: number;
  level3Count: number;
  failedCount: number;
  results: ResolutionResult[];
}
