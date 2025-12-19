<template>
  <section class="panel">
    <h3>{{ title }}</h3>
    <p v-if="isActive">
      <slot></slot>
    </p>
    <button v-else class="btn" @click="$emit('show')">Show</button>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['show'])
</script>
