import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useEtablissement } from '@/stores/Etablissement'
import { useNiveau } from '@/stores/Niveau'
import { useMessages } from '@/stores/messages'
import { useMention } from '@/stores/Mention'
import axios from 'axios'

export const useAu = defineStore('Au', () => {
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const etablissement = useEtablissement()
  const niveau = useNiveau()
  const mention = useMention()

  const annee_debut = ref(null)
  const annee_fin = ref(null)
  const oneAU = ref('')
  const idAU = ref(null)
  const listeAU = ref([])

  function getallAU() {
    axios
      .get(`${URL}/api/au`)
      .then((response) => {
        listeAU.value = response.data
        oneAU.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
      })
      .catch((err) => {
        console.error(err)
      })
  }

  watch(oneAU, (newValue, oldValue) => {
    if (newValue) {
      ShowIdAU()
      niveau.getByAuId()
      const userString = localStorage.getItem('user')
      const users = JSON.parse(userString)
      if (users.chefMention_status === '1') {
        mention.ListMentionByEns = []
        mention.nom_mention = ""
        mention.getMentionByRespId()
      }

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
        window.location.reload()
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
