<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Tooltip from '../components/Tooltip.vue'
import { reactive, ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useCategory } from '@/stores/Category'
import { useAnnonce } from '@/stores/Annonce'

const file = ref(null)
const fileName = ref('')
const titreAnnonce = ref('')
const descriptionAnnonce = ref('')
const idCategorie = ref(null)
const showCreateCategory = ref(false)
const showListeCategory = ref(false)
const newCategory = reactive({
  emoji: '',
  title: ''
})
const messages = useMessages()
const annonce = useAnnonce()
const URL = useUrl().url
const show = useShow()
const category = useCategory()
const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

function closeCreatePost() {
  titreAnnonce.value = ''
  descriptionAnnonce.value = ''
  file.value = null
  fileName.value = null
  show.showCreatePost = false
}

function postAnnonce() {
  show.showSpinner = true
  let formData = new FormData()
  formData.append('titre', titreAnnonce.value || '')
  formData.append('description', descriptionAnnonce.value || '')
  formData.append('fichier', file.value || '')
  formData.append('categori_id', Number(idCategorie.value) || null)
  formData.append('user_id', Number(user.user.id) || null)

  axios
    .post(`${URL}/api/annonce`, formData)
    .then((response) => {
      annonce.getAllAnnonce()
      messages.messageSucces = 'Annonce publie avec succès !'
      titreAnnonce.value = ''
      descriptionAnnonce.value = ''
      file.value = null
      fileName.value = ''
      idCategorie.value = null
      show.showCreatePost = false
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      show.showSpinner = false
    })
}

function openCreateCategory() {
  showCreateCategory.value = true
}

function openListeCategory() {
  showListeCategory.value = true
}

function closeCreateCategory() {
  newCategory.emoji = ''
  newCategory.title = ''
  showCreateCategory.value = false
}

function closeListeCategory() {
  showListeCategory.value = false
}

function deleteCategory(id) {
  axios
    .delete(`${URL}/api/categoris/${id}`)
    .then((response) => {
      category.getAllCategorie()
      show.showSpinner = false
      messages.messageSucces = 'Catégorie supprimé avec succès !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      show.showSpinner = false
    })
}

function modifierCategorie(id, titre) {
  let formData = {
    titre: titre
  }
  axios
    .put(`${URL}/api/categoris/${id}`, formData)
    .then((response) => {
      category.getAllCategorie()
      messages.messageSucces = 'Catégorie modifié avec succès !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      show.showSpinner = false
    })
}

function submitCategory() {
  show.showSpinner = true
  let formData
  if (newCategory.emoji) {
    formData = {
      titre: `${newCategory.emoji} ${newCategory.title}`
    }
  }
  if (newCategory.emoji === '') {
    formData = {
      titre: `📂 ${newCategory.title}`
    }
  }

  axios
    .post(`${URL}/api/categoris`, formData)
    .then((response) => {
      newCategory.title = ''
      newCategory.emoji = ''
      messages.messageSucces = 'Catégorie crée avec succès !'
      show.showSpinner = false
      showCreateCategory.value = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      category.getAllCategorie()
      closeCreateCategory()
    })
    .catch((err) => {
      messages.messageError = err.response.data.message
      show.showSpinner = false
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}

function removeFile() {
  file.value = null
  fileName.value = ''
}

function onFileChange(event) {
  file.value = event.target.files[0]
  fileName.value = event.target.files[0].name
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreatePost">
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreatePost()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold text-lg">Créér une annonce :</h1>
        <input
          type="text"
          placeholder="Titre"
          v-model="titreAnnonce"
          class="focus:outline-none border-2 rounded w-full px-3 text-sm mt-5 py-2"
        />
        <div class="mt-1 flex items-end justify-between">
          <div class="flex items-left w-full flex-col">
            <label class="text-xs">Choisissez une catégorie :</label>
            <select
              v-model="idCategorie"
              class="mr-2 py-2 px-2 rounded border-2 focus:outline-none text-xs"
            >
              <option
                class="text-sm"
                :key="ctg.id"
                v-for="(ctg, index) in category.listCategorie"
                :value="ctg.id"
              >
                {{ ctg.titre }}
              </option>
              <option
                disabled
                class="text-xs text-gray-500"
                v-if="category.listCategorie.length === 0"
              >
                Aucune catégorie trouvée...
              </option>
            </select>
          </div>
          <div v-if="user.user.status_user === 'Directeur'" class="flex flex-col justify-center">
            <Tooltip content="Créer une nouvelle catégorie">
              <font-awesome-icon
                @click="openCreateCategory"
                class="text-gray-500 cursor-pointer w-4 h-4"
                :icon="['fas', 'square-plus']"
            /></Tooltip>
            <Tooltip content="Liste de toutes les catégories">
              <font-awesome-icon
                @click="openListeCategory"
                class="iconadd text-gray-800 cursor-pointer h-4 w-3"
                :icon="['fas', 'bars-staggered']"
            /></Tooltip>
          </div>
        </div>
        <textarea
          placeholder="Description"
          v-model="descriptionAnnonce"
          class="text-sm min-h-[100px] focus:outline-none border-2 rounded w-full px-3 mt-2 py-2"
        ></textarea>
        <div class="relative flex items-center">
          <input
            @change="onFileChange"
            class="absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            accept="*"
          />
          <div
            class="w-full file-label bg-green-100 text-green-800 py-2 text-center rounded-md border border-green-300 text-sm"
          >
            📂 Importer un fichier
          </div>
        </div>
        <div v-if="fileName" class="flex text-xs">
          <p class="text-yellow-500 mr-2">{{ fileName }}</p>
          <font-awesome-icon
            @click="removeFile"
            class="text-gray-500 cursor-pointer w-5 h-4"
            :icon="['fas', 'xmark']"
          />
        </div>
        <button
          @click="postAnnonce()"
          :disabled="!titreAnnonce || !idCategorie || !file"
          class="focus:outline-none bg-green-500 font-bold rounded w-full px-3 mt-2 py-2 text-sm cursor-pointer"
        >
          Publier
        </button>
      </div>
    </div>
  </Transition>
  <Transition>
    <div class="showModal" v-if="showCreateCategory">
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateCategory">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold text-sm">Créer une nouvelle catégorie :</h1>
        <input
          v-model="newCategory.emoji"
          type="text"
          placeholder="Emoji (e.g., 📚)"
          class="focus:outline-none border-2 text-xs rounded w-full px-3 mt-5 py-2"
        />
        <input
          v-model="newCategory.title"
          type="text"
          placeholder="Titre"
          class="focus:outline-none border-2 text-xs rounded w-full px-3 mt-2 py-2"
        />
        <button
          :disabled="!newCategory.title"
          class="focus:outline-none text-xs bg-green-500 font-bold rounded w-full px-3 mt-5 py-2 cursor-pointer"
          @click="submitCategory"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </Transition>
  <Transition>
    <div class="showModal" v-if="showListeCategory">
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeListeCategory">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold text-sm">Liste des catégories :</h1>
        <li
          class="px-1 py-1 justify-between border flex text-xs mt-1"
          :key="ctg.id"
          v-for="(ctg, index) in category.listCategorie"
        >
          <input class="w-60 focus:outline-none" type="text" v-model="ctg.titre" />
          <p>
            <Tooltip content="Enregister la modification">
              <font-awesome-icon
                class="cursor-pointer text-yellow-500 mr-2"
                :icon="['fas', 'pen']"
                @click="modifierCategorie(ctg.id, ctg.titre)"
            /></Tooltip>
            <Tooltip content="Supprimer">
              <font-awesome-icon
                @click="deleteCategory(ctg.id)"
                class="text-gray-500 cursor-pointer text-red-500"
                :icon="['fas', 'trash-can']"
            /></Tooltip>
          </p>
        </li>
        <div v-if="category.listCategorie.length === 0" class="text-gray-500 text-xs mt-2">
          La liste est vide...
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
