<script setup>
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const password = usePassword()
const agentscolarite = useAgentscolarite()
const theme = useTheme()


function createAS() {
  show.showMdpAS = false
  agentscolarite.createScolarite()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showMdpAS">
      <div
       :class="theme.theme === 'light' ? '' : '!bg-gray-500 !text-white'"
       class="formModal">
        <h6>
          Veuillez copier ce mot de passe qui vous a été attribué "<b>{{ password.password }}</b
          >", puis cliquez sur "<b>OK</b>"
        </h6>
        <div class="valider">
          <button type="submit" class="Modifier btn btn-primary mt-5" @click="createAS()">
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
