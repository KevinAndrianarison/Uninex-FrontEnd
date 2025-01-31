import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useUser } from '@/stores/User'
import { useSemestre } from '@/stores/Semestre'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { usePassword } from '@/stores/Password'
import { useInfosheader } from '@/stores/Infosheader'
import { useInfossetup } from '@/stores/Infossetup'
import { useDirecteur } from '@/stores/Directeur'
import { useAu } from '@/stores/Au'
import { useParcour } from '@/stores/Parcour'
import Notiflix from 'notiflix'

export const useEtudiant = defineStore('Etudiant', () => {
  const user = useUser()
  const semestre = useSemestre()
  const show = useShow()
  const parcour = useParcour()
  const au = useAu()
  const URL = useUrl().url
  const messages = useMessages()
  const password = usePassword()
  const infosheader = useInfosheader()
  const infossetup = useInfossetup()
  const directeur = useDirecteur()

  const nomComplet_etud = ref('')
  const matricule_etud = ref('')
  const date_naissance_etud = ref('')
  const lieux_naissance_etud = ref('')
  const nationalite_etud = ref('')
  const nom_pere_etud = ref('')
  const nom_mere_etud = ref('')
  const nom_tuteur = ref('')
  const photoBordereaux_name = ref('')
  const fileName = ref('')
  const adresse_etud = ref('')
  const serieBAC_etud = ref('')
  const sexe_etud = ref('')
  const etabOrigin_etud = ref('')
  const CIN_etud = ref(null)
  const anneeBAC_etud = ref(null)
  const telephone_etud = ref(null)
  const photoBordereaux = ref(null)
  const etudnomComplet = ref('')
  const etudID = ref(null)
  const isCarte = ref(false)
  const isshowNotes = ref(false)
  const isCompensation = ref(false)
  const isElimination = ref(false)
  const id_etud = ref(null)
  const ListeEtudiant = ref([])
  const ListeEtudiantTemp = ref([])
  const ListeEtudiantRH = ref([])
  const ListeEtudiantRHTemp = ref([])
  const ListeEtudiantByExcel = ref([])
  const listdefinitiveTemp = ref([])
  const listdefinitive = ref([])
  const listDeliberation = ref([])
  const statusDeliberation = ref('')
  const listNote = ref([])
  const listNoteParSemestre = ref([])
  const listIdDefinitive = ref([])
  const searchalue = ref('')
  const searchalueRH = ref('')
  const searchalueDef = ref('')
  const moyenneGen = ref('')
  const noteElim = ref(5)

  function bigPostEtudiant() {
    ListeEtudiantByExcel.value.forEach((etud) => {
      show.showSpinner = true
      let formData = {
        email: etud.adresseEmail,
        status_user: 'Etudiant',
        validiter_compte: false
      }
      axios
        .post(`${URL}/api/user/createEtudiant`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          let formDataEtudiant = {
            user_id: response.data.id,
            nomComplet_etud: etud.nomComplet,
            validiter_inscri: false,
            status_etud: 1,
            au_id: au.idAU
          }
          axios
            .post(`${URL}/api/etudiant`, formDataEtudiant, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              let formDataToSemestre = {
                etudiant_id: response.data.id,
                semestre_ids: semestre.semestreIds
              }

              axios
                .post(`${URL}/api/semestres/addEtudiant`, formDataToSemestre, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((response) => {
                  user.email = ''
                  nomComplet_etud.value = ''
                  getAllEtudiantBysemestre()
                  messages.messageSucces = 'Étudiants ajoutés !'
                  show.showSpinner = false
                  setTimeout(() => {
                    messages.messageSucces = ''
                  }, 3000)
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
        })
        .catch((err) => {
          console.error(err)
          show.showSpinner = false
        })
    })
  }

  function createEtudiant() {
    let formData = {
      email: user.email,
      status_user: 'Etudiant',
      validiter_compte: false
    }

    if (nomComplet_etud.value && !show.showMessageErrorEmail && user.email) {
      show.showSpinner = true
      axios
        .post(`${URL}/api/user/createEtudiant`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          let formDataEtudiant = {
            user_id: response.data.id,
            nomComplet_etud: nomComplet_etud.value,
            validiter_inscri: false,
            status_etud: 1,
            au_id: au.idAU
          }
          axios
            .post(`${URL}/api/etudiant`, formDataEtudiant, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              let formDataToSemestre = {
                etudiant_id: response.data.id,
                semestre_ids: semestre.semestreIds
              }

              axios
                .post(`${URL}/api/semestres/addEtudiant`, formDataToSemestre, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((response) => {
                  user.email = ''
                  nomComplet_etud.value = ''
                  getAllEtudiantBysemestre()
                  messages.messageSucces = response.data.message
                  show.showSpinner = false
                  setTimeout(() => {
                    messages.messageSucces = ''
                  }, 3000)
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
        })
        .catch((err) => {
          console.error(err)
          show.showSpinner = false
        })
    } else {
      Notiflix.Notify.warning('"Nom complet" et "Adresse email" doivent être remplis')
    }
  }

  function getAllEtudiantBysemestre() {
    axios
      .get(`${URL}/api/semestres/${semestre.semestreId}/etudiants`)
      .then((response) => {
        let listeAlphabetique = response.data.sort((a, b) =>
          a.nomComplet_etud.localeCompare(b.nomComplet_etud, 'fr', { sensitivity: 'base' })
        )
        listdefinitive.value = listeAlphabetique.filter((list) => list.validiter_inscri === 'true')
        listdefinitiveTemp.value = listeAlphabetique.filter(
          (list) => list.validiter_inscri === 'true'
        )
        listIdDefinitive.value = response.data
          .filter((etud) => etud.validiter_inscri === 'true')
          .map((etud) => etud.id)
        ListeEtudiant.value = listeAlphabetique
        ListeEtudiantTemp.value = listeAlphabetique

        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function search(valeur) {
    if (!valeur) {
      getAllEtudiantBysemestre()
    } else {
      ListeEtudiant.value = ListeEtudiantTemp.value
      ListeEtudiant.value = ListeEtudiant.value.filter((list) => {
        return list.nomComplet_etud.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  function searchRH(valeur) {
    if (!valeur) {
      getEtudiantByIdAu()
    } else {
      ListeEtudiantRH.value = ListeEtudiantRHTemp.value
      ListeEtudiantRH.value = ListeEtudiantRH.value.filter((list) => {
        return list.nomComplet_etud.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  function getEtudiantByIdAu() {
    axios
      .get(`${URL}/api/etudiant/getByAuId/${au.idAU}`)
      .then((response) => {
        ListeEtudiantRH.value = response.data
        ListeEtudiantRHTemp.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getEtudiantById() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/etudiant/${id_etud.value}`)
      .then((response) => {
        listNoteParSemestre.value = response.data.semestres
        response.data.semestres.forEach((ues) => {
          ues.ues.forEach((ue) => {
            if (ue.moyenne_ue < 10) {
              isCompensation.value = true
            }
            ue.ecs.forEach((ec) => {
              if (Number(ec.noteEc) < noteElim.value) {
                isElimination.value = true
              }
            })
          })
        })
        id_etud.value = response.data.etudiant.id
        moyenneGen.value = response.data.moyenne_generale
        listNote.value = response.data.etudiant.ec
        CIN_etud.value = response.data.etudiant.CIN_etud
        adresse_etud.value = response.data.etudiant.adresse_etud
        anneeBAC_etud.value = response.data.etudiant.anneeBAC_etud
        date_naissance_etud.value = response.data.etudiant.date_naissance_etud
        etabOrigin_etud.value = response.data.etudiant.etabOrigin_etud
        lieux_naissance_etud.value = response.data.etudiant.lieux_naissance_etud
        nationalite_etud.value = response.data.etudiant.nationalite_etud
        nomComplet_etud.value = response.data.etudiant.nomComplet_etud
        nom_mere_etud.value = response.data.etudiant.nom_mere_etud
        nom_pere_etud.value = response.data.etudiant.nom_pere_etud
        nom_tuteur.value = response.data.etudiant.nom_tuteur
        serieBAC_etud.value = response.data.etudiant.serieBAC_etud
        telephone_etud.value = response.data.etudiant.telephone_etud
        photoBordereaux_name.value = response.data.etudiant.photoBordereaux_name
        matricule_etud.value = response.data.etudiant.matricule_etud
        if (response.data.etudiant.sexe_etud) {
          sexe_etud.value = response.data.etudiant.sexe_etud
        }
        if (isCarte.value) {
          directeur.getFirst()
        }
        if (isshowNotes.value) {
          show.showListeNotesEtudiant = true
        }

        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function searchDefinitive(valeur) {
    if (!valeur) {
      getAllEtudiantBysemestre()
    } else {
      listdefinitive.value = listdefinitiveTemp.value
      listdefinitive.value = listdefinitive.value.filter((list) => {
        return list.nomComplet_etud.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  function setMdpEtudiant() {
    show.showSpinner = true
    let formData = {
      password: password.password,
      validiter_compte: 'true'
    }

    axios
      .put(`${URL}/api/user/setup/${user.user_id}`, formData)
      .then((response) => {
        password.password = ''
        getAllEtudiantBysemestre()
        messages.messageSucces = 'Mot de passe créé avec succès !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }
  function setValiditeInscriptionEtudiant() {
    show.showSpinner = true
    let formData = {
      validiter_inscri: 'true',
      matricule_etud: `${au.oneAU.split('-')[1]}/${etudID.value}/${parcour.parcours_abr
        .split('-')
        .join('')}`
    }
    axios
      .put(`${URL}/api/etudiant/${etudID.value}`, formData)
      .then((response) => {
        password.password = ''
        getAllEtudiantBysemestre()
        messages.messageSucces = 'Inscription validé !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function setEtudiant() {
    show.showSpinner = true
    let formData = {
      nomComplet_etud: infossetup.nom,
      telephone_etud: infossetup.telephone
    }

    axios
      .put(`${URL}/api/etudiant/${id_etud.value}`, formData)
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        if (user.user.status_user === 'Etudiant') {
          infosheader.nom = response.data.nomComplet_etud
          infossetup.nom = response.data.nomComplet_etud
          infossetup.telephone = response.data.telephone_etud
          user.nomComplet_etud = response.data.nomComplet_etud
          user.telephone_etud = response.data.telephone_etud
        }
        let updatedUser = JSON.stringify(user)
        localStorage.setItem('user', updatedUser)
        messages.messageSucces = 'Modification réussi !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function inscription() {
    show.showSpinner = true
    let formData = new FormData()
    formData.append('nomComplet_etud', nomComplet_etud.value || '')
    formData.append('date_naissance_etud', date_naissance_etud.value || '')
    formData.append('lieux_naissance_etud', lieux_naissance_etud.value || '')
    formData.append('nationalite_etud', nationalite_etud.value || '')
    formData.append('nom_pere_etud', nom_pere_etud.value || '')
    formData.append('nom_mere_etud', nom_mere_etud.value || '')
    formData.append('nom_tuteur', nom_tuteur.value || '')
    formData.append('adresse_etud', adresse_etud.value || '')
    formData.append('serieBAC_etud', serieBAC_etud.value || '')
    formData.append('sexe_etud', sexe_etud.value || '')
    formData.append('etabOrigin_etud', etabOrigin_etud.value || '')
    formData.append('CIN_etud', CIN_etud.value || '')
    formData.append('anneeBAC_etud', anneeBAC_etud.value || '')
    formData.append('telephone_etud', telephone_etud.value || '')
    formData.append('photoBordereaux', photoBordereaux.value || '')
    formData.append('_method', 'PUT')
    axios
      .post(`${URL}/api/etudiant/${id_etud.value}`, formData)
      .then((response) => {
        messages.messageSucces = 'Inscriprion réussi !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
        getEtudiantById()
      })
      .catch((err) => {
        console.error(err)
        messages.messageSucces = 'Inscription échouée !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
    photoBordereaux.value = null
    fileName.value = ''
  }

  return {
    nomComplet_etud,
    ListeEtudiant,
    ListeEtudiantByExcel,
    ListeEtudiantTemp,
    searchalue,
    searchalueDef,
    etudnomComplet,
    etudID,
    listdefinitive,
    listdefinitiveTemp,
    id_etud,
    telephone_etud,
    date_naissance_etud,
    lieux_naissance_etud,
    nationalite_etud,
    sexe_etud,
    CIN_etud,
    nom_pere_etud,
    nom_mere_etud,
    nom_tuteur,
    adresse_etud,
    serieBAC_etud,
    anneeBAC_etud,
    etabOrigin_etud,
    photoBordereaux,
    photoBordereaux_name,
    isCarte,
    matricule_etud,
    listIdDefinitive,
    listNote,
    listNoteParSemestre,
    moyenneGen,
    isCompensation,
    isElimination,
    noteElim,
    isshowNotes,
    fileName,
    listDeliberation,
    statusDeliberation,
    ListeEtudiantRH,
    ListeEtudiantRHTemp,
    searchalueRH,
    getEtudiantByIdAu,
    searchRH,
    createEtudiant,
    setValiditeInscriptionEtudiant,
    getAllEtudiantBysemestre,
    setEtudiant,
    bigPostEtudiant,
    search,
    searchDefinitive,
    setMdpEtudiant,
    inscription,
    getEtudiantById
  }
})
