<template>
  <div class="scol">
    <h1 class="titre">
      <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'paperclip']" /> Inscriptions
    </h1>
    <div class="createScol">
      <div class="radio px-4 mt-2 pb-2 ml-2">
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

      <h1 class="create pl-5 mt-2" v-if="parcour.parcours_nom">Ajouter des étudiants en Première année :</h1>
      <div v-if="parcour.parcours_nom" class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mr-4 mt-2">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="agentscolarite.nomComplet_scol"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
          <div class="mt-2">
            <input
              type="email"
              @input="regex.RegexEmail(user.email)"
              v-model="user.email"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
          </div>
        </div>



        <div class="sm:col-span-3 mt-2 ctgr mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Parcours</label>
          <div class="w-52 mt-1 mr-4">
                <Listbox v-model="parcour.parcours_nom">
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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

        <div class="divbtn sm:col-span-3 mt-2">
          <Button
            :disabled="
              !user.photo ||
              !user.email ||
              !agentscolarite.nomComplet_scol ||
              !agentscolarite.categorie_scol ||
              show.showMessageErrorEmail
            "
            @click="showMdp()"
            class="btn mb-1"
          >
            Valider</Button
          >
        </div>
      </div>
    </div>
    <div class="listScol" v-if="agentscolarite.ListeAS.length !== 0">
      <input
        placeholder="🔎 Recherche par nom"
        @input="agentscolarite.search(agentscolarite.searchalue)"
        v-model="agentscolarite.searchalue"
        type="search"
        class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
      />
      <div class="listScolValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Adresse email</li>
          <li class="width">Numéro téléphone</li>
          <li class="width">Catégorie</li>
          <li class="h-5 w-5"></li>
        </div>
        <div class="body" :key="index" v-for="(as, index) in agentscolarite.ListeAS">
          <li class="widthvaluenom">{{ as.nomComplet_scol }}</li>
          <li class="widthvalueemail">{{ as.user.email }}</li>
          <li class="widthvalue">{{ as.telephone_scol }}</li>
          <li class="widthvalue">{{ as.categorie_scol }}</li>
          <TrashIcon @click="showdelete(as.user_id)" class="delete h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useUser } from '@/stores/User'
import { useRegex } from '@/stores/Regex'
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { useParcour } from '@/stores/Parcour'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { useNiveau } from '@/stores/Niveau'
import { useEnseignant } from '@/stores/Enseignant'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'

const niveau = useNiveau()
const enseignant = useEnseignant()
const user = useUser()
const regex = useRegex()
const show = useShow()
const agentscolarite = useAgentscolarite()
const password = usePassword()
const parcour = useParcour()


function showMdp() {
  password.generatePassword()
  show.showMdpAS = true
}

function showdelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'AS'
}

onBeforeMount(() => {
  enseignant.getAllENS()
  agentscolarite.getAllAS()
})
</script>

<style scoped src="../../styles/GestionAgentScol.css"></style>
