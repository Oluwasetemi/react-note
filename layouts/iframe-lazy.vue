<template>
  <div ref="containerRef" class="relative w-full h-full min-h-[400px]">
    <div
      v-if="!isLoaded"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
    >
      <div class="text-center text-gray-500 dark:text-gray-400">
        <div v-if="isLoading" class="flex items-center justify-center">
          <div
            class="w-10 h-10 border-4 border-gray-200 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"
          />
        </div>
        <div v-else class="flex flex-col items-center gap-3">
          <p
            class="text-xs text-gray-400 max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap m-0"
          >
            {{ url }}
          </p>
          <p
            v-if="openExternallyOnly"
            class="max-w-[420px] m-0 text-sm leading-relaxed"
          >
            CodeSandbox cannot run inside this cross-origin isolated deck. Open
            the demo in a new tab instead.
          </p>
          <div class="flex gap-3">
            <button
              v-if="!openExternallyOnly"
              class="px-5 py-2 rounded-md text-base font-semibold cursor-pointer no-underline border-0 bg-blue-500 text-white transition-opacity duration-200 hover:opacity-75"
              @click="loadIframe"
            >
              ▶ Run
            </button>
            <a
              class="px-5 py-2 rounded-md text-base font-semibold cursor-pointer no-underline border-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-opacity duration-200 hover:opacity-75"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {{ openExternallyOnly ? 'Open in CodeSandbox' : 'Open' }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoaded" class="relative w-full h-full">
      <a
        class="absolute top-2 right-2 z-10 bg-black/55 text-white px-[10px] py-1 rounded text-sm no-underline transition-colors duration-200 hover:bg-black/80"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        title="Open in browser"
        >↗</a
      >
      <iframe
        ref="iframeRef"
        :src="url"
        :title="title || 'Embedded content'"
        class="w-full h-full border-0 rounded-lg block"
        frameborder="0"
        :allow="iframeAllow"
        :credentialless="useCredentialless || undefined"
        allowfullscreen
        @load="onIframeLoad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  url: string
  title?: string
  autoLoad?: boolean
  // Legacy embeds that do not send COEP headers can opt into an anonymous frame.
  credentialless?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: false,
})

type EmbedVendor = 'codesandbox' | 'stackblitz' | 'other'

const embedVendor = computed<EmbedVendor>(() => {
  try {
    const hostname = new URL(props.url).hostname

    if (hostname === 'codesandbox.io' || hostname.endsWith('.codesandbox.io')) {
      return 'codesandbox'
    }

    if (hostname === 'stackblitz.com' || hostname.endsWith('.stackblitz.com')) {
      return 'stackblitz'
    }
  } catch {
    // Treat malformed and relative URLs as generic embeds.
  }

  return 'other'
})

// The iframe permission is vendor-specific. Only StackBlitz WebContainers need it.
const iframeAllow = computed(() =>
  embedVendor.value === 'stackblitz' ? 'cross-origin-isolated' : undefined,
)

// Credentialless is an explicit escape hatch for legacy embeds, never a vendor default.
const useCredentialless = computed(() => props.credentialless === true)

// CodeSandbox needs credentialed cross-origin requests, which the deck's required
// StackBlitz isolation policy blocks. Avoid rendering a known-broken frame.
const openExternallyOnly = computed(
  () =>
    typeof window !== 'undefined' &&
    window.crossOriginIsolated &&
    embedVendor.value === 'codesandbox',
)

const isPrintMode =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('print')

const iframeRef = ref<HTMLIFrameElement>()
const containerRef = ref<HTMLElement>()
const isLoaded = ref(false)
const isLoading = ref(false)

const loadIframe = async () => {
  if (openExternallyOnly.value || isLoaded.value || isLoading.value) return
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 100))
  isLoaded.value = true
  isLoading.value = false
}

const onIframeLoad = () => {
  isLoading.value = false
}

onMounted(() => {
  if (props.autoLoad && !isPrintMode && !openExternallyOnly.value) {
    const { stop } = useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !isLoaded.value) {
          loadIframe()
          stop()
        }
      },
      { threshold: 0.1 },
    )
  }
})
</script>
