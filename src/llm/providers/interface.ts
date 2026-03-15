export interface LLMRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface LLMProvider {
  name: string;
  complete(request: LLMRequest): Promise<LLMResponse>;
  isConfigured(): boolean;
}

export interface LLMProviderClass {
  new (apiKey: string): LLMProvider;
}

export const PROVIDER_REGISTRY: Record<string, LLMProviderClass> = {};
