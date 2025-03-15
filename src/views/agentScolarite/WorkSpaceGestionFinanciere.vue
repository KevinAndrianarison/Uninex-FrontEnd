<template>
  <div
    :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
    class="border rounded-lg bg-white flex h-[85vh]"
  >
    <div class="w-[65%] p-4 h-full overflow-y-auto text-xl">
      <div class="">
        <div class="flex justify-between items-center">
          <div class="flex items-center font-bold">
            <PresentationChartLineIcon class="h-5 w-5 mr-2" />Gestion financière
          </div>
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
                    as="template"
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
          <div class="mr-2 flex">
            <p class="text-lg mr-2">Total :</p>
            <p
              :class="
                transaction.totalMontant >= 0
                  ? 'font-bold text-green-500 '
                  : 'font-bold text-red-500'
              "
            >
              Ar {{ transaction.totalMontant }}
            </p>
          </div>
        </div>
        <div class="flex gap-2 justify-center max-h-[500px] p-4 border-b overflow-y-auto flex-wrap">
          <div
            v-for="depense in transaction.listDepense"
            :key="depense.id"
            class="h-[150px] w-[150px] border rounded-xl bg-gray-200 flex flex-col justify-center items-center"
          >
            <p class="text-xs font-bold text-red-500">- Ar {{ depense.montant }}</p>
            <p class="w-[50px] h-[50px] depense mt-2"></p>
            <p class="text-yellow-500 text-sm mt-2 text-center">{{ depense.categorie }}</p>
          </div>
          <div
            v-for="recette in transaction.listRecette"
            :key="recette.id"
            class="h-[150px] w-[150px] border rounded-xl bg-gray-200 flex flex-col justify-center items-center"
          >
            <p class="text-xs font-bold text-green-500">+ Ar {{ recette.montant }}</p>
            <p class="w-[50px] h-[50px] recette mt-2"></p>
            <p class="text-yellow-500 text-sm mt-2 text-center">{{ recette.categorie }}</p>
          </div>
        </div>
        <div class="mt-4 text-sm font-bold">
          <font-awesome-icon
            class="iconadd text-gray-800 cursor-pointer mr-2"
            :icon="['fas', 'clock-rotate-left']"
          />Historique des transactions :
        </div>
        <div class="flex items-center gap-4 mt-4 text-xs border-l-4 pl-2 border-yellow-500">
          <label for="searchDate" class="font-bold text-gray-700">Filtrer par date :</label>
          <input
            id="searchDate"
            type="date"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            v-model="searchDate"
            class="focus:outline-none"
          />
        </div>
        <div class="max-h-[300px] overflow-y-auto border-b p-4">
          <div
            :key="index"
            v-for="(trans, index) in filteredTransactions"
            class="text-sm flex items-center text-center"
          >
            <div
              :style="{
                'background-image':
                  'url(' +
                  `${URL}/storage/users/${
                    trans.user.photo_name || 'téléchargement-removebg-preview.png'
                  } ` +
                  ')',
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="w-[30px] h-[30px] rounded-3xl"
            ></div>
            <div class="text-gray-500 w-[20%] truncate">{{ trans.user.email }}</div>
            <div class="text-gray-500 w-[20%]">{{ trans.type }}</div>
            <div class="text-gray-500 w-[20%]">{{ trans.date || 'Inconnue' }}</div>
            <div
              :class="
                trans.type === 'Recette'
                  ? 'font-bold text-green-500 w-[15%] flex'
                  : 'font-bold text-red-500 w-[15%] flex'
              "
            >
              <p v-if="trans.type === 'Recette'">+</p>
              <p v-if="trans.type === 'Dépense'">-</p>

              Ar {{ trans.montant }}
            </div>
            <div class="text-gray-500 w-[20%] text-left">{{ trans.categorie }}</div>
            <div class="text-center w-[5%]">
              <Tooltip content="Générer une facture">
                <font-awesome-icon
                  @click="generateFac(trans)"
                  class="iconadd text-blue-500 cursor-pointer h-4 w-3"
                  :icon="['fas', 'file-pdf']"
              /></Tooltip>
            </div>
          </div>
          <p v-if="filteredTransactions.length === 0" class="text-xs text-center text-gray-500">
            Aucune transaction à été trouvé
          </p>
        </div>
        <div class="mt-5 text-sm font-bold">
          <font-awesome-icon
            class="iconadd text-gray-800 cursor-pointer mr-2"
            :icon="['fas', 'chart-simple']"
          />Diagramme :
        </div>
        <div class="mt-2 h-[200px] flex justify-center items-center overflow-x-autp">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
    <div class="w-[35%] border-l p-4">
      <div class="h-[75%] font-bold">
        <h1 class="text-md mx-4">
          <font-awesome-icon
            class="iconadd text-gray-600 cursor-pointer mr-2"
            :icon="['fas', 'circle-plus']"
          />Ajouter une recette ou une dépense !
        </h1>
        <div class="sm:col-span-3 mt-2 mx-4 ctgr">
          <label class="block text-sm font-medium leading-6 text-gray-900">Type :</label>
          <Listbox v-model="typeValue">
            <div class="relative z-10 mt-2">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="block truncate">{{ typeValue }}</span>
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
                  :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="type in types"
                    :key="type"
                    :value="type"
                    as="div"
                    @click="switchCateg"
                  >
                    <li
                      :class="[
                        selected ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                        type
                      }}</span>
                      <span
                        v-if="selected"
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
        <div class="sm:col-span-3 mt-2 mx-4 ctgr">
          <label class="block text-sm font-medium leading-6 text-gray-900">Catégorie :</label>
          <Listbox v-model="categorieValue">
            <div class="relative mt-2">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="block truncate">{{ categorieValue }}</span>
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
                  :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="categorie in categories"
                    :key="categorie"
                    :value="categorie"
                    as="template"
                  >
                    <li
                      :class="[
                        selected ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                        categorie
                      }}</span>
                      <span
                        v-if="selected"
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
        <div class="max-h-[70%] overflow-y-auto">
          <div class="sm:col-span-3 mt-2 mx-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Montant (<b>Ariary</b>) :</label
            >
            <div class="mt-2">
              <input
                type="number"
                v-model="montant"
                :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mx-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Motif :</label>
            <div class="mt-2">
              <textarea
                v-model="motif"
                :class="theme.theme === 'light' ? '' : '!bg-gray-200'"
                class="pl-3 pr-3 min-h-[60px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="sm:col-span-3 mt-5 mx-4">
          <Button
            @click="postTransaction()"
            class="btn bg-blue-500 w-full text-white py-2 rounded cursor-pointer"
          >
            Valider</Button
          >
          <Button
            @click="
              () => {
                show.showCaissepdf = true
              }
            "
            :class="theme.theme === 'light' ? '' : '!bg-gray-400'"
            class="btn bg-gray-300 w-full py-2 rounded cursor-pointer mt-1"
          >
            📁 Imprimer le rapport de caisse
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PresentationChartLineIcon, SparklesIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ref, onBeforeMount, onMounted, watch, computed } from 'vue'
import { useAu } from '@/stores/Au'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/Show'
import { useTransaction } from '@/stores/Transaction'
import { Chart, registerables } from 'chart.js'
import Tooltip from '../../components/Tooltip.vue'
import { useTheme } from '@/stores/Theme'
import Notiflix from 'notiflix'

Chart.register(...registerables)

let categorieValue = ref('')
let montant = ref(null)
let motif = ref('')
let categories = ref([])
const chartCanvas = ref(null)
let chartInstance = null
const searchDate = ref(null)

const au = useAu()
const transaction = useTransaction()
const messages = useMessages()
const show = useShow()
const URL = useUrl().url
const theme = useTheme()

onMounted(() => {
  updateChart()
})

function generateFac(trans) {
  transaction.oneFacture = trans
  show.showFacturepdf = true
}

const filteredTransactions = computed(() => {
  if (!searchDate.value) return transaction.listTrans
  const selectedDate = new Date(searchDate.value)
  selectedDate.setHours(0, 0, 0, 0)
  return transaction.listTrans.filter((trans) => {
    if (!trans.date) return false
    const [day, month, year] = trans.date.split('/').map(Number)
    const transDate = new Date(year, month - 1, day)
    transDate.setHours(0, 0, 0, 0)
    return selectedDate.getTime() === transDate.getTime()
  })
})

const updateChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  const categoriesDepense = transaction.listDepense.map((item) => item.categorie)
  const montantsDepense = transaction.listDepense.map((item) => -item.montant)
  const categoriesRecette = transaction.listRecette.map((item) => item.categorie)
  const montantsRecette = transaction.listRecette.map((item) => item.montant)
  const categories = [...new Set([...categoriesDepense, ...categoriesRecette])]
  const dataDepense = categories.map(
    (cat) => transaction.listDepense.find((item) => item.categorie === cat)?.montant || 0
  )
  const dataRecette = categories.map(
    (cat) => transaction.listRecette.find((item) => item.categorie === cat)?.montant || 0
  )
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Dépenses',
          data: dataDepense.map((v) => -v),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Recettes',
          data: dataRecette,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw} Ar`
            }
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: '#000'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `${value} Ar`
          }
        },
        x: {
          ticks: {
            color: '#555'
          }
        }
      }
    }
  })
}

watch(
  () => transaction.listDepense,
  (newValue) => {
    if (newValue) {
      updateChart()
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => transaction.listRecette,
  (newValue) => {
    if (newValue) {
      updateChart()
    }
  },
  { deep: true }
)

const categoriesRecette = [
  'Subventions publiques',
  'Dons',
  'Revenus de recherche',
  'Location des infrastructures',
  'Services aux étudiants',
  'Événements',
  'Partenariats et collaborations',
  'Autre'
]
const categoriesDepense = [
  'Salaires',
  'Entretien et maintenance',
  'Frais de fonctionnement',
  'Achat de matériel',
  'Frais de voyage',
  " Remboursement d'emprunts",
  'Frais bancaires',
  'Autre'
]

let typeValue = ref('')
const types = ['Recette', 'Dépense']

onBeforeMount(() => {
  transaction.isTrans = true
  categorieValue.value = categoriesRecette[0]
  typeValue.value = types[0]
  categories.value = categoriesRecette
})

function switchCateg() {
  if (typeValue.value === 'Recette') {
    categories.value = categoriesRecette
    categorieValue.value = categoriesRecette[0]
  }
  if (typeValue.value === 'Dépense') {
    categories.value = categoriesDepense
    categorieValue.value = categoriesDepense[0]
  }
}

function postTransaction() {
  const dateActuelle = new Date()
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR')

  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  let formData = {
    montant: montant.value,
    type: typeValue.value,
    description: motif.value,
    categorie: categorieValue.value,
    user_id: Number(user.user.id),
    au_id: au.idAU,
    date: dateFormatee
  }

  if (motif.value && montant.value) {
    Notiflix.Confirm.show(
      'Confirmation',
      'Voulez-vous vraiment valider cette transaction ?',
      'Oui',
      'Non',
      () => {
        show.showSpinner = true
        axios
          .post(`${URL}/api/transaction`, formData)
          .then((response) => {
            transaction.getByIdAU()
            messages.messageSucces = 'Transaction réussie !'
            montant.value = null
            motif.value = ''
            show.showSpinner = false
            setTimeout(() => {
              messages.messageSucces = ''
            }, 3000)
          })
          .catch((err) => {
            console.error(err)
            show.showSpinner = false
          })
      },
      () => {}
    )
  } else {
    Notiflix.Notify.warning('Tous les champs doivent être remplis')
  }
}
</script>

<style scoped>
.depense {
  background-image: url('../../assets/depenses.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.recette {
  background-image: url('../../assets/revenu.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
