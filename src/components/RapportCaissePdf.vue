<template>
  <div class="body">
    <div class="element pl-10 bg-white" ref="elementToPrint">
      <div class="w-[500px] mx-auto">
        <p class="text-xs mt-10">
          Année Universitaire :
          <b
            >{{ transaction.listTrans[0].au.annee_debut }} -
            {{ transaction.listTrans[0].au.annee_fin }}
          </b>
        </p>
        <p class="text-xs mt-5 border border-black p-1 pb-3">Livre de caisse {{ formattedDate }}</p>
        <div class="list-none text-xs flex">
          <li class="border border-black w-[35%] p-1 font-bold pb-3">Catégorie</li>
          <li class="border border-black w-[35%] p-1 font-bold pb-3">Type</li>
          <li class="border border-black w-[30%] p-1 font-bold pb-3">Montant (Ar)</li>
        </div>
        <div
          v-for="depense in transaction.listDepense"
          :key="depense.id"
          class="list-none text-xs flex"
        >
          <li class="border border-black w-[35%] p-1 pb-3">{{ depense.categorie }}</li>
          <li class="border border-black w-[35%] p-1 text-red-500 pb-3">Dépense</li>
          <li class="border border-black w-[30%] p-1 pb-3">{{ depense.montant }}</li>
        </div>
        <div
          v-for="recette in transaction.listRecette"
          :key="recette.id"
          class="list-none text-xs flex"
        >
          <li class="border border-black w-[35%] p-1 pb-3">{{ recette.categorie }}</li>
          <li class="border border-black w-[35%] p-1 text-green-500 pb-3">Recette</li>
          <li class="border border-black w-[30%] p-1 pb-3">{{ recette.montant }}</li>
        </div>
        <div class="list-none text-xs flex">
          <li class="border border-black w-[70%] font-bold p-1 pb-3">Total (Ar)</li>
          <li class="border border-black w-[30%] p-1 pb-3">{{ transaction.totalMontant }}</li>
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

<style scoped></style>
