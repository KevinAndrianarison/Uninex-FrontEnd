<script setup>
import { useShow } from '@/stores/Show'
import { useGroupe } from '../stores/groupe'
import { useUrl } from '@/stores/url'
import axios from 'axios'

const show = useShow()
const groupe = useGroupe()
const URL = useUrl().url

function closeQuitterGroup() {
  show.showQuitGroup = false
}

function quitter() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  show.showSpinner = true
  axios
    .delete(`${URL}/api/groups/${groupe.groupeId}/members/${user.user.id}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      groupe.showChatGroup = false
      show.showUserList = true
      show.showQuitGroup = false
      show.showSpinner = false
      groupe.getgroupes(user.user.id)
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showQuitGroup">
      <div class="formModal">
        <h6 class="login">
          Voulez-vous vraiment quitter « <b>{{ groupe.groupeName }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="quitter()">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeQuitterGroup()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
