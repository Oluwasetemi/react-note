<script setup>
import { ref, watch } from 'vue'

// Parent state
const parentCount = ref(0)
const fixedProp = ref('Hello')
const changingProp = ref(0)

// Render counters
const unmemoizedRenders = ref(0)
const memoizedRenders = ref(0)

// Unmemoized child re-renders every time parent renders
watch(parentCount, () => {
  unmemoizedRenders.value++
})

// Memoized child only re-renders when its own prop changes
watch(changingProp, () => {
  memoizedRenders.value++
})

function triggerParentRender() {
  parentCount.value++
  unmemoizedRenders.value++ // unmemoized always follows parent
}

function changeChildProp() {
  changingProp.value++
  memoizedRenders.value++  // memo child re-renders because its prop changed
  unmemoizedRenders.value++ // unmemoized re-renders too
  parentCount.value++
}

function reset() {
  parentCount.value = 0
  unmemoizedRenders.value = 0
  memoizedRenders.value = 0
  changingProp.value = 0
}
</script>

<template>
  <div class="font-mono text-sm space-y-4 p-4 bg-gray-950 rounded-xl text-white w-full max-w-2xl mx-auto">

    <!-- Parent box -->
    <div class="border border-indigo-500 rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <span class="text-indigo-400 font-bold text-xs uppercase tracking-wider">ParentComponent</span>
        <span class="text-indigo-300 text-xs">renders: <strong class="text-white">{{ parentCount }}</strong></span>
      </div>
      <div class="flex gap-2">
        <button
          @click="triggerParentRender"
          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-xs transition-colors"
        >
          Re-render parent (unrelated state)
        </button>
        <button
          @click="changeChildProp"
          class="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 rounded text-xs transition-colors"
        >
          Change child prop
        </button>
        <button
          @click="reset"
          class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
        >
          Reset
        </button>
      </div>

      <!-- Children side by side -->
      <div class="grid grid-cols-2 gap-3 mt-4">

        <!-- Unmemoized child -->
        <div
          class="border border-red-500/50 rounded p-3 transition-all duration-100"
          :class="{ 'bg-red-900/30': unmemoizedRenders > 0 }"
        >
          <div class="text-red-400 text-xs font-bold mb-1">ChildComponent</div>
          <div class="text-gray-400 text-xs mb-2">prop: "{{ fixedProp }}"</div>
          <div class="flex items-center gap-2">
            <div
              class="w-2 h-2 rounded-full bg-red-500 transition-all"
              :class="{ 'animate-ping': unmemoizedRenders > 0 }"
            ></div>
            <span class="text-xs">renders: <strong class="text-red-300">{{ unmemoizedRenders }}</strong></span>
          </div>
          <div class="mt-2 text-[10px] text-red-400/70 italic">re-renders every time</div>
        </div>

        <!-- Memoized child -->
        <div
          class="border border-green-500/50 rounded p-3 transition-all duration-100"
          :class="{ 'bg-green-900/30': memoizedRenders > 0 }"
        >
          <div class="text-green-400 text-xs font-bold mb-1">memo(ChildComponent)</div>
          <div class="text-gray-400 text-xs mb-2">prop: {{ changingProp }}</div>
          <div class="flex items-center gap-2">
            <div
              class="w-2 h-2 rounded-full bg-green-500 transition-all"
            ></div>
            <span class="text-xs">renders: <strong class="text-green-300">{{ memoizedRenders }}</strong></span>
          </div>
          <div class="mt-2 text-[10px] text-green-400/70 italic">skips when props unchanged</div>
        </div>

      </div>
    </div>

    <!-- Legend -->
    <div class="text-[10px] text-gray-500 text-center">
      Click "Re-render parent" to see the difference · Red = re-renders unnecessarily · Green = skipped ✓
    </div>
  </div>
</template>
