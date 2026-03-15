export type Severity = 'low' | 'moderate' | 'high' | 'critical';

export interface Advisory {
  id: number;
  url: string;
  title: string;
  severity: string;
  vulnerable_versions: string;
  cwe?: string[];
  cvss?: {
    score: number;
    vectorString: string | null;
  };
}

export interface Vulnerability {
  id: string;
  severity: Severity;
  packageName: string;
  packageVersion: string;
  title: string;
  url: string;
  fixable: boolean;
  fixVersion?: string;
}

export interface ScanSummary {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  total: number;
}

export interface ScanResult {
  path: string;
  timestamp: Date;
  vulnerabilities: Vulnerability[];
  summary: ScanSummary;
}

export interface ArboristNode {
  name: string;
  version: string;
  resolved?: string;
  dev?: boolean;
  optional?: boolean;
  dependencies?: Record<string, string>;
}

export interface NpmAuditAdvisory {
  name: string;
  severity: string;
  isDirect?: boolean;
  via: Array<any>;
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: boolean | {
    name: string;
    version: string;
    isSemVerMajor: boolean;
  };
}

export interface NpmAuditResponse {
  auditReportVersion: number;
  vulnerabilities: Record<string, NpmAuditAdvisory | Advisory[]>;
  metadata?: {
    vulnerabilities: Record<string, number>;
  };
}
