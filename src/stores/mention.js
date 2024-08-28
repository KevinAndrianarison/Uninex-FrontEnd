import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useNiveau } from '@/stores/Niveau'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'

export const useMention = defineStore('Mention', () => {
  const niveau = useNiveau()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()

  const nom_mention = ref('')
  const mentionParcours = reactive({
    nom: '',
    id: null
  })
  const abr_mention = ref('')
  const ListMention = ref('')
  const mention = reactive({
    nom_mention: '',
    abr_mention: '',
    id_mention: null
  })

  function postMentionByNiveau() {
    show.showSpinner = true
    const formDataMention = {
      nom_mention: nom_mention.value,
      abr_mention: abr_mention.value,
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
        console.error('Erreur du POST Mention : ', error)
        show.showSpinner = false
      })
  }

  function getByAuId() {
    ListMention.value = []
    mentionParcours.nom = ""
    mentionParcours.id = null
    show.showSpinner = true
    axios
      .get(`${URL}/api/mention/getById/${niveau.niveau.id_niveau}`)
      .then((response) => {
        ListMention.value = response.data
        mentionParcours.nom = ListMention.value[0].nom_mention
        mentionParcours.id = ListMention.value[0].id
        show.showSpinner = false
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Mention : ', error)
        show.showSpinner = false
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
        show.showDeleteAU = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    nom_mention,
    abr_mention,
    ListMention,
    mention,
    mentionParcours,
    postMentionByNiveau,
    getByAuId,
    deleteMention
  }
})
