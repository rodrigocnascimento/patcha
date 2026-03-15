import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMProvider, LLMRequest, LLMResponse } from './interface.js';

export class GoogleProvider implements LLMProvider {
  name = 'google';
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  isConfigured(): boolean {
    return !!this.client.apiKey;
  }

  async complete(request: LLMRequest): Promise<LLMResponse> {
    const model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(request.prompt);
    const response = result.response;
    const text = response.text();

    return {
      content: text,
    };
  }
}
