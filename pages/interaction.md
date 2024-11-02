---
layout: center
transition: slide-up
hideInToc: true
---

# Interactivity

<div mt-2 />

- <a @click="$slidev.nav.next()">How do you make a component interactive? - events</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Creating and adding event handlers</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Dos and Don'ts</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Passing event handlers as props</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Naming event handler props</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Propagation</a>

---
hideInToc: true
transition: slide-up
---

# [How to make a component interactive? - events]{.text-gradient}

In the previous chapter we learned about Components in React and how to create one. Let's talk about making them interactive.

<div flex gap-2 v-click mb-2>
<div>Bringing back our <span text-teal-400>components mansion</span> (the house), we mentioned that the components of a house are reusable features like the doors, windows, lights, etc. These features needs human <span text-gradient>interaction</span> to be usable or to act in a certain way. For example, if you want to enter or leave the house, you need to open the door (<span text-gradient>interact</span> with the door), you can turn on/off the light as you desire (<span text-gradient>interactivity</span>). </div>
<img class="w-24 h-24" src="/images/house.jpg" alt="a house" />
</div>
<v-click>
The same logic of <span text-gradient>interactivity</span> about a house above applies to React components. For example, you may desire to alert a success message to your users only when they click a button. This can be achieved when you add an <span text-gradient>event</span> to the button to listen to the user's interaction. When the data of a JSX element or a component change over time automatically or due to user interaction, we call it "changing of <span text-gradient>state</span>".
</v-click>
<div v-click mt-4>
Now that we mentioned <span text-teal-400>Events</span>, let's talk about <span text-gradient>Events in React</span>.
</div>

---
hideInToc: true
transition: slide-down
---

[Making a Component Interactive with Events]{.text-gradient.text-4xl}

You can add [events]{.text-teal-400} directly to JSX elements rendered by your component. In the example below, the `onClick` event is used listen to a click interaction to apply a `state` update to the component with `setCount`. The `useState` hook is used to update the state of a component in React. We will talk more on `useState` when learning about Hooks and State Management in React.

```jsx {monaco-run} { lineNumbers: 'true', height: '13rem' }
function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="flex gap-3 items-center">
      <button onClick={() => setCount(count + 1)} className="btn">
        Click Me
      </button>
      <p>
        You clicked <span className="text-gradient">{count}</span> times
      </p>
    </div>
  )
}
```

---
hideInToc: true
transition: fade
---

# [Roles of State in a React Component's Interactivity]{.text-gradient}

[State]{.text-teal-400} is regarded as the memory of a {React} component. When a component gains interaction, it compares its previous form before the interaction, and its form after the interaction. This action can be termed as <i>"Comparing of [State Change]{.text-teal-400} in the component"</i>. When React compares the before and after form of a component during <span class="text-gradient italic">State Change</span> and they differ, React goes ahead to update the component with the latest changes.

<v-click>

You can add a [State]{.text-teal-400} to your component using the `useState` Hook React provides. Hooks are helper functions that lets you use some special features in React. [State]{.text-teal-400} updates based on [Interactivity]{.text-gradient}.

</v-click>

<div flex gap-3>

<div>

<v-click>

[Roles of State]{.text-gradient.underline}

</v-click>

<v-clicks>

- Triggering UI Updates
- Tracking User Input
- Handling Component Visibility
- Enabling Conditional Rendering
- Managing Component Animation and Transitions

</v-clicks>

</div>

<div flex-grow-1 v-click="8">

```jsx {monaco-run} { lineNumbers: 'true', height: '11rem' }
function FadeComponent() {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="flex gap-3 items-center">
      <button className="btn" onClick={() => setVisible(!visible)}>
        Toggle Visibility
      </button>
      <div className={visible ? 'block text-gradient' : 'fade-out-leave-to'}>
        Fading Text
      </div>
    </div>
  )
}
```

</div>

</div>

---
hideInToc: true
transition: fade-out
---

[Creating and Adding Event Handlers to JSX in React]{.text-gradient.text-4xl}

React allows you add [event handlers]{.text-teal-400.italic} to JSX. Event handlers are functions we created to be triggered when a user interacts with a `Component` or a `JSX` element like clicking, hovering, focusing on a `button`.

```jsx {hide|*}
function handleClick() {
  console.log('Button clicked')
}

;<button onClick={handleClick}>Click me</button>
```

<span v-click>

In the above codeblock, we created our [event handler]{.text-teal-400.italic} (`handleClick()`) and passed it to the `onClick` prop of the `button` element to console log 'Button clicked' when a user clicks the button.

</span>

---
hideInToc: true
transition: slide-left
---

[Dos]{.text-gradient.text-4xl} [and]{.text-4xl} [Don'ts]{.text-gradient.text-4xl}

[Dos:]{.text-green-400.underline}

- <u>Use Arrow Functions for Simplicity:</u> Especially when you need to pass arguments to the event handler.

```jsx
<button onClick={() => handleClick(item.id)}>Click me</button>
```

- <u>Use `event.preventDefault()`:</u> When you want to prevent the default behavior of events like form submissions or link clicks.

```jsx
function handleSubmit(event) {
  event.preventDefault()
  // Handle form submission logic
}
```

- <u>Keep Event Handlers Small:</u> If your event handler logic grows too large, consider moving it into a separate function for better readability.

---
hideInToc: true
transition: slide-left
---

# [Dos]{.text-gradient} and [Don'ts]{.text-gradient}

[Don'ts:]{.text-red.underline}

- <u>Do Not Use Inline Handlers for Complex Logic:</u> Avoid putting long or complex logic directly inside JSX as it can make the code harder to read.

````md magic-move {at: 1,lines: true}
```jsx {*|8-15|*}
// Don't
function Product({ price, discount }) {
  return (
    <div>
      <p>Price: ${price}</p>
      <p>Discount: {discount}%</p>
      <button
        onClick={() => {
          const discountedPrice = price - (price * discount) / 100
          if (discountedPrice < 0) {
            console.log('Discounted price cannot be negative')
          } else {
            console.log(`Discounted price is $${discountedPrice}`)
          }
        }}
      >
        Calculate Discount
      </button>
    </div>
  )
}
```

```jsx {*|15|*}
// Do
function Product({ price, discount }) {
  const calculateDiscount = () => {
    const discountedPrice = price - (price * discount) / 100
    if (discountedPrice < 0) {
      console.log('Discounted price cannot be negative')
    } else {
      console.log(`Discounted price is $${discountedPrice}`)
    }
  }
  return (
    <div>
      <p>Price: ${price}</p>
      <p>Discount: {discount}%</p>
      <button onClick={calculateDiscount}>Calculate Discount</button>
    </div>
  )
}
```
````

---
hideInToc: true
transition: slide-right
---

# [Dos]{.text-gradient} and [Don'ts]{.text-gradient}

[Don'ts:]{.text-red.underline}

- <u>Do Not Overuse Arrow Functions in the JSX:</u> Inline arrow functions can cause issues in performance-sensitive parts of the application because a new function is created on every render. This can lead to unnecessary re-renders of child components.

````md magic-move {at: 1,lines: true}
```jsx {*|8|*}
// Don't
function UserList({ users, onSelectUser }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onSelectUser(user.id)}>Select</button>
        </li>
      ))}
    </ul>
  )
}
// a new function is created for each user in the list on every render
// because of the inline arrow function.
```

```jsx {*|3-5,12|*}
// Do
function UserList({ users, onSelectUser }) {
  const handleSelectUser = (id) => () => {
    onSelectUser(id)
  } // Define the function outside of the map and pass it to the child elements

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={handleSelectUser(user.id)}>Select</button>
        </li>
      ))}
    </ul>
  )
}
```
````

---
hideInToc: true
transition: slide-right
---

[Passing Event Handlers as Props]{.text-gradient.text-4xl}

Built-in components like `<button>` only support built-in browser events like `onClick`. So in order to pass an [event handler]{.text-gradient.italic} as a prop with a desired name to a component, create a custom component and give their [event handlers]{.text-teal-400.italic} props specific names.

<div flex gap-4>
```jsx {hide|*}
// Custom component
function ToggleSwitch({ onToggle }) {
  return (
    <button onClick={onToggle}>
      Toggle
    </button>
  );
}
```

```jsx {hide|*}
function App() {
  const handleToggle = () => {
    console.log('Toggle button clicked!')
  }

  return <ToggleSwitch onToggle={handleToggle} />
}
```

</div>

<v-clicks>

- `ToggleSwitch` is a custom component.
- The prop `onToggle` is a custom [event handler]{.text-teal-400.italic} prop that is not tied to a specific browser event. Instead, it is a named function prop that triggers when the button is clicked.
- `handleToggle` is passed as the `onToggle` prop to `ToggleSwitch`.
- When the button inside `ToggleSwitch` is clicked, it triggers `handleToggle`, logging "Toggle button clicked!" to the console.

</v-clicks>

---
hideInToc: true
transition: slide-up
---

# [Naming Event Handler Props]{.text-gradient}

When passing [event handlers]{.text-teal-400.italic} as props, it’s best to follow a consistent naming convention:

- Use names that make it clear what action will be triggered, like `onButtonClick`, `onSubmit`, or `onToggle`.

<div v-click>

- For custom components, use `on` followed by a descriptive event name passed as props:

```jsx
<MyCustomComponent onAction={() => console.log('Action triggered')} />
```

This follows the same convention as built-in DOM events like `onClick` and `onChange`.

</div>

---
hideInToc: true
transition: fade
---

# [Propagation]{.text-gradient}

Event propagation refers to how events travel through the DOM tree, involving two phases: capturing and bubbling.

- <u>Event Bubbling:</u> An event starts from the target element and propagates upward to its parent elements. This is the default in React.

```jsx {monaco} {lineNumbers: 'true', height: '20rem' }
function Parent() {
  const handleParentClick = () => {
    console.log('Parent clicked')
  }

  return (
    <div onClick={handleParentClick}>
      <Child />
    </div>
  )
}

function Child() {
  const handleChildClick = (event) => {
    event.stopPropagation() // Prevents the event from reaching the parent
    console.log('Child clicked')
  }

  return <button onClick={handleChildClick}>Click Child</button>
}
```

---
hideInToc: true
transition: fade-out
---

- <u>Event Capturing:</u> You can use capture to handle the event during the capture phase before it reaches the target.

```jsx
<div onClickCapture={handleClick}>
  // This will capture the event before it reaches its target.
</div>
```

<v-click>

- <u>Stopping Propagation:</u> Use `event.stopPropagation()` if you want to prevent the event from bubbling up to parent elements. However, use this sparingly as it can cause unexpected behavior in some cases.

</v-click>
