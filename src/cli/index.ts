import { Command } from 'commander';
import { scanCommand } from './commands/scan.js';

export const program = new Command();

program
  .name('patcha')
  .description('CLI para scanning e remediation de vulnerabilidades em dependências npm')
  .version('0.4.0');

program.addCommand(scanCommand);

export default program;
