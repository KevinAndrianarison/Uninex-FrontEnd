<template>
  <div class="body">
    <h1 class="text-2xl font-bold flex items-center">
      <RectangleGroupIcon class="h-5 w-5 mr-2" />
      Emplois du temps
    </h1>
    <div class="border-2 rounded-lg bg-white px-3 py-2 pb-4">
      <h1 class="font-bold">Créer un emploi du temps :</h1>
      <div class="flex flex-wrap items-end mt-2">
        <div class="mr-2 w-40" v-if="au.listeAU.length !== 0">
          <label>Année universitaire:</label>
          <Listbox v-model="au.oneAUSelectEDT">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ au.oneAUSelectEDT }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="(AU, index) in au.listeAU"
                    :key="AU.id"
                    :value="AU.annee_debut + '-' + AU.annee_fin"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ AU.annee_debut }} - {{ AU.annee_fin }}
                      </span>
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
        <div class="mr-2 w-40" v-if="parcour.length !== 0">
          <label>Parcours :</label>
          <Listbox v-model="parcour.nomByAll">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs"
                  >{{ parcour.nomByAll }} / {{ parcour.abreviationbyAll }}</span
                >
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="(prc, index) in parcour.ListAllParcours"
                    :key="prc.id"
                    :value="prc.nom_parcours"
                    @click="setIdParcours(prc.id, prc.abr_parcours)"
                    as="template"
                  >
                    <li
                      :class="[
                        parcour.abreviationbyAll === prc.abr_parcours
                          ? 'bg-amber-100 text-amber-900 text-xs'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span
                        :class="[
                          parcour.abreviationbyAll === prc.abr_parcours
                            ? 'font-medium'
                            : 'font-normal',
                          'block truncate'
                        ]"
                      >
                        {{ prc.nom_parcours }} / {{ prc.abr_parcours }}
                      </span>
                      <span
                        v-if="parcour.abreviationbyAll === prc.abr_parcours"
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
        <div class="mr-2 w-40" v-if="semestre.ListeSemestreEDT.length !== 0">
          <label>Semestre :</label>
          <Listbox v-model="semestre.semestreNomEDT">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ semestre.semestreNomEDT }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="(sm, index) in semestre.ListeSemestreEDT"
                    :key="sm.id"
                    :value="sm.nom_semestre"
                    as="template"
                  >
                    <li
                      :class="[
                        semestre.semestreNomEDT === sm.nom_semestre
                          ? 'bg-amber-100 text-amber-900 text-xs'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span
                        :class="[
                          semestre.semestreNomEDT === sm.nom_semestre
                            ? 'font-medium'
                            : 'font-normal',
                          'block truncate'
                        ]"
                      >
                        {{ sm.nom_semestre }}
                      </span>
                      <span
                        v-if="semestre.semestreNomEDT === sm.nom_semestre"
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
      <div class="flex flex-wrap items-end mt-2">
        <div v-if="edt.listJour.length !== 0" class="mr-2 w-60">
          <label>Jour :</label>
          <Listbox v-model="edt.jour">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ edt.jour }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="EDT in edt.listJour"
                    :key="EDT.id"
                    :value="EDT.nom"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ EDT.nom }}
                      </span>
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
        <div class="mr-2 w-40">
          <label class="flex"
            >Heures :
            <p class="ml-2">
              <Tooltip content="Créer une nouvelle horaire">
                <font-awesome-icon
                  @click="isModalOpen = true"
                  class="text-gray-500 cursor-pointer"
                  :icon="['fas', 'calendar-plus']"
              /></Tooltip></p
          ></label>
          <Listbox v-if="edt.listHeures.length !== 0" v-model="edt.heures">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ edt.heures }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="hr in edt.listHeures"
                    :key="hr.id"
                    :value="hr.valeur"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ hr.valeur }}
                      </span>
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
        <div class="mr-2 w-40" v-if="salle.listSalle.length !== 0">
          <label>Salles :</label>
          <Listbox v-model="salle.NomSalle">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ salle.NomSalle }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="sll in salle.listSalle"
                    :key="sll.id"
                    :value="sll.nom_salle"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ sll.nom_salle }}
                      </span>
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
        <div class="mr-2 w-60" v-if="enseignant.ListeENSEDT.length !== 0">
          <label>Enseignant :</label>
          <Listbox v-model="enseignant.nom_ensEDT">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ enseignant.nom_ensEDT }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="ens in enseignant.ListeENSEDT"
                    :key="ens.id"
                    :value="ens.nomComplet_ens"
                    as="div"
                    @click="ec.getAllECByEnsEDT(ens.id)"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ ens.nomComplet_ens }}
                      </span>
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
        <div v-if="ec.ListeECByEnsEDT.length !== 0" class="mr-2 w-60">
          <label>Matière :</label>
          <Listbox v-model="ec.nomECEDT">
            <div class="relative text-xs">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ ec.nomECEDT }}</span>
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
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="EC in ec.ListeECByEnsEDT"
                    :key="EC.id"
                    :value="EC.nom_ec"
                    as="div"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ EC.nom_ec }}
                      </span>
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
        <button class="px-5 py-1 mt-2 bg-yellow-500 font-bold text-xs rounded">Ajouter</button>
      </div>
      <div class="mt-2 flex flex-wrap max-h-[75px] oerflow-y-auto">
        <div
          class="mr-2 border text-xs w-60 items-center bg-gray-300 rounded-xl flex justify-between px-3 py-1"
        >
          <div>
            <p class="font-bold">Lundi</p>
            <p>Steeve</p>
            <p>Analyse</p>
          </div>
          <div class="flex">
            <p class="mr-5">7h - 8h</p>
            <font-awesome-icon
              class="text-red-500 cursor-pointer"
              :icon="['fas', 'circle-xmark']"
            />
          </div>
        </div>
      </div>
      <button class="px-5 py-1 mt-2 bg-green-500 font-bold rounded text-xs">Enregister</button>
    </div>

    <div class="flex items-end mt-2">
      <p class="mr-2 font-bold"><font-awesome-icon :icon="['fas', 'sort']" /> Trier par :</p>
      <Listbox v-model="au.oneAUSelectFind" v-if="au.listeAU.length !== 0">
        <div class="relative text-xs w-40">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
          >
            <span class="block truncate text-xs">{{ au.oneAU }}</span>
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
              class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="(AU, index) in au.listeAU"
                :key="AU.id"
                :value="AU.annee_debut + '-' + AU.annee_fin"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900 text-xs' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                  ]"
                >
                  <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                    {{ AU.annee_debut }} - {{ AU.annee_fin }}
                  </span>
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
    <div class="bg-white border mt-1 max-h-[25vh] oerflow-y-auto">
      <div class="list-none flex px-2 py-1 border">
        <li class="font-bold w-[30%]">2020 - 2021</li>
        <li class="w-[30%]">STIC-2</li>
        <li class="w-[30%]">Semestre 2</li>
        <li class="w-[5%]">
          <Tooltip content="Visualiser">
            <font-awesome-icon class="text-yellow-500 cursor-pointer" :icon="['fas', 'eye']" />
          </Tooltip>
        </li>
        <li class="w-[5%]">
          <Tooltip content="Supprimer">
            <font-awesome-icon class="text-red-500 cursor-pointer" :icon="['fas', 'trash-can']" />
          </Tooltip>
        </li>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Créer un horaire</h2>
          <button @click="isModalOpen = false">
            <font-awesome-icon :icon="['fas', 'times']" class="text-gray-500" />
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">Heure de début</label>
          <input
            type="time"
            v-model="heureDebut"
            class="w-full border border-gray-300 rounded p-2 text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">Heure de fin</label>
          <input
            type="time"
            v-model="heureFin"
            class="w-full border border-gray-300 rounded p-2 text-sm"
            required
          />
        </div>
        <button @click="createHoraire" class="w-full bg-green-500 text-white py-2 rounded">
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RectangleGroupIcon } from '@heroicons/vue/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useAu } from '@/stores/Au'
import { useParcour } from '@/stores/Parcour'
import { ref, onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useSemestre } from '@/stores/Semestre'
import { useEdt } from '@/stores/Edt'
import { useSalle } from '@/stores/Salle'
import { useEnseignant } from '@/stores/Enseignant'
import { useEc } from '@/stores/Ec'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'

const enseignant = useEnseignant()
const edt = useEdt()
const salle = useSalle()
const au = useAu()
const ec = useEc()
const parcour = useParcour()
const semestre = useSemestre()
const URL = useUrl().url
const show = useShow()
const messages = useMessages()

const isModalOpen = ref(false)
const heureDebut = ref('')
const heureFin = ref('')

onBeforeMount(() => {
  parcour.getAllParcours()
  edt.getAllJours()
  edt.getAllHeures()
  salle.getallSalle()
  enseignant.getAllENSEDT()
})

function setIdParcours(id, abr) {
  parcour.parcours_id = id
  parcour.abreviationbyAll = abr
}

function createHoraire() {
  show.showSpinner = true
  const formData = {
    valeur: `${formatHeure(heureDebut.value)} - ${formatHeure(heureFin.value)}`
  }
  axios
    .post(`${URL}/api/heure`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      heureDebut.value = ''
      heureFin.value = ''
      edt.getAllHeures()
      messages.messageSucces = 'Horaire créé !'
      isModalOpen.value = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      show.showSpinner = false
    })
    .catch((error) => {
      console.error(error)
      messages.messageError = error.response.data.message
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
      show.showSpinner = false
    })
}

function formatHeure(heure) {
  return heure.replace(':', 'h')
}

const hours = [
  { id: 1, name: '7h - 8h', unavailable: false },
  { id: 2, name: '8h - 9h', unavailable: false },
  { id: 3, name: '10h - 11h', unavailable: false }
]
const selectedhour = ref(hours[0])
</script>

<style scoped></style>
