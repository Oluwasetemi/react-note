<script setup lang="ts">
import { entries } from '../changelog'
</script>

<template>
  <div class="changelog-page">
    <header class="changelog-header">
      <router-link to="/" class="back-link">← Back to slides</router-link>
      <h1>
        Course <span class="text-gradient font-hand">Changelog</span>
      </h1>
      <p class="subtitle">Version history of React Class Notes</p>
    </header>

    <ul class="timeline">
      <li v-for="entry in entries" :key="entry.version" class="timeline-item">
        <div class="timeline-marker" />
        <div class="card timeline-card">
          <div class="entry-header">
            <span class="version-badge">{{ entry.version }}</span>
            <span class="entry-date">{{ entry.date }}</span>
          </div>
          <ul class="change-list">
            <li v-for="change in entry.changes" :key="change">{{ change }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.changelog-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: var(--slidev-font-sans, sans-serif);
  color: #1a1a1a;
}

.changelog-header {
  margin-bottom: 2.5rem;
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

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #dee2e6;
}

.timeline-item {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.timeline-marker {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #007bff;
  flex-shrink: 0;
  margin-top: 0.75rem;
  z-index: 1;
}

.timeline-card {
  flex: 1;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.version-badge {
  background: #007bff;
  color: #fff;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.entry-date {
  color: #6c757d;
  font-size: 0.85rem;
}

.change-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #343a40;
  line-height: 1.7;
}
</style>
