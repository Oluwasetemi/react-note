---
layout: center
transition: slide-up
hideInToc: true
---

# Components in React

<div mt-2 />

- <a @click="$slidev.nav.next()">What are components?</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Your first component</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Single root element</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Exporting, Importing, and Nesting Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Parent and Child component</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Props: Passing and Reading Data Between Components</a>

---
hideInToc: true
transition: slide-down
clicksStart: 2
name: What are components?
---

<v-clicks depth="2">

# [What are components❓❓❓❓❓]{.text-gradient.text-4xl}

Think of a house.

<div class="flex gap-3 text-justify">
<div class="w-160">
  <img src="/images/house.jpg" alt="My Image"  />
</div>
<div>
<p v-click="+4">A house is made up of reusable elements: <span class="text-teal-400">doors</span>, <span class="text-teal-400">windows</span>, <span class="text-teal-400">rooms</span>, <span class="text-teal-400">furniture</span>, <span class="text-teal-400">lights</span>, and more. You can change one element (like the lights) without affecting others. These are the components of a house. Similarly, React components allow you to divide your UI into logical, reusable parts.</p>

<p v-click="+5">To build the house, you break it down into smaller, manageable parts, just as <span class="text-teal-400">React breaks a user interface into components</span>. Each part has a specific role, and all these parts work together to form a functional, maintainable whole. </p>

</div>

</div>
</v-clicks>

<p v-click="6">COMPONENTS ARE THE FOUNDATION UPON WHICH USER INTERFACES (UI) ARE BUILT.</p>

<div class="flex gap-3 text-justify mt-6">
<div v-click="8">

In React, a website can be broken into smaller components like a <span class="text-teal-400">header</span>, <span class="text-teal-400">sidebar</span>, <span class="text-teal-400">footer</span>, <span class="text-teal-400">main content</span>, and <span class="text-teal-400">buttons</span>. Each component combines its own markup, CSS, and JavaScript, making it unique, reusable, and easy to manage. Together, these components form <span class="text-teal-400">the building blocks</span> of a complete application.

</div>
<div v-click="7" class="w-140">
  <img src="/images/reactcomponent.jpeg" alt="My Image" />
</div>
</div>

---
hideInToc: true
transition: slide-up
name: Your first component
clicksStart: 6
---

<h1><span>Your</span> <span class="text-gradient text-5xl">First ❶ </span> <span>Component</span></h1>

EVERY REACT COMPONENT IS A FUNCTION.

<p> Let&apos;s create a simple functional component that displays a <span class="border ">welcome message. </span></p>

<div>

````md magic-move {at: 7,lines: true}
```jsx
// define the component function
function Greeting() {}
```

```jsx
// write return with parenthesis
function Greeting() {
  return (

  )
}
```

```jsx
// add JSX markup
function Greeting() {
  return <p>You are welcome here.</p>
}
```

```jsx
// export the component
export default function Greeting() {
  return <p>You are welcome here.</p>
}
```
````

</div>

<div>
  <p> 1. <span class="underline text-xl">Define the component function:</span> React components are <span class="text-teal-400">regular JavaScript functions</span>, but their names must start with a capital letter or they won&apos;t work!</p>
  <p> 2. <span class="underline text-xl">Write return with parenthensis:</span> Always wrap your JSX markup in parentheses after the return statement. <span class="text-teal-400">Without parentheses</span>, any code on the lines after return will be ignored! </p>
  <p> 3.  <span class="underline text-xl">Add JSX markup:</span> Markup is your code structure. Inside the component, <span class="text-teal-400">write your JSX</span>, which looks like HTML but works under the hood as JavaScript.</p>
  <p> 4.  <span class="underline text-xl">Export the component:</span> The <span class="text-teal-400">export default prefix</span> is a standard JavaScript syntax (not specific to React). It lets you mark the main function in a file so that you can later import it from other files.</p>
</div>

---
hideInToc: true
transition: slide-right
name: More on your first component
---

# Did you notice that the greeting returned on the previous page 🔙 was not wrapped in parentheses?

Return statements can be written all on one line, as in this component:

```jsx
function Greeting() {
  return <p>You are welcome here.</p>
}
```

But if your markup isn&apos;t all on the same line as the return keyword, you must wrap it in a pair of parentheses:

```jsx
function Greeting() {
  return (
    <div>
      <p>You are welcome here.</p>
    </div>
  )
}
```

---
hideInToc: true
transition: slide-up
name: Single root element
---

<h1  class="text-gradient text-4xl">Single Root Element</h1>

<p>In React, a component can only return <span class="text-gradient text-3xl"> ❶ </span> root element.</p>

<p v-click>You cannot return multiple elements (like two divs tags) at the root level. However, you can nest elements within a single root element, such as wrapping them in a parent element or using <span class="text-teal-400">React Fragments </span>. For example:</p>

<div v-click class="flex gap-3 ">
<div>
This is valid ✔

```jsx
function Greeting() {
  return (
    <div>
      <p>Hello, Altschooler.</p>
      <p>You are welcome here.</p>
    </div>
  )
}
```

</div>
<div>
This is not valid ❌

```jsx
function Greeting() {
  return (
    <p>Hello, Altschoolers.</p>
    <p>You are welcome here.</p>
    <input placeholder="Your name"/>
    <button>Submit</button>
  );
}
```

</div>

<div>
This is valid ✔ (using Fragment)

```jsx
function Greeting() {
  return (
    <>
      <p>Hello, Altschooler.</p>
      <p>You are welcome here.</p>
      <button>Click Me</button>
    </>
  )
}
```

</div>
</div>

<p v-click>This is how you create a component, no matter how big or small it is. Now that you can create components, how do you use them? ╰┈➤</p>

---
hideInToc: true
transition: slide-down
name: Exporting, Importing, and Nesting Components
---

<h1  class="text-gradient text-4xl">Exporting, Importing, and Nesting Components </h1>

<p >Components are powerful because they are reusable. The components created are exported so they can be used (imported) into other files. </p>

Below, the `Greeting` component created is imported into the root App component in React.

<div flex="~ row wrap" gap-2>

```jsx
export default function Greeting() {
  return (
    <div>
      <p>Hello, Altschoolers.</p>
      <p>You are welcome here.</p>
    </div>
  )
}
```

```jsx
import Greeting from './Greeting'

function App() {
  return (
    <div>
      <Greeting />
    </div>
  )
}
```

```jsx
export function Greeting() {
  return (
    <div>
      <p>Hello, Altschoolers.</p>
      <p>You are welcome here.</p>
    </div>
  )
}
```

```jsx
import { Greeting } from './Greeting'
function App() {
  return (
    <div>
      <Greeting />
    </div>
  )
}
```

```jsx
import { Greeting as RenamedGreeting } from './Greeting'
function App() {
  return (
    <div>
      <RenamedGreeting />
    </div>
  )
}
```

</div>

---
hideInToc: true
transition: slide-left
---

# Guide for importing components

<div>
  <p v-click > 1. <span class="underline text-xl">Use the Correct Path:</span> Ensure you provide the <span class="text-teal-400">correct relative path</span> to the component file you want to import.  For example, import Greeting from './Greeting'; if Greeting.jsx is in the same directory or '../Greeting'; if the Greeting.jsx is one level deeper.</p>
  <p v-click> 2. <span class="underline text-xl">Case Sensitivity: </span> Component names are case-sensitive. The imported name must match the exported name exactly. For example, import  <span class="text-teal-400">Greeting</span> from  <span class="text-teal-400">'./greeting'</span>; will fail.</p>
  <div v-click>

  <p> 3.  <span class="underline text-xl">Export Types:</span> For default exports, import <span class="text-teal-400">without curly braces</span>. For named exports, import <span class="text-teal-400">with curly braces</span>.</p>

```jsx
// importing default exports
import Greeting from './Greeting'
```

```jsx
// importing named exports
import { Greeting } from './Greeting'
```

  </div>

  <p v-click> 4.  <span class="underline text-xl">File Extensions:</span>  Use the <span class="text-teal-400">appropriate file extension</span>. You can omit the .js or .jsx extension when importing, but including it can sometimes improve clarity.</p>
</div>

---
hideInToc: true
transition: slide-up
name: Parent and Child component
---

# `Nesting Components`

A nested component involves placing one component inside another to efficiently structure your UI. In the example below, we use three components: **Header**, **Content**, and **Footer**. These components are nested within the `App` component to create a well-organized layout:

```jsx
// File: App.jsx
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
```

This enhances reusability across different parts of the app or projects, improves maintainability with an organized layout, and promotes cleaner code by breaking the UI into smaller, manageable pieces.

---
hideInToc: true
clicksStart: 1
---

<div v-click>
<h1>Parent<span class="text-gradient text-5xl"> & </span> Child Component</h1>

#### In React, components often have a <span class="text-teal-400">parent-child relationship</span>, where the **parent** component contains other components as its **children**. This relationship allows for **data** to flow between components, enabling a <span class="text-teal-400">structured</span>, <span class="text-teal-400">reusable</span>, and <span class="text-teal-400">maintainable</span> UI.

</div>

<br/>

<div v-click>

## **Think of that House 🏠 again**

A room (parent) may contain **furniture** (children) like a 🛏️ bed, 🪑 chair, or 💡 lamp. Each furniture item (child) serves its specific role, but the room (parent) coordinates their placement and usage.

</div>

<p v-click>Similarly, in React, a <u class="text-teal-400">parent component collaborates with its children to build a cohesive application</u>. The previously discussed nested components 🔙 are the children of the App (parent) component.</p>

<p v-click> A parent component renders one or more child components within it. It can pass data and functions to its children. </p>

<p v-click> A child component is nested within a parent component. It can receive data from the parent to render its UI or perform actions. </p>

---
hideInToc: true
transition: slide-down
---

<h1 class="text-gradient text-4xl">Props <span class="text-common">📨</span>: Passing and Reading Data Between Components</h1>

#### Props (short for properties) allow parent components to pass data to their child components, just like <u>arguments in functions</u> and <u>attributes in html</u>. <span class="text-teal-400">You can pass any JavaScript value as a prop</span> (objects, arrays, functions, etc.). Below, child component `Welcome` is receiving name props from parent component `App`

<v-click>

```jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  )
}

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}

// Output:
// Hello, Alice! // Hello, Bob!
```

</v-click>

---
hideInToc: true
transition: slide-left
---

# How to Use `Props`

<div class="flex gap-4">
<div v-click >
 1️⃣ Pass Props to Components: Add them like HTML attributes.

```jsx
function Profile() {
  return (
    <div>
      <Avatar name="Ojo Setemi" id="1bX5QH6" />
    </div>
  )
}
```

</div>

<div v-click>
2️⃣ Destructure Props: Extract props in the function parameters. Optionally assign default values.

```jsx
function Avatar({ name, id, size = 100 }) {
  return (
    <img
      src={`https://i.imgur.com/${person.id}.jpg`}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
```

</div>
</div>

<div v-click>
Forwarding Props with Spread Syntax: You can forward all props to child components with ...props

<div class="grid" grid-cols-2 gap-2>

```jsx
function Profile() {
  return (
    <div>
      <Avatar {...props} />
    </div>
  )
}
```

```jsx
function Profile({ name = 'default value' }) {
  return (
    <div>
      <Avatar {...props} />
    </div>
  )
}
```

</div>

</div>

---
hideInToc: true
transition: slide-up
---

# Special Props `children`

The `children` prop is a special prop that allows you to pass components as data to other components. It is used to render whatever you include between the opening and closing tags of the component.

<div grid class="grid-cols-2 gap-2">

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>
}

function App() {
  return (
    <Card>
      <h1>Card Title</h1>
      <p>Card Content</p>
    </Card>
  )
}
```

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function App() {
  return (
    <Card title="Card Title">
      <p>Card Content</p>
    </Card>
  )
}
```

</div>

---
hideInToc: true
transition: slide-down
name: Assignments on Components
---

<h1 class="text-gradient">Assignment</h1>

<div />

Build a simple information display application that consists of a Header component with a title (e.g., "My Favorite Books"), a BookList component to list three of your favorite book titles, and a Book component for each individual book. Each Book component should accept a title prop and display the title as text.

Turn this `li` into a reusability component.

```html
<li className="contact-card">
  <h2>Sunita Kumar</h2>
  <dl>
    <dt>Job</dt>
    <dd>Electrical Engineer</dd>
    <dt>Email</dt>
    <dd>sunita.kumar@acme.co</dd>
  </dl>
</li>
```

---
hideInToc: true
---

# Summary

- Try to read the codebase of React Component Libraries from React Aria, Chakra UI, Material UI.
- Check out [Tanstack](https://tanstack.com/) family of libraries.
