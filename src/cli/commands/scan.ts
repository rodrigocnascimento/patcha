import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { scan } from '../../scanner/index.js';
import { format } from '../../output/formatter.js';
import { handleError, ProjectNotFoundError } from '../../utils/errors.js';
import type { Vulnerability } from '../../scanner/types.js';

export const scanCommand = new Command('scan')
  .description('Scan for vulnerabilities in dependencies')
  .argument('[path]', 'Project path to scan', process.cwd())
  .option('-v, --verbose', 'Show verbose output')
  .action(async (path: string, options: { verbose?: boolean }) => {
    const projectPath = resolve(path);

    if (!existsSync(projectPath)) {
      handleError(new ProjectNotFoundError(projectPath));
      process.exit(2);
    }

    try {
      const result = await scan(projectPath);
      console.log(format(result));
      
      if (options.verbose && result.vulnerabilities.length > 0) {
        console.log('\n' + result.vulnerabilities.map((v: Vulnerability) => `${v.id}: ${v.severity}`).join('\n'));
      }
      
      process.exit(result.summary.total > 0 ? 1 : 0);
    } catch (error) {
      handleError(error);
      process.exit(2);
    }
  });
