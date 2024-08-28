<script setup>
import { useShow } from '@/stores/Show'

const show = useShow()

function deconnexion(){
  show.showDeconnexion = false
}

</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeconnexion">
      <div class="formModal">
        <h6 class="login">Voulez-vous vraiment quitter ?</h6>
        <div class="valider">
          <button type="submit" class="Modifier btn btn-primary mt-5">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="deconnexion()">NON</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
