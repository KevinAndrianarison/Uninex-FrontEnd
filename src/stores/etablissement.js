import { defineStore } from 'pinia'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useDirecteur } from '@/stores/Directeur'
import { useAu } from '@/stores/Au'
import { useUser } from '@/stores/User'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEtablissement = defineStore('Etablissement', () => {
  const user = useUser()
  const URL = useUrl().url
  const directeur = useDirecteur()
  const au = useAu()
  const show = useShow()

  const nom_etab = ref('')
  const slogan_etab = ref('')
  const descri_etab = ref('')
  const abr_etab = ref('')
  const logo_etab = ref(null)
  const dateCreation_etab = ref('')
  const pays_etab = ref('')
  const ville_etab = ref('')
  const etablissement_id = ref(1)
  const codePostal_etab = ref(null)
  const email_etab = ref('')
  const etablissement = reactive({
    nom_etab: '',
    slogan_etab: '',
    descri_etab: '',
    abr_etab: '',
    nomlogo_etab: '',
    dateCreation_etab: ''
  })

  function createfirstConfig() {
    show.showSpinner = true
    const formDataEtab = {
      nom_etab: nom_etab.value,
      slogan_etab: slogan_etab.value,
      descri_etab: descri_etab.value,
      abr_etab: abr_etab.value,
      email_etab: email_etab.value,
      codePostal_etab: codePostal_etab.value,
      ville_etab: ville_etab.value,
      pays_etab: pays_etab.value,
      logo_etab: logo_etab.value,
      dateCreation_etab: dateCreation_etab.value.split('-').reverse().join('-')
    }

    const formDataUserDir = {
      status_user: 'Directeur',
      validiter_compte: true,
      email: user.email,
      password: user.password,
      photo: user.photo
    }

    const createEtab = axios.post(`${URL}/api/etablissement`, formDataEtab, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const createUserDir = axios.post(`${URL}/api/user/register`, formDataUserDir, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    Promise.all([createEtab, createUserDir])
      .then((response) => {
        const [responseFirst, responseSecond] = response
        show.showSpinner = false
        if (responseFirst.data) {
          show.showSpinner = true
          const formDataAu = {
            annee_debut: au.annee_debut,
            annee_fin: au.annee_fin,
            etablissement_id: responseFirst.data.id
          }
          axios
            .post(`${URL}/api/au`, formDataAu, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              au.annee_debut = null
              au.annee_fin = null
              show.showSpinner = false
            })
            .catch((error) => {
              console.error('Erreur du POST AU : ', error)
              show.showSpinner = false
            })
        }
        if (responseSecond.data) {
          show.showSpinner = true
          const formDataDir = {
            nomComplet_dir: directeur.nomComplet_dir,
            grade_dir: directeur.grade_dir,
            telephone_dir: directeur.telephone_dir,
            user_id: responseSecond.data.id
          }
          axios
            .post(`${URL}/api/directeur`, formDataDir, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              directeur.nomComplet_dir = ''
              directeur.telephone_dir = null
              show.showSpinner = false
            })
            .catch((error) => {
              console.error('Erreur du POST Directeur : ', error)
              show.showSpinner = false
            })
        }
        nom_etab.value = ''
        slogan_etab.value = ''
        descri_etab.value = ''
        abr_etab.value = ''
        pays_etab.value = ''
        ville_etab.value = ''
        codePostal_etab.value = null
        email_etab.value = ''
        logo_etab.value = null
        dateCreation_etab.value = ''
        user.email = ''
        user.password = ''
        user.passwordVerifier = ''
        user.photo = null
        show.showFirstConfig = false
        show.showLogin = true
      })
      .catch((error) => {
        console.error('Erreur:', error)
        show.showSpinner = false
      })
  }

  function getEtab() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/etablissement/${etablissement_id.value}`)
      .then((response) => {
        etablissement.nom_etab = response.data.nom_etab
        etablissement.slogan_etab = response.data.slogan_etab
        etablissement.descri_etab = response.data.descri_etab
        etablissement.dateCreation_etab = response.data.dateCreation_etab
        etablissement.abr_etab = response.data.abr_etab
        etablissement.email_etab = response.data.email_etab
        etablissement.codePostal_etab = response.data.codePostal_etab
        etablissement.ville_etab = response.data.ville_etab
        etablissement.pays_etab = response.data.pays_etab
        etablissement.nomlogo_etab = response.data.logo_name
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    nom_etab,
    slogan_etab,
    descri_etab,
    abr_etab,
    logo_etab,
    dateCreation_etab,
    etablissement_id,
    etablissement,
    pays_etab,
    ville_etab,
    codePostal_etab,
    email_etab,
    createfirstConfig,
    getEtab
  }
})
