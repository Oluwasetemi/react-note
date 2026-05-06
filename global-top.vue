<!-- global-top.vue -->
<script setup>
import { useNav } from '@slidev/client'

const { currentSlideNo } = useNav()

// Slides that already render their own TOC — skip the floating icon on these
const TOC_SLIDES = new Set([
   
])
</script>

<template>
  <TocIcon v-if="!TOC_SLIDES.has(currentSlideNo)" />
</template>
