import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUe } from '@/stores/Ue'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import axios from 'axios'
import { useUrl } from '@/stores/url'

export const useEc = defineStore('Ec', () => {
  const ue = useUe()
  const show = useShow()
  const messages = useMessages()
  const URL = useUrl().url

  const nom_ec = ref('')
  const nomEC = ref('')
  const id = ref(null)
  const volume_et = ref(null)
  const volume_ed = ref(null)
  const volume_tp = ref(null)
  const ListeEC = ref([])

  function getAllECBySemestre() {
    axios
      .get(`${URL}/api/ec/getById/${ue.id}`)
      .then((response) => {
        ListeEC.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function deleteEC() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/ec/${id.value}`)
      .then((response) => {
        getAllECBySemestre()
        messages.messageSucces = 'EC supprimé !'
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

  function createEC() {
    show.showSpinner = true
    let formData = {
      nom_ec: nom_ec.value,
      volume_ed: volume_ed.value,
      volume_et: volume_et.value,
      volume_tp: volume_tp.value,
      ue_id: ue.id
    }
    axios
      .post(`${URL}/api/ec`, formData)
      .then((response) => {
        if (response.data.message === 'EC déjà existante !') {
          messages.messageError = response.data.message
          show.showSpinner = false
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          nom_ec.value = ''
          volume_ed.value = null
          volume_et.value = null
          volume_tp.value = null
          messages.messageSucces = 'EC créé  !'
          getAllECBySemestre()
          show.showSpinner = false
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

  return {
    volume_et,
    volume_ed,
    nom_ec,
    volume_tp,
    ListeEC,
    nomEC,
    id,
    createEC,
    getAllECBySemestre,
    deleteEC
  }
})
