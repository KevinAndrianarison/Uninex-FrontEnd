import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useInfosheader } from '@/stores/Infosheader'

export const useDirecteur = defineStore('Directeur', () => {
  const nomComplet_dir = ref('')
  const id_dir = ref('')
  const grade_dir = ref('')
  const telephone_dir = ref(null)
  const URL = useUrl().url
  const show = useShow()
  const messages = useMessages()
  const infosheader = useInfosheader()

  function getFirst() {
    axios
      .get(`${URL}/api/directeurs/getFirst`)
      .then((response) => {
        nomComplet_dir.value = response.data.nomComplet_dir
        grade_dir.value = response.data.grade_dir
        show.showListeEtudiantPdf = true
        setTimeout(() => {
          show.showListeEtudiantPdf = false
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function setDirecteur() {
    show.showSpinner = true
    let formData = {
      nomComplet_dir: nomComplet_dir.value,
      grade_dir: grade_dir.value,
      telephone_dir: telephone_dir.value
    }

    axios
      .put(`${URL}/api/directeur/${id_dir.value}`, formData)
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        if (user.user.status_user === 'Directeur') {
          infosheader.nom = response.data.nomComplet_dir
          user.nomComplet_dir = response.data.nomComplet_dir
          user.grade_dir = response.data.grade_dir
          user.telephone_dir = response.data.telephone_dir
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
    getFirst,
    setDirecteur,
    id_dir,
    nomComplet_dir,
    grade_dir,
    telephone_dir
  }
})
