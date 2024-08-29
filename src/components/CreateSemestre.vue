<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useNiveau } from '@/stores/Niveau'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'



import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

function setIdParcours(id) {
  parcour.parcours_id = id
}

const show = useShow()
const niveau = useNiveau()
const parcour = useParcour()
const semestre = useSemestre()

function delSemestre(nom, id){
  semestre.semestre.nom = nom
  semestre.semestre.id = id
  show.showDeleteSemestre = true
}

function closeCreateSemestre() {
  show.showCreateSemestre = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreateSemestre">
      <div class="formModales">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateSemestre()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Nouvelle semestre :</p>

        <div class="radio mt-2">
          <label class="text-sm font-medium leading-6 text-gray-900">Choisissez un niveau : </label>
          <div>
            <RadioGroup v-model="niveau.NiveauCheck">
              <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
              <div class="flex flex-wrap justify-center space-x-2">
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
                    class="relative radiolist flex cursor-pointer mt-2 rounded-sm py-1"
                  >
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-sm">
                          <RadioGroupLabel
                            as="p"
                            :class="
                              niveau.NiveauCheck.id === niv.id ? 'text-white' : 'text-gray-900'
                            "
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

        <div class="class formInput mt-4" v-if="parcour.parcours_nom">
          <div class="gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Choisissez un parcours :</label
              >
              <div class="mt-1">
                <Listbox v-model="parcour.parcours_nom">
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ parcour.parcours_nom }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center xpr-2"
                      >
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
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
                          :key="index"
                          v-for="(prc, index) in parcour.ListParcours"
                          :value="prc.nom_parcours"
                          as="template"
                          @click="setIdParcours(prc.id)"
                        >
                          <li
                            :class="[
                              parcour.parcours_nom === prc.nom_parcours
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900',
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

            <div class="sm:col-span-3 mt-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Semestre :</label>
              <div class="mt-1">
                <input
                  type="text"
                  v-model="semestre.nom_semestre"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="valide" v-if="parcour.parcours_nom">
          <button type="submit" @click="semestre.postSemestre()" class="Modifie btn btn-primary mt-4">Valider</button>
        </div>
        <div class="w-full mt-3" v-if="semestre.ListeSemestre.length !== 0">
          <Disclosure v-slot="{ open  }">
            <DisclosureButton
              class="flex w-full justify-between rounded-lg bg-yellow-100 px-4 py-2 text-left text-lm font-black text-black hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500/75"
            >
              <span>Voir la liste des semestres ?</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-yellow-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="DisclosurePanels mt-2 text-sm text-gray-500">
              <div class="listNiv" :key="index" v-for="(sm, index) in semestre.ListeSemestre">
                {{ sm.nom_semestre }}
                <TrashIcon
                  class="deletes h-6 w-5 ml-3 pb-1" @click="delSemestre(sm.nom_semestre, sm.id)"
                />
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>


    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
