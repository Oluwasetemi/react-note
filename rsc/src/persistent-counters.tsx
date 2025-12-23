'use client'

import React, { use } from 'react'
import { getClientCounter, updateClientCounter } from './action'

/**
 * APPROACH 1: Optimistic Updates with use() hook (Best UX)
 * - Suspends while loading initial data
 * - Updates UI immediately
 * - Syncs with DB in background
 * - Fast and responsive
 */
export function OptimisticClientCounter({
  initialData,
}: {
  initialData: Promise<number>
}) {
  // Use the 'use' hook to unwrap the promise - will suspend if not ready
  const initialCount = use(initialData)

  const [count, setCount] = React.useState(initialCount)
  const [isPending, startTransition] = React.useTransition()
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleClick = () => {
    // Optimistic update - instant UI feedback
    setCount((prev) => prev + 1)

    // Sync with database in background
    startTransition(async () => {
      setIsSyncing(true)
      try {
        const newCount = await updateClientCounter(1)
        setCount(newCount) // Update with server value in case of drift
      } catch (error) {
        console.error('Failed to sync:', error)
        // Revert optimistic update on error
        setCount((prev) => prev - 1)
      } finally {
        setIsSyncing(false)
      }
    })
  }

  return (
    <div>
      <h3>Approach 1: Optimistic Updates</h3>
      <button onClick={handleClick} disabled={isPending}>
        Count: {count} {isSyncing && '💾'}
      </button>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        ⚡ Instant UI update, syncs in background. Uses <code>use()</code> hook
        for initial load.
      </p>
    </div>
  )
}

/**
 * APPROACH 2: Wait for Server with use() hook (Most Reliable)
 * - Suspends while loading initial data
 * - Waits for DB update before updating UI
 * - Slower but guaranteed consistency
 * - Shows loading state
 */
export function ServerSyncClientCounter({
  initialData,
}: {
  initialData: Promise<number>
}) {
  const initialCount = use(initialData)
  const [count, setCount] = React.useState(initialCount)
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    startTransition(async () => {
      // Wait for server to update, then update UI
      const newCount = await updateClientCounter(1)
      setCount(newCount)
    })
  }

  return (
    <div>
      <h3>Approach 2: Server-First</h3>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Saving...' : `Count: ${count}`}
      </button>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        🔒 Waits for DB confirmation before updating. Uses <code>use()</code>{' '}
        hook.
      </p>
    </div>
  )
}

/**
 * APPROACH 3: Auto-Sync with Debounce and use() hook (Best for Rapid Clicks)
 * - Suspends while loading initial data
 * - Updates UI instantly
 * - Batches rapid updates
 * - Syncs after user stops clicking
 */
export function DebouncedClientCounter({
  initialData,
}: {
  initialData: Promise<number>
}) {
  const initialCount = use(initialData)
  const [count, setCount] = React.useState(initialCount)
  const [dbCount, setDbCount] = React.useState(initialCount)
  const [isSyncing, setIsSyncing] = React.useState(false)
  const syncTimeoutRef = React.useRef<NodeJS.Timeout>()

  // Sync to DB after 1 second of no clicks
  React.useEffect(() => {
    if (count !== dbCount) {
      setIsSyncing(true)

      // Clear previous timeout
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }

      // Set new timeout
      syncTimeoutRef.current = setTimeout(async () => {
        try {
          const diff = count - dbCount
          const newCount = await updateClientCounter(diff)
          setDbCount(newCount)
        } catch (error) {
          console.error('Sync failed:', error)
        } finally {
          setIsSyncing(false)
        }
      }, 1000)
    }

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [count, dbCount])

  const handleClick = () => {
    setCount((prev) => prev + 1)
  }

  const isDirty = count !== dbCount

  return (
    <div>
      <h3>Approach 3: Debounced Auto-Sync</h3>
      <button onClick={handleClick}>
        Count: {count}
        {isDirty && ' *'}
        {isSyncing && ' 💾'}
      </button>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        ⏱️ Batches rapid clicks, syncs after 1s pause. Uses <code>use()</code>{' '}
        hook.
        {isDirty && !isSyncing && ' (unsaved changes)'}
      </p>
    </div>
  )
}

/**
 * APPROACH 4: Hybrid with use() hook - Show Both States (Most Transparent)
 * - Suspends while loading initial data
 * - Shows local state and DB state separately
 * - User controls when to sync
 * - Educational, shows the concept clearly
 */
export function HybridClientCounter({
  initialData,
}: {
  initialData: Promise<number>
}) {
  const initialCount = use(initialData)
  const [localCount, setLocalCount] = React.useState(initialCount)
  const [dbCount, setDbCount] = React.useState(initialCount)
  const [isPending, startTransition] = React.useTransition()

  const handleIncrement = () => {
    setLocalCount((prev) => prev + 1)
  }

  const handleSync = () => {
    startTransition(async () => {
      const diff = localCount - dbCount
      const newCount = await updateClientCounter(diff)
      setDbCount(newCount)
      setLocalCount(newCount)
    })
  }

  const isDirty = localCount !== dbCount

  return (
    <div>
      <h3>Approach 4: Hybrid (Manual Sync)</h3>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button onClick={handleIncrement}>Local: {localCount}</button>
        <button
          onClick={handleSync}
          disabled={!isDirty || isPending}
          style={{
            background: isDirty ? '#4CAF50' : '#ccc',
            color: 'white',
          }}
        >
          {isPending ? 'Syncing...' : 'Save to DB'}
        </button>
        <span style={{ fontSize: '0.9rem' }}>DB: {dbCount}</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        🎛️ Manual control - click "Save to DB" to persist. Uses{' '}
        <code>use()</code> hook.
        {isDirty && ' (you have unsaved changes!)'}
      </p>
    </div>
  )
}

/**
 * Fallback component shown while Suspense is loading
 */
export function CounterFallback() {
  return (
    <div
      style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '4px' }}
    >
      <p style={{ margin: 0 }}>⏳ Loading counter from database...</p>
    </div>
  )
}

/**
 * Error boundary wrapper for counters
 */
export class CounterErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '1rem',
            background: '#ffebee',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: 0, color: '#c62828' }}>
            ❌ Error loading counter: {this.state.error?.message}
          </p>
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
