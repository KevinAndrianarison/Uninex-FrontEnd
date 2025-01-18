<script setup>
import { useShow } from '@/stores/Show'
import { useParcour } from '@/stores/Parcour'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const parcour = useParcour()
const theme = useTheme()

function closeModaleDelParcour() {
  show.showDeleteParcour = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteParcour">
        <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ parcour.parcours_abr }}</b> » ?
        </h6>
        <div class="valider">
          <button
            type="button"
            class="delete btn btn-primary mt-5"
            @click="parcour.deleteParcours()"
          >
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDelParcour()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
