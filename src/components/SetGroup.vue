<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useGroupe } from '../stores/groupe'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const groupe = useGroupe()
const URL = useUrl().url
const messages = useMessages()
const theme = useTheme()

let nomAdmin = ref('')

function closeSetgroup() {
  show.showSetGroup = false
}

function putAdmin(id) {
  let formData = {
    user_id: id
  }
  putGroupe(formData)
}

function putNomAdmin() {
  let formData = {
    name: groupe.groupeNameToPUT
  }
  putGroupe(formData)
}

function putGroupe(formData) {
  show.showSpinner = true
  axios
    .put(`${URL}/api/putgroups/${groupe.groupeId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      groupe.groupeName = response.data.name
      groupe.groupeNameToPUT = response.data.name
      groupe.idAdmin = response.data.user_id
      messages.messageSucces = 'Modification succés !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      show.showSpinner = false
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showSetGroup">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeSetgroup()">
            <XMarkIcon 
            :class="theme.theme === 'light' ? '' : '!text-red-500'"
            class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold">
          <font-awesome-icon
          :class="theme.theme === 'light' ? '' : '!text-white'"
            class="iconadd text-gray-500 cursor-pointer mr-2"
            :icon="['fas', 'gear']"
          />
          Modifier votre groupe
        </h1>
        <input
          type="text"
          placeholder="Nom du groupe"
          v-model="groupe.groupeNameToPUT"
          @blur="putNomAdmin"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="text-black focus:outline-none border w-full mt-2 px-4 p-2 text-sm rounded-2xl focus:border-2 transition border-blue-500"
        />
        <div class="flex flex-col">
          <label class="text-sm mt-4">
            <font-awesome-icon
            :class="theme.theme === 'light' ? '' : '!text-white'"
              class="text-gray-500 cursor-pointer mr-2"
              :icon="['fas', 'rotate']"
            />
            Changer l'administrateur du groupe :
          </label>
          <select
            @change="() => putAdmin(nomAdmin)"
            v-model="nomAdmin"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="text-black py-2 px-4 mt-2 rounded-2xl border focus:outline-none text-xs"
          >
            <option
              v-for="(membre, index) in groupe.membresForAdmin"
              :key="membre.id"
              :value="membre.id"
              class="text-sm overflow-y-auto max-h-[100px]"
            >
              {{ membre.email }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
