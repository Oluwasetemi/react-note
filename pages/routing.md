---
layout: center
transition: slide-up
hideInToc: true
---

# Routing and Navigation

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Introduction to Routing and React Router</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Setting Up Routes and Links</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Navigating Between Pages</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Dynamic Routing and URL Parameters</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">Redirects and Protected Routes</a>
- <a @click="$slidev.nav.go($nav.currentPage+14)">Tanstack Router</a>
- <a @click="$slidev.nav.go($nav.currentPage+19)">Frameworks</a>
- <a @click="$slidev.nav.go($nav.currentPage+22)">SEO with unhead</a>

---
hideInToc: true
transition: slide-down
clickStart: 2
---

## [What is Routing❓❓❓❓❓]{.text-gradient.text-4xl}

In traditional websites, navigating to a new page involves the browser requesting a new HTML, CSS and JS document from the server, resulting in a full page reload. This approach is often slow and disrupts the user experience. With routing in `SPAs (Single Page Applications)`, we can simulate a multi-page experience without reloading the page, creating a faster, smoother experience.

<v-clicks>

## How does routing work❓

When routing is handled on the client side (in the browser), JavaScript manages which content to display based on the URL. Instead of fetching new HTML files for each view, a single-page application (SPA) `dynamically updates displayed components`, creating the illusion of navigating multiple pages within a single web page.

This is where <span class="text-gradient text-2xl">React Router </span> comes in. As the most popular library for navigation in React applications, React Router enables seamless route-based navigation in SPAs. `React Router enables "client side routing"`. It allows developers to define routes that update views without reloading the page, giving users a smooth, app-like experience as they move between different "pages" within the application.
</v-clicks>

---
hideInToc: true
transition: slide-up
---

# Routing Comparison: Traditional Web vs. Client-Side Routing

| Step                       | Traditional Web Routing                                            | Client-Side (SPA) Routing                                             |
| -------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **1. Home Page**           | User visits `/`, browser loads HTML, CSS and JS from the server    | User visits `/`, React Router loads the Home component without reload |
| **2. Navigation to About** | New request to the server for `/about`                             | React Router intercepts `/about` and updates view instantly           |
| **3. Content Update**      | Server sends new HTML, CSS and JS for `/about`, replacing the page | "About" component rendered dynamically within the page                |
| **4. User Experience**     | Full-page reloads cause delays                                     | Navigation is smooth and instant                                      |

---
hideInToc: true
transition: slide-left
---

## [Setting Up Routes and Links]{.text-gradient.text-4xl}

To use React Router, first install the react-router package: `npm/pnpm/bun install react-router`

After installing React Router, you can start defining routes and setting up navigation.
To configure basic routing setup, use these components: BrowserRouter, Routes, Route, Link

- <span class="text-gradient">BrowserRouter</span> enables routing functionality across the app.
- <span class="text-gradient">Routes</span> holds each route.
- <span class="text-gradient">Route</span> maps each URL path to a component.
- <span class="text-gradient">Link</span> generates navigational links that change the view without reloading.

<v-clicks>

In the basic setup in the next page ➠, `BrowserRouter` wraps the entire application, which allows React Router to manage the routing. We define the `Routes component`, which holds multiple Route elements. Each Route specifies a path (like / for the home page) and an element (like `<Home />` or `<About />`) that gets rendered when the path is matched. This approach is ideal for quick setups and demos, where you might not need to split everything into separate files.

<span class="text-gradient">PS: You most likely won&apos;t do this while building your applications.</span>

See the basic setup with Routes ➠
</v-clicks>

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://codesandbox.io/embed/vq9qn3?view=editor+%2B+preview&module=%2Fsrc%2FApp.js%3A12%2C17
name: Basic Setup with Routes
autoLoad: true
---

---
hideInToc: true
transition: slide-left
name: Explanation of Basic Setup
---

In a <span class="text-gradient">more structured setup</span>, each route’s component (e.g., Home, About, and NavBar) is imported from its own file. This setup keeps App.js `cleaner and allows for better organization`, especially as your application grows. As you would see below, <span class="text-gradient">index.js</span> wraps the App component in BrowserRouter, enabling client-side routing while <span class="text-gradient">App.js</span> defines routes and imports components for each path.

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://codesandbox.io/embed/nlcw6p?view=editor+%2B+preview&module=%2Fsrc%2FApp.js%3A11%2C1
name: Basic Setup with Routes
autoLoad: true
---

---
hideInToc: true
transition: slide-down
---

## [Navigating Between Pages]{.text-gradient.text-4xl} 🧭

Navigation in React Router is handled by the Link and useNavigate components, allowing users to navigate both via `clicks` and `programmatically`.

<div class="flex gap-3">
<div v-click>
✴ <span class="text-gradient"> Client-Side Navigation with Link:</span> Using "Link" components replaces traditional anchor tags, allowing for smooth client-side transitions.

```jsx
import { Link } from 'react-router'

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```

</div>

<div v-click>
✴ <span class="text-gradient">Programmatic Navigation with useNavigate:</span> To navigate in response to an event (like a form submission), use the useNavigate hook.

```jsx
import { useNavigate } from 'react-router'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Login logic
    navigate('/dashboard')
  }

  return <button onClick={handleLogin}>Login</button>
}
```

</div>
</div>

---
hideInToc: true
transition: slide-left
---

## [Dynamic Routing and URL Parameters]{.text-gradient.text-4xl}

Dynamic routing in React Router enables `a single route to handle multiple URL variations` by using <span class="text-gradient">URL parameters</span>. This is especially useful when building pages with variable content, such as user profiles, product details, or blog posts, where each view depends on a unique identifier like an ID or a username.

### For example, a route like /profile/:username can dynamically render different content based on the `username parameter` in the URL.

<v-clicks>

In the example in the next page ➠, here is what happens:

<span class="text-gradient">1️⃣</span> When the app loads, it displays the Home component. The user can `enter a username` and click "Go to Profile."

<span class="text-gradient">2️⃣</span> The handleSubmit function in Home.js `uses navigate to redirect` the user to `/profile/:username`, replacing :username with the actual username entered.

<span class="text-gradient">3️⃣</span> The Profile component `extracts the username from the URL using useParams`, displaying a personalized message.

</v-clicks>

---
hideInToc: true
transition: slide-up
layout: iframe-lazy
url: https://codesandbox.io/embed/nqzq6v?view=preview&module=%2Fsrc%2FProfile.js
name: Redirects and Protected Routes
autoLoad: true
---

---
hideInToc: true
---

## [Redirects and Protected Routes]{.text-gradient.text-4xl}

Redirects and protected routes are essential for `securing certain parts` of your application or `guiding users` to appropriate pages. Protected routes, for instance, restrict access to authenticated users, while redirects can send users to a different path if certain conditions aren't met.

In the next example in the next page ➠, we create a protected route that only allows authenticated users to access it. If the user is not authenticated, they are redirected to the login page.

<v-clicks>

<span class="text-gradient">1️⃣</span> The ProtectedRoute component checks if the user is authenticated.

<span class="text-gradient">2️⃣</span> If isAuthenticated is false, it redirects to /login using the <Navigate /> component, effectively preventing access to the protected Dashboard route.

<span class="text-gradient">3️⃣</span> If isAuthenticated is true, it renders the child component (in this case, Dashboard), granting access.

</v-clicks>

---
hideInToc: true
transition: slide-down
layout: iframe-lazy
url: https://codesandbox.io/embed/vhts7t?view=preview&module=%2Fsrc%2FProtectedRoute.js
name: Redirects and Protected Routes Example
autoLoad: true
---

---
hideInToc: true
transition: slide-left
---

## [React Router vs. Tanstack Router]{.text-gradient.text-4xl}

React Router is a powerful library for managing routing in React applications, but it can be complex and sometimes overwhelming. Tanstack Router is a newer alternative that aims to simplify routing while providing similar functionality. It offers a more intuitive API, better performance, and improved developer experience.

Tanstack Router is designed to be more flexible and easier to use, making it a great choice for developers looking for a simpler routing solution. It also integrates well with other Tanstack libraries, such as Tanstack Query, providing a cohesive experience for managing data and routing in your applications.

---
hideInToc: true
transition: slide-up
---

## Key Differences

| Feature                | React Router                                      | Tanstack Router                                  |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------ |
| **API Complexity**     | More complex, with a steeper learning curve       | Simpler and more intuitive API                   |
| **Performance**        | Good, but can be slower with large apps           | Optimized for better performance                 |
| **Data Fetching**      | Requires additional libraries (e.g., React Query) | Built-in data fetching capabilities              |
| **Integration**        | Integrates with various libraries                 | Seamless integration with Tanstack libraries     |
| **Community**          | Large and active community                        | Growing community, but smaller than React Router |
| **Documentation**      | Comprehensive, but can be overwhelming            | Clear and concise documentation                  |
| **Learning Resources** | Abundant tutorials and resources                  | Fewer resources available                        |
| **Flexibility**        | Highly flexible, but can lead to complexity       | More opinionated, but easier to use              |
| **State Management**   | Requires external libraries (e.g., Redux)         | Built-in state management capabilities           |

<style>
  /* reduce font-size of the table */

  table {
    font-size: 0.8rem;
    color: black;
  }
  th {
    font-size: 0.8rem;
  }
  td {
    font-size: 0.8rem;
  }
  th, td {
    padding: 0.5rem;
  }
  th {
    background-color: #f0f0f0;
  }
  td {
    background-color: #fff;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
</style>

---
hideInToc: true
transition: slide-up
---

## [TanstackRouter]{.text-gradient.text-4xl}

Tanstack Router is a powerful and flexible routing library for React applications. It provides a simple and intuitive API for managing routes, making it easy to create complex navigation structures. With Tanstack Router, you can define routes, handle URL parameters, and manage nested routes with ease.

Step 1: install the router

````md magic-move
```sh
# npm
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

```sh
# pnpm (recommended)
pnpm add @tanstack/react-router @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
```

```sh
# yarn
yarn add @tanstack/react-router @tanstack/react-router-devtools
yarn add -D @tanstack/router-plugin
```

```sh
# bun
bun add @tanstack/react-router @tanstack/react-router-devtools
bun add -D @tanstack/router-plugin
```
````

Step 2: Configure Vite Plugin

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
})
```

---
hideInToc: true
transition: slide-left
---

Step 3: Create Basic Router Setup

````md magic-move
```js
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, Link, createRouter, createRoute, createRootRoute, } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// Root route with navigation
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

```js
// Home page route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})
```

```js
// About page route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})
```

```js
// Combine routes into tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

// Create router instance
const router = createRouter({ routeTree })

// TypeScript declaration for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

```js
// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
```
````

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-nfqyhumz?ctl=1&embed=1&file=src%2FApp.jsx
---

---
hideInToc: true
transition: slide-left
---

<div grid class="grid-cols-2 gap-2">

- ✅ 100% TypeScript Support - Fully type-safe routing
- ✅ File-based Routing - Automatic route generation
- ✅ Nested Routing - Complex route hierarchies
- ✅ Search Params - Built-in URL state management
- ✅ Data Loading - Route-level data fetching
- ✅ DevTools - Built-in development tools
- ✅ Code Splitting - Automatic bundle optimization

<div>

```sh
# Create new project
npx create-tsrouter-app@latest my-app --template file-router

# Navigate and install
cd my-app
npm install
npm run dev
```

<sub>The support for file based routing, route file generation with the route gen tree is truly amazing and innovative.</sub>

</div>

</div>

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://stackblitz.com/edit/tanstack-router-k5akabnz?ctl=1&embed=1&view=preview
---

---
hideInToc: true
transition: slide-left
---

## [Frameworks]{.text-gradient.text-4xl}

Frameworks are pre-built libraries that provide a structure for building applications. They often include built-in features like routing, state management, and data fetching, making it easier to develop complex applications quickly. Some popular frameworks include:

- **Next.js**: A React framework for building server-rendered applications. It provides features like static site generation, API routes, and built-in CSS support.
- **Tanstack Start**: A new framework for building web applications using Tanstack Router based and good principles of tanstack query. It provides a simple and intuitive API for managing routes, making it easy to create complex navigation structures.
- **Remix** and **React Router v7** : A full-stack React framework that focuses on server-rendered applications. It provides features like data loading, nested routes, and built-in caching.
- [**Redwood SDK**](https://rwsdk.com/): is a React framework for building server-side web apps on Cloudflare
- **Waku**, **Vike**

---
hideInToc: true
transition: slide-up
---

## Next.js

Next.js is a React framework that enables server-side rendering and static site generation. It provides a powerful routing system, allowing you to create dynamic routes and handle URL parameters easily. Next.js also offers features like API routes, built-in CSS support, and automatic code splitting, making it a great choice for building modern web applications. With its App Router and Pages Router, Next.js allows you to choose between a file-based routing system and a more flexible approach, giving you the best of both worlds. It has the pages and app router system. Old apps using pages is fine but new project should come in app router.

* [Simple Auth in Next(pages router)](https://codesandbox.io/p/devbox/hardcore-ganguly-x8pkcd)

* [Sample Todo App](https://github.com/Oluwasetemi/my-tinyuka-nextapp) - [Live URL](https://my-tinyuka-nextapp.vercel.app/)

---
hideInToc: true
transition: slide-left
---

## Tanstack Start

Tanstack Start is a new framework for building web applications using Tanstack Router. It provides a simple and intuitive API for managing routes, making it easy to create complex navigation structures. With Tanstack Start, you can define routes, handle URL parameters, and manage nested routes with ease. It also integrates well with other Tanstack libraries, such as Tanstack Query, providing a cohesive experience for managing data and routing in your applications.

New example project can be created using Tanstack Start CLI(npm create @tanstack/start@latest), Tanstack Builder(pnpx create-start-app@latest)

---
hideInToc: true
transition: slide-right
---

# SEO

Unhead has first-class support for React, allowing you to manage your head tags using a `<Head>` component, the `useHead()` hook, and other ecosystem hooks.

It can directly replace react-helmet, handling a more diverse set of use cases from SEO to structured data.

- Install the `@unhead/react` package
- Setup the provider using `const head = createHead()`
- `UnheadProvider` will wrap your application with the `head` prop.

```jsx
import { createHead, UnheadProvider } from '@unhead/react/client'

const head = createHead()

const root = createRoot( document.getElementById('root'));

root.render(
  <StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </StrictMode>,
)
```

---
hideInToc: true
transition: slide-right
---

## [Assignment]{.text-gradient.text-4xl}

Build a simple `Blog Application` with `React Router` and `Tanstack Router`. The app should have a `Home Page` displaying a list of blog posts(fetch the post from the [API](https://api.oluwasetemi.dev)). Each post should have a title and a brief excerpt, with a link to its `Detail Page`. The `Detail Page` should show the full content of the selected blog post, which can be dynamically generated. Users should be able to go back to the `Home Page` from any page or the previous page. Also, <span class="text-gradient">handle 404 errors</span> by displaying a fallback page when a non-existent route is visited. Implement Error Boundary and Suspense with LazyLoading.

Try out [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/installation) for a different experience.

We will discuss more about frameworks in the next semester. 🚀 Nextjs, ReactRouterv7, Tanstack, and more.
