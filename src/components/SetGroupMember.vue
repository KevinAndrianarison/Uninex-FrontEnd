<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Tooltip from '../components/Tooltip.vue'
import { useGroupe } from '../stores/groupe'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { useUser } from '@/stores/User'
import { ref, computed } from 'vue'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const groupe = useGroupe()
const URL = useUrl().url
const messages = useMessages()
const user = useUser()
const theme = useTheme()

const searchQuery = ref('')

function addMember(id) {
  let formData = {
    user_id: id
  }
  searchQuery.value = ''
  axios
    .post(`${URL}/api/groups/${groupe.groupeId}/members`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      groupe.getmembres()
    })
    .catch((error) => {
      console.error(error)
    })
}

function closeSetgroupMember() {
  show.showSetGroupMember = false
}

const filteredMembres = computed(() => {
  return user.listUser.filter(
    (membre) =>
      membre.email.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      !groupe.membres.some((selected) => selected.id === membre.id)
  )
})

function removeMember(id) {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/groups/${groupe.groupeId}/members/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      groupe.getmembres()
      messages.messageSucces = 'Membre retiré !'
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
    <div class="showModal" v-if="show.showSetGroupMember">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeSetgroupMember()">
            <XMarkIcon
            :class="theme.theme === 'light' ? '' : '!text-gray-200 '"
             class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold">
          <font-awesome-icon
          :class="theme.theme === 'light' ? '' : '!text-white '"
            class="iconadd text-gray-500 cursor-pointer mr-2"
            :icon="['fas', 'gear']"
          />
          Gérer les membres
        </h1>
        <input
          type="text"
          placeholder="Nouveau membre"
          v-model="searchQuery"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="text-black focus:outline-none border w-full mt-4 px-4 p-1.5 text-sm rounded focus:border-2 transition border-blue-500"
        />
        <ul
          v-if="searchQuery && filteredMembres.length"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="text-black bg-white border rounded mt-1 max-h-40 overflow-auto text-sm max-h-[150px] overflow-y-auto"
        >
          <li
            v-for="(membre, index) in filteredMembres"
            :key="membre.id"
            class="p-2 hover:bg-gray-100 cursor-pointer"
            @click="addMember(membre.id)"
          >
            {{ membre.email }}
          </li>
        </ul>
        <div class="mt-4">
          <div
            :key="index"
            v-for="(membre, index) in groupe.membres"
            class="flex text-sm items-center justify-between hover:bg-blue-200 hover:text-black p-2 px-4 rounded-2xl"
          >
            <p>{{ membre.email }}</p>
            <Tooltip content="Retirer">
              <XMarkIcon
                @click="removeMember(membre.id)"
                class="h-5 w-5 text-red-500 cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
