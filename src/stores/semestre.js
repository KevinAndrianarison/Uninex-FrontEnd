import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useParcour } from '@/stores/Parcour'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'

export const useSemestre = defineStore('Semestre', () => {
  const nom_semestre = ref('')
  const semestreNom = ref('')
  const semestreIds = ref([])
  const ListeSemestre = ref([])
  const semestre = reactive({
    nom: '',
    id: ''
  })

  const parcour = useParcour()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()

  function postSemestre() {
    show.showSpinner = true
    let formData = {
      nom_semestre: nom_semestre.value,
      parcour_id: parcour.parcours_id
    }

    axios
      .post(`${URL}/api/semestre`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data.message === 'Semestre déjà existante !') {
          messages.messageError = response.data.message
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          getSemestreByParcour()
          messages.messageSucces = 'Semestre créé  !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
        }
        nom_semestre.value = ''
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du POST Semestre : ', error)
        show.showSpinner = false
      })
  }

  function getSemestreByParcour() {
    semestreNom.value = ''
    show.showSpinner = true
    axios
      .get(`${URL}/api/semestre/getById/${parcour.parcours_id}`)
      .then((response) => {
        ListeSemestre.value = response.data
        semestreIds.value = response.data.map((val) => {
          return val.id
        })        
        semestreNom.value = ListeSemestre.value[0].nom_semestre
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Parcours : ', error)
        show.showSpinner = false
      })
  }

  function deleteSemestre() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/semestre/${semestre.id}`)
      .then((response) => {
        messages.messageSucces = 'Semestre supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showDeleteSemestre = false
        show.showSpinner = false
        getSemestreByParcour()
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    nom_semestre,
    ListeSemestre,
    semestre,
    semestreNom,
    semestreIds,
    postSemestre,
    getSemestreByParcour,
    deleteSemestre
  }
})
