<script setup>
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const user = useUser()
const theme = useTheme()

function closeModaleDelUser() {
  show.showDeleteusers = false
}

function supprUser() {
  user.supprUser()
  closeModaleDelUser()
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showDeleteusers">
      <div :class="theme.theme === 'light' ? '' : '!bg-gray-500 !text-white'" class="formModal">
        <h6 class="login">Voulez-vous vraiment supprimer ce compte ?</h6>
        <div class="valider">
          <button type="button" class="delete btn btn-primary mt-5" @click="supprUser()">
            OUI
          </button>
          <button type="button" class="Annuller btn btn-primary mt-5" @click="closeModaleDelUser()">
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../../styles/Modale.css"></style>
