---
theme: seriph
background: https://res.cloudinary.com/drnqdd87d/image/upload/f_auto/nmgakkzd3lmlibnfosps
title: React Class Note
info: |
  ## AltSchool v4 React Class Notes
  making of world class developers
  join at [AltSchool Africa](https://altschoolafrica.com)
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
hideInToc: true
---

# React Class Notes

React Class notes for the 2nd Semester

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Are you ready to well designed UI with your HTML skills? Press <kbd>space</kbd> on your keyboard <carbon:arrow-right class="inline"/>
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
  <a href="https://github.com/Oluwasetemi/react-note/releases" target="_blank" alt="Download" title="Download PDF or PPTX version of the slide"
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

# Getting Started With React?

---
hideInToc: true
---

# What is React?

---

# Code Runners

```jsx {monaco-run} { lineNumbers: true, height: '12.5em'}
function Hello() {
  const [counter, setCounter] = React.useState(0);
  const value = 2;
  const doubled = counter * value

  return (
    <div className="select-none text-lg flex gap-4 items-center p2 border border-main">
    <span className="text-gray text-lg">
      <span className="text-orange">{ counter }</span>{' '}
      * { value } = {' '}
      <span className="text-green">{ doubled }</span>
    </span>
    <button className="border border-main p2 rounded" onClick={() => setCounter(counter + 1)}>+1</button>
    <button className="border border-main p2 rounded" onClick={() => setCounter(counter - 1)}>-1</button>
  </div>
  );
}
```

<!--
The idea here is super sweet with tailwind like css and ability to render code is powerful and the opportunities here is endless.
-->

---

# React Components

<CounterReact />

---

# Assignments

<ul>
  <li ><a @click="$slidev.nav.next()">Assignment 1</a></li>
  <li ><a @click="$slidev.nav.go(113)">Assignment 2</a></li>
</ul>

---
hideInToc: true
---

# Contributors


- [Adebosin Ridwan](https://github.com/RidwanAdebosin)
- [Olubebe Faith](https://github.com/Olubebe)
