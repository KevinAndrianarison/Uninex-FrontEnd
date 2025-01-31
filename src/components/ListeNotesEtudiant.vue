<script setup>
import { useShow } from '@/stores/Show'
import { useEtudiant } from '@/stores/Etudiant'
import { useDirecteur } from '@/stores/Directeur'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/stores/Theme'
import {
  SparklesIcon
} from '@heroicons/vue/24/outline'

const show = useShow()
const directeur = useDirecteur()
const etudiant = useEtudiant()
const theme = useTheme()

function handleNoteElim() {
  etudiant.getEtudiantById()
}

function genererReleve() {
  directeur.isReleve = true
  directeur.getFirst()
}

function close() {
  show.showListeNotesEtudiant = false
  etudiant.isshowNotes = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showListeNotesEtudiant">
      <div
        :class="
          theme.theme === 'light'
            ? 'bg-white w-[80%] p-2 pl-5 pb-5 rounded-lg'
            : ' w-[80%] p-2 pl-5 pb-5 rounded-lg !bg-gray-600 !text-white'
        "
      >
        <div class="text-right">
          <button type="button" @click="close()">
            <XMarkIcon
              :class="theme.theme === 'light' ? '' : '!text-red-500'"
              class="h-6 w-6 text-gray-500"
            />
          </button>
        </div>
        <h1 class="font-bold text-center">LISTE DES NOTES :</h1>
        <div
          class="max-h-[30vh] overflow-y-auto"
          v-for="(etd, index) in etudiant.listNoteParSemestre"
          :key="index"
        >
          <h1 class="font-bold mt-1">{{ etd.nom_semestre }}</h1>
          <div class="flex list-none mt-2 text-sm">
            <li class="w-[20%] border text-center font-bold py-1">Unité d'enseignement</li>
            <li class="w-[20%] border text-center font-bold py-1">Element Constitutif</li>
            <li class="w-[10%] border text-center font-bold py-1">Notes</li>
            <li class="w-[10%] border text-center font-bold py-1">Crédit</li>
            <li class="w-[10%] border text-center font-bold py-1">Moy UE</li>
            <li class="w-[20%] border text-center font-bold py-1">Décision</li>
          </div>
          <div v-for="(etud, index) in etd.ues" :key="etud.id">
            <div class="flex list-none text-xs">
              <li class="w-[20%] border flex items-center justify-center">{{ etud.nom_ue }}</li>
              <div class="w-[20%]">
                <div
                  v-for="(etuds, index) in etud.ecs"
                  :key="etuds.id"
                  class="w-full border text-center py-1"
                >
                  <li>{{ etuds.nom_ec }}</li>
                </div>
              </div>
              <div class="w-[10%]">
                <div
                  v-for="(etuds, index) in etud.ecs"
                  :key="etuds.id"
                  class="w-full border text-center py-1"
                >
                  <li>{{ etuds.noteEc }}</li>
                </div>
              </div>
              <li class="w-[10%] border flex items-center justify-center">{{ etud.credit }}</li>
              <li class="w-[10%] border flex items-center justify-center">{{ etud.moyenne_ue }}</li>
              <li
                v-if="etud.moyenne_ue >= 10"
                class="w-[20%] border flex items-center justify-center"
              >
                Validée
              </li>
              <li
                v-if="
                  etud.moyenne_ue < 10 &&
                  etudiant.moyenneGen >= 10 &&
                  etudiant.isElimination === false
                "
                class="w-[20%] border flex items-center justify-center"
              >
                Validée par compensation
              </li>
              <li
                v-if="
                  (etud.moyenne_ue < 10 && etudiant.isElimination === true) ||
                  (etud.moyenne_ue < 10 && etudiant.moyenneGen < 10)
                "
                class="w-[20%] border flex items-center text-red-500 font-bold justify-center"
              >
                Non validé
              </li>
            </div>
          </div>
        </div>
        <div class="mt-2 flex justify-between items-end">
          <div>
            <p class="text-sm"><b>Moyenne générale : </b>{{ etudiant.moyenneGen }} /20</p>
            <div class="text-sm flex">
              <b class="mr-1">Mention : </b>
              <p class="font-bold" v-if="etudiant.moyenneGen >= 16">Très Bien</p>
              <p
                class="font-bold"
                v-else-if="etudiant.moyenneGen >= 14 && etudiant.moyenneGen < 16"
              >
                Bien
              </p>
              <p
                class="font-bold"
                v-else-if="etudiant.moyenneGen >= 12 && etudiant.moyenneGen < 14"
              >
                Assez-bien
              </p>
              <p
                class="font-bold"
                v-else-if="etudiant.moyenneGen >= 10 && etudiant.moyenneGen < 12"
              >
                Passable
              </p>

              <p class="text-red-500 font-bold" v-if="etudiant.moyenneGen < 10">Redoublement</p>
            </div>
            <div class="text-sm flex">
              <b class="mr-1">Observation : </b>
              <p
                v-if="
                  etudiant.moyenneGen >= 10 &&
                  etudiant.isElimination === false &&
                  etudiant.isCompensation === false
                "
              >
                Admins
              </p>
              <p v-if="etudiant.moyenneGen >= 10 && etudiant.isElimination === true">
                Redoublement
              </p>
              <p class="text-red-500 font-bold" v-if="etudiant.moyenneGen < 10">Redoublement</p>
              <p
                v-if="
                  etudiant.moyenneGen >= 10 &&
                  etudiant.isCompensation === true &&
                  etudiant.isElimination === false
                "
              >
                Admins par compensation
              </p>
            </div>
          </div>
          <div class="flex items-end ">
            <p class="mr-2 font-bold">Note éliminatoire :</p>
            <input
              type="text"
              @input="handleNoteElim"
              v-model="etudiant.noteElim"
              class="block rounded-sm border-0 py-1 text-center w-20 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <button
          v-if="etudiant.moyenneGen"
          @click="genererReleve"
          class="bg-blue-400 flex gap-2 rounded text-white text-xs px-5 py-2 mt-3 cursoir-pointer"
        >
        <SparklesIcon
                class="text-yellow-400 h-4 w-4"
            /> Génerer un relevé des notes
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
