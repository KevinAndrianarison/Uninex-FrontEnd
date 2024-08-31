import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUser } from '@/stores/User'
import { useSemestre } from '@/stores/Semestre'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'

export const useEtudiant = defineStore('Etudiant', () => {
  const user = useUser()
  const semestre = useSemestre()
  const show = useShow()
  const URL = useUrl().url
  const messages = useMessages()
  const nomComplet_etud = ref('')

  function createEtudiant() {
    show.showSpinner = true
    let formData = {
      email: user.email,
      status_user: 'Etudiant'
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
          nomComplet_etud: nomComplet_etud.value
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
            console.log(formDataToSemestre);
            
            axios
              .post(`${URL}/api/semestres/addEtudiant`, formDataToSemestre, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((response) => {
                user.email = ''
                nomComplet_etud.value = ''
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

  return {
    nomComplet_etud,
    createEtudiant
  }
})
