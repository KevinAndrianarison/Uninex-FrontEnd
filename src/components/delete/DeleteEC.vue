<script setup>
import { useShow } from '@/stores/Show'
import { useEc } from '@/stores/Ec'
import axios from 'axios'
import { useUrl } from '@/stores/url'

const show = useShow()
const ec = useEc()
const URL = useUrl().url

function closeModaleDelEC() {
  show.showDeletEC = false
}

function deleteUE() {
  ec.deleteEC()
  closeModaleDelEC()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeletEC">
      <div class="formModal">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ ec.nomEC }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="deleteUE()">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelEC()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
