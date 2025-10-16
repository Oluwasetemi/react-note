<script setup>
import { ref, watch, onMounted } from 'vue'

const currentIndex = ref(0)
const codeContainer = ref(null)
const canScrollUp = ref(false)
const canScrollDown = ref(false)
const ready = ref(false)

const examples = [
  {
    title: 'Basic Form Status Example',
    description:
      'Simple form demonstrating useFormStatus hook for loading states',
    code: `import { useFormStatus } from "react-dom";

// Submit Button Component with Loading State
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Main Form Component
function Form() {
  return (
    <form
      action={async () => {
        await new Promise(resolve =>
          setTimeout(resolve, 1000)
        );
      }}
      className="space-y-4"
    >
      <input
        type="text"
        name="data"
        className="w-full px-4 py-2 border rounded"
      />
      <SubmitButton />
    </form>
  );
}`,
  },
  {
    title: 'Advanced Search Form Example',
    description:
      'Combines useFormState and useFormStatus for a search interface',
    code: `// Advanced Search Form Component
function SearchForm() {
  // 1. Form State Setup
  const [results, formAction] = useFormState(
    async (state, formData) => {
      // 2. Form Processing
      const query = formData.get('search');
      const response = await fetch(
        \`/api/search?q=\${query}\`
      );
      return await response.json();
    },
    []
  );

  // 3. Status Management
  const { pending } = useFormStatus();

  return (
    <div className="max-w-xl mx-auto p-6">
      <form action={formAction} className="space-y-6">
        <div className="relative">
          <input
            name="search"
            type="text"
            disabled={pending}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={pending}
            className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            {pending ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* 4. Results Display */}
        {results && (
          <ul className="space-y-2 divide-y">
            {results.map(item => (
              <li
                key={item.id}
                className="py-2 hover:bg-gray-50"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}`,
  },
]

// Navigation functions
const nextExample = () => {
  currentIndex.value = (currentIndex.value + 1) % examples.length
}

const prevExample = () => {
  currentIndex.value =
    (currentIndex.value - 1 + examples.length) % examples.length
}

// Check scroll position
const checkScroll = () => {
  if (!codeContainer.value) return

  const { scrollTop, scrollHeight, clientHeight } = codeContainer.value
  canScrollUp.value = scrollTop > 0
  canScrollDown.value = scrollTop + clientHeight < scrollHeight
}

// Watch for changes and check scroll
watch(currentIndex, async () => {
  await formatCode()

  if (codeContainer.value) {
    codeContainer.value.scrollTop = 0
  }
  setTimeout(checkScroll, 100)
})

onMounted(async () => {
  checkScroll()
  if (codeContainer.value) {
    codeContainer.value.addEventListener('scroll', checkScroll)
  }
  await formatCode()
  ready.value = true
})

async function formatCode() {
  // Format code
  const { default: prettier } = await import(
    'https://esm.sh/prettier@2.3.2/standalone.mjs'
  )
  const prettierPluginBabel = await import('prettier/parser-babel')
  const code = examples[currentIndex.value].code
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

  examples[currentIndex.value].code = formattedCode

  // highlight code
  const { codeToHtml } = await import('https://esm.sh/shiki@1.0.0')

  examples[currentIndex.value].code = await codeToHtml(formattedCode, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })
}
</script>
<template>
  <div
    class="w-full max-w-4xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow-lg"
  >
    <div
      class="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white"
    >
      <button
        @click="prevExample"
        class="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 transition-all"
        :disabled="currentIndex === 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div class="text-center">
        <h2 class="text-2xl font-bold">{{ examples[currentIndex]?.title }}</h2>
        <p class="text-white/80">{{ examples[currentIndex]?.description }}</p>
      </div>
      <button
        @click="nextExample"
        class="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 transition-all"
        :disabled="currentIndex === examples.length - 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>

    <!-- Code Display Section -->
    <div class="relative bg-gray-900 rounded-lg shadow-inner">
      <!-- Toolbar -->
      <div
        class="flex items-center justify-between px-4 py-2 border-b border-gray-700"
      >
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div class="text-gray-400 text-sm">
          Example {{ currentIndex + 1 }} of {{ examples.length }}
        </div>
      </div>

      <!-- Code Content -->
      <div class="relative">
        <div
          ref="codeContainer"
          v-if="ready"
          v-html="examples[currentIndex]?.code || ''"
          class="max-h-[300px] overflow-y-auto p-6 text-sm font-mono leading-relaxed text-gray-100 whitespace-pre-wrap break-words scrollbar-custom"
        ></div>

        <!-- Scroll Indicators -->
        <div
          v-show="canScrollUp"
          class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"
        ></div>
        <div
          v-show="canScrollDown"
          class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"
        ></div>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="flex justify-center space-x-3 mt-6">
      <button
        v-for="(_, index) in examples"
        :key="index"
        @click="currentIndex = index"
        class="group relative"
      >
        <span
          :class="[
            'block w-4 h-4 rounded-full transition-all duration-300',
            index === currentIndex
              ? 'bg-blue-500 scale-125'
              : 'bg-gray-300 hover:bg-blue-300',
          ]"
        ></span>
        <span
          class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          Example {{ index + 1 }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
