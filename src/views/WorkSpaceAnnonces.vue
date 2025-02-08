<template>
    <div :class="theme.theme === 'light' ? 'body bg-white border pb-5 rounded-lg min-h-[80vh]' : 'body bg-white pb-5 rounded-lg min-h-[80vh] !text-white !bg-gray-600 !border-gray-200'">
    <div class="head flex justify-center items-center gap-4 mt-2 text-black">
    <Select @update:modelValue="handleSelection">
        <SelectTrigger
          :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
          class="w-40 py-0 select-trigger"
          >
        <SelectValue class="focus:outline-none" placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent :class="theme.theme === 'light' ? '' : '!bg-gray-300'">
            <SelectGroup>
                    <SelectItem value="Toutes">Toutes</SelectItem>
                    <SelectItem value="Mes annonces">Mes annonce</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
      <input
        type="search"
        :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
        class="py-1.5 text-center px-1 w-60 rounded border focus:outline-none focus:border-green-500 border-2"
        placeholder="🔍 Recherche par titre"
        @input="annonces.search(annonces.searchalue)"
        v-model="annonces.searchalue"
      />
    </div>
    <div v-if="!annonces.isSveletron" class="flex justify-evenly mt-2 ">
      <div class="w-[20%] max-h-[200px] overflow-auto cursor-pointer ">
        <div
          :key="ctg.id"
          v-for="(ctg, index) in category.listCategorie"
          @click="setActiveCategory(ctg.id)"
          :class="['flex truncate', isActive === ctg.id ? 'text-blue-500 font-bold' : 'hover:text-blue-500']"
        >
          {{ ctg.titre }}
        </div>
      </div>
      <div class="w-[45%] overflow-y-auto max-h-[75vh] rounded px-4 ">
        <div
        :class="theme.theme === 'light' ? '' : '!bg-gray-500 border-none'"
          class="flex py-2 border rounded mt-2 pr-8 "
          :key="ann.id"
          v-for="(ann, index) in annonces.listAnnonce"
        >
          <div
            :style="{
              'background-image': `url(${URL}/storage/users/${
                ann.user.photo_name ||
                'téléchargement-removebg-preview.png'
              })`,
              'background-size': 'cover',
              'background-position': 'center'
            }"
            class="image ml-1"
          ></div>
          <div class="content w-[95%] pl-1" >
            <h1 class="font-bold mb-2 ml-2">{{ ann.user.email }}</h1>
            <div v-if="editableId === ann.id && isEditingTitle" >
              <input
                v-model="ann.editableTitre"
                :class="theme.theme === 'light' ? '' : 'text-black !bg-gray-300'"
                class="border p-1 w-full focus:outline-none text-sm"
                @blur="saveChanges(ann, 'titre')"
                autofocus
              />
            </div>
            <p class="font-bold"  v-else>{{ ann.titre }}</p>
            <div v-if="editableId === ann.id && isEditingDescription">
              <textarea
                v-model="ann.editableDescription"
                :class="theme.theme === 'light' ? '' : 'text-black !bg-gray-300'"
                class="border text-sm p-1 w-full min-h-[50px] focus:outline-none"
                @blur="saveChanges(ann, 'description')"
              ></textarea>
            </div>
            <p    
            :class="theme.theme === 'light' ? '' : '!text-gray-200'"
             v-html="highlightHashtags(ann.description)"
            class="text-gray-500 text-sm whitespace-pre-wrap" v-else>
            </p>
            <div class="mt-1 flex">
              <div v-if="ann.fichier_nom" class="w-full ">
                  <div v-if="isImageFile(ann.fichier_nom)"
                    :style="{
                      'background-image': `url(${URL}/storage/annonce/${ann.fichier_nom})`,
                      'background-size': 'cover',
                      'background-position': 'center'
                    }"
                    class="h-[40vh]"
                  ></div>
                <p class="font-bold text-blue-500 mr-2 mt-1 underline text-xs">
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
                    class="iconadd text-gray-500 cursor-pointer text-red-500 mr-1"
                    :icon="['fas', 'heart']"
                  />
                  <font-awesome-icon
                  v-if="!ann.liked_by_user "

                  @click="toggleLike(ann)"
                    :class="theme.theme === 'light' ? '' : 'text-white'"
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
                      :class="theme.theme === 'light' ? '' : 'text-white'"
                      class="iconadd text-gray-500 cursor-pointer text-gray-500 mr-1"
                      :icon="['fas', 'comment-dots']" /></Tooltip
                  >{{ ann.com.length }}
                </p>
                <p 
                :class="theme.theme === 'light' ? '' : 'text-white'"
                class="text-gray-500">{{ ann.timeAgo }}</p>
              </div>
              <div class="flex">
                <p v-if="editableId !== ann.id && ann.user.id === user.user.id" class="font-bold mr-4">
                  <Tooltip content="Modifier le titre et la description">
                    <font-awesome-icon
                      @click.stop="toggleEditPost(ann)"
                      class="iconadd cursor-pointer text-yellow-500"
                      :icon="['fas', 'pen']"
                  /></Tooltip>
                </p>
                <p v-if="ann.user.id === user.user.id || show.showNavBarDir" class="font-bold">
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
          <div
          :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
           class="bg-white p-5 rounded-lg w-1/3 overflow-y-auto max-h-[80vh]">
            <h2 class="text-md font-bold mb-3">❤️ Les réacteurs :</h2>
            <ul>
              <li  :key="lk.id"
                  v-for="(lk, index) in listReacteur" class="py-1">
               <div class="flex items-center">
               <div
                :style="{
                'background-image': `url(${URL}/storage/users/${lk.user.photo_name || 'téléchargement-removebg-preview.png'})`,
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
        <div v-if="annonces.listAnnonce.length === 0" class="text-center mt-5 text-xs">
          Aucun poste trouvé 🙁☁️
        </div>
      </div>
      <div v-if="isComs"         
      :class="theme.theme === 'light' ? '' : '!bg-gray-500 border-none'"
      class="w-[30%] h-[75vh] border rounded p-2">
        <h1 class="font-bold">Commentaires :</h1>
        <textarea
          placeholder="Ecrire ici..."
          ref="newComsEmojiInput"
          @input="handleInputChangeComs"
          v-model="coms"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="text-black border-2 focus:border-yellow-500 rounded w-full min-h-[50px] focus:outline-none p-1"
        >
        </textarea>
        <div class="relative bottom-8 right-3 text-end">

        <Tooltip content="Emoji">
          <font-awesome-icon
            @click="toggleEmojiCtg"
            :class="theme.theme === 'light' ? 'text-gray-500 cursor-pointer' : 'text-gray-500 cursor-pointer'"
            :icon="['fas', 'smile']"
            class="mr-1"
          /></Tooltip>
          <div v-if="showEmojiComs" class="emoji-picker-modal absolute top-full left-0 mt-2">
            <emoji-picker :class="theme.theme === 'light' ? 'light' : 'dark'" @emoji-click="addEmojiComs"></emoji-picker>
          </div>
          <Tooltip content="Envoyer">
            <font-awesome-icon
              @click="sendMsg()"
              class="iconadd text-gray-500 cursor-pointer"
              :icon="['fas', 'paper-plane']"
            />
          </Tooltip>
        </div>
        <div class="max-h-[350px] overflow-y-auto">
          <di class="coms mt-2 w-full flex " :key="coms.id" v-for="(coms, index) in commmentaire.listComs">
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  coms.user.photo_name ||
                  'téléchargement-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="image mr-1 "
            ></div>
            <div  
            :class="theme.theme === 'light' ? '' : 'bg-gray-300 border-none text-black'"
            class="border w-[85%] p-1 px-2 rounded text-sm ">
              <div v-if="editableComId === coms.id">
                <textarea
                  v-model="coms.editableContenu"
                  class="border w-full focus:outline-none rounded min-h-[50px] mt-1 p-1"
                  @blur="saveCommentChanges(coms)"
                  autofocus
                ></textarea>
              </div>
              <p v-html="highlightHashtags(coms.contenu )" class='whitespace-pre-wrap' v-else></p>
              <div class="mt-2 flex items-center justify-between w-full">
                <p class="text-gray-500 text-xs">{{ coms.timeAgo }}</p>
                <div class="flex justify-end">
                  <p v-if="editableComId !== coms.id && coms.user.id === user.user.id" class="font-bold mr-2">
                    <Tooltip content="Modifier"><font-awesome-icon @click.stop="editComment(coms)" class="iconadd cursor-pointer text-yellow-500" :icon="['fas', 'pen']"/></Tooltip>
                  </p>
                  <p v-if="coms.user.id === user.user.id || show.showNavBarDir" class="font-bold">
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
          <p v-if="commmentaire.listComs.length === 0"
            :class="theme.theme === 'light' ? '' : 'text-white'"
            class="mt-1 text-center text-xs text-gray-500">
            Aucun commentaire...
          </p>
        </div>
      </div>
    </div>

    <div v-if="annonces.isSveletron" class="flex justify-evenly mt-10">
      <div role="status" class="max-w-sm animate-pulse">
        <h3 class="h-3 bg-gray-300 rounded-lg w-48 mb-4"></h3>
        <p class="h-2 bg-gray-300 rounded-lg max-w-[380px] mb-2.5"></p>
        <p class="h-2 bg-gray-300 rounded-lg max-w-[340px] mb-2.5"></p>
        <p class="h-2 bg-gray-300 rounded-lg max-w-[320px] mb-2.5"></p>
      </div>
      <div class="w-[50%]">
        <div role="status" class="animate-pulse">
          <h3 class="h-3 bg-gray-300 rounded-sm max-w-[340px] mb-4"></h3>
          <div class="flex">
            <p class="h-8 bg-gray-300 rounded-full w-8 mb-2.5 mr-2"></p>
            <div>
              <p class="h-2 bg-gray-300 rounded-full w-40 mb-2.5"></p>
              <p class="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
            </div>
          </div>
          <p class="h-4 bg-gray-300 rounded-sm max-w-[340px] mb-1"></p>
          <p class="h-4 bg-gray-300 rounded-sm max-w-[250px] mb-4"></p>
          <p class="h-2 bg-gray-300 rounded-sm max-w-[320px] mb-2.5"></p>
        </div>
        <div role="status" class="animate-pulse mt-20">
          <h3 class="h-3 bg-gray-300 rounded-sm max-w-[340px] mb-4"></h3>
          <div class="flex">
            <p class="h-8 bg-gray-300 rounded-full w-8 mb-2.5 mr-2"></p>
            <div>
              <p class="h-2 bg-gray-300 rounded-full w-40 mb-2.5"></p>
              <p class="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
            </div>
          </div>
          <p class="h-4 bg-gray-300 rounded-sm max-w-[340px] mb-1"></p>
          <p class="h-4 bg-gray-300 rounded-sm max-w-[250px] mb-4"></p>
          <p class="h-2 bg-gray-300 rounded-sm max-w-[320px] mb-2.5"></p>
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
import { useTheme } from '@/stores/Theme'
import axios from 'axios'
import "emoji-picker-element";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const show = useShow()
const theme = useTheme()
const commmentaire = useCom()
const annonces = useAnnonce()
const category = useCategory()
const URL = useUrl().url
const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

const editableId = ref(null)
const findBy = ref('Toutes')
const isEditingTitle = ref(false)
const isEditingDescription = ref(false)
const isActive = ref(null)
const coms = ref(null)
const isComs = ref(false)
const editableComId = ref(null)
const showLikesModal = ref(false)
const listReacteur = ref([])
const showEmojiComs = ref(false) 
const newComsEmojiInput = ref(null);

function addEmojiComs(event) {
  const input = newComsEmojiInput.value;
  const emoji = event.detail.unicode;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  coms.value = coms.value.substring(0, start) + emoji + coms.value.substring(end);
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
  }, 0);

}

function handleSelection(valeur){
  findBy.value = valeur
}

function handleInputChangeComs() {
  showEmojiComs.value = false
}

watch(findBy, (newValue, oldValue) => {
  if (newValue === 'Toutes') {
    annonces.getAllAnnonce()
  }
  if (newValue === 'Mes annonces') {
    annonces.getAnnonceByIdUser(user.user.id)
  }
})

function highlightHashtags(text) {
  if (text) {
        if (text.includes('#')) {
          text = text.replace(/#(\w+)/g, '<span class="text-blue-500 font-bold">#$1</span>');
        }
        if (text.includes('@')) {
          text = text.replace(/@(\w+)/g, '<span class="font-bold">@$1</span>');
        }
      }
      return text;
}

function toggleEmojiCtg() {
  showEmojiComs.value = !showEmojiComs.value
}
  

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
  showLikesModal.value = true
}
function closeLikesModal() {
  showLikesModal.value = false
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

  axios
    .post(`${URL}/api/annonces/${annonce.id}/like`, { user_id: user.user.id })
    .then((response) => {
      if (response.data.message) {
        annonces.getAllAnnonce()
      }
    })
    .catch((error) => {
      console.error(error)
    })
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
    return `${diffInSeconds} s${diffInSeconds > 1 ? '' : ''}`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? '' : ''}`
  } else if (diffInHours < 24) {
    return `${diffInHours} h${diffInHours > 1 ? '' : ''}`
  } else if (diffInDays < 30) {
    return `${diffInDays} j${diffInDays > 1 ? '' : ''}`
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

.select-trigger:focus {
  outline: none;
  box-shadow: none;
}

.titre {
  font-size: 21px;
}
</style>
