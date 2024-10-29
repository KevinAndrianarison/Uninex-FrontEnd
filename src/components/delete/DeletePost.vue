<script setup>
import { useShow } from '@/stores/Show'

const show = useShow()

function closeModaleDelPost() {
  show.showDeletePost = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeletePost">
      <div class="formModal">
        <h6 class="login">Voulez-vous vraiment supprimer ce poste ?</h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5">OUI</button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelPost()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
