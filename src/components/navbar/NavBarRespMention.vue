<template>
    <RouterLink to="/chefDeMention/GestionUE">
      <li><PlusCircleIcon class="h-5 w-5 mr-2" /> Gestion UE</li>
    </RouterLink>
    <RouterLink to="/chefDeMention/GestionEC">
      <li><PlusCircleIcon class="h-5 w-5 mr-2" /> Gestion EC</li>
    </RouterLink>
    <RouterLink to="/ListeEtudiant">
      <li><RectangleStackIcon class="h-5 w-5 mr-2" /> Liste des étudiants</li>
    </RouterLink>
  </template>
  
  <script setup>
  import { PlusCircleIcon, RectangleStackIcon } from '@heroicons/vue/24/outline'
  </script>
  
  <style src="../../styles/Dashboard.css" scoped></style>
  