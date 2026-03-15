import { Command } from 'commander';
import { resolve as pathResolve } from 'path';
import { existsSync } from 'fs';
import pc from 'picocolors';
import { loadConfig, saveConfig, getConfigPath } from '../../config/index.js';
import { listProviders } from '../../llm/index.js';
import { handleError, ProjectNotFoundError } from '../../utils/errors.js';
import { logger } from '../../utils/logger.js';

export const configCommand = new Command('config')
  .description('Manage patcha configuration')
  .addCommand(
    new Command('list')
      .description('List current configuration')
      .argument('[path]', 'Project path')
      .action(async (path: string | undefined) => {
        const projectPath = pathResolve(path || process.cwd());
        
        if (!existsSync(projectPath)) {
          handleError(new ProjectNotFoundError(projectPath));
          process.exit(2);
        }

        const config = loadConfig(projectPath);
        logger.info(pc.bold('\n📋 Current Configuration:\n'));
        logger.info(`  LLM Provider: ${config.llmProvider}`);
        logger.info(`  Auto-fix Level 1: ${config.autoFix?.level1 ? 'enabled' : 'disabled'}`);
        logger.info(`  Auto-fix Level 2: ${config.autoFix?.level2 ? 'enabled' : 'disabled'}`);
        logger.info(`  Auto-fix Level 3: ${config.autoFix?.level3 ? 'enabled' : 'disabled'}`);
        
        const availableProviders = listProviders();
        logger.info(pc.bold('\n📦 Available LLM Providers:\n'));
        for (const p of availableProviders) {
          logger.info(`  - ${p}`);
        }
        
        logger.info(pc.bold('\n⚙️  Configuration file:\n'));
        logger.info(`  ${getConfigPath(projectPath)}\n`);
      })
  )
  .addCommand(
    new Command('set-provider')
      .description('Set the LLM provider')
      .argument('<provider>', 'Provider name (anthropic, google, openai, none)')
      .argument('[path]', 'Project path')
      .action(async (provider: string, path: string | undefined) => {
        const projectPath = pathResolve(path || process.cwd());
        
        if (!existsSync(projectPath)) {
          handleError(new ProjectNotFoundError(projectPath));
          process.exit(2);
        }

        const config = loadConfig(projectPath);
        config.llmProvider = provider as 'anthropic' | 'google' | 'openai' | 'none';
        saveConfig(projectPath, config);
        
        logger.info(pc.green(pc.bold('\n✓ Provider set successfully\n')));
        logger.info(`  Using: ${provider}\n`);
      })
  )
  .addCommand(
    new Command('set-api-key')
      .description('Set API key for a provider')
      .argument('<provider>', 'Provider name')
      .argument('<apiKey>', 'API key (or env var like ${ANTHROPIC_API_KEY})')
      .argument('[path]', 'Project path')
      .action(async (provider: string, apiKey: string, path: string | undefined) => {
        const projectPath = pathResolve(path || process.cwd());
        
        if (!existsSync(projectPath)) {
          handleError(new ProjectNotFoundError(projectPath));
          process.exit(2);
        }

        const config = loadConfig(projectPath);
        config.apiKeys = config.apiKeys || {};
        config.apiKeys[provider] = apiKey;
        saveConfig(projectPath, config);
        
        logger.info(pc.green(pc.bold('\n✓ API key set successfully\n')));
        logger.info(`  Provider: ${provider}\n`);
      })
  )
  .addCommand(
    new Command('auto-fix')
      .description('Configure auto-fix levels')
      .option('--level1', 'Enable/disable level 1 auto-fix')
      .option('--level2', 'Enable/disable level 2 auto-fix')
      .option('--level3', 'Enable/disable level 3 auto-fix')
      .argument('[path]', 'Project path')
      .action(async (path: string | undefined, options: { level1?: boolean; level2?: boolean; level3?: boolean }) => {
        const projectPath = pathResolve(path || process.cwd());
        
        if (!existsSync(projectPath)) {
          handleError(new ProjectNotFoundError(projectPath));
          process.exit(2);
        }

        const config = loadConfig(projectPath);
        
        if (options.level1 !== undefined) {
          config.autoFix = config.autoFix || {};
          config.autoFix.level1 = options.level1;
        }
        if (options.level2 !== undefined) {
          config.autoFix = config.autoFix || {};
          config.autoFix.level2 = options.level2;
        }
        if (options.level3 !== undefined) {
          config.autoFix = config.autoFix || {};
          config.autoFix.level3 = options.level3;
        }
        
        saveConfig(projectPath, config);
        
        logger.info(pc.green(pc.bold('\n✓ Auto-fix configuration updated\n')));
        logger.info(`  Level 1 (Auto-fix): ${config.autoFix?.level1 ? 'enabled' : 'disabled'}`);
        logger.info(`  Level 2 (Smart upgrade): ${config.autoFix?.level2 ? 'enabled' : 'disabled'}`);
        logger.info(`  Level 3 (AI-assisted): ${config.autoFix?.level3 ? 'enabled' : 'disabled'}\n`);
      })
  );
