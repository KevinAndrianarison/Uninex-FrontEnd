<template>
  <header class="header">
    <div class="left">
      <div
        :style="{
          'background-image':
            'url(' +
            `${URL}/storage/etablissement/${etablissement.etablissement.nomlogo_etab} ` +
            ')'
        }"
        class="logo ml-5"
      ></div>
      <h1>{{ etablissement.etablissement.abr_etab }}</h1>
    </div>
    <div>
      <h1 class="dir"><AtSymbolIcon class="h-7 w-7 mr-2" /> {{ infosheader.status }}</h1>
    </div>
    <div class="right">
      <div class="profil">
        <div
          :style="{
            'background-image': `url(${URL}/storage/users/${infosheader.photo})`
          }"
          class="image"
        ></div>
        <p class="nom font-bold">{{ infosheader.nom }}</p>
      </div>
      <Button @click="downloadImage" class="btn font-bold"
        ><font-awesome-icon
          class=" mr-2"
          :icon="['fas', 'circle-plus']"
        />Publier</Button
      >
      <div class="w-50" v-if="!show.showNavBarEtud">
        <Listbox v-model="au.oneAU">
          <div class="relative">
            <ListboxButton
              class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pr-4'
                    ]"
                  >
                    <span
                      class="spanAU"
                      :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                      >{{ AU.annee_debut }} - {{ AU.annee_fin }}
                      <TrashIcon
                        v-if="show.showNavBarDir"
                        class="delete h-6 w-5 ml-3 pb-1"
                        @click="showDeleteAU()"
                      />
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-left pl-3 text-amber-600"
                    >
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <Tooltip content="Nouvelle AU ">
        <button class="ml-1" v-if="show.showNavBarDir">
          <font-awesome-icon
            @click="createAU()"
            class="iconadd h-7 w-5"
            :icon="['fas', 'square-pen']"
          />
        </button>
      </Tooltip>
      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-gray-800' : 'bg-gray-400'"
        class="relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer ml-4 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-6' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </div>
  </header>
</template>

<script setup>
import { AtSymbolIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'
import { ref, onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useAu } from '@/stores/Au'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useInfosheader } from '@/stores/Infosheader'
import { useEtablissement } from '@/stores/Etablissement'
import Tooltip from './Tooltip.vue'

const au = useAu()
const show = useShow()
const infosheader = useInfosheader()
const URL = useUrl().url
const etablissement = useEtablissement()

const downloadImage = () => {
  const filename = 'Steeve FH.pptx'
  const url = `http://localhost:8000/api/etablissement/image/${filename}`
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const enabled = ref(false)

onBeforeMount(() => {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  if (user.user.status_user === 'Directeur') {
    infosheader.status = user.user.status_user
    infosheader.nom = user.nomComplet_dir
    infosheader.photo = user.user.photo_name
  }
  if (user.user.status_user === 'ENS') {
    infosheader.status = 'Enseignant'
    infosheader.nom = user.nomComplet_ens
    infosheader.photo = user.user.photo_name
  }
  if (user.user.status_user === 'AS') {
    infosheader.status = 'Agent de scolarité'
    infosheader.nom = user.nomComplet_scol
    infosheader.photo = user.user.photo_name
  }
  if (user.user.status_user === 'Etudiant') {
    infosheader.status = user.user.status_user
    infosheader.nom = user.nomComplet_etud
    infosheader.photo = user.user.photo_name
  }
  if (user.chefMention_status === '1') {
    infosheader.status = 'Chef de mention'
    infosheader.nom = user.nomComplet_ens
    infosheader.photo = user.user.photo_name
  }
  if (user.chefParcours_status === '1') {
    infosheader.status = 'Chef de parcours'
    infosheader.nom = user.nomComplet_ens
    infosheader.photo = user.user.photo_name
  }

  au.getallAU()
})

function createAU() {
  show.showCreateAU = true
}

function showDeleteAU() {
  show.showDeleteAU = true
}
</script>

<style src="../styles/Dashboard.css" scoped></style>
