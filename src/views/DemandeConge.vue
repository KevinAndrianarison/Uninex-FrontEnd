<template>
  <div class="flex justify-center">
    <div class="w-[75%] py-2">
      <h1 class="text-lg font-bold flex items-center">
        <ClipboardDocumentCheckIcon class="h-5 w-5 mr-2" />Permissions - Congés
      </h1>
      <div class="flex gap-5 mt-5">
        <span class="flex gap-2">
          <input type="radio" v-model="selectedType" value="Permission" />Permission
        </span>
        <span class="flex gap-2">
          <input type="radio" v-model="selectedType" value="Congé" />Congé
        </span>
      </div>
      <div class="flex items-end gap-5 mt-5">
        <div class="flex flex-col gap-2">
          <p class="text-xs font-bold">Description</p>
          <textarea
            placeholder="Ecrire ici"
            v-model="description"
            class="h-40 rounded p-2 focus:ring text-xs w-80 ring-1 focus:outline-none"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-5">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-bold">Début</p>
              <input
                class="h-10 rounded p-2 focus:ring text-xs w-40 ring-1 focus:outline-none"
                type="date"
                v-model="dateDebut"
              />
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xs font-bold">Fin</p>
              <input
                class="h-10 rounded p-2 focus:ring text-xs w-40 ring-1 focus:outline-none"
                type="date"
                v-model="dateFin"
              />
            </div>
          </div>
          <div class="flex items-center gap-2" v-if="selectedType === 'Congé'">
            <Select @update:modelValue="handleCtgSelection">
              <SelectTrigger class="w-full select-trigger">
                <SelectValue class="focus:outline-none text-xs" placeholder="Nouvelle catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="(ctg, index) in category.listCategorieConge"
                    :key="ctg.id"
                    :value="ctg.titre"
                    class="text-xs"
                  >
                    {{ ctg.titre }}</SelectItem
                  >
                  <p class="text-xs text-center" v-if="category.listCategorieConge.length === 0">
                    Aucune catégorie trouvée
                  </p>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger as-child>
                <Tooltip content="Nouvelle catégorie">
                  <font-awesome-icon
                    variant="outline"
                    :icon="['fas', 'square-plus']"
                    class="text-blue-500 cursor-pointer hidden"
                /></Tooltip>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle class="text-sm">Types de congé :</DialogTitle>
                  <div class="mt-2 flex flex-col gap-2 list-none max-h-80 overflow-y-auto">
                    <li
                      v-for="(ctg, index) in category.listCategorieConge"
                      :key="ctg.id"
                      class="flex justify-between items-center text-xs"
                    >
                      {{ ctg.titre }}
                      <font-awesome-icon
                        @click="deleteCtg(ctg.id)"
                        variant="outline"
                        :icon="['fas', 'trash']"
                        class="text-red-500 cursor-pointer text-xs"
                      />
                    </li>
                  </div>
                  <div class="mt-2 flex flex-col gap-2">
                    <input
                      placeholder="Nouvelle catégorie"
                      v-model="categConge"
                      type="text"
                      class="text-xs ring-1 w-full focus:ring py-2 px-2 rounded focus:outline-none"
                    />
                    <div class="w-full flex justify-end">
                      <button
                        @click="createConge"
                        :disabled="!categConge"
                        class="bg-blue-500 rounded px-4 py-2 text-xs text-white"
                      >
                        ENREGISTRER
                      </button>
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div v-if="nomFichier" class="text-xs flex items-center gap-1">
            <p class="w-80 truncate">
              {{ nomFichier }}
            </p>
            <font-awesome-icon
              @click="removeFile"
              :icon="['fas', 'xmark']"
              class="text-red-500 cursor-pointer"
            />
          </div>
          <div class="relative flex items-center">
            <input
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="onFileChange"
              type="file"
              accept="application/pdf"
            />
            <button
              class="text-white bg-blue-500 flex w-full justify-center items-center gap-2 rounded text-xs py-2"
            >
              <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />Importer un fichier
            </button>
          </div>
        </div>
        <button
          @click="postDemande"
          class="text-xs text-white bg-yellow-500 w-28 rounded py-1.5 px-2"
        >
          ENREGISTRER
        </button>
      </div>
      <div v-if="filteredList.length !== 0" class="bg-white mt-5 px-10 py-5 flex flex-col gap-5">
        <div class="flex justify-between items-end">
          <h1 class="text-lg text-blue-500">Mes demandes ({{ filteredList.length }})</h1>
          <div class="relative text-xs" ref="menuRef">
            <button
              @click="showCategorieMenu = !showCategorieMenu"
              class="px-4 py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
            >
              Types <font-awesome-icon class="cursor-pointer" :icon="['fas', 'filter']" />
            </button>

            <div
              v-if="showCategorieMenu"
              class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
            >
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input
                    type="radio"
                    v-model="filterType"
                    value="Tout"
                    class="cursor-pointer"
                  />Tout</span
                >
              </p>
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input
                    type="radio"
                    v-model="filterType"
                    value="Permission"
                    class="cursor-pointer"
                  />Permission</span
                >
              </p>
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input
                    type="radio"
                    v-model="filterType"
                    value="Congé"
                    class="cursor-pointer"
                  />Congé</span
                >
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="list-none flex text-xs w-full pb-2 border-b-2">
            <li class="font-bold w-[20%]">Catégorie</li>
            <li class="font-bold w-[15%]">Type</li>
            <li class="font-bold w-[15%]">Statut</li>
            <li class="font-bold w-[10%] text-center">Début</li>
            <li class="font-bold w-[10%] text-center">Fin</li>
            <li class="font-bold w-[15%] text-center">Pièce jointe</li>
            <li class="font-bold w-[15%] text-center">Action(s)</li>
          </div>
          <div
            v-for="(cng, index) in filteredList"
            :key="cng.id"
            class="list-none flex text-xs w-full py-2 items-center border-b"
          >
            <li class="w-[20%] truncate">{{ cng.category || '...' }}</li>
            <li class="w-[15%] text-blue-500">{{ cng.type }}</li>
            <li class="w-[15%] flex justify-left">
              <p
                v-if="cng.status === 'En attente'"
                class="text-white bg-yellow-400 px-2.5 py-1 rounded-xl"
              >
                {{ cng.status }}
              </p>
              <p
                v-if="cng.status === 'Validé'"
                class="text-white bg-green-400 px-2.5 py-1 rounded-xl"
              >
                {{ cng.status }}
              </p>
              <p
                v-if="cng.status === 'Réfusé'"
                class="text-white bg-red-400 px-2.5 py-1 rounded-xl"
              >
                {{ cng.status }}
              </p>
            </li>
            <li class="w-[10%] text-center">{{ cng.dateDebut }}</li>
            <li class="w-[10%] text-center">{{ cng.dateFin }}</li>
            <li class="w-[15%] text-center flex justify-center gap-2">
              <p>
                <font-awesome-icon
                  @click="showModale(cng)"
                  :icon="['fas', 'eye']"
                  class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                />
              </p>
              <p>
                <font-awesome-icon
                  @click="telecharger(cng.fichier_nom)"
                  :icon="['fas', 'download']"
                  class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                />
              </p>
            </li>
            <li class="w-[15%] text-center flex justify-center gap-1">
              <p>
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  v-if="cng.status === 'Réfusé' || cng.status === 'En attente'"
                  @click="valideConge(cng.id)"
                  class="text-green-500 border-2 border-green-500 p-1 rounded-full cursor-pointer hidden"
                />
              </p>
              <p>
                <font-awesome-icon
                  :icon="['fas', 'xmark']"
                  v-if="cng.status === 'Validé' || cng.status === 'En attente'"
                  @click="refuseConge(cng.id)"
                  class="text-red-500 border-2 border-red-500 px-1.5 p-1 rounded-full cursor-pointer hidden"
                />
              </p>
              <p>
                <font-awesome-icon
                  @click="deleteConge(cng.id)"
                  :icon="['fas', 'trash']"
                  class="text-red-500 border-2 border-red-500 p-1 rounded-full cursor-pointer"
                />
              </p>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { onMounted, onUnmounted, ref, watch, onBeforeMount, computed } from 'vue'
import Notiflix from 'notiflix'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Tooltip from '../components/Tooltip.vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useCategory } from '@/stores/category'
import { useMessages } from '@/stores/messages'
import { useConge } from '@/stores/conge'
import { useShow } from '@/stores/show'
import NProgress from 'nprogress'

const selectedType = ref('Permission')
const filterType = ref('Tout')
const showCategorieMenu = ref(false)
const menuRef = ref(null)
const description = ref('')
const dateDebut = ref('')
const dateFin = ref('')
const nomFichier = ref('')
const categorieName = ref('')
const Fichier = ref(null)
const categConge = ref('')
const URL = useUrl().url
const category = useCategory()
const messages = useMessages()
const conge = useConge()
const show = useShow()

const filteredList = computed(() => {
  if (filterType.value === 'Tout') {
    return conge.listConge
  }
  return conge.listConge.filter((cng) => cng.type === filterType.value)
})

watch(selectedType, (newValue) => {
  if (newValue === 'Permission') {
    categorieName.value = ''
  }
})

function showModale(congeValue) {
  conge.oneConge = congeValue
  show.showConge = true
}

function telecharger(nom) {
  const url = `${URL}/api/congepermission/files/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onBeforeMount(async () => {
  await Promise.all([category.getAllCategorieConge(), conge.getAllCongepermission()])
})

function deleteCtg(id) {
  NProgress.start()
  axios
    .delete(`${URL}/api/categorieconge/${id}`)
    .then((response) => {
      category.getAllCategorieConge()
      NProgress.done()
    })
    .catch((err) => {
      console.error(err)
      NProgress.done()
    })
}

function deleteConge(id) {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/congepermission/${id}`)
    .then((response) => {
      conge.getAllCongepermission()
      show.showSpinner = false
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function refuseConge(id) {
  let formData = {
    status: 'Réfusé'
  }
  show.showSpinner = true
  axios
    .put(`${URL}/api/congepermission/${id}`, formData)
    .then((response) => {
      conge.getAllCongepermission()
      show.showSpinner = false
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function valideConge(id) {
  let formData = {
    status: 'Validé'
  }
  show.showSpinner = true
  axios
    .put(`${URL}/api/congepermission/${id}`, formData)
    .then((response) => {
      conge.getAllCongepermission()
      show.showSpinner = false
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function createConge() {
  let formData = {
    titre: categConge.value
  }
  NProgress.start()
  axios
    .post(`${URL}/api/categorieconge`, formData)
    .then((response) => {
      categConge.value = ''
      category.getAllCategorieConge()
      NProgress.done()
    })
    .catch((err) => {
      console.error(err)
      NProgress.done()
    })
}

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

function postDemande() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  let formData = new FormData()
  formData.append('description', description.value || '')
  formData.append('dateDebut', dateDebut.value || '')
  formData.append('dateFin', dateFin.value || '')
  formData.append('type', selectedType.value || '')
  formData.append('category', categorieName.value || '')
  formData.append('status', 'En attente')
  formData.append('fichier', Fichier.value || null)
  formData.append('user_id', Number(user.user.id) || null)

  if (
    description.value &&
    dateDebut.value &&
    dateFin.value &&
    Fichier.value &&
    selectedType.value
  ) {
    show.showSpinner = true
    axios
      .post(`${URL}/api/congepermission`, formData)
      .then((response) => {
        conge.getAllCongepermission()
        messages.messageSucces = 'Demande envoyée avec succès !'
        description.value = ''
        dateDebut.value = ''
        Fichier.value = null
        nomFichier.value = ''
        dateFin.value = ''
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  } else {
    Notiflix.Notify.warning('Tous les champs doivent être remplis')
  }
}

function handleCtgSelection(valeur) {
  categorieName.value = valeur
}

function onFileChange(event) {
  Fichier.value = event.target.files[0]
  nomFichier.value = event.target.files[0].name
}

function removeFile() {
  Fichier.value = null
  nomFichier.value = ''
}

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
</script>

<style scoped>
.select-trigger:focus {
  outline: none;
  box-shadow: none;
}
</style>
