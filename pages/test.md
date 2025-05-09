---
layout: center
transition: slide-up
hideInToc: true
---

# Testing React Applications

<div mt-2 />

- <a @click="$slidev.nav.next()">Introduction to Testing</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Unit Testing with Jest and React Testing Library</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Integration Testing</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">End-to-End Testing</a>

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

- <span class="text-teal-400">Many</span> Unit Tests: These form the foundation, ensuring the smallest units of your application are reliable.
- <span class="text-teal-400">Some</span> Integration Tests: These validate that components and modules interact correctly.
- <span class="text-teal-400">Fewer</span> End-to-End Tests: These confirm the application works as a cohesive whole.

</v-clicks>

---
hideInToc: true
transition: slide-up
---

## [ Unit Testing with Jest + React Testing Library]{.text-gradient.text-4xl}

Unit testing verifies that individual parts of the application (e.g., components, functions) `work as expected in isolation`.

<span class="text-teal-400">Jest</span> is a widely-used JavaScript testing framework offering a robust, zero-configuration setup for running tests. Paired with <span class="text-teal-400">React Testing Library</span> — a lightweight library designed to test the behavior of React components rather than their implementation — it enables developers to focus on how users interact with the UI, ensuring more meaningful and user-centric testing.

<v-clicks>

### Why use both together ?

Jest provides `the testing framework`, while React Testing Library `enhances it` by focusing on rendering components and testing user interactions.

To setup

- Install <span class="text-teal-400">Jest</span> and <span class="text-teal-400">React Testing Library</span> → `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`.
- Place test files in a `__tests__` folder or next to components using the `ComponentName.test.js` format.

</v-clicks>

---
hideInToc: true
transition: slide-down
name: Unit Testing Example
---

The Counter component below includes a button to increment a displayed count value, with tests verifying `the initial count is displayed correctly` & `clicking the button increments the count`.

<div  class="flex gap-2 w-full">

<div v-click  class="w-1/3">
Counter Component  (Counter.js)

```jsx {monaco} {lineNumbers: true}
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter
```

</div>

<div v-click  class="w-2/3">
Test (Counter.test.js)

```jsx {monaco} {lineNumbers: true}
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

describe('Counter Component', () => {
  // Test the initial state
  test('displays initial count', () => {
    render(<Counter />) // Render the component
    // Find the count element
    const countElement = screen.getByTestId('count')
    expect(countElement).toHaveTextContent('0') // Assert it starts at 0
  })

  // Test the button functionality
  test('increments count on button click', () => {
    render(<Counter />)
    const button = screen.getByText(/increment/i) // Find the button
    fireEvent.click(button) // Simulate a click
    // Find the count element again
    const countElement = screen.getByTestId('count')
    // Assert it increments to 1
    expect(countElement).toHaveTextContent('1')
  })
})
```

</div>
</div>

---
hideInToc: true
transition: slide-right
---

## [ Integration Testing]{.text-gradient.text-4xl}

Integration testing ensures that `multiple components or functions work seamlessly together`, focusing on their interactions rather than testing them in isolation (unit testing). It validates workflows like how a parent component communicates with its children or how a form submits data to an API.

This type of testing bridges the gap between unit and end-to-end tests, offering confidence in component interactions without the complexity of testing the entire application.

<v-clicks>

⚠️ Jest and React Testing Library can be used for integration testing.

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
layout: iframe
url: https://codesandbox.io/p/sandbox/friendly-banzai-4q2mvm?file=%2Fsrc%2FApp.test.js%3A5%2C37
name: Testing Example
---

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
