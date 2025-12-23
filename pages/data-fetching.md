---
layout: center
transition: slide-up
hideInToc: true
---

# Data Fetching and Working with APIs

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Fetching Data with "fetch" and "axios"</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Handling Asynchronous Data and Promises</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Error Handling and Loading States</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Using SWR for Data Fetching</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Using React Query for Data Management</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">Suspense + Lazy Loading + Error Boundaries</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">SSR and RSC</a>

---
hideInToc: true
transition: slide-down
---

# [Fetching Data with "fetch" and "axios"]{.text-gradient}

[Data Fetching]{.text-teal-400} is one of the key aspect of coding. Often times, we would want to fetch data from an external library or database by consuming APIs connecting us to the backend where the data are stored. There would also be a need where you want to send to the database instead, or update it. This process of sending and/or receiving data from an external or backend database is termed as [Data Fetching]{.text-teal-400.italic}.

<v-click>

How do we perform [Data Fetching]{.text-gradient} in {React}?

</v-click>

<v-click>

We can achieve this using the built-in `fetch()` API, or by using a third-party library like `Axios()`

</v-click>

<v-clicks>

- [fetch() API]{.text-gradient}: A built-in JavaScript API for making HTTP requests. It returns a Promise and works natively in modern browsers. While lightweight, it requires manual handling of JSON parsing (`response.json()`) and HTTP errors (`response.ok`).

- [axios]{.text-gradient}: A third-party library that simplifies HTTP requests. It has built-in support for JSON transformation, better error handling, and allows configuration of global defaults (e.g., base URLs or headers). For instance, `axios.get('/api/data')` is simpler than setting up options for fetch.

</v-clicks>

---
hideInToc: true
transition: slide-left
---

# [Using the fetch() API]{.text-gradient}

To use the `fetch()` API in {React}, you need to properly manage state to avoid infinite API calls and simply call the `fetch()` in a promise or an async/await function, passing the methods, header, authorization, etc, if needed. Below are simply performing a `GET` request without error handling which is addressed in subsequent slides. If you will use `useEffect` it should be done like this but it is generally discouraged in favour of `swr` or `@tanstack/react-query`.

```jsx {monaco} {lineNumbers: true, height: '20rem'}
const FetchDataExample = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const response = await fetch('https://api.oluwasetemi.dev/posts')

      if (!response.ok) console.error('Network response was not ok')

      const jsonData = await response.json()
      setData(jsonData)
    }

    if (!ignore) {
      fetchData()
    }

    return () => {
      ignore = true;
    }
  }, [])

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

export default FetchDataExample
```

---
hideInToc: true
transition: fade
---

# [Using Axios]{.text-gradient}

Since `Axios` is a third-party library, you would need to install the package by running `npm install axios`. Once it is installed, import the package to your component and properly manage state to avoid infinite requests. Again, error handling is detailed in the subsequent slide on properly handling errors while fetching data.

```jsx {monaco} {lineNumbers: true, height: '20rem'}
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AxiosDataExample = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let ignore = false;

    axios
      .get('https://api.oluwasetemi.dev/posts')
      .then((response) => {
          if (!ignore) {
            setData(response.data)
          }
        })

    return () => {
      ignore = true
    }
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

export default AxiosDataExample
```

---
hideInToc: true
transition: fade
---

# [Handling Asynchronous Data and Promise]{.text-gradient}

In the previous slides a hint of asynchronous fetching was seen. Let's talk more on how to properly handle asynchronous fetching.

<v-click>

[Steps:]{.text-gradient}

</v-click>

<v-clicks>

- Define a function to handle the asynchronous call.
- Use `async/await` for better readability or `.then()` for chaining promises.
- Manage errors with `try/catch` or `.catch()`.

</v-clicks>

<div v-click>

````md magic-move {at: 6}
```jsx
// Using async/await
useEffect(() => {
  let ignore = false;

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.oluwasetemi.dev/posts')
      const jsonData = await response.json()
      setData(jsonData)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!ignore) {
    fetchData()
  }

  return () => {
    ignore = true;
  }
}, [])
```

```jsx
// Using .then()
useEffect(() => {
  let mounted = true;

  fetch('https://api.oluwasetemi.dev/posts')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    })
    .then((jsonData) => { if (mounted) setData(jsonData) })
    .catch((err) => { if (mounted) setError(err.message) })

  return () => {
    mounted = false;
  }
}, [])
```
````

</div>

<div v-click="7">

The `async/await` is a modern syntax that makes asynchronous code look synchronous, improving readability.

</div>

---
hideInToc: true
transition: slide-right
---

# [Error Handling and Loading States]{.text-gradient}

{React} applications should provide a seamless user experience when loading or when errors occur.

<div v-click="1" class="text-sm">

[This involves:]{.text-gradient}

<v-clicks at="2">

- Loading States: Displaying a loading spinner or message until data is fetched.
- Error Handling: Showing user-friendly error messages when a request fails.
- Data: Set when the data is successfully retrieved.

</v-clicks>

</div>

<div v-click="5">

```jsx {monaco} {lineNumbers: true, height: '18rem'}
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  let ignore = false;

  const fetchData = async () => {
    setLoading(true) // Start loading
    try {
      const response = await fetch('https://api.oluwasetemi.dev/posts')
      if (!response.ok) throw new Error('Failed to fetch data')
      const jsonData = await response.json()
      setData(jsonData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false) // Stop loading
    }
  }
  if (!ignore) {
    fetchData()
  }

  return () => {
    ignore = true;
  }
}, [])

if (loading) return <p>Loading...</p>
if (error) return <p>Error: {error}</p>

return (
  <ul>
    {data.map((item) => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
)
```

</div>

---
hideInToc: true
transition: slide-up
---

# [Using SWR for Data Fetching]{.text-gradient}

[SWR]{.text-teal-400} is a lightweight data-fetching library from Vercel. It focuses on caching, revalidation, and subscription-like updates (focus/reconnect/interval) with a tiny API. Check the [docs](https://swr.vercel.app/).

<v-clicks>

- Install: `npm/pnpm/bun install swr`
- Core hook: `useSWR(key, fetcher, options)` for GET + revalidation
- Mutations: `useSWRMutation(key, mutator, { onSuccess: () => mutate() })`
- Subscription-style updates: `revalidateOnFocus`, `revalidateOnReconnect`, `refreshInterval`, and manual `mutate`. `useSWRSubscription` - is a React hook that allows subscribing to real-time data sources with SWR.
- You can enable the suspense option to use SWR with React Suspense. `{suspense: true}`
- Pagination support(normal and infinite loading) and Prefetching of Data.

</v-clicks>

---
hideInToc: true
---


```jsx {monaco} {lineNumbers: true, height: '24rem'}
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

const postComment = async (url, { arg }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  })
  if (!res.ok) throw new Error('Failed to mutate')
  return res.json()
}

function Comments() {
  const { data, error, isLoading, mutate } = useSWR(
    'https://api.oluwasetemi.dev/comments',
    fetcher,
    {
      revalidateOnFocus: true,      // subscribe on focus
      revalidateOnReconnect: true,  // subscribe on reconnect
      refreshInterval: 0,           // set >0 for polling subscription
    }
  )

  const { trigger, isMutating } = useSWRMutation(
    'https://api.oluwasetemi.dev/comments',
    postComment,
    {
      onSuccess: () => mutate(), // revalidate after mutation
    }
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <button
        disabled={isMutating}
        onClick={() => trigger({ body: 'Great post!' })}
      >
        {isMutating ? 'Sending...' : 'Add Comment'}
      </button>

      <ul>
        {data?.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  )
}
```


---
hideInToc: true
transition: slide-up
---

# [Using React Query for Data Management]{.text-gradient}

[React Query]{.text-teal-400} simplifies server-state management with caching, background updates, and easy loading/error handling. It is a powerful way of managing states in a {React} app.

<div v-click="1" class="text-sm">

[This involves:]{.text-gradient}

<v-clicks at="2">

- Install React Query: `npm install @tanstack/react-query`
- Set up a `QueryClient` and `QueryClientProvider` in your app.
- Use the `useQuery` hook to fetch and manage data.

</v-clicks>

</div>

<div v-click="5">

```jsx {monaco} {lineNumbers: true, height: '17rem'}
import { useQuery, QueryClient, QueryClientProvider, } from '@tanstack/react-query'

const queryClient = new QueryClient()

const fetchPosts = async () => {
  const response = await fetch('https://api.oluwasetemi.dev/posts')
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}

const ReactQueryExample = () => {
  const { data, error, isLoading } = useQuery(['posts'], fetchPosts)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryExample />
  </QueryClientProvider>
)

export default App
```

</div>

---
hideInToc: true
layout: iframe-lazy
name: Using Tanstack Query
url: https://stackblitz.com/edit/github-zvtcsu?ctl=1&embed=1&file=src%2Findex.tsx&hideExplorer=1
autoLoad: true
---

---
hideInToc: true
transition: slide-up
class: text-sm
---

# [Suspense for Data Fetching]{.text-gradient.text-4xl}

[Suspense]{.text-teal-400} lets you declaratively specify the loading state for a part of your component tree while waiting for async operations (data loading, code splitting, etc.).

<v-clicks>

<div grid="~ cols-2" gap="2">

<div>

**Key Benefits:**
- Declarative loading states - no manual `isLoading` flags
- Coordinates multiple async operations
- Prevents "waterfall" loading patterns
- Works with lazy imports and data fetching libraries

</div>

<div>

**Syntax:**

```jsx
<Suspense fallback={<Loading />}>
  <ComponentThatSuspends />
</Suspense>
```

</div>
</div>

**What can trigger Suspense?**
- Data fetching with Suspense-enabled frameworks (React Query with `useSuspenseQuery`, SWR with `{suspense: true}`)
- Lazy-loaded components with `React.lazy()`
- Reading from Suspense-enabled resources

</v-clicks>

---
hideInToc: true
---

# [Suspense Example with React Query]{.text-gradient}

```jsx {monaco} {lineNumbers: true, height: '22rem'}
import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

const fetchUser = async () => {
  const res = await fetch('https://api.oluwasetemi.dev/user/1')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

function UserProfile() {
  // useSuspenseQuery automatically suspends during loading
  const { data } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })

  return <div>Welcome, {data.name}!</div>
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile />
    </Suspense>
  )
}
```

**Docs:** [React Suspense](https://react.dev/reference/react/Suspense)

---
hideInToc: true
class: text-sm
---

# [Lazy Loading with Suspense]{.text-gradient}

Code splitting reduces initial bundle size by loading components on demand.

<div class="grid grid-cols-2 gap-4">

<div>

**Without Lazy Loading:**

```jsx
import HeavyComponent from './HeavyComponent'
function App() {
  return (
    <div><HeavyComponent /></div>
  )
}
```

❌ Entire component loaded upfront

<v-click>

**Route-based code splitting:**

```jsx {monaco} {height: '6rem'}
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Suspense>
```

</v-click>

</div>

<div>

**With Lazy Loading:**

```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() =>
  import('./HeavyComponent')
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

✅ Component loaded on demand

</div>

</div>



---
hideInToc: true
---

# [Error Boundaries]{.text-gradient.text-4xl}

Error Boundaries catch JavaScript errors anywhere in the component tree, log them, and display a fallback UI.

<v-clicks>

<div grid="~ cols-2" gap="2">

<div>

**What Error Boundaries catch:**
- Errors during rendering
- Errors in lifecycle methods
- Errors in constructors of components below them

**What they DON'T catch:**
- Event handlers (use try/catch instead)
- Async code (setTimeout, promises)
- Server-side rendering errors
- Errors in the error boundary itself

</div>

<div>

**Class Component Implementation:**

```jsx {monaco}
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

</div>
</div>

</v-clicks>

---
hideInToc: true
---

# [react-error-boundary Library]{.text-gradient}

The `react-error-boundary` library provides a simpler, hook-based way to handle errors.

**Installation:**

````md magic-move

```bash
npm install react-error-boundary
```


```jsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
```

```jsx
function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state
      }}
      onError={(error, errorInfo) => {
        // Log to error reporting service
        console.error('Logged error:', error, errorInfo)
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  )
}
```

````

**Docs:** [react-error-boundary](https://github.com/bvaughn/react-error-boundary)

---
hideInToc: true
---

# [Combining Suspense + Error Boundaries]{.text-gradient}

Best practice: Wrap Suspense boundaries with Error Boundaries for robust error handling.

```jsx {monaco} {lineNumbers: true, height: '22rem'}
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSuspenseQuery } from '@tanstack/react-query'

const Dashboard = lazy(() => import('./Dashboard'))

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error">
      <h2>Oops! Something went wrong</h2> <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )
}
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  )
}
```

**Pattern:** Error Boundary → Suspense → Async Component

---
hideInToc: true
transition: slide-up
---

# [Server-Side Rendering (SSR) APIs]{.text-gradient.text-4xl}

React provides APIs for rendering components on the server for improved performance and SEO.

<div class="grid grid-cols-2 gap-4">

<div>

**Legacy APIs (Node.js Streams):**

- [`renderToString()`](https://react.dev/reference/react-dom/server/renderToString) - Renders tree to HTML string (blocks until complete)
- [`renderToStaticMarkup()`](https://react.dev/reference/react-dom/server/renderToStaticMarkup) - Like renderToString but without React attributes
- [`renderToNodeStream()`](https://react.dev/reference/react-dom/server/renderToNodeStream) - Renders to Node.js readable stream (deprecated)
- [`renderToStaticNodeStream()`](https://react.dev/reference/react-dom/server/renderToStaticNodeStream) - Static version of renderToNodeStream (deprecated)

</div>

<div>

**Modern APIs (Web Streams):**

- [`renderToReadableStream()`](https://react.dev/reference/react-dom/server/renderToReadableStream) - Renders to Web ReadableStream (supports Suspense). `resume` resumes `prerender` to a Readable Web Stream.
- [`renderToPipeableStream()`](https://react.dev/reference/react-dom/server/renderToPipeableStream) - Renders to pipeable Node.js stream (supports Suspense & streaming)

<v-click>

**Client Hydration APIs:**

- [`hydrateRoot()`](https://react.dev/reference/react-dom/client/hydrateRoot) - Attaches React to server-rendered HTML
- [`createRoot()`](https://react.dev/reference/react-dom/client/createRoot) - Creates root for client-only rendering

</v-click>

</div>

</div>

---
hideInToc: true
---

# [SSR Example with renderToString]{.text-gradient}

```jsx {monaco} {lineNumbers: true, height: '22rem'}
// server.js (Node.js + Express(Hono, Fasify, Nest))
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

const server = express()

server.get('*', (req, res) => {
  const appHTML = renderToString(<App />)

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR App</title>
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `

  res.send(html)
})

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

```jsx
// client.js
import { hydrateRoot } from 'react-dom/client'
import App from './App'

hydrateRoot(document.getElementById('root'), <App />)
```

---
hideInToc: true
---

# [Modern SSR with Streaming]{.text-gradient}

Streaming SSR allows sending HTML progressively, improving Time to First Byte (TTFB).

```jsx {monaco} {lineNumbers: true, height: '20rem'}
// server.js (using renderToPipeableStream)
import { renderToPipeableStream } from 'react-dom/server'
import { Suspense } from 'react'

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(
    <html>
      <body>
        <div id="root">
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </div>
      </body>
    </html>,
    {
      onShellReady() {
        res.setHeader('content-type', 'text/html')
        pipe(res)
      },
      onError(error) {
        console.error(error)
      }
    }
  )
})
```

**Benefits:** Shell sent immediately, content streams in as it loads

---
hideInToc: true
transition: slide-up
---

# [React Server Components (RSC)]{.text-gradient.text-sm}

RSC enables components to run **only on the server**, reducing bundle size and enabling direct backend access.

<v-clicks>

<div text-xs>

**Key Differences:**

| **Server Components** | **Client Components** |
|---|---|
| Run only on server | Run on client (& server during SSR) |
| Can directly access databases/APIs | Must fetch via API endpoints |
| Zero JavaScript sent to client | JavaScript bundle sent to client |
| Cannot use hooks/state/effects | Can use all React features & `use client` |

</div>

<div grid="~ cols-2" gap="2" class="text-[9px]">

<div>

**Benefits:**

- Reduced bundle size (server code stays on server)
- Direct backend access (no API layer needed)
- Automatic code splitting
- Improved security (sensitive logic stays server-side)

</div>

<div>

**Constraints:**

- No state (`useState`, `useReducer`)
- No effects (`useEffect`, `useLayoutEffect`)
- No browser APIs
- No event handlers

</div>

</div>

</v-clicks>

---
hideInToc: true
---

# [Server Components Example]{.text-gradient}

<div grid="~ cols-2" gap="2">

```jsx {monaco} {lineNumbers: true, height: '22rem'}
// app/page.jsx (Server Component - default in Next.js)
import { db } from '@/lib/db'  // Direct database access!

export default async function PostsPage() {
  // Fetch data directly on the server
  const posts = await db.post.findMany()

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

```jsx
// app/like-button.jsx (Client Component)
'use client'  // Mark as client component

import { useState } from 'react'

export default function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  )
}
```

</div>

---
hideInToc: true
---

# [Server Actions]{.text-gradient.text-4xl}

Server Actions let you call server-side functions directly from client components, eliminating the need for API routes.

<v-clicks>

**Creating a Server Action:**

<div grid="~ cols-2" gap="2">

```jsx
// app/actions.js
'use server'  // Mark file as containing server actions

import { db } from '@/lib/db'

export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  const post = await db.post.create({
    data: { title, content }
  })

  return { success: true, post }
}
```


```jsx
'use client'
import { createPost } from './actions'

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

</div>

**Docs:** [Server Actions](https://react.dev/reference/rsc/server-actions)

</v-clicks>

---
hideInToc: true
---

# [Server Actions with useActionState]{.text-gradient}

The `useActionState` hook provides better UX with pending states and optimistic updates.

```jsx {monaco} {lineNumbers: true, height: '18rem'}
'use client'
import { useActionState } from 'react'
import { createPost } from './actions'

export default function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    { message: '' }
  )

  return (
    <form action={formAction}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

<div grid="~ cols-[150px_1fr]" gap="2">

<div class="w-[150px] justify-self-start">

**Benefits:**

</div>

- No API routes needed
- Type-safe by default
- Automatic revalidation
- Progressive enhancement (works without JS)

</div>

---
hideInToc: true
---

# [RSC Composition Pattern]{.text-gradient}

Mix Server and Client Components for optimal performance.

<div grid="~ cols-2" gap="2">

```jsx {monaco} {lineNumbers: true, height: '20rem'}
// app/posts/page.jsx (Server Component)
import { db } from '@/lib/db'
import LikeButton from './LikeButton'  // Client Component

export default async function PostsPage() {
  const posts = await db.post.findMany()  // Server-side query

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Client Component for interactivity */}
          <LikeButton postId={post.id} initialLikes={post.likes} />
        </article>
      ))}
    </div>
  )
}
```


<div>

**Pattern:** Server Component (data fetching) → Client Component (interactivity)

**Docs:**
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Server Actions](https://react.dev/reference/rsc/server-actions)
- [Next.js App Router](https://nextjs.org/docs/app)

</div>
</div>

---

## [Assignment]{.text-gradient.text-4xl}

Build a simple `Blog Application` with `React Router` and `Tanstack Router` with Data Fetching Implemented using `Tanstack Query` or `SWR`. The app should have a `Home Page` displaying a list of blog posts. Each post should have a title and a brief excerpt, with a link to its `Detail Page` wrapped in a good card like UI. The `Detail Page` should show the full content of the selected blog post, which can be dynamically generated. Users should be able to go back to the `Home Page` from any page or the previous page. Also, <span class="text-gradient">handle 404 errors</span> by displaying a fallback page when a non-existent route is visited. Implement Error Boundary and Suspense with LazyLoading. Implement creating of new blogpost. Use `[https://api.oluwasetemi.dev](https://api.oluwasetemi.dev)` as the API and check the documentation.

---
hideInToc: true
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-r7m8bpox?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
---
