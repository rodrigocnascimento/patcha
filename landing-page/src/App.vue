<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Hero from './components/Hero.vue'
import TerminalPreview from './components/TerminalPreview.vue'
import Features from './components/Features.vue'
import CIIntegration from './components/CIIntegration.vue'
import HowItWorks from './components/HowItWorks.vue'
import OpenSource from './components/OpenSource.vue'
import Footer from './components/Footer.vue'

const isDark = ref(true)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-200">
      
      <!-- Header / Nav -->
      <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-primary/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <a href="/">
                <img src="/patcha_panda_logo_face.png" alt="Patcha" class="h-20" />
              </a>
            </div>
            <div class="flex items-center gap-4">
              <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">Docs</a>
              <a href="https://github.com/rodrigocnascimento/patcha" target="_blank" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">GitHub</a>
              <button 
                @click="toggleDarkMode"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span v-if="isDark">🌙</span>
                <span v-else>☀️</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TerminalPreview />
        <Features />
        <CIIntegration />
        <HowItWorks />
        <OpenSource />
      </main>

      <Footer />
    </div>
  </div>
</template>
