<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const previewRef = ref<HTMLElement>()
const isRunning = ref(false)
const hasRun = ref(false)
const error = ref('')
const consoleLogs = ref<Array<{ type: 'log' | 'error' | 'warn'; message: string }>>([])

// Holds the React root so we can unmount on re-run / unmount
let reactRoot: { unmount: () => void } | null = null

// ── Default starter code ──────────────────────────────────────────────────────
const DEFAULT_CODE = `function App() {
  const [count, setCount] = React.useState(0)

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ margin: '0 0 12px', color: '#1a1a1a' }}>
        React Playground ⚛️
      </h2>
      <p style={{ margin: '0 0 16px', color: '#555' }}>
        Count: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '8px 20px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Increment
      </button>
      <p style={{ marginTop: '16px', color: '#888', fontSize: '13px' }}>
        Edit this code and press ▶ Run (or Ctrl+Enter) to see changes.
      </p>
    </div>
  )
}

export default App`

const code = ref(DEFAULT_CODE)

// ── Navigation ────────────────────────────────────────────────────────────────
const goBack = () => router.push('/')

const resetCode = () => {
  code.value = DEFAULT_CODE
  error.value = ''
  consoleLogs.value = []
  hasRun.value = false
  if (previewRef.value)
    previewRef.value.innerHTML = ''
  if (reactRoot) {
    reactRoot.unmount()
    reactRoot = null
  }
}

// ── Editor helpers ────────────────────────────────────────────────────────────
const insertTab = (e: KeyboardEvent) => {
  const ta = e.target as HTMLTextAreaElement
  const start = ta.selectionStart
  const end = ta.selectionEnd
  code.value = `${code.value.substring(0, start)}  ${code.value.substring(end)}`
  nextTick(() => {
    ta.selectionStart = ta.selectionEnd = start + 2
  })
}

// ── Console helpers ───────────────────────────────────────────────────────────
const formatValue = (value: unknown): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2)
    }
    catch {
      return String(value)
    }
  }
  return String(value)
}

// ── Console patch — installed for the lifetime of the page ───────────────────
// Must outlive runCode: React renders and effects fire asynchronously after
// createRoot().render() returns, so patching inside runCode's finally block
// would restore console before any component log ever executes.
const origConsole = { log: console.log, error: console.error, warn: console.warn }

onMounted(() => {
  console.log = (...args: unknown[]) => {
    consoleLogs.value.push({ type: 'log', message: args.map(formatValue).join(' ') })
    origConsole.log.apply(console, args)
  }
  console.error = (...args: unknown[]) => {
    consoleLogs.value.push({ type: 'error', message: args.map(formatValue).join(' ') })
    origConsole.error.apply(console, args)
  }
  console.warn = (...args: unknown[]) => {
    consoleLogs.value.push({ type: 'warn', message: args.map(formatValue).join(' ') })
    origConsole.warn.apply(console, args)
  }
})

// ── Runner — mirrors the jsx runner in setup/code-runners.ts ──────────────────
const runCode = async () => {
  if (!previewRef.value || isRunning.value) return

  isRunning.value = true
  error.value = ''
  consoleLogs.value = []

  try {
    const [React, ReactDOM, Babel] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('@babel/standalone'),
    ])

    // Pre-process: convert ESM export default syntax to a variable assignment
    // (the react Babel preset does not transform module syntax)
    const processed = code.value
      .replace(/\bexport\s+default\s+function\s+(\w+)/, 'var __PlaygroundExport__ = function $1')
      .replace(/\bexport\s+default\s+class\s+(\w+)/, 'var __PlaygroundExport__ = class $1')
      .replace(/\bexport\s+default\s+/, 'var __PlaygroundExport__ = ')

    const { code: compiled } = Babel.transform(processed, { presets: ['react'] })

    // Execute in a sandboxed Function scope, passing React so JSX helpers resolve
    // Falls back to looking for a variable named `App` if no explicit export default
    // eslint-disable-next-line no-new-func
    const UserComponent = new Function(
      'React',
      `"use strict";
var __PlaygroundExport__ = undefined;
${compiled}
if (typeof __PlaygroundExport__ !== 'undefined') return __PlaygroundExport__;
if (typeof App !== 'undefined') return App;
return null;`,
    )(React)

    if (!UserComponent)
      throw new Error(
        'No component found. Use `export default` or name your component `App`.',
      )

    // Unmount previous React tree before re-rendering
    if (reactRoot) {
      reactRoot.unmount()
      reactRoot = null
    }
    previewRef.value.innerHTML = ''

    reactRoot = (ReactDOM as typeof ReactDOM).createRoot(previewRef.value)
    reactRoot.render((React as typeof React).createElement(UserComponent))
    hasRun.value = true
  }
  catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  }
  finally {
    isRunning.value = false
  }
}

onUnmounted(() => {
  if (reactRoot)
    reactRoot.unmount()
  console.log = origConsole.log
  console.error = origConsole.error
  console.warn = origConsole.warn
})
</script>
<template>
  <div class="flex flex-col h-screen bg-[#0f0f0f] text-[#e5e5e5]" style="font-family: monospace">
    <!-- Header -->
    <header
      class="flex items-center justify-between px-5 py-[10px] bg-[#1a1a1a] border-b border-[#333] flex-shrink-0"
    >
      <div class="flex items-center gap-4">
        <button
          class="px-[14px] py-[6px] bg-[#2a2a2a] text-[#ccc] border border-[#444] rounded-md cursor-pointer text-sm transition-colors duration-150 hover:bg-[#333]"
          @click="goBack"
        >
          ← Back to slides
        </button>
        <h1 class="m-0 text-base font-semibold text-[#e5e5e5]">⚛️ React Playground</h1>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-[14px] py-[6px] bg-[#2a2a2a] text-[#ccc] border border-[#444] rounded-md cursor-pointer text-sm transition-colors duration-150 hover:bg-[#333]"
          @click="resetCode"
        >
          ↺ Reset
        </button>
        <button
          class="px-[14px] py-[6px] bg-[#0070f3] text-white rounded-md cursor-pointer text-sm font-medium transition-opacity duration-150 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isRunning"
          @click="runCode"
        >
          {{ isRunning ? '⏳ Running…' : '▶ Run' }}
        </button>
      </div>
    </header>

    <!-- Error banner -->
    <div
      v-if="error"
      class="px-5 py-2 bg-red-900/40 border-b border-red-700 text-red-300 text-xs flex items-start gap-2 flex-shrink-0"
    >
      <span class="flex-shrink-0 mt-0.5">❌</span>
      <pre class="m-0 whitespace-pre-wrap break-all leading-relaxed">{{ error }}</pre>
    </div>

    <!-- Split pane -->
    <div class="flex flex-1 overflow-hidden">
      <!-- ── Editor pane ── -->
      <div class="w-1/2 flex flex-col border-r border-[#333] min-w-0">
        <div
          class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0"
        >
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#58a6ff]" />
          App.jsx
          <span class="ml-auto text-[#555]">Tab = 2 spaces</span>
        </div>
        <textarea
          v-model="code"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          class="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm resize-none outline-none border-none leading-relaxed"
          style="tab-size: 2; font-family: 'JetBrains Mono', 'Fira Code', monospace"
          @keydown.tab.prevent="insertTab"
          @keydown.ctrl.enter.prevent="runCode"
          @keydown.meta.enter.prevent="runCode"
        />
      </div>

      <!-- ── Preview + Console pane ── -->
      <div class="w-1/2 flex flex-col min-w-0">
        <!-- Preview header -->
        <div
          class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0"
        >
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          Preview
        </div>

        <!-- Rendered output -->
        <div ref="previewRef" class="flex-1 bg-white overflow-auto">
          <div
            v-if="!hasRun"
            class="h-full flex items-center justify-center text-gray-400 text-sm"
            style="font-family: system-ui, sans-serif"
          >
            Press <kbd
              class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600"
            >▶ Run</kbd> or <kbd
              class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600"
            >Ctrl+Enter</kbd> to render
          </div>
        </div>

        <!-- Console -->
        <div
          class="h-40 bg-[#1e1e1e] border-t border-[#333] flex flex-col overflow-hidden flex-shrink-0"
        >
          <div
            class="px-3 py-2 bg-[#2d2d2d] border-b border-[#444] flex items-center justify-between flex-shrink-0"
          >
            <span class="text-xs font-bold text-[#d4d4d4]">Console</span>
            <button
              class="px-3 py-1 bg-[#444] text-[#d4d4d4] border-none rounded text-xs cursor-pointer hover:bg-[#555] transition-colors"
              @click="consoleLogs = []"
            >
              Clear
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-3 space-y-1">
            <div
              v-if="consoleLogs.length === 0"
              class="text-[#555] text-xs italic"
            >
              No output yet.
            </div>
            <div
              v-for="(log, i) in consoleLogs"
              :key="i"
              class="text-xs flex items-start gap-2 pb-1 border-b border-[#2a2a2a] last:border-0"
            >
              <span
                :class="{
                  'text-red-400': log.type === 'error',
                  'text-yellow-400': log.type === 'warn',
                  'text-blue-400': log.type === 'log',
                }"
                class="flex-shrink-0"
              >
                {{ log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '▶' }}
              </span>
              <span
                :class="{
                  'text-red-300': log.type === 'error',
                  'text-yellow-300': log.type === 'warn',
                  'text-[#d4d4d4]': log.type === 'log',
                }"
                class="whitespace-pre-wrap break-all leading-relaxed"
              >{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

