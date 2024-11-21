---
layout: center
transition: slide-up
hideInToc: true
---

# JSX

<div mt-2 />

- <a @click="$slidev.nav.next()">Ways of writing HTML in a JavaScript file</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">What is JSX? Syntax and Structure</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">The Rules of JSX</a>
- <a @click="$slidev.nav.go($nav.currentPage+8)">Convert HTML to JSX</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Embedding JavaScript in JSX</a>
- <a @click="$slidev.nav.go($nav.currentPage+10)">CSS in JSX</a>

---
hideInToc: true
name: Ways of writing HTML in a JavaScript file
---

[Ways of writing HTML in a JavaScript file]{.text-gradient.text-4xl}

Ever wondered how you can write HTML in a JavaScript file?

<v-clicks>
There are several ways to achieve this which include:

1. <u>Using `Template Literals (``)`:</u> Template literals allow you to embed HTML directly into JavaScript using backticks. They provide an easy way to write multi-line HTML strings.

```js
const content = `
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
  </div>
`

document.body.innerHTML = content
```

<script setup>
const content = `
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
  </div>
`;
</script>

<div v-html="content" ></div>
</v-clicks>

---
hideInToc: true
transition: slide-up
name: Ways of writing HTML in a JavaScript file
---

2. <u>`document.createElement` Method:</u> This method creates HTML elements dynamically using JavaScript.

<div class="flex gap-3">
<v-clicks>
<div>

```ts
const div = document.createElement('div')
div.className = 'container'

const h1 = document.createElement('h1')
h1.textContent = 'Hello, World!'

const p = document.createElement('p')
p.textContent = 'This is a paragraph.'

div.appendChild(h1)
div.appendChild(p)
document.body.appendChild(div)
```

<div>
<script setup>
const content = `
  <div class="container">
    <h1 text-gradient>Hello, World!</h1>
    <p text-gradient>This is a paragraph.</p>
  </div>
`;
</script>

<div v-html="content"></div>
</div>
</div>

```ts
// a function to create html elements
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

window.makeElem = makeElem
```

</v-clicks>
</div>

---
hideInToc: true
transition: slide-down
name: Ways of writing HTML in a JavaScript file
---

3. <u>Using the `innerHTML` Property:</u> You can directly set the `innerHTML` property of a DOM element with a string containing HTML.

```js {*|2-4|2|*}
const container = document.getElementById('app')
container.innerHTML = `
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
`
```

<div v-click>
4. <u>String Concatenation:</u> You can use traditional string concatenation to build HTML strings.
</div>
```js {hide|*|3-7|4|5|6|*}{at:4}
const title = 'Hello, World!'
const paragraph = 'This is a paragraph.'
const content =
  '<div class="container">' +
  `<h1>${title}</h1>` +
  `<p>${paragraph}</p>` +
  '</div>'
document.body.innerHTML = content
```

---
hideInToc: true
transition: fade-out
---

# 5. JSX ([JavaScript XML]{.text-gradient}) in React

What is JSX?

JSX is a syntax extension for JavaScript used in React. It allows you to write HTML-like syntax directly within JavaScript. Most React developers prefer the conciseness of JSX, and most codebases use it.

<span text-gradient v-click>
Note:
</span>

<v-clicks>

- JSX is not the only way to write HTML in React as seen in previous pages, but JSX makes it easier to write React applications
- JSX converts HTML tags into react elements.
- JSX is an extension used in React, this means that it is not part of react. It is a separate syntactic tool to help React developers create React elements easily
- JSX is a type of expression in JS, not a statement.
- JSX allows you to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.

</v-clicks>

---
hideInToc: true
transition: fade
name: Syntax and Structure of JSX
---

[Syntax and Structure of JSX]{.text-gradient.text-4xl}

The syntax of JSX elements looks very much alike with that of HTML elements.

For example, if you want to create a `h1` and a `div` using JSX, they will look the same as with normal HTML:

```jsx
<h1>Hello AltSchoolers 👋, This is a JSX heading and I love it!</h1>

<div>Alright, important question. How about centering a div in JSX? 🤔</div>
```

<div flex flex-col gap-3 mt-3 v-click>

```jsx
// With JSX
const myElement = <h1>You know, I Love JSX!</h1>

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(myElement)
```

```js
// Without JSX
const myElement = React.createElement('h1', {}, 'He said he does not use JSX!')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(myElement)
```

</div>

---
hideInToc: true
transition: slide-down
name: Rules of JSX
---

[The]{.text-4xl} [Rules]{.text-gradient.text-4xl} [of]{.text-4xl} [JSX]{.text-gradient.text-4xl}

There are few rules that guides writing JSX. They include:

1. <u>Return a single root element:</u> This is simply saying you should always wrap a group of JSX elements with a single root.

```jsx {*|2|6|*}
// the `<div></div>` is the parent (root element)
<div>
  <h1>I am the first Element in the group!</h1>
  <p>Well I am the second, but I have details more than you do!</p>
  <img src="imageUrl" alt="I am the bigger picture guys.">
</div>
```

If you don’t want to add an extra `<div>` to your markup, you can use `<>` and `</>` instead:

```jsx {*|2|6|*}
// the `<></>` is the parent (root element) called Fragment
<>
  <h1>Our parent Element don't even have a public name</h1>
  <p>Well, everyone knows the name is <b>Fragment</b>!</p>
  <img src="imageUrl" alt="<p> my paddy is always right">
</>
```

---
hideInToc: true
level: 2
transition: view-transition
name: Rules of JSX
---

2. <u>Close all the tags:</u> In JSX, every tag should be explicitly closed. This means that all tags, including self-closing tags like `<img>`, `<link>`, and `<meta>`, should be explicitly closed with the forward-slash (/): `<img />`, `<link />`, and `<meta />`. JSX follows XML rules, and therefore HTML elements must be properly closed. JSX will throw an error if the HTML is not properly closed.

```jsx {hide|3|4|5|6|*}
// Closing tags properly
<>
  <h1>Making sure all tags are explicitly closed</h1>
  <p>I have got some good news!</p>
  <img src="imageUrl" alt="Thank you for closing me properly in JSX" />
  <input type="text" />
</>
```

---
hideInToc: true
name: Rules of JSX
---

3. <u>Use camelCase for most of the things!:</u> JSX converts to JavaScript, and attributes written in JSX become keys of JavaScript objects. As we know, JavaScript has limitations on variable names, hence using camelCase is recommended. For example, their names can’t contain dashes or be reserved words like `class`. Since `class` is a reserved word, in React you write `className` instead.

```jsx {hide|3|4|*}
// using camelCase in JSX
<>
  <img
    className="mr-image"
    src="imageUrl"
    alt="My class in jsx is written as className"
  />
  <input type="text" className="input-lady" />
</>
```

---
hideInToc: true
transition: fade-out
name: Convert HTML to JSX
---

[Convert]{.text-3xl} [HTML]{.text-gradient.text-4xl} [to]{.text-3xl} [JSX]{.text-gradient.text-4xl}

Recall that we stated that `JSX` syntaxes are very similar to that of `HTML`, but being 'very similar' means there are distinctive differences, for example the `class` attribute in HTML is written as `className` in JSX. For this reason, there is need to convert HTML to JSX when migrating from a pure HTML file.

Here are some HTML to JSX conversion tools:

<v-clicks>

- [transform.tools/html-to-jsx](https://transform.tools/html-to-jsx)
- [convertsimple.com/convert-html-to-jsx](https://www.convertsimple.com/convert-html-to-jsx/)
- [Chrome extention: html-to-jsx](https://chromewebstore.google.com/detail/html-to-jsx/gdafcihicjmhjjjkldfdccfbajneiake?hl=en)

</v-clicks>

<v-click>
<iframe
  width="100%"
  height="400"
  src="https://transform.tools/html-to-jsx"
>
</iframe>
</v-click>

---
hideInToc: true
transition: slide-up
name: Embedding JavaScript in JSX
---

[Embedding JavaScript in JSX]{.text-gradient.text-4xl}

There are times you will want to add a little JavaScript logic or reference a dynamic property inside a JSX markup. To achieve this, you simply have to add curly braces (`{}`) which will open up a javascript land/window and allow you to embed a JavaScript logic or reference a dynamic content.

<div v-click>

```jsx {monaco-run} { lineNumbers: 'true', height: '11rem' }
function EmbedJavascript() {
  const myHeadingContent =
    'I expect this text content to be embedded to a JSX h1 element!'
  const avatar = '/altschool-logo.png'
  const description = 'AltSchool Africa logo'

  return (
    <div className="select-none flex flex-col items-center p2 border border-main">
      <h1 className="text-gradient !text-xl text-center">{myHeadingContent}</h1>
      <div className="flex gap-4 items-center">
        <img className="avatar w-30" src={avatar} alt={description} />
        <span className="border border-green rounded p-1">{2000 + 24}</span>
      </div>
    </div>
  )
}
```

</div>

---
hideInToc: true
transition: fade
name: CSS in JSX
---

[CSS]{.text-gradient.text-4xl} [in]{.text-4xl} [JSX]{.text-gradient.text-4xl}

Just like HTML, you can style JSX with inline-styles, external-style, .module.css, and/or any CSS framework/library.

1. Inline CSS: Inline styles in JSX are written as objects with camelCase properties instead of traditional CSS syntax. See inline styles as adding an object to the 'javascript land' of `className` attribute. This means that we would need double curly braces (`{{}}`); one for embedding javascript, the second for applying an object containing styles.

<div flex h-50 gap-3 v-click>

```jsx {monaco-run} { lineNumbers: 'true', height: '11rem' }
function App() {
  const divStyle = {
    backgroundColor: 'blue', // Use camelCase for properties
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
  }

  return (
    <div style={divStyle}>
      <h1>Hello, World!</h1>
      <p>This is a styled paragraph.</p>
    </div>
  )
}
```

```jsx {*}{lines: true}
function App() {
  return (
    <div
      style={{
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '5px',
      }}
    >
      <h1>Hello, World!</h1>
      <p>This is a styled paragraph.</p>
    </div>
  )
}
```

</div>

---
hideInToc: true
transition: slide-down
name: CSS in JSX
---

2. CSS Classes: To apply styles from an external style sheet or a .module.css, you simply need to reference the JSX element you want to style by it's `className`, `id`, or other attributes

<div flex justify-evenly gap-2>

````md magic-move {at: 1,lines: true}
```css
// from style.css file
.text-blue {
  color: blue;
  font-size: 1rem;
}
```

```jsx
import ./style.css;

function StyleJSX() {
  return (
    <h2 className="text-blue">Hello World!</h2>
  );
}
```
````

````md magic-move {at: 1,lines: true}
```css
// from style.module.css file
.title {
  font-size: 24px;
  font-weight: bold;
}
```

```jsx
import ./style.module.css;

function StyleJSX() {
  return (
    <h2 className={style.title}>Hello World!</h2>
  );
}
```
````

</div>

<v-click at="+2">
<div>

3. Using CSS frameworks like TailwindCSS or UnoCSS: In this method, you simply write your styles in the `className` quote according to guidelines.

```jsx
function App() {
  return (
    <div className="bg-blue-500 text-white p-4 rounded">
      <p className="text-base">This is a paragraph with Tailwind CSS.</p>
    </div>
  )
}
```

</div>
</v-click>

<div v-click>
4. Using styled component: Styled components can also be used to style JSX. You simply have to import the component either from a library or your own styled components folder.
</div>

---
hideInToc: true
transition: slide-down
---

# Assignment on JSX

<br>

Using HTML to JSX Converter, transform a HTML file you already have to JSX.
