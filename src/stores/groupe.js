import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useShow } from './show'

export const useGroupe = defineStore('Groupe', () => {
  const groupes = ref([])
  const isSuspense = ref(false)
  const showChatGroup = ref(false)
  const messages = ref([])
  const groupeId = ref(null)
  const groupeName = ref('')
  const membres = ref([])

  const URL = useUrl().url
  const show = useShow()

  function getgroupes(id) {
    isSuspense.value = true
    axios
      .get(`${URL}/api/users/${id}/groups`)
      .then((response) => {
        groupes.value = response.data
        isSuspense.value = false
      })
      .catch((err) => {
        console.error(err)
        isSuspense.value = false
      })
  }

  function getmessages(id) {
    axios
      .get(`${URL}/api/groups/${id}/messages`)
      .then((response) => {
        messages.value = response.data
        showChatGroup.value = true
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getmembres() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/groups/${groupeId.value}/users`)
      .then((response) => {
        membres.value = response.data.members
        show.showSetGroupMember = true
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    showChatGroup,
    groupes,
    isSuspense,
    messages,
    groupeId,
    groupeName,
    membres,
    getgroupes,
    getmessages,
    getmembres
  }
})
