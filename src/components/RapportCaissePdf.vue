<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl" ref="elementToPrint">
      <div class="text-center mb-6">
        <h2 class="text-lg font-bold text-gray-800">Rapport de Caisse</h2>
        <p class="text-sm text-gray-600">Année Universitaire :
          <span class="font-semibold">{{ transaction.listTrans[0].au.annee_debut }} - {{ transaction.listTrans[0].au.annee_fin }}</span>
        </p>
        <p class="text-sm font-medium bg-gray-200 p-2 rounded-md mt-2 pb-4">Aujourd'hui le {{ formattedDate }}</p>
        </div>
      
      <table class="w-full border-collapse border border-gray-300 text-sm shadow-sm">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="border border-gray-300 p-2 pb-4">Catégorie</th>
            <th class="border border-gray-300 p-2 pb-4">Type</th>
            <th class="border border-gray-300 p-2 pb-4">Montant (Ar)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="depense in transaction.listDepense" :key="depense.id" class="bg-red-50">
            <td class="border border-gray-300 p-2 pb-4">{{ depense.categorie }}</td>
            <td class="border border-gray-300 p-2 text-red-600 pb-4">Dépense</td>
            <td class="border border-gray-300 p-2 pb-4">{{ depense.montant }}</td>
          </tr>
          <tr v-for="recette in transaction.listRecette" :key="recette.id" class="bg-green-50">
            <td class="border border-gray-300 p-2 pb-4">{{ recette.categorie }}</td>
            <td class="border border-gray-300 p-2 text-green-600 pb-4">Recette</td>
            <td class="border border-gray-300 p-2 pb-4">{{ recette.montant }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-200 font-semibold">
            <td class="border border-gray-300 p-2 text-center pb-4" colspan="2">Total (Ar)</td>
            <td class="border border-gray-300 p-2 pb-4">{{ transaction.totalMontant }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import { useShow } from '@/stores/Show'
import { useTransaction } from '@/stores/Transaction'

const elementToPrint = ref(null)
const formattedDate = ref('')
const htmltopdf = useHtml2pdf()
const show = useShow()
const transaction = useTransaction()

onMounted(() => {
  const date = new Date(Date.now())
  formattedDate.value = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  setTimeout(() => {
    htmltopdf.setElement(elementToPrint.value)
    htmltopdf.downloadRapportCaisse()
    show.showCaissepdf = false
  }, 100)
})
</script>

<style scoped>
th, td {
  text-align: center;
}
</style>
