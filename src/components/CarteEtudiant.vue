<template>
  <div class="body">
    <div class="element flex flex-col items-center" ref="elementToPrint">
      <div class="border w-[90%] bg-yellow-200 flex">
        <div class="border w-[50%]">
          <div class="p-2 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <div class="logo bg-blue-100 w-[50px] h-[50px] mr-2"></div>
              <div class="text-center font-bold">
                <h1>UNIVERSITE {{ etablissement.ville_etab }}</h1>
                <h1>{{ etablissement.nom_etab }}</h1>
              </div>
            </div>
            <h1 class="text-center text-xs font-bold mt-5">CARTE D'ACCES BIBLIOTHEQUE</h1>
            <div class="flex justify-evenly mt-5">
              <p class="text-xs"><b>Année :</b> {{ au.oneAU }}</p>
              <p class="text-xs"><b>N° :</b> 2021/024/STIC3</p>
            </div>
          </div>
          <div class="p-2 flex justify-between">
            <div class="border border-2 border-black w-[200px] h-[200px]"></div>
            <canvas ref="QrCanvas"></canvas>
          </div>
        </div>
        <div class="border w-[50%] text-xs p-2">
          <p><b>Nom complet :</b> {{ etudiant.nomComplet_etud }}</p>
          <p class="mt-2"><b>N° CIN :</b> {{ etudiant.CIN_etud }}</p>
          <p class="mt-2"><b>du :</b> ..... <b class="ml-5">à :</b> .....</p>
          <p class="mt-2"><b>Duplicata du :</b> ..... <b class="ml-5">à :</b> .....</p>
          <p class="mt-2"><b>Mention :</b> STIC</p>
          <p class="mt-2"><b>Parcours :</b> STIC</p>
          <p class="mt-2"><b>Niveau :</b> L1</p>
          <p class="mt-2"><b>Adresse :</b> {{ etudiant.adresse_etud }}</p>
          <div class="mt-5 px-10 flex justify-between">
            <p class="font-bold">Le bibliothécaire</p>
            <p class="font-bold">L'étudiant</p>
          </div>
        </div>
      </div>
      <div class="border w-[90%] bg-yellow-200 flex">
        <div class="border w-[50%]">
          <div class="p-2 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <div class="logo bg-blue-100 w-[50px] h-[50px] mr-2"></div>
              <div class="text-center font-bold">
                <h1>UNIVERSITE {{ etablissement.ville_etab }}</h1>
                <h1>{{ etablissement.nom_etab }}</h1>
              </div>
            </div>
            <h1 class="text-center text-xs font-bold mt-5">CARTE D'ETUDIANT</h1>
            <div class="flex justify-evenly mt-5">
              <p class="text-xs"><b>Année :</b> {{ au.oneAU }}</p>
              <p class="text-xs"><b>N° :</b> 2021/024/STIC3</p>
            </div>
          </div>
          <div class="p-2 flex justify-between">
            <div class="border border-2 border-black w-[200px] h-[200px]"></div>
            <canvas ref="qrCanvas"></canvas>
          </div>
        </div>
        <div class="border w-[50%] text-xs p-2">
          <p><b>Numéro d'inscription :</b> 2021/20/STIC3</p>
          <p class="mt-2"><b>Nom complet :</b> {{ etudiant.nomComplet_etud }}</p>
          <p class="mt-2"><b>Né(e) le :</b> {{ etudiant.date_naissance_etud }}</p>
          <p class="mt-2"><b>à :</b> {{ etudiant.lieux_naissance_etud }}</p>
          <p class="mt-2"><b>Mention :</b> STIC</p>
          <p class="mt-2"><b>Parcours :</b> STIC</p>
          <p class="mt-2"><b>Niveau :</b> L1</p>
          <p class="mt-2"><b>Adresse :</b> {{ etudiant.adresse_etud }}</p>
          <div class="mt-5 px-10 flex justify-between">
            <p class="font-bold">
              Le Directeur de l'{{ etablissement.abr_etab }} {{ etablissement.ville_etab }}
            </p>
            <p class="font-bold">L'étudiant</p>
          </div>
          <p class="mt-16 font-bold pl-10">ANDRIANARISON Steeve</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import { useEtablissement } from '@/stores/Etablissement'
import { useAu } from '@/stores/Au'
import { useEtudiant } from '@/stores/Etudiant'
import QRCode from 'qrcode'

const elementToPrint = ref(null)
const formattedDate = ref('')
const htmltopdf = useHtml2pdf()
const etablissement = useEtablissement()
const etudiant = useEtudiant()
const au = useAu()
const qrCanvas = ref(null)
const QrCanvas = ref(null)

const personInfo = ref({
  nom: '',
  matricule: null
})

// onMounted(() => {
//   const date = new Date(Date.now())
//   formattedDate.value = date.toLocaleDateString('fr-FR', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric'
//   })
//   htmltopdf.setElement(elementToPrint.value)
//   htmltopdf.downloadPDF()
// })

function generateQRCode() {
  personInfo.nom = etudiant.objectEtud.nom
  personInfo.matricule = etudiant.objectEtud.matricule

  if (qrCanvas.value) {
    const stringifiedData = JSON.stringify(personInfo.value)
    QRCode.toCanvas(qrCanvas.value, stringifiedData, {
      width: 200,
      margin: 1
    })
  }
  if (QrCanvas.value) {
    const stringifiedData = JSON.stringify(personInfo.value)
    QRCode.toCanvas(QrCanvas.value, stringifiedData, {
      width: 200,
      margin: 1
    })
  }

  htmltopdf.setElement(elementToPrint.value)
  htmltopdf.downloadCarte()
}

watch(personInfo, generateQRCode, { deep: true })

onMounted(() => {
  generateQRCode()
})
</script>

<style scoped>
.element {
  background-color: white;
  height: 100vh;
}
</style>
