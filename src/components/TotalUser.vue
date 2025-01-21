<template>
  <div>
    <div class="border w-60 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
      <p>X</p>
      <p>11{{ poste }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ poste: String })
</script>

<style scoped></style>
