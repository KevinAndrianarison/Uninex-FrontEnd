<script setup>
import { useShow } from '@/stores/Show'
import { useUe } from '@/stores/Ue'

const show = useShow()
const ue = useUe()

function closeModaleDelUE() {
  show.showDeleteUE = false
}

function deleteUE() {
  ue.deleteUE()
  closeModaleDelUE()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteUE">
      <div class="formModal">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ ue.nomUE }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="deleteUE()">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelUE()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
