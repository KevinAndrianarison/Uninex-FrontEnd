<template>
  <div>
    <h1 class="mt-5 text-xl">
      Modifier les frais des relevés de notes
      <p class="text-xs">({{ au.oneAU }})</p>
    </h1>
    <div class="mt-5">
      <div class="flex items-top gap-4">
        <p class="font-bold text-xs py-2">Montant (Ariary) :</p>
        <div class="flex flex-col gap-2">
          <input
            type="number"
            v-model="au.montant_releve"
            :disabled="!isEditing"
            class="w-60 rounded text-center py-2 text-black text-xs focus:outline-none focus:ring cursor-pointer transition-all duration-300"
            :class="isEditing ? 'bg-white' : 'bg-gray-200 cursor-not-allowed'"
          />
          <button
            @click="toggleEdit"
            class="text-xs w-60 px-5 py-2 border rounded transition-all duration-300 flex items-center justify-center gap-2"
            :class="isEditing ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-yellow-500 border-yellow-500'"
          >
            <font-awesome-icon :icon="isEditing ? ['fas', 'lock'] : ['fas', 'lock-open']" />
            {{ isEditing ? "Enregistrer" : "Modifier" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAu } from '@/stores/Au'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const au = useAu()
const URL = useUrl().url
const messages = useMessages()

const isEditing = ref(false) 

function toggleEdit() {
  if (isEditing.value) {
    saveDroitReleve()
  }
  isEditing.value = !isEditing.value
}

function saveDroitReleve() {
  let formData = {
    montant_releve: au.montant_releve
  }
  axios
    .put(`${URL}/api/au/${au.idDroit}`, formData)
    .then((response) => {
      messages.messageSucces = 'Montant modifié !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      console.error(err)
      messages.messageError = "Une erreur s'est produite !"
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}
</script>
