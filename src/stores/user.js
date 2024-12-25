import { defineStore } from 'pinia'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useEnseignant } from '@/stores/Enseignant'
import { useEtudiant } from '@/stores/Etudiant'
import { ref } from 'vue'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { useInfosheader } from '@/stores/Infosheader'

export const useUser = defineStore('User', () => {
  const show = useShow()
  const agentscolarite = useAgentscolarite()
  const etudiant = useEtudiant()
  const enseignant = useEnseignant()
  const URL = useUrl().url
  const messages = useMessages()
  const infosheader = useInfosheader()

  const email = ref('')
  const status_user = ref('')
  const password = ref('')
  const oldpassword = ref('')
  const passwordVerifier = ref('')
  const photo = ref(null)
  const photoName = ref('')
  const user_id = ref(null)
  const user_status = ref('')
  const listUser = ref([])

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
        show.showMessageErrorEmail = false
        show.showMessageErrorEmailDir = false
        if (response.data.user.status_user === 'Directeur') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/directeur/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
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
        if (response.data.user.status_user === 'SECPAL') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/agentscolarite/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
              show.showLogin = false
              email.value = ''
              password.value = ''
              show.showNavBarAS = true
              show.showNavBarSECPAL = true
              show.showAdmin = true
            })
            .catch((err) => {
              console.error(err)
            })
        }
        if (response.data.user.status_user === 'Etudiant') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/etudiant/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
              show.showLogin = false
              email.value = ''
              password.value = ''
              show.showNavBarEtud = true
              show.showAdmin = true
            })
            .catch((err) => {
              console.error(err)
            })
        }
        if (response.data.user.status_user === 'ENS') {
          localStorage.setItem('auth_token', response.data.access_token)
          axios
            .get(`${URL}/api/enseignant/getById/${response.data.user.id}`)
            .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data[0]))
              show.showLogin = false
              show.showNavBarEns = true
              email.value = ''
              password.value = ''
              if (response.data[0].chefMention_status === '1') {
                show.showNavBarRespMention = true
              }
              if (response.data[0].chefParcours_status === '1') {
                show.showNavBarRespParcours = true
              }
              show.showAdmin = true
            })
            .catch((err) => {
              console.error(err)
            })
        }
        show.showLogin = false
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

  function setUsers() {
    show.showSpinner = true
    let formData = new FormData()
    formData.append('email', email.value)
    formData.append('photo', photo.value || '')
    formData.append('_method', 'PUT')

    axios
      .post(`${URL}/api/user/setuser/${user_id.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        infosheader.photo = response.data[0].photo_name
        user.user.photo_name = response.data[0].photo_name
        user.user.email = response.data[0].email
        email.value = response.data[0].email
        let updatedUser = JSON.stringify(user)
        localStorage.setItem('user', updatedUser)
        messages.messageSucces = 'Modification réussi !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        show.showSpinner = false
        console.error(err)
      })
  }

  function setMdp() {
    show.showSpinner = true
    let formData = {
      email: email.value,
      password: oldpassword.value,
      Newpassword: passwordVerifier.value
    }
    axios
      .put(`${URL}/api/user/changemdp/${user_id.value}`, formData)
      .then((response) => {
        messages.messageSucces = 'Modification réussi !'
        oldpassword.value = ''
        passwordVerifier.value = ''
        password.value = ''
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        messages.messageError = 'Mot de passe actuel incorrect !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)
        console.error(err)
      })
  }

  function getAlluser() {
    axios
      .get(`${URL}/api/users`)
      .then((response) => {
        listUser.value = response.data        
      })
      .catch((err) => {
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
    oldpassword,
    listUser,
    photoName,
    verifierPasword,
    supprUser,
    login,
    setMdp,
    setUsers,
    getAlluser
  }
})
