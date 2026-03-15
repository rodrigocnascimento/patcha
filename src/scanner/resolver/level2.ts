import { fetch } from 'undici';
import type { Vulnerability } from '../types.js';
import type { ResolutionResult } from './types.js';

interface NpmPackageInfo {
  version: string;
  'dist-tags': Record<string, string>;
  versions: Record<string, unknown>;
}

export async function resolveLevel2(
  vulnerability: Vulnerability,
  _projectPath: string
): Promise<ResolutionResult | null> {
  const packageName = vulnerability.packageName;
  const currentVersion = vulnerability.packageVersion;
  
  if (!currentVersion) {
    return null;
  }

  const latestVersion = await getLatestVersion(packageName);
  if (!latestVersion) {
    return null;
  }

  const currentMajor = getMajorVersion(currentVersion);
  const latestMajor = getMajorVersion(latestVersion);

  if (latestMajor <= currentMajor) {
    return null;
  }

  const breakingChanges = await checkBreakingChanges(
    packageName,
    currentVersion,
    latestVersion
  );

  if (breakingChanges.length === 0 || isLowRisk(breakingChanges)) {
    return {
      level: 2,
      vulnerability,
      action: 'upgrade',
      newVersion: latestVersion,
      confidence: 0.8,
      explanation: `Upgraded ${packageName} from ${currentVersion} to ${latestVersion}. Minor risk detected.`,
    };
  }

  return {
    level: 2,
    vulnerability,
    action: 'upgrade',
    newVersion: latestVersion,
    confidence: 0.4,
    explanation: `Major upgrade available but with breaking changes: ${breakingChanges.join(', ')}. Manual review recommended.`,
  };
}

async function getLatestVersion(packageName: string): Promise<string | null> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json() as NpmPackageInfo;
    return data.version || null;
  } catch {
    return null;
  }
}

function getMajorVersion(version: string): number {
  const match = version.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

async function checkBreakingChanges(
  packageName: string,
  fromVersion: string,
  toVersion: string
): Promise<string[]> {
  const breakingChanges: string[] = [];

  try {
    const response = await fetch(
      `https://registry.npmjs.org/${packageName}/${fromVersion}`
    );
    if (!response.ok) {
      return breakingChanges;
    }

    const data = await response.json() as { dependencies?: Record<string, string> };
    if (!data.dependencies) {
      return breakingChanges;
    }

    const newResponse = await fetch(
      `https://registry.npmjs.org/${packageName}/${toVersion}`
    );
    if (!newResponse.ok) {
      return breakingChanges;
    }

    const newData = await newResponse.json() as { dependencies?: Record<string, string> };
    const newDeps = newData.dependencies || {};

    for (const [dep, version] of Object.entries(data.dependencies || {})) {
      const newDepVersion = newDeps[dep];
      if (newDepVersion && newDepVersion !== version) {
        const oldMajor = getMajorVersion(version);
        const newMajor = getMajorVersion(newDepVersion);
        if (newMajor > oldMajor) {
          breakingChanges.push(`${dep}: ${version} → ${newDepVersion}`);
        }
      }
    }
  } catch {
    // Ignore errors
  }

  return breakingChanges;
}

function isLowRisk(changes: string[]): boolean {
  const highRisk = ['express', 'react', 'vue', 'angular', 'lodash', 'moment'];
  return changes.every(change => 
    !highRisk.some(risk => change.toLowerCase().includes(risk))
  );
}
