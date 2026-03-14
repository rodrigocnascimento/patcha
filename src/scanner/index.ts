import { buildDepTree, readPackageJson } from './arborist.js';
import { queryNpmAudit } from './npm-audit.js';
import type { Vulnerability, ScanResult, ScanSummary, NpmAuditResponse, Severity } from './types.js';

function mapSeverity(severity: string): Severity {
  const map: Record<string, Severity> = {
    low: 'low',
    moderate: 'moderate',
    medium: 'moderate',
    high: 'high',
    critical: 'critical',
  };
  return map[severity.toLowerCase()] || 'moderate';
}

function transformVulnerabilities(auditResponse: NpmAuditResponse): Vulnerability[] {
  const vulnerabilities: Vulnerability[] = [];
  const vulns = auditResponse.vulnerabilities;

  if (!vulns) return vulnerabilities;

  for (const [_id, advisory] of Object.entries(vulns)) {
    vulnerabilities.push({
      id: `npm:${advisory.module_name}`,
      severity: mapSeverity(advisory.severity),
      packageName: advisory.module_name,
      packageVersion: '',
      title: advisory.title,
      url: advisory.url,
      fixable: !!advisory.fix_available,
      fixVersion: advisory.fix_available?.version,
    });
  }

  return vulnerabilities;
}

function calculateSummary(vulnerabilities: Vulnerability[]): ScanSummary {
  return {
    critical: vulnerabilities.filter(v => v.severity === 'critical').length,
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    moderate: vulnerabilities.filter(v => v.severity === 'moderate').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length,
    total: vulnerabilities.length,
  };
}

export async function scan(projectPath: string): Promise<ScanResult> {
  readPackageJson(projectPath);
  const depTree = await buildDepTree(projectPath);
  const auditResponse = await queryNpmAudit(depTree);
  
  const vulnerabilities = transformVulnerabilities(auditResponse);
  const summary = calculateSummary(vulnerabilities);
  
  return {
    path: projectPath,
    timestamp: new Date(),
    vulnerabilities,
    summary,
  };
}

export type { Vulnerability, ScanResult, ScanSummary };
