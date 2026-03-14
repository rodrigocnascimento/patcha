import { fetch } from 'undici';
import type { NpmAuditResponse } from './types.js';

const NPM_AUDIT_API = process.env.NPM_AUDIT_API || 'https://registry.npmjs.org/-/npm/v1/security/audits';

export async function queryNpmAudit(depTree: any[]): Promise<NpmAuditResponse> {
  const payload = {
    name: 'patcha',
    version: '1.0.0',
    requires: Object.fromEntries(
      depTree
        .filter(n => !n.dev)
        .map(n => [n.name, n.version])
    ),
    dependencies: Object.fromEntries(
      depTree
        .filter(n => !n.dev)
        .map(n => [n.name, n.version])
    ),
  };

  const response = await fetch(NPM_AUDIT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`npm audit API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<NpmAuditResponse>;
}
