<template>
  <div :class="theme.theme === 'light' ? '' : ' !bg-gray-600 !text-white'">
    <div class="flex gap-5">
      <button
        v-for="(etd, index) in etudiant.listCurscusNote"
        class="bg-blue-500 text-xs p-2 text-white rounded border-2 border-blue-500"
      >
        <p>
          {{
            etd.etudiant.matricule_etud.split('/')[
              etd.etudiant.matricule_etud.split('/').length - 1
            ]
          }}
        </p>
        <p>{{ etd.au.annee_debut }}-{{ etd.au.annee_fin }}</p>
      </button>
      <!-- <button class="bg-white text-blue-500 text-xs p-2 rounded border-2 border-blue-500">
        <p>BTP-L1</p>
        <p>2023-2024</p>
      </button> -->
    </div>
    <div
      :class="theme.theme === 'light' ? '' : '!bg-gray-600 !border-gray-400'"
      class="border rounded mt-2"
    >
      <div
        :class="theme.theme === 'light' ? '' : '!border-b-gray-400'"
        class="flex list-none text-xs bg-blue-100 p-2"
      >
        <li class="w-[30%] font-bold">Nom EC</li>
        <li class="w-[30%] font-bold">Nom UE</li>
        <li class="w-[20%] font-bold">Semestre</li>
        <li class="w-[10%] font-bold">Status</li>
        <li class="w-[10%] font-bold text-center">Note / 20</li>
      </div>
      <div class="max-h-[50vh] overflow-y-auto">
        <div :key="etd.id" v-for="(etd, index) in etudiant.listNote">
          <div
            :class="theme.theme === 'light' ? '' : '!border-t-gray-400'"
            class="flex list-none text-xs p-1 border-t px-2"
          >
            <li class="w-[30%]">{{ etd.nom_ec }}</li>
            <li class="w-[30%]">{{ etd.ue.nom_ue }}</li>
            <li class="w-[20%]">{{ etd.ue.semestre.nom_semestre }}</li>
            <li class="w-[10%]">
              <p v-if="etd.pivot.noteEc >= 10" class="flex items-center w-full">
                <CheckBadgeIcon class="text-green-500 h-5 w-5 mr-1" /> Validé
              </p>
              <p v-if="etd.pivot.noteEc < 10" class="flex items-center w-full">
                <font-awesome-icon class="mr-2 text-red-500" :icon="['fas', 'xmark']" /> Non validé
              </p>
            </li>
            <li
              :class="
                etd.pivot.noteEc >= 10
                  ? 'w-[10%] text-center'
                  : 'w-[10%] text-center text-red-500 font-bold'
              "
            >
              {{ etd.pivot.noteEc }}
            </li>
          </div>
        </div>
      </div>

      <div
        v-if="etudiant.listNote.length === 0"
        class="flex items-center justify-center flex-col py-5"
      >
        <div
          class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
        ></div>
        <p class="text-xs font-bold mt-2">Aucune note n'a été trouvée</p>
      </div>
    </div>
    <div class="flex mt-3 gap-2">
      <button class="bg-blue-400 flex gap-2 rounded text-white text-xs px-5 py-2 cursoir-pointer">
        <SparklesIcon class="text-yellow-400 h-4 w-4" /> Génerer un relevé des notes
      </button>
      <button class="bg-green-500 flex gap-2 rounded text-white text-xs px-5 py-2 cursoir-pointer">
        Demander un relevé des notes
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useEtudiant } from '@/stores/Etudiant'
import { useTheme } from '@/stores/Theme'
import { CheckBadgeIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const etudiant = useEtudiant()
const theme = useTheme()

onBeforeMount(() => {
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  if (users.user.status_user === 'Etudiant') {
    etudiant.id_cursus = users.cursu_id
    etudiant.getCursus()
  }
})
</script>

<style scoped></style>
