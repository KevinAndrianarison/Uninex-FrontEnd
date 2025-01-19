<script setup>
import { useShow } from '@/stores/Show'
import { useEdt } from '@/stores/Edt'
import { useEtablissement } from '@/stores/Etablissement'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const edt = useEdt()
const etablissemnet = useEtablissement()
const theme = useTheme()

function closeEDT() {
  show.showEDT = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showEDT">
      <div
        :class="
          theme.theme === 'light'
            ? 'formModal !w-[1024px]'
            : 'formModal !w-[1024px] !bg-gray-600 !text-white'
        "
      >
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeEDT()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : '!text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <p class="font-bold text-xs">UNIVERSITE D'{{ etablissemnet.etablissement.ville_etab }}</p>
        <p class="font-bold text-xs">{{ etablissemnet.etablissement.nom_etab }}</p>
        <p class="font-bold text-xs">Année universitaire : {{ edt.AUedt }}</p>
        <p class="font-bold text-xs">PARCOURS : {{ edt.parcoursEdt }}</p>
        <p class="font-bold text-xs">{{ edt.SemestreEdt }}</p>
        <div class="max-h-[70vh] overflow-y-auto">
          <div class="flex list-none text-center mt-2 font-bold">
            <div v-for="jour in edt.oneEDT" :key="edt.id">
              <li class="w-[150px] border font-bold">{{ jour.jour }}</li>
              <div class="border text-xs" v-for="seance in jour.seances" :key="seance.horaire">
                <p class="bg-gray-200">{{ seance.horaire }}</p>
                <div class="py-2">
                  <div class="font-bold">{{ seance.matiere }}</div>
                  <div>{{ seance.enseignant }}</div>
                  <div>{{ seance.salle }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-col items-end text-center text-xs">
          <button
            @click="
              () => {
                show.showEDTpdf = true
              }
            "
            class="border px-5 py-2 rounded text-white bg-blue-500"
          >
            ✨ Génerer un PDF
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
