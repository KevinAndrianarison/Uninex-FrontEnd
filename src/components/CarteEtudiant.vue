<template>
  <div class="body">
    <div class="element flex flex-col items-center" ref="elementToPrint">
      <div class="border w-[90%] h-[50%] bg-yellow-200 flex">
        <div class="border w-[50%]">
          <div class="h-[35%] p-2 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <div class="logo bg-blue-100 w-[50px] h-[50px] mr-2"></div>
              <div class="text-center font-bold">
                <h1>UNIVERSITE D'ANTSIRANANA</h1>
                <h1>ECOLE SUPERIEURE POLYTECHNIQUE</h1>
              </div>
            </div>
            <h1 class="text-center text-xs font-bold">CARTE D'ACCES BIBLIOTHEQUE</h1>
            <div class="flex justify-evenly">
              <p class="text-xs"><b>Année :</b> 2022</p>
              <p class="text-xs"><b>N° :</b> 2021/024/STIC3</p>
            </div>
          </div>
          <div class="h-[65%] p-2 flex justify-between">
            <div class="border border-2 border-black w-[45%]"></div>
            <canvas class="w-[45%]" ref="QrCanvas"></canvas>
          </div>
        </div>
        <div class="border w-[50%] text-xs p-2">
          <p><b>Nom complet :</b> ANDRIANARISON Steeve Vevin</p>
          <p class="mt-2"><b>N° CIN :</b> 12345</p>
          <p class="mt-2"><b>du :</b> 12345 <b class="ml-5">à :</b> Toamasina</p>
          <p class="mt-2"><b>Duplicata du :</b> 12345 <b class="ml-5">à :</b> Toamasina</p>
          <p class="mt-2"><b>Mention :</b> STIC</p>
          <p class="mt-2"><b>Parcours :</b> STIC</p>
          <p class="mt-2"><b>Niveau :</b> L1</p>
          <p class="mt-2"><b>Adresse :</b> Lazaret</p>
          <div class="mt-5 px-10 flex justify-between">
            <p class="font-bold">Le bibliothécaire</p>
            <p class="font-bold">L'étudiant</p>
          </div>
        </div>
      </div>
      <div class="border w-[90%] h-[50%] bg-yellow-200 flex">
        <div class="border w-[50%]">
          <div class="h-[35%] p-2 flex flex-col justify-between">
            <div class="flex items-center justify-center">
              <div class="logo bg-blue-100 w-[50px] h-[50px] mr-2"></div>
              <div class="text-center font-bold">
                <h1>UNIVERSITE D'ANTSIRANANA</h1>
                <h1>ECOLE SUPERIEURE POLYTECHNIQUE</h1>
              </div>
            </div>
            <h1 class="text-center text-xs font-bold">CARTE D'ETUDIANT</h1>
            <div class="flex justify-evenly">
              <p class="text-xs"><b>Année :</b> 2022</p>
              <p class="text-xs"><b>N° :</b> 2021/024/STIC3</p>
            </div>
          </div>
          <div class="h-[65%] p-2 flex justify-between">
            <div class="border border-2 border-black w-[45%]"></div>
            <canvas class="w-[45%]" ref="qrCanvas"></canvas>
          </div>
        </div>
        <div class="border w-[50%] text-xs p-2">
          <p><b>Numéro d'inscription :</b> 2021/20/STIC3</p>
          <p class="mt-2"><b>Nom complet :</b> ANDRIANARISON Steeve Vevin</p>
          <p class="mt-2"><b>Né(e) le :</b> 12345</p>
          <p class="mt-2"><b>à :</b> Toamasina</p>
          <p class="mt-2"><b>Mention :</b> STIC</p>
          <p class="mt-2"><b>Parcours :</b> STIC</p>
          <p class="mt-2"><b>Niveau :</b> L1</p>
          <p class="mt-2"><b>Adresse :</b> Lazaret</p>
          <div class="mt-5 px-10 flex justify-between">
            <p class="font-bold">Le Directeur de l'ESP Antsiranana</p>
            <p class="font-bold">L'étudiant</p>
          </div>
          <p class="mt-16 font-bold pl-10">ANDRIANARISON Steeve</p>
        </div>
      </div>

      <!-- <canvas ref="qrCanvas"></canvas> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import QRCode from 'qrcode'

const elementToPrint = ref(null)
const formattedDate = ref('')
const htmltopdf = useHtml2pdf()
const qrCanvas = ref(null)
const QrCanvas = ref(null)

const personInfo = ref({
  name: 'John Doe',
  id: 123456,
  birthdate: '1990-01-01'
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
