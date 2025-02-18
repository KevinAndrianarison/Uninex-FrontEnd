<template>
  <div class="flex gap-4 py-4">
    <div class="flex flex-col gap-2">
      <p class="text-xs font-bold flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'image']" class="text-blue-500" />Photo 1 :
      </p>
      <div
        class="border rounded w-80 h-40 flex gap-2 flex-col border-dashed border-4 items-center justify-center p-4"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          class="text-green-500 rounded border-2 border-green-500 py-1 px-2"
        />
        <p class="text-gray-500 text-xs">Aucune image n'as été importée</p>
      </div>
      <div class="flex gap-1 text-xs items-center">
        <p>image.png</p>
        <font-awesome-icon :icon="['fas', 'xmark']" class="text-red-500" />
      </div>
      <button class="bg-green-500 text-white text-xs rounded py-2 flex items-center justify-center">
        Choisir une image
      </button>
      <button class="bg-blue-500 text-white text-xs rounded py-2 flex items-center justify-center">
        ENREGISTRER
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-xs font-bold flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'image']" class="text-blue-500" />Photo 2 :
      </p>
      <div class="border image rounded h-40 w-80 p-4"></div>
      <div class="flex gap-1 text-xs items-center">
        <p>image.png</p>
        <font-awesome-icon :icon="['fas', 'xmark']" class="text-red-500" />
      </div>
      <button class="bg-green-500 text-white text-xs rounded py-2 flex items-center justify-center">
        Changer l'image
      </button>
      <button class="bg-blue-500 text-white text-xs rounded py-2 flex items-center justify-center">
        MODIFIER
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.image {
  background-image: url('./assets/images/course-2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
