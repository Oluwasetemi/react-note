---
layout: center
transition: slide-up
hideInToc: true
---

# Managing State

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Imperative vs Declarative</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">How to structure state</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Lifting state up</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Reducer function</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Controlled vs Uncontrolled Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+11)">Keeping your components pure</a>

---
hideInToc: true
---

# Imperative vs Declarative

<Tips type="info" fullWidth>
 Imperative: How to do something, Declarative: What to do
</Tips>

UI is a function of state and it should be declarative using JSX and the power of event interactivity in React. Identifying your component's different visual states, determine what triggers those state changes, Represent the state in memory using `useState`. Remove any non-essential state variables and connect the event handlers to set the state.

Reacting to user input is a key part of building interactive UIs. Handling user input with React typically involves updating the state of your components based on the user's input and interactions. Triggering state changes based on user input is how you build interactive UIs.

When a user types something into the form, the `submit` button becomes enabled. When the user clicks the `submit` button, both the form and the button becomes disabled and a spinner appears. If the network request is successful, the spinner disappears and a success message appears. If the network request fails, the spinner disappears and an error message appears. The above can be represented imperatively or declaratively. React enforces a declarative approach.

---
hideInToc: true
name: Declarative Programming
---

<Tips type="tip" fullWidth>
This involves listing out all the states your component can be in and how it transitions between those states. EMPTY: form has a disabled submit button, TYPING: Form has an enabled submit button, SUBMITTING: Form and button are disabled, spinner appears, SUCCESS: Spinner disappears, success message appears, ERROR: Spinner disappears, error message appears.
</Tips>

Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).

- Identify all its visual states
- Determine what triggers those state changes
- Represent the state in memory using `useState`
- Connect the event handlers to set the state

The example in the next slide shows a form that has a textarea input field and a submit button. The submit button is disabled when the textarea is empty. When the user types something into the textarea, the submit button becomes enabled. When the user clicks the submit button, the form and the button becomes disabled and a spinner appears. If the network request is successful, the spinner disappears and a success message appears. If the network request fails, the spinner disappears and an error message appears.

---
hideInToc: true
name: Declarative Programming Example
---

```jsx {monaco-run} {lineNumbers: 'true', height: '20rem', overflowY: 'scroll'}
function Form() {
  const [answer, setAnswer] = React.useState('')
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  if (status === 'success') {
    return <h1 tabIndex="-1">That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitForm(answer)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  function handleTextareaChange(e) {
    setStatus('typing')
    setAnswer(e.target.value)
  }

  return (
    <>
      <h2>Sample quiz - {status}</h2>
      <p>What should be the correct value?</p>
      <form onSubmit={handleSubmit} className="grid mb-300px">
        <textarea
          className="input"
          placeholder="Type your answer here..."
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        {error !== null && (
          <p
            role="alert"
            className="Error text-red-400 transition-colors duration-300 ease-in-out text-blue-500 hover:text-red-500"
          >
            {error.message}
          </p>
        )}
        <button
          className={`btn ${answer.length === 0 || status === 'submitting' ? 'disabled bg-blue-300 cursor-not-allowed' : ''}`}
          disabled={answer.length === 0 || status === 'submitting'}
        >
          Submit
        </button>
      </form>
    </>
  )
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'correct'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'))
      } else {
        resolve()
      }
    }, 1500)
  })
}
```

---
hideInToc: true
---

# How to structure state

- Identify all the states your component can be in and how it transitions between those states.
- Group related states together.
- Avoid contradicting states.
- Avoid unnecessary and state duplication states.
- Avoid deeply nested states.

The goal behind these principles is to make state easy to update without introducing mistakes. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync.

<Tips type="info" fullWidth>
    The more states you have, the more complex your component becomes. The more complex your component becomes, the more likely it is to have bugs.<br/>
    “Make your state as simple as it can be—but no simpler.” - Albert Einstein
</Tips>

<div grid="~ cols-2" gap="2">

```jsx
const [x, setX] = useState(0)
const [y, setY] = useState(0)
```

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 })
```

</div>

---
hideInToc: true
---

# Avoid unnecessary and state duplication states

```jsx {monaco-diff}
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const [fullName, setFullName] = useState(firstName + ' ' + lastName);

~~~
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName;
```

Use spread operator to override the change part of the state when updating the state.

```jsx
const [user, setUser] = useState({ firstName: '', lastName: '' })
setUser({ ...user, firstName: 'John' })
```

This way, you don't have to worry about the state being out of sync and unnecessary nesting of states. Keeping the states flat and simple as possible.

---
hideInToc: true
---

# Lift state up

When several components need to reflect the same changing data, it's recommended to lift the shared state up to their closest common ancestor. That means if two child components share the same state, the state should be lifted up to their parent component.

```jsx
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Child count={count} setCount={setCount} />
      <Child count={count} setCount={setCount} />
    </>
  )
}
```

The Child component can now be a functional component that receives the `count` and `setCount` as props and can update the state in the parent component. This is called lifting state up. Sharing state between components is a common pattern in React.

---
hideInToc: true
name: Lifting State Up Example
---

<div grid="~ cols-2" gap="2">

<div grid="~ row-2" gap="2">

```jsx
function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button className="btn" onClick={onShow}>
          Show
        </button>
      )}
    </section>
  )
}
```

<Accordion />

</div>

```jsx
function Accordion() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  return (
    <>
      <h2>Coding Schools</h2>
      <Panel
        title="AltSchool Africa"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Pushing to be the institution in Africa and the world at large. Here at
        AltSchool Africa, we believe in the power of education to change the
        world.
      </Panel>
      <Panel
        title="Others"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Other coding schools in Africa are doing great things but cannot out
        pace and match the quality of education we provide at AltSchool Africa.
      </Panel>
    </>
  )
}
```

</div>

---
hideInToc: true
---

# Reducer function

<div />

A reducer function is a function that takes the current state and an action and returns a new state. It's a way to manage state in a more predictable way. It's a pattern that's used in many programming languages and libraries. Its often useful when you have complex state logic that involves multiple sub-states or when the next state depends on the previous state. Extracting the state logic into a reducer function can make your code easier to understand and maintain.

<div grid="~ cols-2" gap="2">

```jsx
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
```

```jsx
function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 })
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}
```

</div>

---
hideInToc: true
---

```jsx {monaco-run} {lineNumbers: 'true', height: '20rem', overflowY: 'scroll'}
function Form() {
  function statusReducer(state, action) {
    switch (action.type) {
      case 'idle':
        return { status: 'idle', answer: '', error: null }
      case 'typing':
        return { ...state, status: 'typing', answer: action.answer, error: null }
      case 'submitting':
        return { ...state, status: 'submitting' }
      case 'success':
        return { status: 'success', answer: state.answer, error: null }
      case 'error':
        return { ...state, status: 'typing', error: action.error }
      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(statusReducer, {
    status: 'idle',
    answer: '',
    error: null
  })

  if (state.status === 'success') {
    return <h1 tabIndex="-1">That's right!<button className="btn" onClick={() => dispatch({type: 'idle'})}>Type Again</button></h1>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'submitting' })
    try {
      await submitForm(state.answer)
      dispatch({ type: 'success' })
    } catch (err) {
      dispatch({ type: 'error', error: err.message })
    }
  }

  function handleTextareaChange(e) {
    dispatch({ type: 'typing', answer: e.target.value })
  }

  return (
    <>
      <h2>Sample quiz - {state.status}</h2>
      <p>What should be the correct value?</p>
      <form onSubmit={handleSubmit} className="grid mb-300px">
        <textarea
          className="input"
          placeholder="Type your answer here..."
          value={state.answer}
          onChange={handleTextareaChange}
          disabled={state.status === 'submitting'}
        />
        <br />
        {state.error && (
          <p
            role="alert"
            className="Error text-red-400 transition-colors duration-300 ease-in-out text-blue-500 hover:text-red-500"
          >
            {state.error}
          </p>
        )}
        <button
          className={`btn ${state.answer.length === 0 || state.status === 'submitting' ? 'disabled bg-blue-300 cursor-not-allowed' : ''}`}
          disabled={state.answer.length === 0 || state.status === 'submitting'}
        >
          Submit
        </button>
      </form>
    </>
  )
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'correct'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'))
      } else {
        resolve()
      }
    }, 1500)
  })
}
```

---
hideInToc: true
---

# Controlled vs Uncontrolled Components

<div />

Controlled components are components that render form elements whose values are controlled by React. Uncontrolled components are components that render form elements whose values are controlled by the DOM.

Controlled components are more flexible because you can control the value of the input field and the value of the input field can be derived from the state. Uncontrolled components are less flexible because you can't control the value of the input field and the value of the input field can't be derived from the state.

<div grid="~ cols-2">

```jsx
function ControlledInput() {
  const [value, setValue] = React.useState('')
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

```jsx
function UncontrolledInput() {
  const inputRef = React.useRef()
  return <input type="text" ref={inputRef} />
}
```

</div>

---
hideInToc: true
name: Uncontrolled Components Example
---

```jsx {monaco-run} {lineNumbers: 'true', height: '20rem'}
function UncontrolledForm() {
  const nameRef = React.useRef(null)
  const emailRef = React.useRef(null)

  function handleSubmit(event) {
    event.preventDefault()

    // Access values directly from the DOM elements
    const name = nameRef.current.value
    const email = emailRef.current.value

    console.log('Name:', name)
    console.log('Email:', email)

    alert('Form submitted successfully!')

    // Optionally clear the fields
    nameRef.current.value = ''
    emailRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input className="input" type="text" id="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input className="input" type="email" id="email" ref={emailRef} />
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}
```

---
hideInToc: true
---

# Keeping your components pure

<div mt--2 />

A pure component is a component that renders the same output for the same input. It doesn't have any side effects and doesn't depend on anything other than its props and state. Pure components are easier to reason about and test because they don't have any side effects.

<div grid="~ cols-2" gap="2">

```jsx
function PureComponent({ value }) {
  return <div>{value}</div>
}
```

```jsx
function ImpureComponent() {
  return <div>{new Date().toLocaleTimeString()}</div>
}
```

</div>

Keeping your components pure make rendering predictable. Its easier to manage, it doesn't have any side effects and doesn't depend on anything other than its props and state. Effects are a way to add side effects to your components and it should be done with caution using events, refs and special hooks designed for such purpose.

<Tips type="danger" fullWidth>
You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects.<br />
Strive to express your component’s logic in the JSX you return. When you need to “change things”, you’ll usually want to do it in an event handler. As a last resort, you can useEffect.
</Tips>
