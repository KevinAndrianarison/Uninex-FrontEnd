<template>
  <div class="ens">
    <h1 class="titre"><ArrowDownOnSquareStackIcon class="h-7 w-7 mr-5" /> Publier des cours</h1>
    <div class="createens">
      <h1 class="create pl-5 mt-2">Ajouter un nouveau cours :</h1>
      <div class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Sélectionnez un EC</label
          >
          <div class="w-60">
            <Listbox v-model="enseignant.grade_ens">
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ enseignant.grade_ens }}</span>
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
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="grade in grades"
                      :key="grade"
                      :value="grade"
                      as="template"
                    >
                      <li
                        :class="[
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                          >{{ grade }}</span
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
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nom du cours</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="enseignant.nomComplet_ens"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Description du cours</label
          >
          <div class="mt-2">
            <textarea
              type="text"
              class="pl-3 pr-3 h-8 min-h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 mr-4 ctgr">
          <label class="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
          <div class="w-60">
            <Listbox v-model="enseignant.categorie_ens">
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ enseignant.categorie_ens }}</span>
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
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
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
          <label class="block text-sm font-medium leading-6 text-gray-900">Fichier</label>
          <div class="mt-1">
            <div class="relative flex items-center">
              <input
                @change="onPhotoFileChange"
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                accept=".pdf,.docx,.xlsx,image/jpeg,image/png"
              />
              <div
                class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
              >
                📂 Importer un fichier
              </div>
            </div>
          </div>
        </div>

        <div class="divbtn sm:col-span-3 font-bold mt-3">
          <Button class="btn mb-2"> Enregistrer</Button>
        </div>
      </div>
    </div>
    <div class="listens">
      <div class="header">
        <h1 class="create pl-5 mt-4">Liste des cours de ce EC :</h1>
      </div>
      <div class="listensValue">
        <div class="head">
          <li class="widthnom">Nom du cours</li>
          <li class="widthemail">Description du cours</li>
          <li class="width">Catégorie</li>
          <li class="h-5 font-bold w-5"></li>
          <li class="h-5 w-5"></li>
        </div>
        <div class="body" :key="index" v-for="(ens, index) in enseignant.ListeENS">
          <li class="widthvaluenom">{{ ens.nomComplet_ens }}</li>
          <li class="widthvalueemail">{{ ens.user.email }}</li>
          <li class="widthvalue">{{ ens.telephone_ens }}</li>
          <Tooltip content="Télécharger ">
            <ArrowDownTrayIcon class="h-5 w-5" />
          </Tooltip>

          <TrashIcon @click="showdelete(ens.user_id)" class="delete h-5 w-5" />
        </div>
        <div class="Empty" v-if="enseignant.ListeENS.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, ArrowDownOnSquareStackIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useEnseignant } from '@/stores/Enseignant'
import { useUser } from '@/stores/User'
import { useShow } from '@/stores/Show'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const user = useUser()
const show = useShow()
const enseignant = useEnseignant()

const grades = ['Ingénieur', 'Docteur', 'Professeur']

const categories = ['Enseignement Théorique', 'Enseignement Dirigé', 'Travaux Pratiques']

function showdelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'ENS'
}

onBeforeMount(() => {
  user.email = ''
  enseignant.grade_ens = grades[0]
  enseignant.categorie_ens = categories[0]
  enseignant.getAllENS()
})

function onPhotoFileChange(event) {
  user.photo = event.target.files[0]
}
</script>

<style scoped src="../../styles/GestionEnseignant.css"></style>
