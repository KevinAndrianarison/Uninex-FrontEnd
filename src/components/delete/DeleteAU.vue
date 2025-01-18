<script setup>
import { useShow } from '@/stores/Show'
import { useAu } from '@/stores/Au'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const au = useAu()
const theme = useTheme()

function closeModaleDelAU() {
  show.showDeleteAU = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteAU">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ au.oneAU }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="au.deleteAU()">
            OUI
          </button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelAU()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
