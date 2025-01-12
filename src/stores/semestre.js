import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useParcour } from '@/stores/Parcour'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useEtudiant } from '@/stores/Etudiant'
import { useUe } from '@/stores/Ue'
import { useEc } from '@/stores/Ec'

export const useSemestre = defineStore('Semestre', () => {
  const nom_semestre = ref('')
  const semestreNom = ref('')
  const semestreNomEDT = ref('')
  const semestreNomDelib = ref('')
  const semestreId = ref('')
  const semestreIdEDT = ref('')
  const semestreIdDelib = ref('')
  const semestreIds = ref([])
  const ListeSemestreEDT = ref([])
  const ListeSemestre = ref([])
  const ListeSemestreDelib = ref([])
  const semestre = reactive({
    nom: '',
    id: ''
  })

  const etudiant = useEtudiant()
  const ue = useUe()
  const ec = useEc()
  const parcour = useParcour()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()

  watch(semestreNom, (newValue, oldValue) => {
    if (newValue) {
      ue.ListeueBysemestre = []
      ue.nomUE = ''
      ec.ListeEC = []
      ec.ecNom = ''
      etudiant.getAllEtudiantBysemestre()
      ue.getUeByIdsemstre()
      ec.getBySemestre()
    }
  })

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
        console.error(error)
        show.showSpinner = false
      })
  }

  function getSemestreByParcour() {
    axios
      .get(`${URL}/api/semestre/getById/${parcour.parcours_id}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeSemestre.value = response.data
          semestreIds.value = response.data.map((val) => {
            return val.id
          })
          semestreNom.value = ListeSemestre.value[0].nom_semestre
          semestreId.value = ListeSemestre.value[0].id
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getSemestreByParcourEDT() {
    axios
      .get(`${URL}/api/semestre/getById/${parcour.parcours_id}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeSemestreEDT.value = response.data
          semestreNomEDT.value = ListeSemestreEDT.value[0].nom_semestre
          semestreIdEDT.value = ListeSemestreEDT.value[0].id
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getSemestreByDelib() {
    axios
      .get(`${URL}/api/semestre/getById/${parcour.parcours_idDelib}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeSemestreDelib.value = response.data
          semestreNomDelib.value = ListeSemestreDelib.value[0].nom_semestre
          semestreIdDelib.value = ListeSemestreDelib.value.map((val) => {
            return val.id
          })
        }
      })
      .catch((error) => {
        console.error(error)
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

  function getSemestreByEtudiantId() {
    const userString = localStorage.getItem('user')
    const users = JSON.parse(userString)
    axios
      .get(`${URL}/api/semestre/getSemestreByEtudiantId/${users.id}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeSemestre.value = response.data
          semestreIds.value = response.data.map((val) => {
            return val.id
          })
          semestreNom.value = ListeSemestre.value[0].nom_semestre
          semestreId.value = ListeSemestre.value[0].id
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    nom_semestre,
    ListeSemestre,
    semestre,
    semestreNom,
    semestreIds,
    semestreId,
    semestreIdEDT,
    semestreNomEDT,
    ListeSemestreEDT,
    ListeSemestreDelib,
    semestreNomDelib,
    semestreIdDelib,
    postSemestre,
    getSemestreByParcour,
    deleteSemestre,
    getSemestreByEtudiantId,
    getSemestreByParcourEDT,
    getSemestreByDelib
  }
})
