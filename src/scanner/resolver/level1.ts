import { execSync } from 'child_process';
import type { Vulnerability } from '../types.js';
import type { ResolutionResult } from './types.js';

export async function resolveLevel1(
  vulnerability: Vulnerability,
  projectPath: string
): Promise<ResolutionResult | null> {
  if (!vulnerability.fixable || !vulnerability.fixVersion) {
    return null;
  }

  const currentVersion = vulnerability.packageVersion;
  const newVersion = vulnerability.fixVersion;

  const currentMajor = parseInt(currentVersion.replace(/[^0-9].*/, ''), 10) || 0;
  const newMajor = parseInt(newVersion.replace(/[^0-9].*/, ''), 10) || 0;

  if (newMajor > currentMajor + 1) {
    return null;
  }

  try {
    const packageName = vulnerability.packageName;
    execSync(`npm install ${packageName}@${newVersion} --save`, {
      cwd: projectPath,
      stdio: 'ignore',
    });

    return {
      level: 1,
      vulnerability,
      action: 'auto_fixed',
      newVersion,
      confidence: 0.95,
      explanation: `Auto-upgraded ${packageName} from ${currentVersion} to ${newVersion}`,
    };
  } catch {
    return null;
  }
}

export function canResolveLevel1(vulnerability: Vulnerability): boolean {
  return vulnerability.fixable === true && 
         vulnerability.fixVersion !== undefined &&
         vulnerability.packageVersion !== undefined;
}
