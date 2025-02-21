<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useUrl } from '@/stores/url'
import { useTheme } from '@/stores/Theme'
import { useConge } from '@/stores/conge'
import NProgress from 'nprogress'
import axios from 'axios'

const URL = useUrl().url
const show = useShow()
const theme = useTheme()
const conge = useConge()

function closeShowConge() {
  show.showConge = false
}

function refuseConge(id) {
  let formData = {
    status: 'Réfusé'
  }
  NProgress.start()
  axios
    .put(`${URL}/api/congepermission/${id}`, formData)
    .then((response) => {
      closeShowConge()
      conge.getAllCongepermission()
      NProgress.done()
    })
    .catch((err) => {
      console.error(err)
      NProgress.done()
    })
}

function valideConge(id) {
  let formData = {
    status: 'Validé'
  }
  NProgress.start()
  axios
    .put(`${URL}/api/congepermission/${id}`, formData)
    .then((response) => {
      closeShowConge()
      conge.getAllCongepermission()
      NProgress.done()
    })
    .catch((err) => {
      console.error(err)
      NProgress.done()
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showConge">
      <div
        :class="
          theme.theme === 'light'
            ? 'formModalsInfosEtud'
            : 'formModalsInfosEtud !bg-gray-600 !text-white'
        "
      >
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeShowConge()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : 'text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <div class="flex flex-col gap-5">
          <div class="flex gap-2 items-center">
            <div
              :style="{
                'background-image':
                  'url(' +
                  `${URL}/storage/users/${
                    conge.oneConge.user.photo_name || 'téléchargement-removebg-preview.png'
                  } ` +
                  ')',
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="w-20 h-20 rounded-full"
            ></div>
            <div>
              <p class="font-bold text-xs">{{ conge.oneConge.user.email }}</p>
              <h1 class="text-blue-500 flex gap-2">
                Demande de « {{ conge.oneConge.type }}
                <p v-if="conge.oneConge.category">- {{ conge.oneConge.category }}</p>
                »
              </h1>
            </div>
          </div>
          <div class="flex gap-1 flex-col">
            <p class="text-xs">
              Du : <b>{{ conge.oneConge.dateDebut }}</b> à : <b>{{ conge.oneConge.dateFin }}</b>
            </p>
            <p class="font-bold text-xs">Description</p>
            <div class="bg-gray-100 w-full text-xs p-2 rounded">
              {{ conge.oneConge.description }}
            </div>
          </div>
          <iframe
            :src="`${URL}/storage/conge/${conge.oneConge.fichier_nom}`"
            class="rounded border h-[50vh] overflow-y-auto"
            frameborder="0"
          ></iframe>
          <div
            v-if="show.showNavBarDir"
            class="text-xs"
          >
            <button
              v-if="conge.oneConge.status === 'Réfusé' || conge.oneConge.status === 'En attente'"
              @click="valideConge(conge.oneConge.id)"
              class="bg-yellow-500 text-white px-4 flex gap-2 items-center py-2 rounded"
            >
              <font-awesome-icon :icon="['fas', 'circle-check']" />Valider la demande
            </button>
            <button
              @click="refuseConge(conge.oneConge.id)"
              v-if="conge.oneConge.status === 'Validé' || conge.oneConge.status === 'En attente'"
              class="bg-red-500 text-white px-4 flex gap-2 items-center py-2 rounded mt-2"
            >
              <font-awesome-icon :icon="['fas', 'xmark']" />Réfuser la demande
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
