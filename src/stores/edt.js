import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useAu } from '@/stores/Au'

export const useEdt = defineStore('Edt', () => {
  const listJour = ref([])
  const listEDT = ref([])
  const idEDT = ref([])
  const listHeures = ref([])
  const jour = ref('')
  const idjour = ref(null)
  const heures = ref('')
  const idheures = ref(null)

  const URL = useUrl().url
  const au = useAu()

  function getAllJours() {
    axios
      .get(`${URL}/api/jours`)
      .then((response) => {
        listJour.value = response.data
        jour.value = response.data[0].nom
        idjour.value = response.data[0].id
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
          listHeures.value = response.data
          heures.value = response.data[0].valeur
          idheures.value = response.data[0].id
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getByIdAU() {
    axios
      .get(`${URL}/api/grpedtGetByAU/${au.idAU}`)
      .then((response) => {
        if (response.data.length !== 0) {
          listEDT.value = response.data
          console.log(response.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAll() {
    axios
      .get(`${URL}/api/grpedt`)
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data)
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
    idjour,
    heures,
    idheures,
    listEDT,
    idEDT,
    getAll,
    getAllJours,
    getByIdAU,
    getAllHeures
  }
})
