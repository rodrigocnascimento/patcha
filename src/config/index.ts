import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import { PatchaConfigSchema, type PatchaConfig } from './types.js';

const MODULE_NAME = 'patcha';
const explorer = cosmiconfigSync(MODULE_NAME);

const DEFAULT_CONFIG: PatchaConfig = {
  llmProvider: 'none',
  autoFix: {
    level1: true,
    level2: false,
    level3: false,
  },
};

export function getConfigPath(projectPath: string): string {
  const result = explorer.search(projectPath);
  return result?.filepath || resolve(projectPath, 'patcha.config.json');
}

export function loadConfig(projectPath: string): PatchaConfig {
  const result = explorer.search(projectPath);
  
  if (!result || result.isEmpty) {
    return DEFAULT_CONFIG;
  }

  try {
    const parsed = PatchaConfigSchema.parse(result.config);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(projectPath: string, config: PatchaConfig): void {
  const configPath = resolve(projectPath, 'patcha.config.json');
  const validated = PatchaConfigSchema.parse(config);
  writeFileSync(configPath, JSON.stringify(validated, null, 2));
}

export function getApiKey(projectPath: string, provider: string): string | undefined {
  const config = loadConfig(projectPath);
  const key = config.apiKeys?.[provider];
  
  if (!key) {
    return undefined;
  }

  if (key.startsWith('${') && key.endsWith('}')) {
    const envVar = key.slice(2, -1);
    return process.env[envVar];
  }

  return key;
}

export function isProviderConfigured(projectPath: string, provider: string): boolean {
  const apiKey = getApiKey(projectPath, provider);
  return !!apiKey;
}
