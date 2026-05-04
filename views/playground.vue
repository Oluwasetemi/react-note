<template>
  <div class="playground-page">
    <header class="playground-header">
      <div class="playground-header-left">
        <button class="back-btn" @click="goBack">← Back to slides</button>
        <h1 class="playground-title">JS / TS Playground</h1>
      </div>
      <a
        class="open-btn"
        href="https://js-playground-alpha.vercel.app/playground/js-ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        ↗ Open in new tab
      </a>
    </header>

    <div class="iframe-wrapper">
      <div v-if="!isLoaded" class="placeholder">
        <div v-if="isLoading" class="spinner" />
        <div v-else class="placeholder-content">
          <p class="placeholder-url">js-playground-alpha.vercel.app</p>
          <button class="run-btn" @click="load">▶ Launch Playground</button>
        </div>
      </div>
      <iframe
        v-if="isLoaded"
        src="https://js-playground-alpha.vercel.app/playground/js-ts"
        title="JS / TS Playground"
        allow="cross-origin-isolated"
        class="playground-iframe"
        @load="isLoading = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoaded = ref(false)
const isLoading = ref(false)

const load = () => {
  isLoading.value = true
  isLoaded.value = true
}

const goBack = () => router.push('/')
</script>

<style scoped>
.playground-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0f0f0f;
  color: #e5e5e5;
  font-family: 'Ubuntu', sans-serif;
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  flex-shrink: 0;
}

.playground-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.playground-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #e5e5e5;
}

.back-btn {
  padding: 6px 14px;
  background: #2a2a2a;
  color: #ccc;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s;
}

.back-btn:hover {
  background: #333;
}

.open-btn {
  padding: 6px 14px;
  background: #3b82f6;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: opacity 0.15s;
}

.open-btn:hover {
  opacity: 0.85;
}

.iframe-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.placeholder-url {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
}

.run-btn {
  padding: 12px 32px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.run-btn:hover {
  opacity: 0.85;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #333;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.playground-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
