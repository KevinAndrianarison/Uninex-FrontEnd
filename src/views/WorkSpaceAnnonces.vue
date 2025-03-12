<template>
  <div class="pb-5">
    <p class="text-lg text-center logoESP text-green-500">
      <font-awesome-icon class="cursor-pointer text-green-500 mr-2" :icon="['fas', 'podcast']" />Les
      annonces
    </p>
  </div>
  <div v-if="show.showNavBarAdmin" class="flex justify-center text-xs">
    <h1
      @click="switchStatus('valide')"
      :class="
        isStatut === 'valide'
          ? 'bg-yellow-500 p-2 px-4 text-white'
          : 'bg-white p-2 px-4 text-yellow-500'
      "
      class="cursor-pointer rounded-l"
    >
      Déjà validé
    </h1>
    <h1
      @click="switchStatus('attente')"
      class="cursor-pointer rounded-r"
      :class="
        isStatut === 'attente'
          ? 'bg-yellow-500 p-2 px-4 text-white'
          : 'bg-white p-2 px-4 text-yellow-500'
      "
    >
      En attente
    </h1>
  </div>
  <div class="flex items-center justify-center text-xs gap-4 mt-5">
    <div class="relative" ref="menuRef">
      <button
        @click="showCategorieMenu = !showCategorieMenu"
        class="px-4 py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
      >
        Catégories <font-awesome-icon class="cursor-pointer" :icon="['fas', 'filter']" />
      </button>

      <div
        v-if="showCategorieMenu"
        class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
      >
        <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
          <span class="!flex gap-2">
            <input
              type="radio"
              value="Tout"
              v-model="filtreCategorie"
              class="cursor-pointer"
            />Tout</span
          >
        </p>
        <p
          v-for="cat in category.listCategorie"
          :key="cat"
          class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
        >
          <span class="!flex gap-2">
            <input
              type="radio"
              :value="cat.titre"
              v-model="filtreCategorie"
              class="cursor-pointer"
            />{{ cat.titre }}</span
          >
        </p>
      </div>
    </div>
    <div class="flex">
      <input
        type="text"
        v-model="recherche"
        placeholder="Rechercher une annonce..."
        :class="
          theme.theme === 'light'
            ? '!w-60 py-2 pl-2 focus:outline-none rounded-l !bg-white'
            : '!w-60 py-2 pl-2 focus:outline-none rounded-l !bg-gray-100 '
        "
      />
      <p
        :class="
          theme.theme === 'light'
            ? 'px-4 flex items-center rounded-r bg-white justify-center'
            : 'px-4 flex items-center rounded-r justify-center !bg-gray-100 '
        "
      >
        <font-awesome-icon
          class="cursor-pointer text-blue-500"
          :icon="['fas', 'magnifying-glass']"
        />
      </p>
    </div>
    <Select @update:modelValue="handleDate">
      <SelectTrigger class="w-40 text-center select-trigger !bg-gray-200 h-8 !text-gray-600">
        <SelectValue class="focus:outline-none" placeholder="Filtrer par date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="option in dateFiltreOptions" :value="option" :key="option">
            {{ option }}</SelectItem
          >
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <div
    :class="
      theme.theme === 'light'
        ? 'body pb-5 rounded-lg max-h-[60vh] overflow-y-auto mt-5'
        : 'body overflow-y-auto  pb-5 rounded-lg max-h-[60vh] mt-5 !text-white !bg-gray-600'
    "
  >
    <div>
      <ul class="flex justify-center flex-wrap gap-10">
        <li class="w-[350px]" :key="ann.id" v-for="(ann, index) in annoncesAffichees">
          <div :class="theme.theme === 'light' ? 'course-card' : 'course-card !bg-gray-200 '">
            <figure
              v-if="isImageFileName(ann.fichier_nom)"
              class="card-banner img-holder h-[200px]"
            >
              <img
                :src="`${URL}/storage/annonce/${ann.fichier_nom}`"
                width="370"
                height="220"
                loading="lazy"
                class="img-cover"
              />
            </figure>
            <div class="abs-badge">
              <span class="span text-xs">{{ ann.timeAgo }}</span>
            </div>
            <div class="flex flex-col justify-between p-4">
              <div class="flex flex justify-between">
                <span class="badge text-xs">{{ ann.user.email }}</span>
                <span v-if="ann.status === 'attente'" class="!bg-red-100 !text-red-500 font-bold badge flex items-center text-xs">En attente</span>
              </div>
              <div v-if="editableId === ann.id && isEditingTitle">
                <input
                  v-model="ann.editableTitre"
                  :class="theme.theme === 'light' ? '' : 'text-black !bg-gray-300'"
                  class="ring mt-2 p-1 w-full focus:outline-none text-sm"
                  @blur="saveChanges(ann, 'titre')"
                  autofocus
                />
              </div>
              <h3 class="h3" v-else>
                <a class="card-title text-sm font-bold">{{ ann.titre }}</a>
              </h3>
              <div v-if="editableId === ann.id && isEditingDescription">
                <textarea
                  v-model="ann.editableDescription"
                  :class="theme.theme === 'light' ? '' : 'text-black !bg-gray-300'"
                  class="ring mt-2 text-sm p-1 w-full min-h-[50px] focus:outline-none"
                  @blur="saveChanges(ann, 'description')"
                ></textarea>
              </div>
              <div class="wrapper" v-else>
                <p
                  v-html="highlightHashtags(ann.description)"
                  class="card-text text-sm whitespace-pre-wrap truncate text-black"
                ></p>
              </div>
              <div
                v-if="!isImageFileName(ann.fichier_nom)"
                @click="telecharger(ann.fichier_nom)"
                class="underline cursor-pointer flex text-xs items-center mt-4 text-blue-500"
              >
                <p class="w-60 truncate">{{ ann.fichier_nom }}</p>
                <font-awesome-icon :icon="['fas', 'arrow-down']" />
              </div>
              <ul class="card-meta-list mt-4">
                <li class="card-meta-item flex justify-between items-center w-full">
                  <div class="flex items-center gap-2">
                    <span class="text-sm !flex gap-2">
                      <p class="cursor-pointer" @click="openLikesModal(ann.likes)">
                        {{ ann.likes_count }}
                      </p>
                      <p
                        :class="
                          ann.likes.some((item) => item.user_id === user.user.id)
                            ? 'text-blue-500 cursor-pointer'
                            : ' cursor-pointer'
                        "
                        @click="toggleLike(ann)"
                      >
                        {{
                          ann.likes.some((item) => item.user_id === user.user.id)
                            ? "Je n'aime plus"
                            : "J'aime"
                        }}
                      </p></span
                    >
                    <font-awesome-icon
                      @click="showComs(ann.id)"
                      class="iconadd text-gray-500 cursor-pointer text-gray-900/20 mr-1"
                      :icon="['fas', 'comment-dots']"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <div v-if="showOptions === ann.id" class="flex items-center space-x-2">
                      <font-awesome-icon
                        v-if="
                          (ann.user.id !== user.user.id || show.showNavBarAdmin) &&
                          isImageFileName(ann.fichier_nom)
                        "
                        @click="telecharger(ann.fichier_nom)"
                        class="cursor-pointer text-blue-500 bg-blue-200 py-1.5 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-yellow-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                        :icon="['fas', 'arrow-down']"
                      />
                      <font-awesome-icon
                        v-if="editableId !== ann.id && ann.user.id === user.user.id"
                        @click.stop="toggleEditPost(ann)"
                        class="cursor-pointer text-yellow-500 bg-yellow-200 py-2 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-blue-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                        :icon="['fas', 'pen']"
                      />
                      <font-awesome-icon
                        v-if="ann.user.id === user.user.id || show.showNavBarAdmin"
                        class="cursor-pointer text-red-500 bg-red-200 py-1.5 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-red-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                        :icon="['fas', 'trash']"
                        @click="showDeletePost(ann.id)"
                      />
                      <font-awesome-icon
                        v-if="ann.status === 'attente'"
                        @click="validerPOST(ann.id)"
                        class="cursor-pointer text-green-500 bg-green-200 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-green-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                        :icon="['fas', 'circle-check']"
                      />
                      <font-awesome-icon
                        v-if="ann.status === 'valide'"
                        @click="annullerPOST(ann.id)"
                        class="cursor-pointer text-red-500 bg-red-200 py-1.5 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-red-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                        :icon="['fas', 'xmark']"
                      />
                    </div>
                    <font-awesome-icon
                      @click="toggleOptions(ann.id)"
                      class="cursor-pointer text-gray-500 bg-gray-200 py-1.5 p-3 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-gray-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                      :icon="['fas', 'ellipsis-v']"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div
        v-if="showLikesModal"
        class="fixed inset-0 bg-black z-10 bg-opacity-50 flex justify-center items-center"
        @click.self="closeLikesModal"
      >
        <div
          :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
          class="bg-white p-5 rounded-lg w-1/3 overflow-y-auto max-h-[80vh]"
        >
          <h2 class="text-md font-bold mb-3">❤️ Les réacteurs :</h2>
          <ul>
            <li :key="lk.id" v-for="(lk, index) in listReacteur" class="py-1">
              <div class="flex items-center">
                <div
                  :style="{
                    'background-image': `url(${URL}/storage/users/${
                      lk.user.photo_name || 'téléchargement-removebg-preview.png'
                    })`,
                    'background-size': 'cover',
                    'background-position': 'center'
                  }"
                  class="w-10 h-10 rounded-full mr-3"
                ></div>
                <p>{{ lk.user.email }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ------------------------------------------------------------------------------------------------------------------------------ -->
      <div
        v-if="isComs"
        class="fixed inset-0 bg-black z-10 bg-opacity-50 flex justify-center items-center"
        @click.self="closeLikesModal"
      >
        <div
          :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
          class="bg-white p-8 rounded-lg w-1/3"
        >
          <h1 class="font-bold">Les commentaires :</h1>
          <textarea
            placeholder="Ecrire ici..."
            ref="newComsEmojiInput"
            @input="handleInputChangeComs"
            v-model="coms"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="text-black border focus:border-yellow-500 rounded mt-2 w-full min-h-[50px] focus:outline-none p-1 px-2"
          >
          </textarea>
          <div class="relative bottom-8 right-3 text-end">
            <Tooltip content="Emoji">
              <font-awesome-icon
                @click="toggleEmojiCtg"
                :class="
                  theme.theme === 'light'
                    ? 'text-gray-400 cursor-pointer'
                    : 'text-gray-400 cursor-pointer'
                "
                :icon="['fas', 'smile']"
                class="mr-2"
            /></Tooltip>
            <div v-if="showEmojiComs" class="emoji-picker-modal absolute top-full left-0 mt-2">
              <emoji-picker
                :class="theme.theme === 'light' ? 'light' : 'dark'"
                @emoji-click="addEmojiComs"
              ></emoji-picker>
            </div>
            <Tooltip content="Envoyer">
              <font-awesome-icon
                @click="sendMsg()"
                class="iconadd text-gray-400 cursor-pointer"
                :icon="['fas', 'paper-plane']"
              />
            </Tooltip>
          </div>
          <div class="max-h-[350px] overflow-y-auto">
            <di
              class="coms mt-2 w-full flex"
              :key="coms.id"
              v-for="(coms, index) in commmentaire.listComs"
            >
              <div
                :style="{
                  'background-image': `url(${URL}/storage/users/${
                    coms.user.photo_name || 'téléchargement-removebg-preview.png'
                  })`,
                  'background-size': 'cover',
                  'background-position': 'center'
                }"
                class="w-10 h-10 rounded-full mr-1"
              ></div>
              <div
                :class="theme.theme === 'light' ? '' : 'bg-gray-300 border-none text-black'"
                class="border w-full p-1 px-2 rounded text-sm"
              >
                <div v-if="editableComId === coms.id">
                  <textarea
                    v-model="coms.editableContenu"
                    class="ring w-full focus:outline-none rounded min-h-[50px] mt-1 p-1"
                    @blur="saveCommentChanges(coms)"
                    autofocus
                  ></textarea>
                </div>
                <p v-html="highlightHashtags(coms.contenu)" class="whitespace-pre-wrap" v-else></p>
                <div class="mt-2 flex items-center justify-between">
                  <p class="text-gray-500 text-xs">{{ coms.timeAgo }}</p>
                  <div class="flex justify-end">
                    <p
                      v-if="editableComId !== coms.id && coms.user.id === user.user.id"
                      class="font-bold mr-2"
                    >
                      <Tooltip content="Modifier"
                        ><font-awesome-icon
                          @click.stop="editComment(coms)"
                          class="iconadd cursor-pointer text-blue-500"
                          :icon="['fas', 'pen']"
                      /></Tooltip>
                    </p>
                    <p
                      v-if="coms.user.id === user.user.id || show.showNavBarAdmin"
                      class="font-bold"
                    >
                      <Tooltip content="Supprimer">
                        <font-awesome-icon
                          @click="deleteComs(coms.id)"
                          class="iconadd cursor-pointer text-gray-500"
                          :icon="['fas', 'trash-can']"
                      /></Tooltip>
                    </p>
                  </div>
                </div>
              </div>
            </di>
            <p
              v-if="commmentaire.listComs.length === 0"
              :class="theme.theme === 'light' ? '' : 'text-white'"
              class="mt-1 text-center text-xs text-gray-500"
            >
              Aucun commentaire...
            </p>
          </div>
        </div>
      </div>
      <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
      <div v-if="annoncesAffichees.length === 0" class="flex items-center justify-center flex-col">
        <div
          class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
        ></div>
        <p class="text-xs font-bold mt-2">Aucune annonce trouvée</p>
      </div>
    </div>
  </div>
  <div
    v-if="annoncesAffichees.length !== 0"
    class="flex text-xs items-center justify-center gap-4 mt-5"
  >
    <p :class="theme.theme === 'light' ? 'text-xs font-bold' : 'text-xs text-white'">Affichage :</p>
    <Select @update:modelValue="handlePage">
      <SelectTrigger
        :class="
          theme.theme === 'light'
            ? ' w-40 text-center select-trigger !bg-white'
            : ' w-40 text-center select-trigger !bg-gray-100'
        "
      >
        <SelectValue class="focus:outline-none" placeholder="10" />
      </SelectTrigger>
      <SelectContent :class="theme.theme === 'light' ? '' : '!bg-gray-100 '">
        <SelectGroup>
          <SelectItem value="10"> 10 par page</SelectItem>
          <SelectItem value="20"> 20 par page</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <div class="flex space-x-2">
      <button
        @click="pageActuelle--"
        :disabled="pageActuelle === 1"
        class="px-3 py-1 !bg-blue-500 text-white flex items-center !text-xs rounded disabled:opacity-50"
      >
        Précédent
      </button>
      <span class="px-4 py-2 rounded">{{ pageActuelle }} / {{ totalPages }}</span>
      <button
        @click="pageActuelle++"
        :disabled="pageActuelle >= totalPages"
        class="px-3 py-1 !bg-blue-500 text-white flex items-center !text-xs rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>

    <span class="text-sm text-gray-600 text-xs"
      >({{ annoncesAffichees.length }} / {{ annoncesFiltrees.length }}) annonces affichées</span
    >
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
import { useShow } from '@/stores/Show'
import { useCategory } from '@/stores/Category'
import { useAnnonce } from '@/stores/Annonce'
import { useCom } from '@/stores/Com'
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useUrl } from '@/stores/url'
import { useTheme } from '@/stores/Theme'
import axios from 'axios'
import 'emoji-picker-element'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useMessages } from '@/stores/messages'

// ---------------------------------------------------------------------------------------------------------
const showCategorieMenu = ref(false)
const messages = useMessages()
const menuRef = ref(null)
const filtreCategorie = ref('Tout')
const recherche = ref('')
const filtreDate = ref('')
const pageActuelle = ref(1)
const annoncesParPage = ref(10)
const isStatut = ref('valide')
const showOptions = ref(null)
const dateFiltreOptions = [
  'Tout',
  'Il y a 1 mois',
  'Il y a 3 mois',
  'Il y a 6 mois',
  'Plus de 1 an'
]
// ---------------------------------------------------------------------------------------------------------
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

function isImageFileName(fileName) {
  if (typeof fileName !== 'string') return false
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'ico', 'avif']
  const extension = fileName.split('.').pop().toLowerCase()
  return imageExtensions.includes(extension)
}

const toggleOptions = (id) => {
  if (showOptions.value === id) {
    showOptions.value = null
  } else {
    showOptions.value = id
  }
}

function switchStatus(statut) {
  isStatut.value = statut
}

const totalPages = computed(() => Math.ceil(annoncesFiltrees.value.length / annoncesParPage.value))

const annoncesAffichees = computed(() =>
  annoncesFiltrees.value.slice(
    (pageActuelle.value - 1) * annoncesParPage.value,
    pageActuelle.value * annoncesParPage.value
  )
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        if (entry.target.getAttribute('data-animate') === 'counter') {
          const counter = entry.target.querySelector('b')
          const targetNumber = parseInt(counter.textContent, 10)
          let currentNumber = 0
          const increment = targetNumber / 100
          const interval = setInterval(() => {
            currentNumber += increment
            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber
              clearInterval(interval)
            }
            counter.textContent = Math.round(currentNumber)
          }, 30)
        }
      }
    })
  })

  const fadeInElements = document.querySelectorAll('[data-animate="fade-in"]')
  const counterElements = document.querySelectorAll('[data-animate="counter"]')

  fadeInElements.forEach((el) => observer.observe(el))
  counterElements.forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const annoncesFiltrees = computed(() => {
  let result = annonces.listAnnonce

  // Filtrer par statut
  if (isStatut.value === 'valide') {
    result = result.filter((a) => a.status === 'valide')
  } else if (isStatut.value === 'attente') {
    result = result.filter((a) => a.status === 'attente')
  }

  // Filtrer par catégorie
  if (filtreCategorie.value !== 'Tout') {
    result = result.filter((a) => a.categori.titre === filtreCategorie.value)
  }

  // Filtrer par recherche
  if (recherche.value) {
    result = result.filter(
      (a) =>
        (a.titre && a.titre.toLowerCase().includes(recherche.value.toLowerCase())) ||
        (a.description && a.description.toLowerCase().includes(recherche.value.toLowerCase()))
    )
  }

  // Filtrer par date
  if (filtreDate.value) {
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    result = result.filter((a) => {
      const annonceDate = new Date(a.created_at)
      const monthsAgo = (date) => {
        const d = new Date(date)
        d.setMonth(now.getMonth() - d.getMonth())
        return d
      }

      switch (filtreDate.value.trim()) {
        case 'Il y a 1 mois':
          return annonceDate <= monthsAgo(1) && annonceDate > oneYearAgo
        case 'Il y a 3 mois':
          return annonceDate <= monthsAgo(3) && annonceDate > oneYearAgo
        case 'Il y a 6 mois':
          return annonceDate <= monthsAgo(6) && annonceDate > oneYearAgo
        case 'Plus de 1 an':
          return annonceDate <= oneYearAgo
        default:
          return true
      }
    })
  }

  return result
})

function handlePage(valeur) {
  annoncesParPage.value = valeur
}

function handleDate(valeur) {
  filtreDate.value = valeur
}

// -----------------------------------------------------------------------------------------------------------
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
const newComsEmojiInput = ref(null)

function addEmojiComs(event) {
  const input = newComsEmojiInput.value
  const emoji = event.detail.unicode
  const start = input.selectionStart
  const end = input.selectionEnd
  coms.value = coms.value.substring(0, start) + emoji + coms.value.substring(end)
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = start + emoji.length
    input.focus()
  }, 0)
}

function handleSelection(valeur) {
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
      text = text.replace(/#(\w+)/g, '<span class="text-blue-500 font-bold">#$1</span>')
    }
    if (text.includes('@')) {
      text = text.replace(/@(\w+)/g, '<span class="font-bold">@$1</span>')
    }
  }
  return text
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
  isComs.value = false
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

function validerPOST(id) {
  let formData = new FormData()
  formData.append('status', 'valide')
  formData.append('_method', 'PUT')
  show.showSpinner = true
  axios
    .post(`${URL}/api/annonce/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      messages.messageSucces = 'Annonce modifié avec succès !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      annonces.getAllAnnonce()
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}

function annullerPOST(id) {
  let formData = new FormData()
  formData.append('status', 'attente')
  formData.append('_method', 'PUT')
  show.showSpinner = true
  axios
    .post(`${URL}/api/annonce/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      messages.messageSucces = 'Annonce modifié avec succès !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      annonces.getAllAnnonce()
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
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
  updateTime()
})
</script>

<style scoped src="../styles/Login.css"></style>
