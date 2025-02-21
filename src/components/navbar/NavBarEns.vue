<template>
  <RouterLink to="/enseignant/PublierCours">
    <li><ArrowDownOnSquareStackIcon class="h-5 w-5 mr-2" /> Publier des cours</li>
  </RouterLink>
  <RouterLink to="/enseignant/TrascrireNotes">
    <li><PencilSquareIcon class="h-5 w-5 mr-2" />Notes étudiants</li>
  </RouterLink>
  <RouterLink to="/DemandeConge">
    <li><ClipboardDocumentCheckIcon class="h-5 w-5 mr-2" />Demande de congé</li>
  </RouterLink>
</template>

<script setup>
import { PencilSquareIcon, ArrowDownOnSquareStackIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'
</script>

<style src="../../styles/Dashboard.css" scoped></style>
