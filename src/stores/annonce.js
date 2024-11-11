import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import axios from 'axios'

export const useAnnonce = defineStore('Annonce', () => {
  const listAnnonce = ref([])
  const listAnnonceTemp = ref([])
  const idAnnonce = ref(null)
  const searchalue = ref('')
  const URL = useUrl().url
  const show = useShow()

  function getAllAnnonce() {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)

    axios
      .get(`${URL}/api/annonce`, { params: { user_id: user.user.id } })
      .then((response) => {
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAnnonceByIdCategorie(id) {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    show.showSpinner = true
    axios
      .get(`${URL}/api/annonces/categorie/${id}`, { params: { user_id: user.user.id } })
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
    search,
  }
})
