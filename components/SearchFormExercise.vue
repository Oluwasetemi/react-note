<script setup>
import { onMounted, ref } from 'vue'
import { codeToHtml } from 'https://esm.sh/shiki@1.0.0'
import prettier from 'https://esm.sh/prettier@2.3.2/standalone.mjs'
import prettierPluginBabel from 'https://unpkg.com/prettier@3.4.1/plugins/babel.mjs'

const code = `
function SearchForm() {
// Implement form state and status
  return (
    <form>
      {/* Add search input and submit button */}<br />
    </form>
  )
}
`

const correct = `
function SearchForm() {
    const [results, formAction] = useActionState(async (state, formData) => {
      const query = formData.get('search');
      const results = await fetch(\`/api/search?q=\${query}\`).then(r => r.json());
      return results;
    }, []);

    return (
      <form action={formAction}>
        <input name="search" type="text" />
        <SubmitButton />
        {results.map(
          <ul>
            {results.map(result => (
              <li key={result.id}>{result.title}</li>
            ))}</ul>
        )}
      </form>
    );
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

const formattedSolutionPrettier = prettier.format(correct, {
  ...options,
  parser: 'babel',
  plugins: [prettierPluginBabel],
})

let formatted = ref('')
let formattedSolution = ref('')
let ready = ref(false)

onMounted(async () => {
  formatted = await codeToHtml(formattedCode, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })

  formattedSolution = await codeToHtml(formattedSolutionPrettier, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })
  ready.value = true
})

const showSolution = ref(false)
</script>

<template>
  <div class="bg-white shadow-md rounded-md p-4 max-w-4xl mx-auto">
    <div class="space-y-4 max-h-[500px] overflow-y-auto">
      <transition name="slide">
        <div v-if="!showSolution" key="question" class="space-y-4">
          <div class="rounded-md p-4 bg-gray-100">
            <h2 class="text-xl text-blue-500 font-bold mb-2">
              Create a search form with loading state:
            </h2>
            <div
              v-if="ready"
              v-html="formatted"
              class="bg-gray-300 text-gray-900 rounded-md p-3 overflow-auto text-sm"
            ></div>
          </div>
          <button
            class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm"
            @click="showSolution = true"
          >
            Show Solution
          </button>
        </div>
      </transition>
      <transition name="slide">
        <div v-if="showSolution" key="solution" class="space-y-4">
          <div class="bg-green-100 rounded-md p-4 light:text-white">
            <h2 class="text-xl text-green-900 font-bold mb-2">Solution</h2>
            <div class="bg-gray-900 rounded-md p-3 overflow-auto text-sm">
              <pre v-html="formattedSolution"></pre>
            </div>
          </div>
          <button
            class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors text-sm"
            @click="showSolution = false"
          >
            Hide Solution
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

pre {
  font-family: 'Fira Code', monospace;
}
</style>
