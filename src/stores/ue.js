import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSemestre } from '@/stores/Semestre'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useUe = defineStore('Ue', () => {
  const nom_ue = ref('')
  const credit_ue = ref(null)
  const id = ref('')
  const ListeueBysemestre = ref([])
  const nomUE = ref('')

  const semestre = useSemestre()
  const messages = useMessages()
  const show = useShow()
  const URL = useUrl().url

  function createUE() {
    let formData = {
      nom_ue: nom_ue.value,
      credit_ue: credit_ue.value,
      semestre_id: semestre.semestreId
    }
    show.showSpinner = true
    axios
      .post(`${URL}/api/ue`, formData)
      .then((response) => {
        if (response.data.message === 'UE déjà existante !') {
          messages.messageError = response.data.message
          show.showSpinner = false
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          nom_ue.value = ''
          credit_ue.value = null
          messages.messageSucces = 'UE créé  !'
          show.showSpinner = false
          getUeByIdsemstre()
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function getUeByIdsemstre() {
    axios
      .get(`${URL}/api/ue/getById/${semestre.semestreId}`)
      .then((response) => {
        ListeueBysemestre.value = response.data
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function deleteUE() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/ue/${id.value}`)
      .then((response) => {
        getUeByIdsemstre()
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    nom_ue,
    credit_ue,
    ListeueBysemestre,
    id,
    nomUE,
    createUE,
    deleteUE,
    getUeByIdsemstre
  }
})