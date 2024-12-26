import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useGroupe = defineStore('Groupe', () => {
  const groupes = ref([])
  const isSuspense = ref(false)
  const showChatGroup = ref(false)
  const messages = ref([])
  const groupeId = ref(null)
  const groupeName = ref("")

  const URL = useUrl().url

  function getgroupes(id) {
    isSuspense.value = true
    axios
      .get(`${URL}/api/users/${id}/groups`)
      .then((response) => {
        console.log(response.data);
        
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


  return {
    showChatGroup,
    groupes,
    isSuspense,
    messages,
    getgroupes,
    getmessages
  }
})
