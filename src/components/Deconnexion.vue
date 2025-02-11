<script setup>
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'
import { useRouter } from 'vue-router'
import { useInfossetup } from '@/stores/Infossetup'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'


const show = useShow()
const au = useAu()
const user = useUser()
const router = useRouter()
const infossetup = useInfossetup()
const theme = useTheme()

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
  show.showDeconnexion = false
  show.showAdmin = false
  // ----------------------------------------
  au.oneAU = ""
  au.oneAUSelectFind = ""
  au.nomAUDelib = ""
  au.nomAUDelibRed = ""
  // ----------------------------------------

  const users = JSON.parse(userString)
  if (users.user.status_user === 'Directeur') {
    show.showNavBarDir = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'ADMIN') {
    show.showNavBarAdmin = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'AS') {
    show.showNavBarAS = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'SECPAL') {
    show.showNavBarAS = false
    show.showNavBarSECPAL = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'Etudiant') {
    show.showNavBarEtud = false
    localStorage.removeItem('user')
  }
  if (users.user.status_user === 'ENS') {
    show.showNavBarEns = false
    show.showNavBarRespMention = false
    show.showNavBarRespParcours = false
    localStorage.removeItem('user')
  }
  router.push('/')
  show.showLogin = true
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeconnexion">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal  !bg-gray-500 text-white'">
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
