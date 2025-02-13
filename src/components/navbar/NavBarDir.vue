<template>
  <RouterLink class="hidden" to="/Utilisateurs">
    <li>
      <UserGroupIcon class="h-5 w-5 mr-2" />
      Gestion RH
    </li>
  </RouterLink>
</template>

<script setup>
import { UserGroupIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped src="../../styles/Dashboard.css"></style>
