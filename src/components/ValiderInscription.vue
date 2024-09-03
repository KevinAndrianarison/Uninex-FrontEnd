<script setup>
import { useShow } from '@/stores/Show'
import { useEtudiant } from '@/stores/Etudiant'

const show = useShow()
const etudiant = useEtudiant()

function closeValiderInscription() {
  show.showValiderInscription = false
}

function ValiderInscription() {
  etudiant.setValiditeInscriptionEtudiant()
  closeValiderInscription()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showValiderInscription">
      <div class="formModal">
        <h6 class="login">
          Voulez-vous vraiment valider l'inscription de "<b>{{ etudiant.etudnomComplet }} </b>" ?
        </h6>
        <div class="valider">
          <button type="button" class="Modifier btn btn-primary mt-5" @click="ValiderInscription()">
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeValiderInscription()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
