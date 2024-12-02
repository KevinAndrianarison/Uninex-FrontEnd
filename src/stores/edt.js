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
  const AUedt = ref('')
  const SemestreEdt = ref('')
  const parcoursEdt = ref('')
  const idjour = ref(null)
  const heures = ref('')
  const idheures = ref(null)
  const oneEDT = ref([])

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
      .get(`${URL}/api/grpedtGetByAU/${au.idAUEDT}`)
      .then((response) => {
        listEDT.value = response.data
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
    oneEDT,
    AUedt,
    parcoursEdt,
    getAll,
    getAllJours,
    getByIdAU,
    getAllHeures,
    SemestreEdt
  }
})
