import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUser } from '@/stores/User'
import { useSemestre } from '@/stores/Semestre'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { usePassword } from '@/stores/Password'

export const useEtudiant = defineStore('Etudiant', () => {
  const user = useUser()
  const semestre = useSemestre()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const password = usePassword()

  const nomComplet_etud = ref('')
  const etudnomComplet = ref('')
  const etudID = ref(null)
  const ListeEtudiant = ref([])
  const ListeEtudiantTemp = ref([])
  const ListeEtudiantByExcel = ref([])
  const searchalue = ref('')

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
            validiter_inscri: false
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
    show.showSpinner = true
    let formData = {
      email: user.email,
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
          nomComplet_etud: nomComplet_etud.value,
          validiter_inscri: false
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
  }

  function getAllEtudiantBysemestre() {
    axios
      .get(`${URL}/api/semestres/${semestre.semestreId}/etudiants`)
      .then((response) => {
        ListeEtudiant.value = response.data
        ListeEtudiantTemp.value = response.data

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
      validiter_inscri: 'true'
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

  return {
    nomComplet_etud,
    ListeEtudiant,
    ListeEtudiantByExcel,
    ListeEtudiantTemp,
    searchalue,
    etudnomComplet,
    etudID,
    createEtudiant,
    setValiditeInscriptionEtudiant,
    getAllEtudiantBysemestre,
    bigPostEtudiant,
    search,
    setMdpEtudiant
  }
})
