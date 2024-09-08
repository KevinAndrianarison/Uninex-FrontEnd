import { defineStore } from 'pinia'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useEnseignant } from '@/stores/Enseignant'
import { useEtudiant } from '@/stores/Etudiant'
import { ref } from 'vue'
import axios from 'axios'
import { useMessages } from '@/stores/messages'

export const useUser = defineStore('User', () => {
  const show = useShow()
  const agentscolarite = useAgentscolarite()
  const etudiant = useEtudiant()
  const enseignant = useEnseignant()
  const URL = useUrl().url
  const messages = useMessages()

  const email = ref('')
  const status_user = ref('')
  const password = ref('')
  const passwordVerifier = ref('')
  const photo = ref(null)
  const user_id = ref(null)
  const user_status = ref('')

  function verifierPasword() {
    show.showMessageErrorConfirmMdp = true
    if (password.value === passwordVerifier.value) {
      show.showMessageErrorConfirmMdp = false
    }
    if (passwordVerifier.value === '') {
      show.showMessageErrorConfirmMdp = false
    }
  }

  function supprUser() {
    show.showSpinner = true
    axios
      .delete(`${URL}/api/user/delete/${user_id.value}`)
      .then((response) => {
        if (user_status.value === 'AS') {
          agentscolarite.getAllAS()
        }
        if (user_status.value === 'ENS') {
          enseignant.getAllENS()
        }
        if (user_status.value === 'Etudiant') {
          etudiant.getAllEtudiantBysemestre()
        }
        messages.messageSucces = 'Compte supprimé !'
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
    user_id.value = null
  }

  function login() {
    let formData = {
      email: email.value,
      password: password.value
    }
    show.showSpinner = true
    axios
      .post(`${URL}/api/user/login`, formData)
      .then((response) => {
        if (response.data.user.status_user === 'Directeur') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/directeur/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
              show.showLogin = false
              email.value = ''
              password.value = ''
              show.showNavBarDir = true
              show.showAdmin = true
            })
            .catch((err) => {
              console.error(err)
            })
        }
        if (response.data.user.status_user === 'AS') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/agentscolarite/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
              show.showLogin = false
              email.value = ''
              password.value = ''
              show.showNavBarAS = true
              show.showAdmin = true
            })
            .catch((err) => {
              console.error(err)
            })
        }
        show.showSpinner = false
      })
      .catch((err) => {
        show.showSpinner = false
        messages.messageError = 'Email ou mot de passe incorrect !'
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)
        console.error(err)
      })
  }

  return {
    status_user,
    email,
    password,
    photo,
    passwordVerifier,
    user_id,
    user_status,
    verifierPasword,
    supprUser,
    login
  }
})
