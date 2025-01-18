<script setup>
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useAnnonce } from '@/stores/Annonce'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const messages = useMessages()
const annonce = useAnnonce()
const theme = useTheme()
const URL = useUrl().url

function closeModaleDelPost() {
  show.showDeletePost = false
}

function DelPost() {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/annonce/${annonce.idAnnonce}`)
    .then((response) => {
      annonce.getAllAnnonce()
      messages.messageSucces = 'Annonce supprimé avec succès !'
      show.showDeletePost = false
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeletePost">
      <div :class="theme.theme === 'light' ? '' : '!bg-gray-500 text-white'" class="formModal">
        <h6 class="login">Voulez-vous vraiment supprimer ce poste ?</h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="DelPost()">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelPost()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
