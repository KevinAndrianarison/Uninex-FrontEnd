<template>
  <div :class="theme.theme === 'light' ? 'list' : 'list !bg-gray-600 !text-white'">
    <div class="flex items-center mb-2 justify-between">
      <h1 class="titre font-bold">
        <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'list-ul']" /> Listes
        <h1 v-if="show.showNavBarAS">&nbsp;et cartes&nbsp;</h1>
        des étudiants
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

    <div :class="theme.theme === 'light' ? 'chooseSemestre' : '!bg-gray-600 !text-gray-200'">
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
      <h1 class="create pl-5 mt-2" v-if="parcour.parcours_nom">Sélectionnez un semestre :</h1>
      <div v-if="parcour.parcours_nom" class="class formInput border-gray-900/10 pb-5 pl-5">
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
                      @click="setSemestreId(sm.id)"
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
      </div>
    </div>
    <div
      :class="theme.theme === 'light' ? 'listEtud' : 'listEtud !bg-gray-600 !text-white'"
      v-if="niveau.ListNiveau.length !== 0"
    >
      <div class="header">
        <input
          placeholder="🔎 Recherche par nom"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          @input="etudiant.searchDefinitive(etudiant.searchalueDef)"
          v-model="etudiant.searchalueDef"
          type="search"
          class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
        />
        <div
          class="sm:col-span-3 mt-2 ml-4"
          v-if="etudiant.ListeEtudiant.length !== 0"
          @click="exportPdfListeEtud()"
        >
          <div
            :class="theme.theme === 'light' ? '' : 'bg-blue-500'"
            class="file-label text-black bg-blue-300 py-1 px-2 rounded-md border border-blue-300"
          >
            Exporter en PDF
            <font-awesome-icon class="h-4 w-4 ml-1 mt-1" :icon="['fas', 'print']" />
          </div>
        </div>
      </div>
      <div class="listEtudValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Adresse email</li>
          <li class="widthemails">Téléphone</li>
          <li v-if="show.showNavBarAS" class="width">Carte d'étudiant</li>
        </div>
        <div :key="index" v-for="(etd, index) in etudiant.listdefinitive">
          <div :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'">
            <div class="widthvaluenom">
              <p v-if="etd.status_etud === 1" class="text-xs text-green-500 font-bold">Passant</p>
              <p v-if="etd.status_etud === 0" class="text-xs text-red-500 font-bold">Redoublant</p>
              <p>{{ etd.nomComplet_etud }}</p>
            </div>
            <li class="widthvalueemail">{{ etd.user.email }}</li>
            <li class="widthvalueemails">
              <p>{{ etd.telephone_etud }}</p>
            </li>
            <li v-if="show.showNavBarAS" class="widthvalue">
              <Tooltip content="Générer une carte d'étudiant"
                ><SparklesIcon @click="getOneEtudiant(etd.id)" class="generates h-6 w-6"
              /></Tooltip>
            </li>
          </div>
        </div>
        <div class="Empty" v-if="etudiant.listdefinitive.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useNiveau } from '@/stores/Niveau'
import { useEtudiant } from '@/stores/Etudiant'
import { useDirecteur } from '@/stores/Directeur'
import { useShow } from '@/stores/Show'
import Tooltip from '../../components/Tooltip.vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'

const niveau = useNiveau()
const semestre = useSemestre()
const show = useShow()
const parcour = useParcour()
const etudiant = useEtudiant()
const directeur = useDirecteur()
const theme = useTheme()
const au = useAu()

function setIdParcours(id, abr) {
  parcour.parcours_id = id
  parcour.parcours_abr = abr
}

function getOneEtudiant(id) {
  etudiant.isCarte = true
  etudiant.id_etud = id
  etudiant.getEtudiantById()
}

function exportPdfListeEtud() {
  directeur.isListeEtud = true
  directeur.getFirst()
}

function setSemestreId(id) {
  semestre.semestreId = id
}
</script>

<style scoped src="../../styles/ListeEtudiant.css"></style>
