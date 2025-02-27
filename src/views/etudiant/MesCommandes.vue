<template>
  <div class="flex justify-center">
    <div class="w-[80%] py-2">
      <div class="flex justify-between">
        <h1 class="text-lg font-bold flex items-center">
          <InboxArrowDownIcon class="h-5 w-5 mr-2" />Mes des commandes
        </h1>
      </div>

      <div class="bg-white mt-2 px-10 py-5 flex flex-col gap-5">
        <div class="flex justify-between items-end">
          <div class="relative text-xs" ref="menuRef">
            <button
              @click="showCategorieMenu = !showCategorieMenu"
              class="px-4 py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
            >
              Catégorie <font-awesome-icon class="cursor-pointer" :icon="['fas', 'filter']" />
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
                    value="Relevé des notes"
                    class="cursor-pointer"
                  />Relevé des notes</span
                >
              </p>
              <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                <span class="!flex gap-2">
                  <input
                    type="radio"
                    v-model="filterType"
                    value="Certificat de scolarité"
                    class="cursor-pointer"
                  />Certificat de scolarité</span
                >
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="list-none flex text-xs w-full pb-2 border-b-2">
            <li class="font-bold w-[25%]">Catégorie</li>
            <li class="font-bold w-[20%]">Statut</li>
            <li class="font-bold w-[15%] text-center">Parcours</li>
            <li class="font-bold w-[20%] text-center">Date</li>
            <li class="font-bold w-[20%] text-center">Action(s)</li>
          </div>
          <div class="max-h-[60vh] overflow-y-auto">
            <div
              v-for="(cmnd, index) in filteredListCommand"
              :key="cmnd.id"
              class="list-none flex text-xs w-full py-2 items-center border-b"
            >
              <li class="w-[25%] text-blue-500">{{ cmnd.categorie }}</li>
              <li class="w-[20%] flex justify-left">
                <p
                  v-if="cmnd.status === 'En attente'"
                  class="text-white bg-yellow-400 px-2.5 py-1 rounded-xl"
                >
                  {{ cmnd.status }}
                </p>
                <p
                  v-if="cmnd.status === 'Validé'"
                  class="text-white bg-green-400 px-2.5 py-1 rounded-xl"
                >
                  {{ cmnd.status }}
                </p>
              </li>
              <li class="w-[15%] text-center">
                {{
                  cmnd.etudiant.matricule_etud.split('/')[
                    cmnd.etudiant.matricule_etud.split('/').length - 1
                  ]
                }}
              </li>
              <li class="w-[20%] text-center">{{ cmnd.date }}</li>
              <li class="w-[20%] text-center flex justify-center gap-1">
                <p>
                  <font-awesome-icon
                    @click="validerCommande(cmnd.id)"
                    :icon="['fas', 'circle-check']"
                    v-if="
                      cmnd.status === 'En attente' && (show.showNavBarAS || show.showNavBarSECPAL)
                    "
                    class="text-green-500 border-2 border-green-500 p-1 rounded-full cursor-pointer"
                  />
                </p>
                <p>
                  <font-awesome-icon
                    :icon="['fas', 'xmark']"
                    v-if="cmnd.status === 'Validé' && (show.showNavBarAS || show.showNavBarSECPAL)"
                    @click="AnnulerCommande(cmnd.id)"
                    class="text-red-500 border-2 border-red-500 px-1.5 p-1 rounded-full cursor-pointer"
                  />
                </p>
                <p>
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    @click="getOneEtudiant(cmnd.categorie, cmnd.etudiant.id)"
                    class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                  />
                </p>
                <p>
                  <font-awesome-icon
                    v-if="show.showNavBarEtud && cmnd.status === 'En attente'"
                    :icon="['fas', 'trash']"
                    class="text-red-500 border-2 border-red-500 p-1 rounded-full cursor-pointer"
                  />
                </p>
              </li>
            </div>
          </div>

          <div
            v-if="filteredListCommand.length === 0"
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
import { onMounted, onUnmounted, ref, onBeforeMount, computed } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/show'
import { useEtudiant } from '@/stores/Etudiant'

const filterType = ref('Tout')
const showCategorieMenu = ref(false)
const menuRef = ref(null)
const listCommand = ref([])
const URL = useUrl().url
const show = useShow()
const etudiant = useEtudiant()
const messages = useMessages()

function getAllCommande() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  axios
    .get(`${URL}/api/commandeGetByEtd/${user.id}`)
    .then((response) => {
      listCommand.value = response.data
    })
    .catch((err) => {
      console.error(err)
    })
}

onBeforeMount(() => {
  getAllCommande()
})

const filteredListCommand = computed(() => {
  return listCommand.value.filter((cmnd) => {
    const matchesCategory = filterType.value === 'Tout' || cmnd.categorie === filterType.value
    return matchesCategory
  })
})

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

function validerCommande(id) {
  let formData = {
    status: 'Validé'
  }
  show.showSpinner = true
  axios
    .put(`${URL}/api/commande/${id}`, formData)
    .then((response) => {
      messages.messageSucces = 'Modification effectuée !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      getAllCommande()
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function AnnulerCommande(id) {
  let formData = {
    status: 'En attente'
  }
  show.showSpinner = true
  axios
    .put(`${URL}/api/commande/${id}`, formData)
    .then((response) => {
      messages.messageSucces = 'Modification effectuée !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      getAllCommande()
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function getOneEtudiant(ctg, id) {
  if (ctg === 'Relevé des notes') {
    etudiant.isshowNotes = true
    etudiant.id_etud = id
    etudiant.getEtudiantById()
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
