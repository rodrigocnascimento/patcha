import { Arborist } from '@npmcli/arborist';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { ArboristNode } from './types.js';

export async function buildDepTree(projectPath: string): Promise<ArboristNode[]> {
  const arb = new Arborist({
    path: projectPath,
    legacyPeerDeps: false,
  });

  const tree = await arb.loadActual();

  const nodes: ArboristNode[] = [];
  const visited = new Set<string>();

  function collectNodes(node: any) {
    const key = `${node.name}@${node.version}`;
    if (visited.has(key)) return;
    visited.add(key);

    nodes.push({
      name: node.name,
      version: node.version,
      resolved: node.resolved,
      dev: node.dev,
      optional: node.optional,
      dependencies: node.edgesOut?.size > 0 
        ? Object.fromEntries(
            Array.from(node.edgesOut.values()).map((edge: any) => [edge.name, edge.spec])
          )
        : undefined,
    });

    if (node.children) {
      for (const child of node.children.values()) {
        collectNodes(child);
      }
    }
  }

  collectNodes(tree);
  return nodes;
}

export function readPackageJson(projectPath: string): any {
  const packagePath = resolve(projectPath, 'package.json');
  const content = readFileSync(packagePath, 'utf-8');
  return JSON.parse(content);
}
