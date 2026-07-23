export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const entries: ChangelogEntry[] = [
  {
    version: 'v2.3',
    date: '2026-05-07',
    changes: [
      'Added full React 19 hooks content to more-hooks.md: useActionState (2 slides + live demo), useFormStatus, use, useOptimistic',
      'Created React19HooksDemo Vue component — carousel of useActionState + useFormStatus code examples with Shiki highlighting',
      'Fixed all TOC nav offsets in more-hooks.md (useFormStatus, useOptimistic, customHooks, useSyncExternalStore, useEffectEvent)',
      'Added use() vs React Query bridge slide to data-fetching.md after Suspense + Error Boundaries section',
      'Created MemoRenderCounter Vue component — live re-render counter showing React.memo effect in real time',
      'Added React.memo live demo slide to performance.md',
      'Added practice prompts to 8 sections: hooks, state, rendering, performance, more-hooks, routing, state-management, test',
      'Expanded test.md with 4 new slides: query priority guide, userEvent vs fireEvent, common jest-dom assertions, async testing with findBy and waitFor',
      'Updated test.md TOC to cover all 9 sections with correct slide offsets',
      'Configured docs/agents/ for engineering skill integration (issue tracker, triage labels, domain docs)',
    ],
  },
  {
    version: 'v2.2',
    date: '2026-05-06',
    changes: [
      'Added a /react-playground',
      'Added the new routes section to TOC'
    ],
  },
  {
    version: 'v2.1',
    date: '2026-05-04',
    changes: [
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
