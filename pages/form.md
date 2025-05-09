---
layout: center
transition: slide-up
hideInToc: true
---

# Form

<div mt-2 />

- <a @click="$slidev.nav.next()">Introduction</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Handling Form Inputs - Data Binding</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Form Controls</a>
- <a @click="$slidev.nav.go($nav.currentPage+9)">Form Validation </a>
- <a @click="$slidev.nav.go($nav.currentPage+11)">React Hook Form</a>
- <a @click="$slidev.nav.go($nav.currentPage+13)">Tanstack Form</a>
- <a @click="$slidev.nav.go($nav.currentPage+12)">New Form Features and Updates in React 19</a>

---
hideInToc: true
---

# [Introduction]{.text-gradient.text-4xl}

Why are forms so 📝 important ?

<div  v-click class="flex gap-2">

<div>
Forms allow users to input and submit information. They enable users to perform essential tasks such as sharing data, completing actions, and providing feedback. Without forms, core functionalities on the web like logging in or signing up won't be possible. Forms are what <span class="text-teal-400">facilitates user interaction with the page </span>, enabling dynamic experiences.

The form 👉 here will submit then the page will refresh, but this is not what we want to happen. We want to prevent this default behavior and let `React control the form and its data`. Handling forms is about how you handle the data when it changes value or gets submitted.

How can I collect user input and handle it effectively in React👇?

</div>

```jsx
import React, { useState } from 'react'

function App() {
  const [name, setName] = useState('')

  const handleFormSubmit = () => {
    console.log('Submitted Name:', name)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
```

</div>

---
hideInToc: true
transition: slide-up
name: Handling Form Inputs
---

[Handling Form Inputs - Data Binding]{.text-gradient.text-4xl}

When users interact with form elements (like inputs), it may trigger changes in the data and UI. This interaction is managed through data binding — how UI element reacts when the `data changes` and vice versa.

There are two types of data binding in React:

- <span class="text-teal-400">One-way data binding</span>: Data flows in a single direction, such as from a parent component to a child via props or from the component&apos;s state to the UI. React favors one-way binding by default because it keeps components predictable and easy to debug.
- <span class="text-teal-400">Two-way data binding</span>: Data flows both ways between UI elements (like inputs) and the component&apos;s state. When the user interacts with a form element, it updates the state, and changes in the state trigger re-renders of the UI. This is typically achieved using controlled components (e.g., input, textarea, select).

By default, `React supports one-way data binding`, where data flows in one direction—from the component&apos;s state to the UI. In this setup, changes to the data update the UI, but changes made directly in the UI (like typing in an input field) will not update the state unless explicitly managed.

---
hideInToc: true
transition: slide-left
name: One-Way Data Binding
---

```jsx
import React from 'react'

function App() {
  const inputValue = 'Hello'

  return (
    <div>
      <input type="text" value={inputValue} />
      <p>Value: {inputValue}</p>
    </div>
  )
}

export default App
```

<div>

In this example above, if you try changing the value "Hello" directly in the input field, it won&apos;t update because React only supports one-way data binding by default.

However, React allows two-way data binding using `controlled components`. This is especially useful for managing form elements like <span class="text-teal-400">input</span>, <span class="text-teal-400">textarea</span>, and <span class="text-teal-400">select</span>, where the values are synchronized with the component&apos;s state. Controlled components ensure the `UI and state stay in sync` making it easier to handle user input and dynamic form behavior.

</div>

<!--
</div>
-->

---
hideInToc: true
transition: slide-down
---

# Uncontrolled Components: One-Way Data Binding

In uncontrolled components, form values are managed directly by the DOM, and React accesses the values through refs. This approach suits simple forms where performance and minimal re-renders matter.

```jsx
import React, { useRef } from 'react'

function App() {
  const inputRef = useRef(null)

  const handleSubmit = () => {
    alert(`Input Value: ${inputRef.current.value}`)
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
export default App
```

The `inputRef` allows access to the input field directly in the DOM. Clicking the 'Submit' button retrieves the current value without React managing every input change.

---
hideInToc: true
transition: slide-up
---

# Controlled Components: Two-Way Data Binding

In controlled components, form input values are linked to state, ensuring the input and state are always in sync.

```jsx
import React, { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('Hello')

  const handleChange = (event) => setInputValue(event.target.value)

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Value: {inputValue}</p>
    </div>
  )
}
export default App
```

The `inputValue` state stores the input field&apos;s value. The onChange event updates the state with every input change, ensuring two-way synchronization.

---
hideInToc: true
transition: slide-up
name: Form Controls
---

[Form Controls]{.text-gradient.text-4xl}

Form controls refer to input elements like text fields, checkboxes, radio buttons, and dropdowns. Here&apos;s how to handle different controls in React.

<div  class="grid grid-cols-2 gap-4">
<div v-click>
✔ Text Input

```jsx
import React, { useState } from 'react'

function TextInput() {
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value)
    console.log('My name is:', e.target.value)
  }

  return (
    <input type="text" value={name} onChange={handleChange} placeholder="Enter your name" />
  )
}

export default TextInput
```

</div>

<div v-click>
✔ Checkbox

```jsx
import React, { useState } from 'react'

function CheckboxInput() {
  const [isChecked, setIsChecked] = useState(false)
  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    console.log('Accepted terms and conditions?:', e.target.checked)
  }
  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      Accept Terms & Conditions
    </label>
  )
}

export default CheckboxInput
```

</div>

</div>

---
hideInToc: true
transition: slide-up
name: Form Controls(Radio)
---

<div class="w-200">
✔  Radio Buttons

```jsx
import React, { useState } from 'react'

function RadioButton() {
  const [gender, setGender] = useState('')
  const handleChange = (e) => {
    setGender(e.target.value)
    console.log('Radio Button:', e.target.value)
  }

  return (
      <label>
        <input type="radio" value="male" checked={gender === "male"} onChange={handleChange} /> Male
      </label>
      <label>
        <input type="radio" value="female" checked={gender === "female"} onChange={handleChange} />  Female
      </label>
  )
}

export default RadioButton
```

</div>

---
hideInToc: true
transition: slide-up
name: Form Controls(Select)
---


✔ Select (Dropdown)

```jsx
import React, { useState } from 'react'

function SelectInput() {
  const [fruit, setFruit] = useState('')

  const handleChange = (e) => {
    setFruit(e.target.value)
    console.log('Selected Fruit:', e.target.value)
  }

  return (
    <select value={fruit} onChange={handleChange}>
      <option value="">Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
  )
}

export default SelectInput
```



---
hideInToc: true
transition: slide-up
name: Form Validation
---

[Form Validation]{.text-gradient.text-4xl}

Validation ensures that the input meets specific requirements. It can be done manually or using libraries.

● Manual Validation

<div class="flex gap-4">

```jsx
import React, { useState } from 'react'

function EmailValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const validateEmail = (value) => {
    if (!value) {
      setError('Email is required')
    } else if (value.length < 5) {
      setError('Email must be at least 5 characters long')
    } else {
      setError('')
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setEmail(value)
    validateEmail(value)
  }
```

```jsx
const handleSubmit = (e) => {
  e.preventDefault()
  if (!error) {
    console.log('Email submitted:', email)
  }
}

return (
  <form onSubmit={handleSubmit}>
    <input type="email" value={email} onChange={handleChange} placeholder="Enter your email" />
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button type="submit" disabled={!!error}>
      Submit
    </button>
  </form>
)
}

export default EmailValidation
```

</div>

---
hideInToc: true
transition: slide-down
---

# Validation using libraries - Zod

<div mt-1 />

Zod is a schema validation library that works well with `TypeScript` and `React`. Zod is particularly useful for validating data from forms thereby helping to catch errors early in the development process.

To use Zod in a React application, you'll first need to install it: `npm/pnpm install zod`

<h3 v-click>
Step-by-step example of how to use Zod for validating a user registration form.
</h3>

<div v-click>

<p>
1️⃣ <span class="text-teal-400 underline"> Define a Schema</span>: Create a Zod schema for the data you want to validate.
</p>

<!--prettier-ignore-->
```jsx
import { z } from 'zod'

// Define the schema for the registration form
const registrationSchema = z.object({
  username: z .string() .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z .string() .min(6, { message: 'Password must be at least 6 characters long' }),
})
```

</div>

<p v-click>
2️⃣ <span class="text-teal-400 underline"> Validate Data</span>: Use the schema to validate form data and handle errors appropriately.
</p>

---
hideInToc: true
transition: slide-up
---

# React Hook Form

React Hook Form is a powerful library for managing form state with minimal re-renders and providing better performance for complex forms. It manages form state, handles form submission, and provides basic validation support.

To use React Hook Form in a React application, you'll first need to install it with @hookform/resolvers: `npm/pnpm install react-hook-form @hookform/resolvers`

<v-click>
<h3><span class="text-teal-400">Why add @hookform/resolvers?</span></h3> It is a companion package that connects external schema validation libraries (like Zod) with React Hook Form.
</v-click>

<v-click>

⚠️ Using only Zod, you manually handle input state, errors, and validation for each field, updating state on every change. This can become complex in larger forms as you write custom code to manage the form state, errors, and re-renders. However, React Hook Form centralizes state management for the form. You get optimized re-renders, reduced code for managing state and errors, and a streamlined way to track form fields. It also supports complex forms with nested fields and conditional validation out of the box.

The same Registration form using React-Hook-Form and Zod is on the next page ➠
</v-click>

---
hideInToc: true
layout: iframe
url: https://codesandbox.io/embed/26sv4h?view=editor+%2B+preview&module=%2Fsrc%2FApp.js%3A3%2C64
name: React Hook Form Example
---


---
hideInToc: true
transition: slide-up
name: Tanstack Form
---

# Tanstack `<Form />`

TanStack Form is the ultimate solution for handling forms in web applications, providing a powerful and flexible approach to form management. Designed with first-class TypeScript support, headless UI components, and a framework-agnostic design, it streamlines form handling and ensures a seamless experience across various front-end frameworks.

To use Tanstack Form in a React application, you'll first need to install it: `npm/pnpm/bun/yarn install @tanstack/react-form`

- A Form Instance is an object that represents an individual form and provides methods and properties for working with the form. 
- A Form Field is a component that represents an individual field within a form. It provides methods and properties for managing the field's state, validation, and submission.
- Each field has its own state, which includes its current value, validation status, error messages, and other metadata. You can access a field's state using the field.state property.

---
hideInToc: true
transition: slide-up
name: Tanstack Form Example
---

<div class="scrollable">

```jsx
import React from 'react';
import { useForm } from '@tanstack/react-form';

export default function App() {
  const form = useForm({
    defaultValues: { firstName: '', lastName: '', },
    onSubmit: async ({ value }) => { // Do something with form data console.log(value); },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }} >
      <div>
        <form.Field name="firstName"
          validators={{
            onChange: ({ value }) => !value ? 'A first name is required' : value.length < 3 ? 'First name must be at least 3 characters' : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return ( value.includes('error') && 'No "error" allowed in first name' );
            },
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>First Name:</label>
                <input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                {!field.state.meta.isValid && ( <em style={{color: red;}} role="alert">{field.state.meta.errors.join(', ')}</em> )}
              </>
            );
          }}
        />
      </div>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]} children={([canSubmit, isSubmitting]) => ( 
          <button type="submit" disabled={!canSubmit}> {isSubmitting ? '...' : 'Submit'} </button> 
        )} 
      />
    </form>
  );
}
```

</div>

<style>
  /* make scrollable */
  .scrollable {
    max-height: 500px;
    overflow-y: auto;
  }
  .scrollable::-webkit-scrollbar {
    width: 8px;
  }
  .scrollable::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  .scrollable::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
</style>

---
hideInToc: true
transition: slide-up
layout: iframe
url: https://stackblitz.com/edit/tanstack-form-ebyuvxlk?ctl=1&embed=1&file=src%2Findex.jsx&hideExplorer=1
name: Tanstack Form Example
---

---
hideInToc: true
transition: slide-left
name: Validation with Standard Schema Libraries
---

# Validation with Standard Schema Libraries

TanStack Form supports validation with standard schema libraries like Zod, Valibot, and Arktype. This allows you to define your validation rules using the library of your choice and integrate them seamlessly into your form handling process.

```jsx
import { z } from 'zod'

const userSchema = z.object({ age: z.number().gte(13, 'You must be 13 to make an account'), })

function App() {
  const form = useForm({
    defaultValues: { age: 0, },
    validators: { onChange: userSchema, },
  })
  return (
    <div>
      <form.Field name="age" children={(field) => { return <>{/* ... */}</> }} />
    </div>
  )
}
```

---
hideInToc: true
transition: slide-down
name: Form Features In React 19
---

[New Form Features and Updates in React 19]{.text-gradient.text-4xl}

React 19 introduces powerful new features to simplify form handling, streamline server interactions, and enhance accessibility in web applications. These updates reflect a focus on <span class="text-teal-400">efficient form processing</span>, enabling developers to manage complex user inputs with less code and more intuitive design patterns.

These features collectively empower developers to build faster, more accessible, and user-friendly applications by making form processing easier and more robust.

<v-clicks>

We&apos;ll explore two of the key form-handling features in React 19:

1️⃣ `Form Actions` — Simplified methods for handling form submissions directly to the server, reducing the need for complex API routes and custom handlers.

2️⃣ `Form Reset and State Management` — Improved control over form reset actions and state updates, allowing developers to manage form data more efficiently.

</v-clicks>

---
hideInToc: true
transition: slide-right
name: Form Actions
---

`1. Form Actions`

In previous React versions, handling form submissions typically involved <span class="text-teal-400">writing functions to process form data within the component</span>. You often had to rely on custom handlers and libraries (like React Hook Form) for complex form logic. Additionally, any server interactions had to be handled through API routes, adding an extra layer of complexity.

<v-click>

Form Actions in React 19 introduce a more streamlined approach. They are a specialized implementation of `Server Actions` (actions in React 19 that allow any component to perform server-side operations directly) that focus specifically on handling form submissions. It allow developers to attach specific actions directly to form submissions <span class="text-teal-400">without needing intermediate API routes or external libraries</span>. This feature integrates form handling with server-side logic seamlessly, enabling simpler, more direct interactions with the server.

It simplify this process by allowing us to <span class="text-teal-400">handle submissions directly on the server side</span>, bypassing the need for an API route. Form actions make it easier to define and customize actions like saving, editing, or deleting data right in the form itself, making the handling of form logic more straightforward and efficient.

See how forms were handled before form actions and how they&apos;re handled using form actions 👉

</v-click>

---
hideInToc: true
transition: slide-up
layout: iframe
url: https://stackblitz.com/edit/vitejs-vite-j9uc3f?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1&hideNavigation=1
name: Form Actions Example
---

---
hideInToc: true
transition: slide-down
name: Form Reset and Management
---

`2. Form Reset and State Management`

React 19 introduced improvements in managing form state and resetting forms, making it easier to <span class="text-teal-400">handle form data consistently and efficiently</span>. Previously, managing form reset behavior required explicit handling of state and additional code. The update make this process more efficient and straightforward by making form resets more predictable and easier to manage, reducing the need for extra code and ensuring a cleaner, more intuitive form experience.

Before React 19, form resetting was done by manually updating each field&apos;s state or setting all state variables back to their initial values. This approach could lead to <span class="text-teal-400">more verbose code and was prone to errors</span>, especially in large forms but in React 19, the entire form state is managed more easily. The approach is particularly useful with Form Actions or any forms that use server-side actions because it resets the form to its original state automatically, <span class="text-teal-400">without needing to define each field individually</span>.

Key Benefits of React 19's Streamlined Form Reset and State Management

1. `Improved Simplicity`: Forms can be reset without manually updating each field's state.
2. `Enhanced Performance`: Reducing the reliance on multiple useState calls minimizes re-renders.
3. `Better Compatibility with Server Actions`: When using server actions for form submissions, form data is automatically managed and reset, keeping forms clean and ready for subsequent submissions.

---
hideInToc: true
layout: iframe
url: https://codesandbox.io/embed/ypmc3c?view=editor+%2B+preview&module=%2Fsrc%2Fcomponents%2Fform.js%3A39%2C5-39%2C8
name: Form Reset and Management Example
---

---
hideInToc: true
transition: slide-up
name: Assignment(Form)
---

<h1 class="text-gradient">Assignment</h1>

<div />

Read more on <span class="text-teal-400 underline"><a href="https://zod.dev/">Zod</a></span> and <span class="text-teal-400 underline"> <a href="https://tanstack.com/form/latest">@tanstack/react-form</a></span>

Create a form using `@tanstack/react-form` that includes fields for name, age, and email. Utilize Zod to define a validation schema that ensures the <span class="text-teal-400 underline">name is a non-empty string</span>, the <span class="text-teal-400 underline">age is a positive integer</span>, and the <span class="text-teal-400 underline">email matches a valid email</span> format. Implement the form such that when the user submits it, any validation errors are displayed beneath the corresponding input fields, guiding the user to correct their entries. Use the useForm hook from React Hook Form to manage form state and error handling, and integrate `Zod's zodResolver` to link the validation schema with the form. Ensure that the form is `styled for clarity and usability`, enhancing the user experience during input validation.
