<script setup>
import { ref, computed } from 'vue'
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/User'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useUrl } from '@/stores/url'
import { useGroupe } from '../stores/groupe'

const show = useShow()
const user = useUser()
const URL = useUrl().url
const messages = useMessages()
const groupe = useGroupe()

function closeCreateGroup() {
  show.showCreateGroup = false
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
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateGroup()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <p class="font-bold">
          <font-awesome-icon :icon="['fas', 'users']" class="text-gray-500 mr-2" />Nouveau groupe :
        </p>
        <input
          type="text"
          v-model="nomGroup"
          class="mt-4 focus:outline-none border-b-2 py-1.5 border-b-blue-500 w-full text-xs"
          placeholder="Nom du groupe"
        />
        <div class="mt-4 text-xs  text-blue-500">({{ selectedMembres.length }}) séléctionné(s)</div>
        <input
          type="text"
          v-model="searchQuery"
          class="bg-gray-200 w-full rounded-xl px-3 py-2 mt-2  text-xs focus:outline-none"
          placeholder="Rechercher"
        />
        <ul
          v-if="searchQuery && filteredMembres.length"
          class="bg-white border rounded mt-2 max-h-40 overflow-auto text-xs max-h-[150px] overflow-y-auto"
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
