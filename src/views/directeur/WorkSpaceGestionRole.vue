<template>
  <div :class="theme.theme === 'light' ? 'parcours' : 'parcours !bg-gray-600 !text-white'">
    <div class="flex items-center justify-between !mb-2 createParcour">
      <h1 class="titre font-bold">
        <CheckBadgeIcon class="h-8 w-8 mr-4" />
        Rôles
      </h1>
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

    <div
      :class="
        theme.theme === 'light' ? 'createParcours' : 'createParcours !bg-gray-600 !text-gray-200'
      "
    >
      <div class="radio px-4 mt-2 ml-2">
        <div class="mt-2">
          <RadioGroup v-model="niveau.NiveauCheck">
            <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
            <div class="flex space-x-2">
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
                  class="relative radiolist flex cursor-pointer rounded-sm py-1"
                >
                  <div class="flex w-full items-center justify-between">
                    <div class="flex items-center">
                      <div class="text-sm">
                        <RadioGroupLabel
                          as="p"
                          :class="niveau.NiveauCheck.id === niv.id ? 'text-white' : 'text-gray-900'"
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

      <h1 class="create pl-5 mt-2" v-if="mention.mentionParcours.nom && enseignant.nom_ens">
        Ajouter un nouveau chef de mention :
      </h1>

      <div class="content pb-2">
        <div class="right ml-2 px-4 mt-2" v-if="mention.mentionParcours.nom && enseignant.nom_ens">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Choisissez un enseignant :</label>
            <div class="mention">
              <div class="w-52 mt-1 mr-4">
                <Listbox v-model="enseignant.nom_ens">
                  <div class="relative">
                    <ListboxButton
                      :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                      class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ enseignant.nom_ens }}</span>
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
                        class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          :key="index"
                          v-for="(ens, index) in enseignant.ListeENS"
                          :value="ens.nomComplet_ens"
                          @click="setEnseignantTop(ens.id)"
                        >
                          <li
                            :class="[
                              enseignant.nom_ens === ens.nomComplet_ens
                                ? 'bg-amber-100 text-amber-900'
                                : '',
                              'relative cursor-default select-none py-2 pl-10 pr-4'
                            ]"
                          >
                            <span
                              :class="[
                                enseignant.nom_ens === ens.nomComplet_ens
                                  ? 'font-medium'
                                  : 'font-normal',
                                'block truncate'
                              ]"
                              >{{ ens.nomComplet_ens }}</span
                            >
                            <span
                              v-if="enseignant.nom_ens === ens.nomComplet_ens"
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

              <div class="w-52 mt-1 mr-4">
                <Listbox v-model="mention.mentionParcours.nom">
                  <div class="relative">
                    <ListboxButton
                      :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                      class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ mention.mentionParcours.nom }}</span>
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
                        class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          :key="index"
                          v-for="(mnt, index) in mention.ListMention"
                          :value="mnt.nom_mention"
                          @click="setIdMention(mnt.id)"
                        >
                          <li
                            :class="[
                              mention.mentionParcours.nom === mnt.nom_mention
                                ? 'bg-amber-100 text-amber-900'
                                : '',
                              'relative cursor-default select-none py-2 pl-10 pr-4'
                            ]"
                          >
                            <span
                              :class="[
                                mention.mentionParcours.nom === mnt.nom_mention
                                  ? 'font-medium'
                                  : 'font-normal',
                                'block truncate'
                              ]"
                              >{{ mnt.abr_mention }}</span
                            >
                            <span
                              v-if="mention.mentionParcours.nom === mnt.nom_mention"
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

              <div class="sm:col-span-3 mt-1">
                <Button class="btn font-bold text-black" @click="mention.addRespMention()">
                  Valider</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="create pl-5 mt-2" v-if="parcour.parcours_nom && enseignant.name">
        Ajouter un nouveau chef de parcours :
      </h1>

      <div class="content pb-5">
        <div class="right ml-2 px-4 mt-2" v-if="parcour.parcours_nom && enseignant.name">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Choisissez un enseignant :</label>
            <div class="mention">
              <div class="w-52 mt-1 mr-4">
                <Listbox v-model="enseignant.name">
                  <div class="relative">
                    <ListboxButton
                      :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                      class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ enseignant.name }}</span>
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
                          :key="index"
                          v-for="(ens, index) in enseignant.ListeENS"
                          :value="ens.nomComplet_ens"
                          @click="setEnseignantBottom(ens.id)"
                        >
                          <li
                            :class="[
                              enseignant.name === ens.nomComplet_ens
                                ? 'bg-amber-100 text-amber-900'
                                : '',
                              'relative cursor-default select-none py-2 pl-10 pr-4'
                            ]"
                          >
                            <span
                              :class="[
                                enseignant.name === ens.nomComplet_ens
                                  ? 'font-medium'
                                  : 'font-normal',
                                'block truncate'
                              ]"
                              >{{ ens.nomComplet_ens }}</span
                            >
                            <span
                              v-if="enseignant.name === ens.nomComplet_ens"
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

              <div class="w-52 mt-1 mr-4">
                <Listbox v-model="parcour.parcours_nom">
                  <div class="relative">
                    <ListboxButton
                      :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                      class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ parcour.parcours_nom }}</span>
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
                          :key="index"
                          v-for="(prc, index) in parcour.ListParcours"
                          :value="prc.nom_parcours"
                          @click="setIdParcours(prc.id)"
                        >
                          <li
                            :class="[
                              parcour.parcours_nom === prc.nom_parcours
                                ? 'bg-amber-100 text-amber-900'
                                : '',
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

              <div class="sm:col-span-3 mt-1">
                <Button class="btn font-bold text-black" @click="parcour.addRespParcours()">
                  Valider</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="theme.theme === 'light' ? 'listRole' : 'listRole !bg-gray-600 !text-white'"
      v-if="mention.mentionParcours.nom || parcour.parcours_nom"
    >
      <div class="listScolValue">
        <div class="head pb-2">
          <li class="widthnom">Mentions et Parcours</li>
          <li class="widthemails">Responsables</li>
          <li class="widthe">Retirer</li>
        </div>
        <div
          :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'"
          :key="index"
          v-for="(mnt, index) in mention.ListMention"
        >
          <li class="widthvaluenom truncate">{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</li>
          <li class="widthvalueemails truncate" v-if="mnt.enseignant !== null">
            {{ mnt.enseignant.nomComplet_ens }}
          </li>
          <li class="widthe">
            <font-awesome-icon
              v-if="mnt.enseignant !== null"
              @click="mention.clearEnseignantId(mnt.id, mnt.enseignant.id)"
              class="h-6 w-6 red"
              :icon="['fas', 'person-circle-xmark']"
            />
          </li>
        </div>
        <div class="body" :key="index" v-for="(prc, index) in parcour.ListParcours">
          <li class="widthvaluenom">{{ prc.nom_parcours }} / {{ prc.abr_parcours }}</li>
          <li class="widthvalueemails" v-if="prc.enseignant !== null">
            {{ prc.enseignant.nomComplet_ens }}
          </li>
          <li class="widthe">
            <font-awesome-icon
              v-if="prc.enseignant !== null"
              @click="parcour.clearEnseignantId(prc.id, prc.enseignant.id)"
              class="h-6 w-6 red"
              :icon="['fas', 'person-circle-xmark']"
            />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { useNiveau } from '@/stores/Niveau'
import { useParcour } from '@/stores/Parcour'
import { useMention } from '@/stores/Mention'
import { useEnseignant } from '@/stores/Enseignant'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'

import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { onBeforeMount } from 'vue'

const niveau = useNiveau()
const mention = useMention()
const parcour = useParcour()
const enseignant = useEnseignant()
const theme = useTheme()
const au = useAu()

onBeforeMount(() => {
  enseignant.getAllENS()
})

function setIdMention(id) {
  mention.mentionParcours.id = id
}

function setEnseignantTop(id) {
  enseignant.idTop = id
}

function setEnseignantBottom(id) {
  enseignant.idBottom = id
}

function setIdParcours(id) {
  parcour.parcours_id = id
}
</script>

<style scoped src="../../styles/GestionParcours.css"></style>
