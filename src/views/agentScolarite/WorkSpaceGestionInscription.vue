cre
<template>
  <div :class="theme.theme === 'light' ? 'inscr' : 'inscr !bg-gray-600 !text-white'">
    <div class="flex items-center mb-2 justify-between ">
      <h1 class="titre font-bold">
        <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'paperclip']" /> Inscriptions et
        comptes des étudiants
      </h1>
      <div class="flex items-center gap-2">
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
      </div>
    </div>

    <div :class="theme.theme === 'light' ? 'createEtud' : '!bg-gray-600 !text-gray-200'">
      <div class="radio px-4 mt-2 pb-2 ml-2">
        <div class="mt-2">
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
                      <div
                        v-show="niveau.NiveauCheck.id === niv.id"
                        class="shrink-0 text-white ml-2"
                      >
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
        </div>
      </div>

      <h1 class="create pl-5 mt-2" v-if="parcour.parcours_nom">
        Ajouter des étudiants en {{ niveau.NiveauCheck.abr_niveau }} :
      </h1>
      <div v-if="parcour.parcours_nom" class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mr-4 mt-2">
          <label class="block text-sm font-medium leading-6">Nom complet</label>
          <div class="mt-1">
            <input
              type="text"
              v-model="etudiant.nomComplet_etud"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Adresse email</label>
          <div class="mt-1">
            <input
              type="email"
              @input="regex.RegexEmail(user.email)"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              v-model="user.email"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 ctgr mr-4">
          <label class="block text-sm font-medium leading-6">Parcours</label>
          <div class="w-52 mt-1">
            <Listbox v-model="parcour.parcours_nom">
              <div class="relative">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ parcour.parcours_nom }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(prc, index) in parcour.ListParcours"
                      :value="prc.nom_parcours"
                      @click="setIdParcours(prc.id, prc.abr_parcours)"
                    >
                      <li
                        :class="[
                          parcour.parcours_nom === prc.nom_parcours
                            ? 'bg-amber-100 text-amber-900'
                            : '',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            parcour.parcours_nom === prc.nom_parcours
                              ? 'font-medium'
                              : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ prc.abr_parcours }}</span
                        >
                        <span
                          v-if="parcour.parcours_nom === prc.nom_parcours"
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

        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="semestre.semestreNom">
          <label class="block text-sm font-medium leading-6">Semestre</label>
          <div class="w-52 mt-1">
            <Listbox v-model="semestre.semestreNom">
              <div class="relative">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ semestre.semestreNom }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(sm, index) in semestre.ListeSemestre"
                      :value="sm.nom_semestre"
                      @click="setSemestreId(sm.id, sm.nom_semestre)"
                    >
                      <li
                        :class="[
                          semestre.semestreNom === sm.nom_semestre
                            ? 'bg-amber-100 text-amber-900'
                            : '',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            semestre.semestreNom === sm.nom_semestre
                              ? 'font-medium'
                              : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ sm.nom_semestre }}</span
                        >
                        <span
                          v-if="semestre.semestreNom === sm.nom_semestre"
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

        <div v-if="semestre.semestreNom" class="divbtn text-black sm:col-span-3">
          <Button @click="etudiant.createEtudiant()" class="btn font-bold"> Valider</Button>
        </div>
      </div>
    </div>
    <div
      :class="theme.theme === 'light' ? 'listEtud' : 'listEtud !bg-gray-600 !text-white'"
      v-if="niveau.ListNiveau.length !== 0"
    >
      <div class="header">
        <input
          placeholder="🔎 Recherche par nom"
          @input="etudiant.search(etudiant.searchalue)"
          v-model="etudiant.searchalue"
          type="search"
          :class="theme.theme === 'light' ? '' : 'bg-gray-300'"
          class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
        />
        <div class="ml-4 excel" v-if="semestre.semestreNom">
          <h1 class="creates">Vous pouvez importer une liste depuis Excel ici :</h1>
          <div class="sm:col-span-3 mt-2 ml-4">
            <div class="relative flex items-center">
              <div
                :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                class="file-label bg-green-100 text-green-800 py-1 px-2 rounded-md border border-green-300"
                @click="showImportExcel()"
              >
                <font-awesome-icon class="h-4 w-4 mr-1 mt-1" :icon="['fas', 'file-excel']" />
                Importer
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="listEtudValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Adresse email</li>
          <li class="widthemails">Mot de passe</li>
          <li class="width">Informations</li>
          <li class="width">Valider</li>
          <li class="h-5 w-5"></li>
        </div>
        <div
          :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'"
          class="body"
          :key="index"
          v-for="(etd, index) in etudiant.ListeEtudiant"
        >
          <li class="widthvaluenom truncate">{{ etd.nomComplet_etud }}</li>
          <li class="widthvalueemail truncate">{{ etd.user.email }}</li>
          <li class="widthvalueemails">
            <Tooltip content="Générer un mot de passe">
              <SparklesIcon
                v-if="etd.user.validiter_compte === 'false'"
                @click="showMdp(etd.user_id)"
                class="generate h-6 w-6"
            /></Tooltip>
            <p class="already ml-3" v-if="etd.user.validiter_compte === 'true'">Déjà créé</p>
          </li>
          <li class="widthvalue">
            <InformationCircleIcon @click="showInfosEtudiant(etd.id)" class="info h-6 w-6" />
          </li>
          <li class="widthvalue">
            <Tooltip content="Envoyer à la liste définitive"
              ><CheckBadgeIcon
                @click="
                  () => {
                    showValiderInscription(etd.id, etd.nomComplet_etud)
                  }
                "
                v-if="etd.validiter_inscri === 'false'"
                class="valider h-6 w-6"
            /></Tooltip>
            <p class="already" v-if="etd.validiter_inscri === 'true'">Déjà validé</p>
          </li>
          <TrashIcon class="delete h-5 w-5" @click="showDelete(etd.user_id)" />
        </div>
        <div class="Empty" v-if="etudiant.ListeEtudiant.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  TrashIcon,
  SparklesIcon,
  InformationCircleIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/outline'
import { useUser } from '@/stores/User'
import { useRegex } from '@/stores/Regex'
import { useShow } from '@/stores/Show'
import { useParcour } from '@/stores/Parcour'
import { usePassword } from '@/stores/Password'
import { useSemestre } from '@/stores/Semestre'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useNiveau } from '@/stores/Niveau'
import { useEtudiant } from '@/stores/Etudiant'
import Tooltip from '../../components/Tooltip.vue'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'

import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { onBeforeMount } from 'vue'

const niveau = useNiveau()
const au = useAu()
const semestre = useSemestre()
const user = useUser()
const regex = useRegex()
const show = useShow()
const parcour = useParcour()
const etudiant = useEtudiant()
const theme = useTheme()
const password = usePassword()

function setIdParcours(id, prc) {
  parcour.parcours_id = id
  parcour.parcours_abr = prc
}

onBeforeMount(() => {
  user.email = ''
})

function showDelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'Etudiant'
}

function showInfosEtudiant(id) {
  etudiant.id_etud = id
  etudiant.getEtudiantById()
  show.showEtudiantInfos = true
}

function showImportExcel() {
  show.showFormatExcel = true
}

function showMdp(id) {
  password.generatePassword()
  user.user_id = id
  show.showMdpEtudiant = true
}

function showValiderInscription(id, nom) {
  etudiant.etudnomComplet = nom
  etudiant.etudID = id
  show.showValiderInscription = true
}

function setSemestreId(id, name) {
  semestre.semestreId = id
  semestre.semestreNom = name
}
</script>

<style scoped src="../../styles/GestionInscription.css"></style>
