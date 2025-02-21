import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useConge = defineStore('Conge', () => {
  const URL = useUrl().url
  const listConge = ref([])
  const oneConge = ref(null)


  function getAllCongepermission() {
    axios
      .get(`${URL}/api/congepermission`)
      .then((response) => {
        listConge.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listConge,
    oneConge,
    getAllCongepermission
  }
})
