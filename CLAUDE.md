# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A [Slidev](https://sli.dev) presentation for teaching React at AltSchool Africa. Slides are authored in `slides.md` (and page partials in `pages/*.md`) using Markdown with MDC syntax. The framework is Vue-powered, but the course content is React — both coexist as runtime dependencies.

## Commands

```bash
# Start dev server (slides at http://localhost:3030)
pnpm dev

# Production build
pnpm build

# Export to PDF
pnpm build:pdf

# Format all files (uses prettier-plugin-slidev for .md)
pnpm format
```

The project uses `pnpm` (v10). There is no typecheck or lint script.

## Architecture

### Slide Content

- `slides.md` — root entry point; imports page partials via `src:` frontmatter
- `pages/*.md` — one file per React topic (hooks, state, routing, etc.)
- Each page file is a standalone slide deck merged into the main presentation

### Custom Vue Components (used inside slides)

- `components/` — Vue SFCs (`.vue`) and React interop files (`.jsx`) embedded in slides via `<ComponentName />` MDC syntax
- `components/hooks/`, `components/state/`, `components/intro/` — topic-grouped interactive demos
- `global-top.vue` — injects `<TocIcon />` on every slide
- `global-bottom.vue` — WebSocket-connected visitor counter using `@vueuse/core`'s `useWebSocket`
- `layouts/iframe-lazy.vue` — lazy-loading iframe layout for embedding external demos

### Live Code Runners (`setup/code-runners.ts`)

Enables interactive code blocks in slides:
- `vue` runner: compiles Vue SFCs in-browser via `@vue/compiler-sfc`
- `jsx` runner: transpiles JSX in-browser via `@babel/standalone`, renders with React 19 into a sandboxed `div`

Code blocks marked ` ```vue ` or ` ```jsx ` become runnable in the slide presentation.

### Styling

UnoCSS with custom shortcuts defined in `unocss.config.ts`:
- `text-gradient` — green-to-purple gradient text
- `logo`, `btn`, `card`, `input` — reusable utility shortcuts
- Web fonts: `font-strong` (Rubik Iso), `font-fast` (Ubuntu), `font-hand` (Caveat), `font-mono` (Operator Mono italic)

### RSC Sub-app (`rsc/`)

A separate standalone Vite app demonstrating React Server Components with `@vitejs/plugin-rsc` and `better-sqlite3`. It has its own `package.json` and is not part of the main Slidev build. Run it independently from `rsc/`.

### Snippets (`snippets/`)

Reusable code snippet files referenced in slides via `<<< @/snippets/...` imports.

## Adding Slides

1. Create or edit the relevant `pages/<topic>.md`
2. Ensure `slides.md` has `src: ./pages/<topic>.md` in a separator block
3. Vue components in `components/` are auto-imported — no import statements needed in slides
4. Use `layout: center`, `hideInToc: true`, `name: SomeName` in slide frontmatter as needed

## Prettier

Single quotes, no semicolons. Slidev markdown files use `prettier-plugin-slidev` — always run `pnpm format` before committing slide content.
