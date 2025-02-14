<template>
  <RouterLink class="hidden" to="/Utilisateurs">
    <li>
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Gestion RH
    </li>
  </RouterLink>
  <RouterLink to="/directeur/Droits">
    <li>
      <BanknotesIcon class="h-5 w-5 mr-2" />
      Gestion des Frais
    </li>
  </RouterLink>
  <RouterLink to="/directeur/RH">
    <li>
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Gestion RH
    </li>
  </RouterLink>
  <RouterLink to="/directeur/EtatsFinanciers">
    <li>
      <PresentationChartLineIcon class="h-5 w-5 mr-2" />
      États financiers
    </li>
  </RouterLink>
  <RouterLink to="/directeur/CongePermission">
    <li class="flex items-center">
      <ClipboardDocumentCheckIcon class="h-5 w-5 mr-2" />
      Gestion d'absences
    </li>
  </RouterLink>
</template>

<script setup>
import { UserGroupIcon, PresentationChartLineIcon, BanknotesIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped src="../../styles/Dashboard.css"></style>
