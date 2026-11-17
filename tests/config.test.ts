import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadConfig, getApiKey, isProviderConfigured } from '../src/config/index.js';
import { cosmiconfigSync } from 'cosmiconfig';

vi.mock('cosmiconfig', () => {
  const mockSearch = vi.fn();
  return {
    cosmiconfigSync: vi.fn(() => ({
      search: mockSearch,
    })),
    __mockSearch: mockSearch, // Export it so we can access it in tests
  };
});

import * as cosmiconfigModule from 'cosmiconfig';

describe('Config Loader', () => {
  let mockSearch: any;

  beforeEach(() => {
    mockSearch = (cosmiconfigModule as any).__mockSearch;
    mockSearch.mockReset();
    vi.stubEnv('PATCHA_API_KEY_TEST', 'env_secret_key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('should return default config if no file found', () => {
    mockSearch.mockReturnValue(null);
    const config = loadConfig('/fake/path');
    
    expect(config.llmProvider).toBe('none');
    expect(config.autoFix.level1).toBe(true);
    expect(config.autoFix.level2).toBe(false);
    expect(config.autoFix.level3).toBe(false);
  });

  it('should return merged config when valid config file is found', () => {
    mockSearch.mockReturnValue({
      config: {
        llmProvider: 'openai',
        autoFix: {
          level2: true,
        },
      },
    });

    const config = loadConfig('/fake/path');
    
    expect(config.llmProvider).toBe('openai');
    expect(config.autoFix.level1).toBe(true); // Should retain default
    expect(config.autoFix.level2).toBe(true); // Overridden
    expect(config.autoFix.level3).toBe(false); // Retained default
  });

  it('should return default config if config file is empty', () => {
    mockSearch.mockReturnValue({ isEmpty: true });
    const config = loadConfig('/fake/path');
    expect(config.llmProvider).toBe('none');
  });

  describe('getApiKey', () => {
    it('should return undefined if provider key is not set', () => {
      mockSearch.mockReturnValue(null);
      expect(getApiKey('/fake/path', 'openai')).toBeUndefined();
    });

    it('should return direct string key', () => {
      mockSearch.mockReturnValue({
        config: {
          apiKeys: {
            openai: 'direct_key',
          },
        },
      });
      expect(getApiKey('/fake/path', 'openai')).toBe('direct_key');
    });

    it('should resolve environment variable key', () => {
      mockSearch.mockReturnValue({
        config: {
          apiKeys: {
            openai: '${PATCHA_API_KEY_TEST}',
          },
        },
      });
      expect(getApiKey('/fake/path', 'openai')).toBe('env_secret_key');
    });

    it('should return undefined if environment variable is missing', () => {
      mockSearch.mockReturnValue({
        config: {
          apiKeys: {
            openai: '${MISSING_ENV_VAR}',
          },
        },
      });
      expect(getApiKey('/fake/path', 'openai')).toBeUndefined();
    });
  });

  describe('isProviderConfigured', () => {
    it('should return true if key exists', () => {
      mockSearch.mockReturnValue({
        config: {
          apiKeys: {
            openai: 'key',
          },
        },
      });
      expect(isProviderConfigured('/fake/path', 'openai')).toBe(true);
    });

    it('should return false if key does not exist', () => {
      mockSearch.mockReturnValue(null);
      expect(isProviderConfigured('/fake/path', 'openai')).toBe(false);
    });
  });
});
