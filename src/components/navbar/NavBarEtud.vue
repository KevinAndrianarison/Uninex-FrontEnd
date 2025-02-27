<template>
  <RouterLink class="hidden" to="/etudiant/Inscription">
    <li><PencilSquareIcon class="h-5 w-5 mr-2" /> M'inscrire</li>
  </RouterLink>
  <RouterLink class="hidden" to="/etudiant/CoursEtudiant">
    <li><DocumentDuplicateIcon class="h-5 w-5 mr-2" /> Mes cours</li>
  </RouterLink>
  <RouterLink class="hidden" to="/etudiant/NotesEtudiant">
    <li><FolderOpenIcon class="h-5 w-5 mr-2" /> Mes notes</li>
  </RouterLink>
  <RouterLink class="hidden" to="/etudiant/Cours">
    <li><DocumentDuplicateIcon class="h-5 w-5 mr-2" /> Mes cours</li>
  </RouterLink>
  <RouterLink to="/etudiant/Cursus">
    <li><FolderOpenIcon class="h-5 w-5 mr-2" /> Cursus</li>
  </RouterLink>
  <RouterLink to="/etudiant/mescommandes">
    <li><InboxArrowDownIcon class="h-5 w-5 mr-2" /> Mes commandes</li>
  </RouterLink>
  <RouterLink to="/etudiant/contacter">
    <li><EnvelopeIcon class="h-5 w-5 mr-2" /> Contacter</li>
  </RouterLink>
</template>

<script setup>
import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  FolderOpenIcon,
  EnvelopeIcon,
  InboxArrowDownIcon
} from '@heroicons/vue/24/outline'
</script>

<style src="../../styles/Dashboard.css" scoped></style>
