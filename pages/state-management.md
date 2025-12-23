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

[State Management]{.text-teal-400} in {React} is one of the beauty of the library that makes it shine. When a user [interacts]{.text-teal-400.italic} with a reactive element or component, an update which is simply known as [change in state]{.text-teal-400.italic} occur, instantly updating the UI or performing a defined task.

<v-click>

In most cases, we perform a "State Update" within the component where it is happening. But how about when we want other components in the same [parent]{.italic} component to be aware of the update or interaction? This is where [Lifting Up State]{.text-gradient} comes in handy, which involves moving the state management that is occurring in "Child1" component to the "Parent" component so that the "Child2" or other children of the parent, including the parent itself would be aware of that particular [State Change]{.text-teal-400.italic}.

</v-click>

<v-click>

[Lifting Up State]{.text-gradient} in {React} can simply be defined as the process of moving state to the nearest common ancestor of components that need to share it.

</v-click>

<v-click>

Now that we understand the definition and purpose of [Lifting Up State]{.text-gradient}, lets look at it's code structure in the next slide.

</v-click>

---
hideInToc: true
transition: slide-down
---

# [Lifting Up State]{.text-gradient} in {React} [Code Structure]{.text-gradient.text-3xl}

The structure of a [Lifted State]{.text-teal-400.italic} is just as its name sounds; [Lifting Up].

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

In the code example above, we see a transition where we were previously managing state in "ChildA" and then making it available everywhere by [Lifting Up The State]{.text-teal-400.italic} to the parent.

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

There are cases where we would want to share a state across the entire application or to one or more parents in different folders of our application. In this case, simply [Lifting Up State]{.text-gradient} is just not enough and won't really be clean code if used because you would have to pass the state as props to any child component that needs it. Example of this complex case is [Theme state management]{.text-teal-400.italic} where would want our entire application to be aware of which theme was toggled. This is where {React}'s [Context API]{.text-gradient.italic} comes in handy.

<v-click>

[Context API]{.text-gradient.italic} is a built-in {React} feature to create and manage global state without passing props manually.

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

For large-scale applications with complex state interactions, we can use external library like [Redux]{.text-teal-400} for state management and Redux Toolkit(RTK) for more flexibility.

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
- Redux Toolkit: Managing Async State 

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

## More Thirty Party Libraries for State management includes `zustand`, `jotai`, `@tanstack/query`, `swr`, `recoil`, `xstate`.

````md magic-move

```js
import { create } from 'zustand'

const useBearStore = create<BearState>((set) => ({
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

- `<Activity>` hides children via `display: none` while preserving their state and DOM. Stateful hidden components.
- `mode="visible" | "hidden"` controls whether content shows; hidden content still re-renders at lower priority.
- Effects inside children are cleaned up while hidden; restored when visible again.
- Ideal for tabs/sidebars you want to hide without losing state or refetching or prefetching(Media like videos).


```jsx {monaco} {lineNumbers: true, height: '13rem'}
import { Activity, useState } from 'react'

function App() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="layout">
      <button onClick={() => setShowSidebar(prev => !prev)}>
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
- You can wrap pages, component or group interaction with <ViewTransition /> element and setup a minimal style.

</v-clicks>

````md magic-move
```jsx {monaco} {lineNumbers: true, height: '13rem'}
function swapCard(setCard) {
  const run = () => setCard((prev) => prev === 'A' ? 'B' : 'A')
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
<Suspense fallback={<ViewTransition><A /></ViewTransition>}>
  <ViewTransition><B /></ViewTransition>
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
::view-transition-group(root){
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
