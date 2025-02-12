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
    <ListeEtudiantPdf v-if="show.showListeEtudiantPdf" />
    <ListeDeliberation v-if="show.showListeEtudiantPdfDelib" />
    <ListeNoteParEC v-if="show.showListeNoteEtudiantPdf" />
    <CarteEtudiant v-if="show.showCarteEtudiant" />
    <ReleveNotePdf v-if="show.showReleveNotePdf" />
    <EDTpdf v-if="show.showEDTpdf" />
    <FacturePdf v-if="show.showFacturepdf" />
    <RapportCaissePdf v-if="show.showCaissepdf" />
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
  <Teleport to="body">
    <ValiderInscription />
  </Teleport>
  <Teleport to="body">
    <ShowEtudiantInfos />
  </Teleport>
  <Teleport to="body">
    <DeleteUE />
  </Teleport>
  <Teleport to="body">
    <DeleteEC />
  </Teleport>
  <Teleport to="body">
    <DeletePost />
  </Teleport>
  <Teleport to="body">
    <CreatePost />
  </Teleport>
  <Teleport to="body">
    <CreateGroupe />
  </Teleport>
  <Teleport to="body">
    <ListeNotesEtudiant />
  </Teleport>
  <Teleport to="body">
    <CreateSalle />
  </Teleport>
  <Teleport to="body">
    <DeleteSalle />
  </Teleport>
  <Teleport to="body">
    <DeleteGroup />
  </Teleport>
  <Teleport to="body">
    <DeleteEDT />
  </Teleport>
  <Teleport to="body">
    <EDT />
  </Teleport>
  <Teleport to="body">
    <SetGroupMember />
  </Teleport>
  <Teleport to="body">
    <SetGroup />
  </Teleport>
  <Teleport to="body">
    <QuitterGroup />
  </Teleport>
</template>

<script setup>
import WorkSpaceHome from './views/WorkSpaceHome.vue'
import WorkSpaceFirstConfig from './views/WorkSpaceFirstConfig.vue'
import WorkSpaceLogin from './views/WorkSpaceLogin.vue'
import WorkSpaceDash from './views/WorkSpaceDash.vue'
import Deconnexion from './components/Deconnexion.vue'
import CreateAU from './components/CreateAU.vue'
import CreateSalle from './components/CreateSalle.vue'
import CreatePost from './components/CreatePost.vue'
import FormatExcel from './components/FormatExcel.vue'
import CreateNiveau from './components/CreateNiveau.vue'
import CreateSemestre from './components/CreateSemestre.vue'
import Alert from './components/Alert.vue'
import ShowMdpAS from './components/ShowMdpAS.vue'
import ShowEtudiantInfos from './components/ShowEtudiantInfos.vue'
import ShowMdpENS from './components/ShowMdpENS.vue'
import ShowMdpEtudiant from './components/ShowMdpEtudiant.vue'
import ValiderInscription from './components/ValiderInscription.vue'
import DeletetUser from './components/delete/DeleteUser.vue'
import DeleteAU from './components/delete/DeleteAU.vue'
import DeleteNiveau from './components/delete/DeleteNiveau.vue'
import DeleteMention from './components/delete/DeleteMention.vue'
import DeleteEC from './components/delete/DeleteEC.vue'
import DeleteSemestre from './components/delete/DeleteSemestre.vue'
import DeletePost from './components/delete/DeletePost.vue'
import DeleteParcours from './components/delete/DeleteParcours.vue'
import DeleteUE from './components/delete/DeleteUE.vue'
import DeleteEDT from './components/delete/DeleteEDT.vue'
import DeleteSalle from './components/delete/DeleteSalle.vue'
import ListeEtudiantPdf from './components/ListeEtudiantPdf.vue'
import ListeDeliberation from './components/ListeDeliberation.vue'
import ListeNoteParEC from './components/ListeNoteParEC.vue'
import CarteEtudiant from './components/CarteEtudiant.vue'
import EDTpdf from './components/EDTpdf.vue'
import FacturePdf from './components/FacturePdf.vue'
import EDT from './components/EDT.vue'
import ListeNotesEtudiant from './components/ListeNotesEtudiant.vue'
import ReleveNotePdf from './components/ReleveNotePdf.vue'
import RapportCaissePdf from './components/RapportCaissePdf.vue'
import Overlay from './components/Overlay.vue'
import { onBeforeMount, onMounted } from 'vue'
import { useShow } from '@/stores/Show'
import { useEtablissement } from '@/stores/Etablissement'
import CreateGroupe from './components/CreateGroupe.vue'
import DeleteGroup from './components/delete/DeleteGroup.vue'
import SetGroupMember from './components/SetGroupMember.vue'
import SetGroup from './components/SetGroup.vue'
import QuitterGroup from './components/QuitterGroup.vue'
import { useAnnonce } from '@/stores/Annonce'
import { useCategory } from '@/stores/Category'


const show = useShow()
const etablissement = useEtablissement()
const annonces = useAnnonce()
const category = useCategory()


onMounted(() => {
  setInterval(updateTime, 9000)
  updateTime()
})

function updateTime() {
  annonces.listAnnonce.forEach((ann) => {
    ann.timeAgo = timeAgo(new Date(ann.created_at))
  })
}

function timeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} s${diffInSeconds > 1 ? '' : ''}`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? '' : ''}`
  } else if (diffInHours < 24) {
    return `${diffInHours} h${diffInHours > 1 ? '' : ''}`
  } else if (diffInDays < 30) {
    return `${diffInDays} j${diffInDays > 1 ? '' : ''}`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} mois`
  } else {
    return `${diffInYears} an${diffInYears > 1 ? 's' : ''}`
  }
}

onBeforeMount(
  async () => {
    updateTime();
    await Promise.all([annonces.getAllAnnonce(), etablissement.getEtab(), category.getAllCategorie()])
  }
)
</script>

<style scoped src="./styles/App.css"></style>
