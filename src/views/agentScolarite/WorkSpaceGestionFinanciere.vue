<template>
  <div class="border bg-white flex h-[85vh]">
    <div class="w-[65%] p-4 text-xl">
      <div class="max-h-[99%] overflow-y-auto">
        <div class="flex items-center font-bold">
          <PresentationChartLineIcon class="h-5 w-5 mr-2" />Gestion financière
        </div>
        <div class="mt-4 flex gap-2 justify-center flex-wrap">
          <div
            class="h-[150px] w-[150px] border rounded-xl bg-gray-200 flex flex-col justify-center items-center"
          >
            <p class="text-xs font-bold">Ar 200 000</p>
            <p class="text-3xl mt-2">X</p>
            <p class="text-yellow-500 text-sm mt-2">Categorie 1</p>
          </div>
          <div
            class="h-[150px] w-[150px] border rounded-xl bg-gray-200 flex flex-col justify-center items-center"
          >
            <p class="text-xs font-bold">Ar 200 000</p>
            <p class="text-3xl mt-2">X</p>
            <p class="text-yellow-500 text-sm mt-2">Categorie 1</p>
          </div>
        </div>
        <div class="mt-4 text-sm font-bold">Historique des transitions :</div>
        <p class="text-gray-400 text-xs">X ce mois</p>
        <div class="mt-5 max-h-[300px] overflow-y-auto">
          <div class="mt-2 text-sm flex items-center text-center">
            <div class="w-7 h-7 border rounded-3xl"></div>
            <div class="font-bold text-gray-500 w-[20%]">Steeve Vevin</div>
            <div class="font-bold text-gray-500 w-[20%]">Graphic Design</div>
            <div class="font-bold text-gray-500 w-[20%]">22/02/2022</div>
            <div class="font-bold text-gray-500 w-[20%]">Ar 5 000</div>
            <div class="font-bold text-gray-500 w-[15%]">Completed</div>
          </div>
          <div class="mt-2 text-sm flex items-center text-center">
            <div class="w-7 h-7 border rounded-3xl"></div>
            <div class="font-bold text-gray-500 w-[20%]">Steeve Vevin</div>
            <div class="font-bold text-gray-500 w-[20%]">Graphic Design</div>
            <div class="font-bold text-gray-500 w-[20%]">22/02/2022</div>
            <div class="font-bold text-gray-500 w-[20%]">Ar 5 000</div>
            <div class="font-bold text-gray-500 w-[15%]">Completed</div>
          </div>
        </div>
        <div class="mt-5 text-sm font-bold">Diagramme :</div>
        <div class="mt-2 border bg-gray-200 h-[200px]"></div>
      </div>
    </div>
    <div class="w-[35%] bg-gray-200 p-4">
      <div class="h-[75%] font-bold">
        <h1 class="text-md mx-4">Ajouter une recette ou une dépense !</h1>
        <div class="max-h-[70%] overflow-y-auto">
          <div class="sm:col-span-3 mt-5 mx-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Montant (<b>Ariary</b>) :</label
            >
            <div class="mt-2">
              <input
                type="number"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mx-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Motif :</label>
            <div class="mt-2">
              <textarea
                class="pl-3 pr-3 min-h-[60px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mx-4 ctgr">
            <label class="block text-sm font-medium leading-6 text-gray-900">Type :</label>
            <Listbox v-model="categorieValue">
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ categorieValue }}</span>
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
          <div class="sm:col-span-3 mt-2 mx-4 ctgr">
            <label class="block text-sm font-medium leading-6 text-gray-900">Catégorie :</label>
            <Listbox v-model="categorieValue">
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ categorieValue }}</span>
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
        <div class="sm:col-span-3 mt-5 mx-4">
          <Button class="btn bg-green-500 w-full font-bold py-2 rounded"> Valider</Button>
        </div>
      </div>
      <div>
        <p>Montant actuel des frais de scolarité : <b>Ar 1 000 000</b></p>
        <p>Prévision pour <b>2025</b> avec <b>+10 %</b> : <b>Ar 1 000 000</b></p>
        <p>Montant actuel pour entretien : <b>Ar 1 000 000</b></p>
        <p>Prévision avec <b>+10 %</b> : <b>Ar 1 000 000</b></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PresentationChartLineIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ref, onBeforeMount } from 'vue'

let categorieValue = ref('')
const categories = ['Permanent', 'Vacataire']

onBeforeMount(() => {
  categorieValue.value = categories[0]
})
</script>

<style scoped></style>
