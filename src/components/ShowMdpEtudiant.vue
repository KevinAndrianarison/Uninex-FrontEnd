<script setup>
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { useEtudiant } from '@/stores/Etudiant'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const password = usePassword()
const etudiant = useEtudiant()
const theme = useTheme()

function createMdpEtudiant() {
  show.showMdpEtudiant = false
  etudiant.setMdpEtudiant()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showMdpEtudiant">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <h6>
          Veuillez copier ce mot de passe qui vous a été attribué "<b>{{ password.password }}</b
          >", puis cliquez sur "<b>OK</b>"
        </h6>
        <div class="valider">
          <button type="submit" class="Modifier btn btn-primary mt-5" @click="createMdpEtudiant()">
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
