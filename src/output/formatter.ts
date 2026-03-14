import pc from 'picocolors';
import type { ScanResult, Vulnerability } from '../scanner/types.js';

function severityColor(severity: string): (str: string) => string {
  const colors: Record<string, (str: string) => string> = {
    critical: pc.bgRed,
    high: pc.red,
    moderate: pc.yellow,
    low: pc.blue,
  };
  return colors[severity] || pc.white;
}

function severityLabel(severity: string): string {
  const labels: Record<string, string> = {
    critical: 'CRITICAL',
    high: 'HIGH',
    moderate: 'MODERATE',
    low: 'LOW',
  };
  return labels[severity] || severity;
}

export function formatVulnerability(vuln: Vulnerability): string {
  const color = severityColor(vuln.severity);
  const label = severityLabel(vuln.severity);
  
  return [
    color(` ${label} `),
    pc.bold(vuln.title),
    pc.gray(` - ${vuln.packageName}`),
    vuln.fixable ? pc.green(` (fix: ${vuln.fixVersion})`) : '',
  ].join(' ');
}

export function formatSummary(summary: ScanResult['summary']): string {
  const lines: string[] = [];
  
  lines.push(pc.bold('\nVulnerability Summary\n'));
  lines.push(`${pc.red('●')} Critical: ${summary.critical}`);
  lines.push(`${pc.red('●')} High: ${summary.high}`);
  lines.push(`${pc.yellow('●')} Moderate: ${summary.moderate}`);
  lines.push(`${pc.blue('●')} Low: ${summary.low}`);
  lines.push(pc.bold(`\nTotal: ${summary.total}`));
  
  return lines.join('\n');
}

export function format(result: ScanResult): string {
  const lines: string[] = [];
  
  lines.push(pc.bold(pc.underline(`\nScan Results for: ${result.path}\n`)));
  lines.push(pc.gray(`Scanned at: ${result.timestamp.toISOString()}`));
  
  if (result.vulnerabilities.length === 0) {
    lines.push(pc.green(pc.bold('\n✓ No vulnerabilities found!\n')));
    return lines.join('\n');
  }
  
  lines.push(formatSummary(result.summary));
  lines.push(pc.bold('\nVulnerabilities:\n'));
  
  const sorted = [...result.vulnerabilities].sort((a, b) => {
    const order = { critical: 0, high: 1, moderate: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });
  
  for (const vuln of sorted.slice(0, 20)) {
    lines.push(formatVulnerability(vuln));
  }
  
  if (result.vulnerabilities.length > 20) {
    lines.push(pc.gray(`\n... and ${result.vulnerabilities.length - 20} more`));
  }
  
  return lines.join('\n');
}
