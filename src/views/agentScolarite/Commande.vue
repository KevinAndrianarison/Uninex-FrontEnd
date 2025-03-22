<template>
  <div class="flex justify-center">
    <div class="w-[80%] py-2">
      <div class="flex justify-between">
        <h1 class="text-lg font-bold flex items-center">
          <InboxArrowDownIcon class="h-5 w-5 mr-2" />Liste des commandes
        </h1>
        <div class="flex items-center justify-end gap-2">
          <p class="font-bold">Année universitaire :</p>
          <Listbox v-model="au.oneAU">
            <div class="relative w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
                class="text-black relative w-full border border-blue-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="block truncate">{{ au.oneAU }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    :key="index"
                    v-for="(AU, index) in au.listeAU"
                    :value="AU.annee_debut + '-' + AU.annee_fin"
                    as="div"
                    @click="changeAU(AU.id)"
                  >
                    <li
                      class="leftLi"
                      :class="[
                        au.oneAU === AU.annee_debut + '-' + AU.annee_fin
                          ? 'bg-amber-100 text-amber-900'
                          : '',
                        'relative cursor-default  text-center select-none py-2 '
                      ]"
                    >
                      <span
                        class="spanAU"
                        :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                        >{{ AU.annee_debut }} - {{ AU.annee_fin }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-left pl-3 text-amber-600"
                      >
                      </span>
                      <span
                        v-if="au.oneAU === AU.annee_debut + '-' + AU.annee_fin"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
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
            <li class="font-bold w-[25%]">Nom</li>
            <li class="font-bold w-[15%]">Catégorie</li>
            <li class="font-bold w-[15%]">Statut</li>
            <li class="font-bold w-[15%] text-center">Parcours</li>
            <li class="font-bold w-[15%] text-center">Date</li>
            <li class="font-bold w-[15%] text-center">Action(s)</li>
          </div>
          <div class="max-h-[60vh] overflow-y-auto">
            <div
              v-for="(cmnd, index) in filteredListCommand"
              :key="cmnd.id"
              class="list-none flex text-xs w-full py-2 items-center border-b"
            >
              <li class="w-[25%] truncate">{{ cmnd.etudiant.nomComplet_etud }}</li>
              <li class="w-[15%] text-blue-500">{{ cmnd.categorie }}</li>
              <li class="w-[15%] flex justify-left">
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
              <li class="w-[15%] text-center">{{ cmnd.date }}</li>
              <li class="w-[15%] text-center flex justify-center gap-1">
                <p>
                  <font-awesome-icon
                    @click="confirmValiderCommande(cmnd.id, cmnd.categorie, cmnd)"
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
                    v-if="cmnd.status === 'En attente' && (show.showNavBarAS || show.showNavBarSECPAL)"
                    @click="confirmAnnulerCommande(cmnd.id)"
                    class="text-red-500 border-2 border-red-500 px-1.5 p-1 rounded-full cursor-pointer"
                  />
                </p>
                <p>
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    @click="getOneEtudiant(cmnd.categorie, cmnd.etudiant.id, cmnd.etudiant, cmnd.au)"
                    class="text-blue-500 border-2 border-blue-500 p-1 rounded-full cursor-pointer"
                  />
                </p>
                <p>
                  <font-awesome-icon
                    v-if="show.showNavBarEtud"
                    :icon="['fas', 'trash']"
                    @click="confirmDeleteCommande(cmnd.id)"
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
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { onMounted, onUnmounted, ref, onBeforeMount, computed } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/show'
import { useEtudiant } from '@/stores/Etudiant'
import { useAu } from '@/stores/Au'
import { useTheme } from '@/stores/Theme'
import { useDirecteur } from '@/stores/Directeur'
import Notiflix from 'notiflix'

const filterType = ref('Tout')
const showCategorieMenu = ref(false)
const menuRef = ref(null)
const selectedAU = ref('')
const listCommand = ref([])
const URL = useUrl().url
const show = useShow()
const etudiant = useEtudiant()
const messages = useMessages()
const theme = useTheme()
const au = useAu()
const directeur = useDirecteur()


function getAllCommande() {
  axios
    .get(`${URL}/api/commande`)
    .then((response) => {      
      listCommand.value = response.data
      if (listCommand.value.length > 0) {
        selectedAU.value = listCommand.value[0].au.id
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

onBeforeMount(() => {
  getAllCommande()
})

function changeAU(id) {
  selectedAU.value = id
}

const filteredListCommand = computed(() => {
  return listCommand.value.filter((cmnd) => {
    const matchesAU = cmnd.au.id === selectedAU.value
    const matchesCategory = filterType.value === 'Tout' || cmnd.categorie === filterType.value
    return matchesAU && matchesCategory
  })
})

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

function validerCommande(id, ctg, obj) {
  const dateActuelle = new Date()
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR')
  let formData = {
    status: 'Validé'
  }
  show.showSpinner = true
  axios
    .put(`${URL}/api/commande/${id}`, formData)
    .then((response) => {
      messages.messageSucces = 'Validation effectuée !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      getAllCommande()
      if (ctg === 'Relevé des notes') {
        let formData = {
          montant: obj.au.montant_releve,
          type: 'Recette',
          description: `Droit de relevé des notes de Monsieur/Madame ${obj.etudiant.nomComplet_etud} en ${obj.etudiant.niveau.abr_niveau} pour l'année universitaire ${obj.au.annee_debut}-${obj.au.annee_fin}`,
          categorie: 'Relevé de notes',
          user_id: obj.etudiant.user_id,
          date: dateFormatee,
          au_id: obj.au_id,
          niveau_id: obj.etudiant.niveau_id
        }
        postTransaction(formData)
      }
      if (ctg === 'Certificat de scolarité') {
        let formData = {
          montant: obj.etudiant.niveau.montant_droit,
          type: 'Recette',
          description: `Droit de certificat de scolarité de Monsieur/Madame ${obj.etudiant.nomComplet_etud} en ${obj.etudiant.niveau.abr_niveau} pour l'année universitaire ${obj.au.annee_debut}-${obj.au.annee_fin}`,
          categorie: 'Certificat de scolarité',
          user_id: obj.etudiant.user_id,
          date: dateFormatee,
          au_id: obj.au_id,
          niveau_id: obj.etudiant.niveau_id
        }
        postTransaction(formData)
      }
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function confirmValiderCommande(id, ctg, obj) {
  Notiflix.Confirm.show(
    'Confirmation',
    'Voulez-vous vraiment valider cette commande ?',
    'Oui',
    'Non',
    () => {
      validerCommande(id, ctg, obj)
    },
    () => {}
  )
}

function postTransaction(formData) {
  axios
    .post(`${URL}/api/transaction`, formData)
    .then((response) => {})
    .catch((err) => {
      console.error(err)
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
      messages.messageSucces = 'Annulation effectuée !'
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

function confirmAnnulerCommande(id) {
  Notiflix.Confirm.show(
    'Confirmation',
    'Voulez-vous vraiment annuler cette commande ?',
    'Oui',
    'Non',
    () => {
      AnnulerCommande(id)
    },
    () => {}
  )
}

function deleteCommande(id) {
  show.showSpinner = true
  axios
    .delete(`${URL}/api/commande/${id}`)
    .then((response) => {
      messages.messageSucces = 'Commande supprimée !'
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

function confirmDeleteCommande(id) {
  Notiflix.Confirm.show(
    'Confirmation',
    'Voulez-vous vraiment supprimer cette commande ?',
    'Oui',
    'Non',
    () => {
      deleteCommande(id)
    },
    () => {}
  )
}

function getOneEtudiant(ctg, id, etd, annee) {
  if (ctg === 'Relevé des notes') {
    etudiant.isshowNotes = true
    etudiant.id_etud = id
    etudiant.getEtudiantById()
  }
  if (ctg === 'Certificat de scolarité') {
    directeur.getFirst()
    etudiant.auCert = annee
    etudiant.etudiantCert = etd
    show.showCertificatModal = true
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
