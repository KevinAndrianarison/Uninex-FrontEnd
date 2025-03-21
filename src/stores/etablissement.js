import { defineStore } from 'pinia'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useDirecteur } from '@/stores/Directeur'
import { useAu } from '@/stores/Au'
import { useUser } from '@/stores/User'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { usePassword } from '@/stores/Password'
import { useAdmin } from '@/stores/Admin'
import { reactive, ref } from 'vue'

export const useEtablissement = defineStore('Etablissement', () => {
  const user = useUser()
  const URL = useUrl().url
  const directeur = useDirecteur()
  const au = useAu()
  const show = useShow()
  const messages = useMessages()
  const password = usePassword()
  const admin = useAdmin()
  const nom_etab = ref('')
  const slogan_etab = ref('')
  const descri_etab = ref('')
  const numero = ref(null)
  const abr_etab = ref('')
  const logo_etab = ref(null)
  const logo_etabName = ref('')
  const dateCreation_etab = ref('')
  const mdpAppGmail_etab = ref('')
  const pays_etab = ref('')
  const ville_etab = ref('')
  const etablissement_id = ref(1)
  const codePostal_etab = ref(null)
  const email_etab = ref('')
  const etablissement = reactive({})

  async function createfirstConfig() {
    try {
      show.showSpinner = true

      const formDataEtab = {
        nom_etab: nom_etab.value,
        slogan_etab: slogan_etab.value,
        descri_etab: descri_etab.value,
        numero: numero.value,
        abr_etab: abr_etab.value,
        email_etab: email_etab.value,
        codePostal_etab: codePostal_etab.value,
        ville_etab: ville_etab.value,
        mdpAppGmail_etab: mdpAppGmail_etab.value,
        pays_etab: pays_etab.value,
        logo_etab: logo_etab.value,
        dateCreation_etab: dateCreation_etab.value
      }
      const formDataUserDir = {
        status_user: 'Directeur',
        validiter_compte: true,
        email: user.emailDir,
        password: password.password
      }
      const formDataUserAdmin = {
        status_user: 'ADMIN',
        validiter_compte: true,
        email: user.email,
        password: user.password,
        photo: user.photo
      }
      const responseEtab = await axios.post(`${URL}/api/etablissement`, formDataEtab, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const formDataAu = {
        annee_debut: au.annee_debut,
        annee_fin: au.annee_fin,
        montant_releve: au.montant_releve,
        montant_certificatScol: au.montant_certificatScol,
        etablissement_id: responseEtab.data.id
      }
      const [responseFirst, responseSecond, responseTrois] = await Promise.all([
        axios.post(`${URL}/api/user/admin`, formDataUserAdmin, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
        axios.post(`${URL}/api/user/directeur`, formDataUserDir, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
        axios.post(`${URL}/api/au`, formDataAu, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      ])
      const formDataAdmin = {
        nomComplet_admin: admin.nomComplet_admin,
        telephone_admin: admin.telephone_admin,
        user_id: responseFirst.data.id
      }
      const formDataDir = {
        nomComplet_dir: directeur.nomComplet_dir,
        grade_dir: directeur.grade_dir,
        user_id: responseSecond.data.id
      }
      await Promise.all([
        axios.post(`${URL}/api/admin`, formDataAdmin, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
        axios.post(`${URL}/api/directeur`, formDataDir, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      ])

      admin.nomComplet_admin = ''
      admin.telephone_admin = null
      directeur.nomComplet_dir = ''
      nom_etab.value = ''
      slogan_etab.value = ''
      descri_etab.value = ''
      numero.value = ''
      abr_etab.value = ''
      pays_etab.value = ''
      ville_etab.value = ''
      codePostal_etab.value = null
      email_etab.value = ''
      mdpAppGmail_etab.value = ''
      logo_etab.value = null
      logo_etabName.value = ''
      dateCreation_etab.value = ''
      user.email = ''
      user.password = ''
      user.passwordVerifier = ''
      user.photo = null
      user.photoName = ''
      user.emailDir = ''
      password.password = ''
      show.showFirstConfig = false
      show.showLogin = true
      show.showSpinner = false
    } catch (error) {
      console.error('Erreur :', error)
      show.showSpinner = false
    }
  }

  function modifierEtabissement() {
    show.showSpinner = true
    let formData = new FormData()

    formData.append('nom_etab', etablissement.nom_etab || '')
    formData.append('slogan_etab', etablissement.slogan_etab || '')
    formData.append('descri_etab', etablissement.descri_etab || '')
    formData.append('abr_etab', etablissement.abr_etab || '')
    formData.append('email_etab', etablissement.email_etab || '')
    formData.append('codePostal_etab', etablissement.codePostal_etab || '')
    formData.append('numero', etablissement.numero || '')
    formData.append('historique', etablissement.historique || '')
    formData.append('ville_etab', etablissement.ville_etab || '')
    formData.append('mdpAppGmail_etab', etablissement.mdpAppGmail_etab || '')
    formData.append('pays_etab', etablissement.pays_etab || '')
    formData.append('dateCreation_etab', etablissement.dateCreation_etab || '')
    formData.append('logo_etab', logo_etab.value || '')
    formData.append('_method', 'PUT')

    axios
      .post(`${URL}/api/etablissement/${etablissement_id.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        messages.messageSucces = 'Modification réussi !'
        logo_etab.value = null
        logo_etabName.value = ''
        show.showSpinner = false
        getEtab()
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        show.showSpinner = false
        console.error(err)
      })
  }

  function getEtab() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/etablissement/${etablissement_id.value}`)
      .then((response) => {
        const userString = localStorage.getItem('user')
        const auth_token = localStorage.getItem('auth_token')
        const user = JSON.parse(userString)

        if (userString) {
          if (user.user.status_user === 'Directeur') {
            show.showNavBarDir = true
          }
          if (user.user.status_user === 'ADMIN') {
            show.showNavBarAdmin = true
          }
          if (user.user.status_user === 'ENS') {
            show.showNavBarEns = true
          }
          if (user.user.status_user === 'AS') {
            show.showNavBarAS = true
          }
          if (user.user.status_user === 'SECPAL') {
            show.showNavBarAS = true
            show.showNavBarSECPAL = true
          }
          if (user.user.status_user === 'Etudiant') {
            show.showNavBarEtud = true
          }
          if (user.chefMention_status === '1') {
            show.showNavBarRespMention = true
          }
          if (user.chefParcours_status === '1') {
            show.showNavBarRespParcours = true
          }
        }
        if (auth_token) {
          show.showLogin = false
          show.showAdmin = true
        }
        if (!auth_token) {
          show.showAdmin = false
          show.showLogin = true
        }
        etablissement.nom_etab = response.data.nom_etab
        etablissement.slogan_etab = response.data.slogan_etab
        mdpAppGmail_etab.value = response.data.mdpAppGmail_etab
        etablissement.descri_etab = response.data.descri_etab
        etablissement.numero = response.data.numero
        etablissement.historique = response.data.historique
        etablissement.dateCreation_etab = response.data.dateCreation_etab
        etablissement.abr_etab = response.data.abr_etab
        etablissement.email_etab = response.data.email_etab
        etablissement.codePostal_etab = response.data.codePostal_etab
        etablissement.ville_etab = response.data.ville_etab
        etablissement.mdpAppGmail_etab = response.data.mdpAppGmail_etab
        etablissement.pays_etab = response.data.pays_etab
        etablissement.nomlogo_etab = response.data.logo_name
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showHome = true
        show.showSpinner = false
      })
  }

  return {
    nom_etab,
    slogan_etab,
    descri_etab,
    numero,
    abr_etab,
    logo_etab,
    dateCreation_etab,
    etablissement_id,
    etablissement,
    pays_etab,
    ville_etab,
    codePostal_etab,
    mdpAppGmail_etab,
    email_etab,
    logo_etabName,
    createfirstConfig,
    getEtab,
    modifierEtabissement
  }
})
