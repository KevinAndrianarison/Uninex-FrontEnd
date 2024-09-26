<template>
  <div class="lists">
    <h1 class="titre">
      <PlusCircleIcon class="h-8 w-8 mr-5" /> Gestion des unités d'enseignement (UE)
    </h1>
    <div class="chooseSemestre" v-if="mention.nom_mention">
      <h1 class="create pl-5 mt-2">Sélectionnez un semestre :</h1>

      <div v-if="mention.nom_mention" class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 ctgr mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Mentions</label>
          <div class="w-52 mt-1 mr-4">
            <Listbox v-model="mention.nom_mention">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate"
                    >{{ mention.nom_mention }} / {{ mention.abreviation }}</span
                  >
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(mnt, index) in mention.ListMentionByEns"
                      :value="mnt.nom_mention"
                      @click="setIdmention(mnt.id, mnt.abr_mention)"
                    >
                      <li
                        :class="[
                          mention.abreviation === mnt.abr_mention
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            mention.abreviation === mnt.abr_mention ? 'font-medium' : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</span
                        >
                        <span
                          v-if="mention.abreviation === mnt.abr_mention"
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
        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="parcour.nom">
          <label class="block text-sm font-medium leading-6 text-gray-900">Parcours</label>
          <div class="w-52 mt-1 mr-4">
            <Listbox v-model="parcour.nom">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ parcour.nom }} / {{ parcour.abreviation }}</span>
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(prc, index) in parcour.ListParcoursByMention"
                      :value="prc.nom_parcours"
                      @click="setIdParcours(prc.id, prc.abr_parcours)"
                    >
                      <li
                        :class="[
                          parcour.abreviation === prc.abr_parcours
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            parcour.abreviation === prc.abr_parcours
                              ? 'font-medium'
                              : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ prc.nom_parcours }} / {{ prc.abr_parcours }}</span
                        >
                        <span
                          v-if="parcour.abreviation === prc.abr_parcours"
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

        <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="semestre.semestreNom">
          <label class="block text-sm font-medium leading-6 text-gray-900">Semestre</label>
          <div class="w-52 mt-1 mr-4">
            <Listbox v-model="semestre.semestreNom">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ semestre.semestreNom }}</span>
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
                    class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      :key="index"
                      v-for="(sm, index) in semestre.ListeSemestre"
                      :value="sm.nom_semestre"
                      @click="setSemestreId(sm.id)"
                    >
                      <li
                        :class="[
                          semestre.semestreNom === sm.nom_semestre
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[
                            semestre.semestreNom === sm.nom_semestre
                              ? 'font-medium'
                              : 'font-normal',
                            'block truncate'
                          ]"
                          >{{ sm.nom_semestre }}</span
                        >
                        <span
                          v-if="semestre.semestreNom === sm.nom_semestre"
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
        <div v-if="semestre.semestreNom" class="w-52 sm:col-span-3 mr-4 mt-2">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nom de l'UE</label>
          <div class="mt-2 relative">
            <input
              type="text"
              v-model="ue.nom_ue"
              class="pl-3 pr-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
            ></button>
          </div>
        </div>
        <div class="w-40 sm:col-span-3 mr-4 mt-2" v-if="semestre.semestreNom">
          <label class="block text-sm font-medium leading-6 text-gray-900">Crédit</label>
          <div class="mt-2 relative">
            <input
              type="number"
              v-model="ue.credit_ue"
              @input="limitcreditLength"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
            ></button>
          </div>
        </div>
        <div class="divbtn sm:col-span-3 mt-2" v-if="semestre.semestreNom">
          <Button class="btn" @click="ue.createUE()" :disabled="!ue.nom_ue || !ue.credit_ue">
            Valider</Button
          >
        </div>
      </div>
    </div>
    <div class="listUE">
      <div class="header">
        <h1 class="create pl-5 mt-4">Liste des UE de ce semestre :</h1>
      </div>
      <div class="listEtudValue">
        <div class="head">
          <li class="widtUE">Nom de l'UE</li>
          <li class="widthcredit">Crédit</li>
          <li class="widthUEnom"></li>
        </div>
        <div :key="index" v-for="(UE, index) in ue.ListeueBysemestre">
          <div class="body">
            <li class="widthvalueUE">{{ UE.nom_ue }}</li>
            <li class="widthvaluecredit">{{ UE.credit_ue }}</li>
            <li class="widthvalueTrash">
              <TrashIcon @click="showdeleteUE(UE.nom_ue, UE.id)" class="delete h-5 w-5" />
            </li>
          </div>
        </div>
        <div class="Empty" v-if="ue.ListeueBysemestre.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { useMention } from '@/stores/Mention'
import { useUe } from '@/stores/Ue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useShow } from '@/stores/Show'
import { useAu } from '@/stores/Au'
import { onBeforeMount } from 'vue'

const semestre = useSemestre()
const ue = useUe()
const parcour = useParcour()
const show = useShow()
const mention = useMention()
const au = useAu()


function showdeleteUE(nom, id) {
  ue.nomUE = nom
  ue.id = id
  show.showDeleteUE = true
}

onBeforeMount(() => {
  console.log('2')
  mention.getMentionByRespId()
})

function setIdmention(id, abr) {
  mention.mention_id = id
  mention.abreviation = abr
}

function setIdParcours(id, abr) {
  parcour.parcours_id = id
  parcour.abreviation = abr
}

function limitcreditLength(event) {
  const value = event.target.value
  if (value.length > 1) {
    event.target.value = value.slice(0, 1)
    ue.credit_ue = event.target.value
  }
}

function setSemestreId(id) {
  semestre.semestreId = id
}
</script>

<style scoped src="../../styles/Ue.css"></style>
