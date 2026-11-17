import { describe, it, expect, vi } from 'vitest';
import { runSetupWizard } from '../src/cli/ui/wizard.js';
import prompts from 'prompts';

vi.mock('prompts', () => ({
  default: vi.fn(),
}));

describe('Setup Wizard', () => {
  it('should return a config based on user input', async () => {
    vi.mocked(prompts).mockResolvedValue({
      llmProvider: 'openai',
      apiKey: 'test-key-123',
      level2: true,
      level3: false,
    });

    const config = await runSetupWizard();

    expect(config.llmProvider).toBe('openai');
    expect(config.apiKeys).toBeDefined();
    expect(config.apiKeys?.openai).toBe('test-key-123');
    expect(config.autoFix.level1).toBe(true);
    expect(config.autoFix.level2).toBe(true);
    expect(config.autoFix.level3).toBe(false);
  });

  it('should omit apiKeys if provider is none', async () => {
    vi.mocked(prompts).mockResolvedValue({
      llmProvider: 'none',
      apiKey: undefined,
      level2: true,
      level3: true,
    });

    const config = await runSetupWizard();

    expect(config.llmProvider).toBe('none');
    expect(config.apiKeys).toBeUndefined();
    expect(config.autoFix.level2).toBe(true);
    expect(config.autoFix.level3).toBe(true);
  });
});
