---
layout: center
transition: slide-up
hideInToc: true
---

# Rendering

<div mt-2 />

- <a @click="$slidev.nav.next()">Lifecycle (Mount, Trigger, Render and Commit)</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Batching</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Rendering lists</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">Conditional rendering - if-else, ternary, && operator</a>
- <a @click="$slidev.nav.go($nav.currentPage+11)">Conditionally assigning values to a variable</a>

---
hideInToc: true
transition: fade
name: React Lifecycle
---

# [React Lifecycle (Mount, Trigger, Render and Commit)]{.text-gradient}

Components built in {React} passes through some stages before being displayed on the browser. These stages of rendering components are called [React Lifecycle]{.text-teal-400.italic}. Declarative approach to rendering is what {React} follows. Developers describes what the UI should look like in their code while {React} takes care of how the components are rendered on the screen.

<v-click>

{React} Components Rendering Stages:

</v-click>

<span v-click>

1. [Mount:]{.text-gradient.underline}

</span>

<div flex gap-3>

<div>

<v-click>

This is the initial placement of components in Reacts Virtual DOM at the `createRoot` level. By this, we mean that {React} takes the components and creates a [snapshot]{.text-teal-400.italic} to populate actual Browser DOM nodes at the [FIRST]{.italic} rendering of the components.

</v-click>

```jsx {hide|*|4|5|*}
import Message from './components/Message.js'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(<Message />)
```

</div>

<img v-click w-80 h-60 src="/lifecycle-mount.png" alt="react mount lifecycle" />

</div>

---
hideInToc: true
transition: fade-out
name: Trigger
---

2. [Trigger:]{.text-gradient.underline}

<div flex gap-3>

At this stage, React watches for [interactivity]{.text-gradient.italic} within mounted components so as to [trigger]{.text-teal-400.italic} updates. Undoubtedly, the only thing that can trigger a re-render in a React application is when there is a [State Change]{.text-gradient.italic}, and this change in state are caused by either automated or user [interactivity]{.text-gradient.italic} like clicking a button or setting a time interval for updates.

<img v-click w-80 h-45 mb-2 src="/lifecycle-trigger.png" alt="react trigger lifecycle" />

</div>

<div flex justify-between gap-3>

<div v-click flex-grow-1>

```jsx {monaco-run} {lineNumbers: 'true', height: '10rem'}
function Clock() {
  const [time, setTime] = React.useState(getCurrentTime())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <h1 className="!text-[1.5rem] text-gradient">{time}</h1>
      <input className="border border-teal-400 text-white p-1 rounded" />
    </>
  )
}

function getCurrentTime() {
  const time = new Date().toLocaleTimeString()
  return time
}
```

</div>

<div v-click w-80>

In this example code, Only the time is being updated every second, not the entire application. This is why you can type on the input and the values don't refresh as the time is updated.

During a [trigger]{.text-gradient}, {React} checks to see what part of the component changed, and thus, re-renders only that part. In this case, time state is being updated with `setTime` within an interval.

</div>

</div>

---
hideInToc: true
transition: slide-right
name: Render
---

3. [Render:]{.text-gradient.underline}

<div flex gap-3>

This is the stage where {React} calls the components to know what to display on the screen. At first trigger ([mount]{.text-teal-400}), {React} renders from the `root` which is the entire components. But during a [state change]{.text-gradient.italic} trigger, {React} searches for the part that changed and updates only that part as seen in the example code from previous slide.

<img w-80 h-45 mb-2 src="/lifecycle-render.png" alt="react render lifecycle" />

</div>

<div v-click>

4. [Commit:]{.text-gradient.underline}

<div flex gap-3>

{React} after rendering updates, [commits]{.text-teal-400.italic} them to the changes to actual DOM for us to see. During first trigger ([mount]{.text-teal-400}), [committing]{.text-teal-400.italic} changes is the same as appending the components to the DOM using the `appendChild()` API. While subsequent triggers due to [interactivity]{.text-gradient.italic} are committed to the UI based on the calculations of the part that actually changed and needs to be updated.

<img w-80 h-45 mb-2 src="/lifecycle-commit.png" alt="react commit lifecycle" />

</div>

</div>

---
hideInToc: true
transition: slide-up
name: React Lifecycle in Summary
---

# [Lifecycle Summery]{.text-gradient}

<div flex gap-4>

<div>

Step 0: [Mount]{.text-teal-400} with `ReactDOM`

Step 1: [Trigger]{.text-teal-400} a render

- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

Step 2: {React} [renders]{.text-teal-400} your components

Step 3: {React} [commits]{.text-teal-400} changes to the DOM

</div>

<img v-click w-80 h-50 mb-2 src="/react-lifecycle.png" alt="react lifecycle" />

</div>

<div v-click>

Any screen update in a {React} app happens in three steps: [Trigger]{.text-gradient}, [Render]{.text-gradient}, and [Commit]{.text-gradient}.
You can use `Strict Mode` to find mistakes in your components caused by impure functions because {React} calls each component twice in `Strict Mode`.
React does not touch the DOM if the rendering result is the same as last time.

</div>

---
hideInToc: true
transition: slide-down
name: Batching
---

# [Batching]{.text-gradient}

In {React}, [batching]{.text-teal-400} refers to the process of grouping multiple state updates into a single re-render to optimize performance. Whenever multiple state changes occur within the same event, {React} automatically [batches]{.text-teal-400.italic} them to reduce the number of renders, which enhances efficiency.

<div v-click>

## How [Batching]{.text-gradient} Works in {React}

</div>

<v-clicks>

1. <u>Event Handlers:</u> {React} [batches]{.text-teal-400.italic} state updates within event handlers. If you update the state multiple times within a single event handler, {React} will group these updates and trigger a single re-render.

<div flex gap-3>

<div flex-grow-1>

```jsx {monaco-run} {lineNumbers: 'true', height: '10rem' }
function Counter() {
  const [count, setCounter] = React.useState(0)

  return (
    <>
      <h1 className="!text-[1.2rem] !mb-0">{count}</h1>
      <button
        className="btn"
        onClick={() => {
          setCounter(count + 1)
          setCounter(count + 1)
          setCounter(count + 1)
        }}
      >
        +3
      </button>
    </>
  )
}
```

</div>

<div flex-grow-1>

```jsx {monaco-run} {lineNumbers: 'true', height: '10rem' }
function Counter() {
  const [count, setCounter] = React.useState(0)

  return (
    <>
      <h1 className="!text-[1.2rem] !mb-0">{count}</h1>
      <button
        className="btn"
        onClick={() => {
          setCounter((count) => count + 1)
          setCounter((count) => count + 1)
          setCounter((count) => count + 1)
        }}
      >
        +3
      </button>
    </>
  )
}
```

</div>

</div>

</v-clicks>

---
hideInToc: true
transition: slide-down
name: Batching
---

2. <u>Promises, Async Calls, and Timeouts:</u> Before {React} 18, [batching]{.text-teal-400} did not automatically happen in async contexts (e.g., setTimeout, Promise.then). In {React} 18 and later, however, automatic batching extends to async functions and other async situations, which minimizes unnecessary renders across all scenarios.

<div v-click flex gap-3>

<div flex-grow-1>

```jsx {monaco-run} {lineNumbers: 'true', height: '15rem' }
function RequestTracker() {
  const [pending, setPending] = React.useState(0)
  const [completed, setCompleted] = React.useState(0)

  // batching extended to async event handler wrongly ❌
  async function handleClick() {
    setPending(pending + 1)
    await delay(3000)
    setPending(pending - 1)
    setCompleted(completed + 1)
  }

  return (
    <>
      <h3 className="!text-[1.3rem] text-gradient">Pending: {pending}</h3>
      <h3 className="!text-[1.3rem] text-gradient">Completed: {completed}</h3>
      <button className="btn" onClick={handleClick}>
        Buy
      </button>
    </>
  )
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
```

</div>

<div flex-grow-1>

```jsx {monaco-run} {lineNumbers: 'true', height: '15rem' }
function RequestTracker() {
  const [pending, setPending] = React.useState(0)
  const [completed, setCompleted] = React.useState(0)

  // batching extended to async event handler correctly ✅
  async function handleClick() {
    setPending((pending) => pending + 1)
    await delay(3000)
    setPending((pending) => pending - 1)
    setCompleted((completed) => completed + 1)
  }

  return (
    <>
      <h3 className="!text-[1.3rem] text-gradient">Pending: {pending}</h3>
      <h3 className="!text-[1.3rem] text-gradient">Completed: {completed}</h3>
      <button className="btn" onClick={handleClick}>
        Buy
      </button>
    </>
  )
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
```

</div>

</div>

---
hideInToc: true
transition: fade-out
name: Bypass batching with flushSync
---

# Bypass [batching]{.text-gradient} with `flushSync`

There are times you might want to bypass batching and apply an update immediately. {React} provides the `flushSync` function to do this.

```jsx {hide|*|7,8|*}
import { flushSync } from 'react-dom'

function ImmediateUpdateExample() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    flushSync(() => setCount(count + 1)) // This update will be applied immediately
    flushSync(() => setCount(count + 2)) // Another immediate update
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Immediately</button>
    </div>
  )
}
```

<span v-click text-3 text-red>

Use flushSync sparingly because it forces {React} to re-render immediately, bypassing the benefits of batching and impacting performance. It’s useful in specific scenarios, such as when you need an immediate update for animations or measuring the DOM.

</span>

---
hideInToc: true
transition: slide-down
name: Rendering lists
---

# [Rendering lists]{.text-gradient}

Often times we would want to render a list of items from an array or a database. This is usually accomplished with the `li` element in `HTML`. Rendering a list from an array of items in {React} requires a careful procedure:

<div text-4>

<v-clicks>

- You can render a list of items from an array using `map()` to loop over the items and create a `li` of each item in the DOM, and you can filter specific data with `filter()` before mapping.
- Each `li` item should always have a `key` which serves as a unique identifier.

</v-clicks>

</div>

<div v-click="3">

````md magic-move {at: 4, lines: true}
```html
// HTML list
<ul>
  <li>Alice Johnson - Software Engineer</li>
  <li>Brian Thompson - Graphic Designer</li>
  <li>Carlos Rivera - Data Scientist</li>
  <li>Dana Lee - Marketing Specialist</li>
</ul>
```

```jsx
// an array of people and job object
const people = [
  { name: "Alice Johnson", job:"Software Engineer" },
  { name: "Brian Thompson", job: "Graphic Designer" },
  { name: "Carlos Rivera" job: "Data Scientist" },
  { name: "Dana Lee" job: "Marketing Specialist" },
];
```

```jsx
const people = [
  { name: "Alice Johnson", job:"Software Engineer" },
  { name: "Brian Thompson", job: "Graphic Designer" },
  { name: "Carlos Rivera" job: "Data Scientist" },
  { name: "Dana Lee" job: "Marketing Specialist" },
];

function List () {
  return (
    <>
      <h1>List of people and their occupation</h1>
      <ul>{people.map((person) => <li key={person.name}>{person.name}: {person.job}</li>)}</ul>
    </>
  )
}
```

```jsx
const people = [
  { name: "Alice Johnson", job:"Software Engineer" },
  { name: "Brian Thompson", job: "Graphic Designer" },
  { name: "Carlos Rivera" job: "Data Scientist" },
  { name: "Dana Lee" job: "Marketing Specialist" },
];

function List () {
  const filteredPeopleArray = people.filter(person => person.job !== "Marketing Specialist")
  return (
    <>
      <h1>List of people and their occupation</h1>
      <ul>{filteredPeopleArray.map((person) => <li key={person.name}>{person.name}: {person.job}</li>)}</ul>
    </>
  )
}
```
````

</div>

---
hideInToc: true
transition: slide-up
name: Why does a list need a key?
---

# Why List [key]{.text-gradient}? Where to find a `key` value?

A list `key` is a unique identifier that gives the list item a name in the DOM so as to precisely locate it when needed. Some suggestions of getting a unique `key` value include:

<v-clicks>

- Using the Serial No. or ID of the item as it is on the database
- Using a unique key generator like `crypto.randomUUID()` or a package like <span text-teal-400>[uuid](https://www.npmjs.com/package/uuid)</span>. Although generating key values locally can be tricky since they may change on every re-render, they are best used for local items.
</v-clicks>

<span v-click>

## <u>Rules of keys</u>

</span>

<v-clicks>

- [Keys]{.text-gradient} must be unique among siblings. However, it’s okay to use the same keys for `JSX` nodes in different arrays.
- [Keys]{.text-gradient} must not change or that defeats their purpose! Don’t generate them while rendering.

</v-clicks>

---
hideInToc: true
transition: fade-out
name: Conditional rendering - if-else, ternary, && operator
---

# [Conditional rendering - if-else, ternary, && operator]{.text-gradient}

Sometime we want to trigger a [state change]{.text-teal-400} based on a certain condition in our application. When the stated condition is met, a specified part of our application gets rendered or re-rendered. This act is term [Conditional Rendering]{.text-gradient.italic}.

<span v-click>In {React}, we can render our `JSX` based on a condition in various ways which include:</span>

<div flex gap-3>

<div>

<div v-click>

- Using `if-else` statement

````md magic-move {at: 3}
```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>
  } else {
    return <h1>Please sign in.</h1>
  }
}
```

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>
  }
  return <h1>Please sign in.</h1>
}
```

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return null // condition returning nothing
  }
  return <h1>Please sign in.</h1>
}
```
````

</div>

<div v-click="5" w-max>

- Using Ternary Operator (`condition ? do : else-do`)

````md magic-move {at: 6}
```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? 'Welcome back!' : 'Please sign in.'}</h1>
}
```

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? 'Hello!' + 👋 : 'Hello!'}</h1>
  );
}
```
````

</div>

</div>

<div v-click="7">

- Using `&&` (AND) Operator

-(`Left && Right must match`)

```jsx
function Notification({ hasMessages }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {hasMessages && <p>You have new messages!</p>}
    </div>
  )
}
```

</div>

</div>

---
hideInToc: true
transition: slide-down
---

# [Conditionally assigning values to a variable]{.text-gradient}

<span text-4>

We can assign `JSX` to a variable based on a condition. As we know in [JavaScript]{.text-gradient}, we can re-assign values to variables declared with the `let` keyword. In that regard, we can declare what we want to assign based on a condition, then use any conditional statement to re-assign value or `JSX` that would be rendered to the UI. We can also assign `JSX` directly for cleaner code when using conditional statement like the Ternary Operator.

</span>

````md magic-move
```jsx {*|2|5-13|17|*}
function StatusMessage({ status }) {
  let message

  if (status === 'loading') {
    // Example with if-else statement
    message = <p>Loading...</p>
  } else if (status === 'success') {
    message = <p>Data loaded successfully!</p>
  } else if (status === 'error') {
    message = <p>Failed to load data.</p>
  } else {
    message = <p>Unknown status.</p>
  }

  return <div>{message}</div>
}
```

```jsx {*|3-5|9|*}
// Example with Ternary Operator
function Greeting({ isLoggedIn }) {
  const greetingMessage = isLoggedIn ? (
    <h1>Welcome back!</h1>
  ) : (
    <h1>Please sign in.</h1>
  )

  return <div>{greetingMessage}</div>
}
```

```jsx {*|3|8|*}
// Example with &&
function Notification({ hasMessages }) {
  const message = hasMessages && <p>You have new messages!</p>

  return (
    <div>
      <h1>Dashboard</h1>
      {message}
    </div>
  )
}
```
````

---
hideInToc: true
name: Resources
---

[Resources]{.text-gradient.text-4xl}

React Lifecycle:

- https://react.dev/learn/render-and-commit
- https://ui.dev/why-react-renders
- https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render
