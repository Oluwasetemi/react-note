---
layout: center
transition: slide-up
hideInToc: true
---

# Routing and Navigation

<div mt-2 />

- <a @click="$slidev.nav.next()">Introduction to Routing and React Router</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Setting Up Routes and Links</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Navigating Between Pages</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Dynamic Routing and URL Parameters</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Redirects and Protected Routes</a>

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

To use React Router, first install the react-router-dom package: `npm/pnpm install react-router-dom`

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
---

<iframe src="https://codesandbox.io/p/sandbox/charming-khayyam-vq9qn3?file=%2Fsrc%2FApp.js%3A12%2C17" style="width: 100%; height: 500px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

---
hideInToc: true
transition: slide-left
---

In a <span class="text-gradient">more structured setup</span>, each route’s component (e.g., Home, About, and NavBar) is imported from its own file. This setup keeps App.js `cleaner and allows for better organization`, especially as your application grows. As you would see below, <span class="text-gradient">index.js</span> wraps the App component in BrowserRouter, enabling client-side routing while <span class="text-gradient">App.js</span> defines routes and imports components for each path.

<iframe src="https://codesandbox.io/p/sandbox/silly-cray-nlcw6p?file=%2Fsrc%2FApp.js%3A11%2C1" style="width: 100%; height: 380px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

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
import { Link } from 'react-router-dom'

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
import { useNavigate } from 'react-router-dom'

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
---

<iframe src="https://codesandbox.io/p/sandbox/patient-dust-6pcsm2?file=%2Fsrc%2FProfile.js%3A1%2C1" style="width: 100%; height: 500px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

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
---

<iframe src="https://codesandbox.io/p/sandbox/cool-dawn-x8w7rr?file=%2Fsrc%2FProtectedRoute.js%3A11%2C2" style="width: 100%; height: 500px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

---
hideInToc: true
transition: slide-right
---

## [Assignment]{.text-gradient.text-4xl}

Build a simple `Blog Application` with `React Router`. The app should have a `Home Page` displaying a list of blog posts. Each post should have a title and a brief excerpt, with a link to its `Detail Page`. The `Detail Page` should show the full content of the selected blog post, which can be dynamically generated. Users should be able to go back to the `Home Page` from any page or the previous page. Also, <span class="text-gradient">handle 404 errors</span> by displaying a fallback page when a non-existent route is visited.
