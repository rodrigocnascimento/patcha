import type { Vulnerability } from '../types.js';
import type { 
  ResolutionResult, 
  ResolutionSummary, 
  ResolutionContext,
  ResolutionLevel 
} from './types.js';
import { resolveLevel1, canResolveLevel1 } from './level1.js';
import { resolveLevel2 } from './level2.js';
import { resolveLevel3, needsLevel3 } from './level3.js';
import { getApiKey, loadConfig } from '../../config/index.js';
import { getProvider, isValidProvider } from '../../llm/index.js';
import type { LLMProvider } from '../../llm/providers/interface.js';
import { MissingConfigurationError } from '../../utils/errors.js';

export async function resolve(
  vulnerabilities: Vulnerability[],
  context: ResolutionContext
): Promise<ResolutionSummary> {
  const results: ResolutionResult[] = [];
  let level1Count = 0;
  let level2Count = 0;
  let level3Count = 0;
  let failedCount = 0;

  const config = loadConfig(context.projectPath);
  let provider: LLMProvider | null = null;

  if (context.useAI) {
    const providerName = config.llmProvider;
    if (providerName === 'none' || !isValidProvider(providerName)) {
      throw new MissingConfigurationError(
        "AI provider not specified. Please run 'patcha init' or set 'llmProvider' in your configuration."
      );
    }
    
    const apiKey = getApiKey(context.projectPath, providerName);
    if (!apiKey) {
      throw new MissingConfigurationError(
        `API key for '${providerName}' not found. Please run 'patcha init' or configure it.`
      );
    }
    provider = getProvider(providerName, apiKey);
  }

  for (const vuln of vulnerabilities) {
    let result: ResolutionResult | null = null;

    if (config.autoFix.level1 && canResolveLevel1(vuln)) {
      if (!context.dryRun) {
        result = await resolveLevel1(vuln, context.projectPath);
      } else {
        result = {
          level: 1,
          vulnerability: vuln,
          action: 'auto_fixed',
          newVersion: vuln.fixVersion,
          confidence: 0.95,
          explanation: `[DRY RUN] Would auto-fix ${vuln.packageName}`,
        };
      }
      if (result) {
        level1Count++;
      }
    }

    if (!result && config.autoFix.level2 && !canResolveLevel1(vuln)) {
      result = await resolveLevel2(vuln, context.projectPath);
      if (result) {
        level2Count++;
      }
    }

    if (!result && context.useAI && provider && needsLevel3(vuln)) {
      result = await resolveLevel3(vuln, provider, context.projectPath);
      level3Count++;
    }

    if (!result) {
      failedCount++;
      result = {
        level: 0 as ResolutionLevel,
        vulnerability: vuln,
        action: 'no_fix_available',
        confidence: 0,
        explanation: 'No automatic fix available. Manual intervention required.',
      };
    }

    results.push(result);
  }

  return {
    total: vulnerabilities.length,
    resolved: results.filter(r => r.action !== 'no_fix_available').length,
    level1Count,
    level2Count,
    level3Count,
    failedCount,
    results,
  };
}

export function getResolutionSummary(
  vulnerabilities: Vulnerability[],
  context: ResolutionContext
): {
  level1: number;
  level2: number;
  level3: number;
  autoFixable: number;
  needsAI: number;
} {
  const config = loadConfig(context.projectPath);
  
  let level1 = 0;
  let level2 = 0;
  let level3 = 0;
  let autoFixable = 0;
  let needsAI = 0;

  for (const vuln of vulnerabilities) {
    if (config.autoFix.level1 && canResolveLevel1(vuln)) {
      level1++;
      autoFixable++;
    } else if (config.autoFix.level2) {
      level2++;
      autoFixable++;
    } else {
      level3++;
      needsAI++;
    }
  }

  return { level1, level2, level3, autoFixable, needsAI };
}
