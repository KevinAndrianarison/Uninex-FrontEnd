import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useEc } from '@/stores/Ec'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/Show'
import axios from 'axios'
import Notiflix from 'notiflix'


export const useCours = defineStore('Cours', () => {
  const nom_cours = ref('')
  const description_cours = ref('')
  const categorie_cours = ref('')
  const cours = ref('')
  const fileName = ref('')
  const ListeCours = ref([])

  const ec = useEc()
  const URL = useUrl().url
  const show = useShow()
  const messages = useMessages()

  function publierCours() {
    let formData = new FormData()
    formData.append('cours', cours.value || '')
    formData.append('nom_cours', nom_cours.value || '')
    formData.append('description_cours', description_cours.value || '')
    formData.append('categorie_cours', categorie_cours.value || '')
    formData.append('ec_id', ec.idEC || '')
    if (cours.value) {
      show.showSpinner = true
      axios
        .post(`${URL}/api/cours`, formData)
        .then((response) => {
          messages.messageSucces = 'Cours publié !'
          nom_cours.value = ''
          description_cours.value = ''
          show.showSpinner = false
          getAllCours()
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
        })
        .catch((err) => {
          console.error(err)
          show.showSpinner = false
        })
      cours.value = null
      fileName.value = ''
    }
    else{
    Notiflix.Notify.warning('Le cours est requis !')
    }
  }

  function getAllCours() {
    ListeCours.value = []
    axios
      .get(`${URL}/api/cours/getByIdEC/${ec.idEC}`)
      .then((response) => {
        ListeCours.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function deleteCours(id) {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/cours/${id}`)
      .then((response) => {
        getAllCours()
        messages.messageSucces = 'Cours supprimé !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    categorie_cours,
    nom_cours,
    description_cours,
    cours,
    ListeCours,
    fileName,
    deleteCours,
    publierCours,
    getAllCours
  }
})
