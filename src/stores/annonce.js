import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import axios from 'axios'

export const useAnnonce = defineStore('Annonce', () => {
  const listAnnonce = ref([])
  const listAnnonceTemp = ref([])
  const idAnnonce = ref(null)
  const searchalue = ref("")
  const URL = useUrl().url
  const show = useShow()

  function getAllAnnonce() {
    axios
      .get(`${URL}/api/annonce`)
      .then((response) => {
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAnnonceByIdCategorie(id) {
    show.showSpinner = true
    axios
      .get(`${URL}/api/annonces/categorie/${id}`)
      .then((response) => {
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function search(valeur) {
    if (!valeur) {
      getAllAnnonce()
    } else {
      listAnnonce.value = listAnnonceTemp.value
      listAnnonce.value = listAnnonce.value.filter((list) => {
        return list.titre.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  return {
    listAnnonce,
    idAnnonce,
    searchalue,
    getAllAnnonce,
    getAnnonceByIdCategorie,
    search
  }
})
