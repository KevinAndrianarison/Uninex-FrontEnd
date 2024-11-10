<template>
  <div class="body bg-white border pb-5 rounded-lg min-h-[80vh]">
    <div class="head flex justify-center mt-2">
      <select class="mr-10 py-2 px-2 rounded border focus:outline-none">
        <option value="A">Toutes</option>
        <option value="A">Les plus recents</option>
        <option value="A">Les plus aimés</option>
      </select>

      <input
        type="search"
        class="py-2 px-2 w-60 rounded border focus:outline-none"
        placeholder="Recherche par titre"
        @input="annonce.search(annonce.searchalue)"
        v-model="annonce.searchalue"
      />
    </div>
    <div class="flex justify-evenly mt-2">
      <div class="w-[20%] max-h-[200px] overflow-auto cursor-pointer">
        <div
          :key="ctg.id"
          v-for="(ctg, index) in category.listCategorie"
          @click="setActiveCategory(ctg.id)"
          :class="['flex', isActive === ctg.id ? 'text-blue-500 font-bold' : 'hover:text-blue-500']"
        >
          {{ ctg.titre }}
        </div>
      </div>
      <div class="w-[45%] overflow-y-auto max-h-[75vh] rounded">
        <div
          class="flex p-4 border-2 mt-2"
          :key="ann.id"
          v-for="(ann, index) in annonce.listAnnonce"
        >
          <div
            :style="{
              'background-image': `url(${URL}/storage/users/${
                ann.user.photo_name ||
                'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
              })`,
              'background-size': 'cover',
              'background-position': 'center'
            }"
            class="image border"
          ></div>
          <div class="content w-[95%] pl-4">
            <h1 class="font-bold">{{ ann.user.email }}</h1>
            <div v-if="editableId === ann.id && isEditingTitle">
              <input
                v-model="ann.editableTitre"
                class="border p-1 w-full focus:outline-none"
                @blur="saveChanges(ann, 'titre')"
                @keyup.enter="saveChanges(ann, 'titre')"
                autofocus
              />
            </div>
            <p class="titre" v-else>{{ ann.titre }}</p>

            <div v-if="editableId === ann.id && isEditingDescription">
              <textarea
                v-model="ann.editableDescription"
                class="border p-1 w-full min-h-[50px] focus:outline-none"
                @blur="saveChanges(ann, 'description')"
                @keyup.enter="saveChanges(ann, 'description')"
                autofocus
              ></textarea>
            </div>
            <p class="text-gray-500" v-else>
              {{ ann.description }}
            </p>
            <div class="mt-2 flex">
              <div>
                <div v-if="isImageFile(ann.fichier_nom)">
                  <div
                    :style="{
                      'background-image': `url(${URL}/storage/annonce/${ann.fichier_nom})`,
                      'background-size': 'cover',
                      'background-position': 'center'
                    }"
                    class="h-[45vh]"
                  ></div>
                </div>
                <p class="font-bold text-blue-500 mr-2 underline text-xs">
                  {{ ann.fichier_nom }}
                  <Tooltip content="Télecharger">
                    <font-awesome-icon
                      @click="telecharger(ann.fichier_nom)"
                      class="cursor-pointer text-blue-500"
                      :icon="['fas', 'arrow-down']"
                  /></Tooltip>
                </p>
              </div>
            </div>
            <div class="flex mt-2 justify-between">
              <div class="flex">
                <p class="font-bold mr-4">
                  <font-awesome-icon
                    class="iconadd text-gray-500 cursor-pointer text-red-500"
                    :icon="['fas', 'heart']"
                  />
                  100
                </p>
                <p class="font-bold mr-4">
                  <Tooltip content="Commentaires">
                    <font-awesome-icon
                      @click="showComs(ann.id)"
                      class="iconadd text-gray-500 cursor-pointer text-gray-500 mr-1"
                      :icon="['fas', 'comment-dots']" /></Tooltip
                  >20
                </p>
                <p class="text-gray-500">{{ ann.timeAgo }}</p>
              </div>
              <div v-if="ann.user.id === user.user.id" class="flex">
                <p class="font-bold mr-4">
                  <Tooltip content="Modifier le titre et la description">
                    <font-awesome-icon
                      @click.stop="toggleEditPost(ann)"
                      class="iconadd cursor-pointer text-yellow-500"
                      :icon="['fas', 'pen']"
                  /></Tooltip>
                </p>
                <p class="font-bold">
                  <Tooltip content="Supprimer">
                    <font-awesome-icon
                      class="iconadd text-gray-500 cursor-pointer text-red-500"
                      :icon="['fas', 'trash-can']"
                      @click="showDeletePost(ann.id)"
                  /></Tooltip>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="annonce.listAnnonce.length === 0" class="text-center mt-5 text-xs text-gray-500">
          Aucun poste trouvé....
        </div>
      </div>
      <div v-if="isComs" class="w-[30%] h-[75vh] border-2 rounded p-2">
        <h1 class="font-bold">Commentaires :</h1>
        <textarea
          placeholder="Ecrire ici..."
          v-model="coms"
          class="border w-full min-h-[50px] focus:outline-none p-1"
        >
        </textarea>
        <div class="relative bottom-7 right-5 text-end">
          <Tooltip content="Envoyer">
            <font-awesome-icon
              @click="sendMsg()"
              class="iconadd text-gray-500 cursor-pointer"
              :icon="['fas', 'paper-plane']"
            />
          </Tooltip>
        </div>
        <div class="max-h-[350px] overflow-y-auto">
          <di class="coms mt-2 w-full flex" :key="com.id" v-for="(coms, index) in com.listComs">
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  coms.user.photo_name ||
                  'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="image border mr-1"
            ></div>
            <div class="border w-[85%] p-1 rounded text-sm">
              <div v-if="editableComId === coms.id">
                <textarea
                  v-model="coms.editableContenu"
                  class="border w-full focus:outline-none p-1"
                  @blur="saveCommentChanges(coms)"
                  @keyup.enter="saveCommentChanges(coms)"
                  autofocus
                ></textarea>
              </div>
              <p v-else>{{ coms.contenu }}</p>

              <div class="mt-2 flex items-center justify-between w-full">
                <p class="text-gray-500 text-xs">{{ coms.timeAgo }}</p>
                <div v-if="coms.user.id === user.user.id" class="flex justify-end">
                  <p class="font-bold mr-2">
                    <Tooltip content="Modifier">
                      <font-awesome-icon
                        @click.stop="editComment(coms)"
                        class="iconadd cursor-pointer text-yellow-500"
                        :icon="['fas', 'pen']"
                    /></Tooltip>
                  </p>
                  <p class="font-bold mr-2">
                    <Tooltip content="Supprimer">
                      <font-awesome-icon
                        @click="deleteComs(coms.id)"
                        class="iconadd cursor-pointer text-red-500"
                        :icon="['fas', 'trash-can']"
                    /></Tooltip>
                  </p>
                </div>
              </div>
            </div>
          </di>
          <p v-if="com.listComs.length === 0" class="mt-2 text-center text-xs text-gray-500">
            Aucun commentaire
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
import { useShow } from '@/stores/Show'
import { useCategory } from '@/stores/Category'
import { useAnnonce } from '@/stores/Annonce'
import { useCom } from '@/stores/Com'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

const show = useShow()
const com = useCom()
const annonce = useAnnonce()
const category = useCategory()
const URL = useUrl().url
const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

const editableId = ref(null)
const isEditingTitle = ref(false)
const isEditingDescription = ref(false)
const isActive = ref(null)
const coms = ref(null)
const isComs = ref(false)
const editableComId = ref(null)

function toggleEditPost(ann) {
  if (editableId.value === ann.id) {
    editableId.value = null
    isEditingTitle.value = false
    isEditingDescription.value = false
  } else {
    editableId.value = ann.id
    ann.editableTitre = ann.titre
    ann.editableDescription = ann.description
    isEditingTitle.value = true
    isEditingDescription.value = true
  }
}

function editComment(com) {
  if (editableComId.value === com.id) {
    editableComId.value = null
  } else {
    editableComId.value = com.id
    com.editableContenu = com.contenu
  }
}

function saveCommentChanges(com) {
  let formData = {
    contenu: com.editableContenu
  }
  axios
    .put(`${URL}/api/coms/${com.id}`, formData)
    .then((response) => {
      com.getAllComsByAnnonce(response.data.annonce_id)
    })
    .catch((err) => {
      console.error(err)
    })
  editableComId.value = null
}

function deleteComs(id) {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/coms/${id}`)
    .then((response) => {
      show.showSpinner = false
      com.getAllComsByAnnonce(annonce.idAnnonce)
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}

function setActiveCategory(id) {
  isActive.value = id
  annonce.getAnnonceByIdCategorie(id)
}

function showComs(id) {
  annonce.idAnnonce = id
  com.getAllComsByAnnonce(id)
  setInterval(updateTimeComs, 9000)
  updateTimeComs()
  isComs.value = true
}

function sendMsg() {
  show.showSpinner = true
  let formData = {
    contenu: coms.value,
    annonce_id: annonce.idAnnonce,
    user_id: user.user.id
  }
  show.showSpinner = true
  axios
    .post(`${URL}/api/coms`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      show.showSpinner = false
      com.getAllComsByAnnonce(Number(response.data.annonce_id))
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}

function handleOutsideClick(id) {
  if (editableId.value === id) {
    isEditingTitle.value = false
    isEditingDescription.value = false
    editableId.value = null
  }
}

function isImageFile(fileName) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']
  const extension = fileName.split('.').pop().toLowerCase()
  return imageExtensions.includes(extension)
}

function saveChanges(ann, field) {
  let formData = new FormData()

  formData.append('titre', ann.editableTitre || '')
  formData.append('description', ann.editableDescription || '')
  formData.append('_method', 'PUT')

  axios
    .post(`${URL}/api/annonce/${ann.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      annonce.getAllAnnonce()
    })
    .catch((error) => {
      console.error(error)
    })
  handleOutsideClick(ann.id)
}

function showDeletePost(id) {
  annonce.idAnnonce = id
  show.showDeletePost = true
}

function telecharger(nom) {
  const url = `${URL}/api/annonce/files/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  setInterval(updateTime, 9000)
  updateTime()
})

function timeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconde${diffInSeconds > 1 ? 's' : ''}`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInHours < 24) {
    return `${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  } else if (diffInDays < 30) {
    return `${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} mois`
  } else {
    return `${diffInYears} an${diffInYears > 1 ? 's' : ''}`
  }
}

function updateTime() {
  annonce.listAnnonce.forEach((ann) => {
    ann.timeAgo = timeAgo(new Date(ann.created_at))
  })
}

function updateTimeComs() {
  com.listComs.forEach((coms) => {
    coms.timeAgo = timeAgo(new Date(coms.created_at))
  })
}

onBeforeMount(() => {
  category.getAllCategorie()
  annonce.getAllAnnonce()
  updateTime()
})
</script>

<style scoped>
.image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.titre {
  font-size: 21px;
}
</style>
