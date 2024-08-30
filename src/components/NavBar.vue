<template>
  <nav class="sidebar">
    <ul>
      <RouterLink to="/">
        <li><NewspaperIcon class="h-5 w-5 mr-2" /> Annonces</li>
      </RouterLink>


       <NavBarDir v-if="show.showNavBarDir"/>
      <RouterLink to="/Discussion">
        <li><ChatBubbleLeftRightIcon class="h-5 w-5 mr-2" /> Discussions</li>
      </RouterLink>
    </ul>
    <ul class="ulbottom">
      <li class="bottom"><Cog6ToothIcon class="h-6 w-6 mr-2" />Paramètres</li>
      <li @click="showlogout()" class="bottom">
        <ArrowRightStartOnRectangleIcon class="h-6 w-6 mr-2" />Déconnexion
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon
} from '@heroicons/vue/24/outline'
import { useShow } from '@/stores/Show'
import NavBarDir from './navbar/NavBarDir.vue'

const show = useShow()

function showlogout() {
  show.showDeconnexion = true
}
</script>

<style scoped src="../styles/Dashboard.css"></style>
