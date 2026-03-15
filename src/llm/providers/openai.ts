import OpenAI from 'openai';
import type { LLMProvider, LLMRequest, LLMResponse } from './interface.js';

export class OpenAIProvider implements LLMProvider {
  name = 'openai';
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  isConfigured(): boolean {
    return !!this.client.apiKey;
  }

  async complete(request: LLMRequest): Promise<LLMResponse> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: request.prompt }],
      max_tokens: request.maxTokens || 1024,
      temperature: request.temperature || 0.7,
    });

    const choice = completion.choices[0];
    const content = choice.message.content || '';

    return {
      content,
      usage: completion.usage ? {
        inputTokens: completion.usage.prompt_tokens,
        outputTokens: completion.usage.completion_tokens,
      } : undefined,
    };
  }
}
