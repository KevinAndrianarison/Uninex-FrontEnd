import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'

export const useSalle = defineStore('Salle', () => {
  const listSalle = ref([])
  const idSalle = ref(null)
  const NomSalle = ref('')

  const URL = useUrl().url

  function getallSalle() {
    axios
      .get(`${URL}/api/salle`)
      .then((response) => {
        listSalle.value = response.data
        NomSalle.value = response.data[0].nom_salle
        idSalle.value = response.data[0].id
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listSalle,
    NomSalle,
    idSalle,
    getallSalle
  }
})
