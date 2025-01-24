<template>
  <div :class="theme.theme === 'light' ? '' : ' !bg-gray-600 !text-white'">
    <p v-if="etudiant.listNote.length !== 0">
      <font-awesome-icon class="mr-2 cursor-pointer" :icon="['fas', 'list-check']" />Liste de mes
      notes pour cette année universitaire
      <b v-if="etudiant.listNote.length !== 0"
        >{{ etudiant.listNote[0].au.annee_debut }} - {{ etudiant.listNote[0].au.annee_fin }}</b
      >
    </p>
    <div
      :class="theme.theme === 'light' ? '' : '!bg-gray-600 !border-gray-400'"
      class="border-2 rounded bg-white h-[80vh] mt-2"
    >
      <div
        :class="theme.theme === 'light' ? '' : '!border-b-gray-400'"
        class="flex list-none text-sm p-2 border-b-2"
      >
        <li class="w-[30%] font-bold">Nom EC</li>
        <li class="w-[30%] font-bold">Nom UE</li>
        <li class="w-[20%] font-bold">Semestre</li>
        <li class="w-[10%] font-bold">Status</li>
        <li class="w-[10%] font-bold text-center">Note / 20</li>
      </div>
      <div
        :key="etd.id"
        v-for="(etd, index) in etudiant.listNote"
        class="max-h-[70vh] overflow-y-auto"
      >
        <div
          :class="theme.theme === 'light' ? '' : '!border-b-gray-400'"
          class="flex list-none text-xs p-1 border-b-2 px-2"
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
      <div class="Empty h-full" v-if="etudiant.listNote.length === 0">
          <div class="gif"></div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useEtudiant } from '@/stores/Etudiant'
import { onBeforeMount } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/stores/Theme'

const etudiant = useEtudiant()
const theme = useTheme()

onBeforeMount(() => {
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  if (users.user.status_user === 'Etudiant') {
    etudiant.id_etud = users.id
    etudiant.getEtudiantById()
  }
})
</script>

<style scoped src="../../styles/GestionAgentScol.css"></style>
