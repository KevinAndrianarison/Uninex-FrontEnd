import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useEtablissement } from '@/stores/Etablissement'
import { useNiveau } from '@/stores/Niveau'
import { useMention } from '@/stores/Mention'
import { useMessages } from '@/stores/messages'

import axios from 'axios'

export const useAu = defineStore('Au', () => {
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const etablissement = useEtablissement()
  const niveau = useNiveau()

  const annee_debut = ref(null)
  const annee_fin = ref(null)
  const oneAU = ref('')
  const idAU = ref(null)
  const listeAU = ref([])

  function getallAU() {
    // oneAU.value = '' //Choix 1 mandeha tsara
    show.showSpinner = true
    axios
      .get(`${URL}/api/au`)
      .then((response) => {
        listeAU.value = response.data
        oneAU.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  watch(oneAU, (newValue, oldValue) => {
    if (newValue) {
      ShowIdAU()
      niveau.getByAuId()
      niveau.NiveauChecked = []
    }
  })

  function ShowIdAU() {
    let indexAU = listeAU.value
      .map((list) => {
        return list.annee_debut
      })
      .indexOf(Number(oneAU.value.split('-')[0]))
    idAU.value = listeAU.value[indexAU].id
  }

  function createAU() {
    show.showSpinner = true
    const formDataAu = {
      annee_debut: annee_debut.value,
      annee_fin: annee_fin.value,
      etablissement_id: etablissement.etablissement_id
    }
    axios
      .post(`${URL}/api/au`, formDataAu, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        annee_debut.value = null
        annee_fin.value = null
        messages.messageSucces = 'AU créé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showSpinner = false
        getallAU()
        show.showCreateAU = false
      })
      .catch((error) => {
        console.error('Erreur du POST AU : ', error.response.data.message)
        messages.messageError = error.response.data.message
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)
        show.showSpinner = false
      })
  }

  function deleteAU() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/au/${idAU.value}`)
      .then((response) => {
        // niveau.getByAuId() //Choix 1 mandeha tsara
        window.location.reload() //Choix 2
        messages.messageSucces = 'AU supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showSpinner = false
        getallAU()
        show.showDeleteAU = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }
  return {
    annee_debut,
    annee_fin,
    listeAU,
    oneAU,
    idAU,
    createAU,
    getallAU,
    ShowIdAU,
    deleteAU
  }
})
