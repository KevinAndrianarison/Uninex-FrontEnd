import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import axios from 'axios'

export const useAnnonce = defineStore('Annonce', () => {
  const listAnnonce = ref([])
  const listAnnonceTemp = ref([])
  const idAnnonce = ref(null)
  const isSveletron = ref(true)
  const searchalue = ref('')
  const URL = useUrl().url
  const show = useShow()

  function getAllAnnonce() {
    axios
      .get(`${URL}/api/annonce`)
      .then((response) => {
        console.log(response.data);
        isSveletron.value = false
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
      })
      .catch((err) => {
        isSveletron.value = false
        console.error(err)
      })
  }

  function getAnnonceByIdCategorie(id) {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    isSveletron.value = true
    axios
      .get(`${URL}/api/annonces/categorie/${id}`, { params: { user_id: user.user.id } })
      .then((response) => {
        isSveletron.value = false
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
        show.showSpinner = false
      })
      .catch((err) => {
        isSveletron.value = false
        console.error(err)
      })
  }

  function getAnnonceByIdUser(id) {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    isSveletron.value = true
    axios
      .get(`${URL}/api/annonces/user/${id}`, { params: { user_id: user.user.id } })
      .then((response) => {
        listAnnonce.value = response.data.reverse()
        listAnnonceTemp.value = response.data
        isSveletron.value = false
      })
      .catch((err) => {
        console.error(err)
        isSveletron.value = false
      })
  }

  function search(valeur) {
    isSveletron.value = true
    if (!valeur) {
      getAllAnnonce()
    } else {
      listAnnonce.value = listAnnonceTemp.value
      listAnnonce.value = listAnnonce.value.filter((list) => {
        return list.titre.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
      isSveletron.value = false
    }
  }

  return {
    listAnnonce,
    idAnnonce,
    searchalue,
    isSveletron,
    getAllAnnonce,
    getAnnonceByIdUser,
    getAnnonceByIdCategorie,
    search
  }
})
