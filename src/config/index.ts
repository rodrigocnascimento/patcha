import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { PatchaConfigSchema, type PatchaConfig } from './types.js';

const DEFAULT_CONFIG: PatchaConfig = {
  llmProvider: 'none',
  autoFix: {
    level1: true,
    level2: false,
    level3: false,
  },
};

export function getConfigPath(projectPath: string): string {
  return resolve(projectPath, 'patcha.config.json');
}

export function loadConfig(projectPath: string): PatchaConfig {
  const configPath = getConfigPath(projectPath);
  
  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const content = readFileSync(configPath, 'utf-8');
    const raw = JSON.parse(content);
    return PatchaConfigSchema.parse(raw);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(projectPath: string, config: PatchaConfig): void {
  const configPath = getConfigPath(projectPath);
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
