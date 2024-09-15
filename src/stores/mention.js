import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { useNiveau } from '@/stores/Niveau'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useEnseignant } from '@/stores/Enseignant'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { useAu } from '@/stores/Au'
import { useUe } from '@/stores/Ue'

export const useMention = defineStore('Mention', () => {
  const niveau = useNiveau()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const enseignant = useEnseignant()
  const parcour = useParcour()
  const semestre = useSemestre()
  const au = useAu()
  const ue = useUe()

  const nom_mention = ref('')
  const mention_id = ref(null)
  const mentionParcours = reactive({
    nom: '',
    id: null
  })
  const abr_mention = ref('')
  const abreviation = ref('')
  const ListMention = ref('')
  const ListMentionByEns = ref('')
  const mention = reactive({
    nom_mention: '',
    abr_mention: '',
    id_mention: null
  })

  watch(mention_id, (newValue, oldValue) => {
    if (newValue) {
      semestre.semestreNom = ''
      parcour.parcours_nom = ''
      ue.nomUE = ''
      ue.ListeueBysemestre = []
      semestre.ListeSemestre = []
      parcour.ListParcours = []
      parcour.getByMentionId()
    }
  })

  function postMentionByNiveau() {
    show.showSpinner = true
    const formDataMention = {
      nom_mention: nom_mention.value,
      abr_mention: abr_mention.value,
      au_id: au.idAU,
      niveau_ids: niveau.NiveauChecked
    }

    axios
      .post(`${URL}/api/mention`, formDataMention, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data.message === 'Mention déjà existante !') {
          messages.messageError = response.data.message
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        }
        if (response.data.message === 'Mention créé !') {
          getByAuId()
          messages.messageSucces = 'Mention créé  !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
        }

        nom_mention.value = ''
        abr_mention.value = ''
        niveau.NiveauChecked = []
        show.showSpinner = false
      })
      .catch((error) => {
        console.error(error)
        show.showSpinner = false
      })
  }

  function getByAuId() {
    mentionParcours.nom = ''
    mentionParcours.id = null
    axios
      .get(`${URL}/api/mention/getById/${niveau.niveau.id_niveau}`)
      .then((response) => {
        ListMention.value = response.data
        mentionParcours.nom = ListMention.value[0].nom_mention
        mentionParcours.id = ListMention.value[0].id
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function deleteMention() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/mention/${mention.id_mention}`)
      .then((response) => {
        messages.messageSucces = 'Mention supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        show.showDeleteMention = false
        show.showSpinner = false
        getByAuId()
        parcour.getByNiveauId()
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function addRespMention() {
    let formData = {
      enseignant_id: enseignant.idTop
    }
    show.showSpinner = true
    axios
      .put(`${URL}/api/mention/${mentionParcours.id}`, formData)
      .then((response) => {
        let formDatasetEns = {
          chefMention_status: true
        }
        if (response.data.message === 'Un enseignant est déjà associé à cette mention !') {
          messages.messageError = response.data.message
          show.showSpinner = false
          setTimeout(() => {
            messages.messageError = ''
          }, 3000)
        } else {
          axios
            .put(`${URL}/api/enseignant/${enseignant.idTop}`, formDatasetEns)
            .then((response) => {
              messages.messageSucces = 'Chef de mention ajouté !'
              setTimeout(() => {
                messages.messageSucces = ''
              }, 3000)
              show.showSpinner = false
              getByAuId()
            })
            .catch((err) => {
              console.error(err)
              show.showSpinner = false
            })
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function clearEnseignantId() {
    show.showSpinner = true

    axios
      .put(`${URL}/api/mentions/${mentionParcours.id}/clearEnseignant`)
      .then((response) => {
        if (response.data.message === "L'enseignant a été dissocié avec succès !") {
          let formDatasetEns = {
            chefMention_status: false
          }
          axios
            .put(`${URL}/api/enseignant/${enseignant.idTop}`, formDatasetEns)
            .then((response) => {
              messages.messageSucces = "L'enseignant a été dissocié avec succès !"
              show.showSpinner = false

              setTimeout(() => {
                messages.messageSucces = ''
              }, 3000)
              getByAuId()
            })
            .catch((err) => {
              console.error(err)
              show.showSpinner = false
            })
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function getMentionByRespId() {
    nom_mention.value = ''
    parcour.parcours_nom = ''
    ue.nomUE = ''
    semestre.semestreNom = ''
    abreviation.value = ''
    const userString = localStorage.getItem('user')
    const users = JSON.parse(userString)
    axios
      .get(`${URL}/api/mention/getByEnsId/${users.id}/${au.idAU}`)
      .then((response) => {
        ListMentionByEns.value = response.data
        nom_mention.value = response.data[0].nom_mention
        mention_id.value = response.data[0].id
        abreviation.value = response.data[0].abr_mention
        semestre.semestreNom = ''
        parcour.parcours_nom = ''
        semestre.ListeSemestre = []
        parcour.ListParcours = []
        parcour.getByMentionId()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    nom_mention,
    abr_mention,
    ListMention,
    mention,
    mentionParcours,
    mention_id,
    ListMentionByEns,
    abr_mention,
    abreviation,
    postMentionByNiveau,
    clearEnseignantId,
    getByAuId,
    getMentionByRespId,
    deleteMention,
    addRespMention
  }
})
