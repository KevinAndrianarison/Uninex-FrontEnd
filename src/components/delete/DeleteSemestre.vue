<script setup>
import { useShow } from '@/stores/Show'
import { useSemestre } from '@/stores/Semestre'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const semestre = useSemestre()
const theme = useTheme()

function closeModaleDelSemestre() {
  show.showDeleteSemestre = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteSemestre">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ semestre.semestre.nom }}</b> » ?
        </h6>
        <div class="valider">
          <button
            type="button"
            class="delete btn btn-primary mt-5"
            @click="semestre.deleteSemestre()"
          >
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDelSemestre()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
