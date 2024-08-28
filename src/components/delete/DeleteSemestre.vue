<script setup>
import { useShow } from '@/stores/Show'
import { useSemestre } from '@/stores/Semestre'


const show = useShow()
const semestre = useSemestre()


function closeModaleDelSemestre() {
  show.showDeleteSemestre = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteSemestre">
      <div class="formModal">
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
