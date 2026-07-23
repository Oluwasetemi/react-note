---
layout: center
transition: slide-up
hideInToc: true
---

# Testing React Applications

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Introduction to Testing</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Unit Testing with Vitest and React Testing Library</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Querying the DOM</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">userEvent — simulating real interactions</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Unit Testing Example</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Common Assertions</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Integration Testing</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Async Testing</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">End-to-End Testing</a>

---
hideInToc: true
---

## ✴ [ Testing]{.text-gradient.text-4xl}

Testing is a critical process in software development that `ensures the code behaves as expected`.

For React applications, it involves verifying that <span class="text-teal-400">components render correctly</span>, <span class="text-teal-400">handle user interactions seamlessly</span>, and <span class="text-teal-400">integrate smoothly with other parts</span> of the application. A comprehensive testing strategy not only identifies bugs but also enhances the resilience and maintainability of your application.

<v-clicks>

### In React, there are three primary levels of testing:

1️⃣ `Unit Tests`: Focus on individual components or functions, ensuring their isolated behavior is correct.

2️⃣ `Integration Tests`: Verify that multiple components or systems work together as intended.

3️⃣ `End-to-End Tests (E2E)`: Simulate real-world user behavior to test the entire application from start to finish.

A robust testing strategy typically follows the testing pyramid, which emphasizes:

<div class="text-sm">

- <span class="text-teal-400 text-sm">Many</span> Unit Tests: These form the foundation, ensuring the smallest units of your application are reliable.
- <span class="text-teal-400 text-sm">Some</span> Integration Tests: These validate that components and modules interact correctly.
- <span class="text-teal-400 text-sm">Fewer</span> End-to-End Tests: These confirm the application works as a cohesive whole.

</div>

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## [ Unit Testing with Vitest + React Testing Library]{.text-gradient.text-4xl}

Unit testing verifies that individual parts of the application (e.g., components, functions) `work as expected in isolation`.

<span class="text-teal-400">Vitest</span> is a blazing-fast unit testing framework powered by Vite, offering native ESM support, TypeScript/JSX out of the box, Jest-compatible API, and instant HMR-driven watch mode — with no extra transpilation config needed in Vite projects. Paired with <span class="text-teal-400">React Testing Library</span> — a lightweight library that tests component behavior from the user's perspective rather than implementation details — it enables meaningful, user-centric tests.

<v-clicks class="text-sm">

### Why use both together?

<div class="text-sm">

Vitest provides `the test runner and assertions`, while React Testing Library `enhances it` by rendering components into a real DOM and exposing user-facing queries like `getByRole`, `getByText`, and `getByTestId`.


### Setup (4 steps)

1. Install dependencies → `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom`
2. Configure `vite.config.js` — set `environment: 'jsdom'`, `globals: true`, and point to a setup file
3. Create `src/setupTests.js` and import `'@testing-library/jest-dom'` to extend `expect` with DOM matchers
4. Place test files next to components as `ComponentName.test.jsx` or inside a `__tests__` folder

</div>

</v-clicks>

---
hideInToc: true
transition: slide-up
name: Querying the DOM
---

## Querying the DOM — `screen`

React Testing Library renders your component and exposes `screen` to find elements the way a user would — by what they see, not by CSS classes or component internals.

<v-clicks>

**Query priority** — use the highest one that fits:

| Priority | Query | When to use |
|----------|-------|-------------|
| 1 | `getByRole('button', { name: /submit/i })` | Most UI elements have an implicit ARIA role |
| 2 | `getByLabelText('Email')` | Form inputs with a `<label>` |
| 3 | `getByPlaceholderText('Search…')` | Inputs without a label |
| 4 | `getByText('Welcome')` | Non-interactive text content |
| 5 | `getByTestId('count')` | Last resort — adds test-only attributes to production code |

**Three query families:**

- `getBy…` — must exist right now, throws if missing
- `queryBy…` — returns `null` if missing (use for "should not be there" assertions)
- `findBy…` — returns a Promise, waits up to 1s (use for async content)

</v-clicks>

---
hideInToc: true
transition: slide-up
name: userEvent
---

## `userEvent` — simulating real interactions

`userEvent` fires the full sequence of browser events a real user would trigger. Prefer it over `fireEvent` for everything that involves typing, clicking, or focusing.

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('user can type into an input', async () => {
  // Setup userEvent instance first
  const user = userEvent.setup()

  render(<input placeholder="Your name" />)

  const input = screen.getByPlaceholderText('Your name')
  await user.type(input, 'Setemi')

  expect(input).toHaveValue('Setemi')
})

test('user can click a button', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(<button onClick={handleClick}>Save</button>)

  await user.click(screen.getByRole('button', { name: /save/i }))

  expect(handleClick).toHaveBeenCalledOnce()
})
```

<v-click>

> **`fireEvent.click(btn)`** dispatches one synthetic click event.  
> **`userEvent.click(btn)`** fires pointerover → pointerenter → mouseover → mousemove → mousedown → mouseup → click — matching real browser behaviour.

</v-click>

---
hideInToc: true
transition: slide-down
name: Unit Testing Example
---

The Counter component below includes a button to increment a displayed count value, with tests verifying `the initial count is displayed correctly` & `clicking the button increments the count`.

<div  class="flex gap-2 w-full">

<div v-click  class="w-1/4">

vite.config.js

```js  {lineNumbers: true}
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
  },
})
```

src/setupTests.js

```js {lineNumbers: true}
import '@testing-library/jest-dom'
```

</div>

<div v-click  class="w-1/4">
Counter.jsx

```jsx {lineNumbers: true}
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

export default Counter
```

</div>

<div v-click  class="w-1/2">
Counter.test.jsx

```jsx {lineNumbers: true}
// With globals: true in config, no vitest imports needed
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

describe('Counter Component', () => {
  // Test the initial state
  test('displays initial count', () => {
    render(<Counter />)
    const countElement = screen.getByTestId('count')
    expect(countElement).toHaveTextContent('0')
  })

  // Test the button functionality
  test('increments count on button click', () => {
    render(<Counter />)
    const button = screen.getByText(/increment/i)
    fireEvent.click(button)
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })
})
```

> 💡 Without `globals: true`, import `describe`, `test`, `expect` from `'vitest'` explicitly.

</div>
</div>

---
hideInToc: true
transition: slide-up
name: Common Assertions
---

## Common Assertions — `jest-dom` matchers

After you find an element with `screen`, use these matchers on `expect(element)`:

<v-clicks>

| Matcher | What it checks |
|---------|---------------|
| `toBeInTheDocument()` | Element exists in the DOM |
| `not.toBeInTheDocument()` | Element is absent (use with `queryBy`) |
| `toBeVisible()` | Rendered and not hidden by CSS |
| `toBeDisabled()` | Has `disabled` attribute |
| `toBeEnabled()` | Does not have `disabled` attribute |
| `toHaveTextContent('Hello')` | Text content matches (partial or regex) |
| `toHaveValue('Setemi')` | Input/select/textarea current value |
| `toHaveAttribute('href', '/about')` | HTML attribute value |
| `toHaveClass('btn-primary')` | CSS class is present |

**Quick pattern to remember:**

```jsx
// 1. Render
render(<MyComponent />)

// 2. Find
const btn = screen.getByRole('button', { name: /save/i })

// 3. Assert or interact, then assert
expect(btn).toBeEnabled()
await user.click(btn)
expect(screen.getByText('Saved!')).toBeInTheDocument()
```

</v-clicks>

---
hideInToc: true
transition: slide-right
---

## [ Integration Testing]{.text-gradient.text-4xl}

Integration testing ensures that `multiple components or functions work seamlessly together`, focusing on their interactions rather than testing them in isolation (unit testing). It validates workflows like how a parent component communicates with its children or how a form submits data to an API.

This type of testing bridges the gap between unit and end-to-end tests, offering confidence in component interactions without the complexity of testing the entire application.

<v-clicks>

⚠️ Vitest and React Testing Library can be used for integration testing.

### Examples of when to use integration tests{.text-gradient.text-4xl}

- To validate components that share state or props.
- To test workflows involving multiple interacting components.
- To ensure UI interactions trigger the correct behavior across components.

In the Todo example on the next page 👉, the app consists of three components: InputField for entering tasks, TodoList for displaying tasks, and TodoApp for managing state and integrating the other components into a functional workflow.

The tests ensure that InputField correctly adds tasks and that TodoList displays tasks managed by TodoApp.

</v-clicks>

---
hideInToc: true
transition: slide-up
layout: iframe-lazy
url: https://codesandbox.io/p/sandbox/friendly-banzai-4q2mvm?file=%2Fsrc%2FApp.test.js%3A5%2C37
name: Testing Example
autoLoad: true
---

---
hideInToc: true
transition: slide-up
name: Async Testing
---

## Async Testing — `findBy` and `waitFor`

When a component fetches data or updates after a delay, your test must wait for the DOM to catch up.

<v-clicks>

**`findBy`** — like `getBy` but returns a Promise. Retries until the element appears (default 1s timeout).

```jsx
test('shows user name after fetch', async () => {
  // Mock the fetch so tests don't hit a real server
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ name: 'Setemi' }),
  })

  const user = userEvent.setup()
  render(<UserProfile userId="1" />)

  // getByText would throw immediately — the data isn't there yet
  const heading = await screen.findByText('Setemi') // waits for it

  expect(heading).toBeInTheDocument()

  vi.restoreAllMocks()
})
```

**`waitFor`** — retries an assertion until it passes, useful when an element changes rather than appears.

```jsx
await waitFor(() => {
  expect(screen.getByTestId('status')).toHaveTextContent('Saved')
})
```

> Always `await` async queries and interactions — a test that doesn't `await` can pass for the wrong reason.

</v-clicks>

---
hideInToc: true
---

## [ End to End Testing - (E2E)]{.text-gradient.text-4xl}

End-to-End (E2E) testing verifies the entire application flow, simulating real-world user interactions and ensuring that everything works as expected from start to finish. Unlike unit or integration tests that focus on isolated components or their interactions, `E2E tests cover full workflows and validate the complete system`, including interactions with external services (APIs, databases, etc.).

It verifies that:

- The application functions correctly when accessed by a user.
- Different components work together as intended, from the frontend to backend.
- There are no broken links, errors, or unexpected behaviors in the user experience.

💡In an E2E test for a TodoApp, you would verify that a user can open the app, add a task, see the task appear in the list, and either complete or delete the task.

Some popular tools for E2E testing include:

1️⃣ <span class="text-teal-400">Cypress</span>: A popular tool for E2E testing, great for fast and reliable testing with a rich interface.

2️⃣ <span class="text-teal-400">Playwright</span>: An open-source framework built specifically for E2E testing

---
hideInToc: true
transition: slide-up
---

## [Practice]{.text-gradient.text-4xl}

**Write your first component test** — 10 minutes, no submission required.

Given this counter component, write three tests using React Testing Library.

```jsx
// counter.jsx
export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)} disabled={count === 0}>
        Decrement
      </button>
    </div>
  )
}
```

```jsx
// counter.test.jsx — fill in the three tests
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './counter'

test('shows initial count of 0', () => {
  // TODO
})

test('increments when the button is clicked', async () => {
  // TODO: render, click Increment, assert count is 1
})

test('Decrement button is disabled at zero', () => {
  // TODO: assert the button has the disabled attribute
})
```

<Tips type="tip">
Use <code>screen.getByText()</code> or <code>screen.getByTestId()</code> to find elements. Use <code>await userEvent.click()</code> (not <code>fireEvent</code>) — it more accurately simulates real user behaviour.
</Tips>
