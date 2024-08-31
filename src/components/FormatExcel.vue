<script setup>
import { useShow } from '@/stores/Show'

const show = useShow()

function close() {
  show.showFormatExcel = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showFormatExcel">
      <div class="formMod">
        <p class="infos">Assurez-vous que votre fichier Excel a la structure suivante :</p>
        <div class="class formInputs mt-4"></div>

        <div class="valide">
          <button type="submit" @click="close()" class="Modifie btn btn-primary mt-4">
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
