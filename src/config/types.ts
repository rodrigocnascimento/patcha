import { z } from 'zod';

export const LLMProviderSchema = z.enum(['anthropic', 'google', 'openai', 'none']);

export const AutoFixConfigSchema = z.object({
  level1: z.boolean().default(true),
  level2: z.boolean().default(false),
  level3: z.boolean().default(false),
});

export const PatchaConfigSchema = z.object({
  llmProvider: LLMProviderSchema.default('none'),
  apiKeys: z.record(z.string()).optional(),
  autoFix: AutoFixConfigSchema.default({}),
});

export type LLMProvider = z.infer<typeof LLMProviderSchema>;
export type AutoFixConfig = z.infer<typeof AutoFixConfigSchema>;
export type PatchaConfig = z.infer<typeof PatchaConfigSchema>;
