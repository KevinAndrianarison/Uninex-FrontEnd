<template>
  <div class="flex px-5">
    <h1 class="titreS flex titreHidden flex-col items-center w-full justify-center">
      <b>Inscription</b> ou <b>Réinscription</b>
    </h1>
    <div class="flex items-center justify-center">
      <div class="flex flex-col border w-[90%] bg-white px-2 rounded-lg items-center pt-10 pb-5">
        <div class="formInput gap-4 flex justify-center items-center">
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom complet</label>
            <div>
              <input
                type="text"
                v-model="etudiant.nomComplet_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 bg-gray-300 shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Adresse email</label>
            <div>
              <input
                type="text"
                v-model="etudiant.email"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 bg-gray-300 shadow-sm focus:outline-none"
              />
            </div>
          </div>
          <Tooltip content="Un code qui vous a été envoyé par mail 📧">
            <div class="w-52 sm:col-span-3">
              <label class="block text-sm font-medium leading-6">Code</label>
              <div>
                <input
                  type="text"
                  v-model="etudiant.code"
                  class="pl-3 pr-3 block w-full rounded-md py-1.5 bg-gray-300 shadow-sm focus:outline-none"
                />
              </div>
            </div>
          </Tooltip>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Date de naissance</label>
            <div>
              <input
                type="date"
                v-model="etudiant.date_naissance_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Lieu de naissance </label>
            <div>
              <input
                type="text"
                v-model="etudiant.lieux_naissance_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nationalité </label>
            <div>
              <input
                type="text"
                v-model="etudiant.nationalite_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Sexe</label>
            <div>
              <Listbox v-model="etudiant.sexe_etud">
                <div class="relative">
                  <ListboxButton
                    class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none text-left"
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

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Numéro CIN </label>
            <div>
              <input
                type="number"
                v-model="etudiant.CIN_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Téléphone </label>
            <div>
              <input
                type="number"
                v-model="etudiant.telephone_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom du père </label>
            <div>
              <input
                type="text"
                v-model="etudiant.nom_pere_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom du mère </label>
            <div>
              <input
                type="text"
                v-model="etudiant.nom_mere_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Tuteur/Tutrice </label>
            <div>
              <input
                type="text"
                v-model="etudiant.nom_tuteur"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Adresse </label>
            <div>
              <input
                type="text"
                v-model="etudiant.adresse_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Série BAC </label>
            <div>
              <input
                type="text"
                v-model="etudiant.serieBAC_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Année d'obtention du BAC </label>
            <div>
              <input
                type="number"
                v-model="etudiant.anneeBAC_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Etablissement d'origine </label>
            <div>
              <input
                type="text"
                v-model="etudiant.etabOrigin_etud"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="sm:col-span-3 file">
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
                  class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
                >
                  📂 Importer (Photo ou Pdf)
                </div>
              </div>
              <div v-if="etudiant.fileName" class="flex text-xs absolute">
                <p class="text-blue-500 mr-2 truncate w-48">{{ etudiant.fileName }}</p>
                <font-awesome-icon
                  @click="removeFile"
                  class="text-red-500 cursor-pointer w-5 h-4"
                  :icon="['fas', 'xmark']"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 border-b-4 border-white pb-2 sm:col-span-3 relative group">
          <Button
            @click="etudiant.inscription()"
            class="text-yellow-500 flex items-center gap-4 mb-1 font-bold transition-colors duration-500 ease-in-out"
          >
            S'inscrire
            <font-awesome-icon
              class="cursor-pointer transition-colors duration-500 ease-in-out"
              :icon="['fas', 'arrow-right']"
            />
          </Button>
          <span
            class="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 transform scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useEtudiant } from '@/stores/Etudiant'
import { onBeforeMount } from 'vue'
import Tooltip from '../components/Tooltip.vue'

const etudiant = useEtudiant()
const sexes = ['Homme', 'Femme']

onBeforeMount(() => {
  etudiant.sexe_etud = sexes[0]
})

function removeFile() {
  etudiant.photoBordereaux = null
  etudiant.fileName = ''
}

function onPhotoFileChange(event) {
  etudiant.photoBordereaux = event.target.files[0]
  etudiant.fileName = event.target.files[0].name
}
</script>

<style scoped src="../styles/Inscription.css"></style>
