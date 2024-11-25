<template>
  <div class="body">
    <div class="element" ref="elementToPrint">
      <div class="flex justify-center items-center mt-2">
        <div class="w-[100px] h-[100px] logoEtab mr-10"></div>
        <div>
          <h1 class="text-center text-xs">
            UNIVERSITE {{ etablissement.etablissement.ville_etab }}
          </h1>
          <p class="text-xs text-center">***************</p>
          <h1 class="text-center text-xs">{{ etablissement.etablissement.nom_etab }}</h1>
          <p class="text-xs text-center">***************</p>
          <h1 class="text-center text-xs">
            {{ mention.mentionParcours.nom }} - {{ parcour.parcours_abr }}
          </h1>
          <p class="text-xs text-center">***************</p>
          <h1 class="text-center text-xs">Année universitaire {{ au.oneAU }}</h1>
          <p class="text-xs text-center">***************</p>
        </div>
      </div>
      <h1 class="mt-5 text-sm text-center">RELEVE DE NOTES</h1>
      <div class="pl-10">
        <p class="text-sm">
          De Madame/ Monsieur : <b>{{ etudiant.nomComplet_etud }}</b>
        </p>
        <p class="text-sm">
          Date et lieu de naissance :
          <b>{{ etudiant.date_naissance_etud }} à {{ etudiant.lieux_naissance_etud }}</b>
        </p>
      </div>
      <div class="pl-10 mt-5" v-for="(etd, index) in etudiant.listNoteParSemestre" :key="index">
        <h1 class="font-bold mt-1">{{ etd.nom_semestre }}</h1>
        <div class="flex list-none mt-2">
          <li class="w-[20%] border text-center font-bold pb-2 text-sm">Unité d'enseignement</li>
          <li class="w-[20%] border text-center font-bold pb-2 text-sm">Element Constitutif</li>
          <li class="w-[10%] border text-center font-bold pb-2 text-sm">Notes</li>
          <li class="w-[10%] border text-center font-bold pb-2 text-sm">Crédit</li>
          <li class="w-[10%] border text-center font-bold pb-2 text-sm">Moy UE</li>
          <li class="w-[20%] border text-center font-bold pb-2 text-sm">Décision</li>
        </div>
        <div v-for="(etud, index) in etd.ues" :key="etud.id">
          <div class="flex list-none text-xs">
            <li class="w-[20%] border flex items-center justify-center">{{ etud.nom_ue }}</li>
            <div class="w-[20%]">
              <div
                v-for="(etuds, index) in etud.ecs"
                :key="etuds.id"
                class="w-full border text-center pb-2 text-sm"
              >
                <li>{{ etuds.nom_ec }}</li>
              </div>
            </div>
            <div class="w-[10%]">
              <div
                v-for="(etuds, index) in etud.ecs"
                :key="etuds.id"
                class="w-full border text-center pb-2 text-sm"
              >
                <li>{{ etuds.noteEc }}</li>
              </div>
            </div>
            <li class="w-[10%] border flex items-center justify-center pb-2">{{ etud.credit }}</li>
            <li class="w-[10%] border flex items-center justify-center pb-2">
              {{ etud.moyenne_ue }}
            </li>
            <li
              v-if="etud.moyenne_ue >= 10"
              class="w-[20%] border flex items-center justify-center pb-2"
            >
              Validée
            </li>
            <li
              v-if="
                etud.moyenne_ue < 10 &&
                etudiant.moyenneGen >= 10 &&
                etudiant.isElimination === false
              "
              class="w-[20%] border flex items-center justify-center pb-2"
            >
              Validée par compensation
            </li>
            <li
              v-if="
                (etud.moyenne_ue < 10 && etudiant.isElimination === true) ||
                (etud.moyenne_ue < 10 && etudiant.moyenneGen < 10)
              "
              class="w-[20%] border flex items-center justify-center pb-2"
            >
              Non validé
            </li>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center mt-5">
        <p class="font-bold text-sm">Moyenne Générale : {{ etudiant.moyenneGen }} /20</p>
        <div class="flex">
          <b class="mr-1 text-sm">Mention : </b>
          <p class="font-bold text-sm" v-if="etudiant.moyenneGen >= 16">Très Bien</p>
          <p
            class="font-bold text-sm"
            v-else-if="etudiant.moyenneGen >= 14 && etudiant.moyenneGen < 16"
          >
            Bien
          </p>
          <p
            class="font-bold text-sm"
            v-else-if="etudiant.moyenneGen >= 12 && etudiant.moyenneGen < 14"
          >
            Assez-bien
          </p>
          <p
            class="font-bold text-sm"
            v-else-if="etudiant.moyenneGen >= 10 && etudiant.moyenneGen < 12"
          >
            Passable
          </p>

          <p class="font-bold text-sm" v-if="etudiant.moyenneGen < 10">Redoublement</p>
        </div>
        <div class="flex">
          <b class="mr-1 text-sm">Observation : </b>
          <p
            class="text-sm"
            v-if="
              etudiant.moyenneGen >= 10 &&
              etudiant.isElimination === false &&
              etudiant.isCompensation === false
            "
          >
            Admins
          </p>
          <p class="text-sm" v-if="etudiant.moyenneGen >= 10 && etudiant.isElimination === true">
            Redoublement
          </p>
          <p class="text-sm" v-if="etudiant.moyenneGen < 10">Redoublement</p>
          <p
            class="text-sm"
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

      <p class="mt-2 sousTitre font-bold">
        {{ etablissement.etablissement.ville_etab }} le : {{ formattedDate }}
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
  htmltopdf.downloadReleve()
  directeur.isReleve = false
})
</script>

<style scoped src="../styles/ListeEtudiantPdf.css"></style>
