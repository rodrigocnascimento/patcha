<script setup lang="ts">
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            CI/CD Integration
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Integrate security scanning into your CI pipeline. Fail builds when vulnerabilities are found.
          </p>
          <ul class="space-y-3 text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <span class="text-accent">✓</span> JSON output for parsing
            </li>
            <li class="flex items-center gap-2">
              <span class="text-accent">✓</span> Exit codes for CI automation
            </li>
            <li class="flex items-center gap-2">
              <span class="text-accent">✓</span> Works with GitHub Actions, GitLab CI, Jenkins
            </li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-xl overflow-hidden">
          <div class="bg-gray-800 px-4 py-2">
            <span class="text-gray-400 text-sm font-mono">.github/workflows/security.yml</span>
          </div>
          <div class="p-6 font-mono text-sm">
            <pre class="text-gray-300">name: Security Scan

on: [push, pull_request]

jobs:
  patcha:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Patcha
        run: |
          npm install -g patcha
          patcha scan --json > report.json
      
      - name: Fail if vulnerabilities
        if: failure()
        run: exit 1</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
