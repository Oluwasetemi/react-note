---
background: https://res.cloudinary.com/drnqdd87d/image/upload/f_auto/nmgakkzd3lmlibnfosps
title: React Class Note
titleTemplate: '%s - AltSchool Africa'
info: |
  React Class Notes
  making of world class developers
  join at [AltSchool Africa](https://altschoolafrica.com)
author: Oluwasetemi
download: true
exportFilename: react-note
export:
  format: pdf
  timeout: 1600000
  dark: false
  withClicks: false
  withToc: false
# TODO: add a svg favicon
# favicon: https://oluwasetemi.dev/favicon-32x32.png
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
overviewSnapshots: true
selectable: true
---

# React [Class]{.text-8xl.font-hand.mr-4.text-gradient} Notes

React Class notes for the 2nd Semester

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Are you ready to build a well designed UI from components with your HTML skills? Press <kbd>space</kbd> on your keyboard <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/oluwasetemi/react-note" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
  <a href="/export" target="_blank" alt="Download" title="Download PDF or PPTX version of the slide"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-download />
  </a>
</div>

<!--
notes
-->

---
hideInToc: true
---

# Table of contents

<Toc columns="2" minDepth="1" maxDepth="2"></Toc>

---
name: Introduction
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Introduction to </span>
  <span>Libraries</span>
  <sup v-click>ReactJS, VueJS</sup>
</div>
<div mt1 forward:delay-300 v-click>The library for web and native user interfaces 🧱</div>
</h1>

---
src: ./pages/intro.md
---

---
name: JSX
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Javascript </span>
  <span>XML</span>
  <sup v-click>syntax, structure, rules</sup>
</div>
<div mt1 forward:delay-300 v-click>HTML ➡️ JSX</div>
</h1>

---
src: ./pages/jsx.md
---

---
name: Component
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Components in </span>
  <span>React</span>
  <sup v-click>parent, child, props</sup>
</div>
<div mt1 forward:delay-300 v-click>Reusability and Component Hierarchy 🪜</div>
</h1>

---
src: ./pages/component.md
---

---
name: Interaction
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Make a Component </span>
  <span>Interactive</span>
  <sup v-click>event handlers</sup>
</div>
<div mt1 forward:delay-300 v-click>Passing event handlers as props 〰️</div>
</h1>

---
src: ./pages/interaction.md
---

---
name: Rendering
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>React </span>
  <span>Lifecycle</span>
  <sup v-click>mount, trigger, render, commit</sup>
</div>
<div mt1 forward:delay-300 v-click>Conditional rendering ❓</div>
</h1>

---
src: ./pages/rendering.md
---

---
name: Hooks
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Introduction to React </span>
  <span>Hooks</span>
  <sup v-click>useState, useEffect</sup>
</div>
<div mt1 forward:delay-300 v-click>Mutation and Immutability 🆕</div>
</h1>

---
src: ./pages/hooks.md
---

---
name: State
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Managing </span>
  <span>State </span>
  <sup v-click>imperative vs declarative</sup>
</div>
<div mt1 forward:delay-300 v-click>Lifting State Up ⤴️ </div>
</h1>

---
src: ./pages/state.md
---

---
name: Form
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Data </span>
  <span>Binding </span>
  <sup v-click>controls, validations</sup>
</div>
<div mt1 forward:delay-300 v-click>Handling Form Inputs ⌨️</div>
</h1>

---
src: ./pages/form.md
---

---
name: More Hooks
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>More </span>
  <span>Hooks 🪝</span>
  <sup v-click>useRef, useLayoutEffect</sup>
</div>
<div mt1 forward:delay-300 v-click>useReducer &  useContext </div>
</h1>

---
src: ./pages/more-hooks.md
---

---
name: Routing
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Routes & </span>
  <span>  Links</span>
  <sup v-click>redirects, protecting routes</sup>
</div>
<div mt1 forward:delay-300 v-click>Navigating Between Pages 🧭</div>
</h1>

---
src: ./pages/routing.md
---

---
name: State Management
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>State </span>
  <span>Management </span>
  <sup v-click>context API, redux</sup>
</div>
<div mt1 forward:delay-300 v-click>Best Practices 👍</div>
</h1>

---
src: ./pages/state-management.md
---

---
name: Data Fetching
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Data </span>
  <span>Fetching </span>
  <sup v-click>fetch, axios, react query</sup>
</div>
<div mt1 forward:delay-300 v-click> Working with APIs 🌐</div>
</h1>

---
src: ./pages/data-fetching.md
---

---
name: Performance
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Performance   </span>
  <span>Optimization </span>
  <sup v-click>memo, lazy, suspense</sup>
</div>
<div mt1 forward:delay-300 v-click>Avoiding Unnecessary Renders 🙅</div>
</h1>

---
src: ./pages/performance.md
---

---
name: Test
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Introduction to </span>
  <span>Testing</span>
  <sup v-click>unit, end-to-end </sup>
</div>
<div mt1 forward:delay-300 v-click>React Testing Library  🔎</div>
</h1>

---
src: ./pages/test.md
---

---
name: Pagination Order
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-hwtrzb?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
autoLoad: true
---

---
name: Infinite Scroll Pagination
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-zjmule?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
autoLoad: true
---

---
name: Pagination GraphQL
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-q5wnda?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
autoLoad: true
---

---

## [Assignment]{.text-gradient.text-4xl}

Build a simple `Product App` with routing of your choice. The app should have a proper navigation and pages. Data fetching must be done with the graphql endpoint of the [API](https://api.oluwasetemi.dev) Also, <span class="text-gradient">handle 404 errors</span> by displaying a fallback page when a non-existent route is visited. Implement Error Boundary and Suspense with LazyLoading. Implement a pagination approach to the products displayed and show the page to a single product.

---
name: Router Example
layout: iframe-lazy
url: https://stackblitz.com/edit/vitejs-vite-hswavt?ctl=1&embed=1&file=src%2FApp.jsx&hideExplorer=1
autoLoad: true
---

<!--
The idea here is super sweet with tailwind like css and ability to render code is powerful and the opportunities here is endless.
-->

---

# Assignments

<ul>
  <li ><a href="https://stackblitz.com/~/github.com/Oluwasetemi/star-assignment?file=README.md" target="_blank">Assignment 1 - Play With Your Star</a></li>
  <li ><a href="https://github.com/Oluwasetemi/Grid-AltSchoolClassWork" target="_blank">Assignment 2 - Getting Griddy With List</a></li>
</ul>

---
hideInToc: true
name: Important Links
---

# Important Links

- [Stackblitz AltSchool Collection](https://stackblitz.com/@Oluwasetemi/collections/altschool-frontend)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [React Query](https://tanstack.com/query/latest)

---
hideInToc: true
---

# Contributors

- {@Stan015}
- {@victorvictoria-maker}
- {@Olubebe}
- {@rebornay}
- {@Caisere}
- {@kachi-jasperD}
