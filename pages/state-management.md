---
layout: center
transition: slide-up
hideInToc: true
---

# State Management in React

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Lifting State Up in React</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Context API for Global State</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Introduction to Redux</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">Best Practices for State Management</a>
- <a @click="$slidev.nav.go($nav.currentPage+12)">Activity and ViewTransition</a>

---
hideInToc: true
transition: fade
---

# [Lifting State Up in React]{.text-gradient}

[State Management]{.text-teal-400} is one of the features that makes {React} shine. When a user [interacts]{.text-teal-400.italic} with an element or component, the interaction may cause a [change in state]{.text-teal-400.italic}, which updates the UI or performs a defined task.

<v-click>

In most cases, we perform a "State Update" within the component where it originates. But what if other components under the same [parent]{.italic} need to know about that update? This is where [Lifting Up State]{.text-gradient} becomes useful. We move the state from `Child1` to `Parent` so that `Child2`, the parent's other children, and the parent itself can respond to the [State Change]{.text-teal-400.italic}.

</v-click>

<v-click>

[Lifting Up State]{.text-gradient} in {React} can simply be defined as the process of moving state to the nearest common ancestor of components that need to share it.

</v-click>

<v-click>

Now that we understand the definition and purpose of [Lifting Up State]{.text-gradient}, let's look at its code structure in the next slide.

</v-click>

---
hideInToc: true
transition: slide-down
---

# [Lifting Up State]{.text-gradient} in {React} [Code Structure]{.text-gradient.text-3xl}

The structure of [Lifted State]{.text-teal-400.italic} is exactly what its name suggests: [Lifting Up].

<div v-click="1">

````md magic-move {at: 2}
```jsx
function Parent() {
  return (
    <div>
      <ChildA />
      <ChildB />
    </div>
  )
}
function ChildA() {
  const [value, setValue] = React.useState('')
  return (
    <>
      <input onChange={(e) => setValue(e.target.value)} />;<p>{value}</p>;
    </>
  )
}
function ChildB() {
  return (
    <p>Second Child component not performing or showing any state update</p>
  )
}
```

```jsx
function Parent() {
  const [value, setValue] = useState('')

  return (
    <div>
      <ChildA value={value} />
      <ChildB setValue={setValue} />
    </div>
  )
}

function ChildA({ value }) {
  return <p>{value}</p>
}

function ChildB({ setValue }) {
  return <input onChange={(e) => setValue(e.target.value)} />
}
```
````

</div>

<div v-click="3">

In the code example above, state that was previously managed in `ChildA` becomes available to sibling components after it is [lifted up]{.text-teal-400.italic} to the parent.

</div>

---
hideInToc: true
transition: slide-up
---

# [Lifting Up State]{.text-gradient} in {React} [Code Example in action]{.text-gradient}

Here is the interactive mode of the code example in the previous slide.

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://codesandbox.io/embed/pzvrd4
---

---
hideInToc: true
transition: slide-right
---

# [Context API for Global State]{.text-gradient}

Sometimes we need to share state across the entire application or with components in different parts of the component tree. In these cases, [Lifting Up State]{.text-gradient} is not enough: passing state as props through every intermediate component would make the code difficult to maintain. [Theme state management]{.text-teal-400.italic}, where the entire application must know which theme is active, is one example. This is where {React}'s [Context API]{.text-gradient.italic} becomes useful.

<v-click>

The [Context API]{.text-gradient.italic} is a built-in {React} feature for creating and managing global state without passing props manually through every level of the component tree.

</v-click>

<div v-click="2">

[How It Works:]{.text-gradient.italic}

<v-clicks>

- Create a context using `React.createContext`.
- Wrap your application in a `Provider`.
- Use `useContext` or `use` to consume the context in child components.

</v-clicks>

</div>

---
hideInToc: true
transition: slide-down
---

# [Usage of Context API]{.text-gradient}

Below is a code example of how the [Context API]{.text-teal-400} is used.

```jsx
const MyContext = React.createContext()

function App() {
  const [value, setValue] = useState('Hello')

  return (
    <MyContext.Provider value={{ value, setValue }}>
      <Child />
    </MyContext.Provider>
  )
}

function Child() {
  // const { value, setValue } = use(MyContext)
  const { value, setValue } = useContext(MyContext)
  return <button onClick={() => setValue('Updated')}>{value}</button>
}
```

---
hideInToc: true
transition: slide-up
---

# [Context API]{.text-gradient} [Code Example in action]{.text-gradient}

Here is a theme context example code in action.

---
hideInToc: true
transition: slide-left
layout: iframe-lazy
url: https://codesandbox.io/embed/kwslzk
---

---
hideInToc: true
---

# [Introduction to Redux]{.text-gradient}

For large-scale applications with complex state interactions, we can use an external library like [Redux]{.text-teal-400} for state management and Redux Toolkit (RTK) for greater flexibility.

<v-click>

[Redux]{.text-gradient} is a state management library for predictable state management in large applications.

</v-click>

<div class="flex gap-3">

<div v-click="2">

[Core Concepts:]{.text-gradient}

<v-clicks>

- Store: Holds the global state.
- Actions: Plain objects that describe what you want to do.
- Reducers: Pure functions that update the state based on actions.
- Dispatch: Triggers an action.
- Redux Toolkit: Manages asynchronous state

</v-clicks>

</div>

```jsx {hide|*|1,2|4-13|14-17|*}
// actions.js
export const increment = () => ({ type: 'INCREMENT' })

// reducer.js
const initialState = { count: 0 }
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}

// store.js
import { createStore } from 'redux'
const store = createStore(counterReducer)
```

</div>

---
hideInToc: true
transition: fade
---

## Other third-party state management libraries include `zustand`, `jotai`, `@tanstack/query`, `swr`, `recoil`, and `xstate`.

````md magic-move
```js
import { create } from 'zustand'

const useBearStore =
  create <
  BearState >
  ((set) => ({
    bears: 0,
    increase: () => set((state) => ({ bears: state.bears + 1 })),
    decrease: () => set((state) => ({ bears: state.bears - 1 })),
  }))

function BearCounter() {
  const { bears, increase, decrease } = useBearStore()
  return (
    <div>
      <h1>{bears} bears</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  )
}
```

```js
import { useQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user</div>

  return <div>{user?.name}</div>
}
```
````

---
hideInToc: true
transition: fade
---

# [Best Practices for State Management]{.text-gradient}

State management best practices ensure your application's state is scalable, maintainable, and performant.

<v-click>

[Below are best practices that matter in key areas:]{.text-teal-400.underline}

</v-click>

<div class="text-[0.73rem] flex gap-3">

<div>

<v-click>

1. [Scalability:]{.text-gradient}

- Use local state for component-specific needs and global state (e.g., `Redux`, `Context API`) for cross-component data.
- Split state into smaller, logical chunks (e.g., authentication, UI state, user data) to avoid a "giant state object."

</v-click>

<v-click>

2. [Performance Optimization]{.text-gradient}

- Keep state minimal and colocate it where it’s used.
- Avoid prop drilling by using `Context API` or libraries like `Redux` or `Zustand`.
- Use memoization techniques (`React.memo`, `useMemo`, `useCallback`) to prevent re-rendering of unaffected components.

</v-click>

<v-click>

3. [Maintainability]{.text-gradient}

- Write clean reducers (in `Redux`) or handlers for state updates.
- Use type safety (e.g., `TypeScript`) to catch state-related errors at compile time.
- Document state structure and logic for better team collaboration.

</v-click>

<v-click>

4. [Debugging and Predictability]{.text-gradient}

- Use DevTools (e.g., Redux DevTools, {React} Developer Tools) for tracking state changes.
- Ensure state updates are pure functions (no side effects).

</v-click>

</div>

<div>

<v-click>

5. [User Experience]{.text-gradient}

- Synchronize state changes with UI updates (e.g., loading indicators, error handling).
- Persist critical state (e.g., user sessions) using `localStorage` or `sessionStorage` when necessary.

</v-click>

<v-click>

6. [Avoid Over-Engineering]{.text-gradient}

- Use {React} local state or `Context API` for simple use cases.
- Only introduce libraries like `Redux` when the state becomes too complex for `Context API`.

</v-click>

<v-click>

7. [Reusability and Composition]{.text-gradient}

- Use `custom hooks` for common state logic (e.g., `useAuth`, `useTheme`).
- Group related state in composable chunks for better separation of concerns.

</v-click>

</div>

</div>

---
hideInToc: true
---

# Activity and View Transition

## [Activity](https://react.dev/reference/react/Activity) Component (React 19.2)

<v-clicks>

<div class="text-sm">

- `<Activity>` hides children via `display: none` while preserving their state and DOM, allowing hidden components to remain stateful.
- `mode="visible" | "hidden"` controls whether content shows; hidden content still re-renders at lower priority.
- Effects inside children are cleaned up while hidden; restored when visible again.
- Ideal for tabs/sidebars you want to hide without losing state or refetching or prefetching(Media like videos).

</div>

```jsx {monaco} {lineNumbers: true, height: '16rem'}
import { Activity, useState } from 'react'

function App() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="layout">
      <button onClick={() => setShowSidebar((prev) => !prev)}>
        Toggle sidebar
      </button>
      <Activity mode={showSidebar ? 'visible' : 'hidden'}>
        <Sidebar /> {/* state + DOM preserved while hidden */}
      </Activity>
      <main>
        <Content />
      </main>
    </div>
  )
}
```

<div class="text-xs text-slate-500" v-click>
Note: Hidden video/audio/iframe elements keep playing unless their own cleanup stops them.
</div>

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## [View Transition](https://react.dev/reference/react/ViewTransition)

<v-clicks>

- The [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) enables animated DOM swaps for route or view changes. [Read More about SPA use-cases](https://web.dev/learn/css/view-transitions-spas)
- Wrap DOM updates in `document.startViewTransition` when available; it falls back silently if unsupported.
- Use CSS to define shared element animations (`view-transition-name`).
- You can wrap pages, components, or grouped interactions with a `<ViewTransition />` element and set up minimal styling.

</v-clicks>

````md magic-move
```jsx {monaco} {lineNumbers: true, height: '13rem'}
function swapCard(setCard) {
  const run = () => setCard((prev) => (prev === 'A' ? 'B' : 'A'))
  if ('startViewTransition' in document) {
    document.startViewTransition(run)
  } else {
    run()
  }
}
```

```jsx
function CardView({ card, setCard }) {
  return (
    <div className="card" style={{ viewTransitionName: 'card' }}>
      <p>Card {card}</p>
      <button onClick={() => swapCard(setCard)}>Switch</button>
    </div>
  )
}
```

```jsx
import {ViewTransition} from 'react'
<ViewTransition enter="slide-in">...</ViewTransition>

<ViewTransition default="slow-fade">
  <Video />
</ViewTransition>
```

```jsx
<Suspense
  fallback={
    <ViewTransition>
      <A />
    </ViewTransition>
  }
>
  <ViewTransition>
    <B />
  </ViewTransition>
</Suspense>
```

```css
::view-transition-group(.slide-in) {
}
::view-transition-old(.slide-in) {
}
::view-transition-new(.slide-in) {
}
```

```css
::view-transition-group(root) {
  animation-duration: 200ms;
}

::view-transition-old(root) {
  animation-name: slide-out-to-left;
}

::view-transition-new(root) {
  animation-name: slide-in-from-right;
}
```
````
