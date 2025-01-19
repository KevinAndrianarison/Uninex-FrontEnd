<script setup>
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useEdt } from '@/stores/Edt'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const messages = useMessages()
const edt = useEdt()
const URL = useUrl().url
const theme = useTheme()

function closeModaleDelEDT() {
  show.showDeletEDT = false
}

function DelEDT() {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/grpedt/${edt.idEDT}`)
    .then((response) => {
      messages.messageSucces = 'Emplois du temps supprimé avec succès !'
      edt.getByIdAU()
      show.showDeletEDT = false
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
    <div class="showModal" v-if="show.showDeletEDT">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">Voulez-vous vraiment supprimer cet emplois du temps ?</h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="DelEDT()">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelEDT()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
