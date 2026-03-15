import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { scan } from '../../scanner/index.js';
import { format, type FormatOptions } from '../../output/formatter.js';
import { handleError, ProjectNotFoundError } from '../../utils/errors.js';
import type { Vulnerability, Severity } from '../../scanner/types.js';

export const scanCommand = new Command('scan')
  .description('Scan for vulnerabilities in dependencies')
  .argument('[path]', 'Project path to scan')
  .option('-v, --verbose', 'Show verbose output')
  .option('-j, --json', 'Output in JSON format (shows all vulnerabilities)')
  .option('-l, --level <level>', 'Filter by severity level (critical, high, moderate, low)')
  .option('-n, --number <count>', 'Number of vulnerabilities to display (default: 25)', '25')
  .option('-a, --all', 'Show all vulnerabilities')
  .action(async (path: string | undefined, options: { 
    verbose?: boolean; 
    json?: boolean;
    level?: string;
    number?: string;
    all?: boolean;
  }) => {
    const projectPath = resolve(path || process.cwd());

    if (!existsSync(projectPath)) {
      handleError(new ProjectNotFoundError(projectPath));
      process.exit(2);
    }

    try {
      const result = await scan(projectPath);
      
      let filtered = result.vulnerabilities;
      
      if (options.level) {
        const levels: Record<string, Severity> = {
          critical: 'critical',
          high: 'high',
          moderate: 'moderate',
          low: 'low',
        };
        const level = levels[options.level.toLowerCase()];
        if (level) {
          filtered = filtered.filter(v => v.severity === level);
        }
      }
      
      const displayCount = options.all ? filtered.length : parseInt(options.number || '25', 10);
      
      if (options.json) {
        console.log(JSON.stringify({
          ...result,
          vulnerabilities: filtered,
        }, null, 2));
      } else {
        const formatOpts: FormatOptions = { displayCount };
        
        const sorted = [...filtered].sort((a, b) => {
          const order: Record<Severity, number> = { critical: 0, high: 1, moderate: 2, low: 3 };
          return order[a.severity] - order[b.severity];
        });
        
        const display = sorted.slice(0, displayCount);
        
        const resultWithFiltered = {
          ...result,
          vulnerabilities: display,
        };
        
        console.log(format(resultWithFiltered, formatOpts));
        
        if (filtered.length > displayCount) {
          console.log(`\nShowing ${display.length} of ${filtered.length} vulnerabilities`);
        }
        
        if (options.verbose && filtered.length > 0) {
          console.log('\n' + filtered.map((v: Vulnerability) => `${v.id}: ${v.severity}`).join('\n'));
        }
      }
      
      process.exit(result.summary.total > 0 ? 1 : 0);
    } catch (error) {
      handleError(error);
      process.exit(2);
    }
  });
