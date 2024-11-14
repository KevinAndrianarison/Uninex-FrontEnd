<template>
  <div class="body bg-white border pb-5 rounded-lg min-h-[80vh]">
    <div class="head flex justify-center items-center mt-2">
      <div>
        <select v-model="findBy" class="mr-2 w-40  p-1.5 px-2 rounded border-2 focus:outline-none text-xs"  >
              <option value="Toutes" class="text-sm">
                Toutes
              </option>
              <option value="Mes annonces" class="text-sm">
                Mes annonces
              </option>
        </select>
      </div>
      <input
        type="search"
        class="py-2 px-2 w-60 rounded border focus:outline-none text-xs"
        placeholder="Recherche par titre"
        @input="annonces.search(annonces.searchalue)"
        v-model="annonces.searchalue"
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
          v-for="(ann, index) in annonces.listAnnonce"
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
            class="image"
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
              <div class="w-full">
                  <div v-if="isImageFile(ann.fichier_nom)"
                    :style="{
                      'background-image': `url(${URL}/storage/annonce/${ann.fichier_nom})`,
                      'background-size': 'cover',
                      'background-position': 'center'
                    }"
                    class="h-[50vh] border"
                  ></div>
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
                <p class="font-bold mr-4 flex items-center " >
                  <font-awesome-icon
                  v-if="ann.liked_by_user "
                  @click="toggleLike(ann)"
                    class="iconadd text-gray-500 cursor-pointer text-red-500 mr-1 "
                    :icon="['fas', 'heart']"
                  />
                  <font-awesome-icon
                  v-if="!ann.liked_by_user "

                  @click="toggleLike(ann)"
                    class="iconadd text-gray-500 cursor-pointer text-gray-500 mr-1 "
                    :icon="['fas', 'heart']"
                  />
                  <p class="mr-2 cursor-pointer" @click="openLikesModal(ann.likes)">{{ ann.likes_count }}</p>
                  <p @click="toggleLike(ann)" :class="ann.liked_by_user ? 'mr-1 text-blue-500 cursor-pointer' : 'text-black mr-1 cursor-pointer'">{{ ann.liked_by_user ? "Je n'aime plus" : "J'aime" }}</p> 
                </p>
                <p class=" mr-4">
                  <Tooltip content="Commentaires">
                    <font-awesome-icon
                      @click="showComs(ann.id)"
                      class="iconadd text-gray-500 cursor-pointer text-gray-500 mr-1"
                      :icon="['fas', 'comment-dots']" /></Tooltip
                  >{{ ann.com.length }}
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
        <div v-if="showLikesModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center " @click.self="closeLikesModal">
          <div class="bg-white p-5 rounded-lg w-1/3 overflow-y-auto max-h-[80vh]">
            <h2 class="text-md font-bold mb-3">❤️ Les réacteurs :</h2>
            <ul>
              <li  :key="lk.id"
                  v-for="(lk, index) in listReacteur" class="py-1">
               <div class="flex items-center">
               <div
                :style="{
                 'background-image': `url(${URL}/storage/users/${lk.user.photo_name})`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
            class="w-10 h-10 rounded-full  mr-3"
          ></div>
          <p>{{ lk.user.email }}</p>
          </div>
          </li>
         </ul>
        </div>
        </div>
        </div>
        <div v-if="annonces.listAnnonce.length === 0" class="text-center mt-5 text-xs text-gray-500">
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
          <di class="coms mt-2 w-full flex" :key="coms.id" v-for="(coms, index) in commmentaire.listComs">
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
          <p v-if="commmentaire.listComs.length === 0" class="mt-1 text-center text-xs text-gray-500">
            Aucun commentaire...
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
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

const show = useShow()
const commmentaire = useCom()
const annonces = useAnnonce()
const category = useCategory()
const URL = useUrl().url
const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

const editableId = ref(null)
const findBy = ref("Toutes")
const isEditingTitle = ref(false)
const isEditingDescription = ref(false)
const isActive = ref(null)
const coms = ref(null)
const isComs = ref(false)
const editableComId = ref(null)
const showLikesModal = ref(false);
const listReacteur = ref([]);


watch(findBy, (newValue, oldValue)=>{
  if(newValue === "Toutes"){
    annonces.getAllAnnonce()
  }
  if(newValue === "Mes annonces"){
    annonces.getAnnonceByIdUser(user.user.id)
  }
})

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

function openLikesModal(list) {
  listReacteur.value = list
  showLikesModal.value = true;
}
function closeLikesModal() {
  showLikesModal.value = false;
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
      commmentaire.getAllComsByAnnonce(response.data.annonce_id)
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
      commmentaire.getAllComsByAnnonce(annonces.idAnnonce)
      annonces.getAllAnnonce()
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}

function toggleLike(annonce) {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  
  axios.post(`${URL}/api/annonces/${annonce.id}/like`, { user_id: user.user.id })
    .then((response) => {
      if(response.data.message){
        annonces.getAllAnnonce()
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function setActiveCategory(id) {
  isActive.value = id
  annonces.getAnnonceByIdCategorie(id)
}

function showComs(id) {
  annonces.idAnnonce = id
  commmentaire.getAllComsByAnnonce(id)
  setInterval(updateTimeComs, 9000)
  updateTimeComs()
  isComs.value = true
}

function sendMsg() {
  show.showSpinner = true
  let formData = {
    contenu: coms.value,
    annonce_id: annonces.idAnnonce,
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
      coms.value = ''
      show.showSpinner = false
      commmentaire.getAllComsByAnnonce(Number(response.data.annonce_id))
      annonces.getAllAnnonce()
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
      annonces.getAllAnnonce()
    })
    .catch((error) => {
      console.error(error)
    })
  handleOutsideClick(ann.id)
}

function showDeletePost(id) {
  annonces.idAnnonce = id
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
  annonces.listAnnonce.forEach((ann) => {
    ann.timeAgo = timeAgo(new Date(ann.created_at))
  })
}


function updateTimeComs() {
  commmentaire.listComs.forEach((coms) => {
    coms.timeAgo = timeAgo(new Date(coms.created_at))
  })
}

onBeforeMount(() => {
  category.getAllCategorie()
  annonces.getAllAnnonce()
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
