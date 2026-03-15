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

  function collectNodes(node: any, depth: number = 0) {
    const key = `${node.name}@${node.version}`;
    if (visited.has(key)) return;
    visited.add(key);

    const dependencies: Record<string, string> = {};
    if (node.edgesOut) {
      for (const [name, edge] of node.edgesOut) {
        dependencies[name] = edge.spec;
      }
    }

    nodes.push({
      name: node.name,
      version: node.version,
      resolved: node.resolved,
      dev: node.dev,
      optional: node.optional,
      dependencies: Object.keys(dependencies).length > 0 ? dependencies : undefined,
    });

    if (depth < 3) {
      if (node.children) {
        for (const child of node.children.values()) {
          collectNodes(child, depth + 1);
        }
      }
      if (node.target) {
        collectNodes(node.target, depth + 1);
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

export function getDirectDependencies(projectPath: string): Record<string, string> {
  const pkg = readPackageJson(projectPath);
  return {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
}
