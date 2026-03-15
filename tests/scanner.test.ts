import { describe, it, expect, vi, beforeEach } from 'vitest';
import { transformVulnerabilities } from '../src/scanner/index.js';
import type { NpmAuditResponse, Severity } from '../src/scanner/types.js';

describe('Scanner - transformVulnerabilities', () => {
  it('should transform npm audit response to vulnerabilities', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: {
        lodash: [
          {
            id: 1234,
            url: 'https://github.com/advisories/GHSA-xxxx',
            title: 'Prototype Pollution in lodash',
            severity: 'high',
            vulnerable_versions: '<4.17.21',
          }
        ]
      }
    };

    const result = transformVulnerabilities(mockResponse);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('npm:lodash:1234');
    expect(result[0].severity).toBe('high');
    expect(result[0].packageName).toBe('lodash');
    expect(result[0].title).toBe('Prototype Pollution in lodash');
    expect(result[0].fixable).toBe(true);
  });

  it('should handle multiple vulnerabilities for same package', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: {
        lodash: [
          {
            id: 1234,
            url: 'https://github.com/advisories/GHSA-xxxx',
            title: 'Prototype Pollution',
            severity: 'high',
            vulnerable_versions: '<4.17.21',
          },
          {
            id: 5678,
            url: 'https://github.com/advisories/GHSA-yyyy',
            title: 'Command Injection',
            severity: 'critical',
            vulnerable_versions: '<4.17.20',
          }
        ]
      }
    };

    const result = transformVulnerabilities(mockResponse);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('npm:lodash:1234');
    expect(result[1].id).toBe('npm:lodash:5678');
  });

  it('should map severity correctly', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: {
        pkg1: [{ id: 1, url: '', title: 'v1', severity: 'low', vulnerable_versions: '' }],
        pkg2: [{ id: 2, url: '', title: 'v2', severity: 'moderate', vulnerable_versions: '' }],
        pkg3: [{ id: 3, url: '', title: 'v3', severity: 'high', vulnerable_versions: '' }],
        pkg4: [{ id: 4, url: '', title: 'v4', severity: 'critical', vulnerable_versions: '' }],
      }
    };

    const result = transformVulnerabilities(mockResponse);

    expect(result[0].severity).toBe('low');
    expect(result[1].severity).toBe('moderate');
    expect(result[2].severity).toBe('high');
    expect(result[3].severity).toBe('critical');
  });

  it('should return empty array for empty vulnerabilities', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: {}
    };

    const result = transformVulnerabilities(mockResponse);
    expect(result).toHaveLength(0);
  });

  it('should return empty array for null vulnerabilities', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: null as any
    };

    const result = transformVulnerabilities(mockResponse);
    expect(result).toHaveLength(0);
  });

  it('should handle non-array vulnerabilities gracefully', () => {
    const mockResponse: NpmAuditResponse = {
      auditReportVersion: 2,
      vulnerabilities: {
        lodash: {} as any
      }
    };

    const result = transformVulnerabilities(mockResponse);
    expect(result).toHaveLength(0);
  });
});
