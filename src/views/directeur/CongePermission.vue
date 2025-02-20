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
                  <SelectItem class="text-xs" value="Congé payé"> Congé payé</SelectItem>
                  <SelectItem class="text-xs" value="Congé sans solde">
                    Congé sans solde
                  </SelectItem>
                  <SelectItem class="text-xs" value="Congé maladie"> Congé maladie </SelectItem>
                  <SelectItem class="text-xs" value="Congé maternité"> Congé maternité </SelectItem>
                  <SelectItem class="text-xs" value="Congé pour raisons familiales ">
                    Congé pour raisons familiales
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger as-child>
                <Tooltip content="Nouvelle catégorie">
                  <font-awesome-icon
                    variant="outline"
                    :icon="['fas', 'square-plus']"
                    class="text-blue-500 cursor-pointer"
                /></Tooltip>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle class="text-sm">Types de congé :</DialogTitle>
                  <div class="mt-2 text-sm flex flex-col gap-2 list-none">
                    <li class="flex justify-between items-center">
                      Nom catégorie
                      <font-awesome-icon
                        variant="outline"
                        :icon="['fas', 'trash']"
                        class="text-red-500 cursor-pointer text-xs"
                      />
                    </li>
                    <li class="flex justify-between items-center">
                      Nom catégorie
                      <font-awesome-icon
                        variant="outline"
                        :icon="['fas', 'trash']"
                        class="text-red-500 cursor-pointer text-xs"
                      />
                    </li>
                  </div>
                  <div class="mt-2 flex flex-col gap-2">
                    <input
                      placeholder="Nouvelle catégorie"
                      type="text"
                      class="text-xs ring-1 w-full focus:ring py-2 px-2 rounded focus:outline-none"
                    />
                    <div class="w-full flex justify-end">
                      <button class="bg-blue-500 rounded px-4 py-2 text-xs text-white">
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
      <div class="bg-white mt-5 px-10 py-5 pb-10 flex flex-col gap-5">
        <div class="flex justify-end">
          <div class="relative text-xs" ref="menuRef">
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
                  <input type="radio" value="Tout" class="cursor-pointer" />Permission</span
                >
              </p>
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input type="radio" value="Tout" class="cursor-pointer" />Congé</span
                >
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="list-none flex text-xs w-full pb-2 border-b-2">
            <li class="font-bold w-[20%]">Catégorie</li>
            <li class="font-bold w-[15%]">Type</li>
            <li class="font-bold w-[15%]">Status</li>
            <li class="font-bold w-[10%] text-center">Début</li>
            <li class="font-bold w-[10%] text-center">Fin</li>
            <li class="font-bold w-[15%] text-center">Pièce jointe</li>
            <li class="font-bold w-[15%] text-center">Action(s)</li>
          </div>
          <div class="list-none flex text-xs w-full py-2 items-center border-b">
            <li class="w-[20%] truncate">Congé payé</li>
            <li class="w-[15%] text-blue-500">Permission</li>
            <li class="w-[15%] flex justify-left">
              <p class="text-white bg-yellow-400 px-2.5 py-1 rounded-xl">En attente</p>
            </li>
            <li class="w-[10%] text-center">10/10/2020</li>
            <li class="w-[10%] text-center">24/02/2024</li>
            <li class="w-[15%] text-center flex justify-center gap-2">
              <p>
                <font-awesome-icon
                  :icon="['fas', 'eye']"
                  class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                />
              </p>
              <p>
                <font-awesome-icon
                  :icon="['fas', 'download']"
                  class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                />
              </p>
            </li>
            <li class="w-[15%] text-center flex justify-center gap-2">
              <p>
                <font-awesome-icon
                  :icon="['fas', 'pen']"
                  class="text-green-500 border-2 border-green-500 p-1 rounded-full cursor-pointer"
                />
              </p>
              <p>
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  class="text-green-500 border-2 border-green-500 p-1 rounded-full cursor-pointer"
                />
              </p>
              <p>
                <font-awesome-icon
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
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Notiflix from 'notiflix'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Tooltip from '../../components/Tooltip.vue'

const selectedType = ref('Permission')
const showCategorieMenu = ref(false)
const menuRef = ref(null)
const description = ref('')
const dateDebut = ref('')
const dateFin = ref('')
const nomFichier = ref('')
const categorieName = ref('')
const Fichier = ref(null)

watch(selectedType, (newValue) => {
  if (newValue === 'Permission') {
    categorieName.value = ''
  }
})

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

function postDemande() {
  if (
    description.value &&
    dateDebut.value &&
    dateFin.value &&
    Fichier.value &&
    selectedType.value
  ) {
    console.log(
      description.value,
      dateDebut.value,
      dateFin.value,
      Fichier.value,
      categorieName.value,
      selectedType.value
    )
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
