import { Command } from 'commander';
import { resolve as pathResolve } from 'path';
import pc from 'picocolors';
import { runSetupWizard } from '../ui/wizard.js';
import { saveConfig, getConfigPath } from '../../config/index.js';
import { logger } from '../../utils/logger.js';
import { handleError } from '../../utils/errors.js';

export const initCommand = new Command('init')
  .description('Create a new patcha.config.json file')
  .argument('[path]', 'Project path to initialize')
  .action(async (path: string | undefined) => {
    const projectPath = pathResolve(path || process.cwd());

    logger.info(pc.bold('\nWelcome to Patcha! 🧙‍♂️'));
    logger.info("Let's get you set up.\n");

    try {
      const config = await runSetupWizard();
      saveConfig(projectPath, config);
      const configPath = getConfigPath(projectPath);
      
      logger.info(pc.green(`\n✓ Configuration saved to ${configPath}`));
      logger.info("You're all set! Try running 'patcha scan' to get started.");
      process.exit(0);
    } catch (error) {
      handleError(error);
      process.exit(2);
    }
  });
