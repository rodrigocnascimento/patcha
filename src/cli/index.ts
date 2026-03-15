import { Command } from 'commander';
import { scanCommand } from './commands/scan.js';
import { fixCommand } from './commands/fix.js';
import { configCommand } from './commands/config.js';

export const program = new Command();

program
  .name('patcha')
  .description('CLI para scanning e remediation de vulnerabilidades em dependências npm')
  .version('0.6.0');

program.addCommand(scanCommand);
program.addCommand(fixCommand);
program.addCommand(configCommand);

export default program;
