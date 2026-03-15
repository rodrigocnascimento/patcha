import { buildDepTree, readPackageJson, getDirectDependencies } from './arborist.js';
import { queryNpmAudit } from './npm-audit.js';
import type { Vulnerability, ScanResult, ScanSummary, NpmAuditResponse, Severity } from './types.js';

function transformVulnerabilities(auditResponse: NpmAuditResponse): Vulnerability[] {
  const vulnerabilities: Vulnerability[] = [];
  const vulns = auditResponse.vulnerabilities;

  if (!vulns) return vulnerabilities;

  for (const [pkgName, advisories] of Object.entries(vulns)) {
    if (!Array.isArray(advisories)) continue;
    
    for (const advisory of advisories) {
      const severityMap: Record<string, Severity> = {
        low: 'low',
        moderate: 'moderate',
        high: 'high',
        critical: 'critical',
      };
      
      vulnerabilities.push({
        id: `npm:${pkgName}:${advisory.id}`,
        severity: severityMap[advisory.severity] || 'moderate',
        packageName: pkgName,
        packageVersion: advisory.vulnerable_versions,
        title: advisory.title,
        url: advisory.url,
        fixable: true,
      });
    }
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
  const pkg = readPackageJson(projectPath);
  const deps = getDirectDependencies(projectPath);
  await buildDepTree(projectPath);
  const auditResponse = await queryNpmAudit(projectPath, pkg.name, pkg.version, deps);
  
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
