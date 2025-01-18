<script setup>
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import axios from 'axios'
import { useGroupe } from '../../stores/groupe'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const URL = useUrl().url
const messages = useMessages()
const groupe = useGroupe()
const theme = useTheme()

function closeModaleDelGroup() {
  show.showDeleteGroup = false
}

function DelGroupe() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  show.showSpinner = true

  axios
    .delete(`${URL}/api/groups/${groupe.groupeId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      groupe.getgroupes(user.user.id)
      groupe.showChatGroup = false
      show.showUserList = true
      messages.messageSucces = 'Groupe supprimée !'
      show.showDeleteGroup = false
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
    <div class="showModal" v-if="show.showDeleteGroup">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">
          Voulez-vous vraiment supprimer «
          <b>{{ groupe.groupeName }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="DelGroupe()">
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDelGroup()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
