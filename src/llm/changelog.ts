import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export async function fetchChangelog(
  packageName: string,
  currentVersion: string,
  targetVersion?: string
): Promise<string | null> {
  const npmPackageUrl = `https://registry.npmjs.org/${packageName}`;
  
  try {
    const response = await fetch(npmPackageUrl);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json() as {
      versions: Record<string, { changelog?: string }>;
      'dist-tags': Record<string, string>;
    };
    
    const latestVersion = targetVersion || data['dist-tags']?.latest;
    if (!latestVersion || !data.versions?.[latestVersion]) {
      return null;
    }

    const packageInfo = data.versions[latestVersion];
    
    if (packageInfo.changelog) {
      return packageInfo.changelog;
    }

    const changelogUrls = [
      `https://raw.githubusercontent.com/${packageName}/main/CHANGELOG.md`,
      `https://raw.githubusercontent.com/${packageName}/main/changelog.md`,
      `https://raw.githubusercontent.com/${packageName}/master/CHANGELOG.md`,
      `https://raw.githubusercontent.com/${packageName}/master/changelog.md`,
    ];

    for (const url of changelogUrls) {
      try {
        const changelogResponse = await fetch(url);
        if (changelogResponse.ok) {
          const changelog = await changelogResponse.text();
          return extractRelevantChangelog(changelog, currentVersion, targetVersion || latestVersion);
        }
      } catch {
        continue;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function extractRelevantChangelog(
  changelog: string,
  fromVersion: string,
  toVersion: string
): string {
  const lines = changelog.split('\n');
  const relevantLines: string[] = [];
  let inRelevantSection = false;

  const fromMajor = parseInt(fromVersion.replace(/[^0-9].*/, ''), 10) || 0;
  const toMajor = parseInt(toVersion.replace(/[^0-9].*/, ''), 10) || 0;

  for (const line of lines) {
    const versionMatch = line.match(/^#{1,3}\s+\[?v?(\d+)\.(\d+)\.(\d+)/i);
    
    if (versionMatch) {
      const versionMajor = parseInt(versionMatch[1], 10);
      
      if (versionMajor >= fromMajor && versionMajor <= toMajor) {
        inRelevantSection = true;
      } else if (versionMajor < fromMajor) {
        break;
      }
    }

    if (inRelevantSection) {
      relevantLines.push(line);
    }
  }

  return relevantLines.slice(0, 50).join('\n');
}

export function getChangelogFromNodeModules(
  projectPath: string,
  packageName: string
): string | null {
  const possiblePaths = [
    resolve(projectPath, 'node_modules', packageName, 'CHANGELOG.md'),
    resolve(projectPath, 'node_modules', packageName, 'changelog.md'),
    resolve(projectPath, 'node_modules', packageName, 'CHANGELOG'),
    resolve(projectPath, 'node_modules', packageName, 'HISTORY.md'),
    resolve(projectPath, 'node_modules', packageName, 'README.md'),
  ];

  for (const filePath of possiblePaths) {
    if (existsSync(filePath)) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        return content.slice(0, 5000);
      } catch {
        continue;
      }
    }
  }

  return null;
}
