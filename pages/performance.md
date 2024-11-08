---
layout: center
transition: slide-up
hideInToc: true
---

# Performance Optimization in {React}

<div mt-2 />

- <a @click="$slidev.nav.next()">Avoiding Unnecessary Renders with React.memo</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Optimizing Component Renders with useMemo</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Lazy Loading Components ("React.lazy" and "Suspense")</a>

---
hideInToc: true
transition: slide-down
---

# [Avoiding Unnecessary Renders with React.memo]{.text-gradient}

From our previous slides on the <span class="italic">Lifecycle of a {React} component</span>, we learnt that {React} re-renders a component only when a [State Change]{.text-teal-400} is [triggered]{.italic} by [Interactivity]{.text-gradient.italic}. In some cases it is [unnecessary]{.italic} to re-render every component, this is where {React}'s `memo()` comes in.

<v-click>

`React.memo` is a higher-order component that helps prevent re-rendering of a component if its props haven't changed. It is very useful for functional components that are rendered frequently with the same props.

</v-click>

```jsx {hide|*}
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

<v-click>

`memo()` allows you to skip re-rendering a component when its props are unchanged.

</v-click>

<v-click>

[memo parameters:]{.underline.text-gradient}

</v-click>

<v-clicks>

- `Component`: This is the component that you want to memoize. The memo takes any valid component and return a memoized version of it. It does not modify this component.
- optional `arePropsEqual`: This is a function that takes two arguments: the component’s previous props, and its new props. It returns true if the old and new props are identical, else it should return false. Usually, this function is optional. By default, React will compare each prop with `Object.is`.

</v-clicks>

---
hideInToc: true
transition: fade-out
---

# [Usage]{.text-gradient} of `memo()`

As previously stated, {React} will re-render a component if its parent re-renders, but with `memo()`, you can prevent a component from re-rendering when its parent re-renders, except there is a state change in that component.

````md magic-move
```jsx
const MyMemoizedComponent = React.memo(function MyComponent({ value }) {
  console.log('Rendered')
  return <h1>Hello World! The value is: {value}</h1>
})

export default MyMemoizedComponent
```

```jsx
const MyComponent = ({ value }) => {
  console.log('Rendered')
  return <h1>Hello World! The value is: {value}</h1>
}

const MyMemoizedComponent = React.memo(MyComponent)

export default MyMemoizedComponent
```
````

<v-clicks at="2">

The main purpose of `memo()` is [performance optimization]{.text-teal-400}, it does not modify the component.

"Optimizing with `memo` is only valuable when your component re-renders often with the same exact `props`, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, `memo` is unnecessary. Keep in mind that `memo` is completely useless if the `props` passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often need `useMemo` and `useCallback` together with memo."

</v-clicks>

---
hideInToc: true
transition: slide-down
---

# [Example]{.text-gradient} of `memo()` in [action]{.text-gradient}

<iframe
  width="100%"
  height="400"
  src="https://codesandbox.io/p/sandbox/react-memo-in-action-rqngm9"
>
</iframe>
