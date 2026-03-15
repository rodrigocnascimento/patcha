# Changelog

All notable changes to this project will be documented in this file.

## [0.5.0] - 2026-03-15

### Fixed
- Scanner not detecting vulnerabilities - changed API endpoint to bulk advisories
- Fixed package-lock.json parsing for accurate dependency versions

### Added
- `--json` option for JSON output
- `-l, --level` filter by severity (critical/high/moderate/low)
- `-n, --number` to control displayed count (default: 25)
- `-a, --all` to show all vulnerabilities

### Changed
- Improved landing page UI components
- HowItWorks: numbered badges on cards
- TerminalPreview: AI resolution levels display
- CIIntegration: terminal window with syntax highlighting
- Features: added 5 resolution levels section
- Removed default path from CLI help

## [0.3.0] - 2026-03-14

### Added
- Landing page Vue.js 3 + Tailwind CSS
- Dark mode com toggle e detecção automática
- Seções: Hero, Terminal Preview, Features, CI Integration, How It Works, Open Source, Footer
- GitHub workflow para deploy no Cloudflare Pages
- Scripts para upload de secrets

### Changed
- License atualizada para Apache-2.0
- Repository URL adicionado ao package.json

## [0.2.0] - 2026-03-14

### Added
- CLI with Commander.js (scan command)
- Scanner with @npmcli/arborist integration
- npm audit JSON API integration
- Formatted output with picocolors
- Error handling with custom errors
- dotenv for environment variables
- .env.example template

## [0.1.0] - 2026-03-14

### Added
- Technical foundation setup (TypeScript, Vitest, ESLint)
- Project structure (src/, tests/)
