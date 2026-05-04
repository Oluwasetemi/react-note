<script setup lang="ts">
const sections = [
  { name: 'Introduction', slug: 'intro' },
  { name: 'JSX', slug: 'jsx' },
  { name: 'Components', slug: 'component' },
  { name: 'Interaction', slug: 'interaction' },
  { name: 'Rendering', slug: 'rendering' },
  { name: 'Hooks', slug: 'hooks' },
  { name: 'State', slug: 'state' },
  { name: 'Forms', slug: 'form' },
  { name: 'More Hooks', slug: 'more-hooks' },
  { name: 'Routing', slug: 'routing' },
  { name: 'State Management', slug: 'state-management' },
  { name: 'Data Fetching', slug: 'data-fetching' },
  { name: 'Performance', slug: 'performance' },
  { name: 'Testing', slug: 'test' },
]

function goToSlide(slug: string) {
  window.location.href = `/#/${slug}`
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-8">
    <header class="mb-8">
      <router-link
        to="/"
        class="inline-block mb-4 text-sm text-blue-500 no-underline hover:underline"
      >
        ← Back to slides
      </router-link>
      <h1 class="text-3xl font-bold m-0 mb-1">
        Course <span class="text-gradient font-hand">Sections</span>
      </h1>
      <p class="m-0 text-gray-500 dark:text-gray-400">
        Jump to any topic in the presentation
      </p>
    </header>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      <button
        v-for="section in sections"
        :key="section.slug"
        class="flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left cursor-pointer transition-all duration-200 shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md"
        @click="goToSlide(section.slug)"
      >
        <span class="font-semibold text-sm text-gray-800 dark:text-gray-200">{{
          section.name
        }}</span>
        <span class="text-blue-500 dark:text-blue-400 text-lg">→</span>
      </button>
    </div>

    <footer class="mt-8 text-center">
      <router-link
        to="/changelog"
        class="text-sm text-gray-500 dark:text-gray-400 no-underline hover:text-blue-500 dark:hover:text-blue-400 hover:underline"
      >
        View Changelog
      </router-link>
    </footer>
  </div>
</template>
