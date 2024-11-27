---
layout: center
transition: slide-up
hideInToc: true
---

# More Hooks

<div mt-2 />

- <a @click="$slidev.nav.next()">useRef</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">useReducer</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">useContext</a>

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
---

<iframe src="https://codesandbox.io/p/sandbox/laughing-brook-d4j887?file=%2Fsrc%2Fcomponents%2FuseStateCounter.jsx%3A15%2C4" style="width: 100%; height: 480px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

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
---

<iframe src="https://codesandbox.io/p/sandbox/competent-saha-vkmlhg?file=%2Fsrc%2Fcomponents%2FuseStateCart.jsx%3A25%2C54" style="width: 100%; height: 480px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

---
hideInToc: true
transition: slide-up
---

## ✴ [ useContext]{.text-gradient.text-4xl}

Information is passed from a parent component to a child component through props. However, this can become cumbersome when the data needs to be passed through several intermediate components, or when multiple components in the app require the same data. The `Context API` allows a parent component to make certain data available to all components below it in the component tree, regardless of their depth, without the need to pass it explicitly via props.

The `useContext` hook allows functional components to consume values from context directly, eliminating the need for a `Consumer` component. This simplifies the process of accessing shared state or global data that is provided by a `Context.Provider`.

<v-clicks>

```jsx
const value = useContext(SomeContext)
```

Use Cases:

- Global State Sharing: Ideal for managing global state across your app, such as authentication status, theming, or user preferences.

- Avoiding Prop Drilling: Context helps eliminate this issue by making the data available to any component in the tree, without having to explicitly pass props down through every intermediate level.

</v-clicks>

---
hideInToc: true
---

<iframe src="https://codesandbox.io/p/sandbox/stupefied-bouman-zxzrcz?file=%2Fsrc%2Fcomponents%2FuseContext.jsx%3A41%2C29" style="width: 100%; height: 480px; border:0; border-radius: 4px; overflow: hidden;" title="CodeSandbox Embed" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

---
hideInToc: true
transition: slide-right
---

```jsx
import { createContext, useContext } from 'react'

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}

function ThemedComponent() {
  const theme = useContext(ThemeContext) // Consumes theme directly
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

Without useContext: You’d need to pass the theme prop down manually, making the code harder to maintain.
