<script setup lang="ts">
const steps = [
  { number: '01', title: 'Dependency Graph Analysis', description: 'Build complete dependency tree using @npmcli/arborist' },
  { number: '02', title: 'Vulnerability Detection', description: 'Query npm audit API for known vulnerabilities' },
  { number: '03', title: 'Automated Patching', description: 'Apply semver-compatible patches automatically' },
  { number: '04', title: 'Reporting', description: 'Generate detailed reports with remediation steps' },
]
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Four simple steps to secure your dependencies
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="relative"
        >
          <div class="text-6xl font-bold text-accent/20 mb-4">{{ step.number }}</div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ step.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ step.description }}
          </p>
          
          <!-- Arrow connector (hidden on last item per row) -->
          <div class="hidden lg:block absolute top-8 -right-4 text-accent">→</div>
        </div>
      </div>
    </div>
  </section>
</template>
