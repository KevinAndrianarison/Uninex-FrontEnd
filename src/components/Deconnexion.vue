<script setup>
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'
import { useRouter } from 'vue-router'
import { useInfossetup } from '@/stores/Infossetup'


const show = useShow()
const user = useUser()
const router = useRouter()
const infossetup = useInfossetup()


function Canceldeconnexion() {
  show.showDeconnexion = false
}

function deconnexion() {
  user.email = ''
  infossetup.nom = ''
  infossetup.grade = ''
  infossetup.telephone = null
  localStorage.removeItem('auth_token')
  const userString = localStorage.getItem('user')
  Canceldeconnexion()
  show.showAdmin = false
  const users = JSON.parse(userString)
  if (users.user.status_user === 'Directeur') {
    show.showNavBarDir = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'AS') {
    show.showNavBarAS = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'Etudiant') {
    show.showNavBarEtud = false
    localStorage.removeItem('user')
  }
  if (users.chefMention_status === '1') {
    show.showNavBarRespMention = false
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
