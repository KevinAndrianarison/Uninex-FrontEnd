<script setup>
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { useEnseignant } from '@/stores/Enseignant'

const show = useShow()
const password = usePassword()
const enseignant = useEnseignant()

function createENS() {
  show.showMdpENS = false
  enseignant.createEnseignant()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showMdpENS">
      <div class="formModal">
        <h6>
          Veuillez copier ce mot de passe qui vous a été attribué "<b>{{ password.password }}</b
          >", puis cliquez sur "<b>OK</b>"
        </h6>
        <div class="valider">
          <button type="submit" class="Modifier btn btn-primary mt-5" @click="createENS()">
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
