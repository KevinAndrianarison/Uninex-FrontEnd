<template>
    <div :class="theme.theme === 'light' ? 'inscr' : 'inscr !bg-gray-600 !text-white'">
    <h1 class="titre"><PencilSquareIcon class="h-7 w-7 mr-5" /> Inscription ou Réinscription</h1>
      <div :class="theme.theme === 'light' ? 'InscrContent' : '!bg-gray-600 !text-gray-200'">
      <div class="CONTENT">
        <h1 class="create pl-5 mt-2">Remplissez tous les champs :</h1>
        <div class="class formInput border-gray-900/10 pb-5 pl-5">
          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Nom complet</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.nomComplet_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6"
              >Date de naissance</label
            >
            <div class="mt-2">
              <input
                type="date"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                v-model="etudiant.date_naissance_etud"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6"
              >Lieu de naissance
            </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.lieux_naissance_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Nationalité </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.nationalite_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Sexe</label>
            <div>
              <Listbox v-model="etudiant.sexe_etud">
                <div class="relative mt-2">
                  <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                    class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{ etudiant.sexe_etud }}</span>
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
                      class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="sexe in sexes"
                        :key="sexe"
                        :value="sexe"
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
                            >{{ sexe }}</span
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

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 ">Numéro CIN </label>
            <div class="mt-2">
              <input
                type="number"
                v-model="etudiant.CIN_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Téléphone </label>
            <div class="mt-2">
              <input
                type="number"
                v-model="etudiant.telephone_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Nom du père </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.nom_pere_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 ">Nom du mère </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.nom_mere_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Tuteur/Tutrice </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.nom_tuteur"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 ">Adresse </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.adresse_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Série BAC </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.serieBAC_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6"
              >Année d'obtention du BAC
            </label>
            <div class="mt-2">
              <input
                type="number"
                v-model="etudiant.anneeBAC_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6"
              >Etablissement d'origine
            </label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etudiant.etabOrigin_etud"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="sm:col-span-3 mt-2 mr-4 file">
            <label class="block text-sm font-medium leading-6">Bordereaux</label>
            <div class="mt-1">
              <div class="relative flex items-center">
                <input
                  @change="onPhotoFileChange"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/jpeg, image/png, .pdf"
                />
                <div
                :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                  class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
                >
                  📂 Importer (Photo ou Pdf)
                </div>
              </div>
              <div v-if="etudiant.fileName" class="flex text-xs absolute">
                <p class="text-blue-500 mr-2">{{ etudiant.fileName }}</p>
                <font-awesome-icon
                  @click="removeFile"
                  class="text-red-500 cursor-pointer w-5 h-4"
                  :icon="['fas', 'xmark']"
                />
              </div>
            </div>
          </div>

          <div class="divbtn text-black sm:col-span-3 mt-2">
            <Button
              class="Btns mb-1 font-bold"
              :disabled="!etudiant.photoBordereaux"
              @click="etudiant.inscription()"
            >
              S'inscrire</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useEtudiant } from '@/stores/Etudiant'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTheme } from '@/stores/Theme'

const etudiant = useEtudiant()
const theme = useTheme()

const sexes = ['Homme', 'Femme']

onBeforeMount(() => {
  etudiant.sexe_etud = sexes[0]
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  if (users.user.status_user === 'Etudiant') {
    etudiant.id_etud = users.id
    etudiant.getEtudiantById()
  }
})

function onPhotoFileChange(event) {
  etudiant.photoBordereaux = event.target.files[0]  
  etudiant.fileName = event.target.files[0].name
}

function removeFile() {
  etudiant.photoBordereaux = null
  etudiant.fileName = ''
}
</script>

<style scoped src="../../styles/Inscription.css"></style>
