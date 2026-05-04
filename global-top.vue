<!-- global-top.vue -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <TocIcon />
  <button
    class="routes-link"
    title="View all sections"
    @click="router.push('/routes')"
  >
    ⊞
  </button>
</template>

<style scoped>
.routes-link {
  position: fixed;
  top: 1rem;
  right: 3.5rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.2s ease;
  z-index: 100;
  color: inherit;
}

.routes-link:hover {
  opacity: 1;
}
</style>