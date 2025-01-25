<template>
    <div>
      <div
      :class="theme.theme === 'light' ? 'border w-60 gap-2 py-4 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center' :
       ' w-60 gap-2 py-4  rounded-lg shadow-sm flex flex-col items-center justify-center !bg-gray-500 !text-white'"
      >
        <div class="img h-7 w-7 rounded-3xl ring-4 ring-gray-300"></div>
        <p >Enseignant</p>
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
    background-image: url('../assets/teacher.1001x1024.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  </style>
  