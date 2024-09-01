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

  return {
    status_user,
    email,
    password,
    photo,
    passwordVerifier,
    user_id,
    user_status,
    verifierPasword,
    supprUser
  }
})
