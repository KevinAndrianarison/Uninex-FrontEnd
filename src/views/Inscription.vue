<template>
  <div class="flex px-5">
    <h1 class="titreS flex flex-col items-center w-full justify-center">
      <b>Inscription</b> ou <b>Réinscription</b>
    </h1>
    <div>
      <div class="flex flex-col border w-[90%] bg-white rounded-lg items-center pt-10 pb-8 ">
        <div class="formInput gap-4 flex justify-center items-center">
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom complet</label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 bg-gray-300 shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Date de naissance</label>
            <div>
              <input
                type="date"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Lieu de naissance </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nationalité </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Sexe</label>
            <div>
              <Listbox>
                <div class="relative">
                  <ListboxButton
                    class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none text-left"
                  >
                    <span class="block truncate">Masculin</span>
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
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Téléphone </label>
            <div>
              <input
                type="number"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom du père </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Nom du mère </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Tuteur/Tutrice </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Adresse </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Série BAC </label>
            <div>
              <input
                type="text"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Année d'obtention du BAC </label>
            <div>
              <input
                type="number"
                class="pl-3 pr-3 block w-full rounded-md py-1.5 shadow-sm bg-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Etablissement d'origine </label>
            <div>
              <input
                type="text"
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
            </div>
          </div>
        </div>
        <div class="mt-10 border-b-4 border-white pb-2 sm:col-span-3 relative group">
          <Button
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

const sexes = ['Homme', 'Femme']
</script>

<style scoped src="../styles/Inscription.css"></style>
