<template>
  <div>
    <h1 class="font-bold mt-2">Modifier les informations sur la page d'accueil :</h1>
    <div class="mt-4 flex gap-4 flex-wrap">
      <div
        v-for="mention in acceuil.listMention"
        :key="mention.id"
        class="border flex flex-col justify-between gap-2 rounded w-80 p-4"
      >
        <div>
          <div class="flex flex-col items-center gap-2">
            <div
              :style="{
                'background-image': 'url(' + `${URL}/storage/mentions/${mention.photo_name} ` + ')'
              }"
              class="w-12 h-12 logo rounded-full "
            ></div>
            <div>
              <input
                v-if="isEditable === mention.id"
                type="text"
                v-model="mention.nomMention"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300 text-black'"
                class="focus:outline-none ring-1 rounded px-2 py-1 focus:ring"
                @blur="setMentionFunct(mention)"
              />
              <p class="font-bold text-center" v-else>{{ mention.nomMention }}</p>
            </div>
          </div>
          <div>
            <textarea
              v-if="isEditable === mention.id"
              v-model="mention.descriptionMention"
              @blur="setMentionFunct(mention)"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300 text-black'"
              class="focus:outline-none w-full mt-2 ring-1 rounded px-2 h-20 py-1 focus:ring"
            ></textarea>
            <p class="text-xs mt-2 text-center whitespace-pre-wrap truncate" v-else>
              {{ mention.descriptionMention }}
            </p>
          </div>
        </div>
        <div class="flex justify-between justify-end">
          <div class="flex gap-1">
            <font-awesome-icon
              @click="deleteMention(mention.id)"
              :icon="['fas', 'trash']"
              class="text-white bg-red-400 p-1.5 px-2 rounded-full cursor-pointer"
            />
            <font-awesome-icon
              @click="setMention(mention.id)"
              :icon="['fas', 'pen-to-square']"
              class="text-white bg-gray-500 p-1.5 rounded-full cursor-pointer"
            />
            <div class="relative flex items-center">
              <font-awesome-icon
                :icon="['fas', 'arrow-up-from-bracket']"
                class="text-white bg-yellow-500 p-1.5 rounded-full cursor-pointer"
              />
              <input
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                @change="(e) => onFileChangePhoto(e, mention.id)"
                accept="image/jpeg, image/png"
              />
            </div>
          </div>
          <div
            v-if="isEditablePhoto === mention.id && logoMentionName"
            class="flex gap-1 items-center text-xs"
          >
            <p>{{ logoMentionName }}</p>
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              @click="removeFileLogo"
              class="text-red-500 cursor-pointer"
            />
          </div>
        </div>
        <div v-if="isEditablePhoto === mention.id && logoMentionName" class="text-right">
          <button
            @click="setMentionLogoFunct"
            class="text-xs bg-yellow-500 text-white py-2 px-4 rounded"
          >
            ENREGISTRER
          </button>
        </div>
      </div>
      <div class="w-80 p-4">
        <button
          v-if="!createMention"
          @click="showcreatMention"
          class="text-xs bg-blue-500 flex justify-center items-center gap-2 text-white py-2 px-4 rounded"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />Nouvelle mention
        </button>
        <div class="flex flex-col gap-4" v-if="createMention">
          <input
            type="text"
            placeholder="Mention"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300  text-black'"
            v-model="acceuil.nomMention"
            class="rounded ring-1 focus:outline-none focus:ring py-2 px-2 text-xs w-full"
          />
          <div>
            <textarea
              class="rounded ring-1 h-20 focus:outline-none focus:ring py-2 px-2 text-xs w-full"
              placeholder="Description"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300 text-black'"
              v-model="acceuil.descrMention"
            ></textarea>
            <div v-if="acceuil.logoMentionName" class="flex gap-1 items-center text-xs">
              <p>{{ acceuil.logoMentionName }}</p>
              <font-awesome-icon
                @click="removeFile"
                :icon="['fas', 'xmark']"
                class="text-red-500 cursor-pointer"
              />
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <div class="relative flex items-center">
              <input
                @change="onFileChange"
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                accept="image/jpeg, image/png"
              />
              <Tooltip content="Importer une image">
                <font-awesome-icon
                  :icon="['fas', 'arrow-up-from-bracket']"
                  class="text-white bg-yellow-500 px-2 p-1.5 w-3 h-4 rounded-full cursor-pointer"
              /></Tooltip>
            </div>
            <button
              @click="createMentionFunct"
              class="text-xs w-full bg-yellow-500 text-white py-2 px-4 rounded"
            >
              ENREGISTRER
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAcceuil } from '@/stores/Acceuil'
import Tooltip from '../components/Tooltip.vue'
import Notiflix from 'notiflix'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useTheme } from '@/stores/Theme'

const acceuil = useAcceuil()
const show = useShow()
const messages = useMessages()
const URL = useUrl().url
const theme = useTheme()

const createMention = ref(false)
const isEditable = ref(null)
const isEditablePhoto = ref(null)
const logoMention = ref(null)
const logoMentionName = ref('')

onBeforeMount(() => {
  acceuil.getAllMention()
})

function setMention(id) {
  isEditable.value = id
}

function deleteMention(id) {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/acceuilmention/${id}`)
    .then((response) => {
      acceuil.getAllMention()
      messages.messageSucces = 'Mention supprimée avec succès !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function setMentionFunct(mnt) {
  let formData = new FormData()
  formData.append('nomMention', mnt.nomMention || '')
  formData.append('descriptionMention', mnt.descriptionMention || '')
  formData.append('_method', 'PUT')
  axios
    .post(`${URL}/api/acceuilmention/${isEditable.value}`, formData)
    .then((response) => {
      acceuil.getAllMention()
      isEditable.value = null
    })
    .catch((err) => {
      console.error(err)
    })
}

function setMentionLogoFunct() {
  let formData = new FormData()
  formData.append('photo', logoMention.value || null)
  formData.append('_method', 'PUT')
  show.showSpinner = true
  axios
    .post(`${URL}/api/acceuilmention/${isEditablePhoto.value}`, formData)
    .then((response) => {
      console.log(response.data)
      isEditablePhoto.value = null
      show.showSpinner = false
      acceuil.getAllMention()
      logoMention.value = null
      logoMentionName.value = ''
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function createMentionFunct() {
  if (acceuil.nomMention && acceuil.descrMention && acceuil.logoMention) {
    let formData = new FormData()
    formData.append('nomMention', acceuil.nomMention || '')
    formData.append('descriptionMention', acceuil.descrMention || '')
    formData.append('photo', acceuil.logoMention || null)
    show.showSpinner = true
    axios
      .post(`${URL}/api/acceuilmention`, formData)
      .then((response) => {
        acceuil.getAllMention()
        messages.messageSucces = 'Mention crée avec succès !'
        acceuil.nomMention = ''
        acceuil.descrMention = ''
        acceuil.logoMention = null
        acceuil.logoMentionName = ''
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  } else {
    Notiflix.Notify.warning('Le "Nom", "Description" et la "photo" doivent être remplis')
  }
}

function removeFile() {
  acceuil.logoMention = null
  acceuil.logoMentionName = ''
}

function removeFileLogo() {
  logoMention.value = null
  logoMentionName.value = ''
}

function onFileChangePhoto(event, id) {
  if (event.target && event.target.files.length > 0) {
    isEditablePhoto.value = id
    logoMention.value = event.target.files[0]
    logoMentionName.value = event.target.files[0].name
  }
}

function onFileChange(event) {
  acceuil.logoMention = event.target.files[0]
  acceuil.logoMentionName = event.target.files[0].name
}

function showcreatMention() {
  createMention.value = true
}
</script>

<style scoped>
.logo {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
