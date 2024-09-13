<template>
    <RouterLink to="/etudiant/Inscription">
      <li><DocumentPlusIcon class="h-5 w-5 mr-2" />Notes étudiants</li>
    </RouterLink>
    <RouterLink to="/etudiant/Cours">
      <li><FireIcon class="h-5 w-5 mr-2" />Résultats finaux</li>
    </RouterLink>

  </template>
  
  <script setup>
  import { FolderOpenIcon,FireIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline'
  </script>
  
  <style src="../../styles/Dashboard.css" scoped></style>
  