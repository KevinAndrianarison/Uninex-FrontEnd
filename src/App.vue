<template>
  <div class="app">
    <Transition>
      <WorkSpaceHome v-if="show.showHome" />
    </Transition>
    <Transition>
      <WorkSpaceFirstConfig v-if="show.showFirstConfig" />
    </Transition>
    <Transition>
      <WorkSpaceLogin v-if="show.showLogin" />
    </Transition>
    <Transition>
      <WorkSpaceDash v-if="show.showAdmin" />
    </Transition>
  </div>
  <Teleport to="body">
    <Overlay />
  </Teleport>
  <Teleport to="body">
    <Deconnexion />
  </Teleport>
  <Teleport to="body">
    <DeletetUser />
  </Teleport>
  <Teleport to="body">
    <ShowMdpAS />
  </Teleport>
  <Teleport to="body">
    <ShowMdpENS />
  </Teleport>
  <Teleport to="body">
    <CreateAU />
  </Teleport>
  <Teleport to="body">
    <DeleteAU />
  </Teleport>
  <Teleport to="body">
    <CreateNiveau />
  </Teleport>
  <Teleport to="body">
    <DeleteNiveau />
  </Teleport>
  <Teleport to="body">
    <Alert />
  </Teleport>
  <Teleport to="body">
    <DeleteMention />
  </Teleport>
  <Teleport to="body">
    <DeleteParcours />
  </Teleport>
  <Teleport to="body">
    <CreateSemestre />
  </Teleport>
  <Teleport to="body">
    <DeleteSemestre />
  </Teleport>
  <Teleport to="body">
    <FormatExcel />
  </Teleport>
  <Teleport to="body">
    <ShowMdpEtudiant />
  </Teleport>
</template>

<script setup>
import WorkSpaceHome from './views/WorkSpaceHome.vue'
import WorkSpaceFirstConfig from './views/WorkSpaceFirstConfig.vue'
import WorkSpaceLogin from './views/WorkSpaceLogin.vue'
import WorkSpaceDash from './views/WorkSpaceDash.vue'
import Deconnexion from './components/Deconnexion.vue'
import CreateAU from './components/CreateAU.vue'
import FormatExcel from './components/FormatExcel.vue'
import CreateNiveau from './components/CreateNiveau.vue'
import CreateSemestre from './components/CreateSemestre.vue'
import Alert from './components/Alert.vue'
import ShowMdpAS from './components/ShowMdpAS.vue'
import ShowMdpENS from './components/ShowMdpENS.vue'
import ShowMdpEtudiant from './components/ShowMdpEtudiant.vue'
import DeletetUser from './components/delete/DeleteUser.vue'
import DeleteAU from './components/delete/DeleteAU.vue'
import DeleteNiveau from './components/delete/DeleteNiveau.vue'
import DeleteMention from './components/delete/DeleteMention.vue'
import DeleteSemestre from './components/delete/DeleteSemestre.vue'
import DeleteParcours from './components/delete/DeleteParcours.vue'

import Overlay from './components/Overlay.vue'

import { useShow } from '@/stores/Show'

const show = useShow()
</script>

<style scoped src="./styles/App.css"></style>
