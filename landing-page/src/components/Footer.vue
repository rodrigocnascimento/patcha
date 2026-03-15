<script setup lang="ts">
const footerLinks = {
  Product: ['Features', 'Installation', 'CLI Reference', 'API'],
  Resources: ['Documentation', 'GitHub', 'NPM', 'Changelog'],
  Community: ['Contributing', 'Discussions', 'Security'],
  Legal: ['License', 'Privacy'],
}
</script>

<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div v-for="(links, category) in footerLinks" :key="category">
          <h3 class="text-white font-semibold mb-4">{{ category }}</h3>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link">
              <a href="#" class="hover:text-accent transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-white font-bold">Patcha</span>
          <span class="text-gray-500">|</span>
          <span>Apache License 2.0</span>
        </div>
        <p class="text-sm">
          © 2026 Patcha. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
