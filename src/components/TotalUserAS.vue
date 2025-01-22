<template>
  <div>
    <div
      class="border w-60 gap-2 py-4 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center"
    >
      <div class="img h-7 w-7 rounded-3xl ring-4 ring-purple-500"></div>
      <p class="text-purple-500">Agent de la scolarité</p>
      <p><b>Effectifs :</b> {{ nombre }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ nombre: String })
</script>

<style scoped>
.img {
  background-image: url('../assets/print.1024x973.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
