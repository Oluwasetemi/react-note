<template>
  <div class="flex justify-center min-h-screen pt-4">
    <div
      class="max-w-4xl w-full px-6 py-3 space-y-5 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
    >
      <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 class="text-2xl text-blue-500 font-semibold mb-4">
          Rule 1: Only Call Hooks at the Top Level
        </h2>
        <div class="space-y-4">
          <div class="bg-green-100 p-4 rounded">
            <p class="font-medium text-green-800">✅ Good: Top level</p>
            <pre
              class="text-black p-2 rounded-md mt-2"
            ><kbd>const [count, setCount] = useState(0);</kbd></pre>
          </div>
          <div class="bg-red-100 p-4 rounded">
            <p class="font-medium text-red-800">❌ Bad: Conditional hook</p>
            <pre class="text-black p-2 rounded-md mt-2"><kbd>if (count > 0) {
  const [error, setError] = useState(null);
}</kbd></pre>
          </div>
          <div class="bg-red-100 p-4 rounded">
            <p class="font-medium text-red-800">❌ Bad: Hook in loop</p>
            <pre
              class="text-black p-2 rounded-md mt-2"
            ><kbd>for (let i = 0; i < count; i++) {
  const [item, setItem] = useState(null);
}</kbd></pre>
          </div>
        </div>
      </div>
      <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 class="text-2xl text-blue-500 font-semibold mb-4">
          Rule 2: Only Call Hooks from React Functions
        </h2>
        <div class="space-y-4">
          <div class="bg-green-100 p-4 rounded">
            <p class="font-medium text-green-800">
              ✅ Good: Function component
            </p>
            <pre
              class="text-black p-2 rounded-md mt-2"
            ><kbd>function Component() {
  const [state, setState] = useState(0);
}</kbd></pre>
          </div>
          <div class="bg-green-100 p-4 rounded">
            <p class="font-medium text-green-800">✅ Good: Custom hook</p>
            <pre
              class="text-black p-2 rounded-md mt-2"
            ><kbd>function useCustomHook() {
  const [state, setState] = useState(0);
}</kbd></pre>
          </div>
          <div class="bg-red-100 p-4 rounded">
            <p class="font-medium text-red-800">❌ Bad: Regular function</p>
            <pre
              class="text-black p-2 rounded-md mt-2"
            ><kbd>function regularFunction() {
  const [state, setState] = useState(0);
}</kbd></pre>
          </div>
        </div>
      </div>
      <div class="p-40" />
    </div>
  </div>
</template>
