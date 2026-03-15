import Anthropic from '@anthropic-ai/sdk';
import type { LLMProvider, LLMRequest, LLMResponse } from './interface.js';

export class AnthropicProvider implements LLMProvider {
  name = 'anthropic';
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  isConfigured(): boolean {
    return !!this.client.apiKey;
  }

  async complete(request: LLMRequest): Promise<LLMResponse> {
    const message = await this.client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: request.maxTokens || 1024,
      temperature: request.temperature || 0.7,
      messages: [
        { role: 'user', content: request.prompt }
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic');
    }

    return {
      content: content.text,
      usage: message.usage ? {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      } : undefined,
    };
  }
}
