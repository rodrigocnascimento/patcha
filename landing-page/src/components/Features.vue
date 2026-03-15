<script setup lang="ts">
const features = [
  {
    title: 'Automated Patching',
    description: 'Automatically apply safe dependency patches without breaking your code.',
    icon: '🔧'
  },
  {
    title: 'Security-first',
    description: 'Detect known vulnerabilities in your dependency tree using npm audit.',
    icon: '🛡️'
  },
  {
    title: 'CI Ready',
    description: 'Integrates easily into CI/CD pipelines with JSON output and exit codes.',
    icon: '⚡'
  }
]
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Patcha?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Security shouldn't slow you down. Patcha makes dependency security seamless.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
