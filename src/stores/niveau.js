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
  const montant = ref('')
  const ListNiveau = ref([])
  const ListNiveauDelib = ref([])
  const ListNiveauDelibRed = ref([])
  const nom_niveauDelib = ref('')
  const nom_niveauDelibRed = ref('')
  const idniveauDelib = ref(null)
  const idniveauDelibRed = ref(null)
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
      etudiant.listdefinitive = []
      parcour.parcours_nom = ''
      semestre.semestreNom = ''
      mention.getByAuId()
      parcour.getByNiveauId()
    }
  })

  watch(idniveauDelib, (newValue, oldValue) => {
    if (newValue) {
      parcour.ListParcoursDelib = []
      semestre.ListeSemestreDelib = []
      semestre.semestreIdDelib = []
      parcour.getByNiveauIdDelib()
    }
  })

  watch(idniveauDelibRed, (newValue, oldValue) => {
    if (newValue) {
      parcour.ListParcoursDelibRed = []
      semestre.ListeSemestreDelibRed = []
      semestre.semestreIdDelibRed = []
      parcour.getByNiveauIdDelibRed()
    }
  })

  function createNiveau() {
    show.showSpinner = true
    const formDataNiveau = {
      abr_niveau: abr_niveau.value,
      nom_niveau: nom_niveau.value,
      montant_droit: montant.value,
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
        montant.value = ''
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
    axios
      .get(`${URL}/api/niveau/getById/${au.idAU}`)
      .then((response) => {
        ListNiveau.value = response.data
        NiveauCheck.value = ListNiveau.value[0]
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Niveau : ', error)
      })
  }

  function getByAuIdDelib() {
    axios
      .get(`${URL}/api/niveau/getById/${au.idAUDelib}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListNiveauDelib.value = response.data
          nom_niveauDelib.value = response.data[0].nom_niveau
          idniveauDelib.value = response.data[0].id
        }
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Niveau : ', error)
      })
  }

  function getByAuIdDelibRed() {
    axios
      .get(`${URL}/api/niveau/getById/${au.idAUDelibRed}`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListNiveauDelibRed.value = response.data
          nom_niveauDelibRed.value = response.data[0].nom_niveau
          idniveauDelibRed.value = response.data[0].id
        }
      })
      .catch((error) => {
        console.error('Erreur du GET BY ID Niveau : ', error)
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
    montant,
    ListNiveauDelib,
    nom_niveauDelib,
    idniveauDelib,
    ListNiveauDelibRed,
    nom_niveauDelibRed,
    idniveauDelibRed,
    createNiveau,
    getByAuIdDelib,
    getByAuIdDelibRed,
    getByAuId,
    deleteNiveau
  }
})
