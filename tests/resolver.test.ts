import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { resolve } from '../src/scanner/resolver/index.js';
import * as configModule from '../src/config/index.js';
import * as llmModule from '../src/llm/index.js';
import * as level1Module from '../src/scanner/resolver/level1.js';
import { MissingConfigurationError } from '../src/utils/errors.js';
import type { Vulnerability } from '../src/scanner/types.js';

vi.mock('../src/config/index.js');
vi.mock('../src/llm/index.js');
vi.mock('../src/scanner/resolver/level1.js');
vi.mock('../src/scanner/resolver/level2.js');
vi.mock('../src/scanner/resolver/level3.js');

describe('Resolver', () => {
  const mockVuln: Vulnerability = {
    id: 'test-1',
    severity: 'high',
    packageName: 'test-pkg',
    packageVersion: '1.0.0',
    title: 'Test Vuln',
    url: '',
    fixable: true,
  };

  beforeEach(() => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'none',
      autoFix: { level1: true, level2: false, level3: false },
    });
    vi.mocked(level1Module.canResolveLevel1).mockReturnValue(true);
    vi.mocked(level1Module.resolveLevel1).mockResolvedValue({
      level: 1,
      vulnerability: mockVuln,
      action: 'auto_fixed',
      confidence: 1,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw MissingConfigurationError if AI is requested but no provider configured', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'none', // No provider
      autoFix: { level1: true, level2: false, level3: false },
    });

    await expect(resolve([mockVuln], { projectPath: '/', useAI: true, dryRun: false }))
      .rejects
      .toThrow(MissingConfigurationError);
  });

  it('should throw MissingConfigurationError if AI is requested but API key is missing', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'openai',
      autoFix: { level1: true, level2: false, level3: false },
    });
    vi.mocked(llmModule.isValidProvider).mockReturnValue(true);
    vi.mocked(configModule.getApiKey).mockReturnValue(undefined); // Missing key

    await expect(resolve([mockVuln], { projectPath: '/', useAI: true, dryRun: false }))
      .rejects
      .toThrow(MissingConfigurationError);
  });

  it('should proceed if AI is requested and properly configured', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'openai',
      autoFix: { level1: true, level2: false, level3: false },
    });
    vi.mocked(llmModule.isValidProvider).mockReturnValue(true);
    vi.mocked(configModule.getApiKey).mockReturnValue('valid_key');
    vi.mocked(llmModule.getProvider).mockReturnValue({} as any); // Mock provider

    const summary = await resolve([mockVuln], { projectPath: '/', useAI: true, dryRun: false });
    
    expect(summary.total).toBe(1);
    expect(summary.resolved).toBe(1);
    expect(summary.level1Count).toBe(1);
  });
});
