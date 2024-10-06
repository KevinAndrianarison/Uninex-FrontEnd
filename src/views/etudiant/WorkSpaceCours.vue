<template>
  <div class="cours">
    <h1 class="titre"><DocumentDuplicateIcon class="h-7 w-7 mr-5" /> Mes cours</h1>
    <div class="createcours">
      <h1 class="create pl-5 mt-2 mb-2">Choisissez l'EC :</h1>
      <div v-if="ec.ecNom" class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="semestre.semestreNom">
          <label class="block text-sm font-medium leading-6 text-gray-900">Semestre</label>
          <div class="w-52 mt-1">
            <Listbox v-model="semestre.semestreNom">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
                            : 'text-gray-900',
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

        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="ue.nomUE">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Unités d'enseignement</label
          >
          <div class="w-52 mt-1">
            <Listbox v-model="ue.nomUE">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ ue.nomUE }}</span>
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(UE, index) in ue.ListeueBysemestre"
                      :value="UE.nom_ue"
                      @click="setUEId(UE.id)"
                    >
                      <li
                        :class="[
                          ue.nomUE === UE.nom_ue ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            ue.nomUE === UE.nom_ue ? 'font-medium' : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ UE.nom_ue }}</span
                        >
                        <span
                          v-if="ue.nomUE === UE.nom_ue"
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
        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="ec.ecNom">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Eléments constitutifs</label
          >
          <div class="w-52 mt-1">
            <Listbox v-model="ec.ecNom">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ ec.ecNom }}</span>
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(EC, index) in ec.ListeEC"
                      :value="EC.nom_ec"
                      @click="setECID(EC.id)"
                    >
                      <li
                        :class="[
                          ec.ecNom === EC.nom_ec ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            ec.ecNom === EC.nom_ec ? 'font-medium' : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ EC.nom_ec }}</span
                        >
                        <span
                          v-if="ec.ecNom === EC.nom_ec"
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
    <div class="listcours">
      <div class="header">
        <h1 class="create pl-5 mt-4">Liste des cours de ce EC :</h1>
      </div>
      <div class="listecoursValue">
        <div class="head">
          <li class="widthnom">Nom du cours</li>
          <li class="widthemail">Description du cours</li>
          <li class="width">Catégorie</li>
          <li class="h-5 font-bold w-5" ></li>
          <li class="h-5 w-5" v-if="!show.showNavBarEtud"></li>
        </div>
        <div class="body" :key="index" v-for="(crs, index) in cours.ListeCours">
          <li class="widthvaluenom">{{ crs.nom_cours }}</li>
          <li class="widthvalueemail">{{ crs.description_cours }}</li>
          <li class="widthvalue">{{ crs.categorie_cours }}</li>
          <Tooltip content="Télécharger ">
            <ArrowDownTrayIcon
              @click="telechargerCours(crs.cours_name)"
              class="cursor-pointer h-5 w-5"
            />
          </Tooltip>
          <TrashIcon v-if="!show.showNavBarEtud" @click="cours.deleteCours(crs.id)" class="delete h-5 w-5" />
        </div>
        <div class="Empty" v-if="cours.ListeCours.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, DocumentDuplicateIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useCours } from '@/stores/Cours'
import { useEc } from '@/stores/Ec'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useUrl } from '@/stores/url'
import { useSemestre } from '@/stores/Semestre'
import { useUe } from '@/stores/Ue'
import { useShow } from '@/stores/Show'


const show = useShow()
const ec = useEc()
const ue = useUe()
const semestre = useSemestre()
const cours = useCours()
const URL = useUrl().url

function telechargerCours(nom) {
  const url = `${URL}/api/cours/file/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function setECID(id) {
  ec.id = id
}

onBeforeMount(() => {
  semestre.getSemestreByEtudiantId()
})
</script>

<style scoped src="../../styles/PublierCours.css"></style>
