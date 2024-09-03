import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useAu } from '@/stores/Au'
import { useMention } from '@/stores/Mention'
import { useParcour } from '@/stores/Parcour'
import { useMessages } from '@/stores/messages'
import { useSemestre } from '@/stores/Semestre'
import { useEtudiant } from '@/stores/Etudiant'

export const useNiveau = defineStore('Niveau', () => {
  const show = useShow()
  const URL = useUrl().url
  const au = useAu()
  const messages = useMessages()
  const mention = useMention()
  const parcour = useParcour()
  const semestre = useSemestre()
  const etudiant = useEtudiant()

  const abr_niveau = ref('')
  const nom_niveau = ref('')
  const ListNiveau = ref([])
  const NiveauChecked = ref([])
  const NiveauCheck = ref([])
  const niveau = reactive({
    abr_niveau: '',
    nom_niveau: '',
    id_niveau: null
  })

  watch(NiveauCheck, (newValue, oldValue) => {
    if (newValue) {
      niveau.id_niveau = newValue.id
      niveau.ListMention = []
      parcour.ListParcours = []
      semestre.ListeSemestre = []
      etudiant.ListeEtudiant = []
      semestre.semestreNom = ''
      semestre.idsemestre = null
      show.ShowListEtudiantEmpty = true
      mention.getByAuId()
      parcour.getByNiveauId()
    }
  })

  function createNiveau() {
    show.showSpinner = true
    const formDataNiveau = {
      abr_niveau: abr_niveau.value,
      nom_niveau: nom_niveau.value,
      au_id: au.idAU
    }
    axios
      .post(`${URL}/api/niveau`, formDataNiveau, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        messages.messageSucces = 'Niveau créé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        abr_niveau.value = ''
        nom_niveau.value = ''
        show.showSpinner = false
        getByAuId()
      })
      .catch((error) => {
        console.error('Erreur du POST Niveau : ', error.response.data.message)
        messages.messageError = error.response.data.message
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)
        show.showSpinner = false
      })
  }

  function getByAuId() {
    NiveauCheck.value = []
    show.showSpinner = true
    axios
      .get(`${URL}/api/niveau/getById/${au.idAU}`)
      .then((response) => {
        ListNiveau.value = response.data
        NiveauCheck.value = ListNiveau.value[0]
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Niveau : ', error)
        show.showSpinner = false
      })
  }

  function deleteNiveau() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/niveau/${niveau.id_niveau}`)
      .then((response) => {
        messages.messageSucces = 'Niveau supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showDeleteNiveau = false
        show.showSpinner = false
        getByAuId()
        show.showDeleteAU = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    abr_niveau,
    nom_niveau,
    ListNiveau,
    niveau,
    NiveauChecked,
    NiveauCheck,
    createNiveau,
    getByAuId,
    deleteNiveau
  }
})
