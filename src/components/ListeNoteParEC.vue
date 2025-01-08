<template>
  <div class="body">
    <div class="element" ref="elementToPrint">
      <div class="head">
        <div class="content">
          <h1>{{ etablissement.etablissement.nom_etab }}</h1>
          <p>email : {{ etablissement.etablissement.email_etab }}</p>
          <p>
            BP.O {{ etablissement.etablissement.codePostal_etab }} -
            {{ etablissement.etablissement.ville_etab }} -
            {{ etablissement.etablissement.pays_etab }}
          </p>
        </div>
      </div>
      <div class="heads">
        <div class="contents">
          <h1>ANNEE UNIVERSITAIRE {{ au.oneAU }}</h1>
          <h1>MENTION {{ mention.mentionParcours.nom }}</h1>
          <h1>{{ parcour.parcours_nom }} ({{ parcour.parcours_abr }})</h1>
        </div>
      </div>
      <p class="mb-2 sousTitre">
        Note des étudiants <b>{{ parcour.parcours_abr }}</b
        >-<b>{{ semestre.semestreNom }}</b> pour la matière <b>{{ ec.ecNomBySemestre }}</b>
      </p>
      <div class="list">
        <div class="headerListe">
          <li class="numberTitre">N°</li>
          <li class="nomTitre">Nom et prénoms</li>
          <li class="numberTitre">Note</li>
        </div>
        <div :key="index" v-for="(etd, index) in ec.ListeEtudByEC.etudiants">
          <div class="hearContent">
            <li class="numberValue">{{ index + 1 }}</li>
            <li class="nomValue">{{ etd.nomComplet_etud }}</li>
            <li class="numberValue">{{ etd.noteEc }}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import { useSemestre } from '@/stores/Semestre'
import { useAu } from '@/stores/Au'
import { useMention } from '@/stores/Mention'
import { useParcour } from '@/stores/Parcour'
import { useEtablissement } from '@/stores/Etablissement'
import { useEc } from '@/stores/Ec'
import { useShow } from '@/stores/Show'
import { useDirecteur } from '@/stores/Directeur'



const elementToPrint = ref(null)
const htmltopdf = useHtml2pdf()
const semestre = useSemestre()
const au = useAu()
const ec = useEc()
const show = useShow()
const directeur = useDirecteur()
const mention = useMention()
const parcour = useParcour()
const etablissement = useEtablissement()

onMounted(() => {
  directeur.isListeNote = false
  htmltopdf.setElement(elementToPrint.value)
  htmltopdf.downloadNote()
  show.showListeNoteEtudiantPdf = false
})
</script>

<style scoped src="../styles/ListeEtudiantPdf.css"></style>
