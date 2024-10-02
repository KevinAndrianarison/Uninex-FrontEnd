<template>
    <RouterLink to="/enseignant/PublierCours">
      <li><ArrowDownOnSquareStackIcon class="h-5 w-5 mr-2" /> Publier des cours</li>
    </RouterLink>
    <RouterLink to="/enseignant/TrascrireNotes">
      <li><PencilSquareIcon class="h-5 w-5 mr-2" />Notes étudiants</li>
    </RouterLink> 
  </template>
  
  <script setup>
  import { PencilSquareIcon, ArrowDownOnSquareStackIcon } from '@heroicons/vue/24/outline'
  </script>
  
  <style src="../../styles/Dashboard.css" scoped></style>
  