
<script setup>
import { ref } from 'vue'
import Panel from './Panel.vue'

const activeIndex = ref(0)
</script>
<template>
  <div>
    <h2>Coding Schools</h2>
    <Panel
      title="AltSchool Africa"
      :isActive="activeIndex === 0"
      @show="activeIndex = 0"
    >
      Pushing to be the institution in Africa and the world at large. Here at
      AltSchool Africa, we believe in the power of education to change the
      world.
    </Panel>
    <Panel title="Others" :isActive="activeIndex === 1" @show="activeIndex = 1">
      Other coding schools in Africa are doing great things but cannot out pace
      and match the quality of education we provide at AltSchool Africa.
    </Panel>
  </div>
</template>
