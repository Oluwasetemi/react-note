export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const entries: ChangelogEntry[] = [
  {
    version: 'v2.2',
    date: '2026-10-25',
    changes: [
      'Added course and chapter table-of-contents navigation',
      'Expanded Async React lessons with Transitions, async Actions, Activity, and optimistic UI',
      'Added React Performance Tracks and updated React Compiler guidance',
      'Added a React playground with syntax highlighting and improved console capture',
      'Updated runnable data-fetching examples and refreshed course explanations and demos',
      'Improved print mode by skipping visitor WebSocket connections and automatic iframe loading',
      'Enabled isolated StackBlitz embeds across 14 demos, with a credentialless iframe for the legacy JavaScript demo',
      'Configured WebContainer isolation headers for Vite, Netlify, and Vercel',
      'Refreshed React, Slidev, and supporting dependencies',
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
