<template>
  <RouterLink class="hidden" to="/Utilisateurs">
    <li>
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Gestion RH
    </li>
  </RouterLink>
  <RouterLink to="/directeur/Droits">
    <li>
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Gestion des droits
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
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Etats financiers
    </li>
  </RouterLink>
  <RouterLink to="/directeur/CongePermission">
    <li class="flex items-center">
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Congés - Permissions
    </li>
  </RouterLink>
</template>

<script setup>
import { UserGroupIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped src="../../styles/Dashboard.css"></style>
