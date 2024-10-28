---
layout: center
transition: slide-up
hideInToc: true
---

# Rendering

<div mt-2 />

- <a @click="$slidev.nav.next()">Lifecycle (Mount, Trigger, Render and Commit)</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Batching</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Rendering lists</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Conditional rendering - if-else, ternary, && operator</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Conditionally assigning values to a variable</a>

---
hideInToc: true
transition: fade
---

# [React Lifecycle (Mount, Trigger, Render and Commit)]{.text-gradient}

Components built in {React} passes through some stages before being displayed on the browser. These stages of rendering components are called [React Lifecycle]{.text-teal-400.italic}. Declarative approach to rendering is what {React} follows. Developers describes what the UI should look like in their code while {React} takes care of how the components are rendered on the screen.

<v-click>

{React} Components Rendering Stages:
</v-click>

<span v-click>

1. [Mount:]{.text-gradient.underline}

</span>

<div flex gap-3>

<div>

<v-click>

This is the initial placement of components in Reacts Virtual DOM at the `createRoot` level. By this, we mean that {React} takes the components and creates a [snapshot]{.text-teal-400.italic} to populate actual Browser DOM nodes at the [FIRST]{.italic} rendering of the components.
</v-click>

```jsx {hide|*|4|5|*}
import Message from './components/Message.js'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(<Message />)
```

</div>

<img v-click w-80 h-60 src="/lifecycle-mount.png" alt="react mount lifecycle" />
</div>

---
hideInToc: true
transition: fade-out
---

2. [Trigger:]{.text-gradient.underline}

<div flex gap-3>

At this stage, React watches for [interactivity]{.text-gradient.italic} within mounted components so as to [trigger]{.text-teal-400.italic} updates. Undoubtedly, the only thing that can trigger a re-render in a React application is when there is a [State Change]{.text-gradient.italic}, and this change in state are caused by either automated or user [interactivity]{.text-gradient.italic} like clicking a button or setting a time interval for updates.

<img v-click w-80 h-45 mb-2 src="/lifecycle-trigger.png" alt="react trigger lifecycle" />
</div>

<div flex justify-between gap-3>

<div v-click flex-grow-1>
```jsx {monaco-run} {lineNumbers: 'true', height: '10rem'}
function Clock() {
  const [time, setTime] = React.useState(getCurrentTime());

React.useEffect(() => {
const interval = setInterval(() => {
setTime(getCurrentTime());
}, 1000);

    return () => clearInterval(interval);

}, []);

return (
<>

<h1 className="!text-[1.5rem] text-gradient">{time}</h1>
<input className="border border-teal-400 text-white p-1 rounded" />
</>
);
}

function getCurrentTime () {
const time = new Date().toLocaleTimeString();
return time;
}

```
</div>

<div v-click w-80>
In this example code, Only the time is being updated every second, not the entire application. This is why you can type on the input and the values don't refresh as the time is updated.

During a [trigger]{.text-gradient}, {React} checks to see what part of the component changed, and thus, re-renders only that part. In this case, time state is being updated with `setTime` within an interval.
</div>
</div>
```

---

hideInToc: true
transition: slide-right

---

3. [Render:]{.text-gradient.underline}

<div flex gap-3>

This is the stage where {React} calls the components to know what to display on the screen. At first trigger ([mount]{.text-teal-400}), {React} renders from the `root` which is the entire components. But during a [state change]{.text-gradient.italic} trigger, {React} searches for the part that changed and updates only that part as seen in the example code from previous slide.

<img w-80 h-45 mb-2 src="/lifecycle-render.png" alt="react render lifecycle" />
</div>

<div v-click>

4. [Commit:]{.text-gradient.underline}

<div flex gap-3>

{React} after rendering updates, [commits]{.text-teal-400.italic} them to the changes to actual DOM for us to see. During first trigger ([mount]{.text-teal-400}), [committing]{.text-teal-400.italic} changes is the same as appending the components to the DOM using the `appendChild()` API. While subsequent triggers due to [interactivity]{.text-gradient.italic} are committed to the UI based on the calculations of the part that actually changed and needs to be updated.

<img w-80 h-45 mb-2 src="/lifecycle-commit.png" alt="react commit lifecycle" />
</div>
</div>

---

hideInToc: true
transition: slide-up

---

# [Lifecycle Summery]{.text-gradient}

<div flex gap-4>
<div>

Step 0: [Mount]{.text-teal-400} with `ReactDOM`

Step 1: [Trigger]{.text-teal-400} a render

- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

Step 2: {React} [renders]{.text-teal-400} your components

Step 3: {React} [commits]{.text-teal-400} changes to the DOM

</div>

<img v-click w-80 h-50 mb-2 src="/react-lifecycle.png" alt="react lifecycle" />
</div>

<div v-click>

Any screen update in a {React} app happens in three steps: [Trigger]{.text-gradient}, [Render]{.text-gradient}, and [Commit]{.text-gradient}.

You can use `Strict Mode` to find mistakes in your components caused by impure functions because {React} calls each component twice in `Strict Mode`.

React does not touch the DOM if the rendering result is the same as last time.

</div>

---

hideInToc: true
transition: slide-down

---

# [Batching]{.text-gradient}

In {React}, [batching]{.text-teal-400} refers to the process of grouping multiple state updates into a single re-render to optimize performance. Whenever multiple state changes occur within the same event, {React} automatically [batches]{.text-teal-400.italic} them to reduce the number of renders, which enhances efficiency.

<v-click>

## How [Batching]{.text-gradient} Works in {React}

</v-click>

<v-clicks>

- <u>Event Handlers:</u> {React} [batches]{.text-teal-400.italic} state updates within event handlers. If you update the state multiple times within a single event handler, {React} will group these updates and trigger a single re-render.

- <u>Promises, Async Calls, and Timeouts:</u> Before {React} 18, [batching]{.text-teal-400} did not automatically happen in async contexts (e.g., setTimeout, Promise.then). In {React} 18 and later, however, automatic batching extends to async functions and other async situations, which minimizes unnecessary renders across all scenarios.

</v-clicks>
