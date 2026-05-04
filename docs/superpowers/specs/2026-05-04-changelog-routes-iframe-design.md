# Design: Changelog, Routes Index & iframe-lazy improvements

**Date:** 2026-05-04  
**Status:** Approved

## Overview

Three features added to the react-note Slidev presentation:

1. **`iframe-lazy` layout** — always-visible "Open in browser" button alongside the run button; floating button persists after load
2. **`/changelog` custom route** — version history page for course content updates
3. **`/routes` custom route** — section index page with jump links to every major topic

---

## Feature 1 — `iframe-lazy` Layout Improvements

**File:** `layouts/iframe-lazy.vue`

### Placeholder state (before load)
Two side-by-side buttons:
- `▶ Run` — triggers `loadIframe()` (existing behaviour)
- `↗ Open` — opens `props.url` in a new browser tab via `window.open`

### Loaded state (after iframe mounts)
A small floating `↗` icon button in the top-right corner of the iframe container, positioned absolutely so it overlays the iframe. Clicking it opens `props.url` in a new tab.

### No new props needed
The `url` prop already exists on every existing slide using this layout. No slide frontmatter changes required.

### Error handling
No iframe error detection. The open-in-browser button is always present as the fallback — students can always open the URL directly if the embed fails silently.

---

## Feature 2 — `/changelog` Custom Route

### Files
- `views/changelog.vue` — page component
- `changelog.ts` — typed data file at project root
- `setup/main.ts` — registers both custom routes (shared with Feature 3)

### Data shape (`changelog.ts`)
```ts
export interface ChangelogEntry {
  version: string
  date: string        // ISO format: YYYY-MM-DD
  changes: string[]
}

export const entries: ChangelogEntry[] = [
  {
    version: 'v2.1',
    date: '2026-05-04',
    changes: ['Added RSC section', 'Updated hooks demos', 'Added custom routes and changelog'],
  },
]
```

### Page component (`views/changelog.vue`)
- Imports `entries` from `../changelog.ts`
- Renders a timeline list: version badge + date + bullet changes per entry
- Uses existing UnoCSS shortcuts: `text-gradient`, `card`, `font-hand`
- Back link: `<router-link to="/">← Back to slides</router-link>`

### Route registration (`setup/main.ts`)
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

---

## Feature 3 — `/routes` Custom Route

### Files
- `views/routes.vue` — page component (registered via `setup/main.ts` above)

### Content
A grid of cards, one per major topic section. Each card shows the topic name and navigates to the first slide of that section when clicked.

### Section map (hardcoded in `views/routes.vue`)
Sections map to slide numbers derived from `slides.md` `src:` import order. Slide numbers will be approximate first-slide targets — updated manually when the deck structure changes.

| Topic | Source file |
|---|---|
| Introduction | `pages/intro.md` |
| JSX | `pages/jsx.md` |
| Components | `pages/component.md` |
| Interaction | `pages/interaction.md` |
| Rendering | `pages/rendering.md` |
| Hooks | `pages/hooks.md` |
| State | `pages/state.md` |
| Forms | `pages/form.md` |
| More Hooks | `pages/more-hooks.md` |
| Routing | `pages/routing.md` |
| State Management | `pages/state-management.md` |
| Data Fetching | `pages/data-fetching.md` |
| Performance | `pages/performance.md` |
| Testing | `pages/test.md` |

### Navigation
Uses `window.location` to navigate to `/#/N` (Slidev's hash-based slide routing) after clicking, which jumps to that slide in the main view.

### Entry point
A link to `/routes` added to `global-top.vue` alongside `<TocIcon />`, making it reachable from any slide.

---

## File Checklist

| File | Action |
|---|---|
| `layouts/iframe-lazy.vue` | Modify — add two buttons + floating open button |
| `changelog.ts` | Create — typed entry data |
| `views/changelog.vue` | Create — changelog page |
| `views/routes.vue` | Create — routes index page |
| `setup/main.ts` | Create — registers custom routes |
| `global-top.vue` | Modify — add `/routes` link |
