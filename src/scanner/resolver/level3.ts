import type { Vulnerability } from '../types.js';
import type { ResolutionResult, ResolutionAction } from './types.js';
import type { LLMProvider } from '../../llm/providers/interface.js';
import { getCachedResponse, setCachedResponse } from '../../llm/index.js';
import { enrichVulnerabilityContext, buildEnhancedPrompt } from '../../llm/context.js';

export async function resolveLevel3(
  vulnerability: Vulnerability,
  provider: LLMProvider,
  projectPath?: string
): Promise<ResolutionResult> {
  const context = projectPath 
    ? await enrichVulnerabilityContext(vulnerability, projectPath)
    : { vulnerability };

  const prompt = projectPath 
    ? buildEnhancedPrompt(context)
    : buildBasicPrompt(vulnerability);

  const cacheKey = JSON.stringify({ vulnerability: vulnerability.id, prompt });
  let result: ResolutionResult;

  const cached = getCachedResponse(cacheKey);

  if (cached) {
    result = parseResponse(cached, vulnerability);
  } else {
    const response = await provider.complete({
      prompt,
      maxTokens: 512,
      temperature: 0.3,
    });

    setCachedResponse(cacheKey, response.content);
    result = parseResponse(response.content, vulnerability);
  }

  return result;
}

function buildBasicPrompt(vulnerability: Vulnerability): string {
  return `Vulnerability Details:
- Package: ${vulnerability.packageName}
- Current Version: ${vulnerability.packageVersion}
- Severity: ${vulnerability.severity}
- Title: ${vulnerability.title}
- URL: ${vulnerability.url}

Provide a resolution recommendation in JSON format.`;
}

function parseResponse(
  content: string,
  vulnerability: Vulnerability
): ResolutionResult {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return createFallbackResult(vulnerability);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      level: 3,
      vulnerability,
      action: parsed.action as ResolutionAction || 'ai_analysis',
      newVersion: parsed.newVersion,
      alternative: parsed.alternative,
      alternativeStars: parsed.alternativeStars,
      confidence: parsed.confidence || 0.5,
      explanation: parsed.explanation || 'AI analysis completed',
    };
  } catch {
    return createFallbackResult(vulnerability);
  }
}

function createFallbackResult(vulnerability: Vulnerability): ResolutionResult {
  return {
    level: 3,
    vulnerability,
    action: 'ai_analysis',
    confidence: 0.3,
    explanation: 'AI analysis completed but response parsing failed. Manual review recommended.',
  };
}

export function needsLevel3(vulnerability: Vulnerability): boolean {
  return !vulnerability.fixable || vulnerability.severity === 'critical' || vulnerability.severity === 'high';
}
