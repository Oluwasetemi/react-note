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
- <a @click="$slidev.nav.go($nav.currentPage+6)">Using React Query for Data Management</a>

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

To use the `fetch()` API in {React}, you need to properly manage state to avoid infinite API calls and simply call the `fetch()` in a promise or an async/await function, passing the methods, header, authorization, etc, if needed. Below are simply performing a `GET` request without error handling which is addressed in subsequent slides.

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

## [Assignment]{.text-gradient.text-4xl}

Build a simple `Blog Application` with `React Router` and `Tanstack Router` with Data Fetching Implemented using `Tanstack Query`. The app should have a `Home Page` displaying a list of blog posts. Each post should have a title and a brief excerpt, with a link to its `Detail Page` wrapped in a good card like UI. The `Detail Page` should show the full content of the selected blog post, which can be dynamically generated. Users should be able to go back to the `Home Page` from any page or the previous page. Also, <span class="text-gradient">handle 404 errors</span> by displaying a fallback page when a non-existent route is visited. Implement Error Boundary and Suspense with LazyLoading. Implement creating of new blogpost. Use `[https://api.oluwasetemi.dev](https://api.oluwasetemi.dev)` as the API and check the documentation.

---
hideInToc
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-r7m8bpox?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
---
