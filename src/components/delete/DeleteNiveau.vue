<script setup>
import { useShow } from '@/stores/Show'
import { useNiveau } from '@/stores/Niveau'
import { useTheme } from '@/stores/Theme'


const show = useShow()
const niveau = useNiveau()
const theme = useTheme()

function closeModaleDelNiveau() {
  show.showDeleteNiveau = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteNiveau">
        <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ niveau.niveau.nom_niveau }}</b> » ?
        </h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="niveau.deleteNiveau()">
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDelNiveau()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
