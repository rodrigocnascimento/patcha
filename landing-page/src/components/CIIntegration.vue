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

        <!-- Terminal Window -->
        <div class="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <!-- Title bar -->
          <div class="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <!-- Window buttons -->
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-gray-400 text-sm font-mono ml-3">security.yml</span>
            </div>
            <span class="text-gray-500 text-xs">GitHub Actions</span>
          </div>
          
          <!-- Code content -->
          <div class="p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300"><code><span class="text-purple-400">name</span>: <span class="text-green-400">Security Scan</span>

<span class="text-purple-400">on</span>: [<span class="text-yellow-400">push</span>, <span class="text-yellow-400">pull_request</span>]

<span class="text-purple-400">jobs</span>:
  <span class="text-blue-400">patcha</span>:
    <span class="text-purple-400">runs-on</span>: <span class="text-green-400">ubuntu-latest</span>
    <span class="text-purple-400">steps</span>:
      - <span class="text-yellow-400">uses</span>: <span class="text-green-400">actions/checkout@v4</span>
      - <span class="text-yellow-400">name</span>: <span class="text-green-400">Run Patcha</span>
        <span class="text-purple-400">run</span>: |
          npm install -g patcha
          patcha scan --json > report.json
      
      - <span class="text-yellow-400">name</span>: <span class="text-green-400">Fail if vulnerabilities</span>
        <span class="text-purple-400">if</span>: <span class="text-yellow-400">failure()</span>
        <span class="text-purple-400">run</span>: <span class="text-green-400">exit 1</span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
