<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const terminalLines = [
  { text: 'patcha scan', type: 'command' },
  { text: '', type: 'empty' },
  { text: 'Patcha Security Scan', type: 'title' },
  { text: '', type: 'empty' },
  { text: 'Dependencies scanned: 142', type: 'info' },
  { text: 'Vulnerabilities detected: 3', type: 'warning' },
  { text: '', type: 'empty' },
  { text: '✔ patched lodash@4.17.21 → 4.17.22', type: 'success' },
  { text: '✔ patched minimist@1.2.5 → 1.2.8', type: 'success' },
  { text: '⚠ manual review required for axios', type: 'warning' },
]

const displayedLines = ref<number[]>([])
let currentLine = 0
let timeout: number

const typeWriter = () => {
  if (currentLine < terminalLines.length) {
    displayedLines.value.push(currentLine)
    currentLine++
    timeout = setTimeout(typeWriter, 300)
  }
}

onMounted(() => {
  setTimeout(typeWriter, 500)
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Built for developer workflows
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Scan, fix, and report vulnerabilities in your dependencies
        </p>
      </div>

      <!-- Terminal Window -->
      <div class="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <!-- Terminal Header -->
        <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="ml-4 text-gray-400 text-sm font-mono">patcha</span>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-6 font-mono text-sm min-h-[320px]">
          <template v-for="(line, index) in terminalLines" :key="index">
            <div 
              v-if="displayedLines.includes(index)"
              :class="{
                'text-accent': line.type === 'command',
                'text-white font-bold text-lg': line.type === 'title',
                'text-gray-400': line.type === 'info',
                'text-yellow-400': line.type === 'warning',
                'text-green-400': line.type === 'success',
                'h-4': line.type === 'empty'
              }"
            >
              <span v-if="line.type === 'command'">$ </span>{{ line.text }}
            </div>
          </template>
          <div class="text-green-400 animate-pulse">▋</div>
        </div>
      </div>

      <!-- CLI Commands -->
      <div class="mt-8 flex justify-center gap-6">
        <div class="text-center">
          <code class="block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-accent font-mono text-sm">
            patcha scan
          </code>
          <p class="mt-2 text-xs text-gray-500">Scan dependencies</p>
        </div>
        <div class="text-center">
          <code class="block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-accent font-mono text-sm">
            patcha fix
          </code>
          <p class="mt-2 text-xs text-gray-500">Apply patches</p>
        </div>
        <div class="text-center">
          <code class="block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-accent font-mono text-sm">
            patcha report
          </code>
          <p class="mt-2 text-xs text-gray-500">Generate report</p>
        </div>
      </div>
    </div>
  </section>
</template>
