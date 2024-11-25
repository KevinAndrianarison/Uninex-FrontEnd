import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'

export const useEdt = defineStore('Edt', () => {
  const listJour = ref([])
  const listHeures = ref([])
  const jour = ref('')
  const heures = ref('')

  const URL = useUrl().url

  function getAllJours() {
    axios
      .get(`${URL}/api/jours`)
      .then((response) => {
        listJour.value = response.data
        jour.value = response.data[0].nom
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAllHeures() {
    axios
      .get(`${URL}/api/heure`)
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data)

          listHeures.value = response.data
          heures.value = response.data[0].valeur
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listJour,
    listHeures,
    jour,
    heures,
    getAllJours,
    getAllHeures
  }
})
