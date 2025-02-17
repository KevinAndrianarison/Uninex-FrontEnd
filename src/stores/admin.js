import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useInfosheader } from '@/stores/Infosheader'
import { useInfossetup } from '@/stores/Infossetup'

export const useAdmin = defineStore('Admin', () => {
  const nomComplet_admin = ref('')
  const mailTo = ref('')
  const id_admin = ref('')
  const telephone_admin = ref(null)
  const URL = useUrl().url
  const show = useShow()
  const messages = useMessages()
  const infosheader = useInfosheader()
  const infossetup = useInfossetup()

  function getFirst() {
    axios
      .get(`${URL}/api/admins/getFirst`)
      .then((response) => {
        nomComplet_admin.value = response.data.nomComplet_admin
        mailTo.value = response.data.user.email
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function setAdmin() {
    show.showSpinner = true
    let formData = {
      nomComplet_admin: infossetup.nom,
      telephone_admin: infossetup.telephone
    }

    axios
      .put(`${URL}/api/admin/${id_admin.value}`, formData)
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        if (user.user.status_user === 'ADMIN') {
          infosheader.nom = response.data.nomComplet_admin
          infossetup.nom = response.data.nomComplet_admin
          infossetup.telephone_admin = response.data.telephone_admin
          user.nomComplet_admin = response.data.nomComplet_admin
          user.telephone_admin = response.data.telephone_admin
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
    setAdmin,
    getFirst,
    id_admin,
    nomComplet_admin,
    telephone_admin,
    mailTo
  }
})
