<template>
  <div class="flex gap-4 py-4">
    <div class="flex flex-col">
      <p class="text-xs font-bold flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'image']" class="text-blue-500" />Photo 1 :
      </p>
      <div
        v-if="!acceuil.photoAcceuil.photoNameOne"
        class="border rounded w-80 h-80 flex gap-2 flex-col border-dashed border-4 items-center mt-2 justify-center p-4"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          class="text-green-500 rounded border-2 border-green-500 py-1 px-2"
        />
        <p class="text-gray-500 text-xs">Aucune image n'as été importée</p>
      </div>
      <div
        v-if="acceuil.photoAcceuil.photoNameOne"
        class="relative image rounded h-80 w-80 my-2"
        :style="{
          'background-image':
            'url(' + `${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameOne} ` + ')'
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          @click="deletePhotoOne"
          class="absolute top-2 right-2 text-gray-500 bg-gray-200 rounded-full cursor-pointer p-1 px-1.5"
        />
      </div>
      <div v-if="namePhotoOne" class="flex w-80 gap-1 text-xs items-center">
        <p class="truncate">{{ namePhotoOne }}</p>
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          @click="removePhotoOne"
          class="text-red-500 cursor-pointer"
        />
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoOne"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="!acceuil.photoAcceuil.photoNameOne"
          class="bg-green-500 text-white w-full text-xs py-2 mt-2 flex items-center justify-center"
        >
          Choisir une image
        </button>
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoOne"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="acceuil.photoAcceuil.photoNameOne"
          class="bg-green-500 w-full text-white text-xs py-2 flex items-center justify-center"
        >
          Changer l'image
        </button>
      </div>
      <button
        v-if="namePhotoOne"
        @click="putPhotoOne"
        class="bg-blue-500 text-white text-xs py-2 flex items-center justify-center"
      >
        ENREGISTRER
      </button>
    </div>
    <div class="flex flex-col">
      <p class="text-xs font-bold flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'image']" class="text-blue-500" />Photo 2 :
      </p>
      <div
        v-if="!acceuil.photoAcceuil.photoNameTwo"
        class="border rounded w-80 h-80 flex gap-2 flex-col border-dashed border-4 items-center mt-2 justify-center p-4"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          class="text-green-500 rounded border-2 border-green-500 py-1 px-2"
        />
        <p class="text-gray-500 text-xs">Aucune image n'as été importée</p>
      </div>
      <div
        v-if="acceuil.photoAcceuil.photoNameTwo"
        class="relative image rounded h-80 w-80 my-2"
        :style="{
          'background-image':
            'url(' + `${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameTwo} ` + ')'
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          @click="deletePhotoTwo"
          class="absolute top-2 right-2 text-gray-500 bg-gray-200 rounded-full cursor-pointer p-1 px-1.5"
        />
      </div>
      <div v-if="namePhotoTwo" class="flex w-80 gap-1 text-xs items-center">
        <p class="truncate">{{ namePhotoTwo }}</p>
        <font-awesome-icon
          @click="removePhotoTwo"
          :icon="['fas', 'xmark']"
          class="text-red-500 cursor-pointer"
        />
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoTwo"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="!acceuil.photoAcceuil.photoNameTwo"
          class="bg-green-500 text-white text-xs w-full py-2 flex items-center mt-2 justify-center"
        >
          Choisir une image
        </button>
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoTwo"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="acceuil.photoAcceuil.photoNameTwo"
          class="bg-green-500 text-white text-xs w-full py-2 flex items-center justify-center"
        >
          Changer l'image
        </button>
      </div>
      <button
        v-if="namePhotoTwo"
        @click="putPhotoTwo"
        class="bg-blue-500 text-white text-xs py-2 flex items-center justify-center"
      >
        ENREGISTRER
      </button>
    </div>
    <div class="flex flex-col">
      <p class="text-xs font-bold flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'image']" class="text-blue-500" />Photo 3 :
      </p>
      <div
        v-if="!acceuil.photoAcceuil.photoNameThree"
        class="border rounded w-80 h-80 flex gap-2 flex-col border-dashed border-4 items-center justify-center mt-2 p-4"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          class="text-green-500 rounded border-2 border-green-500 py-1 px-2"
        />
        <p class="text-gray-500 text-xs">Aucune image n'as été importée</p>
      </div>
      <div
        v-if="acceuil.photoAcceuil.photoNameThree"
        class="relative image rounded h-80 w-80 my-2"
        :style="{
          'background-image':
            'url(' + `${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameThree} ` + ')'
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          @click="deletePhotoThree"
          class="absolute top-2 right-2 text-gray-500 bg-gray-200 rounded-full cursor-pointer p-1 px-1.5"
        />
      </div>
      <div v-if="namePhotoThree" class="flex w-80 gap-1 text-xs items-center">
        <p class="truncate">{{ namePhotoThree }}</p>
        <font-awesome-icon
          @click="removePhotoThree"
          :icon="['fas', 'xmark']"
          class="text-red-500 cursor-pointer"
        />
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoThree"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="!acceuil.photoAcceuil.photoNameThree"
          class="bg-green-500 w-full text-white text-xs py-2 flex mt-2 items-center justify-center"
        >
          Choisir une image
        </button>
      </div>
      <div class="relative flex items-center">
        <input
          @change="onFileChangePhotoThree"
          class="absolute inset-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/jpeg, image/png"
        />
        <button
          v-if="acceuil.photoAcceuil.photoNameThree"
          class="bg-green-500 text-white text-xs w-full py-2 flex items-center justify-center"
        >
          Changer l'image
        </button>
      </div>
      <button
        v-if="namePhotoThree"
        @click="putPhotoThree"
        class="bg-blue-500 text-white text-xs py-2 flex items-center justify-center"
      >
        ENREGISTRER
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAcceuil } from '@/stores/Acceuil'
import { ref, onBeforeMount } from 'vue'
import { useShow } from '@/stores/Show'
import axios from 'axios'
import { useUrl } from '@/stores/url'

const acceuil = useAcceuil()
const show = useShow()
const URL = useUrl().url

const namePhotoOne = ref('')
const PhotoOne = ref(null)
const namePhotoTwo = ref('')
const PhotoTwo = ref(null)
const namePhotoThree = ref('')
const PhotoThree = ref(null)

function putPhotoOne() {
  let formData = new FormData()
  formData.append('photoOne', PhotoOne.value || null)
  formData.append('_method', 'PUT')
  fetchPhoto(formData)
}

function putPhotoTwo() {
  let formData = new FormData()
  formData.append('photoTwo', PhotoTwo.value || null)
  formData.append('_method', 'PUT')
  fetchPhoto(formData)
}

function putPhotoThree() {
  let formData = new FormData()
  formData.append('photoThree', PhotoThree.value || null)
  formData.append('_method', 'PUT')
  fetchPhoto(formData)
}

function deletePhotoOne() {
  let formData = {
    photoOne: null
  }
  FetchPhoto(formData)
}

function deletePhotoTwo() {
  let formData = {
    photoTwo: null
  }
  FetchPhoto(formData)
}

function deletePhotoThree() {
  let formData = {
    photoThree: null
  }
  FetchPhoto(formData)
}

function onFileChangePhotoOne(event) {
  PhotoOne.value = event.target.files[0]
  namePhotoOne.value = event.target.files[0].name
}

function onFileChangePhotoTwo(event) {
  PhotoTwo.value = event.target.files[0]
  namePhotoTwo.value = event.target.files[0].name
}

function onFileChangePhotoThree(event) {
  PhotoThree.value = event.target.files[0]
  namePhotoThree.value = event.target.files[0].name
}

function removePhotoOne() {
  PhotoOne.value = null
  namePhotoOne.value = ''
}

function removePhotoTwo() {
  PhotoTwo.value = null
  namePhotoTwo.value = ''
}

function removePhotoThree() {
  PhotoThree.value = null
  namePhotoThree.value = ''
}

function FetchPhoto(formData) {
  show.showSpinner = true
  axios
    .put(`${URL}/api/acceuil/1`, formData)
    .then((response) => {
      console.log(response.data)
      PhotoOne.value = null
      namePhotoOne.value = ''
      PhotoTwo.value = null
      namePhotoTwo.value = ''
      PhotoThree.value = null
      namePhotoThree.value = ''
      show.showSpinner = false
      acceuil.getPhotoAcceuil()
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function fetchPhoto(formData) {
  show.showSpinner = true
  axios
    .post(`${URL}/api/acceuil/1`, formData)
    .then((response) => {
      console.log(response.data)
      PhotoOne.value = null
      namePhotoOne.value = ''
      PhotoTwo.value = null
      namePhotoTwo.value = ''
      PhotoThree.value = null
      namePhotoThree.value = ''
      show.showSpinner = false
      acceuil.getPhotoAcceuil()
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

onBeforeMount(() => {
  acceuil.getPhotoAcceuil()
})
</script>

<style scoped>
.image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
