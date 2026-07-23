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
- <a @click="$slidev.nav.go($nav.currentPage+12)">useTransition</a>
- <a @click="$slidev.nav.go($nav.currentPage+13)">useLayoutEffect</a>
- <a @click="$slidev.nav.go($nav.currentPage+17)">useDeferredValue</a>
- <a @click="$slidev.nav.go($nav.currentPage+20)">useActionState</a>
- <a @click="$slidev.nav.go($nav.currentPage+22)">useFormStatus</a>
- <a @click="$slidev.nav.go($nav.currentPage+24)">useOptimistic</a>
- <a @click="$slidev.nav.go($nav.currentPage+25)">customHooks</a>
- <a @click="$slidev.nav.go($nav.currentPage+30)">useSyncExternalStore</a>
- <a @click="$slidev.nav.go($nav.currentPage+32)">useEffectEvent</a>


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
autoLoad: false
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
autoLoad: false
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
autoLoad: false
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
autoLoad: false
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
autoLoad: false
---

---
hideInToc: true
transition: slide-up
---

## ✴ [useActionState]{.text-gradient.text-4xl}

<v-clicks>

Introduced in React 19, `useActionState` manages the state produced by a form action — including loading state — in a single hook. It replaces the old `useFormState` from `react-dom`.

```jsx
const [state, formAction, isPending] = useActionState(actionFn, initialState)
```

- **`actionFn`** — an `async` function that receives `(prevState, formData)` and returns the next state
- **`initialState`** — the value of `state` before the first submission
- **`isPending`** — `true` while the action is running; no separate `useState` needed

When you pass `formAction` to a `<form action={…}>`, React handles the submission lifecycle for you.

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## useActionState — Live Demo

<React19HooksDemo />

---
hideInToc: true
transition: slide-up
---

## ✴ [useFormStatus]{.text-gradient.text-4xl}

<v-clicks>

`useFormStatus` lets any component inside a `<form>` read that form's submission state — without prop drilling.

```jsx
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving…' : 'Save'}
    </button>
  )
}
```

**Key rules:**

- Must be called inside a component that is rendered *inside* the `<form>` — not in the form component itself
- `pending` is `true` for the entire duration of the form action
- Pairs naturally with `useActionState`: one hook owns the state, the other owns the UI feedback

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## ✴ [`use`]{.text-gradient.text-4xl} — Overview

<v-clicks>

`use` is a new React 19 primitive that reads the value of a resource — a Promise or a Context — directly in render.

```jsx
import { use } from 'react'

// Reading a Context (replaces useContext)
const theme = use(ThemeContext)

// Reading a Promise (suspends until resolved)
const data = use(fetchUserPromise)
```

**When you'd reach for `use`:**

- You already have a Promise (e.g. from a parent Server Component or a cache) and want to unwrap it in a Client Component
- You want to read a Context conditionally or inside a loop — `use` can be called anywhere, unlike `useContext`

> For production data fetching, `@tanstack/react-query` still gives you caching, retries, and devtools. `use` is the low-level primitive underneath.

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## ✴ [useOptimistic]{.text-gradient.text-4xl} — Overview

<v-clicks>

`useOptimistic` lets you show the *expected* result of an action immediately, before the server responds. React automatically rolls back to the real state if the action fails.

```jsx
import { useOptimistic } from 'react'

function MessageThread({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newText) => [
      ...currentMessages,
      { text: newText, pending: true },
    ]
  )

  async function handleSend(formData) {
    const text = formData.get('message')
    addOptimisticMessage(text)   // show immediately
    await sendMessage(text)      // real network call
  }

  return (
    <form action={handleSend}>
      {optimisticMessages.map((m, i) => (
        <p key={i} style={{ opacity: m.pending ? 0.5 : 1 }}>{m.text}</p>
      ))}
      <input name="message" /><button type="submit">Send</button>
    </form>
  )
}
```

Best used once you're comfortable with `useActionState` and async data patterns.

</v-clicks>

---
hideInToc: true
transition: slide-up
---

# Custom Hooks

Custom Hooks are reusable functions that contain logic shared across multiple components. They allow you to extract complex logic from components, making them more readable and maintainable. Custom Hooks follow the naming convention `useSomething` to indicate that they are hooks.

- [UseForm](https://stackblitz.com/edit/vitejs-vite-fdk26g?file=useForm.js)
- [UseFetch](https://stackblitz.com/edit/vitejs-vite-hyv9j2?file=src%2Fhooks%2FuseFetch.js)

As a way to practice, create a custom hook named `useToggle` and `useCounter`.


---
hideInToc: true
transition: slide-up
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-fdk26g?ctl=1&embed=1&file=src%2Fhooks%2FuseForm.js
---
---
hideInToc: true
transition: slide-up
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-hyv9j2?ctl=1&embed=1&file=src%2Fhooks%2FuseFetch.js
---
---
hideInToc: true
transition: slide-up
---

## useToggle Custom Hook

````md magic-move
```jsx
function ToggleButton() {
  const [isOn, setIsOn] = React.useState(false);
  
  const toggle = () => setIsOn(prev => !prev);
  
  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return [value, { toggle, setTrue, setFalse }];
}

function ToggleButton() {
  const [isOn, { toggle }] = useToggle(false);
  
  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(prev => !prev);
  }, []);
  const setTrue = React.useCallback(() => {
    setValue(true);
  }, []);
  const setFalse = React.useCallback(() => {
    setValue(false);
  }, []);
  return [value, { toggle, setTrue, setFalse }];
}

function ToggleButton() {
  const [isOn, { toggle, setTrue, setFalse }] = useToggle(false);
  
  return (
    <div>
      <button onClick={toggle}>Toggle</button> <button onClick={setTrue}>ON</button>
      <button onClick={setFalse}>OFF</button>
      <span>Status: {isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}
```
````

---
hideInToc: true
transition: slide-up
---

## useCounter Custom Hook

````md magic-move
```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = React.useState(initialValue);
  
  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);
  
  return [count, { increment, decrement, reset }];
}

function Counter() {
  const [count, { increment, decrement, reset }] = useCounter(0, 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = React.useState(initialValue);

  const increment = React.useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);
  const decrement = React.useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);
  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  return [count, { increment, decrement, reset }];
}

function Counter() {
  const [count, { increment, decrement, reset }] = useCounter(0, 5);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+{5}</button> <button onClick={decrement}>-{5}</button> <button onClick={reset}>Reset</button>
    </div>
  );
}
```
````

---
hideInToc: true
transition: slide-up
---

## useSyncExternalStore: useOnlineStatus Hook

````md magic-move
```jsx
// Problem: We need to track online/offline status
function App() {
  return <div>Am I online?</div>
}
```

```jsx
// Step 1: Basic state management
function App() {
  const [isOnline, setIsOnline] = React.useState(() => navigator.onLine);
  
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

```jsx
// Step 2: Extract subscribe function
// subscribe: Registers callbacks for external store changes
function subscribe(callback) {
  // Add event listeners that call callback when status changes
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  
  // Return cleanup function to remove listeners
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function App() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  
  React.useEffect(() => {
    const unsubscribe = subscribe(() => {
      setIsOnline(() => navigator.onLine);
    });
    return unsubscribe;
  }, []);
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

```jsx
// Step 3: Extract getSnapshot function
function getSnapshot() { // getSnapshot: Returns current value from external store
  return navigator.onLine; // Read current value from browser API
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function App() {
  const [isOnline, setIsOnline] = React.useState(getSnapshot());
  
  React.useEffect(() => {
    const unsubscribe = subscribe(() => {
      setIsOnline(getSnapshot());
    });
    return unsubscribe;
  }, []);
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

```jsx
// Step 4: Use useSyncExternalStore hook
// useSyncExternalStore(subscribe, getSnapshot)
// - subscribe: Function that subscribes to external store
// - getSnapshot: Function that returns current snapshot
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
function getSnapshot() {
  return navigator.onLine;
}

function App() {
  const isOnline = React.useSyncExternalStore(
    subscribe,    // How to subscribe to changes
    getSnapshot    // How to get current value
  ); // useSyncExternalStore handles subscription and state updates
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

```jsx
// Step 5: Extract into custom hook
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
function getSnapshot() {
  return navigator.onLine;
}

function useOnlineStatus() {
  const isOnline = React.useSyncExternalStore(
    subscribe,    // Subscribe to online/offline events
    getSnapshot   // Get current online status
  );
  return isOnline;

function App() {
  const isOnline = useOnlineStatus();
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```

```jsx
// Final: Complete implementation with all functions
function useOnlineStatus() {
  const isOnline = React.useSyncExternalStore( subscribe, getSnapshot );
  return isOnline;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function App() {
  const isOnline = useOnlineStatus();
  return <div>{isOnline ? '✅ Online' : '❌ Offline'}</div>
}
```
````

---
hideInToc: true
transition: slide-up
---

[Understanding useSyncExternalStore]{.text-sm}

<v-clicks>

<div grid="~ cols-2" gap="2">

<div>

**Why useSyncExternalStore?**

- Handles external store subscriptions safely
- Prevents tearing (inconsistent state) during concurrent rendering
- Automatically manages subscription lifecycle
- Works with React's concurrent features

**Key Functions:**

1. **`subscribe(callback)`**: 
  - Registers callback for store changes
  - Returns cleanup function
  - Called when component mounts/updates

</div>

<div>

2. **`getSnapshot()`**: 
  - Returns current store value
  - Must be synchronous
  - Called during render to get current state

**Use Cases:**
- Browser APIs (online status, geolocation, media queries)
- Third-party state management libraries
- WebSocket connections
- Browser storage (localStorage, sessionStorage)

</div>
</div>

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## [useEffectEvent](https://react.dev/reference/react/useEffectEvent)

<v-clicks>

- Extract non-reactive logic from Effects into an Effect Event; it always reads the latest props/state without retriggering the Effect.
- Define with `useEffectEvent(fn)` at the top level; call only inside Effects (`useEffect`, `useLayoutEffect`, `useInsertionEffect`).
- Use for non-reactive work (logging, telemetry, imperative calls) instead of making the Effect depend on extra values.

</v-clicks>

```jsx {monaco} {lineNumbers: true, height: '12rem'}
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme) // theme stays fresh, not reactive
  })

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', () => onConnected())
    connection.connect()
    return () => connection.disconnect()
  }, [roomId, onConnected])
}
```

<div class="text-xs text-slate-500" v-click>
Effect Events aren’t a dependency shortcut—keep real reactive deps in the array.
</div>

---
hideInToc: true
transition: slide-up
---

## [Practice]{.text-gradient.text-4xl}

**Build `useDebounce`** — 10 minutes, no submission required.

A debounce hook delays running an action until the user has stopped triggering it for a set time. Useful for search inputs that hit an API.

```jsx
// Starter — implement the hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // TODO: set a timer to update debouncedValue after `delay` ms
    // TODO: return a cleanup function that clears the timer
  }, [value, delay])

  return debouncedValue
}

// Usage — this should only log after the user stops typing for 500ms
function SearchInput() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 500)

  useEffect(() => {
    if (debounced) console.log('Search for:', debounced)
  }, [debounced])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

**Bonus:** Convert the `SearchInput` form action to use `useActionState` so the search result appears below the input without separate state.

<Tips type="tip">
The pattern is: <code>const id = setTimeout(...)</code> then <code>return () => clearTimeout(id)</code>. The cleanup runs before the next effect — which is exactly what cancels the previous timer.
</Tips>
