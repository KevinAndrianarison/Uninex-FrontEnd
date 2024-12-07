<template>
  <div class="body">
    <div class="element px-20 bg-white" ref="elementToPrint">
      <div class="mt-10 img"></div>
      <b class="mt-4 pb-1 text-lg"
        >Facture N° : {{ transaction.listTrans[transaction.listTrans.length - 1].id + 1 }}</b
      >

      <div class="mt-2 px-1 pb-3 flex justify-between border border-black">
        <div class="w-[300px] text-xs">
          <b>{{ transaction.oneFacture.au.etablissement.nom_etab }}</b>
          <p>
            Année universitaire : {{ transaction.oneFacture.au.annee_debut }} -
            {{ transaction.oneFacture.au.annee_fin }}
          </p>
          <p>
            {{ transaction.oneFacture.au.etablissement.codePostal_etab }}
            - {{ transaction.oneFacture.au.etablissement.ville_etab }} -
            {{ transaction.oneFacture.au.etablissement.pays_etab }}
          </p>
          <!-- <p>032 52 819 36</p> -->
          <p>{{ transaction.oneFacture.au.etablissement.email_etab }}</p>
        </div>
        <div class="w-[300px] text-xs">
          <p>{{ transaction.oneFacture.user.agentscolarite[0].nomComplet_scol }}</p>
          <p>{{ transaction.oneFacture.user.agentscolarite[0].telephone_scol }}</p>
          <p>{{ transaction.oneFacture.user.email }}</p>
        </div>
      </div>
      <p class="font-bold text-sm pb-2 px-1">{{ transaction.oneFacture.categorie }}</p>
      <div class=" px-2 pb-4 whitespace-pre-line text-xs">
        - {{ transaction.oneFacture.description }}
      </div>
      <div class="border border-black text-xs pb-3 px-1">
        Montant : <b class="text-sm">Ar {{ transaction.oneFacture.montant }}</b>
      </div>
      <div class="flex justify-end mt-2 text-xs">
        <div>
          <p class="text-center">
            Fait a {{ transaction.oneFacture.au.etablissement.ville_etab }}, le
            {{ transaction.oneFacture.date }}
          </p>
          <p class="text-center mt-10 pb-2">Le responsable, {{ user.nomComplet_scol }}</p>
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
const htmltopdf = useHtml2pdf()
const show = useShow()
const transaction = useTransaction()

onMounted(() => {
  setTimeout(() => {
    htmltopdf.setElement(elementToPrint.value)
    htmltopdf.downloadFacture()
    show.showFacturepdf = false
  }, 100)
})
</script>

<style scoped>
.img {
  height: 85px;
  width: 100px;
  background-image: url('../assets/logo_espa-removebg-preview.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
