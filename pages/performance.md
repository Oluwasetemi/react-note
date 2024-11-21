---
layout: center
transition: slide-up
hideInToc: true
---

# Performance Optimization in {React}

<div mt-2 />

- <a @click="$slidev.nav.next()">Avoiding Unnecessary Renders with React.memo</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Optimizing Component Renders with useMemo</a>
- <a @click="$slidev.nav.go($nav.currentPage+12)">Lazy Loading Components ("React.lazy" and "Suspense")</a>

---
hideInToc: true
transition: slide-down
---

# [Avoiding Unnecessary Renders with React.memo]{.text-gradient}

From our previous slides on the <span class="italic">Lifecycle of a {React} component</span>, we learnt that {React} re-renders a component only when a [State Change]{.text-teal-400} is [triggered]{.italic} by [Interactivity]{.text-gradient.italic}. In some cases it is [unnecessary]{.italic} to re-render every component, this is where {React}'s `memo()` comes in.

<v-click>

`React.memo` is a higher-order component that helps prevent re-rendering of a component if its props haven't changed. It is very useful for functional components that are rendered frequently with the same props.

</v-click>

```jsx {hide|*}
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

<v-click>

`memo()` allows you to skip re-rendering a component when its props are unchanged.

</v-click>

<v-click>

[memo parameters:]{.underline.text-gradient}

</v-click>

<v-clicks>

- `Component`: This is the component that you want to memoize. The memo takes any valid component and return a memoized version of it. It does not modify this component.
- optional `arePropsEqual`: This is a function that takes two arguments: the component’s previous props, and its new props. It returns true if the old and new props are identical, else it should return false. Usually, this function is optional. By default, React will compare each prop with `Object.is`.

</v-clicks>

---
hideInToc: true
transition: fade-out
---

# [Usage]{.text-gradient} of `memo()`

As previously stated, {React} will re-render a component if its parent re-renders, but with `memo()`, you can prevent a component from re-rendering when its parent re-renders, except there is a state change in that component.

````md magic-move
```jsx
const MyMemoizedComponent = React.memo(function MyComponent({ value }) {
  console.log('Rendered')
  return <h1>Hello World! The value is: {value}</h1>
})

export default MyMemoizedComponent
```

```jsx
const MyComponent = ({ value }) => {
  console.log('Rendered')
  return <h1>Hello World! The value is: {value}</h1>
}

const MyMemoizedComponent = React.memo(MyComponent)

export default MyMemoizedComponent
```
````

<v-clicks at="2">

The main purpose of `memo()` is [performance optimization]{.text-teal-400}, it does not modify the component.

"Optimizing with `memo` is only valuable when your component re-renders often with the same exact `props`, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, `memo` is unnecessary. Keep in mind that `memo` is completely useless if the `props` passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often need `useMemo` and `useCallback` together with memo."

</v-clicks>

---
hideInToc: true
transition: slide-down
---

# [Example]{.text-gradient} of `memo()` in [action]{.text-gradient}

<iframe
  width="100%"
  height="400"
  src="https://codesandbox.io/p/sandbox/react-memo-in-action-rqngm9"
>
</iframe>

---
hideInToc: true
transition: slide-left
---

# Optional comparison function parameter in `memo()`

```jsx
const MemoizedComponent = memo(SomeComponent, arePropsEqual?);
```

`arePropsEqual` in the above code block is an optional comparison function. By default, `React.memo` only does a shallow comparison of the props, but you can provide a custom comparison function to compare the props more deeply or based on specific conditions.

<v-click>

```jsx {monaco} { lineNumbers: true, height: '14rem' }
const MyComponent = React.memo(
  function MyComponent({ name, age }) {
    console.log('Rendered')
    return (
      <div>
        {name} - {age}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.name === nextProps.name && prevProps.age === nextProps.age
  },
)

function App() {
  const [age, setAge] = React.useState(25)

  return (
    <div>
      <MyComponent name="John" age={age} />
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  )
}

export default App
```

</v-click>

<v-click>

[Note: If you provide a custom arePropsEqual implementation, you must compare every prop, including functions. Avoid doing deep equality checks inside arePropsEqual unless you are 100% sure that the data structure you’re working with has a known limited depth.]{.italic.text-red}

</v-click>

---
hideInToc: true
transition: slide-down
---

# [Optimizing Component Renders with useMemo]{.text-gradient}

`useMemo()` is a hook that memoizes the result of an expensive computation and only recalculates it when one of its dependencies changes. This can prevent costly calculations during re-renders. `useMemo()` takes a two parameters; a pure function calculating the value that you want to cache, and a dependency array [] that contains the reactive values referenced inside the calculating function.

```jsx {hide|*}
const cachedValue = useMemo(calculateValue, dependencies)
```

<v-click>

Just like every other {React} Hook, `useMemo` should only be called at the top level of your component or your own custom Hooks. You cannot call it inside loops or conditions. If you need to, extract a new component and move the state into it.

</v-click>

```jsx {hide|*|1-4|7|*}
const expensiveCalculation = (num) => {
  // Assume a computationally expensive operation
  return num * num
}

function MyComponent({ number }) {
  const result = useMemo(() => expensiveCalculation(number), [number])
  return <div>Result: {result}</div>
}
```

---
hideInToc: true
transition: slide-up
---

# [Usage]{.text-gradient} of `useMemo(calculateValue, [dep])`

[Skipping Expensive Logic Re-calculation:]{.text-teal-400} On the first render, `useMemo` returns the result of calling calculateValue with no arguments. During next renders, if the dependency values did not change, it will return an already stored value from the last render, or call calculateValue again if the dependency values has changed, and return the result that calculateValue has returned.

<v-click>

By default, {React} will re-render the entire components every time it re-runs, this includes re-running every logic. In the below code transitions, we see how we can apply `useMemo` to skip re-doing some logic calculations when {React} re-renders by using the cached values from `useMemo` if the dependencies are unchanged.

</v-click>

<div v-click='1'>

````md magic-move {at: 2}
```jsx
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab)
  // ...
}
```

```jsx
function TodoList({ todos, tab, theme }) {
  const visibleTodos = React.useMemo(
    () => filterTodos(todos, tab),
    [todos, tab],
  )
  // ...
}
```
````

</div>

<v-click at='3'>

This ability of caching a return value is known as [memoization]{.text-gradient.italic} in {React}. The sole purpose of `useMemo` is for [Performance Optimization]{.text-teal-italic}. If your code does ot work without it, find and fix the bug first. After then you may add `useMemo` to improve performance.

</v-click>

---
hideInToc: true
transition: slide-up
---

# [Usage]{.text-gradient} of `useMemo(calculateValue, [dep])`

<div class="flex gap-2">

<div>

[Skipping Component Re-rendering:]{.text-teal-400} In addition to caching the values of logics to avoid re-calculation every time a re-render occurs, `useMemo()` can also help to [optimize]{.text-teal-400} the re-rendering of child components with the aid of `memo()`.

<v-clicks>

- `useMemo()`: Memoizes the result of a calculation so that it only recalculates when its dependencies change.
- `memo()`: Memoizes the component itself, ensuring it only re-renders if the props change.

</v-clicks>

</div>

<div v-click>

````md magic-move {at: 4}
```jsx
//Without Optimization (No useMemo and React.memo):
function ExpensiveCalculation({ items }) {
  console.log('Running expensive calculation')
  const result = items.reduce((sum, item) => sum + item, 0)
  return <div>Sum: {result}</div>
}

function App() {
  const [count, setCount] = React.useState(0)
  const items = [1, 2, 3, 4, 5]

  return (
    <div>
      <ExpensiveCalculation items={items} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}

export default App
```

```jsx
//Optimized with useMemo and React.memo:
const ExpensiveCalculation = React.memo(({ items }) => {
  console.log('Running expensive calculation')
  // Memoize the result of the expensive calculation
  const result = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item, 0)
  }, [items])

  return <div>Sum: {result}</div>
})

function App() {
  const [count, setCount] = React.useState(0)
  const items = [1, 2, 3, 4, 5]

  return (
    <div>
      <ExpensiveCalculation items={items} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}

export default App
```
````

</div>

</div>

---
hideInToc: true
transition: slide-up
---

<span class="text-[1.3rem] mb-0">

Example code of [Skipping Component Re-rendering]{.text-gradient} with `useMemo()` and `memo()` in [action]{.text-gradient}

</span>

Ensure the preview tab is loaded. Open dev tool to see the console when you click on the button.

<iframe
  width="100%"
  height="400"
  src="https://codesandbox.io/p/sandbox/optimising-re-render-with-memo-and-usememo-5mwcd8"
>
</iframe>

---
hideInToc: true
transition: slide-down
---

# [Other Usage]{.text-gradient} of `useMemo()`

- Preventing an Effect from firing too often

<div v-click="1">

````md magic-move {at: 2}
```jsx
//Without useMemo:
import React, { useEffect, useState } from 'react'

function App() {
  const [query, setQuery] = useState('react')

  const fetchData = () => {
    console.log('Fetching data for:', query)
    // Simulate data fetching
  }

  useEffect(() => {
    fetchData() // This will re-run every time `App` re-renders
  }, [fetchData]) // Problem: `fetchData` is a new function on every render

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
}
```

```jsx
//Optimized with useMemo:
import React, { useEffect, useState, useMemo } from 'react'

function App() {
  const [query, setQuery] = useState('react')

  // Memoize the function so that it only changes when `query` changes
  const fetchData = useMemo(() => {
    return () => {
      console.log('Fetching data for:', query)
      // Simulate data fetching
    }
  }, [query])

  useEffect(() => {
    fetchData() // Now, `useEffect` only re-runs when `fetchData` changes (i.e., when `query` changes)
  }, [fetchData])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
}
```
````

</div>

---
hideInToc: true
transition: slide-down
---

# [Other Usage]{.text-gradient} of `useMemo()`

- Memoizing a dependency of another Hook

<div v-click>

````md magic-move {at: 2}
```jsx
//Without Memoization:
import React, { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  // This object is re-created on every render
  const options = { limit: 10 }

  useEffect(() => {
    console.log('Effect ran')
    // Simulate an API call with the options object
  }, [options]) // This will trigger on every render, even if `options` hasn't meaningfully changed

  return <button onClick={() => setCount(count + 1)}>Increase Count</button>
}
```

```jsx
//With Memoization:
import React, { useEffect, useState, useMemo } from 'react'

function App() {
  const [count, setCount] = useState(0)

  // Memoize the options object so that it only changes when necessary
  const options = useMemo(() => {
    return { limit: 10 }
  }, []) // Empty array ensures this object is created only once

  useEffect(() => {
    console.log('Effect ran')
    // Simulate an API call with the memoized options object
  }, [options]) // `useEffect` only runs when `options` changes, which is now stable

  return <button onClick={() => setCount(count + 1)}>Increase Count</button>
}
```
````

</div>

---
hideInToc: true
transition: slide-down
---

# [Other Usage]{.text-gradient} of `useMemo()`

- Memoizing a function with `useCallback()`

<div v-click>

````md magic-move {at: 2}
```jsx
//Without Memoization:
import React, { useState } from 'react'

function Child({ onClick }) {
  console.log('Child re-rendered')
  return <button onClick={onClick}>Click me</button>
}

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    console.log('Button clicked')
  }

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}

export default App
```

```jsx {*|13,14,16}
//Memoize a function without useCallback()
import React, { useState, useMemo } from 'react'

function Child({ onClick }) {
  console.log('Child re-rendered')
  return <button onClick={onClick}>Click me</button>
}

function App() {
  const [count, setCount] = useState(0)

  // Use useMemo to memoize the handleClick function
  const handleClick = useMemo(() => {
    return () => {
      console.log('Button clicked')
    }
  }, []) // No dependencies mean this function will remain the same across renders

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}

export default App
```

```jsx {*|13,15|*}
// Memoize a function with useCallback()
import React, { useState, useCallback } from 'react'

function Child({ onClick }) {
  console.log('Child re-rendered')
  return <button onClick={onClick}>Click me</button>
}

function App() {
  const [count, setCount] = useState(0)

  // Memoize the handleClick function so it's the same between renders
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, []) // No dependencies mean this function will remain the same across renders

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}

export default App
```
````

</div>

---
hideInToc: true
transition: fade-out
---

# [Lazy Loading Components ("React.lazy" and "Suspense")]{.text-gradient}

One of the ways of improving the [User Experience (UX)]{.text-gradient} of a {React} application is by keeping the visitor in suspense while the desired data/component loads, or by displaying some other UI while the main data/component entirely loads.

<v-click>

`React.lazy`:

This API allows you to load components dynamically, reducing the initial bundle size and improving the loading performance of your application.

</v-click>

```jsx {hide|*}
const LazyComponent = lazy(load)
```

<v-click>

The `load` parameter of `React.lazy` is a callback function that dynamically imports the component to be [lazy loaded]{.text-teal-400.italic}.

</v-click>

```jsx {hide|*}
const LazyComponent = React.lazy(() => import('./LazyComponent'))
```

<v-click>

`lazy()` returns a {React} component you can render in your tree. While the lazy component is still loading, trying to render it will suspend. Use `<Suspense>` to display a loading indicator while it’s loading.

</v-click>

---
hideInToc: true
transition: slide-up
---

# [Displaying a fallback UI with React `<Suspence>`]{.text-gradient}

`<Suspense>` allows you to display a fallback until its children have finished loading.

```jsx {hide|*}
<Suspense fallback={<p>Loading...</p>}>
  <LazyComponent />
</Suspense>
```

<div class="flex gap-2">

<div class="text-[0.8rem]">

<v-click>

[Usage:]{.text-gradient.underline}

</v-click>

<v-clicks>

- Displaying a fallback while content is loading
- Revealing content together at once
- Revealing nested content as it loads
- Showing stale content while fresh content is loading
- Preventing already revealed content from hiding
- Indicating that a Transition is happening
- Resetting Suspense boundaries on navigation
- Providing a fallback for server errors and client-only content

</v-clicks>

</div>

<div v-click="11" class="11rem mt-1">

````md magic-move {at:12}
```jsx
// Displaying a fallback while lazy loaded content is loading
import Loading from './Loading.jsx'

const LazyComponent = lazy(() => import('./LazyComponent'))

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </>
  )
}
```

```jsx
// Displaying a fallback while content is loading
import React, { Suspense } from 'react'

// Simulated data fetching component
function DataComponent() {
  const data = useFetchData()
  return <div>Data: {data}</div>
}

export default function App() {
  return (
    <div>
      <h1>Data Loading App</h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  )
}
```

```jsx
// Revealing content together at once
import { Suspense } from 'react'
import Albums from './Albums.jsx'
import Biography from './Biography.jsx'
import Panel from './Panel.jsx'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}
```

```jsx
// Revealing nested content as it loads
import { Suspense } from 'react'
import Albums from './Albums.js'
import Biography from './Biography.js'
import Panel from './Panel.js'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<BigSpinner />}>
        <Biography artistId={artist.id} />
        <Suspense fallback={<p>Loader 2...</p>}>
          <Panel>
            <Albums artistId={artist.id} />
          </Panel>
        </Suspense>
      </Suspense>
    </>
  )
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>
}
```
````

</div>

</div>

---
hideInToc: true
transition: slide-left
---

# [Example code of React `<Suspense>` in action]{.text-gradient}

Showing stale content while fresh content is loading

<iFrame 
  src="https://codesandbox.io/p/sandbox/show-stale-content-fresh-content-is-loading-in-react-gfv64p"
  width="100%"
  height="400"
/>
