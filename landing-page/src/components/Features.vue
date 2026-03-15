<script setup lang="ts">
const features = [
  {
    title: 'Multi-Level Resolution',
    description: 'From simple patches to AI-powered fixes. Patcha tries harder than npm audit fix.',
    icon: '🔄'
  },
  {
    title: 'AI-Powered Analysis',
    description: 'When traditional tools fail, our AI analyzes breaking changes and suggests solutions.',
    icon: '🤖'
  },
  {
    title: 'CI Ready',
    description: 'Integrates easily into CI/CD pipelines. Fail builds when vulnerabilities are found.',
    icon: '⚡'
  }
]

const levels = [
  {
    level: 'Level 1',
    name: 'Patch Updates',
    description: 'Automatic safe updates within semver patch version',
    color: 'text-green-400'
  },
  {
    level: 'Level 2',
    name: 'Minor Updates',
    description: 'Smart minor version upgrades with compatibility checks',
    color: 'text-blue-400'
  },
  {
    level: 'Level 3',
    name: 'Major Upgrades',
    description: 'AI analyzes breaking changes and suggests migration path',
    color: 'text-yellow-400'
  },
  {
    level: 'Level 4',
    name: 'Transitive Dependencies',
    description: 'Fix vulnerabilities in deep dependency trees',
    color: 'text-orange-400'
  },
  {
    level: 'Level 5',
    name: 'Abandoned Libraries',
    description: 'AI suggests safe alternatives when no fix exists',
    color: 'text-red-400'
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

  <!-- Resolution Levels Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          We Try Harder
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          npm audit fix resolves ~60-70% of vulnerabilities. Patcha goes further with AI-powered resolution for complex cases.
        </p>
      </div>

      <div class="grid md:grid-cols-5 gap-4">
        <div 
          v-for="item in levels" 
          :key="item.level"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div :class="item.level + ' text-sm font-mono ' + item.color + ' mb-2'">
            {{ item.level }}
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
            {{ item.name }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Patcha attempts to resolve all 5 levels. Not guaranteed, but we try our best. 🤖
        </p>
      </div>
    </div>
  </section>
</template>
