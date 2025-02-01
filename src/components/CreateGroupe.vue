<script setup>
import { ref, computed } from 'vue'
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/User'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useUrl } from '@/stores/url'
import { useGroupe } from '../stores/groupe'
import { useTheme } from '@/stores/Theme'
import "emoji-picker-element";
import Tooltip from '../components/Tooltip.vue'


const showEmojiPickerGRP = ref(false) 
const GRPInput = ref(null);


const show = useShow()
const user = useUser()
const URL = useUrl().url
const messages = useMessages()
const groupe = useGroupe()
const theme = useTheme()

function closeCreateGroup() {
  show.showCreateGroup = false
  showEmojiPickerGRP.value = false
}

function toggleEmojiPickerGRP() {
  showEmojiPickerGRP.value = !showEmojiPickerGRP.value
}

function addEmojiGRP(event) {
  const input = GRPInput.value;
  const emoji = event.detail.unicode;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  nomGroup.value = nomGroup.value.substring(0, start) + emoji + nomGroup.value.substring(end);
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
  }, 0);

}

const selectedMembres = ref([])
const searchQuery = ref('')
const nomGroup = ref('')

const filteredMembres = computed(() => {
  return user.listUser.filter(
    (membre) =>
      membre.email.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      !selectedMembres.value.some((selected) => selected.id === membre.id)
  )
})

function addMembre(membre) {
  selectedMembres.value.push(membre)
  searchQuery.value = ''
}

function removeMembre(id) {
  selectedMembres.value = selectedMembres.value.filter((membre) => membre.id !== id)
}

function createGroupe() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  show.showSpinner = true
  let formData = {
    name: nomGroup.value,
    user_id: user.user.id
  }

  axios
    .post(`${URL}/api/groups`, formData)
    .then((response) => {
      let idGroupe = response.data.id
      messages.messageSucces = 'Groupe créer avec succés !'
      nomGroup.value = ''
      show.showCreateGroup = false
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)

      let form = {
        user_id: user.user.id
      }
      axios
        .post(`${URL}/api/groups/${idGroupe}/members`, form)
        .then((response) => {})
        .catch((err) => {
          console.error(err)
        })

      selectedMembres.value.forEach((list) => {
        let formdata = {
          user_id: list.id
        }
        axios
          .post(`${URL}/api/groups/${idGroupe}/members`, formdata)
          .then((response) => {
            groupe.getgroupes(user.user.id)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      selectedMembres.value = []
    })
    .catch((err) => {
      console.error()
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreateGroup">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateGroup()">
            <XMarkIcon
            :class="theme.theme === 'light' ? '' : '!text-red-500'"
             class="h-6 w-6" />
          </button>
        </div>
        <p class="font-bold">
          <font-awesome-icon :icon="['fas', 'users']" class="text-gray-500 mr-2" />Nouveau groupe :
        </p>
        <div class="relative">
        <input
          type="text"
          v-model="nomGroup"
          :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
          class="mt-4 focus:outline-none border-b-2 py-1.5 border-b-blue-500 w-full text-sm"
          placeholder="Nom du groupe"
          ref='GRPInput'
        />
        <Tooltip content="Emoji">
          <font-awesome-icon
            @click="toggleEmojiPickerGRP"
            :class="theme.theme === 'light' ? 'text-gray-500 cursor-pointer' : 'text-gray-500 cursor-pointer'"
            :icon="['fas', 'smile']"
            class="absolute right-3 bottom-1 transform -translate-y-1/2"
          /></Tooltip>
          <div v-if="showEmojiPickerGRP" class="emoji-picker-modal absolute top-full left-0 mt-2">
            <emoji-picker :class="theme.theme === 'light' ? 'light' : 'dark'" @emoji-click="addEmojiGRP"></emoji-picker>
          </div>
        </div>
        <div class="mt-4 text-xs text-blue-500">({{ selectedMembres.length }}) séléctionné(s)</div>
        <input
          type="text"
          v-model="searchQuery"
          :class="theme.theme === 'light' ? 'bg-gray-200' : '!bg-gray-300'"
          class="text-black w-full rounded-xl px-3 py-2 mt-2 text-xs focus:outline-none"
          placeholder="Rechercher"
        />
        <ul
          v-if="searchQuery && filteredMembres.length"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="bg-white text-black border rounded-xl mt-1 max-h-40 overflow-auto text-xs max-h-[150px] overflow-y-auto"
        >
          <li
            v-for="(membre, index) in filteredMembres"
            :key="membre.id"
            class="p-2 hover:bg-gray-100 cursor-pointer"
            @click="addMembre(membre)"
          >
            {{ membre.email }}
          </li>
        </ul>
        <div class="list-none max-h-[150px] overflow-y-auto">
          <li
            v-for="(membre, index) in selectedMembres"
            :key="membre.id"
            class="mt-2 p-1.5 text-xs flex items-center justify-between"
          >
            {{ membre.email }}
            <font-awesome-icon
              class="text-red-500 cursor-pointer"
              :icon="['fas', 'xmark']"
              @click="removeMembre(membre.id)"
            />
          </li>
        </div>
        <button
          :disabled="!nomGroup || selectedMembres.length === 0"
          class="bg-blue-500 w-full mt-4 p-2 rounded font-bold"
          @click="createGroupe()"
        >
          Créer
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
