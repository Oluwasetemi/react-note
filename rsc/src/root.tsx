import './index.css' // css import is automatically injected in exported server components
import { Suspense } from 'react'
import viteLogo from '/vite.svg'
import {
  createUser,
  getAllUsers,
  getClientCounter,
  getServerCounter,
  updateServerCounter,
} from './action.tsx'
import reactLogo from './assets/react.svg'
import { ClientCounter } from './client.tsx'
import { UserForm } from './user-form.tsx'
import {
  CounterErrorBoundary,
  CounterFallback,
  DebouncedClientCounter,
  HybridClientCounter,
  OptimisticClientCounter,
  ServerSyncClientCounter,
} from './persistent-counters.tsx'

export function Root(props: { url: URL }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <App {...props} />
      </body>
    </html>
  )
}

async function App(props: { url: URL }) {
  return (
    <div id="root">
      <div>
        <div className="card">
          <form
            action={async (formData: FormData) => {
              'use server'
              const name = formData.get('name') as string
              await createUser(name)
            }}
          >
            <input name="name" placeholder="Enter name" required />
            <button type="submit">Create User</button>
          </form>

          <ul>
            {(await getAllUsers()).map((user) => (
              <li key={user.id}>
                {user.name} - {user.created_at}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1>Vite + RSC</h1>
      <div className="card">
        <ClientCounter />
      </div>
      <div className="card">
        <form action={updateServerCounter.bind(null, 1)}>
          <button>Server Counter: {getServerCounter()}</button>
        </form>
      </div>
      <div className="card">
        <UserForm />
      </div>

      <div className="card">
        <h2>Persistent Client Counters - 4 Approaches with Suspense</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          All counters use the <code>use()</code> hook to load initial data from
          the database. Each is wrapped in a Suspense boundary with fallback UI.
        </p>
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
          <CounterErrorBoundary>
            <Suspense fallback={<CounterFallback />}>
              <OptimisticClientCounter initialData={getClientCounter()} />
            </Suspense>
          </CounterErrorBoundary>

          <hr />

          <CounterErrorBoundary>
            <Suspense fallback={<CounterFallback />}>
              <ServerSyncClientCounter initialData={getClientCounter()} />
            </Suspense>
          </CounterErrorBoundary>

          <hr />

          <CounterErrorBoundary>
            <Suspense fallback={<CounterFallback />}>
              <DebouncedClientCounter initialData={getClientCounter()} />
            </Suspense>
          </CounterErrorBoundary>

          <hr />

          <CounterErrorBoundary>
            <Suspense fallback={<CounterFallback />}>
              <HybridClientCounter initialData={getClientCounter()} />
            </Suspense>
          </CounterErrorBoundary>
        </div>
      </div>

      <div className="card">Request URL: {props.url?.href}</div>
      <ul className="read-the-docs">
        <li>
          Edit <code>src/client.tsx</code> to test client HMR.
        </li>
        <li>
          Edit <code>src/root.tsx</code> to test server HMR.
        </li>
        <li>
          Visit{' '}
          <a href="?__rsc" target="_blank">
            <code>?__rsc</code>
          </a>{' '}
          to view RSC stream payload.
        </li>
        <li>
          Visit{' '}
          <a href="?__nojs" target="_blank">
            <code>?__nojs</code>
          </a>{' '}
          to test server action without js enabled.
        </li>
      </ul>
    </div>
  )
}
