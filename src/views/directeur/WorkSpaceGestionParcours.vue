<template>
  <div class="parcours">
    <h1 class="titre">
      <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'clipboard-check']" />
      Parcours
    </h1>
    <div class="createParcours">
      <h1 class="create pl-5 mt-2">Ajouter un nouveau Parcours :</h1>

      <div class="content pb-5">
        <div class="radio px-4 mt-4">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Choisissez un niveau :
          </label>
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

        <div class="right ml-4 px-4 mt-4" v-if="mention.mentionParcours.nom">
          <div class="sm:col-span-3 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Choisissez une mention :</label
            >
            <div class="w-60 mt-1">
              <Listbox v-model="mention.mentionParcours.nom">
                <div class="relative">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
                      class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
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
                              : 'text-gray-900',
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
                            >{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</span
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
          </div>
        </div>
      </div>

      <div class="class formInput border-gray-900/10 pb-5 pl-5" v-if="mention.mentionParcours.nom">
        <div class="sm:col-span-3 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nom du parcours</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="parcour.nom_parcours"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Abréviation</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="parcour.abr_parcours"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="divbtn sm:col-span-3 mt-2">
          <Button
            class="btn"
            @click="parcour.postParcour()"
            :disabled="!parcour.nom_parcours || !parcour.abr_parcours"
          >
            Valider</Button
          >
        </div>
      </div>
    </div>
    <div
      class="listParcours"
      v-if="mention.mentionParcours.nom && parcour.ListParcours.length !== 0"
    >
      <div class="listScolValue">
        <div class="head pb-2">
          <li class="widthnom">Parcours</li>
          <li class="widthemail">Niveau</li>
          <li class="h-5 w-5"></li>
        </div>
        <div class="body" :key="index" v-for="(prc, index) in parcour.ListParcours">
          <li class="widthvaluenom">{{ prc.nom_parcours }}</li>
          <li class="widthvalueemail">{{ prc.abr_parcours }}</li>
          <TrashIcon
            class="delete h-5 w-5"
            @click="showDeleteParcoursModal(prc.id, prc.abr_parcours)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNiveau } from '@/stores/Niveau'
import { useParcour } from '@/stores/Parcour'
import { useMention } from '@/stores/Mention'
import { useShow } from '@/stores/Show'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'

const niveau = useNiveau()
const mention = useMention()
const parcour = useParcour()
const show = useShow()

function showDeleteParcoursModal(id, abr) {
  parcour.parcours_id = id
  parcour.parcours_abr = abr
  show.showDeleteParcour = true
}

function setIdMention(id) {
  mention.mentionParcours.id = id
}
</script>

<style scoped src="../../styles/GestionParcours.css"></style>
