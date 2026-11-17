import prompts from 'prompts';
import { type PatchaConfig } from '../../config/types.js';

export async function runSetupWizard(): Promise<PatchaConfig> {
  const response = await prompts([
    {
      type: 'select',
      name: 'llmProvider',
      message: 'Which AI provider will you use?',
      choices: [
        { title: 'Gemini (Google)', value: 'gemini' },
        { title: 'OpenAI', value: 'openai' },
        { title: 'Anthropic (Claude)', value: 'anthropic' },
        { title: 'None', value: 'none' },
      ],
      initial: 0,
    },
    {
      type: (prev) => (prev === 'none' ? null : 'password'),
      name: 'apiKey',
      message: (prev) => `Enter your ${prev} API key:`,
    },
    {
      type: 'confirm',
      name: 'level2',
      message: 'Enable Level 2 (Smart upgrade) fixes by default?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'level3',
      message: 'Enable Level 3 (AI-assisted) fixes by default?',
      initial: true,
    },
  ]);

  const config: PatchaConfig = {
    llmProvider: response.llmProvider,
    autoFix: {
      level1: true,
      level2: response.level2,
      level3: response.level3,
    },
  };

  if (response.apiKey) {
    config.apiKeys = {
      [response.llmProvider]: response.apiKey,
    };
  }

  return config;
}
