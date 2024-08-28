<template>
  <div ref="tooltipTarget" class="tooltip-target">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

const props = defineProps({
  content: { default: 'Tooltip content' }
})

const tooltipTarget = ref(null)

onMounted(() => {
  if (tooltipTarget.value) {
    tippy(tooltipTarget.value, {
      content: props.content,
      theme: 'light',
      placement: 'bottom',
      animation: 'fade',
      arrow: false
    })
  }
})
</script>

<style scoped>
.tooltip-target {
  display: inline-block;
}
</style>
