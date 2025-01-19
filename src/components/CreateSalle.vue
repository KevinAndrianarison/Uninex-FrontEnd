<script setup>
import { useShow } from '@/stores/Show'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useSalle } from '@/stores/salle'
import { useTheme } from '@/stores/Theme'

const salles = useSalle()
const show = useShow()
const URL = useUrl().url
const messages = useMessages()
const theme = useTheme()

const nomSalle = ref(null)

function deleteSalle(nom, id) {
  salles.NomSalle = nom
  salles.idSalle = id
  show.showDeletSalle = true
}

function closeCreateSalle() {
  show.showCreateSalle = false
  nomSalle.value = ''
}

function createSalle() {
  show.showSpinner = true
  const formData = {
    nom_salle: nomSalle.value
  }
  axios
    .post(`${URL}/api/salle`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      nomSalle.value = null
      salles.getallSalle()
      messages.messageSucces = 'Salle créé !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      show.showSpinner = false
    })
    .catch((error) => {
      console.error(error)
      messages.messageError = error.response.data.message
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
      show.showSpinner = false
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreateSalle">
      <div :class="theme.theme === 'light' ? 'formModals' : 'formModals !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateSalle()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : 'text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Gérer les salles :</p>
        <div class="class formInput mt-4">
          <label class="block text-sm font-medium leading-6">Nom de la salle</label>
          <input
            type="text"
            v-model="nomSalle"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
          />
        </div>

        <div class="valide">
          <button
            type="submit"
            :disabled="!nomSalle"
            @click="createSalle()"
            class="Modifie btn btn-primary mt-4"
          >
            Valider
          </button>
        </div>
        <div class="w-full mt-3" v-if="salles.listSalle.length !== 0">
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full justify-between rounded-lg bg-yellow-100 px-4 py-2 text-left text-lm font-black text-black hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500/75"
            >
              <span>Voir la liste des salles ?</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-yellow-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="DisclosurePanel mt-2 text-sm">
              <div class="listNiv" :key="index" v-for="(salle, index) in salles.listSalle">
                {{ salle.nom_salle }}
                <TrashIcon
                  @click="deleteSalle(salle.nom_salle, salle.id)"
                  class="deletes h-6 w-5 ml-3 pb-1"
                />
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
