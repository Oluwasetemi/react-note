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
  // Navigate to the main view and let Slidev handle named slide routing
  window.location.href = `/#/${slug}`
}
</script>

<template>
  <div class="routes-page">
    <header class="routes-header">
      <router-link to="/" class="back-link">← Back to slides</router-link>
      <h1>
        Course <span class="text-gradient font-hand">Sections</span>
      </h1>
      <p class="subtitle">Jump to any topic in the presentation</p>
    </header>

    <div class="sections-grid">
      <button
        v-for="section in sections"
        :key="section.slug"
        class="section-card card"
        @click="goToSlide(section.slug)"
      >
        <span class="section-name">{{ section.name }}</span>
        <span class="arrow">→</span>
      </button>
    </div>

    <footer class="routes-footer">
      <router-link to="/changelog" class="footer-link">View Changelog</router-link>
    </footer>
  </div>
</template>

<style scoped>
.routes-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: var(--slidev-font-sans, sans-serif);
  color: #1a1a1a;
}

.routes-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.subtitle {
  color: #6c757d;
  margin: 0;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.section-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.section-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.section-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.arrow {
  color: #007bff;
  font-size: 1.1rem;
}

.routes-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-link {
  color: #6c757d;
  font-size: 0.85rem;
  text-decoration: none;
}

.footer-link:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
