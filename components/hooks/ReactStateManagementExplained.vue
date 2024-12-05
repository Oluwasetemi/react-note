<script setup>
import { onMounted, ref } from 'vue'
import { codeToHtml } from 'https://esm.sh/shiki@1.0.0'
import prettier from 'https://esm.sh/prettier@2.3.2/standalone.mjs'
import prettierPluginBabel from 'https://unpkg.com/prettier@3.4.1/plugins/babel.mjs'

const code = `
function Counter() {
// 1. State Declaration
const [count, setCount] = useState(0);
// 2. Update Functions
const increment = () => setCount(prev => prev + 1);
const decrement = () => setCount(prev => prev - 1);
// 3. UI Rendering
return (
<div className="counter">
<button onClick={decrement}>-</button>
<span>{count}</span>
<button onClick={increment}>+</button>
</div>
)
}
`

const options = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
}

const formattedCode = prettier.format(code, {
  ...options,
  parser: 'babel',
  plugins: [prettierPluginBabel],
})

let formatted = ref('')
let ready = ref(false)

onMounted(async () => {
  formatted = await codeToHtml(formattedCode, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })
  ready.value = true
})
</script>
<template>
  <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div
      class="bg-gradient-to-r from-blue-600 to-blue-800 p-2 sticky top-0 z-10"
    >
      <h1 class="text-xl text-center font-semibold text-white">
        React State Management Explained
      </h1>
    </div>
    <div class="flex flex-col md:flex-row h-[400px]">
      <div class="md:w-1/2 text-white overflow-y-auto">
        <div class="p-4 text-[12px]" v-if="ready" v-html="formatted"></div>
      </div>
      <div class="md:w-1/2 overflow-y-auto">
        <div class="p-6 space-y-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">
              1. State Declaration
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-blue-500 mr-2">•</span>
                <span
                  ><code class="bg-blue-100 px-1 rounded">useState(0)</code>
                  creates a new state variable</span
                >
              </li>
              <li class="flex items-start">
                <span class="text-blue-500 mr-2">•</span>
                <span>Returns array with: [currentValue, updateFunction]</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-500 mr-2">•</span>
                <span>Initial value is 0</span>
              </li>
            </ul>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-green-800 mb-2">
              2. Update Functions
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">•</span>
                <span
                  >Use function form
                  <code class="bg-green-100 px-1 rounded"
                    >(prev => prev + 1)</code
                  >
                  for reliable updates</span
                >
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">•</span>
                <span>React batches these updates automatically</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">•</span>
                <span>Prevents race conditions</span>
              </li>
            </ul>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-purple-800 mb-2">
              3. UI Rendering
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-purple-500 mr-2">•</span>
                <span>React automatically re-renders when state changes</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-500 mr-2">•</span>
                <span>Only changed parts of the DOM update</span>
              </li>
              <li class="flex items-start">
                <span class="text-purple-500 mr-2">•</span>
                <span>State persists between renders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
