<script setup>
import { useShow } from '@/stores/Show'
import { useSalle } from '@/stores/Salle'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import axios from 'axios'

const show = useShow()
const salles = useSalle()
const URL = useUrl().url
const messages = useMessages()


function closeModaleDelSalle() {
  show.showDeletSalle = false
}

function DelSalle() {
  show.showSpinner = true

  axios
    .delete(`${URL}/api/salle/${salles.idSalle}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      salles.getallAU()
      messages.messageSucces = 'Salle supprimée !'
      show.showDeletSalle = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      show.showSpinner = false
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeletSalle">
      <div class="formModal">
        <h6 class="login">
          Des «<b> données </b>» risquent d'être perdues, voulez-vous vraiment supprimer «
          <b>{{ salles.NomSalle }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="DelSalle()">OUI</button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDelSalle()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
