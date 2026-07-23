<script setup>
import { ref, watch, onMounted } from 'vue'

const currentIndex = ref(0)
const codeContainer = ref(null)
const canScrollUp = ref(false)
const canScrollDown = ref(false)
const ready = ref(false)

const examples = [
  {
    title: 'useActionState — Basic Form',
    description: 'Manage form state and pending status with a single hook',
    code: `import { useActionState } from 'react'

async function submitName(prevState, formData) {
  const name = formData.get('name')
  if (!name) return { error: 'Name is required' }
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { message: \`Hello, \${name}!\` }
}

function NameForm() {
  const [state, formAction, isPending] = useActionState(
    submitName,
    { message: null, error: null }
  )

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting…' : 'Submit'}
      </button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.message && <p style={{ color: 'green' }}>{state.message}</p>}
    </form>
  )
}`,
  },
  {
    title: 'useFormStatus — Pending Button',
    description: 'Read the parent form\'s pending state from any child component',
    code: `import { useFormStatus } from 'react-dom'

// SubmitButton reads the parent form's pending state automatically
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving…' : 'Save'}
    </button>
  )
}

// SubmitButton must be rendered INSIDE the <form>
function ProfileForm() {
  return (
    <form action={saveProfile}>
      <input name="username" placeholder="Username" />
      <input name="bio" placeholder="Bio" />
      <SubmitButton />
    </form>
  )
}

async function saveProfile(formData) {
  await new Promise(resolve => setTimeout(resolve, 1500))
}`,
  },
  {
    title: 'useActionState + useFormStatus — Combined',
    description: 'Pair both hooks for complete form handling with feedback',
    code: `import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

async function sendMessage(prevState, formData) {
  const message = formData.get('message')
  if (message.length < 5) {
    return { error: 'Message too short (min 5 chars)' }
  }
  await new Promise(resolve => setTimeout(resolve, 1200))
  return { sent: true, preview: message }
}

function SendButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

function MessageForm() {
  const [state, formAction] = useActionState(sendMessage, {})

  return (
    <form action={formAction}>
      <textarea name="message" rows={3} placeholder="Type a message…" />
      <SendButton />
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.sent && <p style={{ color: 'green' }}>Sent: "{state.preview}"</p>}
    </form>
  )
}`,
  },
]

const nextExample = () => {
  currentIndex.value = (currentIndex.value + 1) % examples.length
}

const prevExample = () => {
  currentIndex.value = (currentIndex.value - 1 + examples.length) % examples.length
}

const checkScroll = () => {
  if (!codeContainer.value) return
  const { scrollTop, scrollHeight, clientHeight } = codeContainer.value
  canScrollUp.value = scrollTop > 0
  canScrollDown.value = scrollTop + clientHeight < scrollHeight
}

watch(currentIndex, async () => {
  await highlightCode()
  if (codeContainer.value) codeContainer.value.scrollTop = 0
  setTimeout(checkScroll, 100)
})

onMounted(async () => {
  checkScroll()
  if (codeContainer.value) {
    codeContainer.value.addEventListener('scroll', checkScroll)
  }
  await highlightCode()
  ready.value = true
})

async function highlightCode() {
  const { codeToHtml } = await import('https://esm.sh/shiki@1.0.0')
  const raw = examples[currentIndex.value]._raw ?? examples[currentIndex.value].code
  examples[currentIndex.value]._raw = raw
  examples[currentIndex.value].code = await codeToHtml(raw, {
    lang: 'jsx',
    theme: 'vitesse-dark',
  })
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex justify-between items-center bg-gradient-to-r from-violet-500 to-indigo-600 p-4 rounded-lg text-white">
      <button
        @click="prevExample"
        class="p-2 rounded-full hover:bg-white/20 disabled:opacity-40 transition-all"
        :disabled="currentIndex === 0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div class="text-center">
        <h2 class="text-xl font-bold">{{ examples[currentIndex]?.title }}</h2>
        <p class="text-white/80 text-sm">{{ examples[currentIndex]?.description }}</p>
      </div>
      <button
        @click="nextExample"
        class="p-2 rounded-full hover:bg-white/20 disabled:opacity-40 transition-all"
        :disabled="currentIndex === examples.length - 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>

    <!-- Code block -->
    <div class="relative bg-gray-900 rounded-lg shadow-inner">
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span class="text-gray-400 text-xs">{{ currentIndex + 1 }} / {{ examples.length }}</span>
      </div>
      <div class="relative">
        <div
          ref="codeContainer"
          v-if="ready"
          v-html="examples[currentIndex]?.code || ''"
          class="max-h-[280px] overflow-y-auto p-6 text-sm font-mono leading-relaxed scrollbar-custom"
        ></div>
        <div v-show="canScrollUp" class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"></div>
        <div v-show="canScrollDown" class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </div>

    <!-- Dots -->
    <div class="flex justify-center space-x-3 mt-4">
      <button
        v-for="(_, i) in examples"
        :key="i"
        @click="currentIndex = i"
        class="group relative"
      >
        <span
          :class="[
            'block w-4 h-4 rounded-full transition-all duration-300',
            i === currentIndex ? 'bg-violet-500 scale-125' : 'bg-gray-300 hover:bg-violet-300',
          ]"
        ></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}
.scrollbar-custom::-webkit-scrollbar { width: 8px; }
.scrollbar-custom::-webkit-scrollbar-track { background: #1f2937; border-radius: 4px; }
.scrollbar-custom::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
.scrollbar-custom::-webkit-scrollbar-thumb:hover { background: #6b7280; }
</style>
