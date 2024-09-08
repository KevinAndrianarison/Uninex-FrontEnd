<template>
  <div class="body">
    <div class="element" ref="elementToPrint">
      <div class="head">
        <div
          :style="{
            'background-image':
              'url(' +
              `${URL}/storage/etablissement/${etablissement.etablissement.nomlogo_etab}` +
              ')'
          }"
          class="logoEtab"
        ></div>
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
        Liste des étudiants <b>{{ parcour.parcours_abr }}</b> en <b>{{ semestre.semestreNom }}</b>
      </p>
      <div class="list">
        <div class="headerListe">
          <li class="numberTitre">N°</li>
          <li class="nomTitre">Nom et prénoms</li>
        </div>
        <div :key="index" v-for="(etd, index) in etudiant.listdefinitive">
          <div class="hearContent">
            <li class="numberValue">{{ index + 1 }}</li>
            <li class="nomValue">{{ etd.nomComplet_etud }}</li>
          </div>
        </div>
      </div>
      <p class="mt-5 sousTitre">
        Arrêtée la présente liste à ({{ etudiant.listdefinitive.length }}) étudiants
      </p>
      <p class="mt-2 sousTitre">
        Fait à {{ etablissement.etablissement.ville_etab }}, {{ formattedDate }}
      </p>
      <p class="mt-2 sousTitre">Le Directeur de l'{{ etablissement.etablissement.abr_etab }}</p>

      <p class="mt-20 sousTitre">{{ directeur.grade_dir }} {{ directeur.nomComplet_dir }}</p>
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
import { useEtudiant } from '@/stores/Etudiant'
import { useDirecteur } from '@/stores/Directeur'
import { useUrl } from '@/stores/url'

const elementToPrint = ref(null)
const formattedDate = ref('')
const htmltopdf = useHtml2pdf()
const etudiant = useEtudiant()
const semestre = useSemestre()
const au = useAu()
const mention = useMention()
const URL = useUrl().url
const parcour = useParcour()
const etablissement = useEtablissement()
const directeur = useDirecteur()

onMounted(() => {
  const date = new Date(Date.now())
  formattedDate.value = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  htmltopdf.setElement(elementToPrint.value)
  htmltopdf.downloadPDF()
})
</script>

<style scoped src="../styles/ListeEtudiantPdf.css"></style>
