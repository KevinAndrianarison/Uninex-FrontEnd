<template>
  <div :class="theme.theme === 'light' ? 'ens' : 'ens !bg-gray-600 !text-white'">
    <h1 class="titre">
      <font-awesome-icon :icon="['fas', 'user-tie']" class="h-7 w-7 mr-5" /> Enseignants
    </h1>
    <div :class="theme.theme === 'light' ? 'createens' : '!bg-gray-600 !text-gray-200'">
      <h1 class="create pl-5 mt-2">Ajouter un nouveau Enseignant :</h1>
      <div class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Nom complet</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="enseignant.nomComplet_ens"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Adresse email</label>
          <div class="mt-2">
            <input
              type="email"
              @input="regex.RegexEmail(user.email)"
              v-model="user.email"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Numéro téléphone</label>
          <div class="mt-2">
            <input
              type="number"
              v-model="enseignant.telephone_ens"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Titre académique</label>
          <div class="w-60">
            <Listbox v-model="enseignant.grade_ens">
              <div class="relative mt-2">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
                    :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
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
                          active ? 'bg-amber-100 text-amber-900' : '',
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
        <div class="sm:col-span-3 mt-2 mr-4 file">
          <label class="block text-sm font-medium leading-6">Photo</label>
          <div class="mt-1">
            <div class="relative flex items-center">
              <input
                @change="onPhotoFileChange"
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                accept="image/jpeg, image/png"
              />
              <div
                :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
              >
                📂 Choisissez une photo
              </div>
            </div>
          </div>
          <div v-if="user.photoName" class="flex text-xs absolute">
            <p class="text-blue-500 mr-2">{{ user.photoName }}</p>
            <font-awesome-icon
              class="text-red-500 cursor-pointer w-5 h-4"
              :icon="['fas', 'xmark']"
              @click="
                () => {
                  user.photoName = ''
                  user.photo = null
                }
              "
            />
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 mr-4 ctgr">
          <label class="block text-sm font-medium leading-6">Catégorie</label>
          <div class="w-60">
            <Listbox v-model="enseignant.categorie_ens">
              <div class="relative mt-2">
                <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate text-black">{{ enseignant.categorie_ens }}</span>
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
        <div class="sm:col-span-3 mt-2 date">
          <label class="block text-sm font-medium leading-6">Date de recrutement</label>
          <div class="mt-2">
            <input
              type="date"
              v-model="enseignant.date_recrutement_ens"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>

        <div class="divbtn text-black sm:col-span-3 mt-3 ml-4">
          <Button @click="showMdp()" class="btn font-bold mb-1"> Valider</Button>
        </div>
      </div>
    </div>
    <div :class="theme.theme === 'light' ? 'listens' : 'listens !bg-gray-600 !text-white'">
      <input
        placeholder="🔎 Recherche par nom"
        @input="enseignant.search(enseignant.searchalue)"
        v-model="enseignant.searchalue"
        type="search"
        :class="theme.theme === 'light' ? '' : 'bg-gray-300'"
        class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
      />
      <div class="listensValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Adresse email</li>
          <li class="width">Numéro téléphone</li>
          <li class="width">Catégorie</li>
          <li class="h-5 w-5"></li>
        </div>
        <div
          :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'"
          class="body"
          :key="index"
          v-for="(ens, index) in enseignant.ListeENS"
        >
          <li class="widthvaluenom truncate">{{ ens.nomComplet_ens }}</li>
          <li class="widthvalueemail truncate">{{ ens.user.email }}</li>
          <li class="widthvalue">{{ ens.telephone_ens }}</li>
          <li class="widthvalue">{{ ens.categorie_ens }}</li>
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
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useEnseignant } from '@/stores/Enseignant'
import { useUser } from '@/stores/User'
import { useRegex } from '@/stores/Regex'
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTheme } from '@/stores/Theme'
import Notiflix from 'notiflix'

const user = useUser()
const regex = useRegex()
const theme = useTheme()
const show = useShow()
const enseignant = useEnseignant()
const password = usePassword()

const grades = ['Ingénieur', 'Docteur', 'Professeur']

const categories = ['Permanent', 'Vacataire']

function showMdp() {
  if (user.email && enseignant.nomComplet_ens && !show.showMessageErrorEmail) {
    password.generatePassword()
    show.showMdpENS = true
  } else {
    Notiflix.Notify.warning('"Nom complet" et "Adresse email" doivent être remplis')
  }
}

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
  user.photoName = event.target.files[0].name
}
</script>

<style scoped src="../../styles/GestionEnseignant.css"></style>
