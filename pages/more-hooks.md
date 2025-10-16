---
layout: center
transition: slide-up
hideInToc: true
---

# More Hooks

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">useRef</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">useReducer</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">useContext</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">use</a>
- <a @click="$slidev.nav.go($nav.currentPage+12)">useLayoutEffect</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">useDeferredValue</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">useActionState</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">useFormStatus</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">useOptimistic</a>
- <a @click="$slidev.nav.go($nav.currentPage+16)">useTransition</a>

---
hideInToc: true
transition: slide-down
clickStart: 2
---

## ✴ [ useRef]{.text-gradient.text-4xl}

useRef is a React Hook that lets you `reference a value that’s not needed for rendering` - it is used to persist a mutable reference without causing unnecessary re-renders. It can:

- Access and manipulate DOM elements directly.
- Store a mutable value that doesn’t trigger re-renders when updated.

Syntax

```jsx
import { useRef } from 'react'

const refContainer = useRef(initialValue)
```

- Initialization: useRef `accepts a parameter (initialValue)` during the first render, which initializes the ref.current property. This initial value is ignored in subsequent renders.
- Returned Object: It returns an object with a single property, `current`.

Unlike useState, refs are mutable. You can directly update ref.current without causing a re-render.

---
hideInToc: true
---

## Why useRef?

They are used for tracking previous state without triggering re-render.

Use `useRef` for managing data that doesn’t trigger re-renders, such as storing interval IDs for animations or timers, tracking previous form input values, or caching API responses for debouncing.

It’s also indispensable for DOM manipulations like <span class="text-teal-400">focusing input fields</span>, <span class="text-teal-400">managing scroll positions for infinite scroll</span>, <span class="text-teal-400">detecting when elements come into view</span> (e.g., lazy-loading images or videos), or <span class="text-teal-400">controlling canvas elements in animations</span>.

Additionally, it’s useful for `integrating third-party libraries` like sliders, charts, or maps where direct DOM interaction is required.

```jsx
const ref = useRef(initialValue)
console.log(ref.current) // Access the current value
ref.current = newValue // Update the value manually
```

⚠️ Do not read or write `ref.current` during rendering, except for initialization.

---
hideInToc: true
transition: slide-down
---

## useState vs useRef

| Feature                      | `useState`             | `useRef`                                       |
| ---------------------------- | ---------------------- | ---------------------------------------------- |
| Triggers Re-render on Update | ✅ Yes                 | ❌ No                                          |
| Mutable                      | ❌ No, immutable       | ✅ Yes, mutable (`ref.current` can be changed) |
| Safe to Read During Render   | ✅ Yes                 | ❌ No                                          |
| Best Use Case                | Displaying/updating UI | Storing data not affecting UI                  |

On the next page 👉, in the counter button implemented with `useState`, the screen updates to reflect the new count because changing the state triggers a re-render of the component. However, if the same counter is implemented with `useRef`, the count can be updated by mutating <span class="text-teal-400">ref.current</span>, but the component will not re-render, so you would never see the count change on the screen.

This highlights a key difference: `useState` is for reactive data that affects the UI, while `useRef` is for storing mutable data that doesn't influence rendering.

---
hideInToc: true
transition: slide-right
layout: iframe-lazy
url: https://codesandbox.io/embed/566hdt?view=editor+%2B+preview&module=%2Fsrc%2Fcomponents%2FuseRefCounter.jsx&hidenavigation=1
name: useRef Counter
autoLoad: true
---

---
hideInToc: true
transition: slide-up
---

## ✴ [ useReducer]{.text-gradient.text-4xl}

useReducer is useful for managing complex state logic.

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init?)
```

<v-clicks>

The hook takes three parameters: a <span class="text-teal-400">reducer</span> function, an <span class="text-teal-400">initialState</span>, and an optional <span class="text-teal-400">init</span> function.

The `reducer` is a function that specifies how the state is updated, structured as `(state, action) => newState` (React passes the current state and action to the reducer , which <span class="text-teal-400">calculates and returns the next state</span>. React then saves the new state, <span class="text-teal-400">re-renders your component</span> with it, and updates the UI accordingly).

The `initialState` is the starting value of the state.

The optional `init` function allows you to compute the initial state, useful for heavy initialization logic.

useReducer returns an array with two elements: `state` and `dispatch`. The state holds the current value, while dispatch is a function that lets you change state in response to interaction - you can call to send actions, update the state, and trigger a re-render. This makes useReducer ideal for managing complex state logic or when state transitions depend on the current state and actions.

Use Cases: <span class="text-teal-400">Complex state logic</span> & <span class="text-teal-400">Centralized state management within a component</span>.

</v-clicks>

---
hideInToc: true
transition: slide-right
---

### Using useReducer in a counter

```jsx
import React, { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}
```

---
hideInToc: true
transition: slide-down
---

## useState vs useReducer

| **Feature**        | `useState`                                                                      | `useReducer`                                     |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| **🔧 Best for**    | Simple state logic, isolated values                                             | Complex state logic with multiple transitions    |
| **📋 State shape** | Single or simple data types (e.g., numbers, booleans)                           | Complex objects or interdependent fields         |
| **🚀 Update**      | State setters ( <span class="text-teal-400">setState</span>) for direct updates | Reducer function for controlled updates          |
| **🎯 Re-renders**  | On state updates via setter                                                     | On dispatch when the reducer returns a new state |

You should use useReducer when your <span class="text-teal-400">state logic becomes complex or involves multiple related variables</span>. However, if your state is simple—like a single boolean toggle, a numeric counter, or isolated values—useState is more appropriate.

---
hideInToc: true
layout: iframe-lazy
url: https://codesandbox.io/embed/vkmlhg?view=editor+%2B+preview&module=%2Fsrc%2Fcomponents%2FuseStateCart.jsx%3A25%2C54
name: useReducer Cart
autoLoad: true
---

---
hideInToc: true
name: Context & Performance Hooks
---

# Context & Performance Hooks

<div class="grid grid-cols-2 gap-6 h-full">

<!-- useContext -->
<div class="space-y-3">
  <h2 class="text-l font-bold text-purple-600">useContext</h2>
  
  <div class="bg-purple-50 p-3 rounded">
    <h3 class="font-semibold text-purple-800">Syntax</h3>
    <code class="text-xs">const value = useContext(SomeContext)</code>
  </div>

  ```jsx
  const ThemeContext = createContext();
  
  function App() {
    return (
      <ThemeContext.Provider value="dark">
        <ThemedButton />
      </ThemeContext.Provider>
    );
  }
  
  function ThemedButton() {
    const theme = use(ThemeContext);
    return <button className={theme}>Click me</button>;
  }
  ```

  <div class="bg-white light:bg-black p-2 rounded text-xs text-black light:text-white">
    <strong>Use:</strong> Global state sharing without prop drilling.
  </div>
</div>

<!-- useMemo -->
<div class="space-y-3">
  <h2 class="text-l font-bold text-orange-600">useMemo</h2>
  
  <div class="bg-orange-50 p-3 rounded">
    <h3 class="font-semibold text-orange-800">Syntax</h3>
    <code class="text-xs">const memoized = useMemo(() => fn(), [deps])</code>
  </div>

  ```jsx
  function ExpensiveComponent({ items, filter }) {
    const filteredItems = useMemo(() => {
      return items.filter(item => item.category === filter);
    }, [items, filter]);
    
    return (
      <div>
        {filteredItems.map(item => <div key={item.id}>{item.name}</div>)}
      </div>
    );
  }
  ```

  <div class="bg-white light:bg-black p-2 rounded text-xs text-black light:text-white">
    <strong>Use:</strong> Memoize expensive calculations to prevent unnecessary re-computations.
  </div>
</div>

</div>

<div class="mt-4 p-3 bg-yellow-50 rounded">
  <h3 class="font-bold text-yellow-800 mb-2">Performance Tips</h3>
  <div class="grid grid-cols-2 gap-4 text-sm">
    <div>
      <strong class="text-purple-700">useContext:</strong>
      <ul class="text-xs mt-1">
        <li>Avoid prop drilling</li>
        <li>Global state management</li>
        <li>Theme & auth data</li>
      </ul>
    </div>
    <div>
      <strong class="text-orange-700">useMemo:</strong>
      <ul class="text-xs mt-1">
        <li>Expensive calculations</li>
        <li>Object/array dependencies</li>
        <li>Prevent re-renders</li>
      </ul>
    </div>
  </div>
</div>

---
hideInToc: true
layout: iframe-lazy
url: https://codesandbox.io/embed/zxzrcz?view=editor+%2B+preview&module=%2Fsrc%2Fcomponents%2FuseContext.jsx%3A41%2C29
name: useContext
autoLoad: true
---

---
hideInToc: true
transition: slide-right
name: useContext Example
---

```jsx
import { createContext, useContext } from 'react'

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}

function ThemedComponent() {
  const theme = use(ThemeContext); // replace with `use`
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      Themed Component
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  )
}
```

Without useContext: You&apos;d need to pass the theme prop down manually, making the code harder to maintain.

---
hideInToc: true
name: Concurrent Features
---

# Concurrent Features

<div class="grid grid-cols-2 gap-6 h-full">

<!-- useTransition -->
<div class="space-y-3">
  <h2 class="text-xs font-bold text-indigo-600">useTransition</h2>
  
  <div class="bg-indigo-50 p-2 rounded">
    <code class="text-[12px]">const [isPending, startTransition] = useTransition()</code>
  </div>

  ```jsx
  function SearchApp() {
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    const handleSearch = (newQuery) => {
      setQuery(newQuery);
      startTransition(() => {
        // Non-urgent update
        setResults(expensiveSearch(newQuery));
      });
    };
    return (...);
  }
  ```

  <div class="bg-white light:bg-black bg-green-50 p-1 rounded text-xs text-black light:text-white">
    <strong>Use:</strong> Mark non-urgent updates to keep UI responsive.
  </div>
</div>

<!-- startTransition -->
<div class="space-y-3">
  <h2 class="text-xl font-bold text-pink-600">startTransition</h2>
  
  <div class="bg-pink-50 p-2 rounded">
    <code class="text-xs">startTransition(() => { /* update */ })</code>
  </div>

  ```jsx
  import { startTransition } from 'react';
  
  function FilterApp() {
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    
    const handleFilter = (newFilter) => {
      setFilter(newFilter);
      startTransition(() => {
        // Expensive filtering operation
        setFilteredData(data.filter(item => item.name.includes(newFilter) ));
      });
    };
    return ();
  }
  ```

  <div class="bg-white light:bg-black bg-blue-50 p-1 rounded text-xs text-black light:text-white">
    <strong>Use:</strong> Wrap expensive updates to prevent blocking.
  </div>
</div>

</div>

---
hideInToc: true
transition: slide-up
---

## ✴ [ useLayoutEffect]{.text-gradient.text-4xl}

useLayoutEffect is a hook designed to perform <span class="text-teal-400">synchronous side effects</span> after DOM mutations `but before the browser repaints the screen`. This ensures that any layout measurements or updates are applied before the user sees them, making it valuable for scenarios where precise alignment or measurements of DOM elements are critical.

It is a <span class="text-teal-400">version of useEffect</span>. However, in contrast, useEffect runs <span class="text-teal-400">asynchronously</span> after the paint cycle, making it more suitable for non-blocking side effects like setting up subscriptions or setting up event listeners. While `both hooks allow for side effects`, their timing and use cases differ significantly.

<v-clicks>

Syntax

```jsx
useLayoutEffect(setup, dependencies?)
```

Use Cases:

- DOM Measurements: If you need to measure an element&apos;s dimensions before rendering dependent content, such as calculating a tooltip's position.

- Avoiding Flickers: When you want to avoid the user seeing visual changes (e.g., moving elements) after the paint cycle.

</v-clicks>

---
hideInToc: true
---

## useLayoutEffect vs useEffect

Use `useLayoutEffect` when you need to measure or synchronize changes to the DOM before the browser repaints, such as positioning tooltips or avoiding flickers in animations. For most other side effects, like fetching data or setting up subscriptions, prefer `useEffect` because it runs after the browser paint, ensuring better performance and smoother user experiences.

⚠️ useLayoutEffect can hurt performance. Prefer useEffect when possible.

| **Feature**               | `useEffect`                                 | `useLayoutEffect`                              |
| ------------------------- | ------------------------------------------- | ---------------------------------------------- |
| 🕑 **Timing**             | Runs _after_ the browser paints the screen. | Runs _before_ the browser repaints the screen. |
| ⚡ **Performance Impact** | Non-blocking, better for most use cases.    | Blocks rendering, may hurt performance.        |
| 🌐 **Server Behavior**    | Executes normally on the server.            | No effect on the server.                       |

---
hideInToc: true
transition: slide-right
layout: iframe-lazy
url: https://codesandbox.io/embed/36d7cr?view=editor+%2B+preview&module=%2Fsrc%2FApp.js%3A8%2C8-8%2C24
name: useLayoutEffect
autoLoad: true
---

---
hideInToc: true
transition: slide-up
name: useLayoutEffect Explanation
---

In the previous example 👈, a tooltip was implemented using both useEffect and useLayoutEffect.

<v-clicks>

`Observations`:

- useEffect: On slower devices, you might notice a <span class="text-teal-400">slight flicker</span> when the tooltip adjusts its position. This happens because the position calculation occurs after the browser paints the DOM.
- useLayoutEffect: The tooltip <span class="text-teal-400">renders in the correct position immediately</span>, avoiding the flicker. This is because layout calculations and DOM updates are completed before the browser paints.

`Key Difference`:

Use useLayoutEffect when you need to measure DOM elements and apply layout changes before the browser paints. Use useEffect for non-blocking effects to maintain performance unless layout adjustments are strictly necessary.

</v-clicks>

---
hideInToc: true
transition: slide-up
name: useDeferredValue 
---

## ✴ [useDeferredValue ]{.text-gradient.text-4xl}

useDeferredValue is a React Hook that lets you `defer the update of certain parts of the user interface`. This improves application responsiveness by delaying non-urgent updates during <span class="text-teal-400">resource-intensive operations</span> & <span class="text-teal-400">high-priority user interactions</span>, like typing in a search box, filtering or rendering a large list.

Syntax

```jsx
const deferredValue = useDeferredValue(value)
```

value: The original value to defer and it returns a deferred value that may lag behind the original during updates.

<v-clicks>

How it Works

1️⃣ On input change, React first renders with the previous deferred value.

2️⃣ React attempts to re-render with the updated deferred value in the background.

3️⃣ If background rendering suspends (e.g., waiting for data), the old deferred value remains visible until ready.

</v-clicks>

---
hideInToc: true
transition: slide-down
name: useDeferredValue Example Of Usage
---

<v-clicks>
Use Cases:

- `Search Filtering`: When typing in a search bar that triggers heavy computations, you can use useDeferredValue to show intermediate results while keeping the typing experience snappy.
- `Rendering Large Data`: While dynamically rendering large datasets, deferring updates prevents blocking other user interactions.

Advantages

- `Enhanced Responsiveness`: Improves UI performance by prioritizing critical updates.
- `Ease of Integration`: Simple to add into existing React codebases for performance optimization.

⚠️ Pitfall in useDeferredValue Optimization

When using useDeferredValue to optimize performance, a key pitfall is that <span class="text-teal-400">components depending on the deferred value must avoid unnecessary re-renders</span>. This often requires wrapping such components in `React.memo`.

</v-clicks>

---
hideInToc: true
transition: slide-down
layout: iframe-lazy
url: https://codesandbox.io/embed/cc6xlm?view=editor+%2B+preview&module=%2Fsrc%2FApp.js%3A5%2C17
name: useDeferredValue Example
autoLoad: true
---

<!--
TODO: Talk about React 19 hooks useActionState, useFormStatus, use, useOptimistic and useTransition
-->

---
hideInToc: true
transition: slide-up
---

## `useActionState` 

Manages state for form actions and async operations. It provides pending state, error handling, and optimistic updates for form submissions and server actions. The was discussed in the previous chapter. 

## `useFormStatus` 

Returns the status of form submissions, including whether a form is pending submission. This is particularly useful for showing loading states on submit buttons. The was discussed in the previous chapter.

## `useOptimistic`

Enables optimistic UI updates by allowing you to show the expected result of an action immediately, then reconciling with the actual server response when it arrives. Allows you to optimistically update the UI while an asynchronous operation is in progress. It shows the expected result immediately and automatically reverts if the operation fails.

```jsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```



---
hideInToc: true
transition: slide-up
---

## More on `useOptimistic`

```jsx
import { useOptimistic } from 'react';

function AppContainer() {
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // updateFn
    (currentState, optimisticValue) => {
      // merge and return new state
      // with optimistic value
    }
  );
}
```

<div class="mt-4 p-3 bg-yellow-50 rounded">
  <h3 class="font-bold text-yellow-800 mb-2">Concurrent Features</h3>
  <div class="grid grid-cols-2 gap-4 text-sm">
    <div>
      <strong class="text-indigo-700">useTransition:</strong>
      <ul class="text-xs mt-1 text-black">
        <li>Hook with pending state</li>
        <li>Built-in loading indicator</li>
        <li>Automatic priority handling</li>
      </ul>
    </div>
    <div>
      <strong class="text-pink-700">startTransition:</strong>
      <ul class="text-xs mt-1 text-black">
        <li>Standalone function</li>
        <li>No loading state</li>
        <li>Manual priority control</li>
      </ul>
    </div>
  </div>
</div>

---
hideInToc: true
transition: slide-up
---

# Custom Hooks

Custom Hooks are reusable functions that contain logic shared across multiple components. They allow you to extract complex logic from components, making them more readable and maintainable. Custom Hooks follow the naming convention `useSomething` to indicate that they are hooks.

- [UseForm](https://stackblitz.com/edit/vitejs-vite-fdk26g?file=package.json)
- [UseFetch](https://stackblitz.com/edit/vitejs-vite-hyv9j2?file=src%2Fhooks%2FuseFetch.js)

As a way to practice, create a custom hook named `useToggle` and `useCounter`.
