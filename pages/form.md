---
layout: center
transition: slide-up
hideInToc: true
---

# Form

<div mt-2 />

- Introduction
- Handling Form Inputs - Data Binding
- Form Controls
- Form Validation
- React Hook Form

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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
---

[Handling Form Inputs - Data Binding]{.text-gradient.text-4xl}

When users interact with form elements (like inputs), it may trigger changes in the data and UI. This interaction is managed through data binding — how UI element reacts when the `data changes` and vice versa.

There are two types of data binding in React:

- <span class="text-teal-400">One-way data binding</span>: Data flows in a single direction, such as from a parent component to a child via props or from the component's state to the UI. React favors one-way binding by default because it keeps components predictable and easy to debug.
- <span class="text-teal-400">Two-way data binding</span>: Data flows both ways between UI elements (like inputs) and the component’s state. When the user interacts with a form element, it updates the state, and changes in the state trigger re-renders of the UI. This is typically achieved using controlled components (e.g., input, textarea, select).

By default, `React supports one-way data binding`, where data flows in one direction—from the component’s state to the UI. In this setup, changes to the data update the UI, but changes made directly in the UI (like typing in an input field) will not update the state unless explicitly managed.

---
hideInToc: true
transition: slide-left
---

<!-- <div class="flex gap-2"> -->

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

In this example above, if you try changing the value "Hello" directly in the input field, it won’t update because React only supports one-way data binding by default.

However, React allows two-way data binding using `controlled components`. This is especially useful for managing form elements like <span class="text-teal-400">input</span>, <span class="text-teal-400">textarea</span>, and <span class="text-teal-400">select</span>, where the values are synchronized with the component’s state. Controlled components ensure the `UI and state stay in sync` making it easier to handle user input and dynamic form behavior.

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

The `inputValue` state stores the input field’s value. The onChange event updates the state with every input change, ensuring two-way synchronization.

---
hideInToc: true
---

[Form Controls]{.text-gradient.text-4xl}

Form controls refer to input elements like text fields, checkboxes, radio buttons, and dropdowns. Here’s how to handle different controls in React.

<div  class="flex gap-3">
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
    <input
      type="text"
      value={name}
      onChange={handleChange}
      placeholder="Enter your name"
    />
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
---

<div class="flex gap-2 wrap">
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
        <input
          type="radio"
          value="male"
          checked={gender === "male"}
          onChange={handleChange}
        /> Male
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={handleChange}
        />  Female
      </label>
  )
}

export default RadioButton
```

</div>

<div  v-click>
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

</div>

</div>

---
hideInToc: true
transition: slide-up
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
    <input
      type="email"
      value={email}
      onChange={handleChange}
      placeholder="Enter your email"
    />
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

Zod is a schema validation library that works well with `TypeScript` and `React`. Zod is particularly useful for validating data from forms threby helping to catch errors early in the development process.

To use Zod in a React application, you'll first need to install it: `npm/pnpm install zod`

<h3 v-click>
Step-by-step example of how to use Zod for validating a user registration form.
</h3>

<div v-click>

<p>
1️⃣ <span class="text-teal-400 underline"> Define a Schema</span>: Create a Zod schema for the data you want to validate.
</p>

```jsx
import { z } from 'zod'

// Define the schema for the registration form
const registrationSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
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

React Hook Form is a powerful library for managing form state with minimal re-renders and providing better performance for complex forms.

To use React Hook Form in a React application, you'll first need to install it: `npm/pnpm install react-hook-form`

---
hideInToc: true
transition: slide-up
---

<h1 class="text-gradient">Assignment</h1>

<div />

Create a form using `React Hook Form` that includes fields for name, age, and email. Utilize Zod to define a validation schema that ensures the <span class="text-teal-400 underline">name is a non-empty string</span>, the <span class="text-teal-400 underline">age is a positive integer</span>, and the <span class="text-teal-400 underline">email matches a valid email</span> format. Implement the form such that when the user submits it, any validation errors are displayed beneath the corresponding input fields, guiding the user to correct their entries. Use the useForm hook from React Hook Form to manage form state and error handling, and integrate `Zod's zodResolver` to link the validation schema with the form. Ensure that the form is `styled for clarity and usability`, enhancing the user experience during input validation.
