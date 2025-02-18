<template>
  <div>
    <h1 class="font-bold">Modifier les informations sur la page d'accueil :</h1>
    <div class="mt-4 flex gap-4">
      <div class="border rounded w-80 p-4">
        <div class="flex items-center gap-2">
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
          <p class="font-bold">Mention</p>
        </div>
        <p class="text-xs mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim fuga alias eligendi dolorum
          tenetur minus rem quis vitae quo aperiam vel expedita sapiente animi harum magnam ipsum
          modi, illum quod?
        </p>
        <div class="mt-4 flex justify-between justify-end">
          <div class="flex gap-1">
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="text-white bg-red-400 p-1.5 px-2 rounded-full"
            />
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="text-white bg-gray-500 p-1.5 rounded-full"
            />
            <font-awesome-icon
              :icon="['fas', 'arrow-up-from-bracket']"
              class="text-white bg-yellow-500 px-2 p-1.5 rounded-full"
            />
          </div>
          <div class="flex gap-1 items-center text-xs">
            <p>image.png</p>
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-red-500" />
          </div>
        </div>
        <div class="text-right">
          <button class="text-xs bg-yellow-500 text-white py-2 px-4 rounded">ENREGISTRER</button>
        </div>
      </div>
      <div class="w-80 p-4">
        <button
          v-if="!createMention"
          @click="showcreatMention"
          class="text-xs bg-blue-500 flex justify-center items-center gap-2 text-white py-2 px-4 rounded"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />Nouvelle mention
        </button>
        <div class="flex flex-col gap-4" v-if="createMention">
          <input
            type="text"
            placeholder="Mention"
            class="rounded ring-1 focus:outline-none focus:ring py-2 px-2 text-xs w-full"
          />
          <div>
            <textarea
              class="rounded ring-1 h-20 focus:outline-none focus:ring py-2 px-2 text-xs w-full"
              placeholder="Description"
            ></textarea>
            <div class="flex gap-1 items-center text-xs">
              <p>image.png</p>
              <font-awesome-icon :icon="['fas', 'xmark']" class="text-red-500" />
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <font-awesome-icon
              :icon="['fas', 'arrow-up-from-bracket']"
              class="text-white bg-yellow-500 px-2 p-1.5 w-3 h-4 rounded-full"
            />
            <button class="text-xs w-full bg-yellow-500 text-white py-2 px-4 rounded">
              ENREGISTRER
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const createMention = ref(false)

function showcreatMention() {
  createMention.value = true
}
</script>

<style scoped></style>
