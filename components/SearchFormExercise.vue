<template>
  <div class="bg-white shadow-md rounded-md p-4 max-w-xl mx-auto">
    <div class="space-y-4 max-h-[400px] overflow-y-auto">
      <transition name="slide">
        <div v-if="!showSolution" key="question" class="space-y-4">
          <div class="rounded-md p-4 bg-gray-100">
            <h2 class="text-xl text-blue-500 font-bold mb-2">
              Create a search form with loading state:
            </h2>
            <div
              class="bg-gray-300 text-gray-900 rounded-md p-3 overflow-auto text-sm"
            >
              <pre class="whitespace-pre-wrap">
                <code>
// Your task: Complete the SearchForm component using new form hooks
function SearchForm() {
  // Implement form state and status

  return (
    &lt;form&gt;
      {/* Add search input and submit button */}
    &lt;/form&gt;
  );
}
                </code>
              </pre>
            </div>
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
              <pre class="whitespace-pre-wrap">
                <code>
function SearchForm() {
  const [results, formAction] = useActionState(async (state, formData) => {
    const query = formData.get('search');
    const results = await fetch(`/api/search?q=${query}`).then(r => r.json());
    return results;
  }, []);

  return (
    &lt;form action={formAction}&gt;
      &lt;input name="search" type="text" /&gt;
      &lt;SubmitButton /&gt;
      {results &amp;&amp; (
        &lt;ul&gt;
          {results.map(result =&gt; (
            &lt;li key={result.id}&gt;{result.title}&lt;/li&gt;
          ))}&lt;/ul&gt;
      )}
    &lt;/form&gt;
  );
}
                </code>
              </pre>
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

<script setup>
import { ref } from 'vue'

const showSolution = ref(false)
</script>

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
