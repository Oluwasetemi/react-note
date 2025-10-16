---
layout: center
transition: slide-up
hideInToc: true
---

# Introduction

<TocIcon />

<div mt-2 />

- <a href="" @click="$slidev.nav.next()">What is a Library/Framework?</a>
- <a href="" @click="$nav.go($nav.currentPage + 0)">What is React?</a>
- <a href="" @click="$nav.go($nav.currentPage + 0)">React vs other frameworks (Vue)</a>
- <a href="" @click="$nav.go($nav.currentPage + 0)">Why React?</a>
- <a href="" @click="$nav.go($nav.currentPage + 0)">From pure javascript to React</a>
- <a href="" @click="$nav.go($nav.currentPage + 0)">Setting up Development Environment (Vite)</a>

---
hideInToc: true
---

# [What is a Library/Framework?]{.text-gradient}

<v-clicks>

<div />

Javascript libraries and frameworks are tools that help developers build applications faster and more efficiently. They provide a set of functionalities that can be reused across different projects, saving time and effort.

**Library** is a collection of pre-written code that developers can call upon to perform specific tasks. Libraries offer various functionalities, but you are in control of how and when to use them. {React} is often considered a library because it focuses on rendering the UI. It doesn't provide everything needed to build an application, but it does provide a way to build user interfaces. {Vue}, {Angular}, and {Svelte} are other examples of libraries. {jQuery} is another example of a library that provides functionalities like DOM manipulation, event handling, and AJAX calls.

**Framework** A framework is a more opinionated structure or skeleton for building applications. It typically provides everything needed (like a routing system, data management, etc.) and controls the flow of the application. Although {Nextjs} uses {React}, it is considered a framework because it provides a predefined structure for building applications, including file-based routing, server-side rendering, and static site generation. {Nuxt} is another example of a framework that uses {Vue}.

</v-clicks>

---
hideInToc: true
---

# [What is React?]{.text-gradient}

**{React}** is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.

{React} allows developers to create reusable UI components and manage the state of the application. {React} uses a declarative approach to build components, which means you describe what you want to see, and {React} takes care of rendering the UI. {React} is used to build single-page applications, progressive web apps, and mobile applications.

Some of the key features of {React} include:

<v-clicks>

- **Components**: {React} allows developers to create reusable UI components that can be used across different parts of the application.

- **Virtual DOM**: {React} uses a virtual DOM to improve performance by updating only the parts of the UI that have changed.

- **JSX**: {React} uses JSX, a syntax extension that allows developers to write HTML-like code in JavaScript.

</v-clicks>

---
hideInToc: true
name: More Features of React
clicksStart: 2
---

<v-clicks>

- **State Management**: {React} provides a way to manage the state of the application using hooks and context API.
- **Lifecycle Methods**: {React} provides lifecycle methods that allow developers to hook into different stages of the component lifecycle.
- **Server-side Rendering**: {React} supports server-side rendering, which improves the performance and SEO of the application.
- **Server Components**: {React} 19 introduces server components, which allow developers to build components that can be rendered on the server and sent to the client. Uses Server Actions to fetch data on the server and send it to the client with heavy support for streaming and partial hydration.

In summary, {React} allows developers to create user interfaces from components, write components with code and markup in JSX, add interactivity with events, state and props. Going further to full-stack capabilities with server components and server actions for better data fetching and rendering. Allowing developers to build fast, interactive, and scalable applications.

</v-clicks>

---
hideInToc: true
clicksStart: 1
---

# [React vs other frameworks (Vue)]{.text-gradient}

{React} and {Vue} are two popular JavaScript libraries for building user interfaces.

Both libraries have their strengths and weaknesses, and the choice between them depends on the requirements of the project and the preferences of the developers. During the course of this workshop, we will be focusing on {React} in the second semester, later on we will explore {Vue} but it is worth noting some of the key differences between {React} and Vue:

<v-clicks>

- **Learning Curve**: {React} has a steeper learning curve compared to Vue because it requires developers to learn JSX, hooks, and other concepts. {Vue}, on the other hand, is easier to learn because it uses a template-based syntax that is similar to HTML even though it has composables and support JSX as well.

- **Performance**: {React} uses a virtual DOM to improve performance by updating only the parts of the UI that have changed. Vue also uses a virtual DOM but has a more optimized reactivity system that can update the UI more efficiently especially with its vapor rendering.

- **State Management**: {React} provides a way to manage the state of the application using `useState` hooks and context API. Vue also provides a way to manage the state of the application using {Pinia}, which is a state management library.

</v-clicks>

---
hideInToc: true
---

# Counter Example in React

```jsx {monaco-run} { lines: true, height: '12.5em', autorun: false}
function Hello() {
  const [counter, setCounter] = React.useState(0)
  const value = 2
  const doubled = counter * value

  return (
    <div className="select-none text-lg flex gap-4 items-center p2 border border-main">
      <span className="text-gray text-lg">
        <span className="text-orange">{counter}</span> * {value} ={' '}
        <span className="text-green">{doubled}</span>
      </span>
      <button
        className="border border-main p2 rounded"
        onClick={() => setCounter(counter + 1)}
      >
        +1
      </button>
      <button
        className="border border-main p2 rounded"
        onClick={() => setCounter(counter - 1)}
      >
        -1
      </button>
    </div>
  )
}
```

---
hideInToc: true
---

# Counter Example in Vue

```vue {monaco-run} { lines: true, height: '12.5em', autorun: false}
<script setup>
import { computed, ref } from 'vue'
const counter = ref(1)
const value = 2
const doubled = computed(() => counter.value * value)
function inc() {
  counter.value++
}
</script>

<template>
  <div
    class="select-none text-lg flex gap-4 items-center p2 border border-main"
  >
    <span class="text-gray text-lg">
      <span class="text-orange">{{ counter }}</span>
      * {{ value }} =
      <span class="text-green">{{ doubled }}</span>
    </span>
    <button class="border border-main p2 rounded" @click="inc">+1</button>
    <button class="border border-main p2 rounded" @click="counter -= 1">
      -1
    </button>
  </div>
</template>
```

---
hideInToc: true
---

# [Why React?]{.text-gradient}

{React} has become one of the most popular JavaScript libraries for building user interfaces. There are several reasons why developers choose {React} over other libraries and frameworks:

<v-clicks>

- **Simple and Less opinionated** : {React} is a lightweight library that focuses on rendering the UI. It doesn't provide everything needed to build an application, but it does provide a way to build user interfaces. This makes it easier to learn and use compared to other libraries and frameworks.

- **Popular** : It has a wide spread adoption and a large community of developers and companies that contribute to its development and maintenance. This means that there are plenty of resources available for learning {React} and getting help when needed. Jobs are also available for {React} developers.

- **Performance** : {React} uses a virtual DOM to improve performance by updating only the parts of the UI that have changed. This makes {React} faster and more efficient than other libraries and frameworks. If its becomes slow then its on you the developer.

- **Flexibility** : {React} is flexible and allows developers to build applications the way they want.

</v-clicks>

---
hideInToc: true
---

# [From pure javascript to React]{.text-gradient}

```js {monaco-run} { lines: true, height: '20.5em', autorun: false}
const makeElem = (elemType, props, children) => {
  const elem = document.createElement(elemType)

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key === 'onclick' && props['once']) {
        elem.addEventListener('click', value, { once: true })
      } else {
        elem[key] = value
      }
    }
  }

  if (children) {
    elem.prepend(...children)
  }

  return elem
}

const createTodo = (todo) => {
  const text = makeElem(
    'span',
    { style: 'flex:1;', ondblclick: () => alert('edit') },
    [todo.text],
  )
  const x = makeElem('button', { onclick: () => alert('remove') }, ['X'])

  const item = makeElem('li', { style: 'display:flex;' }, [text, x])
  return item
}

console.log(createTodo({ text: 'Hello World' }).innerHTML)
```

---
hideInToc: true
---

# [From pure javascript to React]{.text-gradient}

<div class="overflow-y-scroll h-full">

````md magic-move {class: 'pb-20'}
```js
function mk() {
  return 'Hello World'
}
```

```js
function mk(type) {
  // create element of type `type` and set text content to 'Hello World'
  const el = document.createElement(type)
  el.textContent = 'Hello World'
  return el
}
```

```js
function mk(type, props) {
  // create element of type `type` and set text content to 'Hello World'
  const el = document.createElement(type)
  // set properties of the element if `props` is provided, e.g. className, style, etc.
  if (props) Object.assign(el, props)
  el.textContent = 'Hello World'
  return el
}
```

```js
function mk(type, props, children) {
  // create element of type `type`
  const el = document.createElement(type)
  // set properties of the element if `props` is provided, e.g. className, style, etc.
  if (props) Object.assign(el, props)
  // append children to the element if `children` is provided
  if (children) el.prepend(...children)
  return el
}
```

```js
mk('div', { className: 'text-lg' }, [
  mk('span', { className: 'text-orange' }, ['Hello']),
])
// <div class="text-lg"><span class="text-orange">Hello</span></div>
```

```js
mk('div', { className: 'text-lg' }, [
  mk('span', { className: 'text-orange' }, ['Hello']),
  mk('span', { className: 'text-green' }, ['World']),
])
// <div class="text-lg"><span class="text-orange">Hello</span><span class="text-green">World</span></div>
```

```js
mk('input')
// <input>

mk('button', { onClick: () => alert('Hello World') }, ['Add ToDo'])
// <button>Add ToDo</button>

mk('ul', { style: 'padding:5px;' })
// <ul style="padding: 5px;"></ul>
```

```js
// put all todo input & button into a form
mk('form', null, [
  mk('input'),
  mk('button', { onClick: () => alert('Hello World') }, ['Add ToDo']),
])

// <form><input><button>Add ToDo</button></form>
```

```js
// put form and ul into a div#app
mk('div', { id: 'app' }, [
  mk('form', null, [
    mk('input'),
    mk('button', { onClick: createTodo }, ['Add ToDo']),
  ]),
  mk('ul', { style: 'padding:5px;' }),
])

// <div id="app"><form><input><button>Add ToDo</button></form><ul style="padding: 5px;"></ul></div>
```

```js
// extract a separate store for the ui amd state
let ui = {}
let state = { id: 0, todos: [] }

mk('div', { id: 'app' }, [
  mk('form', null, [
    (ui.input = mk('input')),
    (ui.add = mk('button', { onclick: add }, ['Add ToDo'])),
  ]),
  (ui.todos = mk('ul', { style: 'padding:5px;' })),
])
```

```js
function app() {
  let ui = {}
  let state = { id: 0, todos: [] }

  return mk('div', { id: 'app' }, [
    mk('form', null, [
      (ui.input = mk('input')),
      (ui.add = mk('button', { onclick: add }, ['Add ToDo'])),
    ]),
    (ui.todos = mk('ul', { style: 'padding:5px;' })),
  ])
}
```

```js
function render() {
  document.body.append(app())
}

render()
```

```js
function app() {
  ...

  function createTodo(todo) {
    let item, text, x;

    item = mk('li', { style: 'display:flex;' }, [
      (text = mk('span', { style: 'flex:1;', ondblclick: edit }, [todo.text])),
      (x = mk('button', { onclick: remove }, ['X'])),
    ]);
  }

  return item;
}
```

```js
// we need to create a edit, remove and add function
function add(e) {
  e.preventDefault()

  const text = ui.input.value.trim()
  if (!text) return

  ui.input.value = ''
  const todo = { id: state.id++, text, completed: false }

  state.todos.push(todo)
  ui.todos.append(createTodo(todo))
}
```

```js
function remove() {
  state.todos = state.todos.filter((todo) => todo.id !== id)
  item.remove()
}
```

```js
function edit() {
  let editing = mk('input', {
    style: 'flex: 1;',
    value: todo.text,
    onblur: cancel,
    onkeydown,
  })

  text.replaceWith(editing)
  editing.focus()
  x.disabled = true
  x.style = 'pointer-events: none;'
}
```

```js
// we need to create a cancel and onkeydown function
function cancel() {
  x.disabled = editing.replaceWith(text)
}

function onkeydown(e) {
  switch (e.keycode) {
    case 13:
      text.textContent = todo.text = editing.value.trim()
    case 27:
      editing.blur()
  }
}
```

```js
// combined onkeydown, cancel to be in edit function
function edit() {
  function onkeydown(e) {...}
  function cancel() {...}

  let editing = mk('input', { style: 'flex: 1;', value: todo.text, onblur: cancel, onkeydown })

  text.replaceWith(editing)
  editing.focus()
  x.disabled = true
  x.style = 'pointer-events: none;'
}
```

```js
// put remove and edit function into createTodo
function createTodo(todo) {
  let item, text, x;

  item = mk('li', { style: 'display:flex;' }, [
    (text = mk('span', { style: 'flex:1;', ondblclick: edit }, [todo.text])),
    (x = mk('button', { onclick: () => remove(todo.id) }, ['X'])),
  ]);

  function remove(id) {...}

  function edit() {
    function onkeydown(e) {...}
    function cancel() {...}

    let editing = mk('input', { style: 'flex: 1;', value: todo.text, onblur: cancel, onkeydown })
    text.replaceWith(editing)
    editing.focus()
    x.disabled = true
    x.style = 'pointer-events: none;'
  }
  return item;
}
```

```js
// just the ui
const App = () => {
  return React.createElement(
    'div',
    { id: 'app' },
    React.createElement(
      'form',
      { onSubmit: createTodo },
      React.createElement('input'),
      React.createElement('button', { type: 'submit' }, 'Add ToDo'),
    ),
    React.createElement('ul', { style: { padding: '5px' } }),
  )
}
```
````

<Todo v-if="$clicks===11" />

</div>

---
hideInToc: true
transition: fade-in
---

```js {monaco} {lineNumbers: 'true', height: '30rem', overflowY: 'scroll'}
// ui and state
const App = () => {
  const [todos, setTodos] = React.useState([])
  const [id, setId] = React.useState(0)
  const [text, setText] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)
  const [editText, setEditText] = React.useState('')

  return React.createElement(
    'div',
    { id: 'app' },
    React.createElement(
      'form',
      { onSubmit: createTodo },
      React.createElement('input', {
        value: text,
        onChange: (e) => setText(e.target.value),
      }),
      React.createElement('button', { type: 'submit' }, 'Add ToDo'),
    ),
    React.createElement(
      'ul',
      { style: { padding: '5px' } },
      todos.map((todo) =>
        React.createElement(
          'li',
          { style: { display: 'flex' }, key: todo.id },
          editingId === todo.id
            ? React.createElement('input', {
                value: editText,
                onChange: (e) => setEditText(e.target.value),
                onBlur: saveEdit,
                onKeyDown: handleKeyDown,
                autoFocus: true,
              })
            : React.createElement(
                'span',
                {
                  style: { flex: 1 },
                  onDoubleClick: () => startEditing(todo),
                },
                todo.text,
              ),
          React.createElement(
            'button',
            { onClick: () => remove(todo.id) },
            '❌',
          ),
        ),
      ),
    ),
  )
}
```

---
hideInToc: true
transition: fade-in
---

```js {monaco} {lineNumbers: 'true', height: '30rem', overflowY: 'scroll'}
// ui + state + event handlers
const App = () => {
  const [todos, setTodos] = React.useState([])
  const [id, setId] = React.useState(0)
  const [text, setText] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)
  const [editText, setEditText] = React.useState('')

  const createTodo = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTodos([...todos, { id: id, text: text, completed: false }])
    setId(id + 1)
    setText('')
  }

  const remove = (id) => setTodos(todos.filter((todo) => todo.id !== id))

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text + '✅')
  }

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo,
      ),
    )
    setEditingId(null)
    setEditText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') {
      setEditingId(null)
      setEditText('')
    }
  }

  return React.createElement(
    'div',
    { id: 'app' },
    React.createElement(
      'form',
      { onSubmit: createTodo },
      React.createElement('input', {
        value: text,
        onChange: (e) => setText(e.target.value),
      }),
      React.createElement('button', { type: 'submit' }, 'Add ToDo'),
    ),
    React.createElement(
      'ul',
      { style: { padding: '5px' } },
      todos.map((todo) =>
        React.createElement(
          'li',
          { style: { display: 'flex' }, key: todo.id },
          editingId === todo.id
            ? React.createElement('input', {
                value: editText,
                onChange: (e) => setEditText(e.target.value),
                onBlur: saveEdit,
                onKeyDown: handleKeyDown,
                autoFocus: true,
              })
            : React.createElement(
                'span',
                {
                  style: { flex: 1 },
                  onDoubleClick: () => startEditing(todo),
                },
                todo.text,
              ),
          React.createElement(
            'button',
            { onClick: () => remove(todo.id) },
            '❌',
          ),
        ),
      ),
    ),
  )
}
```

---
hideInToc: true
transition: fade-in
---

```js {monaco} {lineNumbers: 'true', height: '30rem', overflowY: 'scroll'}
// ui + state + event handlers + render
const App = () => {
  const [todos, setTodos] = React.useState([])
  const [id, setId] = React.useState(0)
  const [text, setText] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)
  const [editText, setEditText] = React.useState('')

  const createTodo = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTodos([...todos, { id: id, text: text, completed: false }])
    setId(id + 1)
    setText('')
  }

  const remove = (id) => setTodos(todos.filter((todo) => todo.id !== id))

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText + ' ✅' } : todo,
      ),
    )
    setEditingId(null)
    setEditText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') {
      setEditingId(null)
      setEditText('')
    }
  }

  return React.createElement(
    'div',
    { id: 'app' },
    React.createElement(
      'form',
      { onSubmit: createTodo },
      React.createElement('input', {
        value: text,
        onChange: (e) => setText(e.target.value),
      }),
      React.createElement('button', { type: 'submit' }, 'Add ToDo'),
    ),
    React.createElement(
      'ul',
      { style: { padding: '5px' } },
      todos.map((todo) =>
        React.createElement(
          'li',
          { style: { display: 'flex' }, key: todo.id },
          editingId === todo.id
            ? React.createElement('input', {
                value: editText,
                onChange: (e) => setEditText(e.target.value),
                onBlur: saveEdit,
                onKeyDown: handleKeyDown,
                autoFocus: true,
              })
            : React.createElement(
                'span',
                {
                  style: { flex: 1 },
                  onDoubleClick: () => startEditing(todo),
                },
                todo.text,
              ),
          React.createElement(
            'button',
            { onClick: () => remove(todo.id) },
            '❌',
          ),
        ),
      ),
    ),
  )
}

// render with ReactDOM
const root = ReactDOM.createRoot(document.body)
root.render(React.createElement(App))
```

---
hideInToc: true
transition: fade-in
---

<TodoReact />

---
hideInToc: true
layout: iframe-lazy
name: Todo App All With JavaScript
url: https://stackblitz.com/edit/web-platform-zxxs4v?ctl=1&embed=1&file=script.js&hideExplorer=1&hideNavigation=1
autoLoad: true
---

---
hideInToc: true
layout: iframe-lazy
name: Todo App All With React
url: https://stackblitz.com/edit/vitejs-vite-epzrqa?ctl=1&embed=1&file=main.js&hideExplorer=1&hideNavigation=1
autoLoad: true
---

---
hideInToc: true
---

# [Setting up Development Environment Vite]{.text-gradient}

Let us talk about build tools, they are tools that help developers build and deploy applications.

They automate the process of compiling, bundling, and optimizing code. Some popular build tools include {webpack}, {turporepo}, {Parcel}, and Vite({Rolldown}, {Rollup}, {esbuild}, {OXC}), and {Rspack}.

{Vite} is a build tool that is designed to be fast and lightweight. It uses ES modules to improve performance and provides a zero-config setup for building modern web applications. {Vite} supports {React}, {Vue}, and other frameworks and libraries.

To set up a development environment with {Vite}, you can use the following steps:

1. Install {Vite} globally using {npm} or {yarn} or {pnpm} or {bun}:

````md magic-move
```bash
npm install -g create-vite
```

```bash
yarn global add create-vite
```

```bash
pnpm add -g create-vite
```

```bash
bun add -g create-vite
```
````

2. Create a new project using Vite:

```bash
create-vite my-app
cd my-app
```

---
hideInToc: true
name: Production with vite or setting up everything from scratch
---

3. Start the development server and Open your browser and navigate to `http://localhost:5173`.

```bash
npm run dev
```

4. Build the project for production and Deploy the project to a hosting service like {Netlify}, {Vercel}, or {GitHub} Pages.

```sh
npm run build
```

5. You can also customize the build configuration by creating a `vite.config.js` file in the root of the project.

## Setting up everything from scratch

If you prefer to set up everything from scratch, you can use the following steps:

1. Create a new project directory and navigate to it:

```sh
mkdir my-app
cd my-app
```

---
hideInToc: true
name: Setting up everything from scratch 1
---

2. Initialize a new {npm} or {yarn} or {pnpm} or {bun} project:

````md magic-move
```sh
npm init -y
```

```sh
yarn init -y
```

```sh
pnpm init -y
```

```sh
bun init -y
```
````

3. Install {React} and {React} DOM:

```sh
npm install react react-dom
```

4. Create an `index.html` file in the root of the project:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---
hideInToc: true
name: Setting up everything from scratch 2
---

5. Create a `src` directory in the root of the project and create a `main.jsx` file in the `src` directory:

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

// function App() {
//   return <h1>Hello World</h1>;
// }

function App() {
  return React.createElement('h1', null, 'Hello World')
}

const root = createRoot(document.getElementById('app'))

root.render(<App />)
```

---
hideInToc: true
name: Setting up everything from scratch 3
---

6. Install {Vite} as a development dependency and @vitejs/plugin-react

```sh
npm install -D vite @vitejs/plugin-react
```

7. Create a `vite.config.js` file in the root of the project:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

8. Setup the build script in the `package.json` file:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

---
hideInToc: true
name: Setting up everything from scratch 4
---

9. Start the development server and Open your browser and navigate to `http://localhost:5173`.

```sh
npm run dev
```

10. Build the project for production and Deploy the project to a hosting service like {Netlify}, {Vercel}, or {GitHub} Pages.

```sh
npm run build
```

You can use online editors like {Codesandbox}, {Codepen}, or {Stackblitz} to create and share React applications without setting up a development environment on your local machine.
