import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useNiveau } from '@/stores/Niveau'
import { useMention } from '@/stores/Mention'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useShow } from '@/stores/Show'
import { useSemestre } from '@/stores/Semestre'
import { useEnseignant } from '@/stores/Enseignant'

export const useParcour = defineStore('Parcour', () => {
  const nom_parcours = ref('')
  const parcours_id = ref(null)
  const parcours_abr = ref('')
  const parcours_nom = ref('')
  const abr_parcours = ref('')
  const mention_id = ref(null)
  const ListParcours = ref([])

  const niveau = useNiveau()
  const mention = useMention()
  const semestre = useSemestre()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const enseignant = useEnseignant()

  watch(parcours_nom, (newValue, oldValue) => {
    if (newValue) {
      semestre.getSemestreByParcour()
    }
  })

  function postParcour() {
    show.showSpinner = true
    let formData = {
      nom_parcours: nom_parcours.value,
      abr_parcours: abr_parcours.value + '-' + niveau.NiveauCheck.abr_niveau,
      mention_id: mention.mentionParcours.id,
      niveau_id: niveau.NiveauCheck.id
    }
    axios
      .post(`${URL}/api/parcours`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        getByNiveauId()
        if (response.data.message === 'Parcours déjà existant !') {
          messages.messageError = response.data.message
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          messages.messageSucces = 'Parcours créé  !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
        }
        nom_parcours.value = ''
        abr_parcours.value = ''
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du POST Parcours : ', error)
        show.showSpinner = false
      })
  }

  function getByNiveauId() {
    parcours_nom.value = ''
    parcours_id.value = null
    show.showSpinner = true
    axios
      .get(`${URL}/api/parcours/getById/${niveau.niveau.id_niveau}`)
      .then((response) => {
        ListParcours.value = response.data
        parcours_nom.value = ListParcours.value[0].nom_parcours
        parcours_id.value = ListParcours.value[0].id
        parcours_abr.value = ListParcours.value[0].abr_parcours
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Parcours : ', error)
        show.showSpinner = false
      })
  }

  function deleteParcours() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/parcours/${parcours_id.value}`)
      .then((response) => {
        messages.messageSucces = 'Parcours supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showDeleteParcour = false
        show.showSpinner = false
        getByNiveauId()
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function addRespParcours() {
    let formData = {
      enseignant_id: enseignant.idBottom
    }
    show.showSpinner = true
    axios
      .put(`${URL}/api/parcours/${parcours_id.value}`, formData)
      .then((response) => {
        let formDatasetEns = {
          chefParcours_status: true
        }
        axios
          .put(`${URL}/api/enseignant/${enseignant.idBottom}`, formDatasetEns)
          .then((response) => {
            messages.messageSucces = 'Chef de parcours ajouté !'
            setTimeout(() => {
              messages.messageSucces = ''
            }, 3000)
            show.showSpinner = false
            getByNiveauId()
          })
          .catch((err) => {
            console.error(err)
            show.showSpinner = false
          })
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    nom_parcours,
    abr_parcours,
    ListParcours,
    mention_id,
    parcours_id,
    parcours_abr,
    parcours_nom,
    postParcour,
    getByNiveauId,
    addRespParcours,
    deleteParcours
  }
})
