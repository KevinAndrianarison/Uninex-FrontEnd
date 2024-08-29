import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUser } from '@/stores/User'
import { usePassword } from '@/stores/Password'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'

export const useEnseignant = defineStore('Enseignant', () => {
  const URL = useUrl().url
  const user = useUser()
  const show = useShow()
  const password = usePassword()
  const messages = useMessages()

  const ListeENS = ref([])
  const ListeENSTemp = ref([])
  const nomComplet_ens = ref('')
  const nom_ens = ref('')
  const idTop = ref(null)
  const idBottom = ref(null)
  const name = ref('')
  const date_recrutement_ens = ref('')
  const categorie_ens = ref('')
  const grade_ens = ref('')
  const searchalue = ref('')
  const telephone_ens = ref(null)

  function createEnseignant() {
    show.showSpinner = true
    const formDataUserENS = {
      status_user: 'ENS',
      email: user.email,
      password: password.password,
      photo: user.photo
    }
    axios
      .post(`${URL}/api/user/register`, formDataUserENS, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data) {
          const formDataENS = {
            nomComplet_ens: nomComplet_ens.value,
            grade_ens: grade_ens.value,
            categorie_ens: categorie_ens.value,
            telephone_ens: telephone_ens.value,
            date_recrutement_ens: date_recrutement_ens.value.split('-').reverse().join('-'),
            user_id: response.data.id
          }
          axios
            .post(`${URL}/api/enseignant`, formDataENS, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              getAllENS()
            })
            .catch((err) => {
              console.error(err)
              show.showSpinner = false
            })
          messages.messageSucces = 'Compte créé !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
          date_recrutement_ens.value = ''
          telephone_ens.value = null
          nomComplet_ens.value = ''
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
    user.photo = null
    password.password = ''
    user.email = ''
  }

  function getAllENS() {
    //Corrige nomEns tsy miala après suppr ens
    nom_ens.value = ""
    name.value = ""
    show.showSpinner = true
    axios
      .get(`${URL}/api/enseignant`)
      .then((response) => {
        ListeENS.value = response.data
        nom_ens.value = ListeENS.value[0].nomComplet_ens
        name.value = ListeENS.value[0].nomComplet_ens
        idBottom.value = ListeENS.value[0].id
        idTop.value = ListeENS.value[0].id
        ListeENSTemp.value = response.data
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function search(valeur) {
    if (!valeur) {
      getAllENS()
    } else {
      ListeENS.value = ListeENSTemp.value
      ListeENS.value = ListeENS.value.filter((list) => {
        return list.nomComplet_ens.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  return {
    nomComplet_ens,
    date_recrutement_ens,
    telephone_ens,
    ListeENS,
    grade_ens,
    searchalue,
    categorie_ens,
    nom_ens,
    name,
    idTop,
    idBottom,
    createEnseignant,
    getAllENS,
    search
  }
})
