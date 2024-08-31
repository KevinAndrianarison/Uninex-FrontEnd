import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUser } from '@/stores/User'
import { usePassword } from '@/stores/Password'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'

export const useAgentscolarite = defineStore('Agentscolarite', () => {
  const URL = useUrl().url
  const user = useUser()
  const show = useShow()
  const password = usePassword()
  const messages = useMessages()

  const ListeAS = ref([])
  const ListeASTemp = ref([])
  const nomComplet_scol = ref('')
  const date_recrutement_scol = ref('')
  const categorie_scol = ref('')
  const searchalue = ref('')
  const telephone_scol = ref(null)

  function createScolarite() {
    show.showSpinner = true
    const formDataUserAS = {
      status_user: 'AS',
      validiter_compte: true,
      email: user.email,
      password: password.password,
      photo: user.photo
    }
    axios
      .post(`${URL}/api/user/register`, formDataUserAS, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data) {
          const formDataAS = {
            nomComplet_scol: nomComplet_scol.value,
            telephone_scol: telephone_scol.value,
            categorie_scol: categorie_scol.value,
            date_recrutement_scol: date_recrutement_scol.value.split('-').reverse().join('-'),
            user_id: response.data.id
          }
          axios
            .post(`${URL}/api/agentscolarite`, formDataAS, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              getAllAS()
            })
            .catch((err) => {
              console.error(err)
              show.showSpinner = false
            })
          messages.messageSucces = 'Compte créé !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
          date_recrutement_scol.value = ''
          telephone_scol.value = null
          nomComplet_scol.value = ''
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

  function getAllAS() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/agentscolarite`)
      .then((response) => {
        ListeAS.value = response.data
        ListeASTemp.value = response.data
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function search(valeur) {
    if (!valeur) {
      getAllAS()
    } else {
      ListeAS.value = ListeASTemp.value
      ListeAS.value = ListeAS.value.filter((list) => {
        return list.nomComplet_scol.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  return {
    nomComplet_scol,
    date_recrutement_scol,
    telephone_scol,
    ListeAS,
    searchalue,
    categorie_scol,
    createScolarite,
    getAllAS,
    search
  }
})
