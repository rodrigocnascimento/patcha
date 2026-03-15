import { fetch } from 'undici';
import type { NpmAuditResponse, Advisory } from './types.js';

const NPM_AUDIT_API = process.env.NPM_AUDIT_API || 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk';

export async function queryNpmAudit(
  _projectPath: string,
  _projectName: string, 
  _projectVersion: string, 
  _dependencies: Record<string, string>
): Promise<NpmAuditResponse> {
  const packageLock = await getPackageLockVersions(_projectPath);
  
  const packageVersions: Record<string, string[]> = {};
  
  for (const [name, info] of Object.entries(packageLock)) {
    if (info.version) {
      if (!packageVersions[name]) {
        packageVersions[name] = [];
      }
      if (!packageVersions[name].includes(info.version)) {
        packageVersions[name].push(info.version);
      }
    }
  }

  const response = await fetch(NPM_AUDIT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(packageVersions),
  });

  if (!response.ok) {
    throw new Error(`npm audit API error: ${response.status} ${response.statusText}`);
  }

  const advisories = await response.json() as Record<string, Advisory[]>;
  
  return {
    auditReportVersion: 2,
    vulnerabilities: advisories,
  };
}

async function getPackageLockVersions(projectPath: string): Promise<Record<string, { version: string }>> {
  const { readFileSync } = await import('fs');
  const { resolve } = await import('path');
  
  const lockPath = resolve(projectPath, 'package-lock.json');
  const content = readFileSync(lockPath, 'utf-8');
  const lock = JSON.parse(content);
  
  const versions: Record<string, { version: string }> = {};
  
  function collectDeps(deps: Record<string, any>) {
    for (const [name, info] of Object.entries(deps)) {
      if (info.version) {
        versions[name] = { version: info.version };
      }
      if (info.dependencies) {
        collectDeps(info.dependencies);
      }
    }
  }
  
  if (lock.packages) {
    for (const [path, pkg] of Object.entries(lock.packages)) {
      if (path && pkg && typeof pkg === 'object' && 'version' in pkg) {
        const pkgObj = pkg as { name?: string; version: string };
        const name = pkgObj.name || path.split('node_modules/').pop()?.split('/')[0];
        if (name) {
          versions[name] = { version: pkgObj.version };
        }
      }
    }
  } else if (lock.dependencies) {
    collectDeps(lock.dependencies);
  }
  
  return versions;
}
