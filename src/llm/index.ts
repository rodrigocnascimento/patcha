import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import type { LLMProvider, LLMProviderClass } from './providers/interface.js';
import { AnthropicProvider } from './providers/anthropic.js';
import { GoogleProvider } from './providers/google.js';
import { OpenAIProvider } from './providers/openai.js';

const PROVIDERS: Record<string, LLMProviderClass> = {
  anthropic: AnthropicProvider,
  google: GoogleProvider,
  openai: OpenAIProvider,
};

export function getProvider(name: string, apiKey: string): LLMProvider {
  const ProviderClass = PROVIDERS[name];
  if (!ProviderClass) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return new ProviderClass(apiKey);
}

export function listProviders(): string[] {
  return Object.keys(PROVIDERS);
}

export function isValidProvider(name: string): boolean {
  return name in PROVIDERS;
}

export interface LLMCache {
  [key: string]: {
    response: string;
    timestamp: number;
  };
}

const CACHE_TTL = 24 * 60 * 60 * 1000;

function getCachePath(): string {
  return resolve(process.env.HOME || process.env.USERPROFILE || '', '.patcha', 'llm-cache.json');
}

export function getCachedResponse(prompt: string): string | null {
  const cachePath = getCachePath();
  
  if (!existsSync(cachePath)) {
    return null;
  }

  try {
    const content = readFileSync(cachePath, 'utf-8');
    const cache: LLMCache = JSON.parse(content);
    const hash = hashPrompt(prompt);
    const entry = cache[hash];

    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > CACHE_TTL) {
      return null;
    }

    return entry.response;
  } catch {
    return null;
  }
}

export function setCachedResponse(prompt: string, response: string): void {
  const cachePath = getCachePath();
  let cache: LLMCache = {};

  if (existsSync(cachePath)) {
    try {
      const content = readFileSync(cachePath, 'utf-8');
      cache = JSON.parse(content);
    } catch {
      // Ignore errors
    }
  }

  const hash = hashPrompt(prompt);
  cache[hash] = {
    response,
    timestamp: Date.now(),
  };

  const dir = resolve(cachePath, '..');
  mkdirSync(dir, { recursive: true });
  writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

function hashPrompt(prompt: string): string {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    const char = prompt.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export { getProvider as createProvider };
