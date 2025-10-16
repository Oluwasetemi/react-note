<template>
  <div id="app-todo"></div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'

let elem = ref(null)

const App = () => {
  const [todos, setTodos] = React.useState([])
  const [id, setId] = React.useState(0)
  const [text, setText] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)
  const [editText, setEditText] = React.useState('')

  const createTodo = (e) => {
    e.preventDefault()
    if (!text?.trim()) return
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
        className: 'input',
        onChange: (e) => setText(e.target.value),
      }),
      React.createElement(
        'button',
        { type: 'submit', className: 'btn ml-2' },
        'Add ToDo',
      ),
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
                className: 'input',
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

function render() {
  const root = ReactDOM.createRoot(document.getElementById('app-todo'))
  root.render(React.createElement(App))
}

onMounted(() => {
  render()
  // console.log(React, ReactDOM)
})
</script>
