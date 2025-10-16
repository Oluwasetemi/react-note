<template>
  <div class="iframe-lazy-container">
    <div v-if="!isLoaded" class="iframe-placeholder" @click="loadIframe">
      <div class="placeholder-content">
        <div class="loading-spinner" v-if="isLoading">
          <div class="spinner"></div>
        </div>
        <div v-else class="click-to-load">
          <div class="play-icon">▶</div>
          <p>Click to load iframe</p>
          <small>{{ url }}</small>
        </div>
      </div>
    </div>
    <iframe
      v-show="isLoaded"
      ref="iframeRef"
      :src="isLoaded ? url : undefined"
      :title="title || 'Embedded content'"
      class="iframe-content"
      frameborder="0"
      allowfullscreen
      @load="onIframeLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  url: string
  title?: string
  autoLoad?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: false
})

const iframeRef = ref<HTMLIFrameElement>()
const isLoaded = ref(false)
const isLoading = ref(false)
const containerRef = ref<HTMLElement>()

const loadIframe = async () => {
  if (isLoaded.value || isLoading.value) return

  isLoading.value = true

  // Small delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 100))

  isLoaded.value = true
  isLoading.value = false
}

const onIframeLoad = () => {
  isLoading.value = false
}

// Auto-load when slide becomes visible (if autoLoad is enabled)
onMounted(() => {
  if (props.autoLoad) {
    const { stop } = useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !isLoaded.value) {
          loadIframe()
          stop()
        }
      },
      {
        threshold: 0.1
      }
    )
  }
})
</script>

<style scoped>
.iframe-lazy-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.iframe-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.iframe-placeholder:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.placeholder-content {
  text-align: center;
  color: #6c757d;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.click-to-load {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.play-icon {
  font-size: 48px;
  color: #007bff;
  transition: transform 0.2s ease;
}

.iframe-placeholder:hover .play-icon {
  transform: scale(1.1);
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}
</style>
