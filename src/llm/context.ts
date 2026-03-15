import { execSync } from 'child_process';
import { fetchChangelog } from './changelog.js';
import type { Vulnerability } from '../scanner/types.js';

export interface LLMContext {
  vulnerability: Vulnerability;
  changelog?: string;
  dependencyPath?: string;
  alternativePackages?: AlternativePackage[];
}

export interface AlternativePackage {
  name: string;
  stars: number;
  downloads: number;
  description: string;
}

export async function enrichVulnerabilityContext(
  vulnerability: Vulnerability,
  projectPath: string
): Promise<LLMContext> {
  const context: LLMContext = {
    vulnerability,
  };

  try {
    const changelog = await fetchChangelog(
      vulnerability.packageName,
      vulnerability.packageVersion,
      vulnerability.fixVersion
    );
    if (changelog) {
      context.changelog = changelog;
    }
  } catch {
    // Changelog not available, continue without it
  }

  try {
    context.dependencyPath = getDependencyPath(projectPath, vulnerability.packageName);
  } catch {
    // Dependency path not available
  }

  return context;
}

function getDependencyPath(projectPath: string, packageName: string): string {
  try {
    const result = execSync(
      `npm ls ${packageName} --all --parseable`,
      { cwd: projectPath, encoding: 'utf-8', maxBuffer: 1024 * 1024 }
    );
    const lines = result.trim().split('\n').filter(Boolean);
    if (lines.length > 0) {
      return lines[0].replace(projectPath + '/node_modules/', '').replace(`/${packageName}`, '');
    }
  } catch {
    // Package not found in dependency tree
  }
  return 'unknown';
}

export function buildEnhancedPrompt(context: LLMContext): string {
  const { vulnerability, changelog, dependencyPath } = context;

  let prompt = `Vulnerability Details:
- Package: ${vulnerability.packageName}
- Current Version: ${vulnerability.packageVersion}
- Severity: ${vulnerability.severity}
- Title: ${vulnerability.title}
- URL: ${vulnerability.url}
- CVE: ${vulnerability.cves?.join(', ') || 'N/A'}`;

  if (dependencyPath && dependencyPath !== 'unknown') {
    prompt += `\n- Dependency Path: ${dependencyPath}`;
  }

  if (changelog) {
    prompt += `\n\nRelevant Changelog (from ${vulnerability.packageVersion} to ${vulnerability.fixVersion || 'latest'}):\n${changelog}`;
  }

  prompt += `\n\nBased on the vulnerability details and changelog (if available), provide a resolution recommendation in JSON format:
{
  "action": "upgrade" | "replace" | "ai_analysis" | "no_fix_available",
  "newVersion": "version string if upgrading",
  "alternative": "alternative package name if replacing",
  "alternativeStars": 0,
  "confidence": 0.0-1.0,
  "explanation": "brief explanation"
}`;

  return prompt;
}
