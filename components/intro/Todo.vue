<template>
  <div id="app-todo"></div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'

let elem = ref(null)

function mk(type, props, children) {
  const el = document.createElement(type)
  if (props) Object.assign(el, props)
  if (children) el.prepend(...children)
  return el
}

function app() {
  let ui = {}
  let state = {
    id: 0,
    todos: [
      { id: 1, text: 'Learn Vue.js' },
      { id: 2, text: 'Learn React' },
      { id: 3, text: 'Learn Angular' },
    ],
  }

  return mk('div', { id: 'app' }, [
    mk('form', null, [
      (ui.input = mk('input', { className: 'input' })),
      (ui.add = mk(
        'button',
        {
          onclick: () => {
            alert('add')
            return false
          },
          className: 'btn ml-2',
        },
        ['Add ToDo'],
      )),
    ]),
    (ui.todos = mk('ul', { style: 'padding:5px;' })),
  ])
}

function render() {
  document.getElementById('app-todo').append(app())
}

onMounted(() => {
  render()
})
</script>
