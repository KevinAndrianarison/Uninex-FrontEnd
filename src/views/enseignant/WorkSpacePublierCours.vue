<template>
  <div :class="theme.theme === 'light' ? 'cours' : 'cours !bg-gray-600 !text-white'">
    <div class="flex items-center justify-between !mb-2">
      <h1 class="titre font-bold"><ArrowDownOnSquareStackIcon class="h-7 w-7 mr-5" /> Publier des cours</h1>
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

    <div :class="theme.theme === 'light' ? 'createcours' : '!bg-gray-600 !text-gray-200'">
      <h1 class="create pl-5 mt-2 mb-2">Ajouter un nouveau cours :</h1>
      <div v-if="ec.ecNomByEns" class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Sélectionnez un EC</label>
          <div class="w-60">
            <Listbox v-model="ec.ecNomByEns">
              <div class="relative mt-2">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ ec.ecNomByEns }}</span>
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
                      v-for="(EC, index) in ec.ListeECByEns"
                      :key="index"
                      :value="EC.nom_ec"
                      @click="setECid(EC.id)"
                    >
                      <li
                        :class="[
                          ec.ecNomByEns === EC.nom_ec ? 'bg-amber-100 text-amber-900' : '',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            ec.ecNomByEns === EC.nom_ec ? 'font-medium' : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ EC.nom_ec }}</span
                        >
                        <span
                          v-if="ec.ecNomByEns === EC.nom_ec"
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
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Nom du cours</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="cours.nom_cours"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Description du cours</label>
          <div class="mt-2">
            <textarea
              type="text"
              v-model="cours.description_cours"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 h-8 min-h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 mr-4 ctgr">
          <label class="block text-sm font-medium leading-6">Catégorie</label>
          <div class="w-60">
            <Listbox v-model="cours.categorie_cours">
              <div class="relative mt-2">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ cours.categorie_cours }}</span>
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
                          active ? 'bg-amber-100 text-amber-900' : '',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                          >{{ categorie }}</span
                        >
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
        </div>

        <div class="sm:col-span-3 mt-2 mr-4 file">
          <label class="block text-sm font-medium leading-6">Fichier</label>
          <div class="mt-1">
            <div class="relative flex items-center">
              <input
                @change="onPhotoFileChange"
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                accept=".pdf,.docx,.xlsx,image/jpeg,image/png"
              />
              <div
                :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
              >
                📂 Importer un fichier
              </div>
            </div>
            <div v-if="cours.fileName" class="flex text-xs absolute">
              <p class="text-blue-500 mr-2">{{ cours.fileName }}</p>
              <font-awesome-icon
                @click="removeFile"
                class="text-red-500 cursor-pointer w-5 h-4"
                :icon="['fas', 'xmark']"
              />
            </div>
          </div>
        </div>

        <div class="divbtns text-black sm:col-span-3 font-bold mt-1">
          <Button class="btn mb-1" @click="cours.publierCours()"> Enregistrer</Button>
        </div>
      </div>
    </div>
    <div :class="theme.theme === 'light' ? 'listcours' : 'listcours !bg-gray-600 !text-white'">
      <div class="header">
        <h1 class="create pl-5 mt-4">Liste des cours de ce EC :</h1>
      </div>
      <div class="listecoursValue">
        <div class="head">
          <li class="widthnom">Nom du cours</li>
          <li class="widthemail">Description du cours</li>
          <li class="width">Catégorie</li>
          <li class="h-5 font-bold w-5"></li>
          <li class="h-5 w-5"></li>
        </div>
        <div
          :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'"
          class="body"
          :key="index"
          v-for="(crs, index) in cours.ListeCours"
        >
          <li class="widthvaluenom overflow-hidden text-ellipsis whitespace-nowrap">
            {{ crs.nom_cours }}
          </li>
          <li class="widthvalueemail overflow-hidden text-ellipsis whitespace-nowrap">
            {{ crs.description_cours }}
          </li>
          <li class="widthvalue">
            {{ crs.categorie_cours === 'Enseignement Théorique' ? 'ET' : 'ED' }}
          </li>
          <Tooltip content="Télécharger ">
            <ArrowDownTrayIcon
              @click="telechargerCours(crs.cours_name)"
              :class="theme.theme === 'light' ? '' : '!text-yellow-500'"
              class="cursor-pointer h-5 w-5"
            />
          </Tooltip>
          <TrashIcon @click="cours.deleteCours(crs.id)" class="delete h-5 w-5" />
        </div>
        <div class="Empty" v-if="cours.ListeCours.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, ArrowDownOnSquareStackIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useCours } from '@/stores/Cours'
import { useEc } from '@/stores/Ec'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useUrl } from '@/stores/url'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'

const ec = useEc()
const cours = useCours()
const URL = useUrl().url
const theme = useTheme()
const au = useAu()

const categories = ['Enseignement Théorique', 'Enseignement Dirigé', 'Travaux Pratiques']

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

function setECid(id) {
  ec.idEC = id
}

onBeforeMount(() => {
  cours.categorie_cours = categories[0]
  ec.getAllECByEns()
})

function onPhotoFileChange(event) {
  cours.cours = event.target.files[0]
  cours.fileName = event.target.files[0].name
}

function removeFile() {
  cours.cours = null
  cours.fileName = ''
}
</script>

<style scoped src="../../styles/PublierCours.css"></style>
