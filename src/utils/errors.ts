import pc from 'picocolors';
import { logger } from './logger.js';

export class PatchaError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR'
  ) {
    super(message);
    this.name = 'PatchaError';
  }
}

export class ProjectNotFoundError extends PatchaError {
  constructor(projectPath: string) {
    super(`Project not found at: ${projectPath}`, 'PROJECT_NOT_FOUND');
    this.name = 'ProjectNotFoundError';
  }
}

export class PackageJsonNotFoundError extends PatchaError {
  constructor(projectPath: string) {
    super(`package.json not found at: ${projectPath}`, 'PACKAGE_JSON_NOT_FOUND');
    this.name = 'PackageJsonNotFoundError';
  }
}

export class NpmAuditError extends PatchaError {
  constructor(message: string) {
    super(message, 'NPM_AUDIT_ERROR');
    this.name = 'NpmAuditError';
  }
}

export function handleError(error: unknown): void {
  if (error instanceof PatchaError) {
    logger.error(pc.red(`Error: ${error.message}`));
    return;
  }

  if (error instanceof Error) {
    logger.error(pc.red(`Error: ${error.message}`));
    return;
  }

  logger.error(pc.red('Unknown error occurred'));
}
