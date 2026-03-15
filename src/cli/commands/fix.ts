import { Command } from 'commander';
import { resolve as pathResolve } from 'path';
import { existsSync } from 'fs';
import pc from 'picocolors';
import { scan } from '../../scanner/index.js';
import { resolve as resolveVulnerabilities } from '../../scanner/resolver/index.js';
import { applyFixesWithGit } from '../../utils/git.js';
import { handleError, ProjectNotFoundError, MissingConfigurationError } from '../../utils/errors.js';
import { logger } from '../../utils/logger.js';
import type { ResolutionContext } from '../../scanner/resolver/types.js';

let verbose = false;

function logVerbose(message: string, data?: unknown) {
  if (verbose) {
    logger.debug({ data }, message);
  }
}

export const fixCommand = new Command('fix')
  .description('Fix vulnerabilities in dependencies')
  .argument('[path]', 'Project path to fix')
  .option('--ai', 'Use AI to fix complex vulnerabilities (requires API key)')
  .option('--dry-run', 'Show what would be fixed without making changes')
  .option('-y, --yes', 'Auto-confirm fixes')
  .option('--auto', 'Non-interactive mode for CI/CD (skip all prompts)')
  .option('--mr', 'Create branch, commit and merge request')
  .option('--json', 'Output results as JSON')
  .option('-v, --verbose', 'Enable verbose debug output')
  .action(async (path: string | undefined, options: { 
    ai?: boolean; 
    dryRun?: boolean;
    yes?: boolean;
    auto?: boolean;
    mr?: boolean;
    json?: boolean;
    verbose?: boolean;
  }) => {
    verbose = options.verbose || false;
    const projectPath = pathResolve(path || process.cwd());

    if (!existsSync(projectPath)) {
      handleError(new ProjectNotFoundError(projectPath));
      process.exit(2);
    }

    logVerbose('Starting fix command', { projectPath, options });

    try {
      logger.info(pc.bold('\n🔍 Scanning for vulnerabilities...\n'));
      const scanResult = await scan(projectPath);
      logVerbose('Scan complete', { vulnerabilityCount: scanResult.vulnerabilities.length });
      
      if (scanResult.vulnerabilities.length === 0) {
        logger.info(pc.green(pc.bold('\n✓ No vulnerabilities found!\n')));
        process.exit(0);
      }

      const context: ResolutionContext = {
        projectPath,
        useAI: options.ai || false,
        dryRun: options.dryRun || false,
        verbose: options.verbose || false,
      };

      logger.info(pc.bold('\n⚡ Resolving vulnerabilities...\n'));
      const summary = await resolveVulnerabilities(scanResult.vulnerabilities, context);

      if (options.json) {
        logger.info(JSON.stringify({
          total: summary.total,
          resolved: summary.resolved,
          level1Count: summary.level1Count,
          level2Count: summary.level2Count,
          level3Count: summary.level3Count,
          failedCount: summary.failedCount,
          results: summary.results.map(r => ({
            package: r.vulnerability.packageName,
            version: r.vulnerability.packageVersion,
            severity: r.vulnerability.severity,
            level: r.level,
            action: r.action,
            newVersion: r.newVersion,
            explanation: r.explanation,
          })),
        }, null, 2));
      } else {
        logger.info(pc.bold('\nResolution Summary:\n'));
        logger.info(`  ${pc.green('✓')} Level 1 (Auto-fix): ${summary.level1Count}`);
        logger.info(`  ${pc.green('✓')} Level 2 (Smart upgrade): ${summary.level2Count}`);
        logger.info(`  ${pc.cyan('🤖')} Level 3 (AI-assisted): ${summary.level3Count}`);
        logger.info(`  ${pc.red('✗')} No fix available: ${summary.failedCount}`);
        logger.info(pc.bold(`\nTotal resolved: ${summary.resolved} of ${summary.total}`));

        if (summary.results.length > 0) {
          logger.info(pc.bold('\nDetails:\n'));
          for (const result of summary.results) {
            const vuln = result.vulnerability;
            const levelEmoji = result.level === 1 ? '🔧' : result.level === 2 ? '📈' : '🤖';
            const actionColor = result.action === 'no_fix_available' ? pc.red : pc.green;
            
            logger.info(`  ${levelEmoji} ${vuln.packageName}@${vuln.packageVersion}`);
            logger.info(`     ${actionColor(result.action)} - ${result.explanation}`);
            
            if (result.newVersion) {
              logger.info(`     ${pc.blue('→')} Upgrade to: ${result.newVersion}`);
            }
            if (result.alternative) {
              logger.info(`     ${pc.blue('→')} Alternative: ${result.alternative}`);
              if (result.alternativeStars) {
                logger.info(`       (${result.alternativeStars.toLocaleString()} ⭐)`);
              }
            }
            logger.info('');
          }
        }
      }

      if (options.dryRun) {
        logger.warn(pc.bold('\n⚠️  DRY RUN - No changes were made\n'));
        process.exit(0);
      }

      const hasResolvedFixes = summary.resolved > 0;
      let shouldApply = options.yes || options.auto || false;

      if (!shouldApply && hasResolvedFixes && !options.json) {
        logger.info(pc.bold('\n❓ Apply these fixes? (y/N): '));
      }

      if (shouldApply || options.auto) {
        if (options.mr) {
          logger.info(pc.bold('\n🔧 Creating branch and commit...\n'));
          const gitResult = await applyFixesWithGit({
            projectPath,
            createMR: true,
          });

          if (gitResult.success) {
            logger.info(pc.green(pc.bold('\n✓ Git changes applied successfully!\n')));
            logger.info(`  Branch: ${pc.blue(gitResult.branch)}`);
            logger.info(`  Commit: ${gitResult.commit?.substring(0, 7)}`);
            if (gitResult.mrUrl) {
              logger.info(`  MR: ${pc.cyan(gitResult.mrUrl)}`);
            }
          } else {
            logger.error(pc.red(pc.bold('\n✗ Failed to apply Git changes\n')));
            logger.error(`  ${gitResult.message}`);
          }
        }
      }

      process.exit(summary.failedCount > 0 ? 1 : 0);
    } catch (error) {
      if (error instanceof MissingConfigurationError) {
        logger.error(pc.yellow(error.message));
        process.exit(2);
      }
      handleError(error);
      process.exit(2);
    }
  });
