<script setup>
import { useShow } from '@/stores/Show'
import { useMention } from '@/stores/Mention'

const show = useShow()
const mention = useMention()

function closeModaleDeMention() {
  show.showDeleteMention = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteMention">
      <div class="formModal">
        <h6 class="login">
          Des données «<b> importantes </b>» risquent d'être perdues, voulez-vous vraiment supprimer
          « <b>{{ mention.mention.abr_mention }}</b> » ?
        </h6>
        <div class="valider">
          <button
            type="button"
            class="delete btn btn-primary mt-5"
            @click="mention.deleteMention()"
          >
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeModaleDeMention()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
