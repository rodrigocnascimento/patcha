import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runFixCommand } from '../src/cli/commands/fix.js';
import * as configModule from '../src/config/index.js';
import * as llmModule from '../src/llm/index.js';
import * as wizardModule from '../src/cli/ui/wizard.js';
import * as scannerModule from '../src/scanner/index.js';
import * as resolverModule from '../src/scanner/resolver/index.js';
import * as gitModule from '../src/utils/git.js';
import fs from 'fs';
import prompts from 'prompts';

vi.mock('prompts', () => ({
  default: vi.fn(),
}));

vi.mock('../src/config/index.js');
vi.mock('../src/llm/index.js');
vi.mock('../src/cli/ui/wizard.js');
vi.mock('../src/scanner/index.js');
vi.mock('../src/scanner/resolver/index.js');
vi.mock('../src/utils/git.js');

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    existsSync: vi.fn().mockReturnValue(true),
  };
});

describe('Command: fix', () => {
  let exitMock: any;

  beforeEach(() => {
    vi.mocked(prompts).mockReset();
    
    exitMock = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    
    vi.mocked(scannerModule.scan).mockResolvedValue({
      path: '/fake/path',
      timestamp: new Date(),
      vulnerabilities: [{ id: '1', severity: 'high', packageName: 'test', packageVersion: '1.0', title: 'Test', url: '', fixable: true }],
      summary: { critical: 0, high: 1, moderate: 0, low: 0, total: 1 }
    });

    vi.mocked(resolverModule.resolve).mockResolvedValue({
      total: 1,
      resolved: 1,
      level1Count: 1,
      level2Count: 0,
      level3Count: 0,
      failedCount: 0,
      results: []
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const runAction = async (options: any) => {
    await runFixCommand('/fake/path', options);
  };

  it('should throw MissingConfigurationError immediately if non-interactive and missing AI config', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'none',
      autoFix: { level1: true, level2: false, level3: false }
    });
    
    await runAction({ ai: true, auto: true });
    
    expect(exitMock).toHaveBeenCalledWith(2);
    expect(wizardModule.runSetupWizard).not.toHaveBeenCalled();
  });

  it('should prompt the user if interactive and missing AI config (user says no)', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'none',
      autoFix: { level1: true, level2: false, level3: false }
    });
    
    vi.mocked(prompts).mockResolvedValue({ runWizard: false });
    
    await runAction({ ai: true });
    
    expect(prompts).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(2);
    expect(wizardModule.runSetupWizard).not.toHaveBeenCalled();
  });

  it('should prompt the user and run wizard if interactive and missing AI config (user says yes)', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'none',
      autoFix: { level1: true, level2: false, level3: false }
    });
    
    vi.mocked(prompts).mockResolvedValue({ runWizard: true });
    
    vi.mocked(wizardModule.runSetupWizard).mockResolvedValue({
      llmProvider: 'openai',
      apiKeys: { openai: 'test' },
      autoFix: { level1: true, level2: true, level3: true }
    });
    
    await runAction({ ai: true });
    
    expect(prompts).toHaveBeenCalled();
    expect(wizardModule.runSetupWizard).toHaveBeenCalled();
    expect(configModule.saveConfig).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ llmProvider: 'openai' }));
    
    expect(exitMock).toHaveBeenCalledWith(0);
  });

  it('should proceed normally if AI config is already valid', async () => {
    vi.mocked(configModule.loadConfig).mockReturnValue({
      llmProvider: 'openai',
      apiKeys: { openai: 'test' },
      autoFix: { level1: true, level2: false, level3: false }
    });
    vi.mocked(llmModule.isValidProvider).mockReturnValue(true);
    vi.mocked(configModule.getApiKey).mockReturnValue('test-key');
    
    await runAction({ ai: true });
    
    expect(prompts).not.toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(0);
  });
});
