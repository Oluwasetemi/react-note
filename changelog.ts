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
