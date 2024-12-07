import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useAu } from '@/stores/Au'

export const useTransaction = defineStore('Transaction', () => {
  const listTrans = ref([])
  const listRecette = ref([])
  const listDepense = ref([])
  const isTrans = ref(false)
  const totalMontant = ref(0)
  const oneFacture = reactive({})

  const URL = useUrl().url
  const au = useAu()

  function getByIdAU() {
    axios
      .get(`${URL}/api/transactionGetByAU/${au.idAU}`)
      .then((response) => {        
        listTrans.value = response.data
        listDepense.value = regrouperParCategorie(response.data).listDepense
        listRecette.value = regrouperParCategorie(response.data).listRecette
        totalMontant.value = calculerSolde(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  function regrouperParCategorie(data) {
    return data.reduce(
      (resultat, item) => {
        const { categorie, montant, type } = item
        const liste = type === 'Dépense' ? resultat.listDepense : resultat.listRecette
        const categorieExistante = liste.find((el) => el.categorie === categorie)

        if (categorieExistante) {
          categorieExistante.montant += montant
        } else {
          liste.push({ categorie, montant })
        }

        return resultat
      },
      { listDepense: [], listRecette: [] }
    )
  }
  function calculerSolde(data) {
    return data.reduce((solde, item) => {
      const montant = item.type === 'Dépense' ? -item.montant : item.montant
      return solde + montant
    }, 0)
  }

  return {
    listTrans,
    listDepense,
    listRecette,
    isTrans,
    totalMontant,
    oneFacture,
    getByIdAU
  }
})
