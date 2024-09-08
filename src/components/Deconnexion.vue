<script setup>
import { useShow } from '@/stores/Show'
import { useRouter } from 'vue-router'

const show = useShow()
const router = useRouter();


function Canceldeconnexion() {
  show.showDeconnexion = false
}

function deconnexion() {
  localStorage.removeItem('auth_token')
  const userString = localStorage.getItem('user')
  Canceldeconnexion()
  show.showAdmin = false
  const user = JSON.parse(userString)
  if (user.user.status_user === 'Directeur') {
    show.showNavBarDir = false
    localStorage.removeItem('user')
  }
  if (user.user.status_user === 'AS') {
    show.showNavBarAS = false
    localStorage.removeItem('user')
  }
  router.push('/')
  show.showLogin = true
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeconnexion">
      <div class="formModal">
        <h6 class="login">Voulez-vous vraiment quitter ?</h6>
        <div class="valider">
          <button type="submit" class="Modifier btn btn-primary mt-5" @click="deconnexion()">
            OUI
          </button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="Canceldeconnexion()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
