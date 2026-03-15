<script setup lang="ts">
const steps = [
  { number: '01', title: 'Dependency Graph', description: 'Build complete tree with @npmcli/arborist' },
  { number: '02', title: 'Vulnerability Scan', description: 'Query npm audit for known CVEs' },
  { number: '03', title: 'Multi-Level Resolution', description: 'Auto-fix simple, AI for complex' },
  { number: '04', title: 'AI-Powered Fix', description: 'Analyze breaking changes, suggest alternatives' },
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
          From simple patches to AI-powered resolution
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(step, index) in steps" 
          :key="step.number"
          class="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <!-- Number badge -->
          <div class="absolute -top-3 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
            {{ step.number }}
          </div>
          
          <div class="pt-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ step.description }}
            </p>
          </div>
          
          <!-- Arrow connector -->
          <div 
            v-if="index < steps.length - 1" 
            class="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-accent text-xl"
          >
            →
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
