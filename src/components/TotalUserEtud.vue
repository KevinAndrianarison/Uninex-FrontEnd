<template>
    <div>
      <div
      :class="theme.theme === 'light' ? 'border w-60 gap-2 py-4 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center' :
       ' w-60 gap-2 py-4 rounded-lg shadow-sm flex flex-col items-center justify-center !bg-gray-500 !text-white'"
        class=""
      >
        <div class="img h-7 w-7 rounded-3xl ring-4 ring-yellow-500"></div>
        <p class="text-yellow-500">Etudiant</p>
        <p><b>Effectifs :</b> {{ nombre }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useTheme } from '@/stores/Theme'

  const props = defineProps({ nombre: String })
  const theme = useTheme()

  </script>
  
  <style scoped>
  .img {
    background-image: url('../assets/graduation.587x1024.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  </style>
  