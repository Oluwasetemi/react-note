# Changelog, Routes Index & iframe-lazy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/changelog` version history page, a `/routes` section index page, and improve the `iframe-lazy` layout with always-visible open-in-browser buttons.

**Architecture:** Slidev custom routes are registered in `setup/main.ts` via `defineAppSetup` and `router.addRoute`. The two custom pages live in `views/`. Changelog data lives in a standalone `changelog.ts` typed array. The `iframe-lazy` layout gets two buttons in the placeholder and a floating overlay button once loaded.

**Tech Stack:** Vue 3, Slidev `@slidev/types`, Vue Router (via Slidev), UnoCSS, TypeScript

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `layouts/iframe-lazy.vue` | Modify | Add Run + Open buttons in placeholder; floating Open button when loaded |
| `changelog.ts` | Create | Typed array of version history entries |
| `views/changelog.vue` | Create | `/changelog` page — renders timeline from `changelog.ts` |
| `views/routes.vue` | Create | `/routes` page — section index grid with jump links |
| `setup/main.ts` | Create | Registers `/changelog` and `/routes` with Vue Router |
| `global-top.vue` | Modify | Add `/routes` link alongside `<TocIcon />` |

---

## Task 1: Improve `iframe-lazy` placeholder with two buttons

**Files:**
- Modify: `layouts/iframe-lazy.vue`

- [ ] **Step 1: Replace the placeholder click handler with two explicit buttons**

Replace the entire `<template>` block in `layouts/iframe-lazy.vue` with:

```vue
<template>
  <div ref="containerRef" class="iframe-lazy-container">
    <div v-if="!isLoaded" class="iframe-placeholder">
      <div class="placeholder-content">
        <div class="loading-spinner" v-if="isLoading">
          <div class="spinner"></div>
        </div>
        <div v-else class="click-to-load">
          <p class="url-label">{{ url }}</p>
          <div class="btn-row">
            <button class="action-btn run-btn" @click="loadIframe">
              ▶ Run
            </button>
            <a
              class="action-btn open-btn"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ Open
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoaded" class="iframe-wrapper">
      <a
        class="float-open-btn"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        title="Open in browser"
      >↗</a>
      <iframe
        ref="iframeRef"
        :src="url"
        :title="title || 'Embedded content'"
        class="iframe-content"
        frameborder="0"
        allowfullscreen
        @load="onIframeLoad"
      />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Update the `<script setup>` block**

Replace the entire `<script setup lang="ts">` block with:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  url: string
  title?: string
  autoLoad?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: false,
})

const iframeRef = ref<HTMLIFrameElement>()
const containerRef = ref<HTMLElement>()
const isLoaded = ref(false)
const isLoading = ref(false)

const loadIframe = async () => {
  if (isLoaded.value || isLoading.value) return
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 100))
  isLoaded.value = true
  isLoading.value = false
}

const onIframeLoad = () => {
  isLoading.value = false
}

onMounted(() => {
  if (props.autoLoad) {
    const { stop } = useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !isLoaded.value) {
          loadIframe()
          stop()
        }
      },
      { threshold: 0.1 },
    )
  }
})
</script>
```

- [ ] **Step 3: Replace the `<style scoped>` block**

Replace the entire `<style scoped>` block with:

```vue
<style scoped>
.iframe-lazy-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.iframe-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
}

.placeholder-content {
  text-align: center;
  color: #6c757d;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.click-to-load {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.url-label {
  font-size: 0.75rem;
  color: #adb5bd;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-row {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: opacity 0.2s ease;
}

.action-btn:hover {
  opacity: 0.75;
}

.run-btn {
  background: #007bff;
  color: #fff;
}

.open-btn {
  background: #e9ecef;
  color: #343a40;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.float-open-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s ease;
}

.float-open-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  display: block;
}
</style>
```

- [ ] **Step 4: Verify in dev server**

Run `pnpm dev` and open a slide that uses `layout: iframe-lazy` (e.g. slide 321 in `slides.md`). Confirm:
- Two buttons ("▶ Run" and "↗ Open") appear in the placeholder
- Clicking "▶ Run" loads the iframe
- After load, the floating "↗" button appears top-right of the iframe
- "↗ Open" and the float button both open the URL in a new tab

- [ ] **Step 5: Commit**

```bash
git add layouts/iframe-lazy.vue
git commit -m "feat: add run/open buttons and floating open link to iframe-lazy layout"
```

---

## Task 2: Create changelog data file

**Files:**
- Create: `changelog.ts`

- [ ] **Step 1: Create `changelog.ts` at project root**

```ts
export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const entries: ChangelogEntry[] = [
  {
    version: 'v2.1',
    date: '2026-05-04',
    changes: [
      'Added RSC sub-app section',
      'Updated hooks demos with React 19 patterns',
      'Added /changelog and /routes custom pages',
      'Improved iframe-lazy layout with Run/Open buttons',
    ],
  },
  {
    version: 'v2.0',
    date: '2025-09-01',
    changes: [
      'Rewrote state management slides',
      'Added data fetching section with TanStack Query',
      'Added performance and testing sections',
    ],
  },
  {
    version: 'v1.0',
    date: '2024-01-01',
    changes: ['Initial course release'],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add changelog.ts
git commit -m "feat: add changelog data file"
```

---

## Task 3: Create `/changelog` page component

**Files:**
- Create: `views/changelog.vue`

- [ ] **Step 1: Create `views/` directory and `changelog.vue`**

```bash
mkdir -p views
```

Create `views/changelog.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add views/changelog.vue
git commit -m "feat: add /changelog page component"
```

---

## Task 4: Create `/routes` page component

**Files:**
- Create: `views/routes.vue`

- [ ] **Step 1: Create `views/routes.vue`**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add views/routes.vue
git commit -m "feat: add /routes section index page"
```

---

## Task 5: Register custom routes in `setup/main.ts`

**Files:**
- Create: `setup/main.ts`

- [ ] **Step 1: Create `setup/main.ts`**

```ts
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ router }) => {
  router.addRoute({
    path: '/changelog',
    component: () => import('../views/changelog.vue'),
  })
  router.addRoute({
    path: '/routes',
    component: () => import('../views/routes.vue'),
  })
})
```

- [ ] **Step 2: Verify routes are reachable**

With `pnpm dev` running, open:
- `http://localhost:3030/changelog` — should show the changelog timeline
- `http://localhost:3030/routes` — should show the section grid
- "← Back to slides" on each page should return to the main presentation

- [ ] **Step 3: Commit**

```bash
git add setup/main.ts
git commit -m "feat: register /changelog and /routes custom routes via defineAppSetup"
```

---

## Task 6: Add `/routes` link to `global-top.vue`

**Files:**
- Modify: `global-top.vue`

- [ ] **Step 1: Replace `global-top.vue`**

```vue
<!-- global-top.vue -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <TocIcon />
  <button
    class="routes-link"
    title="View all sections"
    @click="router.push('/routes')"
  >
    ⊞
  </button>
</template>

<style scoped>
.routes-link {
  position: fixed;
  top: 1rem;
  right: 3.5rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.2s ease;
  z-index: 100;
  color: inherit;
}

.routes-link:hover {
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Verify in dev server**

Open any slide — the `⊞` icon should appear in the top-right. Clicking it navigates to `/routes`. Navigating back via "← Back to slides" should return to the presentation.

- [ ] **Step 3: Commit**

```bash
git add global-top.vue
git commit -m "feat: add routes index link to global slide header"
```

---

## Self-Review

**Spec coverage:**
- ✅ `iframe-lazy` — Run + Open buttons in placeholder, floating Open when loaded
- ✅ `/changelog` — version history timeline, uses `changelog.ts` data
- ✅ `/routes` — section index grid, jump links per topic
- ✅ Custom routes registered via `defineAppSetup` in `setup/main.ts`
- ✅ `/routes` reachable from every slide via `global-top.vue`

**Placeholder scan:** No TBDs, no "implement later", all code blocks are complete.

**Type consistency:** `ChangelogEntry` defined in Task 2 (`changelog.ts`), imported directly in Task 3 (`views/changelog.vue`) using `import { entries } from '../changelog'`. Consistent across tasks.
