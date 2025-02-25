<template>
  <div class="flex justify-center">
    <div class="w-[75%] py-2">
      <h1 class="text-lg font-bold flex items-center">
        <InboxArrowDownIcon class="h-5 w-5 mr-2" />Liste des commandes
      </h1>

      <div class="hidden bg-white mt-2 px-10 py-5 flex flex-col gap-5">
        <div class="flex justify-between items-end">
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
                  />Relevé des notes</span
                >
              </p>
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input
                    type="radio"
                    v-model="filterType"
                    value="Congé"
                    class="cursor-pointer"
                  />Certificat de scolarité</span
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
          <div class="max-h-48 overflow-y-auto">
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
                    v-if="cng.status === 'En attente'"
                    @click="deleteConge(cng.id)"
                    :icon="['fas', 'trash']"
                    class="text-red-500 border-2 border-red-500 p-1 rounded-full cursor-pointer"
                  />
                </p>
              </li>
            </div>
          </div>

          <div
            v-if="filteredList.length === 0"
            class="flex items-center justify-center flex-col py-5"
          >
            <div
              class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
            ></div>
            <p class="text-xs font-bold mt-2">Aucune demande n'a été trouvée</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InboxArrowDownIcon } from '@heroicons/vue/24/outline'
import { onMounted, onUnmounted, ref, watch, onBeforeMount, computed } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useCategory } from '@/stores/category'
import { useMessages } from '@/stores/messages'
import { useConge } from '@/stores/conge'
import { useShow } from '@/stores/show'

const filterType = ref('Tout')
const showCategorieMenu = ref(false)
const menuRef = ref(null)
const URL = useUrl().url
const category = useCategory()
const conge = useConge()
const show = useShow()

const filteredList = computed(() => {
  if (filterType.value === 'Tout') {
    return conge.listConge
  }
  return conge.listConge.filter((cng) => cng.type === filterType.value)
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

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
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
