import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useGroupe = defineStore('Groupe', () => {
  const groupes = ref([])

  const URL = useUrl().url

  function getgroupes(id) {    
    axios
      .get(`${URL}/api/users/${id}/groups`)
      .then((response) => {
        groupes.value = response.data
        console.log(response.data);
        
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    groupes,
    getgroupes
  }
})
