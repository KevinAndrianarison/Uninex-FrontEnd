import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUser } from '@/stores/User'
import { usePassword } from '@/stores/Password'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useInfosheader } from '@/stores/Infosheader'
import { useInfossetup } from '@/stores/Infossetup'

export const useAgentscolarite = defineStore('Agentscolarite', () => {
  const URL = useUrl().url
  const user = useUser()
  const show = useShow()
  const password = usePassword()
  const messages = useMessages()
  const infosheader = useInfosheader()
  const infossetup = useInfossetup()

  const ListeAS = ref([])
  const ListeASTemp = ref([])
  const nomComplet_scol = ref('')
  const date_recrutement_scol = ref('')
  const categorie_scol = ref('')
  const searchalue = ref('')
  const telephone_scol = ref(null)
  const status = ref('')
  const id_scol = ref('')

  function createScolarite() {
    show.showSpinner = true
    let Status
    if (status.value === 'Agent de scolarité') {
      Status = 'AS'
    }
    if (status.value === 'Sécrétaire principale') {
      Status = 'SECPAL'
    }
    const formDataUserAS = {
      status_user: Status,
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

  function setAS() {
    show.showSpinner = true
    let formData = {
      nomComplet_scol: infossetup.nom,
      telephone_scol: infossetup.telephone
    }

    axios
      .put(`${URL}/api/agentscolarite/${id_scol.value}`, formData)
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        if (user.user.status_user === 'AS') {
          infosheader.nom = response.data.nomComplet_scol
          infossetup.nom = response.data.nomComplet_scol
          infossetup.telephone = response.data.telephone_scol
          user.nomComplet_scol = response.data.nomComplet_scol
          user.telephone_scol = response.data.telephone_scol
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

  return {
    nomComplet_scol,
    status,
    date_recrutement_scol,
    telephone_scol,
    ListeAS,
    searchalue,
    categorie_scol,
    id_scol,
    setAS,
    createScolarite,
    getAllAS,
    search
  }
})
