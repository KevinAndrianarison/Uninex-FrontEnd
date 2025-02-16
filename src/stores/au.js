import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useEtablissement } from '@/stores/Etablissement'
import { useNiveau } from '@/stores/Niveau'
import { useMessages } from '@/stores/messages'
import { useMention } from '@/stores/Mention'
import { useUe } from '@/stores/Ue'
import { useEc } from '@/stores/Ec'
import { useEdt } from '@/stores/Edt'
import { useTransaction } from '@/stores/Transaction'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { useEtudiant } from '@/stores/Etudiant'

import axios from 'axios'

export const useAu = defineStore('Au', () => {
  const transaction = useTransaction()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const etablissement = useEtablissement()
  const niveau = useNiveau()
  const mention = useMention()
  const ue = useUe()
  const ec = useEc()
  const edt = useEdt()
  const parcour = useParcour()
  const semestre = useSemestre()
  const etudiant = useEtudiant()

  const annee_debut = ref(null)
  const annee_fin = ref(null)
  const oneAU = ref('')
  const nomAUDelib = ref('')
  const nomAUDelibRed = ref('')
  const oneAUSelectEDT = ref('')
  const oneAUSelectFind = ref('')
  const idAU = ref(null)
  const idAUEDT = ref(null)
  const idAUDelibRed = ref(null)
  const listeAU = ref([])
  const listeAUDelib = ref([])
  const listeAUDelibRed = ref([])
  const idAUDelib = ref(null)
  const montant_releve = ref(0)
  const montant_certificatScol = ref(0)
  const idDroit = ref(null)

  function getallAU() {
    axios
      .get(`${URL}/api/au`)
      .then((response) => {
        montant_releve.value = response.data[0].montant_releve
        montant_certificatScol.value = response.data[0].montant_certificatScol
        idDroit.value = response.data[0].id
        idAUEDT.value = response.data[0].id
        idAU.value = response.data[0].id
        listeAU.value = response.data
        listeAUDelib.value = response.data
        listeAUDelibRed.value = response.data
        idAUDelib.value = response.data[0].id
        idAUDelibRed.value = response.data[0].id
        nomAUDelib.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
        nomAUDelibRed.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
        oneAU.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
        oneAUSelectEDT.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
        oneAUSelectFind.value = listeAU.value[0].annee_debut + '-' + listeAU.value[0].annee_fin
      })
      .catch((err) => {
        console.error(err)
      })
  }

  watch(oneAUSelectFind, (newValue, oldValue) => {
    if (newValue) {
      edt.getByIdAU()
    }
  })

  watch(oneAU, (newValue, oldValue) => {
    if (newValue) {
      mention.mentionParcours.nom = ''
      ShowIdAU()
      if (show.showNavBarEtud === false) {
        niveau.getByAuId()
      }
      const userString = localStorage.getItem('user')
      const users = JSON.parse(userString)
      if (users.chefMention_status === '1') {
        ec.ListeEC = []
        ue.ListeueBysemestre = []
        mention.ListMentionByEns = []
        mention.nom_mention = ''
        mention.getMentionByRespId()
      }
      if (users.user.status_user === 'ENS') {
        ec.getAllECByEns()
      }
      if (show.showNavBarSECPAL || show.showNavBarDir) {
        transaction.getByIdAU()
      }
      if (show.showNavBarAdmin) {
        etudiant.getEtudiantByIdAu()
      }

      if (show.showNavBarRespParcours) {
        parcour.nomByEns = ''
        parcour.getParcoursByIdEns(idAU.value)
      }

      niveau.NiveauChecked = []
    }
  })

  watch(nomAUDelib, (newValue, oldValue) => {
    if (newValue) {
      if (show.showNavBarRespParcours) {
        niveau.ListNiveauDelib = []
        parcour.ListParcoursDelib = []
        semestre.ListeSemestreDelib = []
        semestre.semestreIdDelib = []
        niveau.getByAuIdDelib()
      }
    }
  })

  watch(nomAUDelibRed, (newValue, oldValue) => {
    if (newValue) {
      if (show.showNavBarRespParcours) {
        niveau.ListNiveauDelibRed = []
        parcour.ListParcoursDelibRed = []
        semestre.ListeSemestreDelibRed = []
        semestre.semestreIdDelibRed = []
        niveau.getByAuIdDelibRed()
      }
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
      etablissement_id: etablissement.etablissement_id,
      montant_releve: montant_releve.value,
      montant_certificatScol: montant_certificatScol.value
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
    oneAUSelectEDT,
    oneAUSelectFind,
    idAUEDT,
    listeAUDelib,
    idAUDelib,
    nomAUDelib,
    listeAUDelibRed,
    montant_releve,
    nomAUDelibRed,
    montant_certificatScol,
    idAUDelibRed,
    idDroit,
    createAU,
    getallAU,
    ShowIdAU,
    deleteAU
  }
})
