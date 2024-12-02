<template>
  <div class="body">
    <div class="element pl-10" ref="elementToPrint">
      <p class="font-bold text-xs mt-10">
        UNIVERSITE D'{{ etablissemnet.etablissement.ville_etab }}
      </p>
      <p class="font-bold text-xs">{{ etablissemnet.etablissement.nom_etab }}</p>
      <p class="font-bold text-xs">Année universitaire : {{ edt.AUedt }}</p>
      <p class="font-bold text-xs">PARCOURS : {{ edt.parcoursEdt }}</p>
      <p class="font-bold text-xs">{{ edt.SemestreEdt }}</p>
      <div class="max-h-[70vh] overflow-y-auto">
        <div class="flex list-none text-center mt-2 font-bold">
          <div v-for="jour in edt.oneEDT" class="mt-5" :key="edt.id">
            <li class="w-[150px] border font-bold pb-2">{{ jour.jour }}</li>
            <div class="border text-xs pb-2" v-for="seance in jour.seances" :key="seance.horaire">
              <p class="bg-gray-200 pb-2">{{ seance.horaire }}</p>
              <div class="py-2">
                <div class="font-bold">{{ seance.matiere }}</div>
                <div>{{ seance.enseignant }}</div>
                <div>{{ seance.salle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-2 text-xs sousTitre">
        Fait à {{ etablissemnet.etablissement.ville_etab }}, {{ formattedDate }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import { useEdt } from '@/stores/Edt'
import { useEtablissement } from '@/stores/Etablissement'
import { useShow } from '@/stores/Show'

const elementToPrint = ref(null)
const formattedDate = ref('')
const htmltopdf = useHtml2pdf()
const edt = useEdt()
const etablissemnet = useEtablissement()
const show = useShow()

onMounted(() => {
  const date = new Date(Date.now())
  formattedDate.value = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  setTimeout(() => {
    htmltopdf.setElement(elementToPrint.value)
    htmltopdf.downloadEDT()
    show.showEDTpdf = false
  }, 100)
})
</script>

<style scoped src="../styles/ListeEtudiantPdf.css"></style>
