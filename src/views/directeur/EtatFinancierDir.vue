<template>
  <div class="flex justify-center">
    <div :class="theme.theme === 'light' ? '' : 'text-white '" class="w-[75%] py-2 px-5">
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
      <RadioGroup v-model="niveau.NiveauCheck">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="flex space-x-2">
          <RadioGroupOption
            as="div"
            v-for="(niv, index) in niveau.ListNiveau"
            :key="index"
            :value="{ id: niv.id, abr_niveau: niv.abr_niveau, nom_niveau: niv.nom_niveau }"
            v-slot="{ active }"
          >
            <div
              :class="[
                active ? '' : 'ring-2 ring-white/60 ring-offset-2 ring-offset-teal-500',
                niveau.NiveauCheck.id === niv.id
                  ? 'bg-teal-500 text-white px-3 ring-2 ring-white/60 ring-offset-2 ring-offset-teal-500 px-5'
                  : 'bg-white px-8'
              ]"
              class="relative radiolist flex cursor-pointer rounded-sm py-1"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="niveau.NiveauCheck.id === niv.id ? 'text-white' : 'text-gray-900'"
                      class="font-medium"
                    >
                      {{ niv.abr_niveau }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-sky-100' : 'text-gray-500'"
                      class="inline"
                    >
                    </RadioGroupDescription>
                  </div>
                  <div v-show="niveau.NiveauCheck.id === niv.id" class="shrink-0 text-white ml-2">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <div v-if="!isDetails" class="mt-4 flex justify-between">
        <div v-if="niveau.ListNiveau.length !== 0" class="text-xl flex flex-col">
          <p>
            Montant pour ce niveau :
            <b class="text-yellow-500 text-lg">{{ totalMontantNiveau }} Ariary</b>
          </p>
          <button
            @click="showDetails"
            class="text-xs border w-20 border-yellow-500 text-white bg-yellow-500 py-1 flex justify-center items-center gap-2 rounded mt-2"
          >
            <font-awesome-icon :icon="['fas', 'eye']" />
            Détails
          </button>
        </div>
      </div>
      <div v-if="isDetails">
        <div class="mt-4 flex justify-between">
          <div v-if="niveau.ListNiveau.length !== 0" class="text-xl flex flex-col">
            <p>
              Montant pour ce niveau :
              <b class="text-yellow-500 text-lg">{{ totalMontantNiveau }} Ariary</b>
            </p>
            <button
              @click="closeDetails"
              class="text-xs border w-40 border-yellow-500 text-white text-yellow-500 bg-white flex justify-center items-center gap-2 py-1 rounded mt-2"
            >
              <font-awesome-icon :icon="['fas', 'eye-slash']" class="text-yellow-500" />
              Moins de détails
            </button>
          </div>
          <div class="flex gap-2 text-xs">
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
                <p
                  v-for="cat in CategorieOptions"
                  :key="cat"
                  class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                >
                  <span class="!flex gap-2">
                    <input
                      type="radio"
                      :value="cat"
                      v-model="filtreCategorie"
                      class="cursor-pointer"
                    />{{ cat }}</span
                  >
                </p>
              </div>
            </div>
            <Select v-model="selectedDateFilter">
              <SelectTrigger
                class="w-40 text-center select-trigger !bg-gray-200 h-8 !text-gray-600"
              >
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
        </div>
        <div class="max-h-[50vh] mt-5">
          <div v-if="filteredTransactions.length !== 0" class="text-sm flex items-center font-bold">
            <font-awesome-icon
              class="text-gray-800 cursor-pointer mr-2"
              :icon="['fas', 'list-ul']"
            />Liste des transactions :
          </div>
          <div class="mt-4 overflow-y-auto">
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
              <div class="text-gray-500 w-[20%]">{{ trans.niveau?.abr_niveau }}</div>
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
                    class="text-blue-500 bg-blue-200 p-2 py-1.5 rounded-full cursor-pointer h-4 w-3"
                    :icon="['fas', 'file-pdf']"
                /></Tooltip>
              </div>
            </div>
          </div>
          <div
            v-if="filteredTransactions.length === 0 || niveau.ListNiveau.length === 0"
            class="flex items-center justify-center flex-col"
          >
            <div
              class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
            ></div>
            <p class="text-xs font-bold mt-2">Aucune transaction n'a été trouvée</p>
          </div>
        </div>
        <div v-if="transaction.listTrans.length !== 0" class="mt-5 flex items-end justify-between">
          <div class="flex items-end">
            <p class="text-lg mr-2">Total annuel :</p>
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
          <button
            @click="
              () => {
                show.showCaissepdf = true
              }
            "
            :class="theme.theme === 'light' ? '' : '!bg-gray-400'"
            class="w-60 bg-blue-500 text-white flex items-center justify-center gap-2 py-2 rounded text-xs cursor-pointer"
          >
            <font-awesome-icon :icon="['fas', 'print']" />
            Imprimer le rapport de caisse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useAu } from '@/stores/Au'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTheme } from '@/stores/Theme'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { useNiveau } from '@/stores/Niveau'
import { useTransaction } from '@/stores/Transaction'
import { useUrl } from '@/stores/url'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ref, onUnmounted, onMounted, computed, watch } from 'vue'
import { useShow } from '@/stores/Show'

const show = useShow()
const au = useAu()
const theme = useTheme()
const niveau = useNiveau()
const transaction = useTransaction()
const URL = useUrl().url

const dateFiltreOptions = ['Récemment', 'Il y a 1 mois', 'Il y a 3 mois', 'Plus de 6 mois']
const CategorieOptions = [
  'Tout',
  'Frais de scolarité',
  'Relevé de notes',
  'Certificat de scolarité'
]

const showCategorieMenu = ref(false)
const menuRef = ref(null)
const isDetails = ref(false)
const filtreCategorie = ref('Tout')
const selectedDateFilter = ref('Récemment')

function showDetails() {
  isDetails.value = true
}

function closeDetails() {
  isDetails.value = false
}

watch(
  () => au.oneAU,
  () => {
    closeDetails()
    transaction.listTrans = []
  }
)

const filteredTransactions = computed(() => {
  const filtered = transaction.listTrans.filter((trans) => {
    const niveauMatch = niveau.NiveauCheck.id ? trans.niveau?.id === niveau.NiveauCheck.id : true
    const categorieMatch =
      filtreCategorie.value === 'Tout' ? true : trans.categorie === filtreCategorie.value
    const dateMatch = filterByDate(trans.date)
    return niveauMatch && categorieMatch && dateMatch
  })
  return filtered
})

const totalMontantNiveau = computed(() => {
  const niveauId = niveau.NiveauCheck.id
  closeDetails()
  return transaction.listTrans.reduce((total, trans) => {
    if (trans.niveau?.id === niveauId) {
      return total + (trans.type === 'Recette' ? trans.montant : -trans.montant)
    }
    return total
  }, 0)
})

const filterByDate = (date) => {
  const [day, month, year] = date.split('/').map(Number)
  const transDate = new Date(year, month - 1, day)
  const today = new Date()
  switch (selectedDateFilter.value) {
    case 'Récemment':
      return (
        (transDate.getMonth() === today.getMonth() &&
          transDate.getFullYear() === today.getFullYear()) ||
        (today.getDate() <= 7 &&
          transDate.getMonth() === (today.getMonth() - 1) % 12 &&
          transDate.getFullYear() === today.getFullYear())
      )
    case 'Il y a 1 mois':
      return transDate < new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    case 'Il y a 3 mois':
      return transDate < new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
    case 'Plus de 6 mois':
      return transDate < new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
    default:
      return true
  }
}

function generateFac(trans) {
  transaction.oneFacture = trans
  show.showFacturepdf = true
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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
</script>

<style scoped>
.select-trigger:focus {
  outline: none;
  box-shadow: none;
}
</style>
