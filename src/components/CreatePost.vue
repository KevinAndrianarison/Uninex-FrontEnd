<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const show = useShow()

function closeCreatePost() {
  show.showCreatePost = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreatePost">
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreatePost()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold text-lg">Créér une annonce :</h1>
        <input
          type="text"
          placeholder="Titre"
          class="focus:outline-none border-2 rounded w-full px-3 mt-5 py-2"
        />
        <select class="mt-2 w-full py-2 px-2 rounded border-2 focus:outline-none">
          <option class="bg-green-100 text-black font-bold" disabled>Catégories</option>
          <option value="Les plus important">Les plus important</option>
          <option value="Les plus recents">Les plus recents</option>
          <option value="Les plus aimés">Les plus aimés</option>
        </select>
        <textarea
          placeholder="Description"
          class="min-h-[100px] focus:outline-none border-2 rounded w-full px-3 mt-2 py-2"
        ></textarea>
        <div class="relative flex items-center">
          <input
            class="absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            accept="image/jpeg, image/png"
          />
          <div
            class=" w-full file-label bg-green-100 text-green-800 py-2 text-center rounded-md border border-green-300"
          >
            📂 Importer un fichier
          </div>
        </div>
        <div class="flex text-xs">
          <p class="text-yellow-500 mr-2">Nom du fichier</p>
          <b>X</b>
        </div>
        <button class="focus:outline-none bg-green-500 font-bold rounded w-full px-3 mt-2 py-2">
          Publier
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
