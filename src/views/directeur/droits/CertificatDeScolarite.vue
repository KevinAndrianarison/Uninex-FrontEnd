<template>
  <div>
    <h1 class="mt-5 text-xl">
      Modifier les frais du certificat de scolarité
      <p class="text-xs">({{ au.oneAU }})</p>
    </h1>
    <div class="mt-5">
      <div class="flex items-top gap-4">
        <p class="font-bold text-xs py-2">Montant (Ariary) :</p>
        <div class="flex flex-col gap-2">
          <input
            type="number"
            class="w-60 bg-gray-200 rounded text-center py-2 text-xs focus:outline-none focus:ring-b cursor-pointer"
          />
          <button
            class="text-xs w-60 bg-yellow-500 px-5 py-2 border text-white rounded border-yellow-500"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAu } from '@/stores/Au'

const au = useAu()
</script>

<style scoped></style>
