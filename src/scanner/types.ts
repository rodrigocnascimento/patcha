export type Severity = 'low' | 'moderate' | 'high' | 'critical';

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
  id: number;
  module_name: string;
  severity: string;
  url: string;
  title: string;
  finding_short?: string;
  finding_long?: string;
  fix_available?: {
    version: string;
    pr: number;
    committed?: string;
  };
  patches?: Array<{
    version: string;
    patch: string;
  }>;
}

export interface NpmAuditResponse {
  auditReportVersion: number;
  vulnerabilities: Record<string, NpmAuditAdvisory>;
  metadata?: {
    vulnerabilities: Record<string, number>;
  };
}
