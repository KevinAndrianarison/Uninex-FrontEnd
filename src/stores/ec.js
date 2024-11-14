import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useUe } from '@/stores/Ue'
import { useSemestre } from '@/stores/Semestre'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useEnseignant } from '@/stores/Enseignant'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useCours } from '@/stores/Cours'
import { useAu } from '@/stores/Au'

export const useEc = defineStore('Ec', () => {
  const ue = useUe()
  const semestre = useSemestre()
  const show = useShow()
  const au = useAu()
  const cours = useCours()
  const messages = useMessages()
  const enseignant = useEnseignant()
  const URL = useUrl().url

  const nom_ec = ref('')
  const nomEC = ref('')
  const id = ref(null)
  const idEC = ref(null)
  const volume_et = ref(null)
  const volume_ed = ref(null)
  const volume_tp = ref(null)
  const ListeEC = ref([])
  const ListeECByEns = ref([])
  const ecNom = ref('')
  const ecNomByEns = ref('')

  watch(ecNomByEns, (newValue, oldValue) => {
    if (newValue) {
      cours.getAllCours()
    }
  })

  watch(ecNom, (newValue, oldValue) => {
    if (newValue) {
      const userString = localStorage.getItem('user')
      const users = JSON.parse(userString)
      if (users.user.status_user === 'Etudiant') {
        idEC.value = id.value
        cours.getAllCours()
      }
    }
  })

  function getAllECBySemestre() {
    ecNom.value = ''
    axios
      .get(`${URL}/api/ec/getById/${ue.id}`)
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data)
          ListeEC.value = response.data
          id.value = response.data[0].id
          ecNom.value = response.data[0].nom_ec
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getBySemestre() {
    axios
      .get(`${URL}/api/ec/getBySemestre/${semestre.semestreId}`)
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data, "BB")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAllECByEns() {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    ecNomByEns.value = ''
    cours.ListeCours = []
    axios
      .get(`${URL}/api/ec/getByEnsegnantIdAndAU/${user.id}/${au.idAU}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeECByEns.value = response.data
          ecNomByEns.value = response.data[0].nom_ec
          idEC.value = response.data[0].id
        }
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
      ue_id: ue.id,
      au_id: au.idAU
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

  function addRespEC() {
    let formData = {
      enseignant_id: enseignant.idBottom
    }
    show.showSpinner = true
    axios
      .put(`${URL}/api/ec/${id.value}`, formData)
      .then((response) => {
        if (response.data.message === 'Un enseignant est déjà associé à ce EC !') {
          messages.messageError = response.data.message
          show.showSpinner = false
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          messages.messageSucces = 'EC assigné !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
          getAllECBySemestre()
          show.showSpinner = false
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function dissoscierResp(id, ensId) {
    show.showSpinner = true
    axios
      .put(`${URL}/api/ec/${id}/clearEnseignant`)
      .then((response) => {
        if (response.data.message === "L'enseignant a été dissocié avec succès !") {
          messages.messageSucces = response.data.message
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
    ecNom,
    ListeECByEns,
    ecNomByEns,
    idEC,
    createEC,
    getBySemestre,
    getAllECBySemestre,
    deleteEC,
    addRespEC,
    dissoscierResp,
    getAllECByEns
  }
})
