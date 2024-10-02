<template>
  <nav class="sidebar">
    <ul class="mt-5">
      <RouterLink to="/">
        <li><NewspaperIcon class="h-5 w-5 mr-2" /> Annonces</li>
      </RouterLink>

      <NavBarDir v-if="show.showNavBarDir" />
      <NavBarAS v-if="show.showNavBarAS" />
      <NavBarEtud v-if="show.showNavBarEtud" />
      <NavBarRespMention v-if="show.showNavBarRespMention" />
      <NavBarRespParcours v-if="show.showNavBarRespParcours" />
      <NavBarEns v-if="show.showNavBarEns" />

      <RouterLink to="/Discussion">
        <li><ChatBubbleLeftRightIcon class="h-5 w-5 mr-2" /> Discussions</li>
      </RouterLink>
    </ul>
    <ul class="ulbottom">
      <RouterLink to="/Configuration">
        <li class="bottom"><WrenchScrewdriverIcon class="h-6 w-6 mr-2" />Configurations</li>
      </RouterLink>

      <li @click="showlogout()" class="bottom">
        <ArrowRightStartOnRectangleIcon class="h-6 w-6 mr-2" />Déconnexion
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'
import { useShow } from '@/stores/Show'
import NavBarDir from './navbar/NavBarDir.vue'
import NavBarAS from './navbar/NavBarAS.vue'
import NavBarEtud from './navbar/NavBarEtud.vue'
import NavBarRespMention from './navbar/NavBarRespMention.vue'
import NavBarRespParcours from './navbar/NavBarRespParcours.vue'
import NavBarEns from './navbar/NavBarEns.vue'

const show = useShow()

function showlogout() {
  show.showDeconnexion = true
}
</script>

<style scoped src="../styles/Dashboard.css"></style>
