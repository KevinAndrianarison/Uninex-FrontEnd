<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl" ref="elementToPrint">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Facture</h2>
          <p class="text-sm text-gray-600">N° : {{ transaction.listTrans[transaction.listTrans.length - 1].id + 1 }}</p>
        </div>
        <div class="text-right text-sm text-gray-600">
          <p>Aujourd'hui le {{ formattedDate }}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 text-sm border-b pb-4 mb-4">
        <div>
          <p class="font-bold">{{ transaction.oneFacture.au.etablissement.nom_etab }}</p>
          <p>Année universitaire : {{ transaction.oneFacture.au.annee_debut }} - {{ transaction.oneFacture.au.annee_fin }}</p>
          <p>{{ transaction.oneFacture.au.etablissement.codePostal_etab }} - {{ transaction.oneFacture.au.etablissement.ville_etab }}, {{ transaction.oneFacture.au.etablissement.pays_etab }}</p>
          <p>{{ transaction.oneFacture.au.etablissement.email_etab }}</p>
        </div>
        <div class="text-right">
          <p>{{ transaction.oneFacture.user.agentscolarite[0].nomComplet_scol }}</p>
          <p>{{ transaction.oneFacture.user.agentscolarite[0].telephone_scol }}</p>
          <p>{{ transaction.oneFacture.user.email }}</p>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="font-bold text-gray-800 text-sm">{{ transaction.oneFacture.categorie }}</p>
        <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ transaction.oneFacture.description }}</p>
      </div>
      
      <div class="border rounded-lg p-4 pb-8 text-lg font-semibold text-gray-800 bg-gray-100 text-center">
        Montant : <span class="text-green-600">Ar {{ transaction.oneFacture.montant }}</span>
      </div>
      
      <div class="flex justify-end mt-6 text-sm text-gray-600">
        <div class="text-center">
          <p>Fait à {{ transaction.oneFacture.au.etablissement.ville_etab }}, le {{ transaction.oneFacture.date }}</p>
          <p class="mt-10 font-bold">Le responsable, {{ user.nomComplet_scol }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHtml2pdf } from '@/stores/Html2pdf'
import { useShow } from '@/stores/Show'
import { useTransaction } from '@/stores/Transaction'

const userString = localStorage.getItem('user')
const user = JSON.parse(userString)
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
    htmltopdf.downloadFacture()
    show.showFacturepdf = false
  }, 100)
})
</script>

<style scoped>
th, td {
  text-align: center;
}
</style>
